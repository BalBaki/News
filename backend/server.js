require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const argon2 = require('argon2');
const { randomBytes } = require('node:crypto');
const { User, Api } = require('./db');
const apis = require('./apis');
const authMiddleware = require('./middlewares/auth');
const {
    decodePayload,
    createAccessTokenCookies,
    createRefreshTokenCookie,
    validateEmail,
    clearTokenCookies,
    transformArticles,
} = require('./utils');

const app = express();
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { access: false, error: 'Too many request. Please try again after a few minutes' },
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (process.env.CORS_ORIGIN === origin) {
                callback(null, true);
            } else {
                callback('Blocked By Cors');
            }
        },
        credentials: true,
    })
);
app.use(limiter);

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
//     res.setHeader('Access-Control-Allow-METHODS', 'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH');

//     next();
// });

app.listen(process.env.API_PORT, () => {
    console.log(`Server work at port ${process.env.API_PORT}`);
});

//Register+
//payload => email, password, name, surname
app.post('/register', async (request, response) => {
    try {
        const payload = decodePayload(request.body.payload);
        const payloadEmail = payload.email?.toLowerCase();

        if (!payloadEmail || !validateEmail(payloadEmail)) throw new Error('Not Valid Email');

        const user = await User.findOne({ email: payloadEmail });

        if (!user) {
            const hashedPassword = await argon2.hash(payload.password, {
                type: 1,
                salt: randomBytes(64),
            });
            const newUser = await User.create(
                Object.assign(payload, {
                    email: payloadEmail,
                    password: hashedPassword,
                    filterSettings: {},
                    favorites: [],
                })
            );

            const { id, name, surname, email, filterSettings, favorites } = newUser;

            createAccessTokenCookies(response, { id, email });
            createRefreshTokenCookie(response, { id, email });

            return response.json({ register: true, user: { id, name, surname, email, filterSettings, favorites } });
        }

        throw new Error('Exists Email');
    } catch (error) {
        response.json({ register: false, error: error.message });
    }
});

//Login+
//payload => email, password
app.post('/login', async (request, response) => {
    try {
        const payload = decodePayload(request.body.payload);
        const payloadEmail = payload.email?.toLowerCase();

        if (!payloadEmail || !validateEmail(payloadEmail)) throw new Error('Not Valid Email');

        const user = await User.findOne({ email: payloadEmail });

        if (user) {
            const isPasswordCompare = await argon2.verify(user.password, payload.password);

            if (isPasswordCompare) {
                const { id, name, surname, email, filterSettings, favorites } = user;

                createAccessTokenCookies(response, { id, email });
                createRefreshTokenCookie(response, { id, email });

                return response.json({
                    login: true,
                    user: { id, name, surname, email, filterSettings, favorites },
                });
            }
        }

        throw new Error('Wrong Email or Password');
    } catch (error) {
        response.json({ login: false, error: error.message });
    }
});

//logout++
app.post('/logout', (request, response) => {
    clearTokenCookies(response);

    response.json({ logout: true });
});

//verify+
app.post('/verify', authMiddleware, async (request, response) => {
    try {
        const { user: payloadUser } = request;

        const user = await User.findOne({ email: payloadUser.email, _id: payloadUser.id }).select({ password: 0 });

        if (user) {
            const { id, name, surname, email, filterSettings, favorites } = user;

            return response.json({ verify: true, user: { id, name, surname, email, filterSettings, favorites } });
        }

        throw new Error('Not Exists User');
    } catch (error) {
        clearTokenCookies(response);

        response.json({ verify: false, error: error.message });
    }
});

//Save Settings+
//payload => filterSettings
app.post('/savesettings', authMiddleware, async (request, response) => {
    try {
        const filterSettings = decodePayload(request.body.payload);
        const {
            user: { id, email },
        } = request;
        const saveSettings = await User.findOneAndUpdate({ _id: id, email }, { $set: { filterSettings } });

        if (!saveSettings) throw new Error('Not Saved');

        response.json({ save: true });
    } catch (error) {
        response.json({ save: false, error: error.message });
    }
});

//Get Valid Apis
app.get('/apis', async (request, response) => {
    try {
        const listOfApis = await Api.find();

        return response.json({ success: true, apis: listOfApis });
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

//Get filter data
//query => apilist(array)
app.get('/filtersV2', async (request, response) => {
    try {
        const apiList = decodePayload(request.query.apiList);
        const filters = {};

        await Promise.all(
            apiList.map((api) => {
                const currentApiData = apis.find((apiDate) => apiDate.value === api);

                filters[api] = {};

                if (!currentApiData) throw new Error('Not Valid Api');

                const filterPromises = currentApiData.filters.map(async (option) => {
                    const filterResponse = await option.filterFn();

                    if (!filterResponse.ok) {
                        throw new Error('Error at Fetching Filter Option');
                    }

                    const filterOptions = await filterResponse.json();

                    filters[api][option.name] = filterOptions;
                });

                return Promise.all(filterPromises);
            })
        );

        return response.json({ success: true, filters });
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

//Get filter data
//query => apiName(string)
app.get('/filters', async (request, response) => {
    try {
        const apiName = decodeURIComponent(request.query.apiName);
        const filters = {};

        if (!apis[apiName]) throw new Error('Not Valid Api');

        const filterPromises = apis[apiName].filters.map(async (option) => {
            const filterRespone = await option.filterFn();

            if (!filterRespone.ok) {
                throw new Error('Error at Fetching Filter Option');
            }

            const filterOptions = await filterRespone.json();

            filters[option.name] = filterOptions;
        });

        await Promise.all(filterPromises);

        return response.json({ success: true, filters });
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

//search news
//payload => apiList, fromDate, term, toDate,page,sortOrder, extraFilters = {guardian: {section: [...]},
//newsapi: {sources: '...'}}
app.post('/search', async (request, response) => {
    try {
        const payload = decodePayload(request.body.payload);
        const { apiList, term, fromDate, toDate, page, sortOrder, extraFilters } = payload;

        const responses = await Promise.all(
            apiList.reduce((promises, apiValue) => {
                const currentApi = apis.find((api) => api.value === apiValue);

                if (currentApi)
                    promises.push(
                        currentApi.search({ term, fromDate, toDate, page, sortOrder, ...extraFilters[apiValue] })
                    );

                return promises;
            }, [])
        );
        const filteredResponses = responses.filter((searchResponse) => searchResponse && searchResponse.ok);

        if (filteredResponses.length < 1) throw new Error('Error at Fetching Articles');

        const values = await Promise.all(filteredResponses.map((searchResponse) => searchResponse.json()));
        const articles = {};
        const errors = [];

        values.forEach((result) => {
            //newsapi
            if (result?.articles?.length > 0) {
                articles['newsapi'] = {};

                articles['newsapi'].result = result.articles;
                articles['newsapi'].count = result.totalResults;
            }

            //theguardians
            if (result?.response?.results?.length > 0) {
                articles['theguardians'] = {};

                articles['theguardians'].result = result.response.results;
                articles['theguardians'].count = result.response.total;
            }

            //new york times
            if (result?.response?.docs?.length > 0) {
                articles['newyorktimes'] = {};

                articles['newyorktimes'].result = result.response.docs;
                articles['newyorktimes'].count = result.response.meta.hits;
            }

            if (result?.status === 'error' || result?.response?.status === 'error' || result?.message) {
                errors.push(result?.message || result?.response?.message);
            }
        });

        if (errors.length > 0) throw new Error('Error at Fetching Articles');

        response.json({
            search: true,
            page,
            articles: transformArticles(articles),
        });
    } catch (error) {
        response.json({ search: false, error: error.message });
    }
});

// payload => {type: 'add' | 'remove', news: News}
app.post('/favorite', authMiddleware, async (request, response) => {
    try {
        const payload = decodePayload(request.body.payload);
        const { user: payloadUser } = request;
        const { type, news } = payload;
        const user = await User.findOne({ email: payloadUser.email, _id: payloadUser.id }).select({ password: 0 });

        if (user) {
            let { favorites } = user;

            if (type === 'add') {
                favorites.push(news);

                const isAddedtoFavorites = await User.findOneAndUpdate(
                    { _id: payloadUser.id, email: payloadUser.email },
                    { $set: { favorites } }
                );

                if (!isAddedtoFavorites) throw new Error('Not Saved');
            } else if (type === 'remove') {
                favorites = favorites.filter((favoriteNew) => favoriteNew.url !== news.url);

                const isRemovedFromFavorites = await User.findOneAndUpdate(
                    { _id: payloadUser.id, email: payloadUser.email },
                    { $set: { favorites } }
                );

                if (!isRemovedFromFavorites) throw new Error('Not Deleted');
            }
        }

        response.json({ success: true });
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

app.get('/favorites', authMiddleware, async (request, response) => {
    try {
        const { user } = request;

        if (user) {
            const { favorites } = await User.findOne({ email: user.email, _id: user.id }).select('favorites');

            return response.json({ success: true, favorites });
        }

        throw new Error('Not exists User');
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

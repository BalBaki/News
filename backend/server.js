require('dotenv').config({ path: '../.env' });
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
} = require('./utils');

const app = express();
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many request from this ip. Please try again after a few minutes',
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

app.listen(process.env.API_PORT, () => {
    console.log(`Server work at port ${process.env.API_PORT}`);
});

//Register+
//payload => email, password, name, surname
app.post('/register', async (request, response) => {
    try {
        const payload = decodePayload(request.body.payload);
        const payloadEmail = payload.email?.toLowerCase();

        if (!payloadEmail || !validateEmail(payloadEmail)) throw new Error('Not valid Email');

        const user = await User.findOne({ email: payloadEmail });

        if (!user) {
            const hashedPassword = await argon2.hash(payload.password, {
                type: 1,
                salt: randomBytes(64),
            });
            const newUser = await User.create(
                Object.assign(payload, { email: payloadEmail, password: hashedPassword, filterSettings: {} })
            );

            const { id, name, surname, email, filterSettings } = newUser;

            createAccessTokenCookies(response, { id, email });
            createRefreshTokenCookie(response, { id, email });

            return response.json({ register: true, user: { id, name, surname, email, filterSettings } });
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
        const email = payload.email?.toLowerCase();

        if (!email || !validateEmail(email)) throw new Error('Not valid Email');

        const user = await User.findOne({ email });

        if (user) {
            const isPasswordCompare = await argon2.verify(user.password, payload.password);

            if (isPasswordCompare) {
                const { id, name, surname, email, filterSettings } = user;

                createAccessTokenCookies(response, { id, email });
                createRefreshTokenCookie(response, { id, email });

                return response.json({
                    login: true,
                    user: { id, name, surname, email, filterSettings },
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
        const {
            user: { id, email },
        } = request;

        const user = await User.findOne({ email, _id: id }).select({ password: 0 });

        if (user) {
            const { id, name, surname, email, filterSettings } = user;

            return response.json({ verify: true, user: { id, name, surname, email, filterSettings } });
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
        const apis = await Api.find();

        return response.json({ success: true, apis });
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

//Get filter data
//query => apiNames(array)
app.get('/filters', async (request, response) => {
    try {
        const apiNames = decodePayload(request.query.apiNames);
        const filters = {};

        await Promise.all(
            apiNames.map((apiName) => {
                filters[apiName] = {};

                if (!apis[apiName]) throw new Error('Not Valid Api');

                const filterPromises = apis[apiName].filters.map(async (option) => {
                    const response = await option.filterFn();

                    if (!response.ok) {
                        throw new Error('Error at Fetching Filter Option');
                    }

                    const filterOptions = await response.json();

                    filters[apiName][option.name] = filterOptions;
                });

                return Promise.all(filterPromises);
            })
        );

        return response.json({ success: true, filters });
    } catch (error) {
        response.json({ success: false, error: error.message });
    }
});

//search news
//payload => apiNames, fromDate, term, toDate, extraFilters = {guardian: {section: [...]}, newsapi: {sources: '...'}}
app.post('/search', async (request, response) => {
    try {
        const payload = decodePayload(request.body.payload);
        const { apiNames, term, fromDate, toDate, extraFilters } = payload;
        const responses = await Promise.all(
            apiNames.map((apiName) => apis[apiName].search({ term, fromDate, toDate, ...extraFilters[apiName] }))
        );

        if (responses.every((response) => !response.ok)) throw new Error('Error at Fetching Articles');

        const values = await Promise.all(
            responses.filter((response) => response.ok).map((response) => response.json())
        );

        let articles = [];
        const errors = [];

        values.forEach((result) => {
            if (result?.articles?.length > 0) {
                articles = articles.concat(result.articles);
            }

            if (result?.response?.results?.length > 0) {
                articles = articles.concat(result.response.results);
            }

            if (result?.status === 'error' || result?.response?.status === 'error' || result?.message) {
                errors.push(result?.message || result?.response?.message);
            }
        });

        if (errors.length > 0) throw new Error('Error at Fetching Articles');

        return response.json({ search: true, articles });
    } catch (error) {
        response.json({ search: false, error: error.message });
    }
});

const argon2 = require('argon2');
const { randomBytes } = require('node:crypto');
const { User } = require('../db');
const { decodePayload, createAccessTokenCookies, createRefreshTokenCookie, clearTokenCookies } = require('../utils');
const schemas = require('../schemas');

class UserController {
    //Register
    //payload => email, password, name, surname
    async register(request, response) {
        try {
            const validateRegister = schemas.register.safeParse(decodePayload(request.body.payload));

            if (!validateRegister.success) throw new Error('Invalid Data!');

            const user = await User.findOne({ email: validateRegister.data.email });

            if (!user) {
                const hashedPassword = await argon2.hash(validateRegister.data.password, {
                    type: 1,
                    salt: randomBytes(64),
                });
                const newUser = await User.create(
                    Object.assign(validateRegister.data, {
                        password: hashedPassword,
                        filterSettings: {},
                        favorites: [],
                    })
                );

                const { id, name, surname, email, filterSettings, favorites } = newUser;

                createAccessTokenCookies(response, { id, email });
                createRefreshTokenCookie(response, { id, email });

                return response.json({
                    register: true,
                    user: { id, name, surname, email, filterSettings, favorites },
                });
            }

            throw new Error('Exists Email');
        } catch (error) {
            response.json({ register: false, error: error.message });
        }
    }

    //Login
    //payload => email, password
    async login(request, response) {
        try {
            const validateLogin = schemas.login.safeParse(decodePayload(request.body.payload));

            if (!validateLogin.success) throw new Error('Invalid Data!');

            const user = await User.findOne({ email: validateLogin.data.email });

            if (user) {
                const isPasswordCompare = await argon2.verify(user.password, validateLogin.data.password);

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
    }

    //logout
    async logout(request, response) {
        clearTokenCookies(response);

        response.json({ logout: true });
    }

    //verify
    async verify(request, response) {
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
    }

    //Save Settings
    //payload => apiList, fromDate, toDate, sortOrder, extraFilters = {....}
    async saveSettings(request, response) {
        try {
            const validateFilterSettings = schemas.filterSettings.safeParse(decodePayload(request.body.payload));

            if (!validateFilterSettings.success) throw new Error('Invalid Data!');

            const {
                user: { id, email },
            } = request;
            const saveSettings = await User.findOneAndUpdate(
                { _id: id, email },
                { $set: { filterSettings: validateFilterSettings.data } }
            );

            if (!saveSettings) throw new Error('Not Saved');

            response.json({ save: true });
        } catch (error) {
            response.json({ save: false, error: error.message });
        }
    }

    //Add and delete favorite
    // payload => {type: 'add' | 'remove', news: News}
    async addAndDeleteFavorite(request, response) {
        try {
            const validateFavorite = schemas.favorite.safeParse(decodePayload(request.body.payload));

            if (!validateFavorite.success) throw new Error('Invalid Data!');

            const { user: payloadUser } = request;
            const { type, news } = validateFavorite.data;
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
    }

    //Get favoristes
    async getFavorites(request, response) {
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
    }
}

module.exports = UserController;

const jwt = require('jsonwebtoken');

const decodePayload = (payload) => JSON.parse(decodeURIComponent(payload));

const validateEmail = (email) =>
    new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    ).test(email.toLowerCase());

//[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?

const createRefreshToken = (value) =>
    jwt.sign(value, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '5d',
    });

const createAccessToken = (value) =>
    jwt.sign(value, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '1h',
    });

const createRefreshTokenCookie = (response, { id, email }) =>
    response.cookie('refreshToken', createRefreshToken({ id, email }), {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    });

const createAccessTokenCookies = (response, { id, email }) =>
    response
        .cookie('accessToken', createAccessToken({ id, email }), {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessTokenExpiresAt', new Date().getTime() + 60 * 60 * 1000, {
            maxAge: 60 * 60 * 1000,
        });

const clearTokenCookies = (response) =>
    response
        .cookie('refreshToken', null, {
            maxAge: 1,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessToken', null, {
            maxAge: 1,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessTokenExpiresAt', null, {
            maxAge: 1,
        });

module.exports = {
    decodePayload,
    createRefreshToken,
    createAccessToken,
    createRefreshTokenCookie,
    createAccessTokenCookies,
    validateEmail,
    clearTokenCookies,
};

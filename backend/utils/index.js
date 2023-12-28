const jwt = require('jsonwebtoken');

const payloadDecoder = (payload) => JSON.parse(decodeURIComponent(payload));

const emailValidator = (email) =>
    new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    ).test(email.toLowerCase());

//[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?

const refreshTokenCreater = (value) =>
    jwt.sign(value, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '5d',
    });

const accessTokenCreater = (value) =>
    jwt.sign(value, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '1h',
    });

const refreshTokenCookieCreater = (response, { id, email }) =>
    response.cookie('refreshToken', refreshTokenCreater({ id, email }), {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    });

const accessTokenCookieCreater = (response, { id, email }) =>
    response.cookie('accessToken', accessTokenCreater({ id, email }), {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    });

module.exports = {
    payloadDecoder,
    refreshTokenCreater,
    accessTokenCreater,
    refreshTokenCookieCreater,
    accessTokenCookieCreater,
    emailValidator,
};

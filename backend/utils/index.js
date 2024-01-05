const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');

const decodePayload = (payload) => JSON.parse(decodeURIComponent(payload));

const validateEmail = (email) =>
    new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    ).test(email.toLowerCase());

//[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?

const createRefreshToken = (value) =>
    jwt.sign(value, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '3d',
    });

const createAccessToken = (value) =>
    jwt.sign(value, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '8h',
    });

const createRefreshTokenCookie = (response, { id, email }) =>
    response.cookie('refreshToken', createRefreshToken({ id, email }), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    });

const createAccessTokenCookies = (response, { id, email }) =>
    response
        .cookie('accessToken', createAccessToken({ id, email }), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        })
        .cookie('accessTokenExpiresAt', new Date().getTime() + 60 * 60 * 1000, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
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

const transformArticles = (articles) => {
    return articles.map((article) => {
        return {
            id: randomUUID(),
            title: article.title || article.webTitle || '',
            description: article.description || article.fields?.bodyText || '',
            url: article.url || article.webUrl || '',
            imageUrl: article.urlToImage || article.fields?.thumbnail || '',
            authors:
                article.author ||
                (article.tags &&
                    article.tags
                        .filter((tag) => tag.firstName || tag.lastName)
                        .map((tag) => {
                            let authors = '';

                            if (tag.firstName) authors += tag.firstName;
                            if (tag.lastName) authors += (tag.firstName ? ' ' : '') + tag.lastName;

                            return authors;
                        })
                        .join(',')) ||
                '',
            publishDate: article.publishedAt || article.webPublicationDate || '',
        };
    });
};

module.exports = {
    decodePayload,
    createRefreshToken,
    createAccessToken,
    createRefreshTokenCookie,
    createAccessTokenCookies,
    validateEmail,
    clearTokenCookies,
    transformArticles,
};

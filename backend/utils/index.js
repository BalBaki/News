const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');

const decodePayload = (payload) => JSON.parse(decodeURIComponent(payload));

const validateEmail = (email) =>
    new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    ).test(email.toLowerCase());

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
    Object.keys(articles).forEach((key) => {
        articles[key] = articles[key].map((article) => {
            return {
                id: randomUUID(),
                title: article.title || article.webTitle || article.snippet || '',
                description: article.description || article.fields?.bodyText || article.lead_paragraph || '',
                url: article.url || article.webUrl || article.web_url || '',
                imageUrl:
                    article.urlToImage ||
                    article.fields?.thumbnail ||
                    (article.multimedia?.[0]?.url && `https://www.nytimes.com/${article.multimedia[0].url}`) ||
                    '',
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
                    (article.byline?.person?.length > 0 && article.byline?.original) ||
                    '',
                publishDate: article.publishedAt || article.webPublicationDate || article.pub_date || '',
            };
        });
    });

    return articles;
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

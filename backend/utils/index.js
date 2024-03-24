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
        switch (key) {
            case 'newsapi':
                articles[key].result = articles[key].result.map((article) => ({
                    id: randomUUID(),
                    title: article.title || '',
                    description: article.description || '',
                    url: article.url || '',
                    imageUrl: article.urlToImage || '',
                    authors: article.author || '',
                    publishDate: article.publishedAt || '',
                }));
                break;
            case 'theguardians':
                articles[key].result = articles[key].result.map((article) => ({
                    id: randomUUID(),
                    title: article.webTitle || '',
                    description: article.fields?.bodyText || '',
                    url: article.webUrl || '',
                    imageUrl: article.fields?.thumbnail || '',
                    authors:
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
                    publishDate: article.webPublicationDate || '',
                }));
                break;
            case 'newyorktimes':
                articles[key].result = articles[key].result.map((article) => ({
                    id: randomUUID(),
                    title: article.snippet || '',
                    description: article.lead_paragraph || '',
                    url: article.web_url || '',
                    imageUrl:
                        (article.multimedia?.[0]?.url && `https://www.nytimes.com/${article.multimedia[0].url}`) || '',
                    authors: (article.byline?.person?.length > 0 && article.byline?.original) || '',
                    publishDate: article.pub_date || '',
                }));
                break;
            default:
                articles[key].result = articles[key].result.map((article) => ({
                    id: '',
                    title: '',
                    description: '',
                    url: '',
                    imageUrl: '',
                    authors: '',
                    publishDate: '',
                }));
        }
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

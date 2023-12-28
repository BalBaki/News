const jwt = require('jsonwebtoken');
const { accessTokenCookieCreater } = require('../utils');

const authMiddleware = (request, response, next) => {
    const { accessToken, refreshToken } = request.cookies;

    if (!accessToken) {
        return response.json({ auth: false, error: 'No Access Token. Access Denied' });
    }

    try {
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);

        request.user = { id: decodedAccessToken.id, email: decodedAccessToken.email };

        next();
    } catch (error) {
        if (!refreshToken) {
            return response.json({ auth: false, error: 'No Refresh Token. Access Denied' });
        }

        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);

            request.user = { id: decodedRefreshToken.id, email: decodedRefreshToken.email };

            accessTokenCookieCreater(response, { id: decodedRefreshToken.id, email: decodedRefreshToken.email });

            next();
        } catch (error) {
            return response.send({ auth: 'false', error: 'Not Valid Refresh Token' });
        }
    }
};

module.exports = authMiddleware;

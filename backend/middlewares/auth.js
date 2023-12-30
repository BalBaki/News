const jwt = require('jsonwebtoken');
const { createAccessTokenCookies, clearTokenCookies } = require('../utils');

const authMiddleware = (request, response, next) => {
    try {
        const { accessToken, refreshToken } = request.cookies;

        if (!accessToken || !refreshToken) throw new Error();

        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);

        try {
            const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);

            request.user = { id: decodedAccessToken.id, email: decodedAccessToken.email };
        } catch (error) {
            request.user = { id: decodedRefreshToken.id, email: decodedRefreshToken.email };

            createAccessTokenCookies(response, { id: decodedRefreshToken.id, email: decodedRefreshToken.email });
        }

        next();
    } catch (error) {
        clearTokenCookies(response);

        return response.send({ verify: 'false', error: 'Access Denied' });
    }
};

module.exports = authMiddleware;

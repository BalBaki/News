require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { userRoute, articleRoute } = require('./routes');

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

app.use('/user', userRoute);
app.use('/article', articleRoute);

app.listen(process.env.API_PORT, () => {
    console.log(`Server work at port ${process.env.API_PORT}`);
});

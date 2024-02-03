require('dotenv').config();
const mongoose = require('mongoose');
const UserSchema = require('./models/user');
const ApiSchema = require('./models/api');

mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
        dbName: 'NewsFeed',
    })
    .then(() => {
        console.log('Connected DB');
    })
    .catch((err) => console.error(err));

const User = mongoose.model('User', UserSchema);
const Api = mongoose.model('Api', ApiSchema);

module.exports = { User, Api };

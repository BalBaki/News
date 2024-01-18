require('dotenv').config({ path: '../.env' });
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

const apis = [
    {
        value: 'newsapi',
        name: 'News Api',
        baseUrl: 'https://newsapi.org/v2/',
        searchUrlPart: 'everything?',
        filters: [
            {
                name: 'sources',
                defaultValue: [],
            },
        ],
    },
    {
        value: 'theguardians',
        name: 'The Guardians',
        baseUrl: 'https://content.guardianapis.com/',
        searchUrlPart: 'search?',
        filters: [
            {
                name: 'section',
                defaultValue: '',
            },
        ],
    },
    {
        value: 'newyorktimes',
        name: 'New York Times',
        baseUrl: 'https://api.nytimes.com/',
        searchUrlPart: 'svc/search/v2/articlesearch.json?',
        filters: [],
    },
];

Api.bulkWrite(
    apis.map((api) => ({
        updateOne: {
            filter: { name: api.name },
            update: { $set: api },
            upsert: true,
        },
    }))
)
    .then(() => console.log('Apis added to db.'))
    .catch((error) => console.log(error));

module.exports = { User, Api };

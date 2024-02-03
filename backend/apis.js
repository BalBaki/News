const { Api } = require('./db');

const apis = [
    {
        value: 'newsapi',
        name: 'News Api',
        baseUrl: 'https://newsapi.org/v2/',
        searchUrlPart: 'everything?',
        get filters() {
            return [
                {
                    name: 'sources',
                    defaultValue: [],
                    filterFn: () =>
                        fetch(
                            this.baseUrl +
                                'top-headlines/sources?' +
                                new URLSearchParams({ apiKey: process.env.NEWS_API_KEY })
                        ),
                },
            ];
        },
        search(payload) {
            let { term, fromDate, toDate, sources, page, sortOrder } = payload;

            switch (sortOrder) {
                case 'newest':
                    sortOrder = 'publishedAt';
                    break;
                default:
                    sortOrder = 'relevancy';
            }

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        q: term,
                        from: fromDate,
                        to: toDate,
                        ...(sources?.length > 0 && { sources: sources.join(',') }),
                        pageSize: 10,
                        apiKey: process.env.NEWS_API_KEY,
                        page,
                        sortBy: sortOrder,
                    })
            );
        },
    },
    {
        value: 'theguardians',
        name: 'The Guardians',
        baseUrl: 'https://content.guardianapis.com/',
        searchUrlPart: 'search?',
        get filters() {
            return [
                {
                    name: 'sections',
                    defaultValue: '',
                    filterFn: () =>
                        fetch(
                            this.baseUrl +
                                'sections?' +
                                new URLSearchParams({ 'api-key': process.env.GUARDIANS_API_KEY })
                        ),
                },
            ];
        },
        transformDate(date) {
            if (new Date(date).toString() === 'Invalid Date') return;

            return new Date(date).toISOString().split('T')[0];
        },
        search(payload) {
            const { term, fromDate, toDate, section, page, sortOrder } = payload;

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        'api-key': process.env.GUARDIANS_API_KEY,
                        q: term,
                        ...(fromDate && { 'from-date': this.transformDate(fromDate) }),
                        'to-date': this.transformDate(toDate),
                        ...(section && { section }),
                        'page-size': 10,
                        'show-fields': 'thumbnail,bodyText',
                        'show-tags': 'all',
                        'order-by': sortOrder,
                        page,
                    })
            );
        },
    },
    {
        value: 'newyorktimes',
        name: 'New York Times',
        baseUrl: 'https://api.nytimes.com/',
        searchUrlPart: 'svc/search/v2/articlesearch.json?',
        get filters() {
            return [];
        },
        transformDate(date) {
            if (new Date(date).toString() === 'Invalid Date') return;

            return new Date(date).toISOString().split('T')[0].replaceAll('-', '');
        },
        search(payload) {
            const { term, fromDate, toDate, page, sortOrder } = payload;

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        'api-key': process.env.NY_TIMES_API_KEY,
                        q: term,
                        ...(fromDate && { begin_date: this.transformDate(fromDate) }),
                        end_date: this.transformDate(toDate),
                        page,
                        sort: sortOrder,
                    })
            );
        },
    },
];

const formattedApis = apis.map((api) => {
    return {
        value: api.value,
        name: api.name,
        baseUrl: api.baseUrl,
        searchUrlPart: api.searchUrlPart,
        filters: api.filters.map((filter) => {
            return {
                name: filter.name,
                defaultValue: filter.defaultValue,
            };
        }),
    };
});

Api.bulkWrite(
    formattedApis.map((api) => ({
        updateOne: {
            filter: { value: api.value },
            update: { $set: api },
            upsert: true,
        },
    }))
)
    .then(() => console.log('Apis added to db.'))
    .catch((error) => console.log(error));

module.exports = apis;

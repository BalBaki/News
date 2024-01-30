const apis = {
    newsapi: {
        value: 'newsapi',
        baseUrl: 'https://newsapi.org/v2/',
        searchUrlPart: 'everything?',
        get filters() {
            return [
                {
                    name: 'sources',
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
    theguardians: {
        value: 'theguardians',
        baseUrl: 'https://content.guardianapis.com/',
        searchUrlPart: 'search?',
        get filters() {
            return [
                {
                    name: 'sections',
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
    newyorktimes: {
        value: 'newyorktimes',
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
};

module.exports = apis;

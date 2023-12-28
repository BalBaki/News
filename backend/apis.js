const apis = {
    newsapi: {
        name: 'newsapi',
        baseUrl: 'https://newsapi.org/v2/',
        searchUrlPart: 'everything?',
        get filters() {
            return [
                {
                    name: 'sources',
                    filterFn: () =>
                        fetch(this.baseUrl + 'sources?' + new URLSearchParams({ apiKey: process.env.NEWS_API_KEY })),
                },
            ];
        },
        search(payload) {
            const { searchTerm, fromDate, toDate, sources } = payload;

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        q: searchTerm,
                        from: fromDate,
                        to: toDate,
                        ...(sources?.length > 0 && { sources: sources.join(',') }),
                        pageSize: 10,
                        apiKey: process.env.NEWS_API_KEY,
                    })
            );
        },
    },
    theguardians: {
        name: 'theguardians',
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
        search(payload) {
            const { searchTerm, fromDate, toDate, section } = payload;

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        'api-key': process.env.GUARDIANS_API_KEY,
                        q: searchTerm,
                        ...(fromDate && { 'from-date': fromDate }),
                        'to-date': toDate,
                        ...(section && { section }),
                        'page-size': 10,
                        'show-fields': 'thumbnail,bodyText',
                        'show-tags': 'all',
                        'order-by': 'newest',
                    })
            );
        },
    },
};

module.exports = apis;

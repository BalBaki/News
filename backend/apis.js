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
                        fetch(
                            this.baseUrl +
                                'top-headlines/sources?' +
                                new URLSearchParams({ apiKey: process.env.NEWS_API_KEY })
                        ),
                },
            ];
        },
        search(payload) {
            const { term, fromDate, toDate, sources, page } = payload;

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        q: term,
                        from: fromDate,
                        to: toDate,
                        ...(sources?.length > 0 && { sources: sources.join(',') }),
                        pageSize: 24,
                        apiKey: process.env.NEWS_API_KEY,
                        page,
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
            const { term, fromDate, toDate, section, page } = payload;

            return fetch(
                this.baseUrl +
                    this.searchUrlPart +
                    new URLSearchParams({
                        'api-key': process.env.GUARDIANS_API_KEY,
                        q: term,
                        ...(fromDate && { 'from-date': fromDate }),
                        'to-date': toDate,
                        ...(section && { section }),
                        'page-size': 24,
                        'show-fields': 'thumbnail,bodyText',
                        'show-tags': 'all',
                        'order-by': 'newest',
                        page,
                    })
            );
        },
    },
};

module.exports = apis;

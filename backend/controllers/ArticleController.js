const { Api } = require('../db');
const apis = require('../apis');
const { decodePayload, transformArticles } = require('../utils');
const schemas = require('../schemas');

class ArticleController {
    //Get api list
    async getApiList(request, response) {
        try {
            const listOfApis = await Api.find();

            return response.json({ success: true, apis: listOfApis });
        } catch (error) {
            response.json({ success: false, error: error.message });
        }
    }

    //Get filter settings
    //query => apiList = string[]
    async getFilterSettings(request, response) {
        try {
            const validateApiList = schemas.apiList.safeParse({ apiList: decodePayload(request.query.apiList) });
            const filters = {};

            if (!validateApiList.success) throw new Error('Invalid Data!');

            await Promise.all(
                validateApiList.data.apiList.map((api) => {
                    const currentApiData = apis.find((apiDate) => apiDate.value === api);

                    filters[api] = {};

                    if (!currentApiData) throw new Error('Not Valid Api');

                    const filterPromises = currentApiData.filters.map(async (option) => {
                        const filterResponse = await option.filterFn();
                        const isResponseInstance = filterResponse instanceof Response;

                        if (isResponseInstance && !filterResponse.ok) {
                            throw new Error('Error at Fetching Filter Option');
                        }

                        const filterOptions = isResponseInstance ? await filterResponse.json() : filterResponse;

                        filters[api][option.name] = filterOptions;
                    });

                    return Promise.all(filterPromises);
                })
            );

            return response.json({ success: true, filters });
        } catch (error) {
            response.json({ success: false, error: error.message });
        }
    }

    //payload => term, apiList, fromDate, toDate, page, sortOrder, extraFilters = {...},
    async search(request, response) {
        try {
            const validateSearch = schemas.search.safeParse(decodePayload(request.query.filter));

            if (!validateSearch.success) throw new Error('Invalid Data!');

            const { apiList, term, fromDate, toDate, page, sortOrder, extraFilters } = validateSearch.data;

            const responses = await Promise.all(
                apiList.reduce((promises, apiValue) => {
                    const currentApi = apis.find((api) => api.value === apiValue);

                    if (currentApi)
                        promises.push(
                            currentApi.search({ term, fromDate, toDate, page, sortOrder, ...extraFilters[apiValue] })
                        );

                    return promises;
                }, [])
            );
            const filteredResponses = responses.filter((searchResponse) => searchResponse && searchResponse.ok);

            if (filteredResponses.length < 1) throw new Error('Error at Fetching Articles');

            const values = await Promise.all(filteredResponses.map((searchResponse) => searchResponse.json()));
            const articles = {};
            const errors = [];

            values.forEach((result) => {
                //newsapi
                if (result?.articles?.length > 0) {
                    articles['newsapi'] = {};

                    articles['newsapi'].result = result.articles;
                    articles['newsapi'].count = result.totalResults;
                }

                //theguardians
                if (result?.response?.results?.length > 0) {
                    articles['theguardians'] = {};

                    articles['theguardians'].result = result.response.results;
                    articles['theguardians'].count = result.response.total;
                }

                //new york times
                if (result?.response?.docs?.length > 0) {
                    articles['newyorktimes'] = {};

                    articles['newyorktimes'].result = result.response.docs;
                    articles['newyorktimes'].count = result.response.meta.hits;
                }

                if (result?.status === 'error' || result?.response?.status === 'error' || result?.message) {
                    errors.push(result?.message || result?.response?.message);
                }
            });

            if (errors.length > 0) throw new Error('Error at Fetching Articles');

            response.json({
                search: true,
                page,
                articles: transformArticles(articles),
            });
        } catch (error) {
            response.json({ search: false, error: error.message });
        }
    }
}

module.exports = ArticleController;

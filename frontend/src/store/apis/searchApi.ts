import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type FilterSettings,
    type SearchResponse,
    type FetchApisResponse,
    type FetchFiltersResponse,
} from '../../types';

const searchApi = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
    }),
    endpoints(builder) {
        return {
            search: builder.query<SearchResponse, FilterSettings>({
                query: (payload) => {
                    const transformedPayload = { ...payload };

                    transformedPayload.term = payload.term.toLocaleLowerCase();

                    return {
                        method: 'GET',
                        url: '/search',
                        params: {
                            filter: encodeURIComponent(JSON.stringify(transformedPayload)),
                        },
                    };
                },
            }),
            fetchApis: builder.query<FetchApisResponse, void>({
                query: () => {
                    return {
                        method: 'GET',
                        url: '/apis',
                    };
                },
            }),
            fetchFilters: builder.query<FetchFiltersResponse, { apiList: string[] }>({
                query: (payload) => {
                    return {
                        method: 'GET',
                        url: '/filtersV2',
                        params: { apiList: encodeURIComponent(JSON.stringify(payload.apiList)) },
                    };
                },
            }),
        };
    },
});

export { searchApi };
export const { useLazySearchQuery, useFetchApisQuery, useFetchFiltersQuery } = searchApi;

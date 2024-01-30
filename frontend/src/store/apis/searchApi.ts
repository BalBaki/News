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
            search: builder.mutation<SearchResponse, FilterSettings>({
                query: (payload) => {
                    const transformedPayload = { ...payload };

                    transformedPayload.term = payload.term.toLocaleLowerCase();

                    return {
                        method: 'POST',
                        url: '/search',
                        body: { payload: encodeURIComponent(JSON.stringify(transformedPayload)) },
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
            fetchFilters: builder.query<FetchFiltersResponse, { apiNames: string[] }>({
                query: (payload) => {
                    return {
                        method: 'GET',
                        url: '/filtersV2',
                        params: { apiNames: encodeURIComponent(JSON.stringify(payload.apiNames)) },
                    };
                },
            }),
        };
    },
});

export { searchApi };
export const { useSearchMutation, useFetchApisQuery, useFetchFiltersQuery } = searchApi;

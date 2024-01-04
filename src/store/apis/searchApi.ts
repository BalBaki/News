import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type FilterSettings } from '../../types';

interface Api {
    _id: string;
    name: string;
    url: string;
    searchUrlPart: string;
    filters: string[];
}

type SearchResponse =
    | {
          search: true;
          articles: any[]; // News interface eklenecek.
          error?: never;
      }
    | {
          search: false;
          error: string;
          articles?: never;
      };

type FetchApisResponse =
    | {
          success: true;
          apis: Api[];
          error?: never;
      }
    | {
          success: false;
          apis?: never;
          error?: string;
      };

const searchApi = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
    }),
    endpoints(builder) {
        return {
            search: builder.mutation<SearchResponse, FilterSettings>({
                query: (payload) => {
                    return {
                        method: 'POST',
                        url: '/search',
                        body: { payload: encodeURIComponent(JSON.stringify(payload)) },
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
        };
    },
});

export { searchApi };
export const { useSearchMutation, useFetchApisQuery } = searchApi;

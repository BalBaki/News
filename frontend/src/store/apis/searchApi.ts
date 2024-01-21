import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type News, type FilterSettings } from '../../types';

interface ExtraFilter {
    name: string;
    defaultValue: Array<any> | Object | string;
}

interface Api {
    _id: string;
    value: string;
    name: string;
    url: string;
    searchUrlPart: string;
    filters: ExtraFilter[];
}

type SearchResponse =
    | {
          search: true;
          articles: {
              [key: string]: News[];
          };
          page: number;
          totalArticleCount: number;
          maxNewsCount: number;
          error?: never;
      }
    | {
          search: false;
          error: string;
          articles?: never;
          page?: never;
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
          error: string;
      };

type FetchFiltersResponse =
    | {
          success: true;
          filters: { [key: string]: any };
          error?: never;
      }
    | {
          success: false;
          filters?: never;
          error: string;
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

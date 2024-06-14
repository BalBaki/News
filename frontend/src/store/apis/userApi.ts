import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type LoginForm,
    type RegisterForm,
    type RegisterResponse,
    type LoginResponse,
    type LogoutResponse,
    type SaveSettingsResponse,
    type VerifyResponse,
    type ChangeFavoritesResponse,
    type News,
    type FetchFavoritesResponse,
    type SavedFilterSettings,
} from '../../types';

interface ChangeFavorite {
    type: 'add' | 'remove';
    news: News;
}

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + '/user',
        credentials: 'include',
    }),
    tagTypes: ['Favorite'],
    endpoints(builder) {
        return {
            register: builder.mutation<RegisterResponse, RegisterForm>({
                query: (payload) => {
                    const { confirmPassword, ...rest } = payload;

                    return {
                        method: 'POST',
                        url: '/register',
                        body: {
                            payload: encodeURIComponent(JSON.stringify(rest)),
                        },
                    };
                },
            }),
            login: builder.mutation<LoginResponse, LoginForm>({
                query: (payload) => {
                    return {
                        method: 'POST',
                        url: '/login',
                        body: {
                            payload: encodeURIComponent(JSON.stringify(payload)),
                        },
                    };
                },
            }),
            logout: builder.mutation<LogoutResponse, void>({
                query: () => {
                    return {
                        method: 'POST',
                        url: '/logout',
                    };
                },
            }),
            verify: builder.query<VerifyResponse, void>({
                query: () => {
                    return {
                        method: 'GET',
                        url: '/verify',
                    };
                },
            }),
            saveSettings: builder.mutation<SaveSettingsResponse, SavedFilterSettings>({
                query: (payload) => {
                    return {
                        method: 'POST',
                        url: '/savesettings',
                        body: {
                            payload: encodeURIComponent(JSON.stringify(payload)),
                        },
                    };
                },
            }),
            fetchFavorites: builder.query<FetchFavoritesResponse, void>({
                providesTags: [{ type: 'Favorite' }],
                query: () => {
                    return {
                        method: 'GET',
                        url: 'favorites',
                    };
                },
            }),
            changeFavorite: builder.mutation<ChangeFavoritesResponse, ChangeFavorite>({
                invalidatesTags: (result) => (result?.success ? [{ type: 'Favorite' }] : []),
                query: (payload) => {
                    return {
                        method: 'POST',
                        url: '/favorite',
                        body: {
                            payload: encodeURIComponent(JSON.stringify(payload)),
                        },
                    };
                },
            }),
        };
    },
});

export { userApi };
export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useLazyVerifyQuery,
    useSaveSettingsMutation,
    useChangeFavoriteMutation,
    useFetchFavoritesQuery,
} = userApi;

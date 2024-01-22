import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type LoginForm,
    type RegisterForm,
    type RegisterResponse,
    type LoginResponse,
    type LogoutResponse,
    type SaveSettingsResponse,
    type VerifyResponse,
} from '../../types';

interface SearchSettings {
    apiNames: string[];
    fromDate: string | Date;
    toDate: string | Date;
    extraFilters: {
        [key: string]: any;
    };
}

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            register: builder.mutation<RegisterResponse, RegisterForm>({
                query: (payload) => {
                    return {
                        method: 'POST',
                        url: '/register',
                        body: {
                            payload: encodeURIComponent(JSON.stringify(payload)),
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
            verify: builder.mutation<VerifyResponse, void>({
                query: () => {
                    return {
                        method: 'POST',
                        url: '/verify',
                    };
                },
            }),
            saveSettings: builder.mutation<SaveSettingsResponse, SearchSettings>({
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
        };
    },
});

export { userApi };
export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useVerifyMutation, useSaveSettingsMutation } =
    userApi;

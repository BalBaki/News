import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginForm, RegisterForm, User } from '../../types';

interface Response {
    user?: User;
    error?: string;
}

interface RegisterResponse extends Response {
    register: boolean;
}

interface LoginResponse extends Response {
    login: boolean;
}

interface VerifyResponse extends Response {
    verify: boolean;
}

interface LogoutResponse {
    logout: boolean;
}

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_USER_API_URL,
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
            logut: builder.mutation<LogoutResponse, void>({
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
            saveSettings: builder.mutation({
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
export const { useRegisterMutation, useLoginMutation, useLogutMutation, useVerifyMutation, useSaveSettingsMutation } =
    userApi;

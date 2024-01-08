import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type LoginForm, RegisterForm, User } from '../../types';

type LoginResponse =
    | {
          login: true;
          user: User;
          error?: never;
      }
    | {
          login: false;
          error: string;
          user?: never;
      };

type RegisterResponse =
    | {
          register: true;
          user: User;
          error?: never;
      }
    | {
          register: false;
          error: string;
          user?: never;
      };

type VerifyResponse =
    | {
          verify: true;
          user: User;
          error?: never;
      }
    | {
          verify: false;
          error: string;
          user?: never;
      };

type LogoutResponse =
    | {
          logout: true;
          error?: never;
      }
    | {
          logout: false;
          error: string;
      };

type SaveSettingsResponse =
    | {
          save: true;
          error?: never;
      }
    | {
          save: false;
          error: string;
      };

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

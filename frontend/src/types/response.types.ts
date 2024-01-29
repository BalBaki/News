import { type News } from './news.interface';
import { type User } from './user.interface';

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

export type SearchResponse =
    | {
          search: true;
          articles: {
              [keys: string]: {
                  count: number;
                  result: News[];
              };
          };
          page: number;
          error?: never;
      }
    | {
          search: false;
          error: string;
          articles?: never;
          page?: never;
      };

export type FetchApisResponse =
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

export type FetchFiltersResponse =
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

export type LoginResponse =
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

export type RegisterResponse =
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

export type VerifyResponse =
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

export type LogoutResponse =
    | {
          logout: true;
          error?: never;
      }
    | {
          logout: false;
          error: string;
      };

export type SaveSettingsResponse =
    | {
          save: true;
          error?: never;
      }
    | {
          save: false;
          error: string;
      };

export type ChangeFavoritesResponse =
    | {
          success: true;
          error?: never;
      }
    | {
          success: false;
          error: string;
      };

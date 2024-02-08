import * as t from 'io-ts';
import { type FilterSettings } from '../types';

const FilterSettingsType = t.type({
    term: t.string,
    page: t.number,
    apiList: t.array(t.string),
    fromDate: t.string,
    toDate: t.string,
    sortOrder: t.string,
    extraFilters: t.record(t.string, t.any),
});

export const UrlParser = (queryString: string | undefined | null): FilterSettings | false => {
    try {
        if (queryString) {
            const parsedString = JSON.parse(decodeURIComponent(queryString));

            return (
                parsedString &&
                typeof parsedString === 'object' &&
                FilterSettingsType.decode(parsedString)._tag === 'Right' &&
                parsedString
            );
        }

        return false;
    } catch (error) {
        return false;
    }
};

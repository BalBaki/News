import { type FilterSettings } from './filterSettings.interface';

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    filterSettings: FilterSettings;
}

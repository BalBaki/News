import { type FilterSettings } from './filterSettings.interface';
import { type News } from './news.interface';

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    filterSettings: FilterSettings;
    favorites: News[];
}

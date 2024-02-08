import { type SavedFilterSettings } from './savedFilterSettings.interface';
import { type News } from './news.interface';

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    filterSettings: SavedFilterSettings;
    favorites: News[];
}

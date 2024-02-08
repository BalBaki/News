import { type SavedFilterSettings } from './savedFilterSettings.interface';

export interface FilterSettings extends SavedFilterSettings {
    term: string;
    page: number;
}

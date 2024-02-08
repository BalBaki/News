export interface SavedFilterSettings {
    apiList: string[];
    fromDate: string | Date;
    toDate: string | Date;
    sortOrder: string;
    extraFilters: {
        [key: string]: any;
    };
}

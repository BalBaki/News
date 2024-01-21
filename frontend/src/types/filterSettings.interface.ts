export interface FilterSettings {
    term: string;
    apiNames: string[];
    fromDate: string | Date;
    toDate: string | Date;
    page: number;
    sortOrder: string;
    extraFilters: {
        [key: string]: any;
    };
}

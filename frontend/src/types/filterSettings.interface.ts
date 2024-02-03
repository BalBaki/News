export interface FilterSettings {
    term: string;
    apiList: string[];
    fromDate: string | Date;
    toDate: string | Date;
    page: number;
    sortOrder: string;
    extraFilters: {
        [key: string]: any;
    };
}

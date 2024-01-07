export interface FilterSettings {
    term: string;
    apiNames: string[];
    fromDate: string | Date;
    toDate: string | Date;
    page: number;
    extraFilters: {
        [key: string]: any;
    };
}

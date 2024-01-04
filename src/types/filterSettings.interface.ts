export interface FilterSettings {
    term: string;
    apiNames: string[];
    fromDate: string | Date;
    toDate: string | Date;
    extraFilters: {
        [key: string]: {
            [key: string]: any;
        };
    };
}

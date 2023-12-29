export interface FilterSettings {
    term: string;
    fromDate?: Date;
    toDate: Date;
    sections?: string | string[];
    sources?: string | string[];
}

import { SearchResult, defaultSearchResult } from "../../Search/State/SearchState";

export default interface SearchModuleState {
    searchResult: SearchResult[];
    searchTerm: string;
    selectedCase: SearchResult;
    loading: boolean;
    summary: SummaryState;
    count: number;
    fileId: number[];
    countLoader: boolean;
    appliedFilters: any[];
}

export interface SummaryState {
    appealID: number;
    fileID: number;
    createdBy: string;
    title: string;
    sentences: string[];
}

export function defaultSearchModuleState(): SearchModuleState {
    return {
        searchResult: [],
        searchTerm: '',
        selectedCase: defaultSearchResult(),
        loading: false,
        summary: {
            sentences: [],
            appealID: 0,
            fileID: 0,
            createdBy: '',
            title: ''
        },
        count: 0,
        fileId: [],
        countLoader: false,
        appliedFilters: []
    };
}
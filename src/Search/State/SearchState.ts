import { defaultPageSize } from "../../Constants/const"

export default interface SearchState {
    searchResult: SearchResult[];
    searchLoader: boolean;
    pageSize: number;
    count: number;
    uniqueFileIds: number[];
    countLoader: boolean;
}

export interface SearchResult {
    uniqueFileId: number;
    title: string;
    contractType: string;
    uploadedOn: string;
    uploadedBy: string;
    content: string;
}

export function defaultSearchResult(): SearchResult {
    return {
        uniqueFileId: -1,
        title: '',
        contractType: '',
        uploadedOn: '',
        uploadedBy: '',
        content: ''
    }
}
export function defaultSearchState(): SearchState {
    return {
        searchResult: [],
        searchLoader: false,
        pageSize: defaultPageSize,
        count: 0,
        uniqueFileIds: [],
        countLoader: false
    }
}
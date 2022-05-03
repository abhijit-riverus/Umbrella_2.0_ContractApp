import { AppliedFilters } from "../../Aggregates/State/AggregatesState";
import { SearchResult } from "../State/SearchState";

export const SEARCH = 'SEARCH';
export type SEARCH = typeof SEARCH;
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export type SEARCH_SUCCESS = typeof SEARCH_SUCCESS;
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export type SEARCH_FAILURE = typeof SEARCH_FAILURE;

export const SEARCHCOUNT = 'SEARCHCOUNT';
export type SEARCHCOUNT = typeof SEARCHCOUNT;
export const SEARCHCOUNT_SUCCESS = 'SEARCHCOUNT_SUCCESS';
export type SEARCHCOUNT_SUCCESS = typeof SEARCHCOUNT_SUCCESS;
export const SEARCHCOUNT_FAILURE = 'SEARCHCOUNT_FAILURE';
export type SEARCHCOUNT_FAILURE = typeof SEARCHCOUNT_FAILURE;

export interface Search {
    type: SEARCH;
    payload: {
        searchTerm: string;
        sortBy: string;
        pageSize: number;
    };
}
export interface SearchSuccess {
    type: SEARCH_SUCCESS;
    payload: {
        searchResult: SearchResult[];
    }
}
export interface SearchFailure {
    type: SEARCH_FAILURE;
}
export interface SearchCount {
    type: SEARCHCOUNT;
    payload: {
        sortBy: string;
        filters: AppliedFilters[];
    };
}
export interface SearchCountSuccess {
    type: SEARCHCOUNT_SUCCESS;
    payload: {
        count: number;
        uniqueFileIds: number[];
    }
}
export interface SearchCountFailure {
    type: SEARCHCOUNT_FAILURE;
}
export type SearchPageAction = Search |
    SearchSuccess |
    SearchFailure |
    SearchCount |
    SearchCountSuccess |
    SearchCountFailure ;
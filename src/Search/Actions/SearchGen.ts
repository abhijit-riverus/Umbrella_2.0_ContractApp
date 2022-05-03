import { Search, SEARCH, SearchSuccess, SEARCH_SUCCESS, SearchFailure, SEARCH_FAILURE, SEARCHCOUNT, SearchCount, SearchCountFailure, SearchCountSuccess, SEARCHCOUNT_FAILURE, SEARCHCOUNT_SUCCESS } from "./SearchDef";
import { SearchResult } from "../State/SearchState";
import { AppliedFilters } from "../../Aggregates/State/AggregatesState";

export default class SearchActionGen {
    public static search(searchTerm: string, sortBy: string, pageSize: number): Search {
        return {
            type: SEARCH,
            payload: {
                searchTerm: searchTerm,
                sortBy: sortBy,
                pageSize: pageSize
            }
        };
    }
    public static searchSuccess(searchResult: SearchResult[]): SearchSuccess {
        return {
            type: SEARCH_SUCCESS,
            payload: {
                searchResult: searchResult
            }
        };
    }
    public static searchFailure(): SearchFailure {
        return {
            type: SEARCH_FAILURE
        };
    }
    public static searchCount(sortBy: string, filters: AppliedFilters[]): SearchCount {
        return {
            type: SEARCHCOUNT,
            payload: {
                sortBy: sortBy,
                filters: filters
            }
        };
    }
    public static searchCountSuccess(count: number, uniqueFileIds: number[]): SearchCountSuccess {
        return {
            type: SEARCHCOUNT_SUCCESS,
            payload: {
                count: count,
                uniqueFileIds: uniqueFileIds
            }
        };
    }
    public static searchCountFailure(): SearchCountFailure {
        return {
            type: SEARCHCOUNT_FAILURE
        };
    }
}
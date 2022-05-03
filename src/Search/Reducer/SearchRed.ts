import SearchState, { defaultSearchState } from "../State/SearchState";
import { SEARCH, SEARCH_SUCCESS, SearchPageAction, SEARCH_FAILURE, SEARCHCOUNT, SEARCHCOUNT_FAILURE, SEARCHCOUNT_SUCCESS } from "../Actions/SearchDef";

export default function searchReducer(state: SearchState = defaultSearchState(), action: SearchPageAction): SearchState {
    switch (action.type) {
        case SEARCH: {
            return { ...state, searchLoader: true, pageSize: action.payload.pageSize };
        }
        case SEARCH_SUCCESS: {
            return { ...state, searchResult: action.payload.searchResult, searchLoader: false };
            // dont wait for old result if new search term added
        }
        case SEARCH_FAILURE: {
            return { ...state, searchLoader: false };
        }
        case SEARCHCOUNT: {
            return { ...state, countLoader: true };
        }
        case SEARCHCOUNT_SUCCESS: {
            return { ...state, count: action.payload.count, uniqueFileIds: action.payload.uniqueFileIds, countLoader: false };
        }
        case SEARCHCOUNT_FAILURE: {
            return { ...state, countLoader: false };
        }
        default: return state;
    }
}
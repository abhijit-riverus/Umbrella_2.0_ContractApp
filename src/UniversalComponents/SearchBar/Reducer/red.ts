import { TOGGLESEARCHBARVISIBLESTATE, SearchBarActions, TEXTCHANGE } from "../Action/def";
import SearchBarState, { defaultSearchBarState } from "../State/searchBarState";

export default function SearchBarReducer(state: SearchBarState = defaultSearchBarState(), action: SearchBarActions): SearchBarState {
    switch (action.type) {
        case TOGGLESEARCHBARVISIBLESTATE: {
            return { ...state, visibility: action.payload.visibility };
        }
        case TEXTCHANGE: {
            return { ...state, term: action.payload.term };
        }
        default: return state;
    }
}
import SearchModuleState, { defaultSearchModuleState } from "../State/searchModuleState";
import { SearchModuleAction, SELECTCASE, EMPTYRESULTS } from "../Actions/searchModuleDef";

export default function searchModuleReducer(state: SearchModuleState = defaultSearchModuleState(), action: SearchModuleAction): SearchModuleState {
    switch (action.type) {
        case SELECTCASE: {
            return { ...state, selectedCase: action.payload.searchCase };
        }
        case EMPTYRESULTS: {
            return { ...state, searchResult: [] }
        }
        default: return state;
    }
}
import AppState, { defaultAppState } from "../State/appState";
import { PAGEWATCHER, AppActions } from "../Actions/def";

export default function appReducer(state: AppState = defaultAppState(), action: AppActions): AppState {
    switch (action.type) {
        case PAGEWATCHER: {
            return { ...state, pageType: action.payload.pageType };
        }
        default: return state;
    }
}
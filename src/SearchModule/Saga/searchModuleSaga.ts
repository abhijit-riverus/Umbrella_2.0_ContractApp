import { put, all, takeLatest } from "@redux-saga/core/effects";
import { EMPTYRESULTS } from "../Actions/searchModuleDef";
import SearchActionGen from "../../Search/Actions/SearchGen";
import SearchBarActionGenerator from "../../UniversalComponents/SearchBar/Action/actionGen"

export function* emptyResultSet() {
    yield all([
        put(SearchActionGen.searchSuccess([])),
        put(SearchBarActionGenerator.changeText('')),
        put(SearchBarActionGenerator.toggleVisibility(false)),
    ]);
}
export default function* searchModuleWatcher() {
    yield all([
        takeLatest(EMPTYRESULTS, emptyResultSet)
    ])
}
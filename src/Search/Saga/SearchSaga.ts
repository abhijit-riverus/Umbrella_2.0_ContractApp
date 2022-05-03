import { Search, SEARCH, SEARCHCOUNT, SearchCount } from "../Actions/SearchDef";
import SearchAPI from "../Actions/SearchAPI";
import { SearchResult } from "../State/SearchState";
import SearchActionGen from "../Actions/SearchGen";
import { call, put, all, takeLatest } from "@redux-saga/core/effects";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import AggregatesActionGenerator from "../../Aggregates/Actions/AggregatesGen";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
export function* search(action: Search) {
	try {
		let url = SITEAPI + "search";
		let searchTerm = atob(action.payload.searchTerm);
		let sort = action.payload.sortBy;
		let pageSize = action.payload.pageSize;
		let response = yield call(SearchAPI.search, url, {
			searchTerm,
			pageSize,
		});
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as SearchResult[];
				yield put(SearchActionGen.searchSuccess(parsed));
				break;
			}
			default: {
				yield put(SearchActionGen.searchFailure());
			}
		}
	} catch (e) {
		yield put(SearchActionGen.searchFailure());
	}
}

export function* searchCount(action: SearchCount) {
	try {
		let url = SITEAPI + "search/count";
		let filters = action.payload.filters;
		let sort = action.payload.sortBy;
		let response = yield call(SearchAPI.count, url, { filters });
		switch (response.status) {
			case 200: {
				let count = response.data.queryResult.count;
				let uniqueFileIds = response.data.queryResult.uniqueFileIds;
				yield put(
					SearchActionGen.searchCountSuccess(count, uniqueFileIds)
				);
				yield put(
					AggregatesActionGenerator.getFilterConfig(
						uniqueFileIds,
						filters
					)
				);
				break;
			}
			default: {
				yield put(SearchActionGen.searchCountFailure());
			}
		}
	} catch (e) {
		yield put(SearchActionGen.searchCountFailure());
	}
}

export default function* searchPageWatcher() {
	yield all([
		takeLatest(SEARCH, search),
		takeLatest(SEARCHCOUNT, searchCount),
	]);
}

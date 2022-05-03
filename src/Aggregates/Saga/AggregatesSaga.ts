import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import {
	GetFilterConfig,
	GETFILTERCONFIG,
	GetAggregates,
	GETAGGREGATES,
	AddFilter,
	ADDFILTER,
	DeleteFilter,
	DELETEFILTER,
	FilterResult,
	FILTERRESULT,
	SearchFilter,
	SEARCHFILTER,
} from "../Actions/AggregatesDef";
import AggregatesAPI from "../Actions/AggregatesAPI";
import AggregatesActionGenerator from "../Actions/AggregatesGen";
import { FilterConfig, AggregateState } from "../State/AggregatesState";
import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import AggregateUtils from "../Utils/utils";
import { SearchResult } from "../../Search/State/SearchState";
import SearchActionGen from "../../Search/Actions/SearchGen";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());

function* getFilterConfig(action: GetFilterConfig) {
	// got aggregate configurations
	try {
		let uniqueFileIds = action.payload.uniqueFileIds;
		let url = SITEAPI + "search/filter/config";
		let filter = action.payload.filter;
		let response = yield call(AggregatesAPI.getFilterConfig, url);
		switch (response.status) {
			case 200: {
				let filterConfig = response.data.queryResult as FilterConfig[];
				yield put(
					AggregatesActionGenerator.getFilterConfigSuccess(
						filterConfig
					)
				);
				// on every success filter config, call for aggregates
				for (let i = 0; i < filterConfig.length; i++) {
					yield put(
						AggregatesActionGenerator.getAggregates(
							{
								value: "",
								level: filterConfig[i].baseLevel,
								sort: "count",
								label: filterConfig[i].label,
								type: filterConfig[i].type,
							},
							filter,
							filterConfig[i].type,
							uniqueFileIds
						)
					);
				}
				break;
			}
			default: {
				yield put(AggregatesActionGenerator.getFilterConfigFailure());
			}
		}
	} catch {
		yield put(AggregatesActionGenerator.getFilterConfigFailure());
	}
}

function* getAggregates(action: GetAggregates) {
	try {
		var value = "";
		var level = -1;
		var page = "";
		var sort = "";
		let url: string = "";
		let data = action.payload.data;
		let filter = action.payload.filter;
		let path = action.payload.path;
		let fileId = action.payload.fileId;
		var type = "master_search";

		if (data.value.includes("/")) {
			url =
				SITEAPI + "search/filter/aggregate/" + data.value.split("/")[0];
			var set = data.value.split("/");
			value = set[set.length - 1];
			level = data.level;
			sort = data.sort;
		} else {
			value = data.value;
			level = data.level;
			sort = data.sort;
			url = SITEAPI + "search/filter/aggregate/" + data.type;
		}

		let response = yield call(AggregatesAPI.getAggregates, url, {
			value,
			level,
			page,
			sort,
			type,
			filter,
			fileId,
		});
		switch (response.status) {
			case 200: {
				let aggregates = response.data.queryResult as AggregateState[];
				yield put(
					AggregatesActionGenerator.getAggregatesSuccess(
						aggregates,
						path
					)
				);
				break;
			}
			default: {
				yield put(AggregatesActionGenerator.getAggregatesFailure());
			}
		}
	} catch {
		yield put(AggregatesActionGenerator.getAggregatesFailure());
	}
}

function* deleteFilter(action: DeleteFilter) {
	let filters = action.payload.filters;
	let path = action.payload.path;
	let sort = action.payload.sort;
	let page = action.payload.page;
	let window = action.payload.window;
	let pageNumber = action.payload.pageNumber;
	AggregateUtils.deleteByPath(filters, path, 0);
	yield put(AggregatesActionGenerator.addFilterSuccess(filters));
	yield put(
		AggregatesActionGenerator.filterResult(
			filters,
			sort,
			window,
			true,
			true
		)
	);
}

function* addFilter(action: AddFilter) {
	let filters = action.payload.filters;
	let path = action.payload.path.replace(/\/\//g, "/");
	let operator = action.payload.operator;
	let type = action.payload.type;
	let value = action.payload.value;
	let alias = action.payload.alias;
	let sort = action.payload.sort;
	let page = action.payload.page;
	let window = action.payload.window;
	let pageNumber = action.payload.pageNumber;
	let display = action.payload.display;
	let permission = action.payload.permission;
	let modFilters = AggregateUtils.addFilter(
		filters,
		value,
		path,
		operator,
		type,
		alias,
		display,
		permission
	);
	yield put(AggregatesActionGenerator.addFilterSuccess(modFilters));
	yield put(
		AggregatesActionGenerator.filterResult(
			modFilters,
			sort,
			window,
			true,
			true
		)
	);
}

function* filterResult(action: FilterResult) {
	let url = SITEAPI + "search/filter";
	let sort = action.payload.sort;
	let window = action.payload.window;
	let filters = action.payload.appliedFilters;
	let setToDefault = action.payload.setToDefault;
	try {
		let object = {
			sort: sort,
			window: window,
			filter: filters,
		};
		let response = yield call(AggregatesAPI.filterResult, url, object);
		switch (response.status) {
			case 200: {
				let result = response.data.queryResult as SearchResult[];
				yield put(
					AggregatesActionGenerator.filterResultSuccess(
						sort,
						result.length === 0,
						setToDefault
					)
				);
				if (result.length > 0) {
					yield put(SearchActionGen.searchSuccess(result));
				}
			}
			default: {
				yield put(AggregatesActionGenerator.filterResultFailure());
			}
		}
	} catch (e) {
		yield put(AggregatesActionGenerator.filterResultFailure());
	}
}

export function* searchFilter(action: SearchFilter) {
	let url = SITEAPI + "search/filter/aggregatesearch";
	let payload = action.payload;
	let aggregateType = action.payload.aggregateType;
	let apiObject = {
		value: action.payload.value,
		level: action.payload.level,
		page: action.payload.page,
		sort: action.payload.sort,
		type: action.payload.type,
		filter: action.payload.filter,
		fileId: action.payload.fileId,
		aggregateType: action.payload.aggregateType,
	};
	if (payload.value === "") {
		yield put(AggregatesActionGenerator.searchFilterSuccess([]));
	} else {
		let response = yield call(AggregatesAPI.searchFilter, url, apiObject);
		if (response.status === 200) {
			let parsed = response.data.queryResult as AggregateState[];
			for (let i = 0; i < parsed.length; i++) {
				parsed[i].path =
					aggregateType + "/" + parsed[i].value.replace(/\/\//g, "/");
				parsed[i].childrenCount = 0;
				parsed[i].value = AggregateUtils.getSectionValue(
					parsed[i].value,
					"value"
				);
			}
			yield put(AggregatesActionGenerator.searchFilterSuccess(parsed));
		} else {
			//Nothing
		}
	}
}

export default function* aggregateWatcher() {
	yield all([
		takeLatest(GETFILTERCONFIG, getFilterConfig),
		takeEvery(GETAGGREGATES, getAggregates),
		takeLatest(ADDFILTER, addFilter),
		takeLatest(DELETEFILTER, deleteFilter),
		takeLatest(FILTERRESULT, filterResult),
		takeLatest(SEARCHFILTER, searchFilter),
	]);
}

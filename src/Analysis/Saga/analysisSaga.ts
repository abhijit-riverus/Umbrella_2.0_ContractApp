import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import { call, put, all, takeLatest } from "redux-saga/effects";
import {
	GetAnalysisFileId,
	GETANALYSISFILEID,
	GetAnalysis,
	GETANALYSIS,
	GetGeneralFilter,
	GETGENERALFILTER,
	ApplyGeneralFilter,
	APPLYGENERALFILTER,
	GetAdvancedFilter,
	ApplyAdvancedFilter,
	GETADVANCEDFILTER,
	APPLYADVANCEDFILTER,
	GetTableConfig,
	GETTABLECONFIG,
	UpdatePreference,
	UPDATEPREFERENCE,
	GenerateReport,
	GENERATEREPORT,
	GetAnalysisFilterConfig,
	GETANALYSISFILTERCONFIG,
	GETFILTERAGGREGATE,
	GETFILTEREDCOUNT,
	APPLYANALYSISFILTER,
	GetFilterAggregate,
	GetFilteredCount,
	ApplyAnalysisFilter,
} from "../Actions/def";
import AnalysisAPI from "../Actions/API";
import AnalysisActionGenerator from "../Actions/gen";
import {
	AnalysisPoints,
	AdvancedFilter,
	ConfigItem,
	FilterConfigStructure,
	FilterAggregateStructure,
} from "../State/analysisState";
import { isNullOrUndefined } from "is-what";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getAnalysisFileId(action: GetAnalysisFileId) {
	let url = SITEAPI + "analysis/files";
	try {
		let response = yield call(AnalysisAPI.getAnalysisFileIdArray, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileIds as number[];
				yield put(
					AnalysisActionGenerator.getAnalysisFileIdSuccess(parsed)
				);
				yield put(AnalysisActionGenerator.getAnalysis(parsed));
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.getAnalysisFileIdFailure());
			}
		}
	} catch (e) {
		yield put(AnalysisActionGenerator.getAnalysisFileIdFailure());
	}
}

function* getTableConfig(action: GetTableConfig) {
	let url = SITEAPI + "analysis/config";
	try {
		let response = yield call(AnalysisAPI.getTableConfig, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as ConfigItem[];
				yield put(
					AnalysisActionGenerator.getTableConfigSuccess(parsed)
				);
				break;
			}
			default: {
				//do nothing
			}
		}
	} catch (e) {
		//nothing
	}
}

function* getAnalysisData(action: GetAnalysis) {
	let url = SITEAPI + "analysis/data";
	let fileIds = action.payload.fileIds;
	try {
		let response = yield call(AnalysisAPI.getAnalysisData, url, fileIds);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as AnalysisPoints[];
				yield put(AnalysisActionGenerator.getAnalysisSuccess(parsed));
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.getAnalysisFailure());
			}
		}
	} catch (e) {
		yield put(AnalysisActionGenerator.getAnalysisFailure());
	}
}

function* getGeneralFilter(actions: GetGeneralFilter) {
	let url = SITEAPI + "analysis/filter/general";
	let fileIds = actions.payload.fileIds;
	try {
		let response = yield call(AnalysisAPI.getGeneralFilter, url, fileIds);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.generalFilters;
				yield put(
					AnalysisActionGenerator.getGeneralFilterSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.getGeneralFilterFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.getGeneralFilterFailure());
	}
}

function* applyGeneralFilter(actions: ApplyGeneralFilter) {
	let fileIds = actions.payload.filterIds;
	let filterType = actions.payload.filterType;
	let url = SITEAPI + "analysis/filter/general/apply";
	try {
		let response = yield call(
			AnalysisAPI.applyGeneralFilter,
			url,
			fileIds,
			filterType
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileIds as number[];
				yield put(
					AnalysisActionGenerator.applyGeneralFilterSuccess(parsed)
				);
				yield put(AnalysisActionGenerator.getAnalysis(parsed));
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.applyGeneralFilterFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.applyGeneralFilterFailure());
	}
}

function* getAdvancedFilter(actions: GetAdvancedFilter) {
	let url = SITEAPI + "analysis/filter/advanced";
	let fileIds = actions.payload.fileIds;
	try {
		let response = yield call(AnalysisAPI.getAdvancedFilter, url, fileIds);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult
					.advancedFilters as AdvancedFilter[];
				yield put(
					AnalysisActionGenerator.getAdvancedFilterSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.getAdvancedFilterFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.getAdvancedFilterFailure());
	}
}

function* applyAdvancedFilter(actions: ApplyAdvancedFilter) {
	let fileIds = actions.payload.filterIds;
	let filterStructure = actions.payload.filterStructure;
	let url = SITEAPI + "analysis/filter/advanced/apply";
	try {
		let response = yield call(
			AnalysisAPI.applyAdvancedFilter,
			url,
			fileIds,
			filterStructure
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.filteredIds as number[];
				let advancedFilters = response.data.queryResult
					.advancedFilters as AdvancedFilter[];
				let count = response.data.queryResult.count;
				yield put(
					AnalysisActionGenerator.applyAdvancedFilterSuccess(
						parsed,
						count,
						advancedFilters
					)
				);
				yield put(AnalysisActionGenerator.getAnalysis(parsed));
				yield put(AnalysisActionGenerator.getGeneralFilter(parsed));
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.applyAdvancedFilterFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.applyAdvancedFilterFailure());
	}
}

function* updatePreference(actions: UpdatePreference) {
	let url = SITEAPI + "analysis/preference";
	let payload = {
		display: actions.payload.display,
		columnName: actions.payload.columnName,
	};
	let refreshTable = actions.payload.refreshTable;
	try {
		let response = yield call(AnalysisAPI.updatePreference, url, payload);
		switch (response.status) {
			case 200: {
				if (!isNullOrUndefined(refreshTable)) {
					yield put(
						AnalysisActionGenerator.updatePreferenceSuccess(
							refreshTable
						)
					);
				} else {
					yield put(
						AnalysisActionGenerator.updatePreferenceSuccess(true)
					);
				}
				break;
			}
			default: {
				//nothing
			}
		}
	} catch (error) {
		//nothing
	}
}

function* generateReport(action: GenerateReport) {
	let url = SITEAPI + "report/generate";
	let name = action.payload.name;
	let fileIds = action.payload.fileIds;
	let filter = action.payload.filter;
	let preference = action.payload.preference;
	try {
		let response = yield call(
			AnalysisAPI.generateReport,
			url,
			name,
			filter,
			fileIds,
			preference
		);

		switch (response.status) {
			case 200: {
				let csvLink = response.data.queryResult;
				yield put(
					AnalysisActionGenerator.generateReportSuccess(csvLink)
				);
			}
			default: {
				yield put(AnalysisActionGenerator.generateReportFailure());
			}
		}
	} catch (e) {
		yield put(AnalysisActionGenerator.generateReportFailure());
		//yeild put failure snackbar
	}
}

function* getAnalysisFilterConfig(action: GetAnalysisFilterConfig) {
	let url = SITEAPI + "filter/config/analysis";
	try {
		let response = yield call(AnalysisAPI.getAnalysisFilterConfig, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data
					.queryResult as FilterConfigStructure[];
				yield put(
					AnalysisActionGenerator.getAnalysisFilterConfigSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					AnalysisActionGenerator.getAnalysisFilterConfigFailure()
				);
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.getAnalysisFilterConfigFailure());
	}
}

function* getFilterAggregate(action: GetFilterAggregate) {
	let value = action.payload.value;
	let level = action.payload.level;
	let segment = action.payload.segment;
	let page = action.payload.page;
	let url = SITEAPI + "filter/aggregate/" + segment;
	try {
		let response = yield call(
			AnalysisAPI.getFilterAggregate,
			url,
			value,
			level,
			page
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data
					.queryResult as FilterAggregateStructure[];
				yield put(
					AnalysisActionGenerator.getFilterAggregateSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.getFilterAggregateFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.getFilterAggregateFailure());
	}
}

function* getFilteredCount(action: GetFilteredCount) {
	let url = SITEAPI + "filter/count";
	let filter = action.payload.savedAnalysisFiltersList;
	try {
		let response = yield call(AnalysisAPI.getFilteredCount, url, filter);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].count as number;
				yield put(
					AnalysisActionGenerator.getFilteredCountSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.getFilteredCountFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.getFilteredCountFailure());
	}
}

function* applyAnalysisFilter(action: ApplyAnalysisFilter) {
	let url = SITEAPI + "filter/apply";
	let sort = action.payload.sort;
	let filter = action.payload.filter;
	try {
		let response = yield call(
			AnalysisAPI.applyAnalysisFilter,
			url,
			sort,
			filter
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].fileId as number[];
				yield put(
					AnalysisActionGenerator.applyAnalysisFilterSuccess(parsed)
				);
				yield put(AnalysisActionGenerator.getAnalysis(parsed));
				break;
			}
			default: {
				yield put(AnalysisActionGenerator.applyAnalysisFilterFailure());
				break;
			}
		}
	} catch (error) {
		yield put(AnalysisActionGenerator.applyAnalysisFilterFailure());
	}
}

export default function* analysisWatcher() {
	yield all([
		takeLatest(GETANALYSISFILEID, getAnalysisFileId),
		takeLatest(GETANALYSIS, getAnalysisData),
		takeLatest(GETGENERALFILTER, getGeneralFilter),
		takeLatest(APPLYGENERALFILTER, applyGeneralFilter),
		takeLatest(GETADVANCEDFILTER, getAdvancedFilter),
		takeLatest(APPLYADVANCEDFILTER, applyAdvancedFilter),
		takeLatest(GETTABLECONFIG, getTableConfig),
		takeLatest(UPDATEPREFERENCE, updatePreference),
		takeLatest(GENERATEREPORT, generateReport),
		takeLatest(GETANALYSISFILTERCONFIG, getAnalysisFilterConfig),
		takeLatest(GETFILTERAGGREGATE, getFilterAggregate),
		takeLatest(GETFILTEREDCOUNT, getFilteredCount),
		takeLatest(APPLYANALYSISFILTER, applyAnalysisFilter),
	]);
}

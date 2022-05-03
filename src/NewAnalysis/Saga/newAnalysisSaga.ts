import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import {
	APPLYNEWANALYSISFILTER,
	ApplyNewAnalysisFilter,
	GETNEWANALYSISDATA,
	GetNewAnalysisData,
	GETNEWANALYSISFILEID,
	GetNewAnalysisFileId,
	GETNEWANALYSISFILTERAGGREGATE,
	GetNewAnalysisFilterAggregate,
	GETNEWANALYSISFILTERCONFIG,
	GetNewAnalysisFilterConfig,
	GETNEWANALYSISFILTERCOUNT,
	GetNewAnalysisFilterCount,
	GETNEWANALYSISINITIALFILEID,
	GetNewAnalysisInitialFileId,
	GETNEWANALYSISTABLECONFIG,
	GetNewAnalysisTableConfig,
	SAVENEWANALYSISCONFIGURATION,
	SaveNewAnalysisConfiguration,
	UPDATECONFIGURATIONCOUNT,
	UpdateConfigurationCount,
} from "../Actions/def";
import NewAnalysisAPI from "../Actions/API";
import NewAnalysisActionGenerator from "../Actions/gen";
import {
	NewAnalysisData,
	NewAnalysisFilterAggregate,
	NewAnalysisFilterConfig,
	NewAnalysisFilterStructure,
	NewAnalysisTableConfig,
} from "../State/newAnalysisState";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getNewAnalysisFileId(action: GetNewAnalysisFileId) {
	let url = SITEAPI + "analysis/files";
	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisFileIdArray,
			url
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileIds as number[];
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFileIdSuccess(
						parsed
					)
				);
				if (parsed !== null) {
					yield put(
						NewAnalysisActionGenerator.getNewAnalysisData(
							parsed,
							"date",
							"ascending"
						)
					);
				}
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFileIdFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewAnalysisActionGenerator.getNewAnalysisFileIdFailure());
	}
}

function* getNewAnalysisData(action: GetNewAnalysisData) {
	let url = SITEAPI + "analysis/basicinfo";
	let fileIds = action.payload.newAnalysisFileIds;
	let sort = action.payload.sort;
	let order = action.payload.order;
	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisData,
			url,
			fileIds,
			sort,
			order
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as NewAnalysisData[];
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisDataSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisDataFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewAnalysisActionGenerator.getNewAnalysisDataFailure());
	}
}

function* getNewAnalysisFilterConfig(action: GetNewAnalysisFilterConfig) {
	let url = SITEAPI + "filter/config/newanalysis";
	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisFilterConfig,
			url
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data
					.queryResult as NewAnalysisFilterConfig[];
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFilterConfigSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFilterConfigFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewAnalysisActionGenerator.getNewAnalysisFilterConfigFailure()
		);
	}
}

function* getNewAnalysisFilterAggregate(action: GetNewAnalysisFilterAggregate) {
	let value: string = action.payload.value;
	let level: number = action.payload.level;
	let page: string = action.payload.page;
	let sort: string = action.payload.sort;
	let order: string = action.payload.order;
	let filter: NewAnalysisFilterStructure[] = action.payload.filter;
	let filterApplied: NewAnalysisFilterStructure[] = action.payload.filter;
	let segment: string = action.payload.segment;
	let isFilterForwarded: boolean = action.payload.isFilterForwarded;
	let url = SITEAPI + "filter/aggregate/" + segment;

	if (
		action.payload.segment === "paymentobligation" &&
		action.payload.value !== "amount" &&
		action.payload.value.length > 0 &&
		action.payload.level === 1
	) {
		filter = [];
	} else if (
		action.payload.segment === "indemnity" &&
		action.payload.value !== "amount" &&
		action.payload.value.length > 0 &&
		action.payload.level === 1
	) {
		filter = [];
	} else if (
		action.payload.segment === "limitationofliability" &&
		action.payload.value !== "amount" &&
		action.payload.value.length > 0 &&
		action.payload.level === 1
	) {
		filter = [];
	}

	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisFilterAggregate,
			url,
			value,
			level,
			page,
			sort,
			order,
			filter,
			segment
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data
					.queryResult as NewAnalysisFilterAggregate[];
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFilterAggregateSuccess(
						parsed,
						segment,
						value,
						level,
						filterApplied,
						isFilterForwarded
					)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFilterAggregateFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewAnalysisActionGenerator.getNewAnalysisFilterAggregateFailure()
		);
	}
}

function* applyNewAnalysisFilter(action: ApplyNewAnalysisFilter) {
	let url = SITEAPI + "filter/apply";

	let filter: NewAnalysisFilterStructure[] = action.payload.filter;
	let sort: string = action.payload.sort;
	let newAnalysisSortedBy: string = action.payload.newAnalysisSortedBy;
	let newAnalysisSortOrder: string = action.payload.newAnalysisSortOrder;

	try {
		let response = yield call(
			NewAnalysisAPI.applyNewAnalysisFilter,
			url,
			sort,
			filter
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].fileId as number[];
				yield put(
					NewAnalysisActionGenerator.applyNewAnalysisFilterSuccess(
						parsed
					)
				);
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisData(
						parsed,
						newAnalysisSortedBy,
						newAnalysisSortOrder
					)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.applyNewAnalysisFilterFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewAnalysisActionGenerator.applyNewAnalysisFilterFailure());
	}
}

function* getNewAnalysisFilterCount(action: GetNewAnalysisFilterCount) {
	let url = SITEAPI + "filter/count";

	let filter: NewAnalysisFilterStructure[] = action.payload.filter;

	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisFilterCount,
			url,
			filter
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].count as number;
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFilterCountSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisFilterCountFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewAnalysisActionGenerator.getNewAnalysisFilterCountFailure()
		);
	}
}

function* saveNewAnalysisConfiguration(action: SaveNewAnalysisConfiguration) {
	let url = SITEAPI + "workspace/save";

	let title = action.payload.title;
	let description = action.payload.description;
	let type = action.payload.type;
	let lastResultCount = action.payload.lastResultCount;
	let filter: NewAnalysisFilterStructure[] = action.payload.filter;

	try {
		let response = yield call(
			NewAnalysisAPI.saveNewAnalysisConfiguration,
			url,
			title,
			description,
			type,
			lastResultCount,
			filter
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].id as number;
				yield put(
					NewAnalysisActionGenerator.saveNewAnalysisConfigurationSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.saveNewAnalysisConfigurationFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewAnalysisActionGenerator.saveNewAnalysisConfigurationFailure()
		);
	}
}

function* updateConfigurationCount(action: UpdateConfigurationCount) {
	let url = SITEAPI + "workspace/updatecount";

	let count = action.payload.count;
	let ssid = action.payload.ssid;

	try {
		let response = yield call(
			NewAnalysisAPI.updateConfigurationCount,
			url,
			count,
			ssid
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].id as number;
				yield put(
					NewAnalysisActionGenerator.updateConfigurationCountSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.updateConfigurationCountFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewAnalysisActionGenerator.updateConfigurationCountFailure());
	}
}

function* getNewAnalysisTableConfig(action: GetNewAnalysisTableConfig) {
	let url = SITEAPI + "analysis/config";
	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisTableConfig,
			url
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data
					.queryResult as NewAnalysisTableConfig[];
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisTableConfigSuccess(
						parsed
					)
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

function* getNewAnalysisInitialFileId(action: GetNewAnalysisInitialFileId) {
	let url = SITEAPI + "analysis/files";
	try {
		let response = yield call(
			NewAnalysisAPI.getNewAnalysisInitialFileIdArray,
			url
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileIds as number[];
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisInitialFileIdSuccess(
						parsed
					)
				);
				// yield put(NewAnalysisActionGenerator.getNewAnalysisData(parsed, 'date', 'ascending'));
				break;
			}
			default: {
				yield put(
					NewAnalysisActionGenerator.getNewAnalysisInitialFileIdFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewAnalysisActionGenerator.getNewAnalysisInitialFileIdFailure()
		);
	}
}

export default function* newAnalysisWatcher() {
	yield all([
		takeLatest(GETNEWANALYSISFILEID, getNewAnalysisFileId),
		takeLatest(GETNEWANALYSISDATA, getNewAnalysisData),
		takeLatest(GETNEWANALYSISFILTERCONFIG, getNewAnalysisFilterConfig),
		takeEvery(GETNEWANALYSISFILTERAGGREGATE, getNewAnalysisFilterAggregate),
		takeLatest(APPLYNEWANALYSISFILTER, applyNewAnalysisFilter),
		takeLatest(GETNEWANALYSISFILTERCOUNT, getNewAnalysisFilterCount),
		takeLatest(SAVENEWANALYSISCONFIGURATION, saveNewAnalysisConfiguration),
		takeLatest(UPDATECONFIGURATIONCOUNT, updateConfigurationCount),
		takeLatest(GETNEWANALYSISTABLECONFIG, getNewAnalysisTableConfig),
		takeLatest(GETNEWANALYSISINITIALFILEID, getNewAnalysisInitialFileId),
	]);
}

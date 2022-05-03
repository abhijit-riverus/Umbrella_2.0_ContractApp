import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import {
	APPLYNEWDASHBOARDFILTER,
	ApplyNewDashboardFilter,
	GETNEWDASHBOARDDATA,
	GetNewDashboardData,
	GETNEWDASHBOARDFILEID,
	GetNewDashboardFileId,
	GETNEWDASHBOARDFILTERAGGREGATE,
	GetNewDashboardFilterAggregate,
	GETNEWDASHBOARDFILTERCONFIG,
	GetNewDashboardFilterConfig,
} from "../Actions/def";
import NewDashboardAPI from "../Actions/API";
import NewDashboardActionGenerator from "../Actions/gen";
import {
	NewDashboardData,
	NewDashboardFilterAggregate,
	NewDashboardFilterConfig,
	NewDashboardFilterStructure,
} from "../State/newDashboardState";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getNewDashboardFileId(action: GetNewDashboardFileId) {
	let url = SITEAPI + "analysis/files";
	try {
		let response = yield call(
			NewDashboardAPI.getNewDashboardFileIdArray,
			url
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileIds as number[];
				yield put(
					NewDashboardActionGenerator.getNewDashboardFileIdSuccess(
						parsed
					)
				);
				if (parsed !== null) {
					yield put(
						NewDashboardActionGenerator.getNewDashboardData(
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
					NewDashboardActionGenerator.getNewDashboardFileIdFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewDashboardActionGenerator.getNewDashboardFileIdFailure());
	}
}

function* getNewDashboardData(action: GetNewDashboardData) {
	let url = SITEAPI + "analysis/basicinfo";
	let fileIds = action.payload.newDashboardFileIds;
	let sort = action.payload.sort;
	let order = action.payload.order;
	try {
		let response = yield call(
			NewDashboardAPI.getNewDashboardData,
			url,
			fileIds,
			sort,
			order
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as NewDashboardData[];
				yield put(
					NewDashboardActionGenerator.getNewDashboardDataSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					NewDashboardActionGenerator.getNewDashboardDataFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewDashboardActionGenerator.getNewDashboardDataFailure());
	}
}

function* getNewDashboardFilterConfig(action: GetNewDashboardFilterConfig) {
	let url = SITEAPI + "filter/config/newanalysis";
	try {
		let response = yield call(
			NewDashboardAPI.getNewDashboardFilterConfig,
			url
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data
					.queryResult as NewDashboardFilterConfig[];
				yield put(
					NewDashboardActionGenerator.getNewDashboardFilterConfigSuccess(
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					NewDashboardActionGenerator.getNewDashboardFilterConfigFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewDashboardActionGenerator.getNewDashboardFilterConfigFailure()
		);
	}
}

function* getNewDashboardFilterAggregate(
	action: GetNewDashboardFilterAggregate
) {
	let value: string = action.payload.value;
	let level: number = action.payload.level;
	let page: string = action.payload.page;
	let sort: string = action.payload.sort;
	let order: string = action.payload.order;
	let filter: NewDashboardFilterStructure[] = action.payload.filter;
	let segment: string = action.payload.segment;
	let isFilterForwarded: boolean = action.payload.isFilterForwarded;
	let url = SITEAPI + "filter/aggregate/" + segment;

	try {
		let response = yield call(
			NewDashboardAPI.getNewDashboardFilterAggregate,
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
					.queryResult as NewDashboardFilterAggregate[];
				yield put(
					NewDashboardActionGenerator.getNewDashboardFilterAggregateSuccess(
						parsed,
						segment,
						value,
						level,
						filter,
						isFilterForwarded
					)
				);
				break;
			}
			default: {
				yield put(
					NewDashboardActionGenerator.getNewDashboardFilterAggregateFailure()
				);
			}
		}
	} catch (e) {
		yield put(
			NewDashboardActionGenerator.getNewDashboardFilterAggregateFailure()
		);
	}
}

function* applyNewDashboardFilter(action: ApplyNewDashboardFilter) {
	let url = SITEAPI + "filter/apply";

	let filter: NewDashboardFilterStructure[] = action.payload.filter;
	let sort: string = action.payload.sort;
	let newDashboardSortedBy: string = action.payload.newDashboardSortedBy;
	let newDashboardSortOrder: string = action.payload.newDashboardSortOrder;

	try {
		let response = yield call(
			NewDashboardAPI.applyNewDashboardFilter,
			url,
			sort,
			filter
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0].fileId as number[];
				yield put(
					NewDashboardActionGenerator.applyNewDashboardFilterSuccess(
						parsed
					)
				);
				yield put(
					NewDashboardActionGenerator.getNewDashboardData(
						parsed,
						newDashboardSortedBy,
						newDashboardSortOrder
					)
				);
				break;
			}
			default: {
				yield put(
					NewDashboardActionGenerator.applyNewDashboardFilterFailure()
				);
			}
		}
	} catch (e) {
		yield put(NewDashboardActionGenerator.applyNewDashboardFilterFailure());
	}
}

export default function* newDashboardWatcher() {
	yield all([
		takeLatest(GETNEWDASHBOARDFILEID, getNewDashboardFileId),
		takeLatest(GETNEWDASHBOARDDATA, getNewDashboardData),
		takeLatest(GETNEWDASHBOARDFILTERCONFIG, getNewDashboardFilterConfig),
		takeEvery(
			GETNEWDASHBOARDFILTERAGGREGATE,
			getNewDashboardFilterAggregate
		),
		takeLatest(APPLYNEWDASHBOARDFILTER, applyNewDashboardFilter),
	]);
}

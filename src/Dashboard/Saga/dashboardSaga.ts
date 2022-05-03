import {
	GETDASHBOARDFILEID,
	GETTABLEDATA,
	GETCONTRACTYPE,
	GETJURISDICTION,
	GETUPLOADEDBY,
	GetContractType,
	GetJurisdiction,
	GetUploadedBy,
	GetTableData,
	GetDashboardFileId,
	ApplyDashboardFilter,
	APPLYDASHBOARDFILTER,
} from "../Actions/def";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import { call, put, takeLatest, all } from "redux-saga/effects";
import DashboardAPI from "../Actions/API";
import DashboardActionGenerator from "../Actions/gen";
import {
	JurisdictionData,
	UploadedByData,
	ContractTypeData,
} from "../State/dashboardState";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getDashboardFileId(action: GetDashboardFileId) {
	let url = SITEAPI + "dashboard/files";
	try {
		let response = yield call(DashboardAPI.getDashboardFileIdArray, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileIds as number[];
				yield put(
					DashboardActionGenerator.getDashboardFileIdSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(DashboardActionGenerator.getDashboardFileIdFailure());
			}
		}
	} catch (e) {
		yield put(DashboardActionGenerator.getDashboardFileIdFailure());
	}
}

function* getContractType(action: GetContractType) {
	let url = SITEAPI + "dashboard/contractype";
	let fileIds = action.payload.fileIds;
	let payload = {
		fileIds: fileIds,
	};
	try {
		let response = yield call(DashboardAPI.getContractType, url, payload);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as ContractTypeData[];
				yield put(
					DashboardActionGenerator.getContractTypeSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(DashboardActionGenerator.getContractTypeFailure());
			}
		}
	} catch (e) {
		yield put(DashboardActionGenerator.getContractTypeFailure());
	}
}

function* getJurisdiction(action: GetJurisdiction) {
	let url = SITEAPI + "dashboard/jurisdiction";
	let fileIds = action.payload.fileIds;
	let payload = {
		fileIds: fileIds,
	};
	try {
		let response = yield call(DashboardAPI.getJurisdiction, url, payload);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as JurisdictionData[];
				yield put(
					DashboardActionGenerator.getJurisdictionSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(DashboardActionGenerator.getJurisdictionFailure());
			}
		}
	} catch (e) {
		yield put(DashboardActionGenerator.getJurisdictionFailure());
	}
}

function* getUploadedBy(action: GetUploadedBy) {
	let url = SITEAPI + "dashboard/uploadedby";
	let fileIds = action.payload.fileIds;
	let payload = {
		fileIds: fileIds,
	};
	try {
		let response = yield call(DashboardAPI.getUploadedBy, url, payload);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult as UploadedByData[];
				yield put(
					DashboardActionGenerator.getUploadedBySuccess(parsed)
				);
				break;
			}
			default: {
				yield put(DashboardActionGenerator.getUploadedByFailure());
			}
		}
	} catch (e) {
		yield put(DashboardActionGenerator.getUploadedByFailure());
	}
}

function* getTableData(action: GetTableData) {
	let url = SITEAPI + "dashboard/data";
	let fileIds = action.payload.fileIds;
	let payload = {
		fileIds: fileIds,
	};
	try {
		let response = yield call(DashboardAPI.getTableData, url, payload);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult;
				yield put(DashboardActionGenerator.getTableDataSuccess(parsed));
				break;
			}
			default: {
				yield put(DashboardActionGenerator.getTableDataFailure());
			}
		}
	} catch (e) {
		yield put(DashboardActionGenerator.getTableDataFailure());
	}
}

function* applyDashboardFilter(action: ApplyDashboardFilter) {
	let url = SITEAPI + "dashboard/filter/apply";
	let payload = {
		fileIds: action.payload.fileIds,
		filterStructure: action.payload.dashboardFilterStruc,
	};
	try {
		let response = yield call(
			DashboardAPI.applyDashboardFilter,
			url,
			payload
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult;
				yield put(
					DashboardActionGenerator.applyDashboardFilterSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(
					DashboardActionGenerator.applyDashboardFilterFailure()
				);
			}
		}
	} catch (e) {
		yield put(DashboardActionGenerator.applyDashboardFilterFailure());
	}
}

export default function* dashboardWatcher() {
	yield all([
		takeLatest(GETDASHBOARDFILEID, getDashboardFileId),
		takeLatest(GETTABLEDATA, getTableData),
		takeLatest(GETCONTRACTYPE, getContractType),
		takeLatest(GETJURISDICTION, getJurisdiction),
		takeLatest(GETUPLOADEDBY, getUploadedBy),
		takeLatest(APPLYDASHBOARDFILTER, applyDashboardFilter),
	]);
}

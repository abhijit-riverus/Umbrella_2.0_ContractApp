import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import ReportsAPI from "../Actions/API";
import {
	DELETEREPORT,
	DeleteReport,
	DELETESAVEDCONFIGURATION,
	DeleteSavedConfiguration,
	GETALLREPORTSDATA,
	GetAllReportsData,
	GETSAVEDCONFIGURATIONDATA,
	GetSavedConfigurationData,
} from "../Actions/Def";
import ReportsActionGenerator from "../Actions/Gen";
import { SavedConfigurationData } from "../State/reportsState";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getAllReportsData(action: GetAllReportsData) {
	let sort = action.payload.sort;
	let order = action.payload.order;
	let url = SITEAPI + "report/all?sort=" + sort + "&order=" + order;

	try {
		let response = yield call(ReportsAPI.getAllReportsData, url);

		switch (response.status) {
			case 200: {
				let reportsTableData = response.data.queryResult;
				yield put(
					ReportsActionGenerator.getAllReportsDataSuccess(
						reportsTableData
					)
				);
				break;
			}
			default: {
				yield put(ReportsActionGenerator.getAllReportsDataFailure());
				break;
			}
		}
	} catch (e) {
		yield put(ReportsActionGenerator.getAllReportsDataFailure());
	}
}

function* deleteReport(action: DeleteReport) {
	let id = action.payload.id;
	let url = SITEAPI + "report/delete/" + id;

	try {
		let response = yield call(ReportsAPI.deleteReport, url);
		switch (response.status) {
			case 200: {
				yield put(ReportsActionGenerator.deleteReportSuccess(1));
			}
			// default: {
			//     yield put(ReportsActionGenerator.deleteReportFailure(0));
			// }
		}
	} catch (e) {
		yield put(ReportsActionGenerator.deleteReportFailure(0));
	}
}

function* getSavedConfigurationData(action: GetSavedConfigurationData) {
	let sortBy: string = action.payload.sortBy;
	let sortOrder: string = action.payload.sortOrder;

	let url = SITEAPI + "workspace/all/" + sortBy + "/" + sortOrder;

	try {
		let response = yield call(ReportsAPI.getSavedConfigurationData, url);
		switch (response.status) {
			case 200: {
				let savedConfigurationData = response.data
					.queryResult as SavedConfigurationData[];
				yield put(
					ReportsActionGenerator.getSavedConfigurationDataSuccess(
						savedConfigurationData
					)
				);
				break;
			}
			default: {
				yield put(
					ReportsActionGenerator.getSavedConfigurationDataFailure()
				);
				break;
			}
		}
	} catch (e) {
		yield put(ReportsActionGenerator.getSavedConfigurationDataFailure());
	}
}

function* deleteSavedConfiguration(action: DeleteSavedConfiguration) {
	let sortBy: string = action.payload.sortBy;
	let sortOrder: string = action.payload.sortOrder;
	let id: number = action.payload.id;
	let url = SITEAPI + "workspace/delete/" + id;

	try {
		let response = yield call(ReportsAPI.deleteSavedConfiguration, url);
		switch (response.status) {
			case 200: {
				yield put(
					ReportsActionGenerator.deleteSavedConfigurationSuccess(1)
				);
				yield put(
					ReportsActionGenerator.getSavedConfigurationData(
						sortBy,
						sortOrder
					)
				);
				break;
			}
			default: {
				yield put(
					ReportsActionGenerator.deleteSavedConfigurationFailure(0)
				);
				break;
			}
		}
	} catch (e) {
		yield put(ReportsActionGenerator.deleteSavedConfigurationFailure(0));
	}
}

export default function* reportsWatcher() {
	yield all([
		takeLatest(GETALLREPORTSDATA, getAllReportsData),
		takeLatest(DELETEREPORT, deleteReport),
		takeLatest(GETSAVEDCONFIGURATIONDATA, getSavedConfigurationData),
		takeLatest(DELETESAVEDCONFIGURATION, deleteSavedConfiguration),
	]);
}

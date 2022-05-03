import {
	all,
	call,
	put,
	takeEvery,
	takeLatest,
} from "@redux-saga/core/effects";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import TaskManagementPageAPI from "../Actions/api";
import {
	GETALLTASKSDATA,
	GetAllTasksData,
	GETLASTUPDATEDON,
	GetLastUpdatedOn,
	GETPROGRESSNAMELIST,
	GetProgressNameList,
	GETTASKCOUNT,
	GetTaskCount,
	UPDATEPROGRESS,
	UpdateProgress,
} from "../Actions/def";
import TaskManagementPageActionGenerator from "../Actions/gen";
import {
	AllTasksData,
	ProgressNameList,
	TaskCount,
} from "../State/taskManagementPageState";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getAllTasksData(action: GetAllTasksData) {
	let fileID = action.payload.fileID;
	let requestID = action.payload.requestID;
	let sort = action.payload.sort;
	let order = action.payload.order;
	let selfAssigned = action.payload.selfAssigned;
	let clauseType = action.payload.clauseType;
	let url = SITEAPI + "task/all";

	try {
		let response = yield call(
			TaskManagementPageAPI.getAllTasksData,
			url,
			fileID,
			requestID,
			sort,
			order,
			selfAssigned,
			clauseType
		);

		switch (response.status) {
			case 200: {
				let allTasksData = response.data.queryResult as AllTasksData[];
				if (allTasksData === undefined) {
					allTasksData = [];
				}
				yield put(
					TaskManagementPageActionGenerator.getAllTasksDataSuccess(
						allTasksData
					)
				);
				break;
			}
			default: {
				yield put(
					TaskManagementPageActionGenerator.getAllTasksDataFailure()
				);
				break;
			}
		}
	} catch (error) {
		yield put(TaskManagementPageActionGenerator.getAllTasksDataFailure());
	}
}

function* getLastUpdatedOn(action: GetLastUpdatedOn) {
	let selfAssigned = action.payload.selfAssigned;

	let url = SITEAPI + "task/all/lastupdate";
	try {
		let response = yield call(
			TaskManagementPageAPI.getLastUpdatedOn,
			url,
			selfAssigned
		);

		switch (response.status) {
			case 200: {
				let lastUpdate = response.data.queryResult.lastUpdate;
				yield put(
					TaskManagementPageActionGenerator.getLastUpdatedOnSuccess(
						lastUpdate
					)
				);
				break;
			}
			default: {
				yield put(
					TaskManagementPageActionGenerator.getLastUpdatedOnFailure()
				);
			}
		}
	} catch (e) {
		yield put(TaskManagementPageActionGenerator.getLastUpdatedOnFailure());
	}
}

function* getProgressNameList(action: GetProgressNameList) {
	let url = SITEAPI + "task/progress";

	try {
		let response = yield call(
			TaskManagementPageAPI.getProgressNameList,
			url
		);

		switch (response.status) {
			case 200: {
				let progressNameList = response.data
					.queryResult as ProgressNameList[];
				yield put(
					TaskManagementPageActionGenerator.getProgressNameListSuccess(
						progressNameList
					)
				);
				break;
			}
			default: {
				yield put(
					TaskManagementPageActionGenerator.getProgressNameListFailure()
				);
				break;
			}
		}
	} catch (error) {
		yield put(
			TaskManagementPageActionGenerator.getProgressNameListFailure()
		);
	}
}

function* updateProgress(action: UpdateProgress) {
	let requestID = action.payload.requestID;
	let progressID = action.payload.progressID;

	let url = SITEAPI + "task/progress";

	try {
		let response = yield call(
			TaskManagementPageAPI.updateProgress,
			url,
			requestID,
			progressID
		);

		switch (response.status) {
			case 200: {
				yield put(
					TaskManagementPageActionGenerator.updateProgressSuccess(
						1,
						requestID,
						progressID
					)
				);
				break;
			}
			default: {
				yield put(
					TaskManagementPageActionGenerator.updateProgressFailure(0)
				);
				break;
			}
		}
	} catch (error) {
		yield put(TaskManagementPageActionGenerator.updateProgressFailure(0));
	}
}

function* getTaskCount(action: GetTaskCount) {
	let url = SITEAPI + "task/count";
	try {
		let response = yield call(TaskManagementPageAPI.getTaskCount, url);
		switch (response.status) {
			case 200: {
				let taskCount = response.data.queryResult as TaskCount;
				yield put(
					TaskManagementPageActionGenerator.getTaskCountSuccess(
						taskCount
					)
				);
				break;
			}
			default: {
				yield put(
					TaskManagementPageActionGenerator.getTaskCountFailure()
				);
				break;
			}
		}
	} catch (error) {
		yield put(TaskManagementPageActionGenerator.getTaskCountFailure());
	}
}
export default function* taskManagementPageWatcher() {
	yield all([
		takeLatest(GETALLTASKSDATA, getAllTasksData),
		takeLatest(GETLASTUPDATEDON, getLastUpdatedOn),
		takeLatest(GETPROGRESSNAMELIST, getProgressNameList),
		takeEvery(UPDATEPROGRESS, updateProgress),
		takeLatest(GETTASKCOUNT, getTaskCount),
	]);
}

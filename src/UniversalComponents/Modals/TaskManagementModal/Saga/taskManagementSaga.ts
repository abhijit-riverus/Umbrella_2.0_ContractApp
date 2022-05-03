import { SITE_API_BY_REALM_NAME } from "../../../../Configuration/global";
import { call, put, takeLatest, all, take } from "redux-saga/effects";
import {
	GETUSERDATA,
	GetUserData,
	GetTaskState,
	GETTASKSTATE,
	GetBIType,
	GetBISentence,
	CreateTask,
	GETBITYPE,
	GETBISENTENCE,
	CREATETASK,
	GetTaskProgress,
	GETTASKPROGRESS,
	GetClauseType,
	GetClauseTypeSuccess,
	GetClauseTypeFailure,
	GETCLAUSETYPE,
	UpdateTask,
	UPDATETASK,
	PostComment,
	GetComments,
	POSTCOMMENT,
	GETCOMMENTS,
} from "../Action/def";
import TaskManagementAPI from "../Action/API";
import {
	UserData,
	TaskState,
	BIType,
	BISentence,
	ClauseType,
	Comments,
} from "../State/taskManagementState";
import TaskManagementActionGenerator from "../Action/gen";
import { getKeyCloakRealmFromLS } from "../../../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* createTask(action: CreateTask) {
	const url = SITEAPI + "task/create";
	let payload = action.payload.taskData;

	try {
		const response = yield call(TaskManagementAPI.createTask, url, payload);
		switch (response.status) {
			case 200: {
				yield put(TaskManagementActionGenerator.createTaskSuccess(1));
				break;
			}
			default:
				yield put(TaskManagementActionGenerator.createTaskFailure(-1));
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.createTaskFailure(-1));
	}
}

function* getBISentence(action: GetBISentence) {
	const url = SITEAPI + "task/bitext";
	let payload = {
		fileID: action.payload.fileID,
		biColumnName: action.payload.biColumnName,
	};

	try {
		const response = yield call(
			TaskManagementAPI.getBISentence,
			url,
			payload
		);
		switch (response.status) {
			case 200: {
				let biSen: BISentence = {
					sentences: response.data.queryResult.sentence,
				};
				yield put(
					TaskManagementActionGenerator.getBISentenceSuccess(biSen)
				);
				break;
			}
			default:
				yield put(TaskManagementActionGenerator.getBISentenceFailure());
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.getBISentenceFailure());
	}
}

function* getClauseType(action: GetClauseType) {
	const url = SITEAPI + "task/clausetype";
	try {
		const response = yield call(TaskManagementAPI.getClauseType, url);
		switch (response.status) {
			case 200: {
				let clauseType: ClauseType[] = response.data
					.queryResult as ClauseType[];
				yield put(
					TaskManagementActionGenerator.getClauseTypeSuccess(
						clauseType
					)
				);
				break;
			}
			default: {
				yield put(TaskManagementActionGenerator.getClauseTypeFailure());
			}
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.getClauseTypeFailure());
	}
}

function* getBIType(action: GetBIType) {
	const url = SITEAPI + "task/bitype";
	let payload = {
		clauseType: action.payload.clauseName,
	};

	try {
		const response = yield call(TaskManagementAPI.getBIType, url, payload);
		switch (response.status) {
			case 200: {
				let biType: BIType[] = response.data.queryResult as BIType[];

				yield put(
					TaskManagementActionGenerator.getBITypeSuccess(biType)
				);
				break;
			}
			default: {
				yield put(TaskManagementActionGenerator.getBITypeFailure());
			}
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.getBITypeFailure());
	}
}

function* getTaskProgress(action: GetTaskProgress) {
	const url = SITEAPI + "task/progress";
	try {
		const response = yield call(TaskManagementAPI.getTaskProgress, url);
		switch (response.status) {
			case 200: {
				const parsed = response.data.queryResult as TaskState[];
				yield put(
					TaskManagementActionGenerator.getTaskProgressSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(
					TaskManagementActionGenerator.getTaskProgressFailure()
				);
			}
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.getTaskProgressFailure());
	}
}

function* getTaskState(action: GetTaskState) {
	const url = SITEAPI + "task/state";
	try {
		const response = yield call(TaskManagementAPI.getTaskState, url);
		switch (response.status) {
			case 200: {
				const parsed = response.data.queryResult as TaskState[];
				yield put(
					TaskManagementActionGenerator.getTaskStateSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(TaskManagementActionGenerator.getTaskStateFailure());
			}
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.getTaskStateFailure());
	}
}

function* getUserData(action: GetUserData) {
	const url = SITEAPI + "task/users";
	try {
		// API side effect
		const response = yield call(TaskManagementAPI.getUserData, url);
		switch (response.status) {
			case 200: {
				const parsed = response.data.queryResult as UserData[];

				yield put(
					TaskManagementActionGenerator.getUserDataSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(TaskManagementActionGenerator.getUserDataFailure());
			}
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.getUserDataFailure());
	}
}

function* updateTask(action: UpdateTask) {
	const url = SITEAPI + "task/edit";
	let payload = action.payload.taskData;

	try {
		const response = yield call(TaskManagementAPI.updateTask, url, payload);
		switch (response.status) {
			case 200: {
				yield put(
					TaskManagementActionGenerator.updateTaskDataSuccess(1)
				);
				break;
			}
			default:
				yield put(
					TaskManagementActionGenerator.updateTaskDataFailure(-1)
				);
		}
	} catch (e) {
		yield put(TaskManagementActionGenerator.updateTaskDataFailure(-1));
	}
}

function* postComment(action: PostComment) {
	const url = SITEAPI + "task/comment";
	let requestid = action.payload.requestid;
	let comment = action.payload.comment;

	try {
		const response = yield call(TaskManagementAPI.postComment, url, {
			requestid,
			comment,
		});
		switch (response.status) {
			case 200: {
				yield put(TaskManagementActionGenerator.postCommentSuccess());
				yield put(TaskManagementActionGenerator.getComments(requestid));
				break;
			}
			default: {
				yield put(TaskManagementActionGenerator.postCommentFailure());
			}
		}
	} catch (error) {
		yield put(TaskManagementActionGenerator.postCommentFailure());
	}
}

function* getComments(action: GetComments) {
	let requestID = action.payload.requestId;
	const url = SITEAPI + "task/comment/" + requestID;

	try {
		const response = yield call(TaskManagementAPI.getComments, url);
		switch (response.status) {
			case 200: {
				const parsed = response.data.queryResult as Comments[];
				yield put(
					TaskManagementActionGenerator.getCommentsSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(TaskManagementActionGenerator.getCommentsFailure());
			}
		}
	} catch (error) {
		yield put(TaskManagementActionGenerator.getCommentsFailure());
	}
}

export default function* TaskManagementWatcher() {
	yield all([
		takeLatest(GETUSERDATA, getUserData),
		takeLatest(GETTASKSTATE, getTaskState),
		takeLatest(GETBITYPE, getBIType),
		takeLatest(GETBISENTENCE, getBISentence),
		takeLatest(CREATETASK, createTask),
		takeLatest(GETTASKPROGRESS, getTaskProgress),
		takeLatest(GETCLAUSETYPE, getClauseType),
		takeLatest(UPDATETASK, updateTask),
		takeLatest(POSTCOMMENT, postComment),
		takeLatest(GETCOMMENTS, getComments),
	]);
}

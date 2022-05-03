import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import { store } from "../../..";

import socketIOClient from "socket.io-client";
import { HOST, SITE_API_BY_REALM_NAME } from "../../../Configuration/global";

import {
	DELETENOTIFICATION,
	DeleteNotification,
	GETNOTIFICATIONSDATA,
	GetNotificationsData,
	GetUserProfileID,
	GETUSERPROFILEID,
	MARKNOTIFICATION,
	MarkNotification,
	NOTIFICATIONALERT,
	NotificationAlert,
} from "../Actions/def";
import { NotificationData } from "../State/notificationState";
import NotificationGenerator from "../Actions/gen";
import NotificationAPI from "../Actions/API";
import { getKeyCloakRealmFromLS } from "../../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getUserProfileID(action: GetUserProfileID) {
	const url = SITEAPI + "user/profile";
	try {
		const response = yield call(NotificationAPI.getUserProfileID, url);
		switch (response.status) {
			case 200: {
				const parsed = response.data.queryResult.id;
				yield put(
					NotificationGenerator.getUserProfileIDSuccess(parsed)
				);
				break;
			}
			default: {
				yield put(NotificationGenerator.getUserProfileIDFailure());
			}
		}
	} catch (error) {
		yield put(NotificationGenerator.getUserProfileIDFailure());
	}
}

function* getNotification(action: NotificationAlert) {
	const notificationSocketClient = socketIOClient(
		HOST + "/notification-alert-namespace"
	);
	notificationSocketClient.on(
		"notification-alert",
		(notificationInterface: any) => {
			let notificationData: NotificationData = {
				notificationID: notificationInterface.notificationID,
				requestID: notificationInterface.requestID,
				method: notificationInterface.method,
				type: notificationInterface.type,
				profileID: notificationInterface.profileID,
				taskTitle: notificationInterface.taskTitle,
				fileID: notificationInterface.fileID,
				fileName: notificationInterface.fileName,
				clauseType: notificationInterface.clauseType,
				biType: notificationInterface.biType,
				progress: notificationInterface.progress,
				state: notificationInterface.state,
				alertDate: notificationInterface.alertDate,
				isRead: notificationInterface.isRead,
			};

			// console.log(notificationData.taskTitle);

			store.dispatch(
				NotificationGenerator.notificationAlertSuccess(notificationData)
			);
		}
	);
}

function* getNotificationsData(action: GetNotificationsData) {
	let url = SITEAPI + "notification/data";

	try {
		let response = yield call(NotificationAPI.getNotificationsData, url);

		switch (response.status) {
			case 200: {
				let notificationsDataArray = response.data
					.queryResult as NotificationData[];
				yield put(
					NotificationGenerator.getNotificationsDataSuccess(
						notificationsDataArray
					)
				);
				break;
			}
			default: {
				yield put(NotificationGenerator.getNotificationsDataFailure());
			}
		}
	} catch (error) {
		yield put(NotificationGenerator.getNotificationsDataFailure());
	}
}

function* markNotification(action: MarkNotification) {
	let url = SITEAPI + "notification/mark";
	let notificationID = action.payload.notificationID;

	try {
		let response = yield call(
			NotificationAPI.markNotification,
			url,
			notificationID
		);

		switch (response.status) {
			case 200: {
				yield put(NotificationGenerator.markNotificationSuccess());
				yield put(NotificationGenerator.getNotificationsData());
				break;
			}
			default: {
				yield put(NotificationGenerator.markNotificationFailure());
			}
		}
	} catch (error) {
		yield put(NotificationGenerator.markNotificationFailure());
	}
}

function* deleteNotification(action: DeleteNotification) {
	let url = SITEAPI + "notification/delete";
	let notificationID = action.payload.notificationID;

	try {
		let response = yield call(
			NotificationAPI.deleteNotification,
			url,
			notificationID
		);

		switch (response.status) {
			case 200: {
				yield put(NotificationGenerator.deleteNotificationSuccess());
				yield put(NotificationGenerator.getNotificationsData());
				break;
			}
			default: {
				yield put(NotificationGenerator.deleteNotificationFailure());
			}
		}
	} catch (error) {
		yield put(NotificationGenerator.deleteNotificationFailure());
	}
}
export default function* notificationWatcher() {
	yield all([
		takeLatest(GETUSERPROFILEID, getUserProfileID),
		takeEvery(NOTIFICATIONALERT, getNotification),
		takeLatest(GETNOTIFICATIONSDATA, getNotificationsData),
		takeLatest(MARKNOTIFICATION, markNotification),
		takeLatest(DELETENOTIFICATION, deleteNotification),
	]);
}

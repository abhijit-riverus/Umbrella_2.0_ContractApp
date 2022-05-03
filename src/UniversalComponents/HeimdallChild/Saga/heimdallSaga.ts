import {
	ReviveToken,
	REVIVETOKEN,
	LOGOUT,
	POLLSTATUSAPI,
	ACTIVATEPASS,
	ActivatePass,
} from "../Actions/definitions";
import {
	all,
	call,
	put,
	takeEvery,
	takeLatest,
	delay,
} from "redux-saga/effects";
import HeimdallAPI from "../Actions/heimdallAPI";
import HeimdallActionGen from "../Actions/actionGen";
import {
	AUTHAPI,
	TOKENREFRESHINTERVAL,
	SITE_API_BY_REALM_NAME,
	AUTHURL,
} from "../../../Configuration/global";
import HeimdallUtil from "../HeimdallUtil/heimdallUtil";
import { getKeyCloakRealmFromLS } from "../../../Authentication/Actions/authentication";

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* reviveToken(action: ReviveToken) {
	var refreshToken = action.payload.refreshToken;
	var isLocal = action.payload.isLocal;
	var url = AUTHAPI + "/refreshtoken";
	if (isLocal) {
		var ls = localStorage.getItem("refreshToken");
		if (!(ls === null || ls === undefined)) {
			refreshToken = ls;
		}
	} else {
		localStorage.setItem("refreshToken", refreshToken); // token is recieved from URL, so save it in local storage
	}
	var response = yield call(HeimdallAPI.reviveToken, url, refreshToken);
	if (response.status === 401) {
		// unauthorized scenario
		localStorage.setItem("accessToken", "LOGOUT");
		yield put(HeimdallActionGen.reviveTokenFailure());
	} else if (response === undefined) {
		// connectivity issue
		yield delay(TOKENREFRESHINTERVAL);
		yield put(HeimdallActionGen.reviveToken(refreshToken, true));
	} else {
		// succesfull revival of accesstoken
		var accessToken = response.data.queryResult;
		localStorage.setItem("accessToken", accessToken);
		yield put(
			HeimdallActionGen.reviveTokenSuccess(accessToken, refreshToken)
		);
		yield delay(TOKENREFRESHINTERVAL);
		yield put(HeimdallActionGen.reviveToken(refreshToken, true));
	}
}
function* logout() {
	var url = AUTHAPI + "/logout";
	yield call(
		HeimdallAPI.logout,
		url,
		HeimdallUtil.getTokenFromStorage().refreshToken
	);
	yield put(HeimdallActionGen.logoutSuccess());
}

function* pollStatusAPI() {
	var url = SITEAPI + "/user/notification";
	var response = yield call(HeimdallAPI.PollStatus, url);
	try {
		if (response.status === 200) {
			yield put(HeimdallActionGen.Online());
		}
	} catch (e) {
		/// do nothing
	}
}

function* activatepass(action: ActivatePass) {
	var url = AUTHAPI + "/profile/newpass";
	let refreshToken = action.payload.refreshToken;
	var response = yield call(HeimdallAPI.activatePass, url);
	try {
		switch (response.status) {
			case 200: {
				yield put(HeimdallActionGen.reloadPage(true));
				yield put(HeimdallActionGen.attachPass(false));
				yield put(HeimdallActionGen.reviveToken(refreshToken, true));
				break;
			}
			default: {
				break;
			}
		}
	} catch (error) {}
}

export default function* heimdallWatcher() {
	yield all([
		takeEvery(REVIVETOKEN, reviveToken),
		takeLatest(LOGOUT, logout),
		takeEvery(POLLSTATUSAPI, pollStatusAPI),
		takeLatest(ACTIVATEPASS, activatepass),
	]);
}

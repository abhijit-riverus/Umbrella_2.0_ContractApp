import {
  GetUserUploads,
  GETUSERUPLOADS,
  ChangeStatus,
  CHANGESTATUS,
  DeleteFile,
  DELETEFILE,
} from "../Actions/def";
import { SITE_API_BY_REALM_NAME, HOST } from "../../Configuration/global";
import FileUploadAPI from "../Actions/API";
import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import socketIOClient from "socket.io-client";
import { store } from "../..";
import { FileInfo } from "../../Upload/State/uploadState";
import HistoryActionGenerator from "../Actions/gen";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getUserUploads(action: GetUserUploads) {
  //let url = SITEAPI + "useruploads";
  let url = SITEAPI; //"http://localhost:8000/api/v1/contracts/";
  // console.log("User Uploads");
  try {
    let response = yield call(FileUploadAPI.getUserUploads, url);
    console.log(
      "🚀 ~ file: historySaga.tsx ~ line 24 ~ Contract List",
      response
    );
    switch (response.status) {
      case 200: {
        // let parsed = response.data.queryResult as FileInfo[];
        let parsed = response.data as FileInfo[];
        console.log(
          "🚀 ~ file: historySaga.tsx ~ line 24 ~ getUserUploads LIST",
          parsed
        );
        yield put(HistoryActionGenerator.getUserUploadsSuccess(parsed));
        break;
      }
      default: {
        yield put(HistoryActionGenerator.getUserUploadsFailure());
      }
    }
  } catch (e) {
    yield put(HistoryActionGenerator.getUserUploadsFailure());
  }
}

function* deleteFile(action: DeleteFile) {
  let fileId = action.payload.uniqueFileId;
  let url = SITEAPI + "delete/" + fileId;
  try {
    let response = yield call(FileUploadAPI.deleteFile, url);
    let parsed = response.data.queryResult;
    switch (response.status) {
      case 200: {
        yield put(HistoryActionGenerator.deleteFileSuccess(parsed));
        break;
      }
      default: {
        yield put(HistoryActionGenerator.deleteFileFailure(parsed));
      }
    }
  } catch (e) {
    yield put(HistoryActionGenerator.deleteFileFailure(0));
  }
}

function* changeStatus(action: ChangeStatus) {
  const statusSocketClient = socketIOClient(HOST + "/status-change-namespace");
  statusSocketClient.on("statuschangeevent", (resultInterface: any) => {
    let statusPoints = {
      fileId: resultInterface.fileId,
      textract: resultInterface.textract,
      analytics: resultInterface.analytics,
      normalization: resultInterface.normalization,
    };
    store.dispatch(HistoryActionGenerator.changeStatusSuccess(statusPoints));
  });
}

export default function* historyWatcher() {
  yield all([
    takeLatest(GETUSERUPLOADS, getUserUploads),
    takeEvery(CHANGESTATUS, changeStatus),
    takeLatest(DELETEFILE, deleteFile),
  ]);
}

import {
	FileUpload,
	FILEUPLOAD,
	ChangeStatus,
	CHANGESTATUS,
	CheckDuplicate,
	CHECKDUPLICATE,
} from "../Actions/def";
import { SITE_API_BY_REALM_NAME, HOST } from "../../Configuration/global";
import FileUploadAPI from "../Actions/API";
import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import socketIOClient from "socket.io-client";
import { store } from "../..";
import { FileInfo, FileState } from "../State/uploadState";
import { isNullOrUndefined } from "is-what";
import UploadActionGenerator from "../Actions/gen";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
/* function* fileUpload(action: FileUpload) {
    let url = SITEAPI + 'file/upload';
    let data = action.payload.file;
    let fileUploadRequest = action.payload.fileUploadRequest;
    let modRequest: FileState[] = [];
    fileUploadRequest.forEach((el: FileInfo) =>
        modRequest.push(el.fileState)
    );
    try {
        let response = yield call(FileUploadAPI.fileUpload, url, data);
        switch (response.status) {
            case 200: {
                let parsed = response.data.queryResult as FileInfo[];
                let filesCount = parsed.length;
                yield put(UploadActionGenerator.fileUploadSuccess(parsed, filesCount));
                break;
            }
            default: {
                yield put(UploadActionGenerator.fileUploadFailure(modRequest));
            }
        }
    } catch (e) {
        yield put(UploadActionGenerator.fileUploadFailure(modRequest));
    }
} */

function* fileUpload(action: FileUpload) {
	let url = SITEAPI + "file/upload";
	// let data = action.payload.file;
	const data: any = action.payload.fileChunk.chunk;

	const params: any = {
		chunkId: action.payload.fileChunk.chunkId,
		chunksQuantity: action.payload.fileChunk.chunksQuantity,
		fileId: action.payload.fileChunk.fileId,
		fileName: action.payload.fileChunk.fileName,
		fileSize: action.payload.fileChunk.fileSize,
		isLastChunkOfFile: action.payload.fileChunk.isLastChunkOfFile,
	};

	const headers: any = {
		"Content-Type": "application/octet-stream",
	};

	let modRequest: FileState[] = [];
	let fileUploadRequest = action.payload.fileUploadRequest;
	fileUploadRequest.forEach((el: FileInfo) => modRequest.push(el.fileState));

	try {
		let response = yield call(
			FileUploadAPI.fileUpload,
			url,
			headers,
			data,
			params
		);
		switch (response.status) {
			case 200: {
				if (!response.data.queryResult.hasOwnProperty("uploading")) {
					let parsed = response.data.queryResult as FileInfo;
					let filesCount = 1;
					yield put(
						UploadActionGenerator.fileUploadSuccess(
							parsed,
							filesCount
						)
					);
				} else {
					// console.log("Uploading Chunk");
				}
				break;
			}
			default: {
				yield put(UploadActionGenerator.fileUploadFailure(modRequest));
			}
		}
	} catch (e) {
		yield put(UploadActionGenerator.fileUploadFailure(modRequest));
	}
}

function* checkDuplicate(action: CheckDuplicate) {
	let url = SITEAPI + "file/duplicates";
	let fileNameArray = action.payload.fileNameArray;
	let file = action.payload.file;
	try {
		let response = yield call(FileUploadAPI.checkFOrDuplicates, url, {
			nameArray: fileNameArray,
		});
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult.fileName;
				let bufferList: any[] = []; //For storing file names that are not duplicate.
				let toBeUploadedList: File[] = []; //For storing files that are not duplicate
				if (!isNullOrUndefined(parsed)) {
					for (let i = 0; i < fileNameArray.length; i++) {
						let index = parsed.indexOf(fileNameArray[i]);
						if (index === -1) {
							bufferList.push(fileNameArray[i]);
						}
					}
					for (let j = 0; j < bufferList.length; j++) {
						for (let k = 0; k < file.length; k++) {
							if (file[k].name === bufferList[j]) {
								toBeUploadedList.push(file[k]);
							}
						}
					}
				} else {
					toBeUploadedList = file; //If there are no duplicates
				}
				yield put(
					UploadActionGenerator.checkDuplicateSuccess(
						toBeUploadedList,
						parsed
					)
				);
				break;
			}
			default: {
				yield put(
					UploadActionGenerator.checkDuplicateSuccess(file, [])
				); //If there are no duplicates
			}
		}
	} catch (e) {
		yield put(UploadActionGenerator.checkDuplicateFailure());
	}
}

function* changeStatus(action: ChangeStatus) {
	const statusSocketClient = socketIOClient(
		HOST + "/status-change-namespace"
	);
	statusSocketClient.on("statuschangeevent", (resultInterface: any) => {
		let statusPoints = {
			fileId: resultInterface.fileId,
			textract: resultInterface.textract,
			analytics: resultInterface.analytics,
			normalization: resultInterface.normalization,
		};
		store.dispatch(UploadActionGenerator.changeStatusSuccess(statusPoints));
	});
}

export default function* uploadWatcher() {
	yield all([
		takeEvery(FILEUPLOAD, fileUpload),
		takeEvery(CHANGESTATUS, changeStatus),
		takeLatest(CHECKDUPLICATE, checkDuplicate),
	]);
}

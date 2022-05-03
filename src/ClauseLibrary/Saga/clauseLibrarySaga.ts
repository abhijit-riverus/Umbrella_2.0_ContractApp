import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import { call, put, all, takeLatest } from "redux-saga/effects";
import {
	CreateClause,
	CREATECLAUSE,
	CREATEFOLDERHEADING,
	CreateFolderHeading,
	CREATEFOLDERSUBHEADING,
	CreateFolderSubHeading,
	DeleteClause,
	DELETECLAUSE,
	DeleteFolder,
	DELETEFOLDER,
	EditClause,
	EDITCLAUSE,
	GetClauseLibraryData,
	GETCLAUSELIBRARYDATA,
	GETCLAUSESDATA,
	GetClausesData,
	GETFOLDERHEADING,
	GetFolderHeading,
	GETFOLDERSUBHEADING,
	GetFolderSubHeading,
} from "../Actions/def";
import {
	ClauseFolderState,
	ClauseInfo,
	ClauseStructure,
	FolderHeadingInfo,
} from "../State/clauseLibraryState";
import ClauseLibraryActionGenerator from "../Actions/gen";
import ClauseLibraryAPI from "../Actions/API";
import { getClauseIdsFromFolderHierarchy } from "../Component/Utils/clauseLibraryUtils";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getFolderHeading(action: GetFolderHeading) {
	let url = SITEAPI + "clauselibrary/folders";
	try {
		let response = yield call(ClauseLibraryAPI.getFolderHeading, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0]
					.data as FolderHeadingInfo[];
				yield put(
					ClauseLibraryActionGenerator.getFolderHeadingSuccess(parsed)
				);
			}
			default: {
				yield put(
					ClauseLibraryActionGenerator.getFolderHeadingFailure()
				);
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.getFolderHeadingFailure());
	}
}

function* getFolderSubHeading(action: GetFolderSubHeading) {
	let parentId = action.payload.parentId;
	let url = SITEAPI + "clauselibrary/subfolders/" + parentId;
	try {
		let response = yield call(ClauseLibraryAPI.getFolderSubHeading, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0]
					.data as FolderHeadingInfo[];
				yield put(
					ClauseLibraryActionGenerator.getFolderSubHeadingSuccess(
						parsed
					)
				);
			}
			default: {
				yield put(
					ClauseLibraryActionGenerator.getFolderSubHeadingFailure()
				);
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.getFolderHeadingFailure());
	}
}

function* createFolderHeading(action: CreateFolderHeading) {
	let url = SITEAPI + "clauselibrary/create/folder";
	let folderName = action.payload.folderName;
	try {
		let response = yield call(
			ClauseLibraryAPI.createFolderHeading,
			url,
			folderName
		);
		switch (response.status) {
			case 200: {
				yield put(
					ClauseLibraryActionGenerator.createFolderHeadingSuccess()
				);
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
			default: {
				yield put(
					ClauseLibraryActionGenerator.createFolderHeadingFailure()
				);
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.createFolderHeadingFailure());
	}
}

function* createFolderSubHeading(action: CreateFolderSubHeading) {
	let url = SITEAPI + "clauselibrary/create/subfolder";
	let folderName = action.payload.folderName;
	let parentId = action.payload.parentId;
	try {
		let response = yield call(
			ClauseLibraryAPI.createFolderSubHeading,
			url,
			folderName,
			parentId
		);
		switch (response.status) {
			case 200: {
				yield put(
					ClauseLibraryActionGenerator.createFolderSubHeadingSuccess()
				);
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
			default: {
				yield put(
					ClauseLibraryActionGenerator.createFolderSubHeadingFailure()
				);
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.createFolderSubHeadingFailure());
	}
}

function* createClause(action: CreateClause) {
	let url = SITEAPI + "clauselibrary/create/clause";
	let clauseName = action.payload.clauseName;
	let extractedText = action.payload.extractedText;
	let userText = action.payload.userText;
	let clauseType = action.payload.clauseType;
	let sourceFileId = action.payload.sourceFileId;
	let folderId = action.payload.folderId;
	try {
		let response = yield call(
			ClauseLibraryAPI.createClause,
			url,
			clauseName,
			extractedText,
			userText,
			clauseType,
			sourceFileId,
			folderId
		);
		switch (response.status) {
			case 200: {
				yield put(ClauseLibraryActionGenerator.createClauseSuccess());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
			default: {
				yield put(ClauseLibraryActionGenerator.createClauseFailure());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.createClauseFailure());
	}
}

function* editClause(action: EditClause) {
	let url = SITEAPI + "clauselibrary/edit/clause";
	let clauseId = action.payload.clauseId;
	let clauseName = action.payload.clauseName;
	let userText = action.payload.userText;
	let clauseType = action.payload.clauseType;
	let folderId = action.payload.folderId;

	try {
		let response = yield call(
			ClauseLibraryAPI.editClause,
			url,
			clauseId,
			clauseName,
			userText,
			clauseType,
			folderId
		);
		switch (response.status) {
			case 200: {
				yield put(ClauseLibraryActionGenerator.editClauseSuccess());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
			default: {
				yield put(ClauseLibraryActionGenerator.editClauseFailure());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.editClauseFailure());
	}
}

function* deleteClause(action: DeleteClause) {
	let url = SITEAPI + "clauselibrary/delete/clause";
	let clauseId = action.payload.clauseId;
	try {
		let response = yield call(ClauseLibraryAPI.deleteClause, url, clauseId);
		switch (response.status) {
			case 200: {
				yield put(ClauseLibraryActionGenerator.deleteClauseSuccess());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
			default: {
				yield put(ClauseLibraryActionGenerator.deleteClauseFailure());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.deleteClauseFailure());
	}
}

function* deleteFolder(action: DeleteFolder) {
	let url = SITEAPI + "clauselibrary/delete/folder";
	let folderId = action.payload.folderId;
	try {
		let response = yield call(ClauseLibraryAPI.deleteFolder, url, folderId);
		switch (response.status) {
			case 200: {
				yield put(ClauseLibraryActionGenerator.deleteFolderSuccess());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
			default: {
				yield put(ClauseLibraryActionGenerator.deleteFolderFailure());
				yield put(ClauseLibraryActionGenerator.getClauseLibraryData());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.deleteFolderFailure());
	}
}

function* getClauseLibraryData(action: GetClauseLibraryData) {
	let url = SITEAPI + "clauselibrary/data";
	try {
		let response = yield call(ClauseLibraryAPI.getClauseLibraryData, url);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0]
					.data as ClauseFolderState[];
				yield put(
					ClauseLibraryActionGenerator.getClauseLibraryDataSuccess(
						parsed
					)
				);
				//calculate clauseIds
				let clauseIds: number[] =
					getClauseIdsFromFolderHierarchy(parsed);
				yield put(
					ClauseLibraryActionGenerator.getClausesData(clauseIds)
				);
			}
			default: {
				yield put(
					ClauseLibraryActionGenerator.getClauseLibraryDataFailure()
				);
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.getClauseLibraryDataFailure());
	}
}

function* getClausesData(action: GetClausesData) {
	let url = SITEAPI + "clauselibrary/clauses/data";
	let clauseIds = action.payload.clauseIds;
	try {
		let response = yield call(
			ClauseLibraryAPI.getClausesData,
			url,
			clauseIds
		);
		switch (response.status) {
			case 200: {
				let parsed = response.data.queryResult[0]
					.data as ClauseStructure[];
				yield put(
					ClauseLibraryActionGenerator.getClausesDataSuccess(parsed)
				);
			}
			default: {
				yield put(ClauseLibraryActionGenerator.getClausesDataFailure());
			}
		}
	} catch (e) {
		yield put(ClauseLibraryActionGenerator.getClausesDataFailure());
	}
}

export default function* analysisWatcher() {
	yield all([
		takeLatest(GETFOLDERHEADING, getFolderHeading),
		takeLatest(GETFOLDERSUBHEADING, getFolderSubHeading),
		takeLatest(CREATEFOLDERHEADING, createFolderHeading),
		takeLatest(CREATEFOLDERSUBHEADING, createFolderSubHeading),
		takeLatest(CREATECLAUSE, createClause),
		takeLatest(DELETECLAUSE, deleteClause),
		takeLatest(DELETEFOLDER, deleteFolder),
		takeLatest(GETCLAUSELIBRARYDATA, getClauseLibraryData),
		takeLatest(EDITCLAUSE, editClause),
		takeLatest(GETCLAUSESDATA, getClausesData),
	]);
}

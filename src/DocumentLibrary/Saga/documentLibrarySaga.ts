import { call, put, all, takeLatest } from "redux-saga/effects";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import DocumentLibraryAPI from "../Actions/API";
import {
  AddParent,
  ADDPARENT,
  ApplyGeneralFilterDL,
  APPLYGENERALFILTERSDL,
  APPLYLIBRARYTAGFILTERS,
  ApplyLibraryTagFilters,
  EDITTAGS,
  EditTags,
  GetChildrenFileList,
  GETCHILDRENFILELIST,
  GetDocumentHierarchy,
  GETDOCUMENTHIERARCHY,
  GetGeneralFilterDL,
  GETGENERALFILTERSDL,
  GetLibraryFileId,
  GETLIBRARYFILEID,
  GetLibraryTags,
  GETLIBRARYTAGS,
  GetParentFileList,
  GETPARENTFILELIST,
  RemoveParent,
  REMOVEPARENT,
  SAVELIBRARYTAGFILTERS,
} from "../Actions/def";
import DocumentLibraryGenerator from "../Actions/gen";
import {
  ChildrenFileInfo,
  DocumentHierarchyData,
  LibraryTagData,
  ParentFileInfo,
} from "../State/documentLibraryState";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getLibraryFileId(action: GetLibraryFileId) {
  let sort = action.payload.sort;
  let order = action.payload.order;
  // let url = SITEAPI + "library/files";
  let url = SITEAPI + "document-library/";
  try {
    let response = yield call(DocumentLibraryAPI.getFileIdArray, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.fileIds as number[];
        yield put(DocumentLibraryGenerator.getLibraryFileIdSuccess(parsed));
        if (parsed !== null) {
          yield put(
            DocumentLibraryGenerator.getDocumentHierarchy(sort, order, parsed)
          );
        }
        //call Hierarchy //hard coded default sorting as this action is being called when componentDidMount
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.getLibraryFileIdFailure());
      }
    }
  } catch (e) {
    yield put(DocumentLibraryGenerator.getLibraryFileIdFailure());
  }
}

function* getLibraryTags(action: GetLibraryTags) {
  let url = SITEAPI + "tags/";
  try {
    let response = yield call(DocumentLibraryAPI.getLibraryTags, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult as LibraryTagData[];
        yield put(DocumentLibraryAPI.getLibraryTagsSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentLibraryAPI.getLibraryTagsFailure());
      }
    }
  } catch (e) {
    yield put(DocumentLibraryAPI.getLibraryTagsFailure());
  }
}

function* getDocumentHierarchy(action: GetDocumentHierarchy) {
  let url = SITEAPI + "library/hierarchy";
  let fileIds = action.payload.fileIds;
  let sort = action.payload.sort;
  let order = action.payload.order;
  try {
    let response = yield call(
      DocumentLibraryAPI.getDocumentHierarchy,
      url,
      sort,
      order,
      fileIds
    );
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult as DocumentHierarchyData[];
        yield put(DocumentLibraryGenerator.getDocumentHierarchySuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.getDocumentHierarchyFailure());
      }
    }
  } catch (e) {
    yield put(DocumentLibraryGenerator.getDocumentHierarchyFailure());
  }
}

function* applyLibraryTagFilters(action: ApplyLibraryTagFilters) {
  let url = SITEAPI + "library/filter/tag/apply";
  let payload = {
    fileIds: action.payload.initialFileIds,
    filterStructure: action.payload.appliedLibraryTagFilters,
  };
  try {
    let response = yield call(
      DocumentLibraryAPI.applyLibraryTagFilters,
      url,
      payload
    );
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.filteredFileIds;
        yield put(
          DocumentLibraryGenerator.applyLibraryTagFiltersSuccess(parsed)
        );
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.applyLibraryTagFiltersFailure());
      }
    }
  } catch (e) {
    yield put(DocumentLibraryGenerator.applyLibraryTagFiltersFailure());
  }
}

function* addOrEditTags(action: EditTags) {
  let url = SITEAPI + "library/edittags";
  let payload = {
    editFileIds: action.payload.editFileIds,
    dataType: action.payload.dataType,
    name: action.payload.tagEditData,
    isBulkAction: action.payload.isBulkAction,
  };
  try {
    let response = yield call(DocumentLibraryAPI.addOrEditTags, url, payload);
    switch (response.status) {
      case 200: {
        yield put(DocumentLibraryGenerator.editTagsSuccess());
        break;
      }
      default: {
        //do nothing
      }
    }
  } catch (e) {
    //do nothing
  }
}

function* getParentFileList(action: GetParentFileList) {
  let url = SITEAPI + "library/hierarchy/list/parent";
  let fileIds = action.payload.fileIds;
  let selectedFileId = action.payload.selectedFileId;
  let bulkFileIds = action.payload.bulkFileIds;
  try {
    let response = yield call(
      DocumentLibraryAPI.getParentFileList,
      url,
      selectedFileId,
      fileIds,
      bulkFileIds
    );
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.data as ParentFileInfo[];
        yield put(DocumentLibraryGenerator.getParentFileListSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.getParentFileListFailure());
      }
    }
  } catch (e) {
    yield put(DocumentLibraryGenerator.getParentFileListFailure());
  }
}

function* addParent(action: AddParent) {
  let url = SITEAPI + "library/hierarchy/addparent";
  let childFileIds = action.payload.childFileIds;
  let editedParentFileId = action.payload.editedParentFileId;
  try {
    let response = yield call(
      DocumentLibraryAPI.addParent,
      url,
      childFileIds,
      editedParentFileId
    );
    switch (response.status) {
      case 200: {
        yield put(DocumentLibraryGenerator.addParentSuccess());
        break;
      }
      default: {
        //do nothing
      }
    }
  } catch (e) {
    //do nothing
  }
}

function* getChildrenFileList(action: GetChildrenFileList) {
  let url = SITEAPI + "library/hierarchy/list/children";
  let fileIds = action.payload.fileIds;
  let selectedFileId = action.payload.selectedFileId;
  try {
    let response = yield call(
      DocumentLibraryAPI.getChildrentFileList,
      url,
      selectedFileId,
      fileIds
    );
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.data as ChildrenFileInfo[];
        yield put(DocumentLibraryGenerator.getChildrenFileListSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.getChildrenFileListFailure());
      }
    }
  } catch (e) {
    yield put(DocumentLibraryGenerator.getChildrenFileListFailure());
  }
}

function* removeParent(action: RemoveParent) {
  let url = SITEAPI + "library/hierarchy/removeparent";
  let childFileIds = action.payload.childFileIds;
  let editedParentFileId = action.payload.editedParentFileId;
  try {
    let response = yield call(
      DocumentLibraryAPI.removeParent,
      url,
      childFileIds,
      editedParentFileId
    );
    switch (response.status) {
      case 200: {
        yield put(DocumentLibraryGenerator.removeParentSuccess());
        break;
      }
      default: {
        //do nothing
      }
    }
  } catch (e) {
    //do nothing
  }
}

function* getGeneralFilterDL(action: GetGeneralFilterDL) {
  let url = SITEAPI + "library/filter/general";
  let fileIds = action.payload.fileIds;
  try {
    let response = yield call(
      DocumentLibraryAPI.getGeneralFilterDL,
      url,
      fileIds
    );
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.generalFilters;
        yield put(DocumentLibraryGenerator.getGeneralFilterDLSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.getGeneralFilterDLFailure());
      }
    }
  } catch (error) {
    yield put(DocumentLibraryGenerator.getGeneralFilterDLFailure());
  }
}

function* applyGeneralFilterDL(actions: ApplyGeneralFilterDL) {
  let fileIds = actions.payload.filterIds;
  let filterType = actions.payload.filterType;
  let sort = actions.payload.sort;
  let order = actions.payload.order;

  let url = SITEAPI + "library/filter/general/apply";

  try {
    let response = yield call(
      DocumentLibraryAPI.applyGeneralFilterDL,
      url,
      fileIds,
      filterType
    );
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.fileIds as number[];
        yield put(DocumentLibraryGenerator.applyGeneralFilterDLSuccess(parsed));
        yield put(
          DocumentLibraryGenerator.getDocumentHierarchy(sort, order, parsed)
        );
        break;
      }
      default: {
        yield put(DocumentLibraryGenerator.applyGeneralFilterDLFailure());
        break;
      }
    }
  } catch (error) {
    yield put(DocumentLibraryGenerator.applyGeneralFilterDLFailure());
  }
}

export default function* documentLibraryWatcher() {
  yield all([
    takeLatest(GETLIBRARYFILEID, getLibraryFileId),
    takeLatest(GETLIBRARYTAGS, getLibraryTags),
    takeLatest(GETDOCUMENTHIERARCHY, getDocumentHierarchy),
    takeLatest(SAVELIBRARYTAGFILTERS, applyLibraryTagFilters),
    takeLatest(APPLYLIBRARYTAGFILTERS, applyLibraryTagFilters),
    takeLatest(EDITTAGS, addOrEditTags),
    takeLatest(GETPARENTFILELIST, getParentFileList),
    takeLatest(ADDPARENT, addParent),
    takeLatest(GETCHILDRENFILELIST, getChildrenFileList),
    takeLatest(REMOVEPARENT, removeParent),
    takeLatest(GETGENERALFILTERSDL, getGeneralFilterDL),
    takeLatest(APPLYGENERALFILTERSDL, applyGeneralFilterDL),
  ]);
}

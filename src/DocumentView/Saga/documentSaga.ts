import {
  GetSentences,
  GETSENTENCES,
  GETINSIGHTS,
  GetInsights,
  RequestTags,
  REQUESTTAGS,
  ListTagNature,
  ListTagType,
  LISTTAGTYPE,
  LISTTAGNATURE,
  ListOtherTags,
  LISTOTHERTAGS,
  EditDataPoint,
  EDITDATAPOINT,
  CreateOtherTags,
  CREATEOTHERTAGS,
  ListEvents,
  LISTEVENTS,
  CreateNewEvent,
  CREATENEWEVENT,
  GetDocumentTree,
  GETDOCUMENTTREE,
  GetDurationTypes,
  GETDURATIONTYPES,
  GETCURRENCYTYPES,
  GetCurrencyTypes,
} from "../Actions/def";

import { call, put, all, takeLatest } from "redux-saga/effects";
import DocumentAPI from "../Actions/API";
import {
  SentencesData,
  InsightsInterface,
  TagData,
  EventData,
  DurationType,
  CurrencyType,
} from "../State/documentState";
import DocumentActionGenerator from "../Actions/Gen";
import { getEventDataFromEventResult } from "../Component/Utils/docUtils";
import { FileHierarchy } from "../../DocumentLibrary/State/documentLibraryState";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
function* getSentences(action: GetSentences) {
  let fileId = action.payload.fileId;
  let url = SITEAPI + "document/sentence/" + fileId;
  try {
    let response = yield call(DocumentAPI.getSentences, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.extracted as SentencesData;
        yield put(DocumentActionGenerator.getSentencesSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentActionGenerator.getSentencesFailure());
      }
    }
  } catch (e) {
    yield put(DocumentActionGenerator.getSentencesFailure());
  }
}

function* getInsights(action: GetInsights) {
  let fileId = action.payload.fileId;
  let url = SITEAPI + "document/insights/" + fileId;
  try {
    let response = yield call(DocumentAPI.getInsights, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult as InsightsInterface[];
        yield put(DocumentActionGenerator.getInsightsSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentActionGenerator.getInsightsFailure());
      }
    }
  } catch (e) {
    yield put(DocumentActionGenerator.getInsightsFailure());
  }
}

function* requestTags(action: RequestTags) {
  let tagList = action.payload.tagList;
  let comment = action.payload.comment;
  let url = SITEAPI + "document/requesttags";
  let payload = {
    tagList: tagList,
    comment: comment,
  };
  try {
    let response = yield call(DocumentAPI.requestTags, url, payload);
    switch (response.status) {
      case 200: {
        yield put(DocumentActionGenerator.requestTagsSuccess());
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

function* listTagNature(action: ListTagNature) {
  //   let url = SITEAPI + "document/tags/nature";
  let url = SITEAPI + "tags/";
  try {
    let response = yield call(DocumentAPI.listTagNature, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult as TagData[];
        yield put(DocumentActionGenerator.listTagNatureSuccess(parsed));
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

function* listTagType(action: ListTagType) {
  //let url = SITEAPI + "document/tags/type";
  let url = SITEAPI + "tags/";
  try {
    let response = yield call(DocumentAPI.listTagType, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult as TagData[];
        yield put(DocumentActionGenerator.listTagTypeSuccess(parsed));
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

export function* listOtherTags(action: ListOtherTags) {
  // let url = SITEAPI + 'document/grouptags';
  let url = SITEAPI + "document-library/";
  let response = yield call(DocumentAPI.listOtherTags, url);
  if (response.status === 200) {
    let parsed = response.data.queryResult as TagData[];
    yield put(DocumentActionGenerator.listOtherTagsSuccess(parsed));
  } else {
    // console.log(response.data);
    //do nothing
  }
}

function* addOrEditData(action: EditDataPoint) {
  let url = SITEAPI + "document/editdata";
  let payload = {
    fileId: action.payload.fileId,
    dataType: action.payload.dataType,
    name: action.payload.dataPointName,
    highlightedId: action.payload.highlightedId,
  };
  try {
    let response = yield call(DocumentAPI.addOrEditData, url, payload);
    switch (response.status) {
      case 200: {
        yield put(DocumentActionGenerator.editDataPointSuccess());
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

function* createOtherTag(action: CreateOtherTags) {
  let url = SITEAPI + "document/othertag/create/" + action.payload.name;
  try {
    let response = yield call(DocumentAPI.createOtherTag, url);
    switch (response.status) {
      case 200: {
        let newTagData: TagData = {
          id: response.data.queryResult.id as number,
          name: response.data.queryResult.name,
        };
        yield put(DocumentActionGenerator.createOtherTagsSuccess(newTagData));
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

function* listEvents(action: ListEvents) {
  let eventTerm = action.payload.event;
  let url = SITEAPI + "document/events/" + eventTerm;
  try {
    let response = yield call(DocumentAPI.listEvents, url);
    switch (response.status) {
      case 200: {
        let parsed = getEventDataFromEventResult(response.data.queryResult);
        yield put(DocumentActionGenerator.listEventsSuccess(parsed));
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

function* createNewEvent(action: CreateNewEvent) {
  let newEventName = btoa(action.payload.name);
  let url =
    SITEAPI +
    "document/events/create/" +
    action.payload.eventPoint +
    "/" +
    newEventName;
  try {
    let response = yield call(DocumentAPI.createNewEvent, url);
    switch (response.status) {
      case 200: {
        let newEventData: EventData = {
          eventId: response.data.queryResult.id as number,
          eventName: response.data.queryResult.name,
        };
        yield put(DocumentActionGenerator.createNewEventSuccess(newEventData));
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

function* getDocumentTree(action: GetDocumentTree) {
  let fileID = action.payload.fileID;
  let url = SITEAPI + "library/dochierarchy";

  try {
    let response = yield call(DocumentAPI.getDocumentTree, url, fileID);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult as FileHierarchy;
        yield put(DocumentActionGenerator.getDocumentTreeSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentActionGenerator.getDocumentTreeFailure());
      }
    }
  } catch (e) {
    yield put(DocumentActionGenerator.getDocumentTreeFailure());
  }
}

function* getDurationTypes(action: GetDurationTypes) {
  let url = SITEAPI + "document/duration";
  try {
    let response = yield call(DocumentAPI.getDurationTypes, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.data as DurationType[];
        yield put(DocumentActionGenerator.getDurationTypesSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentActionGenerator.getDurationTypesFailure());
      }
    }
  } catch (e) {
    yield put(DocumentActionGenerator.getDurationTypesFailure());
  }
}

function* getCurrencyTypes(action: GetCurrencyTypes) {
  let url = SITEAPI + "document/currency";
  try {
    let response = yield call(DocumentAPI.getCurrencyTypes, url);
    switch (response.status) {
      case 200: {
        let parsed = response.data.queryResult.data as CurrencyType[];
        yield put(DocumentActionGenerator.getCurrencyTypesSuccess(parsed));
        break;
      }
      default: {
        yield put(DocumentActionGenerator.getCurrencyTypesFailure());
      }
    }
  } catch (e) {
    yield put(DocumentActionGenerator.getCurrencyTypesFailure());
  }
}

export default function* DocumentWatcher() {
  yield all([
    takeLatest(GETSENTENCES, getSentences),
    takeLatest(GETINSIGHTS, getInsights),
    takeLatest(REQUESTTAGS, requestTags),
    takeLatest(LISTTAGTYPE, listTagType),
    takeLatest(LISTTAGNATURE, listTagNature),
    takeLatest(LISTOTHERTAGS, listOtherTags),
    takeLatest(EDITDATAPOINT, addOrEditData),
    takeLatest(CREATEOTHERTAGS, createOtherTag),
    takeLatest(LISTEVENTS, listEvents),
    takeLatest(CREATENEWEVENT, createNewEvent),
    takeLatest(GETDOCUMENTTREE, getDocumentTree),
    takeLatest(GETDURATIONTYPES, getDurationTypes),
    takeLatest(GETCURRENCYTYPES, getCurrencyTypes),
  ]);
}

import {
  GETUSERUPLOADS_SUCCESS,
  CHANGESTATUS_SUCCESS,
  HistoryActions,
  GETUSERUPLOADS,
  DELETEFILE_SUCCESS,
  DELETEFILE_FAILURE,
  SAVEDELETEDETAILS,
} from "../Actions/def";
import { PROCESSING, DONE } from "../../Constants/const";
import { StatusPoints, FileInfo } from "../../Upload/State/uploadState";
import HistoryState, { defaultHistoryState } from "../State/historyState";

export default function historyReducer(
  state: HistoryState = defaultHistoryState(),
  action: HistoryActions
): HistoryState {
  switch (action.type) {
    case GETUSERUPLOADS: {
      return { ...state, historyLoader: true };
    }
    case GETUSERUPLOADS_SUCCESS: {
      console.log("🚀 ~ file: historyRed.ts", action.payload.userUploads);
      //userUploads: defineProcessStatus(action.payload.userUploads.slice(0)),
      return {
        ...state,
        userUploads: defineProcessStatus(action.payload.userUploads),
        historyLoader: false,
      };
    }
    case CHANGESTATUS_SUCCESS: {
      return {
        ...state,
        userUploads: changeProcessStatus(
          state.userUploads.slice(0),
          action.payload.statusPoints
        ),
      };
    }
    case DELETEFILE_SUCCESS: {
      return { ...state, deleteStatus: action.payload.deleteStatus };
    }
    case DELETEFILE_FAILURE: {
      return { ...state, deleteStatus: action.payload.deleteStatus };
    }
    case SAVEDELETEDETAILS: {
      return {
        ...state,
        documentName: action.payload.documentName,
        uniqueFileId: action.payload.uniqueFileId,
      };
    }
    default:
      return state;
  }
}

function defineProcessStatus(oldState: FileInfo[]) {
  for (let i = 0; i < oldState.length; i++) {
    let bool1 = oldState[i].status.textract;
    let bool2 = oldState[i].status.analytics;
    let bool3 = oldState[i].status.normalization;
    if (bool1 && bool2 && bool3) {
      //All are true
      oldState[i].fileState.progressState.process = DONE;
      oldState[i].fileState.progressState.percentage = 100;
    } else if (bool1 ? bool2 || bool3 : bool2 && bool3) {
      //Atleast two are true
      oldState[i].fileState.progressState.process = PROCESSING;
      oldState[i].fileState.progressState.percentage = 75;
    } else if (bool1 || bool2 || bool3) {
      //Anyone is true
      oldState[i].fileState.progressState.process = PROCESSING;
      oldState[i].fileState.progressState.percentage = 50;
    } else {
      oldState[i].fileState.progressState.process = PROCESSING;
      oldState[i].fileState.progressState.percentage = 25;
    }
  }
  return oldState;
}

function changeProcessStatus(oldState: FileInfo[], statusPoints: StatusPoints) {
  let index = oldState.findIndex((el) => {
    return el.fileState.fileId === statusPoints.fileId;
  });
  if (index > -1) {
    let bool1 = statusPoints.textract;
    let bool2 = statusPoints.analytics;
    let bool3 = statusPoints.normalization;
    if (bool1 && bool2 && bool3) {
      //All are true
      oldState[index].fileState.progressState.process = DONE;
      oldState[index].fileState.progressState.percentage = 100;
    } else if (bool1 ? bool2 || bool3 : bool2 && bool3) {
      //Atleast two are true
      oldState[index].fileState.progressState.process = PROCESSING;
      oldState[index].fileState.progressState.percentage = 75;
    } else if (bool1 || bool2 || bool3) {
      //Anyone is true
      oldState[index].fileState.progressState.process = PROCESSING;
      oldState[index].fileState.progressState.percentage = 50;
    } else {
      oldState[index].fileState.progressState.process = PROCESSING;
      oldState[index].fileState.progressState.percentage = 25;
    }
  }
  return oldState;
}

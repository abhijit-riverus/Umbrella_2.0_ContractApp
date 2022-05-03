import UploadState, { defaultUploadState, FileState, StatusPoints, FileInfo } from "../State/uploadState";
import { FILEUPLOAD, FILEUPLOAD_SUCCESS, FILEUPLOAD_FAILURE, CHANGESTATUS_SUCCESS, UploadActions, CHECKDUPLICATE_SUCCESS, STOREUPLOADVALIDITY } from "../Actions/def";
import { PROCESSING, FAILED, DONE, UPLOADED } from "../../Constants/const";

export default function uploadReducer(state: UploadState = defaultUploadState(), action: UploadActions): UploadState {
    switch (action.type) {
        case FILEUPLOAD: {
            return { ...state, fileChunk: action.payload.fileChunk ,fileUploadRequest: action.payload.fileUploadRequest, uploadLoader: true };
        }
        case FILEUPLOAD_SUCCESS: {
            return { ...state, fileInfo: updateFileIdMap(state.fileInfo.slice(0), action.payload.fileInfo), filesCount: action.payload.filesCount ,uploadLoader: false };
        }
        case FILEUPLOAD_FAILURE: {
            return { ...state, fileUploadRequest: updateProcessState(state.fileUploadRequest.slice(0), action.payload.fileUploadRequest), uploadLoader: false };
        }
        case CHANGESTATUS_SUCCESS: {
            return { ...state, fileInfo: changeProcessStatus(state.fileInfo.slice(0), action.payload.statusPoints) };
        }
        case CHECKDUPLICATE_SUCCESS: {
            return { ...state, toBeUploaded: action.payload.toBeUploaded, duplicateFiles: action.payload.duplicateFiles }
        }
        case STOREUPLOADVALIDITY: {
            return { ...state, uploadValidityObject: action.payload.uploadValidityObject, totalFiles: action.payload.totalFiles }
        }
        default: return state;
    }
}

function changeProcessStatus(oldState: FileInfo[], statusPoints: StatusPoints) {
    let index = oldState.findIndex((el) => { return el.fileState.fileId === statusPoints.fileId });
    if (index > -1) {
        let bool1 = statusPoints.textract;
        let bool2 = statusPoints.analytics;
        let bool3 = statusPoints.normalization;
        if (bool1 && bool2 && bool3) { //All are true
            oldState[index].fileState.progressState.process = DONE;
            oldState[index].fileState.progressState.percentage = 100;
        } else if (bool1 ? (bool2 || bool3) : (bool2 && bool3)) { //Atleast two are true
            oldState[index].fileState.progressState.process = PROCESSING;
            oldState[index].fileState.progressState.percentage = 75;
        } else if (bool1 || bool2 || bool3) { //Anyone is true
            oldState[index].fileState.progressState.process = PROCESSING;
            oldState[index].fileState.progressState.percentage = 50;
        } else {
            oldState[index].fileState.progressState.process = PROCESSING;
            oldState[index].fileState.progressState.percentage = 25;
        }
    }
    return oldState;
}

function updateProcessState(oldState: FileInfo[], newState: FileState[]) {
    
    for(let i = 0; i < newState.length; i++) {
        for (let j = 0; j < oldState.length; j++) {
            if (oldState[j].fileState.name === newState[i].name) {
                oldState[j].fileState.progressState.process =  FAILED;
                oldState[j].fileState.progressState.percentage = 25;
            }
        }
    }
    return oldState;
}

function updateFileIdMap(oldState: FileInfo[], fileIdMap: FileInfo) {
    
    let index = oldState.findIndex((el) => { return el.fileState.name === fileIdMap.fileState.name; });
    
    if (index > -1) {
        oldState[index].fileState.fileId = fileIdMap.fileState.fileId;
        oldState[index].fileState.progressState.process =  UPLOADED;
        oldState[index].fileState.progressState.percentage = 25;
    } else {
        oldState.push(fileIdMap);
    }
    return oldState;
}
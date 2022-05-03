import { FileState, StatusPoints, FileInfo, ChunkState } from "../State/uploadState";
import { UploadValidityObject } from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";

export const FILEUPLOAD = 'FILEUPLOAD';
export type FILEUPLOAD = typeof FILEUPLOAD;
export const FILEUPLOAD_SUCCESS = 'FILEUPLOAD_SUCCESS';
export type FILEUPLOAD_SUCCESS = typeof FILEUPLOAD_SUCCESS;
export const FILEUPLOAD_FAILURE = 'FILEUPLOAD_FAILURE';
export type FILEUPLOAD_FAILURE = typeof FILEUPLOAD_FAILURE;

export const CHANGESTATUS = 'CHANGESTATUS';
export type CHANGESTATUS = typeof CHANGESTATUS;
export const CHANGESTATUS_SUCCESS = 'CHANGESTATUS_SUCCESS';
export type CHANGESTATUS_SUCCESS = typeof CHANGESTATUS_SUCCESS;

export const CHECKDUPLICATE = 'CHECKDUPLICATE';
export type CHECKDUPLICATE = typeof CHECKDUPLICATE;
export const CHECKDUPLICATE_SUCCESS = 'CHECKDUPLICATE_SUCCESS';
export type CHECKDUPLICATE_SUCCESS = typeof CHECKDUPLICATE_SUCCESS;
export const CHECKDUPLICATE_FAILURE = 'CHECKDUPLICATE_FAILURE';
export type CHECKDUPLICATE_FAILURE = typeof CHECKDUPLICATE_FAILURE;

export const STOREUPLOADVALIDITY = 'STOREUPLOADVALIDITY';
export type STOREUPLOADVALIDITY = typeof STOREUPLOADVALIDITY;

/* export interface FileUpload {
    type: FILEUPLOAD;
    payload: {
        file: FormData;
        fileUploadRequest: FileInfo[];
    }
} */

export interface FileUpload {
    type: FILEUPLOAD;
    payload: {
        fileChunk: ChunkState;
        fileUploadRequest: FileInfo[];
    }
}

export interface FileUploadSuccess {
    type: FILEUPLOAD_SUCCESS;
    payload: {
        fileInfo: FileInfo;
        filesCount: number;
    }
}

export interface FileUploadFailure {
    type: FILEUPLOAD_FAILURE;
    payload: {
        fileUploadRequest: FileState[];
    }
}

export interface ChangeStatus {
    type: CHANGESTATUS;
}

export interface ChangeStatusSuccess {
    type: CHANGESTATUS_SUCCESS;
    payload: {
        statusPoints: StatusPoints;
    }
}

export interface CheckDuplicate {
    type: CHECKDUPLICATE;
    payload: {
        fileNameArray: string[];
        file: File[];
    }
}

export interface CheckDuplicateSuccess {
    type: CHECKDUPLICATE_SUCCESS;
    payload: {
        toBeUploaded: File[];
        duplicateFiles: string[];
    }
}

export interface CheckDuplicateFailure {
    type: CHECKDUPLICATE_FAILURE;
}

export interface StoreUploadValidity {
    type: STOREUPLOADVALIDITY;
    payload: {
        uploadValidityObject: UploadValidityObject;
        totalFiles: File[];
    }
}

export type UploadActions = FileUpload |
    FileUploadSuccess |
    FileUploadFailure |
    ChangeStatus |
    ChangeStatusSuccess |
    CheckDuplicate |
    CheckDuplicateSuccess |
    CheckDuplicateFailure |
    StoreUploadValidity;
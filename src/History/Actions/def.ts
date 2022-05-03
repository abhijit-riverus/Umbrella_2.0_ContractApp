import { StatusPoints, FileInfo } from "../../Upload/State/uploadState";

export const GETUSERUPLOADS = 'GETUSERUPLOADS';
export type GETUSERUPLOADS = typeof GETUSERUPLOADS;
export const GETUSERUPLOADS_SUCCESS = 'GETUSERUPLOADS_SUCCESS';
export type GETUSERUPLOADS_SUCCESS = typeof GETUSERUPLOADS_SUCCESS;
export const GETUSERUPLOADS_FAILURE = 'GETUSERUPLOADS_FAILURE';
export type GETUSERUPLOADS_FAILURE = typeof GETUSERUPLOADS_FAILURE;

export const CHANGESTATUS = 'CHANGESTATUS';
export type CHANGESTATUS = typeof CHANGESTATUS;
export const CHANGESTATUS_SUCCESS = 'CHANGESTATUS_SUCCESS';
export type CHANGESTATUS_SUCCESS = typeof CHANGESTATUS_SUCCESS;

export const DELETEFILE = 'DELETEFILE';
export type DELETEFILE = typeof DELETEFILE;
export const DELETEFILE_SUCCESS = 'DELETEFILE_SUCCESS';
export type DELETEFILE_SUCCESS = typeof DELETEFILE_SUCCESS;
export const DELETEFILE_FAILURE = 'DELETEFILE_FAILURE';
export type DELETEFILE_FAILURE = typeof DELETEFILE_FAILURE;

export const SAVEDELETEDETAILS = 'SAVEDELETEDETAILS';
export type SAVEDELETEDETAILS = typeof SAVEDELETEDETAILS;

export interface GetUserUploads {
    type: GETUSERUPLOADS;
}

export interface GetUserUploadsSuccess {
    type: GETUSERUPLOADS_SUCCESS;
    payload: {
        userUploads: FileInfo[];
    }
}

export interface GetUserUploadsFailure {
    type: GETUSERUPLOADS_FAILURE;
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

export interface DeleteFile {
    type: DELETEFILE;
    payload: {
        uniqueFileId: number;
    }
}

export interface DeleteFileSuccess {
    type: DELETEFILE_SUCCESS;
    payload: {
        deleteStatus: number;
    }
}

export interface DeleteFileFailure {
    type: DELETEFILE_FAILURE;
    payload: {
        deleteStatus: number;
    }
}

export interface SaveDeleteDetails {
    type: SAVEDELETEDETAILS;
    payload: {
        documentName: string;
        uniqueFileId: number;
    }
}

export type HistoryActions = 
    GetUserUploads |
    GetUserUploadsSuccess |
    GetUserUploadsFailure |
    ChangeStatus |
    ChangeStatusSuccess |
    DeleteFile |
    DeleteFileSuccess |
    DeleteFileFailure |
    SaveDeleteDetails;
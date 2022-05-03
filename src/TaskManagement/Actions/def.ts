import { AllTasksData, ProgressNameList, ProgressUpdated, TaskCount } from "../State/taskManagementPageState";

export const GETALLTASKSDATA = 'GETALLTASKSDATA';
export type GETALLTASKSDATA = typeof GETALLTASKSDATA;
export const GETALLTASKSDATA_SUCCESS = 'GETALLTASKSDATA_SUCCESS';
export type GETALLTASKSDATA_SUCCESS = typeof GETALLTASKSDATA_SUCCESS;
export const GETALLTASKSDATA_FAILURE = 'GETALLTASKSDATA_FAILURE';
export type GETALLTASKSDATA_FAILURE = typeof GETALLTASKSDATA_FAILURE;

export const GETLASTUPDATEDON = 'GETLASTUPDATEDON';
export type GETLASTUPDATEDON = typeof GETLASTUPDATEDON;
export const GETLASTUPDATEDON_SUCCESS = 'GETLASTUPDATEDON_SUCCESS';
export type GETLASTUPDATEDON_SUCCESS = typeof GETLASTUPDATEDON_SUCCESS;
export const GETLASTUPDATEDON_FAILURE = 'GETLASTUPDATEDON_FAILURE';
export type GETLASTUPDATEDON_FAILURE = typeof GETLASTUPDATEDON_FAILURE;

export const GETPROGRESSNAMELIST = 'GETPROGRESSNAMELIST';
export type GETPROGRESSNAMELIST = typeof GETPROGRESSNAMELIST;
export const GETPROGRESSNAMELIST_SUCCESS = 'GETPROGRESSNAMELIST_SUCCESS';
export type GETPROGRESSNAMELIST_SUCCESS = typeof GETPROGRESSNAMELIST_SUCCESS;
export const GETPROGRESSNAMELIST_FAILURE = 'GETPROGRESSNAMELIST_FAILURE';
export type GETPROGRESSNAMELIST_FAILURE = typeof GETPROGRESSNAMELIST_FAILURE;

export const UPDATEPROGRESS = 'UPDATEPROGRESS';
export type UPDATEPROGRESS = typeof UPDATEPROGRESS;
export const UPDATEPROGRESS_SUCCESS = 'UPDATEPROGRESS_SUCCESS';
export type UPDATEPROGRESS_SUCCESS = typeof UPDATEPROGRESS_SUCCESS;
export const UPDATEPROGRESS_FAILURE = 'UPDATEPROGRESS_FAILURE';
export type UPDATEPROGRESS_FAILURE = typeof UPDATEPROGRESS_FAILURE;

export const GETTASKCOUNT = 'GETTASKCOUNT';
export type GETTASKCOUNT = typeof GETTASKCOUNT;
export const GETTASKCOUNT_SUCCESS = 'GETTASKCOUNT_SUCCESS';
export type GETTASKCOUNT_SUCCESS = typeof GETTASKCOUNT_SUCCESS;
export const GETTASKCOUNT_FAILURE = 'GETTASKCOUNT_FAILURE';
export type GETTASKCOUNT_FAILURE = typeof GETTASKCOUNT_FAILURE;

export const RESETTUPDATEDPROGRESSQUEUE= 'RESETTUPDATEDPROGRESSQUEUE';
export type RESETTUPDATEDPROGRESSQUEUE = typeof RESETTUPDATEDPROGRESSQUEUE;

export interface ResetUpdatedProgressQueue {
    type: RESETTUPDATEDPROGRESSQUEUE,
    payload: {
        progressUpdated: ProgressUpdated[]
    }
}

export interface GetAllTasksData {
    type: GETALLTASKSDATA,
    payload: {
        fileID: number,
        requestID: number,
        sort: string,
        order: string,
        selfAssigned: boolean,
        clauseType: string
    }
}

export interface GetAllTasksDataSuccess {
    type: GETALLTASKSDATA_SUCCESS,
    payload: {
        allTasksData: AllTasksData[]
    }
}

export interface GetAllTasksDataFailure {
    type: GETALLTASKSDATA_FAILURE
}

export interface GetLastUpdatedOn {
    type: GETLASTUPDATEDON,
    payload: {
        selfAssigned: boolean
    }
}

export interface GetLastUpdatedOnSuccess {
    type: GETLASTUPDATEDON_SUCCESS,
    payload: {
        lastUpdate: string
    }
}

export interface GetLastUpdatedOnFailure {
    type: GETLASTUPDATEDON_FAILURE
}

export interface GetProgressNameList {
    type: GETPROGRESSNAMELIST
}

export interface GetProgressNameListSuccess {
    type: GETPROGRESSNAMELIST_SUCCESS,
    payload: {
        progressNameList: ProgressNameList[]
    }
}

export interface GetProgressNameListFailure {
    type: GETPROGRESSNAMELIST_FAILURE
}

export interface UpdateProgress {
    type: UPDATEPROGRESS,
    payload: {
        requestID: number,
        progressID: number
    }
}

export interface UpdateProgressSuccess {
    type: UPDATEPROGRESS_SUCCESS,
    payload: {
        isProgressUpdated: number,
        requestID: number,
        progressID: number
    }
}

export interface UpdateProgressFailure {
    type: UPDATEPROGRESS_FAILURE,
    payload: {
        isProgressUpdated: number
    }
}

export interface GetTaskCount {
    type: GETTASKCOUNT
}

export interface GetTaskCountSuccess {
    type: GETTASKCOUNT_SUCCESS,
    payload: {
        taskCount: TaskCount
    }
}

export interface GetTaskCountFailure {
    type: GETTASKCOUNT_FAILURE
}

export type TaskManagementPageActions = GetAllTasksData |
GetAllTasksDataSuccess |
GetAllTasksDataFailure |
GetLastUpdatedOn |
GetLastUpdatedOnSuccess|
GetLastUpdatedOnFailure |
GetProgressNameList |
GetProgressNameListSuccess |
GetProgressNameListFailure | 
UpdateProgress |
UpdateProgressSuccess |
UpdateProgressFailure |
GetTaskCount |
GetTaskCountSuccess |
GetTaskCountFailure |
ResetUpdatedProgressQueue;
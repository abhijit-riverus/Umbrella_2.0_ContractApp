import { AllTasksData, ProgressNameList, ProgressUpdated, TaskCount } from "../State/taskManagementPageState";
import { GETALLTASKSDATA, GetAllTasksData, GetAllTasksDataFailure, GetAllTasksDataSuccess, GETALLTASKSDATA_FAILURE, GETALLTASKSDATA_SUCCESS, GETLASTUPDATEDON, GetLastUpdatedOn, GetLastUpdatedOnFailure, GetLastUpdatedOnSuccess, GETLASTUPDATEDON_FAILURE, GETLASTUPDATEDON_SUCCESS, GETPROGRESSNAMELIST, GetProgressNameList, GetProgressNameListFailure, GetProgressNameListSuccess, GETPROGRESSNAMELIST_FAILURE, GETPROGRESSNAMELIST_SUCCESS, GETTASKCOUNT, GetTaskCount, GetTaskCountFailure, GetTaskCountSuccess, GETTASKCOUNT_FAILURE, GETTASKCOUNT_SUCCESS, RESETTUPDATEDPROGRESSQUEUE, ResetUpdatedProgressQueue, UPDATEPROGRESS, UpdateProgress, UpdateProgressFailure, UpdateProgressSuccess, UPDATEPROGRESS_FAILURE, UPDATEPROGRESS_SUCCESS } from "./def";

export default class TaskManagementPageActionGenerator {

    public static getAllTasksData(fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string): GetAllTasksData {
        return{
            type: GETALLTASKSDATA,
            payload: {
                fileID: fileID,
                requestID: requestID,
                sort: sort,
                order: order,
                selfAssigned: selfAssigned,
                clauseType: clauseType
            }
        }
    }

    public static getAllTasksDataSuccess(allTasksData: AllTasksData[]): GetAllTasksDataSuccess {
        return{
            type: GETALLTASKSDATA_SUCCESS,
            payload: {
                allTasksData: allTasksData
            }
        }
    }

    public static getAllTasksDataFailure(): GetAllTasksDataFailure {
        return{
            type: GETALLTASKSDATA_FAILURE
        }
    }

    public static getLastUpdatedOn(selfAssigned: boolean): GetLastUpdatedOn {
        return{
            type: GETLASTUPDATEDON,
            payload: {
                selfAssigned: selfAssigned
            }
        }
    }

    public static getLastUpdatedOnSuccess(lastUpdate: string): GetLastUpdatedOnSuccess {
        return{
            type: GETLASTUPDATEDON_SUCCESS,
            payload: {
                lastUpdate: lastUpdate
            }
        }
    }

    public static getLastUpdatedOnFailure(): GetLastUpdatedOnFailure {
        return {
            type: GETLASTUPDATEDON_FAILURE
        }
    }

    public static getProgressNameList(): GetProgressNameList {
        return {
            type: GETPROGRESSNAMELIST
        }
    }

    public static getProgressNameListSuccess(progressNameList: ProgressNameList[]): GetProgressNameListSuccess {
        return {
            type: GETPROGRESSNAMELIST_SUCCESS,
            payload: {
                progressNameList: progressNameList
            }
        }
    }

    public static getProgressNameListFailure(): GetProgressNameListFailure {
        return {
            type: GETPROGRESSNAMELIST_FAILURE
        }
    }

    public static updateProgress(requestID: number, progressID: number): UpdateProgress {
        return {
            type: UPDATEPROGRESS,
            payload: {
                requestID: requestID,
                progressID: progressID
            }
        }
    }

    public static updateProgressSuccess(isProgressUpdated: number, requestID: number, progressID: number): UpdateProgressSuccess {
        return {
            type: UPDATEPROGRESS_SUCCESS,
            payload: {
                isProgressUpdated: isProgressUpdated,
                requestID: requestID,
                progressID: progressID
            }
        }
    }

    public static updateProgressFailure(isProgressUpdated: number): UpdateProgressFailure {
        return {
            type: UPDATEPROGRESS_FAILURE,
            payload: {
                isProgressUpdated: isProgressUpdated
            }
        }
    }

    public static getTaskCount(): GetTaskCount {
        return {
            type: GETTASKCOUNT
        }
    }

    public static getTaskCountSuccess (taskCount: TaskCount): GetTaskCountSuccess {
        return {
            type: GETTASKCOUNT_SUCCESS,
            payload: {
                taskCount: taskCount
            }
        }
    }

    public static getTaskCountFailure(): GetTaskCountFailure {
        return {
            type: GETTASKCOUNT_FAILURE
        }
    }

    public static resetUpdatedProgressQueue(progressUpdated: ProgressUpdated[]): ResetUpdatedProgressQueue {
        return{
            type: RESETTUPDATEDPROGRESSQUEUE,
            payload: {
                progressUpdated: progressUpdated
            }
        }
    }
}
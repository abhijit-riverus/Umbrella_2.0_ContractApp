import { UserData, TaskState, BISentence, BIType, TaskData, ClauseType, TaskEdit, Comments } from "../State/taskManagementState";

export const GETUSERDATA = 'GETUSERDATA';
export type GETUSERDATA = typeof GETUSERDATA;

export const GETUSERDATA_SUCCESS = 'GETUSERDATA_SUCCESS';
export type GETUSERDATA_SUCCESS = typeof GETUSERDATA_SUCCESS;

export const GETUSERDATA_FAILURE = 'GETUSERDATA_FAILURE';
export type GETUSERDATA_FAILURE = typeof GETUSERDATA_FAILURE;

export const GETTASKSTATE = 'GETTASKSTATE';
export type GETTASKSTATE = typeof GETTASKSTATE;

export const GETTASKSTATE_SUCCESS = 'GETTASKSTATE_SUCCESS';
export type GETTASKSTATE_SUCCESS = typeof GETTASKSTATE_SUCCESS;

export const GETTASKSTATE_FAILURE = 'GETTASKSTATE_FAILURE';
export type GETTASKSTATE_FAILURE = typeof GETTASKSTATE_FAILURE;

export const GETTASKPROGRESS = 'GETTASKPROGRESS';
export type GETTASKPROGRESS = typeof GETTASKPROGRESS;

export const GETTASKPROGRESS_SUCCESS = 'GETTASKPROGRESS_SUCCESS';
export type GETTASKPROGRESS_SUCCESS = typeof GETTASKPROGRESS_SUCCESS;

export const GETTASKPROGRESS_FAILURE = 'GETTASKPROGRESS_FAILURE';
export type GETTASKPROGRESS_FAILURE = typeof GETTASKPROGRESS_FAILURE;

export const SETCURRENTTASK = 'SETCURRENTTASK';
export type SETCURRENTTASK = typeof SETCURRENTTASK;

export const GETBITYPE = 'GETBITYPE';
export type GETBITYPE = typeof GETBITYPE;

export const GETBITYPE_SUCCESS = 'GETBITYPE_SUCCESS';
export type GETBITYPE_SUCCESS = typeof GETBITYPE_SUCCESS;

export const GETBITYPE_FAILURE = 'GETBITYPE_FAILURE';
export type GETBITYPE_FAILURE = typeof GETBITYPE_FAILURE;

export const GETCLAUSETYPE = 'GETCLAUSETYPE';
export type GETCLAUSETYPE = typeof GETCLAUSETYPE;

export const GETCLAUSETYPE_SUCCESS = 'GETCLAUSETYPE_SUCCESS';
export type GETCLAUSETYPE_SUCCESS = typeof GETCLAUSETYPE_SUCCESS;

export const GETCLAUSETYPE_FAILURE = 'GETCLAUSETYPE_FAILURE';
export type GETCLAUSETYPE_FAILURE = typeof GETCLAUSETYPE_FAILURE;

export const GETBISENTENCE = 'GETBISENTENCE';
export type GETBISENTENCE = typeof GETBISENTENCE;

export const GETBISENTENCE_SUCCESS = 'GETBISENTENCE_SUCCESS';
export type GETBISENTENCE_SUCCESS = typeof GETBISENTENCE_SUCCESS;

export const GETBISENTENCE_FAILURE = 'GETBISENTENCE_FAILURE';
export type GETBISENTENCE_FAILURE = typeof GETBISENTENCE_FAILURE;

export const CREATETASK = 'CREATETASK';
export type CREATETASK = typeof CREATETASK;

export const CREATETASK_SUCCESS = 'CREATETASK_SUCCESS';
export type CREATETASK_SUCCESS = typeof CREATETASK_SUCCESS;

export const CREATETASK_FAILURE = 'CREATETASK_FAILURE';
export type CREATETASK_FAILURE = typeof CREATETASK_FAILURE;

export const UPDATETASK = 'UPDATETASK';
export type UPDATETASK = typeof UPDATETASK;

export const UPDATETASK_SUCCESS = 'UPDATETASK_SUCCESS';
export type UPDATETASK_SUCCESS = typeof UPDATETASK_SUCCESS;

export const UPDATETASK_FAILURE = 'UPDATETASK_FAILURE';
export type UPDATETASK_FAILURE = typeof UPDATETASK_FAILURE;

export const POSTCOMMENT = 'POSTCOMMENT';
export type POSTCOMMENT = typeof POSTCOMMENT;

export const POSTCOMMENT_SUCCESS = 'POSTCOMMENT_SUCCESS';
export type POSTCOMMENT_SUCCESS = typeof POSTCOMMENT_SUCCESS;

export const POSTCOMMENT_FAILURE = 'POSTCOMMENT_FAILURE';
export type POSTCOMMENT_FAILURE = typeof POSTCOMMENT_FAILURE;

export const GETCOMMENTS = 'GETCOMMENTS';
export type GETCOMMENTS = typeof GETCOMMENTS;

export const GETCOMMENTS_SUCCESS = 'GETCOMMENTS_SUCCESS';
export type GETCOMMENTS_SUCCESS = typeof GETCOMMENTS_SUCCESS;

export const GETCOMMENTS_FAILURE = 'GETCOMMENTS_FAILURE';
export type GETCOMMENTS_FAILURE = typeof GETCOMMENTS_FAILURE;


export interface CreateTaskFailure {
    type: CREATETASK_FAILURE,
    payload: {
        createTaskStatus: number
    }
}

export interface CreateTaskSuccess {
    type: CREATETASK_SUCCESS,
    payload: {
        createTaskStatus: number
    }
}

export interface CreateTask {
    type: CREATETASK,
    payload: {
        taskData: TaskData
    }
}


export interface GetBISentenceFailure {
    type: GETBISENTENCE_FAILURE
}

export interface GetClauseType {
    type: GETCLAUSETYPE
}

export interface GetClauseTypeFailure {
    type: GETCLAUSETYPE_FAILURE
}

export interface GetClauseTypeSuccess {
    type: GETCLAUSETYPE_SUCCESS,
    payload: {
        clauseType: ClauseType[]
    }
}

export interface GetBITypeSuccess {
    type: GETBITYPE_SUCCESS,
    payload: {
        bi: BIType[]
    }
}

export interface GetBIType {
    type: GETBITYPE,
    payload: {
        clauseName: string
    }
}

export interface GetBITypeFailure {
    type: GETBITYPE_FAILURE
}

export interface GetBITypeSuccess {
    type: GETBITYPE_SUCCESS,
    payload: {
        bi: BIType[]
    }
}

export interface GetBISentenceSuccess {
    type: GETBISENTENCE_SUCCESS,
    payload: {
        bi: BISentence
    }
}

export interface GetBISentence {
    type: GETBISENTENCE,
    payload: {
        fileID: number,
        biColumnName: string
    }
}

export interface SetCurrentTask {
    type: SETCURRENTTASK;
    payload: {
        name: string,
        value: string,
        contractName: string
    }
}

export interface GetTaskStateFailure {
    type: GETTASKSTATE_FAILURE;
}

export interface GetTaskState {
    type: GETTASKSTATE;
}

export interface GetTaskStateSuccess {
    type: GETTASKSTATE_SUCCESS;
    payload: {
        taskState: TaskState[]
    }
}

export interface GetTaskProgressFailure {
    type: GETTASKPROGRESS_FAILURE;
}

export interface GetTaskProgress {
    type: GETTASKPROGRESS;
}

export interface GetTaskProgressSuccess {
    type: GETTASKPROGRESS_SUCCESS;
    payload: {
        taskProgress: TaskState[]
    }
}

export interface GetUserData {
    type: GETUSERDATA;
}

export interface GetUserDataSuccess {
    type: GETUSERDATA_SUCCESS;
    payload: {
        userData: UserData[]
    }
}

export interface GetUserDataFailure {
    type: GETUSERDATA_FAILURE;
}

export interface UpdateTask {
    type: UPDATETASK,
    payload: {
        taskData: TaskEdit
    }
}

export interface UpdateTaskSuccess {
    type: UPDATETASK_SUCCESS,
    payload: {
        createTaskStatus: number
    }
}

export interface UpdateTaskFailure {
    type: UPDATETASK_FAILURE,
    payload: {
        createTaskStatus: number
    }
}

export interface PostComment {
    type: POSTCOMMENT,
    payload: {
        requestid: number,
        comment: string
    }
}

export interface PostCommentSuccess {
    type: POSTCOMMENT_SUCCESS
}

export interface PostCommentFailure {
    type: POSTCOMMENT_FAILURE
}

export interface GetComments {
    type: GETCOMMENTS,
    payload: {
        requestId: number
    }
}

export interface GetCommentsSuccess {
    type: GETCOMMENTS_SUCCESS,
    payload:{ 
        comments: Comments[],
    }
}

export interface GetCommentsFailure {
    type: GETCOMMENTS_FAILURE
}

export type TaskManagementAction =  GetUserData |
                                    GetUserDataSuccess |
                                    GetUserDataFailure |
                                    GetTaskState |
                                    GetTaskStateSuccess |
                                    GetTaskStateFailure |
                                    SetCurrentTask |
                                    GetBIType |
                                    GetBITypeSuccess |
                                    GetBITypeFailure |
                                    GetBISentence |
                                    GetBISentenceSuccess |
                                    GetBISentenceFailure |
                                    CreateTask |
                                    CreateTaskSuccess |
                                    CreateTaskFailure |
                                    GetTaskProgress |
                                    GetTaskProgressSuccess |
                                    GetTaskProgressFailure |
                                    GetClauseType |
                                    GetClauseTypeSuccess |
                                    GetClauseTypeFailure |
                                    UpdateTask |
                                    UpdateTaskSuccess |
                                    UpdateTaskFailure |
                                    PostComment |
                                    PostCommentSuccess |
                                    PostCommentFailure |
                                    GetComments |
                                    GetCommentsSuccess |
                                    GetCommentsFailure;
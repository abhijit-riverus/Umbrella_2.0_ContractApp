import { GetTaskStateFailure, GetTaskStateSuccess, GetTaskState, GETTASKSTATE, 
    GETTASKSTATE_SUCCESS, GETUSERDATA, GetUserData, GetUserDataFailure, GetUserDataSuccess,
     GETUSERDATA_FAILURE, GETUSERDATA_SUCCESS, GETTASKSTATE_FAILURE, SetCurrentTask, SETCURRENTTASK,
      GETBISENTENCE, GETBITYPE, GetBISentenceSuccess, GetBIType, GetBITypeSuccess, GETBITYPE_SUCCESS, GetBITypeFailure, 
      GETBITYPE_FAILURE, GetBISentenceFailure, GETBISENTENCE_FAILURE, GETBISENTENCE_SUCCESS, GetBISentence, CreateTask, CREATETASK, 
      CreateTaskSuccess, CREATETASK_SUCCESS, CREATETASK_FAILURE, CreateTaskFailure, 
      GETTASKPROGRESS, GETTASKPROGRESS_FAILURE, GETTASKPROGRESS_SUCCESS, 
      GetTaskProgressFailure, GetTaskProgressSuccess, GetTaskProgress, GetClauseType, GETCLAUSETYPE, GetClauseTypeSuccess, GetClauseTypeFailure, GETCLAUSETYPE_SUCCESS, GETCLAUSETYPE_FAILURE, UpdateTask, UPDATETASK, UpdateTaskSuccess, UPDATETASK_SUCCESS, UpdateTaskFailure, UPDATETASK_FAILURE, PostComment, POSTCOMMENT, PostCommentSuccess, POSTCOMMENT_SUCCESS, PostCommentFailure, POSTCOMMENT_FAILURE, GetComments, GETCOMMENTS, GetCommentsSuccess, GETCOMMENTS_SUCCESS, GetCommentsFailure, GETCOMMENTS_FAILURE } from "../Action/def";
import { UserData, TaskState, BISentence, BIType, TaskData, ClauseType, TaskEdit, Comments } from "../State/taskManagementState";

export default class TaskManagementActionGenerator {

    public static createTaskFailure(createTaskStatus: number): CreateTaskFailure {
        return {
            type: CREATETASK_FAILURE,
            payload: {
                createTaskStatus: createTaskStatus
            }
        }
    }
    
    public static createTaskSuccess(createTaskStatus: number): CreateTaskSuccess {
        return {
            type: CREATETASK_SUCCESS,
            payload: {
                createTaskStatus: createTaskStatus
            }
        }
    }

    public static createTask(taskData: TaskData): CreateTask {
        return {
            type: CREATETASK,
            payload: {
                taskData: taskData
            }
        }
    } 

    public static getBISentenceSuccess(bi: BISentence): GetBISentenceSuccess {
        return {
            type: GETBISENTENCE_SUCCESS,
            payload: {
                bi: bi
            }
        }
    }

    public static getBISentenceFailure(): GetBISentenceFailure {
        return {
            type: GETBISENTENCE_FAILURE
        }
    }

    public static getClauseType(): GetClauseType{
        return {
            type: GETCLAUSETYPE
        }
    }

    public static getClauseTypeSuccess(clauseType: ClauseType[]): GetClauseTypeSuccess{
        return {
            type: GETCLAUSETYPE_SUCCESS,
            payload: {
                clauseType: clauseType
            }
        }
    }

    public static getClauseTypeFailure(): GetClauseTypeFailure{
        return {
            type: GETCLAUSETYPE_FAILURE
        }
    }

    public static getBITypeFailure(): GetBITypeFailure {
        return {
            type: GETBITYPE_FAILURE
        }
    }

    public static getBITypeSuccess(bi: BIType[]): GetBITypeSuccess {
        return {
            type: GETBITYPE_SUCCESS,
            payload: {
                bi: bi
            }
        }
    }

    public static getBIType(clauseName: string): GetBIType {
        return {
            type: GETBITYPE,
            payload: {
                clauseName: clauseName
            }
        }
    }

    public static getBISentence(fileID: number, biColumnName: string): GetBISentence {
        return {
            type: GETBISENTENCE,
            payload: {
                fileID: fileID,
                biColumnName: biColumnName
            }
        }
    }

    public static setCurrentTask(name: string, value: string, contractName: string): SetCurrentTask {
        return {
            type: SETCURRENTTASK,
            payload: {
                name: name,
                value: value,
                contractName: contractName
            }
        }
    }

    public static getTaskStateFailure(): GetTaskStateFailure {
        return {
            type: GETTASKSTATE_FAILURE
        }

    }

    public static getTaskStateSuccess(taskState: TaskState[]): GetTaskStateSuccess {
        return {
            type: GETTASKSTATE_SUCCESS,
            payload: {
                taskState: taskState
            }
        };
    }

    public static getTaskState(): GetTaskState {
        return {
            type: GETTASKSTATE
        }
    }

    public static getTaskProgressFailure(): GetTaskProgressFailure {
        return {
            type: GETTASKPROGRESS_FAILURE
        }

    }

    public static getTaskProgressSuccess(taskProgress: TaskState[]): GetTaskProgressSuccess {
        return {
            type: GETTASKPROGRESS_SUCCESS,
            payload: {
                taskProgress: taskProgress
            }
        };
    }

    public static getTaskProgress(): GetTaskProgress {
        return {
            type: GETTASKPROGRESS
        }
    }
    
    public static getUserData(): GetUserData {
        return {
            type: GETUSERDATA
        }
    }

    public static getUserDataSuccess(userData: UserData[]): GetUserDataSuccess {
        return {
            type: GETUSERDATA_SUCCESS,
            payload: {
                userData: userData
            }
        };
    }

    public static getUserDataFailure(): GetUserDataFailure {
        return {
            type: GETUSERDATA_FAILURE
        };
    }

    public static updateTaskData(taskData: TaskEdit): UpdateTask {
        return {
            type: UPDATETASK,
            payload: {
                taskData: taskData
            }
        }
    }

    public static updateTaskDataSuccess(createTaskStatus: number): UpdateTaskSuccess {
        return {
            type: UPDATETASK_SUCCESS,
            payload: {
                createTaskStatus: createTaskStatus
            }
        }
    }

    public static updateTaskDataFailure(createTaskStatus: number): UpdateTaskFailure {
        return {
            type: UPDATETASK_FAILURE,
            payload: {
                createTaskStatus: createTaskStatus
            }
        }
    }

    public static postComment(requestid: number, comment: string): PostComment {
        return {
            type: POSTCOMMENT,
            payload: {
                requestid: requestid,
                comment: comment
            }
        }
    }

    public static postCommentSuccess(): PostCommentSuccess {
        return {
            type: POSTCOMMENT_SUCCESS
        }
    }

    public static postCommentFailure(): PostCommentFailure {
        return {
            type: POSTCOMMENT_FAILURE
        }
    }

    public static getComments(requestId: number): GetComments {
        return {
            type: GETCOMMENTS,
            payload: {
                requestId: requestId
            }
        }
    }

    public static getCommentsSuccess(comments: Comments[]): GetCommentsSuccess {
        return {
            type: GETCOMMENTS_SUCCESS,
            payload: {
                comments: comments
            }
        }
    }

    public static getCommentsFailure(): GetCommentsFailure {
        return{
            type: GETCOMMENTS_FAILURE
        }
    }
}
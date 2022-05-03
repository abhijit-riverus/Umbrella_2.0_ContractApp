import { actionChannel } from "redux-saga/effects";
import TaskManagementState, { defaultTaskManagementState, CurrentTask, BIType, BISentence, ClauseType } from "../State/taskManagementState";
import { TaskManagementAction, GETUSERDATA, GETUSERDATA_SUCCESS, 
    GETTASKSTATE, GETTASKSTATE_SUCCESS, GETBITYPE, GETBITYPE_SUCCESS,
GETBISENTENCE, GETBISENTENCE_SUCCESS, CREATETASK, CREATETASK_SUCCESS,
GETTASKPROGRESS_SUCCESS, GETTASKPROGRESS, CREATETASK_FAILURE,
GETCLAUSETYPE, GETCLAUSETYPE_SUCCESS, UPDATETASK, UPDATETASK_SUCCESS, UPDATETASK_FAILURE, POSTCOMMENT, POSTCOMMENT_SUCCESS, POSTCOMMENT_FAILURE, GETCOMMENTS, GETCOMMENTS_SUCCESS, GETCOMMENTS_FAILURE } from "../Action/def";
import { SETCURRENTTASK } from "../Action/def";

export default function taskManagementReducer(state: TaskManagementState = defaultTaskManagementState(), action: TaskManagementAction): TaskManagementState {

    switch(action.type) {
        case CREATETASK_FAILURE: {
            return {...state, createTaskSuccess: 0, createTaskStatus: action.payload.createTaskStatus}
        }
        case CREATETASK_SUCCESS: {
            return {...state, createTaskSuccess: 1, createTaskStatus: action.payload.createTaskStatus}
        }
        case CREATETASK: {
            return state
        }
        case GETBISENTENCE_SUCCESS: {
            let biText: BISentence = action.payload.bi;
            return {...state, biSentence: biText, biTextLoader: false}
        }
        case GETBISENTENCE: {
            return { ...state, biTextLoader: true}
        }
        case GETBITYPE_SUCCESS: {
            let biType: BIType[] = action.payload.bi;
            return {...state, biType: biType, biTypeLoader: false}
        }
        case GETBITYPE: {
            return {...state, biTypeLoader: true}
        }
        case GETCLAUSETYPE_SUCCESS: {
            let clauseType: ClauseType[] = action.payload.clauseType;
            return {...state, clauseType: clauseType}
        }
        case GETCLAUSETYPE: {
            return state
        }
        case SETCURRENTTASK: {
            let ct: CurrentTask = {
                name: action.payload.name,
                value: action.payload.value,
                contractName: action.payload.contractName
            }
            return {...state, currentTask: ct}
        }
        case GETUSERDATA: {
            return state
        }
        case GETUSERDATA_SUCCESS: {
            return {...state, userData: action.payload.userData}
        }
        case GETTASKSTATE: {
            return state
        }
        case GETTASKSTATE_SUCCESS: {
            return {...state, taskState: action.payload.taskState}
        }
        case GETTASKPROGRESS: {
            return state
        }
        case GETTASKPROGRESS_SUCCESS: {
            return {...state, taskProgress: action.payload.taskProgress}
        }
        case UPDATETASK: {
            return state
        }
        case UPDATETASK_SUCCESS: {
            return {...state, createTaskSuccess: 1, createTaskStatus: action.payload.createTaskStatus}
        }
        case UPDATETASK_FAILURE: {
            return {...state, createTaskSuccess: 0, createTaskStatus: action.payload.createTaskStatus}
        }
        case POSTCOMMENT: {
            return { ...state}
        }
        case POSTCOMMENT_SUCCESS: {
            return { ...state}
        }
        case POSTCOMMENT_FAILURE: {
            return { ...state}
        }
        case GETCOMMENTS: {
            return { ...state, commentLoader: true}
        }
        case GETCOMMENTS_SUCCESS: {
            return { ...state, comments: action.payload.comments, commentLoader: false}
        }
        case GETCOMMENTS_FAILURE: {
            return { ...state, commentLoader: false}
        }
        default: return state;
    }

}
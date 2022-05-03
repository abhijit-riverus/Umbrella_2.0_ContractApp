import { TaskManagementPageActions } from "../Actions/def";
import { UpdateProgress } from "../Component/ListView/listViewTable";
import TaskManagementPageState, { AllTasksData, defaultTaskManagementPageState, ProgressUpdated } from "../State/taskManagementPageState";

export default function taskManagementPageReducer(state: TaskManagementPageState = defaultTaskManagementPageState(), action: TaskManagementPageActions) : TaskManagementPageState {
    switch(action.type){
        case 'GETALLTASKSDATA':{
            return{...state, loader: true}
        }
        case 'GETALLTASKSDATA_SUCCESS':{
            return{...state, allTasksData: action.payload.allTasksData, loader: false}
        }
        case 'GETALLTASKSDATA_FAILURE': {
            return{...state, loader: false}
        }
        case 'GETLASTUPDATEDON':{
            return{...state, lastUpdatedOnLoader: true}
        }
        case 'GETLASTUPDATEDON_SUCCESS': {
            return{ ...state, lastUpdate: action.payload.lastUpdate, lastUpdatedOnLoader: false}
        }
        case 'GETLASTUPDATEDON_FAILURE': {
            return{ ...state, lastUpdatedOnLoader: false }
        }
        case 'GETPROGRESSNAMELIST': {
            return { ...state }
        }
        case 'GETPROGRESSNAMELIST_SUCCESS': {
            return { ...state, progressNameList: action.payload.progressNameList }
        }
        case 'GETPROGRESSNAMELIST_FAILURE': {
            return { ...state }
        }
        case 'UPDATEPROGRESS': {
            return { ...state, isProgressUpdated: -1 }
        }
        case 'UPDATEPROGRESS_SUCCESS': {
            let progressObj: ProgressUpdated ={
                requestID: action.payload.requestID,
                progressID: action.payload.progressID
            }
            let temp: ProgressUpdated[] = [...state.updatedProgressQueue];
            temp.push(progressObj);

            let tempAlltaskData: AllTasksData[] = [...state.allTasksData];
            const itemsIndex = tempAlltaskData.findIndex(item => item.requestID == action.payload.requestID );
            tempAlltaskData[itemsIndex] = {...tempAlltaskData[itemsIndex], progressID: action.payload.progressID, progressName: state.progressNameList[state.progressNameList.findIndex( i => i.id === action.payload.progressID.toString())].name};

            return {...state, isProgressUpdated: action.payload.isProgressUpdated, updatedProgressQueue: temp, loader: false, allTasksData: tempAlltaskData  }
        }
        case 'UPDATEPROGRESS_FAILURE': {
            return { ...state, isProgressUpdated: action.payload.isProgressUpdated }
        }
        case 'GETTASKCOUNT': {
            return{ ...state, taskCountLoader: true}
        }
        case 'GETTASKCOUNT_SUCCESS' : {
            return { ...state, taskCount: action.payload.taskCount, taskCountLoader: false}
        }
        case 'GETTASKCOUNT_FAILURE': {
            return { ...state, taskCountLoader: false}
        }
        case 'RESETTUPDATEDPROGRESSQUEUE': {
            return { ...state, updatedProgressQueue: action.payload.progressUpdated }
        }
        default:{
            return state;
        }
    }
}
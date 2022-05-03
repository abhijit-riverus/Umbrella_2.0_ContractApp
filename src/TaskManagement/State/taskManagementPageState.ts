import { CheckList } from "../../UniversalComponents/Modals/TaskManagementModal/State/taskManagementState";

export default interface TaskManagementPageState {
    allTasksData : AllTasksData[];
    loader: boolean;
    lastUpdate: string;
    progressNameList: ProgressNameList[];
    isProgressUpdated: number;
    taskCount: TaskCount;
    lastUpdatedOnLoader: boolean;
    taskCountLoader: boolean;
    updatedProgressQueue: ProgressUpdated[];
}

export interface ProgressNameList {
    id: string;
    name: string;
}

export interface ProgressUpdated {
    requestID: number,
    progressID: number
}

export interface TaskCount {
    allTaskCount: number;
    myTaskCount: number;
}

export interface AllTasksData {
    requestID: number;
    taskTitle: string;
    description: string;
    clauseName: string;
    clauseAlias: string;
    biType: string;
    biColumnName: string;
    progressID: number;
    progressName: string;
    stateName: string;
    dueDate: string;
    contractID: number;
    linkedText: string;
    contractName: string;
    associateGroup: AssociateGroup[];
    reminder: Reminder;
    checkList: CheckList[];
}

export interface AssociateGroup {
    profileID: number;
    name: string;
    hexCode: string;
    aliasName: string;
    email: string;
    hexID: number;
}

export interface Reminder {
    reminderStart: number;
    reminderStartType: string;
    reminderType: string;
    reminderUntil: string;
    frequencyType: string;
}

export function defaultTaskManagementPageState() : TaskManagementPageState {
    return{
        allTasksData : [],
        loader: false,
        lastUpdate: '',
        progressNameList: [],
        isProgressUpdated: -2,
        taskCount: {
            allTaskCount: 0,
            myTaskCount: 0
        },
        lastUpdatedOnLoader: false,
        taskCountLoader: false,
        updatedProgressQueue: []
    }

}
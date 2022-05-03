import { User } from "../../../HeimdallChild/HeimdallUtil/heimdallUtil";

export default interface TaskManagementState {
    taskData: TaskData,
    userData: UserData[],
    taskState: TaskState[],
    taskProgress: TaskState[],
    currentTask: CurrentTask,
    biType: BIType[],
    biSentence: BISentence,
    clauseType: ClauseType[],
    createTaskStatus: number,
    createTaskSuccess: number,
    biTypeLoader: boolean,
    biTextLoader: boolean,
    comments: Comments[],
    commentLoader: boolean,
}

export interface UserData {
    id: number,
    name: string,
    email: string,
    aliasName: string;
    hexID: string;
    code: string;
}

export interface TaskData {
    title: string,
    description: string;
    activityGroup: number[],
    dueDate: string,
    progressID: number
    reminder: Reminder,
    link: TaskLink,
    checkList: CheckList[],
}

export interface TaskEdit {
    requestID: number,
    title: string,
    description: string,
    activityGroup: number[],
    dueDate: string,
    progressID: string
    reminder: Reminder,
    link: TaskLink,
    checkList: CheckList[],
}

export interface CheckList {
    id: number;
    title: string;
    flag: boolean;
    delete: boolean;
}

export interface Reminder {
    reminderType: string,
    reminderStart: number,
    reminderStartType: string,
    reminderUntil: string,
    frequencyType: string
}

export interface TaskLink {
    fileID: number,
    clauseType: string,
    biType: string,
    linkedTableID: number,
    linkedText: string
}

export interface TaskState {
    id: number,
    name: string
}

export interface CurrentTask {
    name: string,
    value: string,
    contractName: string
}

export interface BIType {
    id: number,
    biType: string,
    columnName: string
}

export interface BISentence {
    sentences: string[]
}

export interface ClauseType {
    id: number,
    name: string
}

export interface Comments {
    comment: string;
    commentTime: Date;
    name: string;
    aliasName: string;
    hexID: string;
}

export function defaultTaskManagementState(): TaskManagementState {
    return {
        taskData: {
            title: '',
            description: '',
            activityGroup: [],
            dueDate: '',
            progressID: 0,
            reminder: {
                reminderType: '',
                reminderStart: 0,
                reminderStartType: '',
                reminderUntil: '',
                frequencyType: ''
            },
            link: {
                fileID: 0,
                clauseType: '',
                biType: '',
                linkedTableID: 0,
                linkedText: ''
            },
            checkList: []
        },
        userData: [],
        taskState: [],
        taskProgress: [],
        currentTask: {
            name: '',
            value: '',
            contractName: ''
        },
        biType: [],
        clauseType: [],
        biSentence: {
            sentences: []
        },
        createTaskSuccess: -1,
        createTaskStatus: 0,
        biTypeLoader: false,
        biTextLoader: false,
        comments: [],
        commentLoader: false
    }
}
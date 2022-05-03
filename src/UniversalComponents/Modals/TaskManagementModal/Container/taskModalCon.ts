import { connect } from "react-redux";
import { StoreTree } from "../../../../Utils/MainReducer/mainReducer";
import TaskManagementActionGenerator from "../Action/gen";
import TaskModal from '../Component/taskModal';
import { TaskData, TaskEdit } from "../State/taskManagementState";


export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        userData: appState.taskManagement.userData,
        taskData: appState.taskManagement.taskData,
        taskState: appState.taskManagement.taskState,
        taskProgress: appState.taskManagement.taskProgress,
        insightsData: appState.document.insightsData,
        currentTask: appState.taskManagement.currentTask,
        biType: appState.taskManagement.biType,
        biSentence: appState.taskManagement.biSentence,
        clauseType: appState.taskManagement.clauseType,
        createTaskStatus: appState.taskManagement.createTaskStatus,
        biTypeLoader: appState.taskManagement.biTypeLoader,
        biTextLoader: appState.taskManagement.biTextLoader,
        comments: appState.taskManagement.comments,
        commentLoader: appState.taskManagement.commentLoader
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getUserData: () => dispatch(TaskManagementActionGenerator.getUserData()),
        getTaskState: () => dispatch(TaskManagementActionGenerator.getTaskState()),
        getTaskProgress: () => dispatch(TaskManagementActionGenerator.getTaskProgress()),
        getBIType: (clauseType: string) => dispatch(TaskManagementActionGenerator.getBIType(clauseType)),
        getBISentence: (fileiID: number, biColumnName: string) => dispatch(TaskManagementActionGenerator.getBISentence(fileiID, biColumnName)),
        createTask: (taskData: TaskData) => dispatch(TaskManagementActionGenerator.createTask(taskData)),
        updateTask: (taskData: TaskEdit) => dispatch(TaskManagementActionGenerator.updateTaskData(taskData)),
        postComment: (requestid: number, comment: string) => dispatch(TaskManagementActionGenerator.postComment(requestid, comment)),
        getComments: (requestId: number) => dispatch(TaskManagementActionGenerator.getComments(requestId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal)
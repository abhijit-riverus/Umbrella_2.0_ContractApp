import { connect } from "react-redux";
import AppActionGenerator from "../../App/Actions/actionGen";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import TaskManagementPageActionGenerator from "../Actions/gen";
import TaskManagement from "../Component/taskManagement";
import { ProgressUpdated } from "../State/taskManagementPageState";

export function mapStateToProps(appState: StoreTree, ownProps: any){
    return{
        allTasksData: appState.taskManagementPage.allTasksData,
        lastUpdate: appState.taskManagementPage.lastUpdate,
        progressNameList: appState.taskManagementPage.progressNameList,
        isProgressUpdated: appState.taskManagementPage.isProgressUpdated,
        loader: appState.taskManagementPage.loader,
        taskCount: appState.taskManagementPage.taskCount,
        lastUpdatedOnLoader: appState.taskManagementPage.lastUpdatedOnLoader,
        taskCountLoader: appState.taskManagementPage.taskCountLoader,
        updatedProgressQueue: appState.taskManagementPage.updatedProgressQueue
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any){
    return{
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        getAllTasksData: (fileID: number,requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string) => dispatch(TaskManagementPageActionGenerator.getAllTasksData(fileID, requestID, sort, order, selfAssigned, clauseType)),
        getLastUpdatedOn: (selfAssigned: boolean) => dispatch(TaskManagementPageActionGenerator.getLastUpdatedOn(selfAssigned)),
        getProgressNameList: () => dispatch(TaskManagementPageActionGenerator.getProgressNameList()),
        updateProgress: (requestID: number, progressID: number) => dispatch(TaskManagementPageActionGenerator.updateProgress(requestID, progressID)),
        getTaskCount: () => dispatch(TaskManagementPageActionGenerator.getTaskCount()),
        resetUpdatedProgressQueue: (progressUpdated: ProgressUpdated[]) => dispatch(TaskManagementPageActionGenerator.resetUpdatedProgressQueue(progressUpdated)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskManagement);


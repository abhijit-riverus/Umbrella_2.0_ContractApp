import { connect } from "react-redux";
import DocumentView from "../Component/documentView";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import DocumentActionGenerator from "../Actions/Gen";
import TaskActionGenerator from "../../UniversalComponents/Modals/TaskManagementModal/Action/gen";
import AppActionGenerator from "../../App/Actions/actionGen";
import { BiPointDataMode } from "../State/documentState";
import TaskManagementPageActionGenerator from "../../TaskManagement/Actions/gen";
import TaskManagementActionGenerator from "../../UniversalComponents/Modals/TaskManagementModal/Action/gen";
import { FileHierarchy } from "../../DocumentLibrary/State/documentLibraryState";
import ClauseLibraryActionGenerator from "../../ClauseLibrary/Actions/gen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        sentenceData: appState.document.sentenceData,
        insightsData: appState.document.insightsData,
        sentenceLoader: appState.document.sentenceLoader,
        editLoader: appState.document.editLoader,
        storedBiPointDataModes: appState.document.storedBiPointDataModes,
        currentTask: appState.taskManagement.currentTask,
        allTasksData: appState.taskManagementPage.allTasksData,
        progressNameList: appState.taskManagementPage.progressNameList,
        isProgressUpdated: appState.taskManagementPage.isProgressUpdated,
        taskLoader: appState.taskManagementPage.loader,
        createTaskSuccess: appState.taskManagement.createTaskSuccess,
        documentTree: appState.document.documentTree,
        clauseModeStatus: appState.document.clauseModeStatus,
        taskProgress: appState.taskManagement.taskProgress,
        durationList: appState.document.durationList,
        currencyList: appState.document.currencyList
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getSentences: (fileId: number) => dispatch(DocumentActionGenerator.getSentences(fileId)),
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        getInsights: (fileId: number) => dispatch(DocumentActionGenerator.getInsights(fileId)),
        saveBiPointDataMode: (storedBiPointDataModes: BiPointDataMode[]) => dispatch(DocumentActionGenerator.saveBiPointDataMode(storedBiPointDataModes)),
        setCurrentTask: (name: string, value: string, contractName: string) => dispatch(TaskActionGenerator.setCurrentTask(name, value, contractName)),
        getAllTasksData: (fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string) => dispatch(TaskManagementPageActionGenerator.getAllTasksData(fileID, requestID, sort, order, selfAssigned, clauseType)),
        getProgressNameList: () => dispatch(TaskManagementPageActionGenerator.getProgressNameList()),
        updateProgress: (requestID: number, progressID: number) => dispatch(TaskManagementPageActionGenerator.updateProgress(requestID, progressID)),
        getClauseType: () => dispatch(TaskManagementActionGenerator.getClauseType()),
        getDocumentTree: (fileID: number) => dispatch(DocumentActionGenerator.getDocumentTree(fileID)),
        saveDocumentTree: (documentTree: FileHierarchy) =>dispatch(DocumentActionGenerator.saveDocumentTree(documentTree)),
        saveClauseModeStatus: (clauseModeStatus: boolean) => dispatch(DocumentActionGenerator.saveClauseModeStatus(clauseModeStatus)),
        getFolderHeading: () => dispatch(ClauseLibraryActionGenerator.getFolderHeading()),
        editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number| null) => dispatch(DocumentActionGenerator.editDataPoint(fileId, dataType, dataPointName, highlightedId)),
        saveInsightToDelete: (insightToDelete: any, childLabelToDelete: string) => dispatch(DocumentActionGenerator.saveInsightToDelete(insightToDelete, childLabelToDelete)),
        getDurationTypes: () => dispatch(DocumentActionGenerator.getDurationTypes()),
        getCurrencyTypes: () => dispatch(DocumentActionGenerator.getCurrencyTypes())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
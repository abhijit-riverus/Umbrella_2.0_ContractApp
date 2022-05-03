import { combineReducers } from "redux";
import HeimdallState from "../../UniversalComponents/HeimdallChild/State/heimdallState";
import HeimdallReducer from "../../UniversalComponents/HeimdallChild/Reducer/heimdallReducer";
// import reactNotificationReducer from '../../UniversalComponents/ReactNotificationChild/Reducer/ReactNotificationReducer'
// import ReactNotificationState from "../../UniversalComponents/ReactNotificationChild/State/reactNotificationState";
import uploadReducer from "../../Upload/Reducer/uploadRed";
import UploadState from "../../Upload/State/uploadState";
import DocumentState from "../../DocumentView/State/documentState";
import documentReducer from "../../DocumentView/Reducer/documentRed";
import AppState from "../../App/State/appState";
import appReducer from "../../App/Reducer/appReducer";
import SearchBarState from "../../UniversalComponents/SearchBar/State/searchBarState";
import SearchBarReducer from "../../UniversalComponents/SearchBar/Reducer/red";
import SearchState from "../../Search/State/SearchState";
import searchReducer from "../../Search/Reducer/SearchRed";
import SearchModuleState from "../../SearchModule/State/searchModuleState";
import searchModuleReducer from "../../SearchModule/Reducer/searchModuleRed";
import historyReducer from "../../History/Reducer/historyRed";
import HistoryState from "../../History/State/historyState";
import analysisReducer from "../../Analysis/Reducer/red";
import AnalysisState from "../../Analysis/State/analysisState";
import DashboardState from "../../Dashboard/State/dashboardState";
import dashboardReducer from "../../Dashboard/Reducer/dashboardRed";
import aggregatesReducer from "../../Aggregates/Reducer/AggregatesRed";
import FilterModule from "../../Aggregates/State/AggregatesState";

import TaskManagementState from "../../UniversalComponents/Modals/TaskManagementModal/State/taskManagementState";
import taskManagementReducer from "../../UniversalComponents/Modals/TaskManagementModal/Reducer/taskManagementRed";

import DocumentLibraryState from "../../DocumentLibrary/State/documentLibraryState";
import documentLibraryReducer from "../../DocumentLibrary/Reducer/documentLibraryRed";
import ReportsState from "../../Reports/State/reportsState";
import reportsReducer from "../../Reports/Reducer/reportsReducer";
import TaskManagementPageState from "../../TaskManagement/State/taskManagementPageState";
import taskManagementPageReducer from "../../TaskManagement/Reducer/taskManagementPageRed";
import ClauseLibraryState from "../../ClauseLibrary/State/clauseLibraryState";
import clauseLibraryReducer from "../../ClauseLibrary/Reducer/clauseLibraryRed";

import NotificationState from "../../UniversalComponents/Notification/State/notificationState";
import notificationReducer from "../../UniversalComponents/Notification/Reducer/notificationRed";
import NewAnalysisState from "../../NewAnalysis/State/newAnalysisState";
import newAnalysisReducer from "../../NewAnalysis/Reducer/newAnalysisReducer";
import NewDashboardState from "../../NewDashboard/State/newDashboardState";
import newDashboardReducer from "../../NewDashboard/Reducer/newDashboardReducer";

export interface StoreTree {
    heimdall: HeimdallState;
    aggregates: FilterModule;
    upload: UploadState;
    document: DocumentState;
    app: AppState;
    searchBar: SearchBarState;
    search: SearchState;
    searchModule: SearchModuleState;
    historyModule: HistoryState;
    analysis: AnalysisState;
    dashboard: DashboardState;
    taskManagement: TaskManagementState;
    library: DocumentLibraryState;
    reports: ReportsState;
    taskManagementPage: TaskManagementPageState;
    clauseLibrary: ClauseLibraryState;
    notification: NotificationState;
    newAnalysis: NewAnalysisState;
    newDashboard: NewDashboardState;
}

export const mainReducer = combineReducers({
    heimdall: HeimdallReducer,
    aggregates: aggregatesReducer,
    upload: uploadReducer,
    document: documentReducer,
    app: appReducer,
    searchBar: SearchBarReducer,
    search: searchReducer,
    searchModule: searchModuleReducer,
    historyModule: historyReducer,
    analysis: analysisReducer,
    dashboard: dashboardReducer,
    library: documentLibraryReducer,
    reports: reportsReducer,
    taskManagement: taskManagementReducer,
    taskManagementPage: taskManagementPageReducer,
    clauseLibrary: clauseLibraryReducer,
    notification: notificationReducer,
    newAnalysis: newAnalysisReducer,
    newDashboard: newDashboardReducer
})
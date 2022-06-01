import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import Dashboard from "../Component/dashboard";
import AppActionGenerator from "../../App/Actions/actionGen";
import DashboardActionGenerator from "../Actions/gen";
import HistoryActionGenerator from "../../History/Actions/gen";
import { DashboardFilterStructure } from "../State/dashboardState";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
  return {
    initialFileIds: appState.dashboard.initialFileIds,
    jurisdictionData: appState.dashboard.jurisdictionData,
    uploadedByData: appState.dashboard.uploadedByData,
    contractTypeData: appState.dashboard.contractTypeData,
    dashboardTableData: appState.dashboard.dashboardTableData,
    jurisdictionLoader: appState.dashboard.jurisdictionLoader,
    uploadedByLoader: appState.dashboard.uploadedByLoader,
    contractTypeLoader: appState.dashboard.contractTypeLoader,
    dashboardTableLoader: appState.dashboard.dashboardTableLoader,
    filteredFileIds: appState.dashboard.filteredFileIds,
    savedFilters: appState.dashboard.savedFilters,
    dashboardLoader: appState.dashboard.dashboardLoader,
  };
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
  return {
    pageWatcher: (page: string) =>
      dispatch(AppActionGenerator.pageWatcher(page)),
    getJurisdiction: (fileIds: number[]) =>
      dispatch(DashboardActionGenerator.getJurisdiction(fileIds)),
    getUploadedBy: (fileIds: number[]) =>
      dispatch(DashboardActionGenerator.getUploadedBy(fileIds)),
    getContractType: (fileIds: number[]) =>
      dispatch(DashboardActionGenerator.getContractType(fileIds)),
    getTableData: (fileIds: number[]) =>
      dispatch(DashboardActionGenerator.getTableData(fileIds)),
    getDashboardFileId: () =>
      dispatch(DashboardActionGenerator.getDashboardFileId()),
    saveDeleteDetails: (documentName: string, uniqueFileId: string) =>
      dispatch(
        HistoryActionGenerator.saveDeleteDetails(documentName, uniqueFileId)
      ),
    applyDashboardFilter: (
      fileIds: number[],
      filterStructure: DashboardFilterStructure[]
    ) =>
      dispatch(
        DashboardActionGenerator.applyDashboardFilter(fileIds, filterStructure)
      ),
    saveDashboardFilters: (savedFilters: string[]) =>
      dispatch(DashboardActionGenerator.savedDashboardFilters(savedFilters)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import { connect } from "react-redux";
import AnalysisActionGenerator from "../../Analysis/Actions/gen";
import AppActionGenerator from "../../App/Actions/actionGen";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import ReportsActionGenerator from "../Actions/Gen";
import Reports from "../Component/reports";

export function mapStateToProps(appState: StoreTree, ownProps: any){
    return {
        reportsTableData: appState.reports.reportsTableData,
        deleteSuccess: appState.reports.deleteSuccess,
        reportsTableLoader: appState.reports.reportsTableLoader,
        savedConfigurationData: appState.reports.savedConfigurationData,
        reportSortBy: appState.reports.reportSortBy,
        reportSortOrder: appState.reports.reportSortOrder,
        deleteSavedConfigStatus: appState.reports.deleteSavedConfigStatus,
        deleteSavedConfigId: appState.reports.deleteSavedConfigId,
        deleteSavedConfigName: appState.reports.deleteSavedConfigName
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any){
return{
    pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
    getAllReportsData: (sort: string, order: string) => dispatch(ReportsActionGenerator.getAllReportsData(sort, order)),
    generateReportSuccess: (csvLink: string) => dispatch(AnalysisActionGenerator.generateReportSuccess(csvLink)),
    generateReportFailure: () => dispatch(AnalysisActionGenerator.generateReportFailure()),
    saveDeleteReportDetails: (reportName: string, uniqueReportId: number) => dispatch(ReportsActionGenerator.saveDeleteReportDetails(reportName, uniqueReportId)),
    getSavedConfigurationData: (sortBy: string, sortOrder: string) => dispatch(ReportsActionGenerator.getSavedConfigurationData(sortBy, sortOrder)),
    deleteSavedConfiguration: (id: number, sortBy: string, sortOrder: string) => dispatch(ReportsActionGenerator.deleteSavedConfiguration(id, sortBy, sortOrder)),
    saveDeleteSavedConfigDetails: ( savedConfigId: number, savedConfigName: string) => dispatch(ReportsActionGenerator.saveDeleteSavedConfigDetails(savedConfigId, savedConfigName))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
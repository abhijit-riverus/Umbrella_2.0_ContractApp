import { connect } from "react-redux";
import AnalysisActionGenerator from "../../../Analysis/Actions/gen";
import { AnalysisFilterStructure, FilterStructure } from "../../../Analysis/State/analysisState";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import GenerateReportModal from "./generateReportModal";

export function mapStateToProps(appState: StoreTree, ownProps: any){
    return{
        tableConfig: appState.analysis.tableConfig,
        initialFileIds: appState.analysis.initialFileIds,
        filterFileIds: appState.analysis.filterFileIds,
        csvLink: appState.analysis.csvLink,
        savedAppliedFilter: appState.analysis.savedAppliedFilter,
        saveAdvancedFilterStructure: appState.analysis.saveAdvancedFilterStructure,
        advancedFilters: appState.analysis.advancedFilter,
        savedAnalysisFiltersList: appState.analysis.savedAnalysisFiltersList,
        analysisFileIds: appState.analysis.analysisFileIds
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any){
    return{
        updatePreference: (display: boolean, columnName: string, refreshTable?: boolean) => dispatch(AnalysisActionGenerator.updatePreference(display, columnName, refreshTable)),
        generateReport: (name: string, filter: AnalysisFilterStructure[] , fileIds: number[], preference: string[]) => dispatch(AnalysisActionGenerator.generateReport(name, filter, fileIds, preference)),
        generateReportSuccess: (csvLink: string) => dispatch(AnalysisActionGenerator.generateReportSuccess(csvLink)),
        generateReportFailure: () => dispatch(AnalysisActionGenerator.generateReportFailure())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateReportModal)
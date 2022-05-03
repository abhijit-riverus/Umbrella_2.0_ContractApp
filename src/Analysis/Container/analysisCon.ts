import { connect } from "react-redux";
import Analysis from "../Component/analysis";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import AppActionGenerator from "../../App/Actions/actionGen";
import AnalysisActionGenerator from "../Actions/gen";
import { IntermediateFilterStructure } from "../../Utils/GeneralUtil/genUtils";
import { AnalysisFilterStructure, FilterStructure, LocalFilterStructure } from "../State/analysisState";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        analysisObject: appState.analysis.analysisObject,
        analysisLoader: appState.analysis.analysisLoader,
        generalFilter: appState.analysis.generalFilter,
        initialFileIds: appState.analysis.initialFileIds,
        tableConfig: appState.analysis.tableConfig,
        filterFileIds: appState.analysis.filterFileIds,
        advancedFilter: appState.analysis.advancedFilter,
        savedAppliedFilter: appState.analysis.savedAppliedFilter,
        preferenceUpdated: appState.analysis.preferenceUpdated,
        csvLink: appState.analysis.csvLink,
        refreshTable: appState.analysis.refreshTable,
        isReportSuccess: appState.analysis.isReportSuccess,
        openReportSnackbar: appState.analysis.openReportSnackbar,
        saveAdvancedFilterStructure: appState.analysis.saveAdvancedFilterStructure,
        savedAnalysisFiltersList: appState.analysis.savedAnalysisFiltersList,
        analysisFileIds: appState.analysis.analysisFileIds
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        getAnalysisFileId: () => dispatch(AnalysisActionGenerator.getAnalysisFileId()),
        getTableConfig: () => dispatch(AnalysisActionGenerator.getTableConfig()),
        getAnalysis: (initialFileIds: number[]) => dispatch(AnalysisActionGenerator.getAnalysis(initialFileIds)),
        updatePreference: (display: boolean, columnName: string, refreshTable?: boolean) => dispatch(AnalysisActionGenerator.updatePreference(display, columnName, refreshTable)),
        getGeneralFilter: (fileIds: number[]) => dispatch(AnalysisActionGenerator.getGeneralFilter(fileIds)),
        setResetFlag: (resetFlag: boolean) => dispatch(AnalysisActionGenerator.resetFlag(resetFlag)),
        applyGeneralFilter: (fileIds: number[], filterType: string) => dispatch(AnalysisActionGenerator.applyGeneralFilter(fileIds, filterType)),
        getAdvancedFilters: (fileIds: number[]) => dispatch(AnalysisActionGenerator.getAdvancedFilter(fileIds)),
        saveAppliedFilters: (auxArray: IntermediateFilterStructure[]) => dispatch(AnalysisActionGenerator.saveAppliedFilters(auxArray)),
        applyAdvancedFilters: (fileIds: number[], filterStructure: FilterStructure) => dispatch(AnalysisActionGenerator.applyAdvancedFilter(fileIds, filterStructure)),
        generateReport: (name: string, filter: AnalysisFilterStructure[], fileIds: number[], preference: string[]) => dispatch(AnalysisActionGenerator.generateReport(name, filter, fileIds, preference)),
        saveAdvancedFilterStructure: (advancedFilterStructure: FilterStructure) => dispatch(AnalysisActionGenerator.saveAdvancedFilterStructure(advancedFilterStructure)),
        generateReportFailure: () => dispatch(AnalysisActionGenerator.generateReportFailure()),
        saveAppliedFiltersList: (appliedFiltersList: LocalFilterStructure[]) => dispatch(AnalysisActionGenerator.saveAppliedFiltersList(appliedFiltersList)),
        saveAnalysisFiltersList: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => dispatch(AnalysisActionGenerator.saveAnalysisFiltersList(savedAnalysisFiltersList)),
        saveFilteredCount: (filteredCount: number) => dispatch(AnalysisActionGenerator.saveFilteredCount(filteredCount))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Analysis);
import { connect } from "react-redux";
import { StoreTree } from "../../../../Utils/MainReducer/mainReducer";
import AnalysisActionGenerator from "../../../../Analysis/Actions/gen";
import { AnalysisFilterStructure, FilterAggregateStructure, FilterStructure, LocalFilterStructure, OperatorInfo } from "../../../../Analysis/State/analysisState";
import { IntermediateFilterStructure } from "../../../../Utils/GeneralUtil/genUtils";
import AnalysisFilterModal from "../Component/analysisFilterModal";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        advancedFilters: appState.analysis.advancedFilter,
        initialFileIds: appState.analysis.initialFileIds,
        fileIds: appState.analysis.initialFileIds,
        count: appState.analysis.count,
        resetFlag: appState.analysis.resetFlag,
        filterIconClicked: ownProps.filterIconClicked,
        savedAppliedFilter: ownProps.savedAppliedFilter,
        appliedFiltersList: appState.analysis.appliedFiltersList,
        currentEditingFilterId: appState.analysis.currentEditingFilterId,
        analysisFilteredFileIds: appState.analysis.analysisFilteredFileIds,
        savedFilterConfig: appState.analysis.savedFilterConfig,
        savedFilterAggregate: appState.analysis.savedFilterAggregate,
        filteredCount: appState.analysis.filteredCount,
        savedAnalysisFiltersList: appState.analysis.savedAnalysisFiltersList,
        savedFilterClauseType: appState.analysis.savedFilterClauseType,
        savedClauseAggregate: appState.analysis.savedClauseAggregate,
        savedValueAggregate: appState.analysis.savedValueAggregate,
        savedOperatorList: appState.analysis.savedOperatorList,
        analysisFileIds: appState.analysis.analysisFileIds
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getAnalysis: (initialFileIds: number[]) => dispatch(AnalysisActionGenerator.getAnalysis(initialFileIds)),
        saveAppliedFiltersList: (appliedFiltersList: LocalFilterStructure[]) => dispatch(AnalysisActionGenerator.saveAppliedFiltersList(appliedFiltersList)),
        saveCurrentEditingFilterId: (currentEditingFilterId: number) => dispatch(AnalysisActionGenerator.saveCurrentEditingFilterId(currentEditingFilterId)),
        getAnalysisFilterConfig: () => dispatch(AnalysisActionGenerator.getAnalysisFilterConfig()),
        getFilterAggregate: (value: string, level: number, segment: string, page: string) => dispatch(AnalysisActionGenerator.getFilterAggregate(value, level, segment, page)),
        getFilteredCount: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => dispatch(AnalysisActionGenerator.getFilteredCount(savedAnalysisFiltersList)),
        applyAnalysisFilter: (sort: string, filter: AnalysisFilterStructure[]) => dispatch(AnalysisActionGenerator.applyAnalysisFilter(sort, filter)),
        saveFilterClauseType: (savedFilterClauseType: string) => dispatch(AnalysisActionGenerator.saveFilterClauseType(savedFilterClauseType)),
        saveClauseAggregate: (savedClauseAggregate: FilterAggregateStructure[]) => dispatch(AnalysisActionGenerator.saveClauseAggregate(savedClauseAggregate)),
        saveValueAggregate: (savedValueAggregate: FilterAggregateStructure[]) => dispatch(AnalysisActionGenerator.saveValueAggregate(savedValueAggregate)),
        saveOperatorList: (savedOperatorList: OperatorInfo[]) => dispatch(AnalysisActionGenerator.saveOperatorList(savedOperatorList)),
        saveAnalysisFiltersList: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => dispatch(AnalysisActionGenerator.saveAnalysisFiltersList(savedAnalysisFiltersList)),
        saveFilteredCount: (filteredCount: number) => dispatch(AnalysisActionGenerator.saveFilteredCount(filteredCount))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnalysisFilterModal);
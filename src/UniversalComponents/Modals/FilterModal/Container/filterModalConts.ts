import { connect } from "react-redux";
import { StoreTree } from "../../../../Utils/MainReducer/mainReducer";
import FilterModal from "../Component/filterModal";
import AnalysisActionGenerator from "../../../../Analysis/Actions/gen";
import { FilterStructure } from "../../../../Analysis/State/analysisState";
import { IntermediateFilterStructure } from "../../../../Utils/GeneralUtil/genUtils";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        advancedFilters: appState.analysis.advancedFilter,
        initialFileIds: appState.analysis.initialFileIds,
        // fileIds: appState.analysis.fileIds,
        fileIds: appState.analysis.initialFileIds,
        count: appState.analysis.count,
        resetFlag: appState.analysis.resetFlag,
        filterIconClicked: ownProps.filterIconClicked,
        savedAppliedFilter: ownProps.savedAppliedFilter,
        analysisFileIds: appState.analysis.analysisFileIds
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getAdvancedFilters: (fileIds: number[]) => dispatch(AnalysisActionGenerator.getAdvancedFilter(fileIds)),
        setResetFlag: (resetFlag: boolean) => dispatch(AnalysisActionGenerator.resetFlag(resetFlag)),
        saveAppliedFilters: (auxArray: IntermediateFilterStructure[]) => dispatch(AnalysisActionGenerator.saveAppliedFilters(auxArray)),
        applyAdvancedFilters: (fileIds: number[], filterStructure: FilterStructure) => dispatch(AnalysisActionGenerator.applyAdvancedFilter(fileIds, filterStructure)),
        saveAdvancedFilterStructure: (advancedFilterStructure: FilterStructure) => dispatch(AnalysisActionGenerator.saveAdvancedFilterStructure(advancedFilterStructure))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
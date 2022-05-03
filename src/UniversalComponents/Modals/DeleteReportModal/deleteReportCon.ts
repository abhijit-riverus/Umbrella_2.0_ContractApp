import { connect } from "react-redux";
import ReportsActionGenerator from "../../../Reports/Actions/Gen";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import DeleteReportModal from "./deleteReportModal";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        deleteSavedConfigStatus: appState.reports.deleteSavedConfigStatus,
        deleteSavedConfigId: appState.reports.deleteSavedConfigId,
        deleteSavedConfigName: appState.reports.deleteSavedConfigName,
        reportSortBy: appState.reports.reportSortBy,
        reportSortOrder: appState.reports.reportSortOrder,
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        deleteSavedConfiguration: (id: number, sortBy: string, sortOrder: string) => dispatch(ReportsActionGenerator.deleteSavedConfiguration(id, sortBy, sortOrder)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteReportModal);
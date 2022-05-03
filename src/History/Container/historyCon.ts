import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import AppActionGenerator from "../../App/Actions/actionGen";
import HistoryContainer from "../Component/historyContainer";
import HistoryActionGenerator from "../Actions/gen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        userUploads: appState.historyModule.userUploads,
        userName: appState.heimdall.userName,
        historyLoader: appState.historyModule.historyLoader
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getUserUploads: () => dispatch(HistoryActionGenerator.getUserUploads()),
        changeStatus: () => dispatch(HistoryActionGenerator.changeStatus()),
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        saveDeleteDetails: (documentName: string, uniqueFileId: number) => dispatch(HistoryActionGenerator.saveDeleteDetails(documentName, uniqueFileId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
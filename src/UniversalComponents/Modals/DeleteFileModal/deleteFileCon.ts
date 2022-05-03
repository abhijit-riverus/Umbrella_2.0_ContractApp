import { connect } from "react-redux";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import DeleteFileModal from "./deleteFileModal";
import HistoryActionGenerator from "../../../History/Actions/gen";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        deleteStatus: appState.historyModule.deleteStatus,
        documentName: appState.historyModule.documentName,
        fileId: appState.historyModule.uniqueFileId
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        deleteFile: (fileId: number) => dispatch(HistoryActionGenerator.deleteFile(fileId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteFileModal);
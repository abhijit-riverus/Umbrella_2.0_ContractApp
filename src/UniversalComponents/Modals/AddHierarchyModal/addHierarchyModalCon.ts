import { connect } from "react-redux";
import DocumentLibraryGenerator from "../../../DocumentLibrary/Actions/gen";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import AddHierarchyModal from "./addHierarchyModal";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        initialFileIds: appState.library.initialFileIds,
        savedMultipleSelectedFiles: appState.library.savedMultipleSelectedFiles,
        savedParentFileList: appState.library.savedParentFileList,
        savedChildrenFileList: appState.library.savedChildrenFileList
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getParentFileList: (selectedFileId: number,fileIds: number[], bulkFileIds: number[]) => dispatch(DocumentLibraryGenerator.getParentFileList(selectedFileId, fileIds, bulkFileIds)),
        addParent: (childFileIds: number[], editedParentFileId: number) => dispatch(DocumentLibraryGenerator.addParent(childFileIds, editedParentFileId)),
        getChildrenFileList: (selectedFileId: number,fileIds: number[]) => dispatch(DocumentLibraryGenerator.getChildrenFileList(selectedFileId, fileIds)),
        removeParent: (childFileIds: number[], editedParentFileId: number) => dispatch(DocumentLibraryGenerator.removeParent(childFileIds, editedParentFileId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddHierarchyModal);
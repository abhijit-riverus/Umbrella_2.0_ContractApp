import { connect } from "react-redux";
import DocumentLibraryGenerator from "../../../DocumentLibrary/Actions/gen";
import DocumentActionGenerator from "../../../DocumentView/Actions/Gen";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import AddTagModal from "./addTagModal";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        savedMultipleSelectedFiles: appState.library.savedMultipleSelectedFiles,
        tagNature: appState.document.tagNature,
        tagType: appState.document.tagType,
        otherTags: appState.document.otherTags,
        newTagData: appState.document.newTagData,
        storedOtherTags: appState.document.storedOtherTags,
        savedFileTagData: appState.library.savedFileTagData,
        initialFileIds: appState.library.initialFileIds,
        otherTagsLoader: appState.document.otherTagsLoader
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        listTagNature: () => dispatch(DocumentActionGenerator.listTagNature()),
        listTagType: () => dispatch(DocumentActionGenerator.listTagType()),
        listOtherTags: () => dispatch(DocumentActionGenerator.listOtherTags()),
        createOtherTags: (name: string) => dispatch(DocumentActionGenerator.createOtherTags(name)),
        storeOtherTags: (storedOtherTags: any) => dispatch(DocumentActionGenerator.storeOtherTags(storedOtherTags)),
        editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number| null) => dispatch(DocumentActionGenerator.editDataPoint(fileId, dataType, dataPointName, highlightedId)),
        saveHighlightedId: (highlightedId: number[] | null) => dispatch(DocumentActionGenerator.saveHighlightedId(highlightedId)),
        editTags: (editFileIds: number[], dataType: string, tagEditData: any, isBulkAction: boolean) => dispatch(DocumentLibraryGenerator.editTags(editFileIds, dataType, tagEditData,isBulkAction)),
        saveFileTagData: (savedFileTagData: any[]) => dispatch(DocumentLibraryGenerator.saveFileTagData(savedFileTagData)),
        getDocumentHierarchy: (sort: string, order: string, fileIds: number[]) => dispatch(DocumentLibraryGenerator.getDocumentHierarchy(sort, order, fileIds)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTagModal);
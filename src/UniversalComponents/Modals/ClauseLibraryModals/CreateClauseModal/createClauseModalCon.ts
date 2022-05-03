import { connect } from "react-redux";
import ClauseLibraryActionGenerator from "../../../../ClauseLibrary/Actions/gen";
import { StoreTree } from "../../../../Utils/MainReducer/mainReducer";
import CreateClauseModal from "./createClauseModal";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        folderHeadingList: appState.clauseLibrary.folderHeadingList,
        folderSubHeadingList: appState.clauseLibrary.folderSubHeadingList
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getFolderSubHeading: (parentId: number) => dispatch(ClauseLibraryActionGenerator.getFolderSubHeading(parentId)),
        createClause: (clauseName: string, extractedText: string, userText: string, clauseType: string, sourceFileId: number, folderId: number) => dispatch(ClauseLibraryActionGenerator.createClause(clauseName, extractedText, userText, clauseType, sourceFileId, folderId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateClauseModal);
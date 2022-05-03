import { connect } from "react-redux";
import ClauseLibraryActionGenerator from "../../../../ClauseLibrary/Actions/gen";
import { ClauseInfo } from "../../../../ClauseLibrary/State/clauseLibraryState";
import { StoreTree } from "../../../../Utils/MainReducer/mainReducer";
import CreateClausePageModal from "./createClausePageModal";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        folderHeadingList: appState.clauseLibrary.folderHeadingList,
        folderSubHeadingList: appState.clauseLibrary.folderSubHeadingList,
        selectedClauseData: appState.clauseLibrary.selectedClauseData
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getFolderSubHeading: (parentId: number) => dispatch(ClauseLibraryActionGenerator.getFolderSubHeading(parentId)),
        createClause: (clauseName: string, extractedText: string, userText: string, clauseType: string, sourceFileId: number, folderId: number) => dispatch(ClauseLibraryActionGenerator.createClause(clauseName, extractedText, userText, clauseType, sourceFileId, folderId)),
        editClause: (clauseId: number, clauseName: string, userText: string, clauseType: string, folderId: number) => dispatch(ClauseLibraryActionGenerator.editClause(clauseId, clauseName, userText, clauseType, folderId)),
        saveSelectedClauseData: (selectedClauseData: ClauseInfo) => dispatch(ClauseLibraryActionGenerator.saveSelectedClauseData(selectedClauseData)),
        getClausesData: (clauseIds: number[]) => dispatch(ClauseLibraryActionGenerator.getClausesData(clauseIds))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateClausePageModal);
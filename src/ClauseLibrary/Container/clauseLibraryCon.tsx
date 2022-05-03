import { connect } from "react-redux";
import AppActionGenerator from "../../App/Actions/actionGen";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import ClauseLibraryActionGenerator from "../Actions/gen";
import ClauseLibrary from "../Component/clauseLibrary";
import { ClauseInfo } from "../State/clauseLibraryState";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        collapsedFolderIds: appState.clauseLibrary.collapsedFolderIds,
        clauseLibraryData: appState.clauseLibrary.clauseLibraryData,
        selectedClauseData: appState.clauseLibrary.selectedClauseData,
        clausesData: appState.clauseLibrary.clausesData,
        clauseLibraryLoader: appState.clauseLibrary.clauseLibraryLoader 
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        saveCollapsedFolderIds: (collapsedFolderIds: number[]) => dispatch(ClauseLibraryActionGenerator.saveCollapsedFolderIds(collapsedFolderIds)),
        createFolderHeading: (folderName: string) => dispatch(ClauseLibraryActionGenerator.createFolderHeading(folderName)),
        createFolderSubHeading: (folderName: string, parentId: number) => dispatch(ClauseLibraryActionGenerator.createFolderSubHeading(folderName, parentId)),
        getFolderHeading: () => dispatch(ClauseLibraryActionGenerator.getFolderHeading()),
        saveSelectedClauseData: (selectedClauseData: ClauseInfo) => dispatch(ClauseLibraryActionGenerator.saveSelectedClauseData(selectedClauseData)),
        getFolderSubHeading: (parentId: number) => dispatch(ClauseLibraryActionGenerator.getFolderSubHeading(parentId)),
        deleteFolder: (folderId: number) => dispatch(ClauseLibraryActionGenerator.deleteFolder(folderId)),
        deleteClause: (clauseId:number) => dispatch(ClauseLibraryActionGenerator.deleteClause(clauseId)),
        getClauseLibraryData: () => dispatch(ClauseLibraryActionGenerator.getClauseLibraryData()),
        getClausesData: (clauseIds: number[]) => dispatch(ClauseLibraryActionGenerator.getClausesData(clauseIds))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClauseLibrary);
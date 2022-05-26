import { connect } from "react-redux";
import AppActionGenerator from "../../App/Actions/actionGen";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import DocumentLibraryGenerator from "../Actions/gen";
import DocumentLibrary from "../Component/documentLibrary";
import {
  BasicFileInfo,
  LibraryTagFilterStructure,
  TagInfo,
} from "../State/documentLibraryState";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
  console.log("heeerrrr");
  return {
    initialFileIds: appState.library.initialFileIds,
    libraryTags: appState.library.libraryTags,
    documentHierarchy: appState.library.documentHierarchy,
    savedMultipleSelectedFiles: appState.library.savedMultipleSelectedFiles,
    savedCollapsedFileIds: appState.library.savedCollapsedFileIds,
    documentLibraryLoader: appState.library.documentLibraryLoader,
    appliedLibraryTagFilters: appState.library.appliedLibraryTagFilters,
    filteredFileIds: appState.library.filteredFileIds,
    selectedFile: appState.library.selectedFile,
    selectedLibraryAction: appState.library.selectedLibraryAction,
    isBulkAction: appState.library.isBulkAction,
    editTagsLoader: appState.library.editTagsLoader,
    savedFileTagData: appState.library.savedFileTagData,
    generalFilters: appState.library.generalFilters,
    generalFilterLoader: appState.library.generalFilterLoader,
    generalFilterFileIds: appState.library.generalFilterFileIds,
  };
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
  return {
    pageWatcher: (page: string) =>
      dispatch(AppActionGenerator.pageWatcher(page)),
    getLibraryTags: () => dispatch(DocumentLibraryGenerator.getLibraryTags()),
    getLibraryFileId: (sort: string, order: string) =>
      dispatch(DocumentLibraryGenerator.getLibraryFileId(sort, order)),
    getHierarchy: (sort: string, order: string, fileIds: number[]) =>
      dispatch(
        DocumentLibraryGenerator.getDocumentHierarchy(sort, order, fileIds)
      ),
    saveMultipleSelectedFiles: (savedMultipleSelectedFiles: BasicFileInfo[]) =>
      dispatch(
        DocumentLibraryGenerator.saveMultipleSelectedFiles(
          savedMultipleSelectedFiles
        )
      ),
    saveCollapsedFileIds: (savedCollapsedFileIds: number[]) =>
      dispatch(
        DocumentLibraryGenerator.saveCollapsedFileIds(savedCollapsedFileIds)
      ),
    applyLibraryTagFilters: (
      appliedLibraryTagFilters: LibraryTagFilterStructure[],
      initialFileIds: number[]
    ) =>
      dispatch(
        DocumentLibraryGenerator.applyLibraryTagFilters(
          appliedLibraryTagFilters,
          initialFileIds
        )
      ),
    getDocumentHierarchy: (sort: string, order: string, fileIds: number[]) =>
      dispatch(
        DocumentLibraryGenerator.getDocumentHierarchy(sort, order, fileIds)
      ),
    saveSelectedFile: (selectedFile: BasicFileInfo | null) =>
      dispatch(DocumentLibraryGenerator.saveSelectedFile(selectedFile)),
    saveSelectedLibraryAction: (
      selectedLibraryAction: string,
      isBulkAction: boolean
    ) =>
      dispatch(
        DocumentLibraryGenerator.saveSelectedLibraryAction(
          selectedLibraryAction,
          isBulkAction
        )
      ),
    saveFileTagData: (savedFileTagData: any[]) =>
      dispatch(DocumentLibraryGenerator.saveFileTagData(savedFileTagData)),
    getParentFileList: (
      selectedFileId: number,
      fileIds: number[],
      bulkFileIds: number[]
    ) =>
      dispatch(
        DocumentLibraryGenerator.getParentFileList(
          selectedFileId,
          fileIds,
          bulkFileIds
        )
      ),
    getChildrenFileList: (selectedFileId: number, fileIds: number[]) =>
      dispatch(
        DocumentLibraryGenerator.getChildrenFileList(selectedFileId, fileIds)
      ),
    getGeneralFilter: (fileIds: number[]) =>
      dispatch(DocumentLibraryGenerator.getGeneralFilterDL(fileIds)),
    applyGeneralFilter: (
      fileIds: number[],
      filterType: string,
      sort: string,
      order: string
    ) =>
      dispatch(
        DocumentLibraryGenerator.applyGeneralFilterDL(
          fileIds,
          filterType,
          sort,
          order
        )
      ),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentLibrary);


import { DocumentHierarchyData, LibraryTagFilterStructure, LibraryTagData, TagInfo, ParentFileInfo, ChildrenFileInfo, BasicFileInfo } from "../State/documentLibraryState";
import { AddParent, ADDPARENT, AddParent_Success, ADDPARENT_SUCCESS, ApplyGeneralFilterDL, ApplyGeneralFilterDLFailure, ApplyGeneralFilterDLSuccess, APPLYGENERALFILTERSDL, APPLYGENERALFILTERSDL_FAILURE, APPLYGENERALFILTERSDL_SUCCESS, ApplyLibraryTagFilters, APPLYLIBRARYTAGFILTERS, ApplyLibraryTagFiltersFailure, ApplyLibraryTagFiltersSuccess, APPLYLIBRARYTAGFILTERS_FAILURE, APPLYLIBRARYTAGFILTERS_SUCCESS, EditTags, EDITTAGS, EditTagsSuccess, EDITTAGS_SUCCESS, GetChildrenFileList, GETCHILDRENFILELIST, GetChildrenFileList_Failure, GETCHILDRENFILELIST_FAILURE, GETCHILDRENFILELIST_SUCCESS, GetChildrenFileList_Success, GetDocumentHierarchy, GETDOCUMENTHIERARCHY, GetDocumentHierarchyFailure, GetDocumentHierarchySuccess, GETDOCUMENTHIERARCHY_FAILURE, GETDOCUMENTHIERARCHY_SUCCESS, GetGeneralFilterDL, GetGeneralFilterDLFailure, GetGeneralFilterDLSuccess, GETGENERALFILTERSDL, GETGENERALFILTERSDL_FAILURE, GETGENERALFILTERSDL_SUCCESS, GetLibraryFileId, GETLIBRARYFILEID, GetLibraryFileIdFailure, GetLibraryFileIdSuccess, GETLIBRARYFILEID_FAILURE, GETLIBRARYFILEID_SUCCESS, GETLIBRARYTAGS, GetLibraryTags, GetLibraryTagsFailure, GetLibraryTagsSuccess, GETLIBRARYTAGS_FAILURE, GETLIBRARYTAGS_SUCCESS, GetParentFileList, GETPARENTFILELIST, GetParentFileList_Failure, GETPARENTFILELIST_FAILURE, GetParentFileList_Success, GETPARENTFILELIST_SUCCESS, REMOVEPARENT, RemoveParent, RemoveParentSuccess, REMOVEPARENT_SUCCESS, SaveCollapsedFileIds, SAVECOLLAPSEDFILEIDS, SAVEFILETAGDATA, SaveFileTagData, SAVELIBRARYTAGFILTERS, SaveLibraryTagFilters, SAVEMULTIPLESELECTEDFILES, SaveMultipleSelectedFiles, SaveSelectedFile, SAVESELECTEDFILE, SAVESELECTEDLIBRARYACTION, SaveSelectedLibraryAction } from "./def";


export default class DocumentLibraryGenerator {
    public static getLibraryFileId(sort: string, order: string): GetLibraryFileId {
        return {
            type: GETLIBRARYFILEID,
            payload: {
                sort: sort,
                order: order
            }
        }
    }
    public static getLibraryFileIdSuccess(initialFileIds: number[]): GetLibraryFileIdSuccess {
        return {
            type: GETLIBRARYFILEID_SUCCESS,
            payload: {
                initialFileIds: initialFileIds
            }
        };
    }
    public static getLibraryFileIdFailure(): GetLibraryFileIdFailure {
        return {
            type: GETLIBRARYFILEID_FAILURE
        };
    }
    public static getLibraryTags(): GetLibraryTags {
        return {
            type: GETLIBRARYTAGS
        }
    }
    public static getLibraryTagsSuccess(libraryTags: LibraryTagData[]): GetLibraryTagsSuccess {
        return {
            type: GETLIBRARYTAGS_SUCCESS,
            payload: {
                libraryTags: libraryTags
            }
        };
    }
    public static getLibraryTagsFailure(): GetLibraryTagsFailure {
        return {
            type: GETLIBRARYTAGS_FAILURE
        };
    }
    public static getDocumentHierarchy(sort: string, order: string, fileIds: number[]): GetDocumentHierarchy {
        return {
            type: GETDOCUMENTHIERARCHY,
            payload: {
                sort: sort,
                order: order,
                fileIds: fileIds
            }
        }
    }
    public static getDocumentHierarchySuccess(documentHierarchy: DocumentHierarchyData[]): GetDocumentHierarchySuccess {
        return {
            type: GETDOCUMENTHIERARCHY_SUCCESS,
            payload: {
                documentHierarchy: documentHierarchy
            }
        };
    }
    public static getDocumentHierarchyFailure(): GetDocumentHierarchyFailure {
        return {
            type: GETDOCUMENTHIERARCHY_FAILURE
        };
    }
    public static saveMultipleSelectedFiles(savedMultipleSelectedFiles: BasicFileInfo[]): SaveMultipleSelectedFiles {
        return {
            type: SAVEMULTIPLESELECTEDFILES,
            payload: {
                savedMultipleSelectedFiles: savedMultipleSelectedFiles
            }
        };
    }
    public static saveCollapsedFileIds(savedCollapsedFileIds: number[]): SaveCollapsedFileIds {
        return {
            type: SAVECOLLAPSEDFILEIDS,
            payload: {
                savedCollapsedFileIds: savedCollapsedFileIds
            }
        };
    }
    public static saveLibraryTagFilters(savedLibraryTagFilters: TagInfo[]): SaveLibraryTagFilters {
        return {
            type: SAVELIBRARYTAGFILTERS,
            payload: {
                savedLibraryTagFilters: savedLibraryTagFilters
            }
        };
    }
    public static applyLibraryTagFilters(appliedLibraryTagFilters: LibraryTagFilterStructure[], initialFileIds: number[]): ApplyLibraryTagFilters {
        return {
            type: APPLYLIBRARYTAGFILTERS,
            payload: {
                appliedLibraryTagFilters: appliedLibraryTagFilters,
                initialFileIds: initialFileIds
            }
        }
    }
    public static applyLibraryTagFiltersSuccess(filteredFileIds: number[]): ApplyLibraryTagFiltersSuccess {
        return {
            type: APPLYLIBRARYTAGFILTERS_SUCCESS,
            payload: {
                filteredFileIds: filteredFileIds
            }
        };
    }
    public static applyLibraryTagFiltersFailure(): ApplyLibraryTagFiltersFailure {
        return {
            type: APPLYLIBRARYTAGFILTERS_FAILURE
        };
    }
    public static saveSelectedFile(selectedFile: BasicFileInfo | null): SaveSelectedFile {
        return {
            type: SAVESELECTEDFILE,
            payload: {
                selectedFile: selectedFile
            }
        };
    }
    public static saveSelectedLibraryAction(selectedLibraryAction: string, isBulkAction: boolean): SaveSelectedLibraryAction {
        return {
            type: SAVESELECTEDLIBRARYACTION,
            payload: {
                selectedLibraryAction: selectedLibraryAction,
                isBulkAction: isBulkAction
            }
        };
    }
    public static editTags(editFileIds: number[], dataType: string, tagEditData: any, isBulkAction: boolean): EditTags {
        return {
            type: EDITTAGS,
            payload: {
                editFileIds: editFileIds,
                dataType: dataType,
                tagEditData: tagEditData,
                isBulkAction: isBulkAction
            }
        };
    }
    public static editTagsSuccess(): EditTagsSuccess {
        return {
            type: EDITTAGS_SUCCESS
        };
    }
    public static saveFileTagData(savedFileTagData: any[]): SaveFileTagData {
        return {
            type: SAVEFILETAGDATA,
            payload: {
                savedFileTagData: savedFileTagData
            }
        };
    }
    public static getParentFileList(selectedFileId: number,fileIds: number[], bulkFileIds: number[]): GetParentFileList {
        return {
            type: GETPARENTFILELIST,
            payload: {
                selectedFileId: selectedFileId,
                fileIds: fileIds,
                bulkFileIds: bulkFileIds
            }
        }
    }
    public static getParentFileListSuccess(savedParentFileList: ParentFileInfo[]): GetParentFileList_Success {
        return {
            type: GETPARENTFILELIST_SUCCESS,
            payload: {
                savedParentFileList: savedParentFileList
            }
        }
    }
    public static getParentFileListFailure(): GetParentFileList_Failure {
        return {
            type: GETPARENTFILELIST_FAILURE
        }
    }
    public static addParent(childFileIds: number[], editedParentFileId: number): AddParent {
        return {
            type: ADDPARENT,
            payload: {
                childFileIds: childFileIds,
                editedParentFileId: editedParentFileId
            }
        }
    }
    public static addParentSuccess(): AddParent_Success {
        return {
            type: ADDPARENT_SUCCESS
        }
    }
    public static getChildrenFileList(selectedFileId: number,fileIds: number[]): GetChildrenFileList {
        return {
            type: GETCHILDRENFILELIST,
            payload: {
                selectedFileId: selectedFileId,
                fileIds: fileIds
            }
        }
    }
    public static getChildrenFileListSuccess(savedChildrenFileList: ChildrenFileInfo[]): GetChildrenFileList_Success {
        return {
            type: GETCHILDRENFILELIST_SUCCESS,
            payload: {
                savedChildrenFileList: savedChildrenFileList
            }
        }
    }
    public static getChildrenFileListFailure(): GetChildrenFileList_Failure {
        return {
            type: GETCHILDRENFILELIST_FAILURE
        }
    }
    public static removeParent(childFileIds: number[], editedParentFileId: number): RemoveParent {
        return {
            type: REMOVEPARENT,
            payload: {
                childFileIds: childFileIds,
                editedParentFileId: editedParentFileId
            }
        }
    }
    public static removeParentSuccess(): RemoveParentSuccess {
        return {
            type: REMOVEPARENT_SUCCESS
        }
    }

    public static getGeneralFilterDL( fileIds: number[] ): GetGeneralFilterDL{
        return {
            type: GETGENERALFILTERSDL,
            payload: {
                fileIds: fileIds
            }
        }
    }

    public static getGeneralFilterDLSuccess(generalFilter: any): GetGeneralFilterDLSuccess {
        return {
            type: GETGENERALFILTERSDL_SUCCESS,
            payload: {
                generalFilter: generalFilter
            }
        }
    }

    public static getGeneralFilterDLFailure(): GetGeneralFilterDLFailure {
        return {
            type: GETGENERALFILTERSDL_FAILURE
        }
    }

    public static applyGeneralFilterDL(fileIds: number[], filterType: string, sort: string, order: string): ApplyGeneralFilterDL {
        return {
            type: APPLYGENERALFILTERSDL,
            payload: {
                filterIds: fileIds,
                filterType: filterType,
                sort: sort,
                order: order,
            }
        }
    }
    public static applyGeneralFilterDLSuccess(documentLibraryFileIds: number[]): ApplyGeneralFilterDLSuccess {
        return {
            type: APPLYGENERALFILTERSDL_SUCCESS,
            payload: {
                documentLibraryFileIds: documentLibraryFileIds
            }
        }
    }
    public static applyGeneralFilterDLFailure(): ApplyGeneralFilterDLFailure {
        return {
            type: APPLYGENERALFILTERSDL_FAILURE
        }
    }
}
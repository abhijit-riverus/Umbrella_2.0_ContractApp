import { DocumentHierarchyData, LibraryTagFilterStructure, LibraryTagData, TagInfo, ParentFileInfo, ChildrenFileInfo, BasicFileInfo } from "../State/documentLibraryState";

export const GETLIBRARYFILEID = 'GETLIBRARYFILEID';
export type GETLIBRARYFILEID = typeof GETLIBRARYFILEID;
export const GETLIBRARYFILEID_SUCCESS = 'GETLIBRARYFILEID_SUCCESS';
export type GETLIBRARYFILEID_SUCCESS = typeof GETLIBRARYFILEID_SUCCESS;
export const GETLIBRARYFILEID_FAILURE = 'GETLIBRARYFILEID_FAILURE';
export type GETLIBRARYFILEID_FAILURE = typeof GETLIBRARYFILEID_FAILURE;

export const GETLIBRARYTAGS = 'GETLIBRARYTAGS';
export type GETLIBRARYTAGS = typeof GETLIBRARYTAGS;
export const GETLIBRARYTAGS_SUCCESS = 'GETLIBRARYTAGS_SUCCESS';
export type GETLIBRARYTAGS_SUCCESS = typeof GETLIBRARYTAGS_SUCCESS;
export const GETLIBRARYTAGS_FAILURE = 'GETLIBRARYTAGS_FAILURE';
export type GETLIBRARYTAGS_FAILURE = typeof GETLIBRARYTAGS_FAILURE;

export const GETDOCUMENTHIERARCHY = 'GETDOCUMENTHIERARCHY';
export type GETDOCUMENTHIERARCHY = typeof GETDOCUMENTHIERARCHY;
export const GETDOCUMENTHIERARCHY_SUCCESS = 'GETDOCUMENTHIERARCHY_SUCCESS';
export type GETDOCUMENTHIERARCHY_SUCCESS = typeof GETDOCUMENTHIERARCHY_SUCCESS;
export const GETDOCUMENTHIERARCHY_FAILURE = 'GETDOCUMENTHIERARCHY_FAILURE';
export type GETDOCUMENTHIERARCHY_FAILURE = typeof GETDOCUMENTHIERARCHY_FAILURE;

export const SAVEMULTIPLESELECTEDFILES = 'SAVEMULTIPLESELECTEDFILES';
export type SAVEMULTIPLESELECTEDFILES = typeof SAVEMULTIPLESELECTEDFILES;

export const SAVECOLLAPSEDFILEIDS = 'SAVECOLLAPSEDFILEIDS';
export type SAVECOLLAPSEDFILEIDS = typeof SAVECOLLAPSEDFILEIDS;

export const SAVELIBRARYTAGFILTERS = 'SAVELIBRARYTAGFILTERS';
export type SAVELIBRARYTAGFILTERS = typeof SAVELIBRARYTAGFILTERS;

export const APPLYLIBRARYTAGFILTERS = 'APPLYLIBRARYTAGFILTERS';
export type APPLYLIBRARYTAGFILTERS = typeof APPLYLIBRARYTAGFILTERS;
export const APPLYLIBRARYTAGFILTERS_SUCCESS = 'APPLYLIBRARYTAGFILTERS_SUCCESS';
export type APPLYLIBRARYTAGFILTERS_SUCCESS = typeof APPLYLIBRARYTAGFILTERS_SUCCESS;
export const APPLYLIBRARYTAGFILTERS_FAILURE = 'APPLYLIBRARYTAGFILTERS_FAILURE';
export type APPLYLIBRARYTAGFILTERS_FAILURE = typeof APPLYLIBRARYTAGFILTERS_FAILURE;

export const SAVESELECTEDFILE = 'SAVESELECTEDFILE';
export type SAVESELECTEDFILE = typeof SAVESELECTEDFILE;

export const SAVESELECTEDLIBRARYACTION = 'SAVESELECTEDLIBRARYACTION';
export type SAVESELECTEDLIBRARYACTION = typeof SAVESELECTEDLIBRARYACTION;

export const EDITTAGS = 'EDITTAGS';
export type EDITTAGS = typeof EDITTAGS;
export const EDITTAGS_SUCCESS = 'EDITTAGS_SUCCESS';
export type EDITTAGS_SUCCESS = typeof EDITTAGS_SUCCESS;

export const SAVEFILETAGDATA = 'SAVEFILETAGDATA';
export type SAVEFILETAGDATA = typeof SAVEFILETAGDATA;

export const GETPARENTFILELIST = 'GETPARENTFILELIST';
export type GETPARENTFILELIST = typeof GETPARENTFILELIST;
export const GETPARENTFILELIST_SUCCESS = 'GETPARENTFILELIST_SUCCESS';
export type GETPARENTFILELIST_SUCCESS = typeof GETPARENTFILELIST_SUCCESS;
export const GETPARENTFILELIST_FAILURE = 'GETPARENTFILELIST_FAILURE';
export type GETPARENTFILELIST_FAILURE = typeof GETPARENTFILELIST_FAILURE;

export const ADDPARENT = 'ADDPARENT';
export type ADDPARENT = typeof ADDPARENT;
export const ADDPARENT_SUCCESS = 'ADDPARENT_SUCCESS';
export type ADDPARENT_SUCCESS = typeof ADDPARENT_SUCCESS;

export const GETCHILDRENFILELIST = 'GETCHILDRENFILELIST';
export type GETCHILDRENFILELIST = typeof GETCHILDRENFILELIST;
export const GETCHILDRENFILELIST_SUCCESS = 'GETCHILDRENFILELIST_SUCCESS';
export type GETCHILDRENFILELIST_SUCCESS = typeof GETCHILDRENFILELIST_SUCCESS;
export const GETCHILDRENFILELIST_FAILURE = 'GETCHILDRENFILELIST_FAILURE';
export type GETCHILDRENFILELIST_FAILURE = typeof GETCHILDRENFILELIST_FAILURE;

export const REMOVEPARENT = 'REMOVEPARENT';
export type REMOVEPARENT = typeof REMOVEPARENT;
export const REMOVEPARENT_SUCCESS = 'REMOVEPARENT_SUCCESS';
export type REMOVEPARENT_SUCCESS = typeof REMOVEPARENT_SUCCESS;

export const GETGENERALFILTERSDL = 'GETGENERALFILTERSDL'; //DL stands for document library
export type GETGENERALFILTERSDL = typeof GETGENERALFILTERSDL;
export const GETGENERALFILTERSDL_SUCCESS = 'GETGENERALFILTERSDL_SUCCESS';
export type GETGENERALFILTERSDL_SUCCESS = typeof GETGENERALFILTERSDL_SUCCESS;
export const GETGENERALFILTERSDL_FAILURE = 'GETGENERALFILTERSDL_FAILURE';
export type GETGENERALFILTERSDL_FAILURE = typeof GETGENERALFILTERSDL_FAILURE;

export const APPLYGENERALFILTERSDL = 'APPLYGENERALFILTERSDL'; //DL stands for document library
export type APPLYGENERALFILTERSDL = typeof APPLYGENERALFILTERSDL;
export const APPLYGENERALFILTERSDL_SUCCESS = 'APPLYGENERALFILTERSDL_SUCCESS';
export type APPLYGENERALFILTERSDL_SUCCESS = typeof APPLYGENERALFILTERSDL_SUCCESS;
export const APPLYGENERALFILTERSDL_FAILURE = 'APPLYGENERALFILTERSDL_FAILURE';
export type APPLYGENERALFILTERSDL_FAILURE = typeof APPLYGENERALFILTERSDL_FAILURE;


export interface GetLibraryFileId {
    type: GETLIBRARYFILEID;
    payload: {
        sort: string;
        order: string;
    }
}

export interface GetLibraryFileIdSuccess {
    type: GETLIBRARYFILEID_SUCCESS;
    payload: {
        initialFileIds: number[];
    }
}

export interface GetLibraryFileIdFailure {
    type: GETLIBRARYFILEID_FAILURE;
}

export interface GetLibraryTags {
    type: GETLIBRARYTAGS;
}

export interface GetLibraryTagsSuccess {
    type: GETLIBRARYTAGS_SUCCESS;
    payload: {
        libraryTags: LibraryTagData[]
    }
}

export interface GetLibraryTagsFailure {
    type: GETLIBRARYTAGS_FAILURE;
}

export interface GetDocumentHierarchy {
    type: GETDOCUMENTHIERARCHY;
    payload: {
        sort: string;
        order: string;
        fileIds: number[];
    }
}

export interface GetDocumentHierarchySuccess {
    type: GETDOCUMENTHIERARCHY_SUCCESS;
    payload: {
        documentHierarchy: DocumentHierarchyData[];
    }
}

export interface GetDocumentHierarchyFailure {
    type: GETDOCUMENTHIERARCHY_FAILURE;
}

export interface SaveMultipleSelectedFiles {
    type: SAVEMULTIPLESELECTEDFILES;
    payload: {
        savedMultipleSelectedFiles: BasicFileInfo[];
    }
}

export interface SaveCollapsedFileIds {
    type: SAVECOLLAPSEDFILEIDS;
    payload: {
        savedCollapsedFileIds: number[];
    }
}

export interface SaveLibraryTagFilters {
    type: SAVELIBRARYTAGFILTERS;
    payload: {
        savedLibraryTagFilters: TagInfo[];
    }
}

export interface ApplyLibraryTagFilters {
    type: APPLYLIBRARYTAGFILTERS;
    payload: {
        appliedLibraryTagFilters: LibraryTagFilterStructure[];
        initialFileIds: number[];
    }
}

export interface ApplyLibraryTagFiltersSuccess {
    type: APPLYLIBRARYTAGFILTERS_SUCCESS;
    payload: {
        filteredFileIds: number[];
    }
}

export interface ApplyLibraryTagFiltersFailure {
    type: APPLYLIBRARYTAGFILTERS_FAILURE;
}

export interface SaveSelectedFile {
    type: SAVESELECTEDFILE,
    payload: {
        selectedFile: BasicFileInfo | null;
    }
}

export interface SaveSelectedLibraryAction {
    type: SAVESELECTEDLIBRARYACTION,
    payload: {
        selectedLibraryAction: string;
        isBulkAction: boolean;
    }
}

export interface EditTags {
    type: EDITTAGS;
    payload: {
        editFileIds: number[];
        dataType: string;
        tagEditData: any;
        isBulkAction: boolean;
    }
}

export interface EditTagsSuccess {
    type: EDITTAGS_SUCCESS;
}

export interface SaveFileTagData {
    type: SAVEFILETAGDATA;
    payload: {
        savedFileTagData: any[];
    }
}

export interface GetParentFileList {
    type: GETPARENTFILELIST;
    payload: {
        selectedFileId: number;
        fileIds: number[];
        bulkFileIds: number[];
    }
}

export interface GetParentFileList_Success {
    type: GETPARENTFILELIST_SUCCESS;
    payload: {
        savedParentFileList: ParentFileInfo[];
    }
}

export interface GetParentFileList_Failure {
    type: GETPARENTFILELIST_FAILURE;
}

export interface AddParent {
    type: ADDPARENT;
    payload: {
        childFileIds: number[];
        editedParentFileId: number;
    }
}

export interface AddParent_Success {
    type: ADDPARENT_SUCCESS;
}

export interface GetChildrenFileList {
    type: GETCHILDRENFILELIST;
    payload: {
        selectedFileId: number;
        fileIds: number[];
    }
}

export interface GetChildrenFileList_Success {
    type: GETCHILDRENFILELIST_SUCCESS;
    payload: {
        savedChildrenFileList: ChildrenFileInfo[];
    }
}

export interface GetChildrenFileList_Failure {
    type: GETCHILDRENFILELIST_FAILURE;
}

export interface RemoveParent {
    type: REMOVEPARENT;
    payload: {
        childFileIds: number[];
        editedParentFileId: number;
    }
}

export interface RemoveParentSuccess {
    type: REMOVEPARENT_SUCCESS;
} 

export interface GetGeneralFilterDL {
    type: GETGENERALFILTERSDL,
    payload: {
        fileIds: number[];
    }
}

export interface GetGeneralFilterDLSuccess {
    type: GETGENERALFILTERSDL_SUCCESS,
    payload: {
        generalFilter: any
    }
}

export interface GetGeneralFilterDLFailure {
    type: GETGENERALFILTERSDL_FAILURE
}

export interface ApplyGeneralFilterDL {
    type: APPLYGENERALFILTERSDL;
    payload: {
        filterIds: number[];
        filterType: string;
        sort: string;
        order: string;
    }
}

export interface ApplyGeneralFilterDLSuccess {
    type: APPLYGENERALFILTERSDL_SUCCESS;
    payload: {
        documentLibraryFileIds: number[];
    }
}

export interface ApplyGeneralFilterDLFailure {
    type: APPLYGENERALFILTERSDL_FAILURE;
}

export type DocumentLibraryActions = 
    GetLibraryFileId | 
    GetLibraryFileIdSuccess | 
    GetLibraryFileIdFailure |
    GetLibraryTags |
    GetLibraryTagsSuccess |
    GetLibraryTagsFailure |
    GetDocumentHierarchy | 
    GetDocumentHierarchySuccess |
    GetDocumentHierarchyFailure |
    SaveMultipleSelectedFiles |
    SaveCollapsedFileIds | 
    SaveLibraryTagFilters | 
    ApplyLibraryTagFilters | 
    ApplyLibraryTagFiltersSuccess | 
    ApplyLibraryTagFiltersFailure | 
    SaveSelectedFile | 
    SaveSelectedLibraryAction |
    EditTags |
    EditTagsSuccess |
    SaveFileTagData | 
    GetParentFileList |
    GetParentFileList_Success |
    GetParentFileList_Failure | 
    AddParent |
    AddParent_Success |
    GetChildrenFileList |
    GetChildrenFileList_Success |
    GetChildrenFileList_Failure |
    RemoveParent |
    RemoveParentSuccess |
    GetGeneralFilterDL |
    GetGeneralFilterDLSuccess |
    GetGeneralFilterDLFailure |
    ApplyGeneralFilterDL |
    ApplyGeneralFilterDLSuccess |
    ApplyGeneralFilterDLFailure;
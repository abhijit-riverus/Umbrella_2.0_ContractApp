import { ClauseFolderState, ClauseInfo, ClauseStructure, FolderHeadingInfo } from "../State/clauseLibraryState";


export const GETFOLDERHEADING = 'GETFOLDERHEADING';
export type GETFOLDERHEADING = typeof GETFOLDERHEADING;
export const GETFOLDERHEADING_SUCCESS = 'GETFOLDERHEADING_SUCCESS';
export type GETFOLDERHEADING_SUCCESS = typeof GETFOLDERHEADING_SUCCESS;
export const GETFOLDERHEADING_FAILURE = 'GETFOLDERHEADING_FAILURE';
export type GETFOLDERHEADING_FAILURE = typeof GETFOLDERHEADING_FAILURE;

export const GETFOLDERSUBHEADING = 'GETFOLDERSUBHEADING';
export type GETFOLDERSUBHEADING = typeof GETFOLDERSUBHEADING;
export const GETFOLDERSUBHEADING_SUCCESS = 'GETFOLDERSUBHEADING_SUCCESS';
export type GETFOLDERSUBHEADING_SUCCESS = typeof GETFOLDERSUBHEADING_SUCCESS;
export const GETFOLDERSUBHEADING_FAILURE = 'GETFOLDERSUBHEADING_FAILURE';
export type GETFOLDERSUBHEADING_FAILURE = typeof GETFOLDERSUBHEADING_FAILURE;

export const CREATEFOLDERHEADING = 'CREATEFOLDERHEADING';
export type CREATEFOLDERHEADING = typeof CREATEFOLDERHEADING;
export const CREATEFOLDERHEADING_SUCCESS = 'CREATEFOLDERHEADING_SUCCESS';
export type CREATEFOLDERHEADING_SUCCESS = typeof CREATEFOLDERHEADING_SUCCESS;
export const CREATEFOLDERHEADING_FAILURE = 'CREATEFOLDERHEADING_FAILURE';
export type CREATEFOLDERHEADING_FAILURE = typeof CREATEFOLDERHEADING_FAILURE;

export const CREATEFOLDERSUBHEADING = 'CREATEFOLDERSUBHEADING';
export type CREATEFOLDERSUBHEADING = typeof CREATEFOLDERSUBHEADING;
export const CREATEFOLDERSUBHEADING_SUCCESS = 'CREATEFOLDERSUBHEADING_SUCCESS';
export type CREATEFOLDERSUBHEADING_SUCCESS = typeof CREATEFOLDERSUBHEADING_SUCCESS;
export const CREATEFOLDERSUBHEADING_FAILURE = 'CREATEFOLDERSUBHEADING_FAILURE';
export type CREATEFOLDERSUBHEADING_FAILURE = typeof CREATEFOLDERSUBHEADING_FAILURE;

export const CREATECLAUSE = 'CREATECLAUSE';
export type CREATECLAUSE = typeof CREATECLAUSE;
export const CREATECLAUSE_SUCCESS = 'CREATECLAUSE_SUCCESS';
export type CREATECLAUSE_SUCCESS = typeof CREATECLAUSE_SUCCESS;
export const CREATECLAUSE_FAILURE = 'CREATECLAUSE_FAILURE';
export type CREATECLAUSE_FAILURE = typeof CREATECLAUSE_FAILURE;

export const SAVECOLLAPSEDFOLERIDS = 'SAVECOLLAPSEDFOLERIDS';
export type SAVECOLLAPSEDFOLERIDS = typeof SAVECOLLAPSEDFOLERIDS;

export const EDITCLAUSE = 'EDITCLAUSE';
export type EDITCLAUSE = typeof EDITCLAUSE;
export const EDITCLAUSE_SUCCESS = 'EDITCLAUSE_SUCCESS';
export type EDITCLAUSE_SUCCESS = typeof EDITCLAUSE_SUCCESS;
export const EDITCLAUSE_FAILURE = 'EDITCLAUSE_FAILURE';
export type EDITCLAUSE_FAILURE = typeof EDITCLAUSE_FAILURE;

export const SAVESELECTEDCLAUSEDATA = 'SAVESELECTEDCLAUSEDATA';
export type SAVESELECTEDCLAUSEDATA = typeof SAVESELECTEDCLAUSEDATA;

export const SAVEFOLDERSUBHEADING = 'SAVEFOLDERSUBHEADING';
export type SAVEFOLDERSUBHEADING = typeof SAVEFOLDERSUBHEADING;

export const DELETECLAUSE = 'DELETECLAUSE';
export type DELETECLAUSE = typeof DELETECLAUSE;
export const DELETECLAUSE_SUCCESS = 'DELETECLAUSE_SUCCESS';
export type DELETECLAUSE_SUCCESS = typeof DELETECLAUSE_SUCCESS;
export const DELETECLAUSE_FAILURE = 'DELETECLAUSE_FAILURE';
export type DELETECLAUSE_FAILURE = typeof DELETECLAUSE_FAILURE;

export const DELETEFOLDER = 'DELETEFOLDER';
export type DELETEFOLDER = typeof DELETEFOLDER;
export const DELETEFOLDER_SUCCESS = 'DELETEFOLDER_SUCCESS';
export type DELETEFOLDER_SUCCESS = typeof DELETEFOLDER_SUCCESS;
export const DELETEFOLDER_FAILURE = 'DELETEFOLDER_FAILURE';
export type DELETEFOLDER_FAILURE = typeof DELETEFOLDER_FAILURE;

export const GETCLAUSELIBRARYDATA = 'GETCLAUSELIBRARYDATA';
export type GETCLAUSELIBRARYDATA = typeof GETCLAUSELIBRARYDATA;
export const GETCLAUSELIBRARYDATA_SUCCESS = 'GETCLAUSELIBRARYDATA_SUCCESS';
export type GETCLAUSELIBRARYDATA_SUCCESS = typeof GETCLAUSELIBRARYDATA_SUCCESS;
export const GETCLAUSELIBRARYDATA_FAILURE = 'GETCLAUSELIBRARYDATA_FAILURE';
export type GETCLAUSELIBRARYDATA_FAILURE = typeof GETCLAUSELIBRARYDATA_FAILURE;

export const GETCLAUSESDATA = 'GETCLAUSESDATA';
export type GETCLAUSESDATA = typeof GETCLAUSESDATA;
export const GETCLAUSESDATA_SUCCESS = 'GETCLAUSESDATA_SUCCESS';
export type GETCLAUSESDATA_SUCCESS = typeof GETCLAUSESDATA_SUCCESS;
export const GETCLAUSESDATA_FAILURE = 'GETCLAUSESDATA_FAILURE';
export type GETCLAUSESDATA_FAILURE = typeof GETCLAUSESDATA_FAILURE;

export interface GetFolderHeading {
    type: GETFOLDERHEADING;
}

export interface GetFolderHeadingSuccess {
    type: GETFOLDERHEADING_SUCCESS;
    payload: {
        folderHeadingList: FolderHeadingInfo[];
    }
}

export interface GetFolderHeadingFailure {
    type: GETFOLDERHEADING_FAILURE;
}

export interface GetFolderSubHeading {
    type: GETFOLDERSUBHEADING;
    payload: {
        parentId: number;
    }
}

export interface GetFolderSubHeadingSuccess {
    type: GETFOLDERSUBHEADING_SUCCESS;
    payload: {
        folderSubHeadingList: FolderHeadingInfo[];
    }
}

export interface GetFolderSubHeadingFailure {
    type: GETFOLDERSUBHEADING_FAILURE;
}

export interface CreateFolderHeading {
    type: CREATEFOLDERHEADING;
    payload: {
        folderName: string; 
    }
}

export interface CreateFolderHeadingSuccess {
    type: CREATEFOLDERHEADING_SUCCESS;
}

export interface CreateFolderHeadingFailure {
    type: CREATEFOLDERHEADING_FAILURE;
}

export interface CreateFolderSubHeading {
    type: CREATEFOLDERSUBHEADING;
    payload: {
        folderName: string;
        parentId: number; 
    }
}

export interface CreateFolderSubHeadingSuccess {
    type: CREATEFOLDERSUBHEADING_SUCCESS;
}

export interface CreateFolderSubHeadingFailure {
    type: CREATEFOLDERSUBHEADING_FAILURE;
}

export interface CreateClause {
    type: CREATECLAUSE;
    payload: {
        clauseName: string;
        extractedText: string;
        userText: string;
        clauseType: string;
        sourceFileId: number;
        folderId: number;
    }
}

export interface CreateClauseSuccess {
    type: CREATECLAUSE_SUCCESS;
}

export interface CreateClauseFailure {
    type: CREATECLAUSE_FAILURE;
}

export interface SaveCollapsedFolderIds {
    type: SAVECOLLAPSEDFOLERIDS;
    payload: {
        collapsedFolderIds: number[]
    }
}

export interface EditClause {
    type: EDITCLAUSE;
    payload: {
        clauseId: number;
        clauseName: string;
        userText: string;
        clauseType: string;
        folderId: number;
    }
}

export interface EditClauseSuccess {
    type: EDITCLAUSE_SUCCESS;
}

export interface EditClauseFailure {
    type: EDITCLAUSE_FAILURE;
}

export interface SaveSelectedClauseData {
    type: SAVESELECTEDCLAUSEDATA;
    payload: {
        selectedClauseData: ClauseInfo;
    }
}

export interface SaveFolderSubHeading {
    type: SAVEFOLDERSUBHEADING;
    payload: {
        folderSubHeadingList: FolderHeadingInfo[];
    }
}

export interface DeleteClause {
    type: DELETECLAUSE;
    payload: {
        clauseId: number;
    }
}

export interface DeleteClauseSuccess {
    type: DELETECLAUSE_SUCCESS;
}

export interface DeleteClauseFailure {
    type: DELETECLAUSE_FAILURE;
}

export interface DeleteFolder {
    type: DELETEFOLDER;
    payload: {
        folderId: number;
    }
}

export interface DeleteFolderSuccess {
    type: DELETEFOLDER_SUCCESS;
}

export interface DeleteFolderFailure {
    type: DELETEFOLDER_FAILURE;
}

export interface GetClauseLibraryData {
    type: GETCLAUSELIBRARYDATA;
}

export interface GetClauseLibraryDataSuccess {
    type: GETCLAUSELIBRARYDATA_SUCCESS;
    payload: {
        clauseLibraryData: ClauseFolderState[];
    }
}

export interface GetClauseLibraryDataFailure {
    type: GETCLAUSELIBRARYDATA_FAILURE;
}

export interface GetClausesData {
    type: GETCLAUSESDATA;
    payload: {
        clauseIds: number[];
    }
}

export interface GetClausesDataSuccess {
    type: GETCLAUSESDATA_SUCCESS;
    payload: {
        clausesData: ClauseStructure[];
    }
}

export interface GetClausesDataFailure {
    type: GETCLAUSESDATA_FAILURE;
}

export type ClauseLibraryActions = 
    GetFolderHeading | 
    GetFolderHeadingSuccess | 
    GetFolderHeadingFailure | 
    GetFolderSubHeading | 
    GetFolderSubHeadingSuccess | 
    GetFolderHeadingFailure | 
    CreateFolderHeading | 
    CreateFolderHeadingSuccess | 
    CreateFolderHeadingFailure | 
    CreateFolderSubHeading | 
    CreateFolderSubHeadingSuccess | 
    CreateFolderSubHeadingFailure | 
    CreateClause | 
    CreateClauseSuccess | 
    CreateClauseFailure | 
    SaveCollapsedFolderIds | 
    EditClause |
    EditClauseSuccess | 
    EditClauseFailure | 
    SaveSelectedClauseData |
    SaveFolderSubHeading | 
    DeleteClause |
    DeleteClauseSuccess |
    DeleteClauseFailure | 
    DeleteFolder | 
    DeleteFolderSuccess | 
    DeleteFolderFailure | 
    GetClauseLibraryData | 
    GetClauseLibraryDataSuccess | 
    GetClauseLibraryDataFailure |
    GetClausesData | 
    GetClausesDataSuccess | 
    GetClausesDataFailure
;


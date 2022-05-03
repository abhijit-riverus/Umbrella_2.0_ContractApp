import { ClauseFolderState, ClauseInfo, ClauseStructure, FolderHeadingInfo } from "../State/clauseLibraryState";
import { CREATECLAUSE, CreateClause, CreateClauseFailure, CreateClauseSuccess, CREATECLAUSE_FAILURE, CREATECLAUSE_SUCCESS, CREATEFOLDERHEADING, CreateFolderHeading, CreateFolderHeadingFailure, CreateFolderHeadingSuccess, CREATEFOLDERHEADING_FAILURE, CREATEFOLDERHEADING_SUCCESS, CreateFolderSubHeading, CREATEFOLDERSUBHEADING, CreateFolderSubHeadingFailure, CreateFolderSubHeadingSuccess, CREATEFOLDERSUBHEADING_FAILURE, CREATEFOLDERSUBHEADING_SUCCESS, DELETECLAUSE, DeleteClause, DeleteClauseFailure, DeleteClauseSuccess, DELETECLAUSE_FAILURE, DELETECLAUSE_SUCCESS, DELETEFOLDER, DeleteFolder, DeleteFolderFailure, DeleteFolderSuccess, DELETEFOLDER_FAILURE, DELETEFOLDER_SUCCESS, EDITCLAUSE, EditClause, EditClauseFailure, EditClauseSuccess, EDITCLAUSE_FAILURE, EDITCLAUSE_SUCCESS, GETCLAUSELIBRARYDATA, GetClauseLibraryData, GetClauseLibraryDataFailure, GetClauseLibraryDataSuccess, GETCLAUSELIBRARYDATA_FAILURE, GETCLAUSELIBRARYDATA_SUCCESS, GETCLAUSESDATA, GetClausesData, GetClausesDataFailure, GetClausesDataSuccess, GETCLAUSESDATA_FAILURE, GETCLAUSESDATA_SUCCESS, GETFOLDERHEADING, GetFolderHeading, GetFolderHeadingFailure, GetFolderHeadingSuccess, GETFOLDERHEADING_FAILURE, GETFOLDERHEADING_SUCCESS, GetFolderSubHeading, GETFOLDERSUBHEADING, GetFolderSubHeadingFailure, GetFolderSubHeadingSuccess, GETFOLDERSUBHEADING_FAILURE, GETFOLDERSUBHEADING_SUCCESS, SaveCollapsedFolderIds, SAVECOLLAPSEDFOLERIDS, SAVEFOLDERSUBHEADING, SaveFolderSubHeading, SAVESELECTEDCLAUSEDATA, SaveSelectedClauseData } from "./def";


export default class ClauseLibraryActionGenerator {
    public static getFolderHeading(): GetFolderHeading {
        return {
            type: GETFOLDERHEADING
        };
    }
    public static getFolderHeadingSuccess(folderHeadingList: FolderHeadingInfo[]): GetFolderHeadingSuccess {
        return {
            type: GETFOLDERHEADING_SUCCESS,
            payload: {
                folderHeadingList: folderHeadingList
            }
        };
    }
    public static getFolderHeadingFailure(): GetFolderHeadingFailure {
        return {
            type: GETFOLDERHEADING_FAILURE
        };
    }
    public static getFolderSubHeading(parentId: number): GetFolderSubHeading {
        return {
            type: GETFOLDERSUBHEADING,
            payload: {
                parentId: parentId
            }
        };
    }
    public static getFolderSubHeadingSuccess(folderSubHeadingList: FolderHeadingInfo[]): GetFolderSubHeadingSuccess {
        return {
            type: GETFOLDERSUBHEADING_SUCCESS,
            payload: {
                folderSubHeadingList: folderSubHeadingList
            }
        };
    }
    public static getFolderSubHeadingFailure(): GetFolderSubHeadingFailure {
        return {
            type: GETFOLDERSUBHEADING_FAILURE
        };
    }
    public static createFolderHeading(folderName: string): CreateFolderHeading {
        return {
            type: CREATEFOLDERHEADING,
            payload: {
                folderName: folderName
            }
        };
    }
    public static createFolderHeadingSuccess(): CreateFolderHeadingSuccess {
        return {
            type: CREATEFOLDERHEADING_SUCCESS
        };
    }
    public static createFolderHeadingFailure(): CreateFolderHeadingFailure {
        return {
            type: CREATEFOLDERHEADING_FAILURE
        };
    }
    public static createFolderSubHeading(folderName: string, parentId: number): CreateFolderSubHeading {
        return {
            type: CREATEFOLDERSUBHEADING,
            payload: {
                folderName: folderName,
                parentId: parentId
            }
        };
    }
    public static createFolderSubHeadingSuccess(): CreateFolderSubHeadingSuccess {
        return {
            type: CREATEFOLDERSUBHEADING_SUCCESS,
        };
    }
    public static createFolderSubHeadingFailure(): CreateFolderSubHeadingFailure {
        return {
            type: CREATEFOLDERSUBHEADING_FAILURE
        };
    }
    public static createClause(clauseName: string, extractedText: string, userText: string, clauseType: string, sourceFileId: number, folderId: number): CreateClause {
        return {
            type: CREATECLAUSE,
            payload: {
                clauseName: clauseName,
                extractedText: extractedText,
                userText: userText,
                clauseType: clauseType,
                sourceFileId: sourceFileId,
                folderId: folderId
            }
        };
    }
    public static createClauseSuccess(): CreateClauseSuccess {
        return {
            type: CREATECLAUSE_SUCCESS
        };
    }
    public static createClauseFailure(): CreateClauseFailure {
        return {
            type: CREATECLAUSE_FAILURE
        };
    }
    public static saveCollapsedFolderIds(collapsedFolderIds: number[]): SaveCollapsedFolderIds {
        return {
            type: SAVECOLLAPSEDFOLERIDS,
            payload: {
                collapsedFolderIds: collapsedFolderIds
            }
        };
    }
    public static saveSelectedClauseData(selectedClauseData: ClauseInfo): SaveSelectedClauseData {
        return {
            type: SAVESELECTEDCLAUSEDATA,
            payload: {
                selectedClauseData: selectedClauseData
            }
        };
    }
    public static editClause(clauseId: number, clauseName: string, userText: string, clauseType: string, folderId: number): EditClause {
        return {
            type: EDITCLAUSE,
            payload: {
                clauseId: clauseId,
                clauseName: clauseName,
                userText: userText,
                clauseType: clauseType,
                folderId: folderId
            }
        };
    }
    public static editClauseSuccess(): EditClauseSuccess {
        return {
            type: EDITCLAUSE_SUCCESS
        };
    }
    public static editClauseFailure(): EditClauseFailure {
        return {
            type: EDITCLAUSE_FAILURE
        };
    }
    public static saveFolderSubHeading(folderSubHeadingList: FolderHeadingInfo[]): SaveFolderSubHeading {
        return {
            type: SAVEFOLDERSUBHEADING,
            payload: {
                folderSubHeadingList: folderSubHeadingList
            }
        };
    }
    public static deleteClause(clauseId: number): DeleteClause {
        return {
            type: DELETECLAUSE,
            payload: {
                clauseId: clauseId
            }
        };
    }
    public static deleteClauseSuccess(): DeleteClauseSuccess {
        return {
            type: DELETECLAUSE_SUCCESS
        };
    }
    public static deleteClauseFailure(): DeleteClauseFailure {
        return {
            type: DELETECLAUSE_FAILURE
        };
    }
    public static deleteFolder(folderId: number): DeleteFolder {
        return {
            type: DELETEFOLDER,
            payload: {
                folderId: folderId
            }
        };
    }
    public static deleteFolderSuccess(): DeleteFolderSuccess {
        return {
            type: DELETEFOLDER_SUCCESS
        };
    }
    public static deleteFolderFailure(): DeleteFolderFailure {
        return {
            type: DELETEFOLDER_FAILURE
        };
    }
    public static getClauseLibraryData(): GetClauseLibraryData {
        return {
            type: GETCLAUSELIBRARYDATA
        };
    }
    public static getClauseLibraryDataSuccess(clauseLibraryData: ClauseFolderState[]): GetClauseLibraryDataSuccess {
        return {
            type: GETCLAUSELIBRARYDATA_SUCCESS,
            payload: {
                clauseLibraryData: clauseLibraryData
            }
        };
    }
    public static getClauseLibraryDataFailure(): GetClauseLibraryDataFailure {
        return {
            type: GETCLAUSELIBRARYDATA_FAILURE
        };
    }
    public static getClausesData(clauseIds: number[]): GetClausesData {
        return {
            type: GETCLAUSESDATA,
            payload: {
                clauseIds: clauseIds
            }
        };
    }
    public static getClausesDataSuccess(clausesData: ClauseStructure[]): GetClausesDataSuccess {
        return {
            type: GETCLAUSESDATA_SUCCESS,
            payload: {
                clausesData: clausesData
            }
        };
    }
    public static getClausesDataFailure(): GetClausesDataFailure {
        return {
            type: GETCLAUSESDATA_FAILURE
        };
    }
}
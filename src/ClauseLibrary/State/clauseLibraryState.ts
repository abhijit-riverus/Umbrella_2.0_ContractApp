
export default interface ClauseLibraryState {
    folderHeadingList: FolderHeadingInfo[];
    folderSubHeadingList: FolderHeadingInfo[];
    clauseLibraryData: ClauseFolderState[];
    collapsedFolderIds: number[]; 
    selectedClauseData: ClauseInfo;
    clauseLibraryLoader: boolean;
    clauseIds: number[];
    clausesData: ClauseStructure[];
}

export interface FolderHeadingInfo {
    folderId: number;
    folderName: string;
    parentId: number;
}

export interface ClauseFolderState {
    folderID: number;
    folderName: string;
    clauses: ClauseState[];
    createdBy: string;
    createdOn: string;
    modifiedOn: string;
    children: ClauseFolderState[];
}

export interface ClauseState {
    id: number;
    name: string;
    clauseType: string;
    createdBy: string;
    createdOn: string;
    modifiedOn: string;
}

export interface ClauseStructure {
    clauseID: number;
    sourceFileID: number;
    sourceFileName: string;
    folderID: number;
    folderName: string;
    subfolderID: number;
    subfolderName: string;
    extractedClause: string;
    userEditedClause: string;
}

export interface ClauseInfo {
    clauseId: number;
    clauseName: string;
    clauseFolderId: number;
    clauseFolderName: string;
    clauseSubFolderId: number;
    clauseSubFolderName: string;
    clauseType: string;
    extractedClause: string;
    userEditedClause: string;
    sourceFileId: number;
    sourceFileName: string; 
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
}

export function defaultClauseLibraryState(): ClauseLibraryState {
    return {
        folderHeadingList: [],
        folderSubHeadingList: [],
        clauseLibraryData: [],
        collapsedFolderIds: [],
        selectedClauseData: {
            clauseId: -1,
            clauseName: '',
            clauseFolderId: -1,
            clauseFolderName: '',
            clauseSubFolderId: -1,
            clauseSubFolderName: '',
            clauseType: '',
            extractedClause: '',
            userEditedClause: '',
            sourceFileId: -1,
            sourceFileName: '', 
            createdOn: '',
            createdBy: '',
            modifiedOn: ''
        },
        clauseLibraryLoader: false,
        clausesData: [],
        clauseIds: []
    }
};
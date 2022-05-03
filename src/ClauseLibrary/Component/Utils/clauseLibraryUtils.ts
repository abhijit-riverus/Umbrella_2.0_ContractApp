import { ClauseFolderState, ClauseInfo, ClauseState, ClauseStructure } from "../../State/clauseLibraryState";

export const clauseTypeList = ["Preferred", "Alternative", "Fallback", "Avoidable"];

export function addOrRemoveFolderIds(folderId: number, folderIdArray: number[]) {
    let editedFileArray: number[] = [];
    let exists = false;
    if(folderIdArray.length === 0){
        editedFileArray.push(folderId);
    }else {
        for(let i = 0; i < folderIdArray.length; i++) {
            if(folderId === folderIdArray[i]){
                exists = true;
                continue;
            }
            editedFileArray.push(folderIdArray[i]);
        }
        if(exists === false){
            editedFileArray.push(folderId);
        }
    }
    return editedFileArray;
}

export function getClauseIdsFromFolderHierarchy(clauseFolderData: ClauseFolderState[]){
    let clauseIds: number[] = [];
    for(let i = 0; i < clauseFolderData.length; i++){
        clauseIds = clauseIds.concat(getClauseIdsFromFolder(clauseFolderData[i], []));
    }
    return clauseIds;
}

function getClauseIdsFromFolder(clauseFolder: ClauseFolderState, iterativeArray: number[]): number[]{
    //recursive
    let returnVal: number[] = iterativeArray;
    if(clauseFolder.clauses.length > 0){
        for(let i = 0; i < clauseFolder.clauses.length; i++){
            if(clauseFolder.clauses[i].id !== null){
                returnVal.push(clauseFolder.clauses[i].id);
            }
        }
    }
    if(clauseFolder.children.length > 0){
        for(let i = 0; i < clauseFolder.children.length; i++){
            returnVal = returnVal.concat(getClauseIdsFromFolder(clauseFolder.children[i], returnVal));
        }
    }
    return returnVal;
}

export function getClauseInfoFromClauseArray(clause: ClauseState, clauseArray: ClauseStructure[]){
    let matchedClause: ClauseInfo = {
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
    }
    for(let i = 0; i < clauseArray.length; i++){
        if(clauseArray[i].clauseID === clause.id){
            matchedClause = {
                clauseId: clauseArray[i].clauseID,
                clauseName: clause.name,
                clauseFolderId: clauseArray[i].folderID,
                clauseFolderName: clauseArray[i].folderName,
                clauseSubFolderId: clauseArray[i].subfolderID,
                clauseSubFolderName: clauseArray[i].subfolderName,
                clauseType: clause.clauseType,
                extractedClause: clauseArray[i].extractedClause,
                userEditedClause: clauseArray[i].userEditedClause,
                sourceFileId: clauseArray[i].sourceFileID,
                sourceFileName: clauseArray[i].sourceFileName, 
                createdOn: clause.createdOn,
                createdBy: clause.createdBy,
                modifiedOn: clause.modifiedOn
            }
            break;
        }
    }
    return matchedClause;
}


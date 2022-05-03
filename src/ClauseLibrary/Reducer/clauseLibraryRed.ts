import { ClauseLibraryActions, CREATECLAUSE, CREATEFOLDERHEADING, CREATEFOLDERSUBHEADING, DELETECLAUSE, DELETEFOLDER, GETCLAUSELIBRARYDATA, GETCLAUSELIBRARYDATA_SUCCESS, GETCLAUSESDATA, GETCLAUSESDATA_SUCCESS, GETFOLDERHEADING_SUCCESS, GETFOLDERSUBHEADING, GETFOLDERSUBHEADING_SUCCESS, SAVECOLLAPSEDFOLERIDS, SAVEFOLDERSUBHEADING, SAVESELECTEDCLAUSEDATA } from "../Actions/def";
import ClauseLibraryState, { defaultClauseLibraryState } from "../State/clauseLibraryState";


export default function clauseLibraryReducer(state: ClauseLibraryState = defaultClauseLibraryState(), action: ClauseLibraryActions): ClauseLibraryState {
    switch (action.type) {
        case GETFOLDERHEADING_SUCCESS: {
            return { ...state, folderHeadingList: action.payload.folderHeadingList }
        }
        case GETFOLDERSUBHEADING: {
            return { ...state, folderSubHeadingList: [] }
        }
        case GETFOLDERSUBHEADING_SUCCESS: {
            return { ...state, folderSubHeadingList: action.payload.folderSubHeadingList }
        }
        case SAVECOLLAPSEDFOLERIDS: {
            return { ...state, collapsedFolderIds: action.payload.collapsedFolderIds }
        }
        case SAVESELECTEDCLAUSEDATA: {
            return { ...state, selectedClauseData: action.payload.selectedClauseData }
        }
        case SAVEFOLDERSUBHEADING: {
            return { ...state, folderSubHeadingList: action.payload.folderSubHeadingList }
        }
        case CREATECLAUSE: {
            return { ...state, clauseLibraryLoader: true }
        }
        case CREATEFOLDERHEADING: {
            return { ...state, clauseLibraryLoader: true }
        }
        case CREATEFOLDERSUBHEADING: {
            return { ...state, clauseLibraryLoader: true }
        }
        case DELETECLAUSE: {
            return { ...state, clauseLibraryLoader: true }
        }
        case DELETEFOLDER: {
            return { ...state, clauseLibraryLoader: true }
        }
        case GETCLAUSELIBRARYDATA: {
            return { ...state, clauseLibraryLoader: true, clauseLibraryData: [] }
        }
        case GETCLAUSELIBRARYDATA_SUCCESS: {
            return { ...state, clauseLibraryData: action.payload.clauseLibraryData, clauseLibraryLoader: false }
        }
        case GETCLAUSESDATA: {
            return { ...state, clauseIds: action.payload.clauseIds }
        }
        case GETCLAUSESDATA_SUCCESS: {
            return { ...state, clausesData: action.payload.clausesData, clauseLibraryLoader: false  }
        }
        default: return state;
    }
}
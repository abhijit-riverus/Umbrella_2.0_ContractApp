
import { APPLYGENERALFILTERSDL, APPLYGENERALFILTERSDL_FAILURE, APPLYGENERALFILTERSDL_SUCCESS, APPLYLIBRARYTAGFILTERS, APPLYLIBRARYTAGFILTERS_SUCCESS, DocumentLibraryActions, EDITTAGS, EDITTAGS_SUCCESS, GETCHILDRENFILELIST_SUCCESS, GETDOCUMENTHIERARCHY, GETDOCUMENTHIERARCHY_FAILURE, GETDOCUMENTHIERARCHY_SUCCESS, GETGENERALFILTERSDL, GETGENERALFILTERSDL_FAILURE, GETGENERALFILTERSDL_SUCCESS, GETLIBRARYFILEID, GETLIBRARYFILEID_SUCCESS, GETLIBRARYTAGS_SUCCESS, GETPARENTFILELIST_SUCCESS, SAVECOLLAPSEDFILEIDS, SAVEFILETAGDATA, SAVELIBRARYTAGFILTERS, SAVEMULTIPLESELECTEDFILES, SAVESELECTEDFILE, SAVESELECTEDLIBRARYACTION } from "../Actions/def";
import DocumentLibraryState, { defaultDocumentLibraryState } from "../State/documentLibraryState";

export default function documentLibraryReducer(state: DocumentLibraryState = defaultDocumentLibraryState(), action: DocumentLibraryActions): DocumentLibraryState {
    switch(action.type) {
        case GETLIBRARYFILEID: {
            return { ...state, documentLibraryLoader: true }
        }
        case GETLIBRARYFILEID_SUCCESS: {
            return { ...state, initialFileIds: action.payload.initialFileIds, documentLibraryLoader: false }
        }
        case GETLIBRARYTAGS_SUCCESS: {
            return { ...state, libraryTags: action.payload.libraryTags }
        }
        case GETDOCUMENTHIERARCHY: {
            return { ...state, documentLibraryLoader: true }
        }
        case GETDOCUMENTHIERARCHY_SUCCESS: {
            return { ...state, documentHierarchy: action.payload.documentHierarchy, documentLibraryLoader: false }
        }
        case APPLYLIBRARYTAGFILTERS: {
            return { ...state, appliedLibraryTagFilters: action.payload.appliedLibraryTagFilters, initialFileIds: action.payload.initialFileIds }
        }
        case APPLYLIBRARYTAGFILTERS_SUCCESS: {
            return { ...state, filteredFileIds: action.payload.filteredFileIds }
        }
        case SAVECOLLAPSEDFILEIDS: {
            return { ...state, savedCollapsedFileIds: action.payload.savedCollapsedFileIds}
        }
        case SAVEMULTIPLESELECTEDFILES: {
            return { ...state, savedMultipleSelectedFiles: action.payload.savedMultipleSelectedFiles}
        }
        case SAVESELECTEDFILE: {
            return { ...state, selectedFile: action.payload.selectedFile}
        }
        case SAVESELECTEDLIBRARYACTION: {
            return { ...state, selectedLibraryAction: action.payload.selectedLibraryAction, isBulkAction: action.payload.isBulkAction}
        }
        case EDITTAGS: {
            return { ...state, editFileIds: action.payload.editFileIds, dataType: action.payload.dataType, tagEditData: action.payload.tagEditData, editTagsLoader: true}
        }
        case EDITTAGS_SUCCESS: {
            return { ...state, editTagsLoader: true};
        }
        case SAVEFILETAGDATA: {
            return { ...state, savedFileTagData: action.payload.savedFileTagData }
        }
        case GETPARENTFILELIST_SUCCESS: {
            return { ...state, savedParentFileList: action.payload.savedParentFileList };
        }
        case GETCHILDRENFILELIST_SUCCESS: {
            return { ...state, savedChildrenFileList: action.payload.savedChildrenFileList };
        }
        case GETGENERALFILTERSDL: {
            return {...state, generalFilterLoader: true}
        }
        case GETGENERALFILTERSDL_SUCCESS: {
            return {...state, generalFilters: action.payload.generalFilter, generalFilterLoader: false}
        }
        case GETGENERALFILTERSDL_FAILURE: {
            return {...state, generalFilterLoader: false}
        }
        case APPLYGENERALFILTERSDL: {
            return {...state}
        }
        case APPLYGENERALFILTERSDL_SUCCESS: {
            return {...state, generalFilterFileIds: action.payload.documentLibraryFileIds }
        }
        case APPLYGENERALFILTERSDL_FAILURE: {
            return {...state}
        }
        default: {
            return state;
        }
    }
}
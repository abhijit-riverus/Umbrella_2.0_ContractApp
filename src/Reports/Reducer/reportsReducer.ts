import { DELETEREPORT, DELETEREPORT_FAILURE, DELETEREPORT_SUCCESS, DELETESAVEDCONFIGURATION, DELETESAVEDCONFIGURATION_FAILURE, DELETESAVEDCONFIGURATION_SUCCESS, GETALLREPORTSDATA, GETALLREPORTSDATA_FAILURE, GETALLREPORTSDATA_SUCCESS, GETSAVEDCONFIGURATIONDATA, GETSAVEDCONFIGURATIONDATA_SUCCESS, ReportsActions, SAVEDELETEREPORTDETAILS, SAVEDELETESAVEDCONFIGDETAILS } from "../Actions/Def";
import ReportsState, { defaultReportsState } from "../State/reportsState";

export default function reportsReducer( state: ReportsState = defaultReportsState(), action: ReportsActions ): ReportsState {
    switch(action.type){
        case GETALLREPORTSDATA:{
            return{ ...state, reportsTableLoader: true }
        }
        case GETALLREPORTSDATA_SUCCESS: {
            return{ ...state, reportsTableData: action.payload.reportsTableData, reportsTableLoader: false}
        }
        case GETALLREPORTSDATA_FAILURE: {
            return{ ...state, reportsTableLoader: false}
        }
        case DELETEREPORT: {
            return{...state}
        }
        case DELETEREPORT_SUCCESS: {
            return{...state, deleteReportStatus: action.payload.deleteStatus}
        }
        case DELETEREPORT_FAILURE: {
            return{...state, deleteReportStatus: action.payload.deleteStatus}
        }
        case SAVEDELETEREPORTDETAILS: {
            return{ ...state, reportName: action.payload.reportName, uniqueReportId: action.payload.uniqueReportId}
        }
        case GETSAVEDCONFIGURATIONDATA: {
            return { ...state, reportsTableLoader: true, reportSortBy: action.payload.sortBy, reportSortOrder: action.payload.sortOrder };
        }
        case GETSAVEDCONFIGURATIONDATA_SUCCESS: {
            return { ...state, savedConfigurationData: action.payload.savedConfigurationData, reportsTableLoader: false};
        }
        case DELETESAVEDCONFIGURATION_SUCCESS: {
            return{...state, deleteSavedConfigStatus: action.payload.deleteSavedConfigStatus}
        }
        case DELETESAVEDCONFIGURATION_FAILURE: {
            return{...state, deleteSavedConfigStatus: action.payload.deleteSavedConfigStatus}
        }
        case SAVEDELETESAVEDCONFIGDETAILS: {
            return{ ...state, deleteSavedConfigName: action.payload.savedConfigName, deleteSavedConfigId: action.payload.savedConfigId}
        }
        default: {
            return state;
        }
    }
}
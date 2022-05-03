import DashboardState, { defaultDashboardState } from "../State/dashboardState";
import { DashboardActions, GETJURISDICTION_SUCCESS, GETUPLOADEDBY_SUCCESS, GETCONTRACTYPE_SUCCESS, GETJURISDICTION, GETUPLOADEDBY, GETCONTRACTYPE, GETTABLEDATA, GETTABLEDATA_SUCCESS, GETDASHBOARDFILEID_SUCCESS, APPLYDASHBOARDFILTER_SUCCESS, SAVEDASHBOARDFILTERS, GETDASHBOARDFILEID } from "../Actions/def";

export default function dashboardReducer(state: DashboardState = defaultDashboardState(), action: DashboardActions): DashboardState {
    switch (action.type) {
        case GETDASHBOARDFILEID: {
            return { ...state, dashboardLoader: true, jurisdictionLoader: true, uploadedByLoader: true, contractTypeLoader: true, dashboardTableLoader: false };
        }
        case GETDASHBOARDFILEID_SUCCESS: {
            return { ...state, initialFileIds: action.payload.initialFileIds, dashboardLoader: false };
        }
        case GETJURISDICTION: {
            { return { ...state, jurisdictionLoader: true } }
        }
        case GETJURISDICTION_SUCCESS: {
            return { ...state, jurisdictionData: action.payload.jurisdictionData, jurisdictionLoader: false }
        }
        case GETUPLOADEDBY: {
            { return { ...state, uploadedByLoader: true } }
        }
        case GETUPLOADEDBY_SUCCESS: {
            return { ...state, uploadedByData: action.payload.uploadedByData, uploadedByLoader: false }
        }
        case GETCONTRACTYPE: {
            { return { ...state, contractTypeLoader: true } }
        }
        case GETCONTRACTYPE_SUCCESS: {
            return { ...state, contractTypeData: action.payload.contractTypeData, contractTypeLoader: false }
        }
        case GETTABLEDATA: {
            return { ...state, dashboardTableLoader: true }
        }
        case GETTABLEDATA_SUCCESS: {
            return { ...state, dashboardTableData: action.payload.dashboardTableData, dashboardTableLoader: false }
        }
        case APPLYDASHBOARDFILTER_SUCCESS: {
            return { ...state, filteredFileIds: action.payload.filteredFileIds }
        }
        case SAVEDASHBOARDFILTERS: {
            return{...state, savedFilters: action.payload.savedFilters}
        }
        default: return state;
    }
}
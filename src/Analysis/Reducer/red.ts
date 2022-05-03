import AnalysisState, { defaultAnalysisState } from "../State/analysisState";
import { AnalysisActions, GETANALYSISFILEID_SUCCESS, GETANALYSIS, GETANALYSIS_SUCCESS, GETGENERALFILTER_SUCCESS, GETADVANCEDFILTER_SUCCESS, APPLYADVANCEDFILTER_SUCCESS, SAVEAPPLIEDFILTER, RESETFLAG, GETTABLECONFIG_SUCCESS, UPDATEPREFERENCE_SUCCESS, UPDATEPREFERENCE, GENERATEREPORT, GENERATEREPORT_SUCCESS, GENERATEREPORT_FAILURE, SAVEADVANCEDFILTERSTRUCTURE, SAVEAPPLIEDFILTERSLIST,  GETANALYSISFILTERCONFIG_SUCCESS, GETFILTERAGGREGATE_SUCCESS, GETFILTEREDCOUNT_SUCCESS, APPLYANALYSISFILTER_SUCCESS, SAVEFILTERCLAUSETYPE, SAVEOPERATORLIST, SAVECLAUSEAGGREGATE, SAVEVALUEAGGREGATE, SAVEANALYSISFILTERSLIST, SAVECURRENTEDITINGFILTERID, SAVEFILTEREDCOUNT, APPLYANALYSISFILTER, GETANALYSISFILEID } from "../Actions/def";

export default function analysisReducer(state: AnalysisState = defaultAnalysisState(), action: AnalysisActions): AnalysisState {
    switch (action.type) {
        case GETANALYSISFILEID:{
            return { ...state, analysisLoader: true }
        }
        case GETANALYSISFILEID_SUCCESS: {
            return { ...state, analysisFileIds: action.payload.analysisFileIds }
        }
        case GETANALYSIS: {
            return { ...state, analysisLoader: true }
        }
        case GETANALYSIS_SUCCESS: {
            return { ...state, analysisObject: JSON.parse(JSON.stringify(action.payload.analysisObject)), analysisLoader: false }
        }
        case GETGENERALFILTER_SUCCESS: {
            return { ...state, generalFilter: action.payload.generalFilter }
        }
        case GETADVANCEDFILTER_SUCCESS: {
            return { ...state, advancedFilter: action.payload.advancedFilter }
        }
        case APPLYADVANCEDFILTER_SUCCESS: {
            return { ...state, filterFileIds: action.payload.advFileIds, count: action.payload.count, advancedFilter: action.payload.advancedFilter }
        }
        case SAVEAPPLIEDFILTER: {
            return { ...state, savedAppliedFilter: action.payload.savedAppliedFilter }
        }
        case RESETFLAG: {
            return { ...state, resetFlag: action.payload.resetFlag }
        }
        case GETTABLECONFIG_SUCCESS: {
            return { ...state, tableConfig: action.payload.tableConfig }
        }
        case UPDATEPREFERENCE: {
            return { ...state, preferenceUpdated: false }
        }
        case UPDATEPREFERENCE_SUCCESS: {
            return { ...state, preferenceUpdated: true, refreshTable: action.payload.refreshTable }
        }
        case GENERATEREPORT:{
            return{ ...state, isReportSuccess: false, openReportSnackbar: false}
        }
        case GENERATEREPORT_SUCCESS: {
            return{ ...state, csvLink: action.payload.csvLink, isReportSuccess: true, openReportSnackbar: true }
        }
        case GENERATEREPORT_FAILURE: {
            return{ ...state, isReportSuccess: false, openReportSnackbar: true }
        }
        case SAVEADVANCEDFILTERSTRUCTURE: {
            return { ...state, saveAdvancedFilterStructure: action.payload.advancedFilterStructure }
        }
        case SAVEAPPLIEDFILTERSLIST: {
            return { ...state, appliedFiltersList: action.payload.appliedFiltersList }
        }
        case SAVECURRENTEDITINGFILTERID: {
            return { ...state, currentEditingFilterId: action.payload.currentEditingFilterId }
        }
        case GETANALYSISFILTERCONFIG_SUCCESS: {
            return { ...state, savedFilterConfig: action.payload.savedFilterConfig }
        }
        case GETFILTERAGGREGATE_SUCCESS: {
            return { ...state, savedFilterAggregate: action.payload.savedFilterAggregate }
        }
        case GETFILTEREDCOUNT_SUCCESS:{
            return { ...state, filteredCount: action.payload.count }
        }
        case APPLYANALYSISFILTER:{
            return { ...state, analysisLoader: true }
        }
        case APPLYANALYSISFILTER_SUCCESS: {
            return { ...state, analysisFileIds: action.payload.analysisFileIds }
        }
        case SAVEFILTERCLAUSETYPE: {
            return { ...state, savedFilterClauseType: action.payload.savedFilterClauseType }
        }
        case SAVEOPERATORLIST: {
            return { ...state, savedOperatorList: action.payload.savedOperatorList}
        }
        case SAVECLAUSEAGGREGATE: {
            return { ...state, savedClauseAggregate: action.payload.savedClauseAggregate }
        }
        case SAVEVALUEAGGREGATE: {
            return { ...state, savedValueAggregate: action.payload.savedValueAggregate }
        }
        case SAVEANALYSISFILTERSLIST: {
            return { ...state, savedAnalysisFiltersList: action.payload.savedAnalysisFiltersList }
        }
        case SAVEFILTEREDCOUNT: {
            return { ...state, filteredCount: action.payload.filteredCount }
        }
        default: return state;
    }
}
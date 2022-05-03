import { AnalysisPoints, AdvancedFilter, FilterStructure, ConfigItem, LocalFilterStructure, FilterConfigStructure, FilterAggregateStructure, AnalysisFilterStructure, OperatorInfo } from "../State/analysisState";
import { IntermediateFilterStructure } from "../../Utils/GeneralUtil/genUtils";

export const GETANALYSISFILEID = 'GETANALYSISFILEID';
export type GETANALYSISFILEID = typeof GETANALYSISFILEID;
export const GETANALYSISFILEID_SUCCESS = 'GETANALYSISFILEID_SUCCESS';
export type GETANALYSISFILEID_SUCCESS = typeof GETANALYSISFILEID_SUCCESS;
export const GETANALYSISFILEID_FAILURE = 'GETANALYSISFILEID_FAILURE';
export type GETANALYSISFILEID_FAILURE = typeof GETANALYSISFILEID_FAILURE;

export const GETANALYSIS = 'GETANALYSIS';
export type GETANALYSIS = typeof GETANALYSIS;
export const GETANALYSIS_SUCCESS = 'GETANALYSIS_SUCCESS';
export type GETANALYSIS_SUCCESS = typeof GETANALYSIS_SUCCESS;
export const GETANALYSIS_FAILURE = 'GETANALYSIS_FAILURE';
export type GETANALYSIS_FAILURE = typeof GETANALYSIS_FAILURE;

export const GETGENERALFILTER = 'GETGENERALFILTER';
export type GETGENERALFILTER = typeof GETGENERALFILTER;
export const GETGENERALFILTER_SUCCESS = 'GETGENERALFILTER_SUCCESS';
export type GETGENERALFILTER_SUCCESS = typeof GETGENERALFILTER_SUCCESS;
export const GETGENERALFILTER_FAILURE = 'GETGENERALFILTER_FAILURE';
export type GETGENERALFILTER_FAILURE = typeof GETGENERALFILTER_FAILURE;

export const APPLYGENERALFILTER = 'APPLYGENERALFILTER';
export type APPLYGENERALFILTER = typeof APPLYGENERALFILTER;
export const APPLYGENERALFILTER_SUCCESS = 'APPLYGENERALFILTER_SUCCESS';
export type APPLYGENERALFILTER_SUCCESS = typeof APPLYGENERALFILTER_SUCCESS;
export const APPLYGENERALFILTER_FAILURE = 'APPLYGENERALFILTER_FAILURE';
export type APPLYGENERALFILTER_FAILURE = typeof APPLYGENERALFILTER_FAILURE;

export const GETADVANCEDFILTER = 'GETADVANCEDFILTER';
export type GETADVANCEDFILTER = typeof GETADVANCEDFILTER;
export const GETADVANCEDFILTER_SUCCESS = 'GETADVANCEDFILTER_SUCCESS';
export type GETADVANCEDFILTER_SUCCESS = typeof GETADVANCEDFILTER_SUCCESS;
export const GETADVANCEDFILTER_FAILURE = 'GETADVANCEDFILTER_FAILURE';
export type GETADVANCEDFILTER_FAILURE = typeof GETADVANCEDFILTER_FAILURE;

export const APPLYADVANCEDFILTER = 'APPLYADVANCEDFILTER';
export type APPLYADVANCEDFILTER = typeof APPLYADVANCEDFILTER;
export const APPLYADVANCEDFILTER_SUCCESS = 'APPLYADVANCEDFILTER_SUCCESS';
export type APPLYADVANCEDFILTER_SUCCESS = typeof APPLYADVANCEDFILTER_SUCCESS;
export const APPLYADVANCEDFILTER_FAILURE = 'APPLYADVANCEDFILTER_FAILURE';
export type APPLYADVANCEDFILTER_FAILURE = typeof APPLYADVANCEDFILTER_FAILURE;

export const SAVEAPPLIEDFILTER = 'SAVEAPPLIEDFILTER';
export type SAVEAPPLIEDFILTER = typeof SAVEAPPLIEDFILTER;

export const RESETFLAG = 'RESETFLAG';
export type RESETFLAG = typeof RESETFLAG;

export const GETTABLECONFIG = 'GETTABLECONFIG';
export type GETTABLECONFIG = typeof GETTABLECONFIG;
export const GETTABLECONFIG_SUCCESS = 'GETTABLECONFIG_SUCCESS';
export type GETTABLECONFIG_SUCCESS = typeof GETTABLECONFIG_SUCCESS;

export const UPDATEPREFERENCE = 'UPDATEPREFERENCE';
export type UPDATEPREFERENCE = typeof UPDATEPREFERENCE;
export const UPDATEPREFERENCE_SUCCESS = 'UPDATEPREFERENCE_SUCCESS';
export type UPDATEPREFERENCE_SUCCESS = typeof UPDATEPREFERENCE_SUCCESS;

export const GENERATEREPORT = 'GENERATEREPORT';
export type GENERATEREPORT = typeof GENERATEREPORT;
export const GENERATEREPORT_SUCCESS = 'GENERATEREPORT_SUCCESS';
export type GENERATEREPORT_SUCCESS = typeof GENERATEREPORT_SUCCESS;
export const GENERATEREPORT_FAILURE = 'GENERATEREPORT_FAILURE';
export type GENERATEREPORT_FAILURE = typeof GENERATEREPORT_FAILURE;

export const SAVEADVANCEDFILTERSTRUCTURE = 'SAVEADVANCEDFILTERSTRUCTURE';
export type SAVEADVANCEDFILTERSTRUCTURE = typeof SAVEADVANCEDFILTERSTRUCTURE;

export const SAVEAPPLIEDFILTERSLIST = 'SAVEAPPLIEDFILTERSLIST';
export type SAVEAPPLIEDFILTERSLIST = typeof SAVEAPPLIEDFILTERSLIST;

export const SAVECURRENTEDITINGFILTERID = 'SAVECURRENTEDITINGFILTERID';
export type SAVECURRENTEDITINGFILTERID = typeof SAVECURRENTEDITINGFILTERID;

export const GETANALYSISFILTERCONFIG = 'GETANALYSISFILTERCONFIG';
export type GETANALYSISFILTERCONFIG = typeof GETANALYSISFILTERCONFIG;
export const GETANALYSISFILTERCONFIG_SUCCESS = 'GETANALYSISFILTERCONFIG_SUCCESS';
export type GETANALYSISFILTERCONFIG_SUCCESS = typeof GETANALYSISFILTERCONFIG_SUCCESS;
export const GETANALYSISFILTERCONFIG_FAILURE = 'GETANALYSISFILTERCONFIG_FAILURE';
export type GETANALYSISFILTERCONFIG_FAILURE = typeof GETANALYSISFILTERCONFIG_FAILURE;

export const GETFILTERAGGREGATE = 'GETFILTERAGGREGATE';
export type GETFILTERAGGREGATE = typeof GETFILTERAGGREGATE;
export const GETFILTERAGGREGATE_SUCCESS = 'GETFILTERAGGREGATE_SUCCESS';
export type GETFILTERAGGREGATE_SUCCESS = typeof GETFILTERAGGREGATE_SUCCESS;
export const GETFILTERAGGREGATE_FAILURE = 'GETFILTERAGGREGATE_FAILURE';
export type GETFILTERAGGREGATE_FAILURE = typeof GETFILTERAGGREGATE_FAILURE;

export const GETFILTEREDCOUNT = 'GETFILTEREDCOUNT';
export type GETFILTEREDCOUNT = typeof GETFILTEREDCOUNT;
export const GETFILTEREDCOUNT_SUCCESS = 'GETFILTEREDCOUNT_SUCCESS';
export type GETFILTEREDCOUNT_SUCCESS = typeof GETFILTEREDCOUNT_SUCCESS;
export const GETFILTEREDCOUNT_FAILURE = 'GETFILTEREDCOUNT_FAILURE';
export type GETFILTEREDCOUNT_FAILURE = typeof GETFILTEREDCOUNT_FAILURE;

export const APPLYANALYSISFILTER = 'APPLYANALYSISFILTER';
export type APPLYANALYSISFILTER = typeof APPLYANALYSISFILTER;
export const APPLYANALYSISFILTER_SUCCESS = 'APPLYANALYSISFILTER_SUCCESS';
export type APPLYANALYSISFILTER_SUCCESS = typeof APPLYANALYSISFILTER_SUCCESS;
export const APPLYANALYSISFILTER_FAILURE = 'APPLYANALYSISFILTER_FAILURE';
export type APPLYANALYSISFILTER_FAILURE = typeof APPLYANALYSISFILTER_FAILURE;

export const SAVEFILTERCLAUSETYPE = 'SAVEFILTERCLAUSETYPE';
export type SAVEFILTERCLAUSETYPE = typeof SAVEFILTERCLAUSETYPE;

export const SAVECLAUSEAGGREGATE = 'SAVECLAUSEAGGREGATE';
export type SAVECLAUSEAGGREGATE = typeof SAVECLAUSEAGGREGATE;

export const SAVEVALUEAGGREGATE = 'SAVEVALUEAGGREGATE';
export type SAVEVALUEAGGREGATE = typeof SAVEVALUEAGGREGATE;

export const SAVEOPERATORLIST = 'SAVEOPERATORLIST';
export type SAVEOPERATORLIST = typeof SAVEOPERATORLIST;

export const SAVEANALYSISFILTERSLIST = 'SAVEANALYSISFILTERSLIST';
export type SAVEANALYSISFILTERSLIST = typeof SAVEANALYSISFILTERSLIST;

export const SAVEFILTEREDCOUNT = 'SAVEFILTEREDCOUNT';
export type SAVEFILTEREDCOUNT = typeof SAVEFILTEREDCOUNT;

export interface GetAnalysisFileId {
    type: GETANALYSISFILEID;
}

export interface GetAnalysisFileIdSuccess {
    type: GETANALYSISFILEID_SUCCESS;
    payload: {
        analysisFileIds: number[];
    }
}

export interface GetAnalysisFileIdFailure {
    type: GETANALYSISFILEID_FAILURE;
}

export interface GetAnalysis {
    type: GETANALYSIS;
    payload: {
        fileIds: number[];
    }
}

export interface GetAnalysisSuccess {
    type: GETANALYSIS_SUCCESS;
    payload: {
        analysisObject: AnalysisPoints[];
    }
}

export interface GetAnalysisFailure {
    type: GETANALYSIS_FAILURE;
}

export interface GetGeneralFilter {
    type: GETGENERALFILTER;
    payload: {
        fileIds: number[];
    }
}

export interface GetGeneralFilterSuccess {
    type: GETGENERALFILTER_SUCCESS;
    payload: {
        generalFilter: any
    }
}

export interface GetGeneralFilterFailure {
    type: GETGENERALFILTER_FAILURE;
}

export interface ApplyGeneralFilter {
    type: APPLYGENERALFILTER;
    payload: {
        filterIds: number[];
        filterType: string;
    }
}

export interface ApplyGeneralFilterSuccess {
    type: APPLYGENERALFILTER_SUCCESS;
    payload: {
        analysisFileIds: number[];
    }
}

export interface ApplyGeneralFilterFailure {
    type: APPLYGENERALFILTER_FAILURE;
}

export interface GetAdvancedFilter {
    type: GETADVANCEDFILTER;
    payload: {
        fileIds: number[];
    }
}

export interface GetAdvancedFilterSuccess {
    type: GETADVANCEDFILTER_SUCCESS;
    payload: {
        advancedFilter: AdvancedFilter[];
    }
}

export interface GetAdvancedFilterFailure {
    type: GETADVANCEDFILTER_FAILURE;
}

export interface ApplyAdvancedFilter {
    type: APPLYADVANCEDFILTER;
    payload: {
        filterIds: number[];
        filterStructure: FilterStructure;
    }
}

export interface ApplyAdvancedFilterSuccess {
    type: APPLYADVANCEDFILTER_SUCCESS;
    payload: {
        advFileIds: number[];
        count: number;
        advancedFilter: AdvancedFilter[];
    }
}

export interface ApplyAdvancedFilterFailure {
    type: APPLYADVANCEDFILTER_FAILURE;
}

export interface SaveAppliedFilters {
    type: SAVEAPPLIEDFILTER;
    payload: {
        savedAppliedFilter: IntermediateFilterStructure[];
    }
}

export interface ResetFlag {
    type: RESETFLAG;
    payload: {
        resetFlag: boolean;
    }
}

export interface GetTableConfig {
    type: GETTABLECONFIG;
}

export interface GetTableConfigSuccess {
    type: GETTABLECONFIG_SUCCESS;
    payload: {
        tableConfig: ConfigItem[];
    }
}

export interface UpdatePreference {
    type: UPDATEPREFERENCE;
    payload: {
        display: boolean;
        columnName: string;
        refreshTable?: boolean;
    }
}

export interface UpdatePreferenceSuccess {
    type: UPDATEPREFERENCE_SUCCESS;
    payload:{
        refreshTable: boolean
    }
}

export interface GenerateReport{
    type: GENERATEREPORT,
    payload:{
        name: string,
        filter: AnalysisFilterStructure[],
        fileIds: number[],
        preference: string[]
    }
}

export interface GenerateReportSuccess {
    type: GENERATEREPORT_SUCCESS,
    payload: {
        csvLink: string
    }
}

export interface GenerateReportFailure {
    type: GENERATEREPORT_FAILURE
}

export interface SaveAdvancedFilterStructure {
    type: SAVEADVANCEDFILTERSTRUCTURE
    payload: {
        advancedFilterStructure: FilterStructure;
    }
}

export interface SaveAppliedFiltersList {
    type: SAVEAPPLIEDFILTERSLIST;
    payload: {
        appliedFiltersList: LocalFilterStructure[];
    }
}

export interface SaveCurrentEditingFilterId {
    type: SAVECURRENTEDITINGFILTERID;
    payload: {
        currentEditingFilterId: number;
    }
}

export interface GetAnalysisFilterConfig {
    type: GETANALYSISFILTERCONFIG;
}

export interface GetAnalysisFilterConfigSuccess {
    type: GETANALYSISFILTERCONFIG_SUCCESS;
    payload: {
        savedFilterConfig: FilterConfigStructure[];
    }
}

export interface GetAnalysisFilterConfigFailure {
    type: GETANALYSISFILTERCONFIG_FAILURE;
}

export interface GetFilterAggregate {
    type: GETFILTERAGGREGATE;
    payload: {
        value: string;
        level: number;
        page: string;
        segment: string;  
    }
}

export interface GetFilterAggregateSuccess {
    type: GETFILTERAGGREGATE_SUCCESS;
    payload: {
        savedFilterAggregate: FilterAggregateStructure[];
    }
}

export interface GetFilterAggregateFailure {
    type: GETFILTERAGGREGATE_FAILURE;
}

export interface GetFilteredCount {
    type: GETFILTEREDCOUNT;
    payload: {
        savedAnalysisFiltersList: AnalysisFilterStructure[];
    }
}

export interface GetFilteredCountSuccess {
    type: GETFILTEREDCOUNT_SUCCESS;
    payload: {
        count: number;
    }
}

export interface GetFilteredCountFailure {
    type: GETFILTEREDCOUNT_FAILURE;
}

export interface ApplyAnalysisFilter {
    type: APPLYANALYSISFILTER;
    payload: {
        sort: string;
        filter: AnalysisFilterStructure[];
    }
}

export interface ApplyAnalysisFilterSuccess {
    type: APPLYANALYSISFILTER_SUCCESS;
    payload: {
        analysisFileIds: number[];
    }
}

export interface ApplyAnalysisFilterFailure {
    type: APPLYANALYSISFILTER_FAILURE;
}

export interface SaveFilterClauseType {
    type: SAVEFILTERCLAUSETYPE;
    payload: {
        savedFilterClauseType: string;
    }
}

export interface SaveClauseAggregate {
    type: SAVECLAUSEAGGREGATE;
    payload: {
        savedClauseAggregate: FilterAggregateStructure[];
    }
}

export interface SaveValueAggregate {
    type: SAVEVALUEAGGREGATE;
    payload: {
        savedValueAggregate: FilterAggregateStructure[];
    }
}

export interface SaveOperatorList {
    type: SAVEOPERATORLIST;
    payload: {
        savedOperatorList: OperatorInfo[];
    }
}

export interface SaveAnalysisFiltersList {
    type: SAVEANALYSISFILTERSLIST,
    payload: {
        savedAnalysisFiltersList: AnalysisFilterStructure[];
    }
}

export interface SaveFilteredCount {
    type: SAVEFILTEREDCOUNT,
    payload: {
        filteredCount: number;
    }
}

export type AnalysisActions =
    GetAnalysis |
    GetAnalysisSuccess |
    GetAnalysisFailure |
    GetAnalysisFileId |
    GetAnalysisFileIdSuccess |
    GetAnalysisFileIdFailure |
    GetGeneralFilter |
    GetGeneralFilterSuccess |
    GetGeneralFilterFailure |
    ApplyGeneralFilter |
    ApplyGeneralFilterSuccess |
    ApplyGeneralFilterFailure |
    GetAdvancedFilter |
    GetAdvancedFilterSuccess |
    GetAdvancedFilterFailure |
    ApplyAdvancedFilter |
    ApplyAdvancedFilterSuccess |
    ApplyAdvancedFilterFailure |
    SaveAppliedFilters |
    ResetFlag |
    GetTableConfig |
    GetTableConfigSuccess |
    UpdatePreference |
    UpdatePreferenceSuccess|
    GenerateReport | 
    GenerateReportSuccess |
    GenerateReportFailure |
    SaveAdvancedFilterStructure |
    SaveAppliedFiltersList |
    SaveCurrentEditingFilterId | 
    GetAnalysisFilterConfig | 
    GetAnalysisFilterConfigSuccess | 
    GetAnalysisFilterConfigFailure | 
    GetFilterAggregate | 
    GetFilterAggregateSuccess | 
    GetFilterAggregateFailure | 
    GetFilteredCount | 
    GetFilteredCountSuccess | 
    GetFilteredCountFailure | 
    ApplyAnalysisFilter | 
    ApplyAnalysisFilterSuccess | 
    ApplyAnalysisFilterFailure | 
    SaveFilterClauseType |
    SaveOperatorList |  
    SaveClauseAggregate | 
    SaveValueAggregate | 
    SaveAnalysisFiltersList | 
    SaveFilteredCount;
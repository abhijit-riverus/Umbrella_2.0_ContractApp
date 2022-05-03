import { LocalNewAnalysisFilterStructure, NewAnalysisData, NewAnalysisFilterAggregate, NewAnalysisFilterConfig, NewAnalysisFilterStructure, NewAnalysisTableConfig } from "../State/newAnalysisState";

export const GETNEWANALYSISFILEID = 'GETNEWANALYSISFILEID';
export type GETNEWANALYSISFILEID = typeof GETNEWANALYSISFILEID;
export const GETNEWANALYSISFILEID_SUCCESS = 'GETNEWANALYSISFILEID_SUCCESS';
export type GETNEWANALYSISFILEID_SUCCESS = typeof GETNEWANALYSISFILEID_SUCCESS;
export const GETNEWANALYSISFILEID_FAILURE = 'GETNEWANALYSISFILEID_FAILURE';
export type GETNEWANALYSISFILEID_FAILURE = typeof GETNEWANALYSISFILEID_FAILURE;

export const GETNEWANALYSISDATA = 'GETNEWANALYSISDATA';
export type GETNEWANALYSISDATA = typeof GETNEWANALYSISDATA;
export const GETNEWANALYSISDATA_SUCCESS = 'GETNEWANALYSISDATA_SUCCESS';
export type GETNEWANALYSISDATA_SUCCESS = typeof GETNEWANALYSISDATA_SUCCESS;
export const GETNEWANALYSISDATA_FAILURE = 'GETNEWANALYSISDATA_FAILURE';
export type GETNEWANALYSISDATA_FAILURE = typeof GETNEWANALYSISDATA_FAILURE;

export const GETNEWANALYSISFILTERCONFIG = 'GETNEWANALYSISFILTERCONFIG';
export type GETNEWANALYSISFILTERCONFIG = typeof GETNEWANALYSISFILTERCONFIG;
export const GETNEWANALYSISFILTERCONFIG_SUCCESS = 'GETNEWANALYSISFILTERCONFIG_SUCCESS';
export type GETNEWANALYSISFILTERCONFIG_SUCCESS = typeof GETNEWANALYSISFILTERCONFIG_SUCCESS;
export const GETNEWANALYSISFILTERCONFIG_FAILURE = 'GETNEWANALYSISFILTERCONFIG_FAILURE';
export type GETNEWANALYSISFILTERCONFIG_FAILURE = typeof GETNEWANALYSISFILTERCONFIG_FAILURE;

export const GETNEWANALYSISFILTERAGGREGATE = 'GETNEWANALYSISFILTERAGGREGATE';
export type GETNEWANALYSISFILTERAGGREGATE = typeof GETNEWANALYSISFILTERAGGREGATE;
export const GETNEWANALYSISFILTERAGGREGATE_SUCCESS = 'GETNEWANALYSISFILTERAGGREGATE_SUCCESS';
export type GETNEWANALYSISFILTERAGGREGATE_SUCCESS = typeof GETNEWANALYSISFILTERAGGREGATE_SUCCESS;
export const GETNEWANALYSISFILTERAGGREGATE_FAILURE = 'GETNEWANALYSISFILTERAGGREGATE_FAILURE';
export type GETNEWANALYSISFILTERAGGREGATE_FAILURE = typeof GETNEWANALYSISFILTERAGGREGATE_FAILURE;

export const APPLYNEWANALYSISFILTER = 'APPLYNEWANALYSISFILTER';
export type APPLYNEWANALYSISFILTER = typeof APPLYNEWANALYSISFILTER;
export const APPLYNEWANALYSISFILTER_SUCCESS = 'APPLYNEWANALYSISFILTER_SUCCESS';
export type APPLYNEWANALYSISFILTER_SUCCESS = typeof APPLYNEWANALYSISFILTER_SUCCESS;
export const APPLYNEWANALYSISFILTER_FAILURE = 'APPLYNEWANALYSISFILTER_FAILURE';
export type APPLYNEWANALYSISFILTER_FAILURE = typeof APPLYNEWANALYSISFILTER_FAILURE;

export const SAVENEWANALYSISLOCALAPPLIEDFILTER = 'SAVENEWANALYSISLOCALAPPLIEDFILTER';
export type SAVENEWANALYSISLOCALAPPLIEDFILTER = typeof SAVENEWANALYSISLOCALAPPLIEDFILTER;

export const GETNEWANALYSISFILTERCOUNT = 'GETNEWANALYSISFILTERCOUNT';
export type GETNEWANALYSISFILTERCOUNT = typeof GETNEWANALYSISFILTERCOUNT;
export const GETNEWANALYSISFILTERCOUNT_SUCCESS = 'GETNEWANALYSISFILTERCOUNT_SUCCESS';
export type GETNEWANALYSISFILTERCOUNT_SUCCESS = typeof GETNEWANALYSISFILTERCOUNT_SUCCESS;
export const GETNEWANALYSISFILTERCOUNT_FAILURE = 'GETNEWANALYSISFILTERCOUNT_FAILURE';
export type GETNEWANALYSISFILTERCOUNT_FAILURE = typeof GETNEWANALYSISFILTERCOUNT_FAILURE;

export const SAVENEWANALYSISSORT = 'SAVENEWANALYSISSORT';
export type SAVENEWANALYSISSORT = typeof SAVENEWANALYSISSORT;

export const SAVENEWANALYSISCONFIGURATION = 'SAVENEWANALYSISCONFIGURATION';
export type SAVENEWANALYSISCONFIGURATION = typeof SAVENEWANALYSISCONFIGURATION;
export const SAVENEWANALYSISCONFIGURATION_SUCCESS = 'SAVENEWANALYSISCONFIGURATION_SUCCESS';
export type SAVENEWANALYSISCONFIGURATION_SUCCESS = typeof SAVENEWANALYSISCONFIGURATION_SUCCESS;
export const SAVENEWANALYSISCONFIGURATION_FAILURE = 'SAVENEWANALYSISCONFIGURATION_FAILURE';
export type SAVENEWANALYSISCONFIGURATION_FAILURE = typeof SAVENEWANALYSISCONFIGURATION_FAILURE;

export const UPDATECONFIGURATIONCOUNT = 'UPDATECONFIGURATIONCOUNT';
export type UPDATECONFIGURATIONCOUNT = typeof UPDATECONFIGURATIONCOUNT;
export const UPDATECONFIGURATIONCOUNT_SUCCESS = 'UPDATECONFIGURATIONCOUNT_SUCCESS';
export type UPDATECONFIGURATIONCOUNT_SUCCESS = typeof UPDATECONFIGURATIONCOUNT_SUCCESS;
export const UPDATECONFIGURATIONCOUNT_FAILURE = 'UPDATECONFIGURATIONCOUNT_FAILURE';
export type UPDATECONFIGURATIONCOUNT_FAILURE = typeof UPDATECONFIGURATIONCOUNT_FAILURE;

export const SAVENEWANALYSISFILTER = 'SAVENEWANALYSISFILTER';
export type SAVENEWANALYSISFILTER = typeof SAVENEWANALYSISFILTER;

export const GETNEWANALYSISTABLECONFIG = 'GETNEWANALYSISTABLECONFIG';
export type GETNEWANALYSISTABLECONFIG = typeof GETNEWANALYSISTABLECONFIG;
export const GETNEWANALYSISTABLECONFIG_SUCCESS = 'GETNEWANALYSISTABLECONFIG_SUCCESS';
export type GETNEWANALYSISTABLECONFIG_SUCCESS = typeof GETNEWANALYSISTABLECONFIG_SUCCESS;
export const GETNEWANALYSISTABLECONFIG_FAILURE = 'GETNEWANALYSISTABLECONFIG_FAILURE';
export type GETNEWANALYSISTABLECONFIG_FAILURE = typeof GETNEWANALYSISTABLECONFIG_FAILURE;

export const GETNEWANALYSISINITIALFILEID = 'GETNEWANALYSISINITIALFILEID';
export type GETNEWANALYSISINITIALFILEID = typeof GETNEWANALYSISINITIALFILEID;
export const GETNEWANALYSISINITIALFILEID_SUCCESS = 'GETNEWANALYSISINITIALFILEID_SUCCESS';
export type GETNEWANALYSISINITIALFILEID_SUCCESS = typeof GETNEWANALYSISINITIALFILEID_SUCCESS;
export const GETNEWANALYSISINITIALFILEID_FAILURE = 'GETNEWANALYSISINITIALFILEID_FAILURE';
export type GETNEWANALYSISINITIALFILEID_FAILURE = typeof GETNEWANALYSISINITIALFILEID_FAILURE;

export const SAVENEWANALYSISCURRENCY = 'SAVENEWANALYSISCURRENCY';
export type SAVENEWANALYSISCURRENCY = typeof SAVENEWANALYSISCURRENCY;

export interface GetNewAnalysisFileId {
    type: GETNEWANALYSISFILEID;
}

export interface GetNewAnalysisFileIdSuccess {
    type: GETNEWANALYSISFILEID_SUCCESS;
    payload: {
        newAnalysisFileIds: number[];
    }
}

export interface GetNewAnalysisFileIdFailure {
    type: GETNEWANALYSISFILEID_FAILURE;
}

export interface GetNewAnalysisData {
    type: GETNEWANALYSISDATA;
    payload: {
        newAnalysisFileIds: number[];
        sort: string;
        order: string;
    }
}

export interface GetNewAnalysisDataSuccess {
    type: GETNEWANALYSISDATA_SUCCESS;
    payload: {
        newAnalysisData: NewAnalysisData[];
    }
}

export interface GetNewAnalysisDataFailure {
    type: GETNEWANALYSISDATA_FAILURE;
}

export interface GetNewAnalysisFilterConfig {
    type: GETNEWANALYSISFILTERCONFIG;
}

export interface GetNewAnalysisFilterConfigSuccess {
    type: GETNEWANALYSISFILTERCONFIG_SUCCESS;
    payload: {
        newAnalysisFilterConfig: NewAnalysisFilterConfig[];
    }
}

export interface GetNewAnalysisFilterConfigFailure {
    type: GETNEWANALYSISFILTERCONFIG_FAILURE;
}

export interface GetNewAnalysisFilterAggregate {
    type: GETNEWANALYSISFILTERAGGREGATE;
    payload: {
        value: string;
        level: number;
        page: string;
        sort: string;
        order: string;
        filter: NewAnalysisFilterStructure[];
        segment: string;
        isFilterForwarded: boolean;
    }
}

export interface GetNewAnalysisFilterAggregateSuccess {
    type: GETNEWANALYSISFILTERAGGREGATE_SUCCESS;
    payload: {
        newAnalysisFilterAggregate: NewAnalysisFilterAggregate[];
        segment: string;
        value: string;
        level: number;
        filter: NewAnalysisFilterStructure[];
        isFilterForwarded: boolean;
    }
}

export interface GetNewAnalysisFilterAggregateFailure {
    type: GETNEWANALYSISFILTERAGGREGATE_FAILURE;
}
 
export interface ApplyNewAnalysisFilter {
    type: APPLYNEWANALYSISFILTER;
    payload: {
        sort: string;
        filter: NewAnalysisFilterStructure[];
        newAnalysisSortedBy: string;
        newAnalysisSortOrder: string;
    }
}

export interface ApplyNewAnalysisFilterSuccess {
    type: APPLYNEWANALYSISFILTER_SUCCESS;
    payload: {
        newAnalysisFileIds: number[];
    }
}

export interface ApplyNewAnalysisFilterFailure {
    type: APPLYNEWANALYSISFILTER_FAILURE;
}

export interface SaveNewAnalysisLocalAppliedFilter {
    type: SAVENEWANALYSISLOCALAPPLIEDFILTER;
    payload: {
        newAnalysisLocalAppliedFilter: LocalNewAnalysisFilterStructure[];
    }
}

export interface GetNewAnalysisFilterCount {
    type: GETNEWANALYSISFILTERCOUNT;
    payload: {
        filter: NewAnalysisFilterStructure[];
    }
}

export interface GetNewAnalysisFilterCountSuccess {
    type: GETNEWANALYSISFILTERCOUNT_SUCCESS;
    payload: {
        count: number;
    }
}

export interface GetNewAnalysisFilterCountFailure {
    type: GETNEWANALYSISFILTERCOUNT_FAILURE;
}

export interface SaveNewAnalysisSort {
    type: SAVENEWANALYSISSORT;
    payload: {
        newAnalysisSortedBy: string;
        newAnalysisSortOrder: string;
    }
}

export interface SaveNewAnalysisConfiguration {
    type: SAVENEWANALYSISCONFIGURATION;
    payload: {
        title: string;
        description: string;
        type: string;
        lastResultCount: number;
        filter: NewAnalysisFilterStructure[];
    }
}

export interface SaveNewAnalysisConfigurationSuccess {
    type: SAVENEWANALYSISCONFIGURATION_SUCCESS;
    payload: {
        id: number;
    }
}

export interface SaveNewAnalysisConfigurationFailure {
    type: SAVENEWANALYSISCONFIGURATION_FAILURE;
}

export interface UpdateConfigurationCount {
    type: UPDATECONFIGURATIONCOUNT;
    payload: {
        count: number;
        ssid: number;
    }
}

export interface UpdateConfigurationCountSuccess {
    type: UPDATECONFIGURATIONCOUNT_SUCCESS;
    payload: {
        id: number;
    }
}

export interface UpdateConfigurationCountFailure {
    type: UPDATECONFIGURATIONCOUNT_FAILURE;
}

export interface SaveNewAnalysisFilter {
    type: SAVENEWANALYSISFILTER;
    payload: {
        appliedFilter: NewAnalysisFilterStructure[];
    }
}

export interface GetNewAnalysisTableConfig {
    type: GETNEWANALYSISTABLECONFIG;
}

export interface GetNewAnalysisTableConfigSuccess {
    type: GETNEWANALYSISTABLECONFIG_SUCCESS;
    payload: {
        newAnalysisTableConfig: NewAnalysisTableConfig[];
    }
}

export interface GetNewAnalysisTableConfigFailure {
    type: GETNEWANALYSISTABLECONFIG_FAILURE;
}

export interface GetNewAnalysisInitialFileId {
    type: GETNEWANALYSISINITIALFILEID;
}

export interface GetNewAnalysisInitialFileIdSuccess {
    type: GETNEWANALYSISINITIALFILEID_SUCCESS;
    payload: {
        newAnalysisInitialFileIds: number[];
    }
}

export interface GetNewAnalysisInitialFileIdFailure {
    type: GETNEWANALYSISINITIALFILEID_FAILURE;
}

export interface SaveNewAnalysisCurrency {
    type: SAVENEWANALYSISCURRENCY;
    payload: {
        currencyName: string;
        typeName: string;
    }
}

export type NewAnalysisActions =
    GetNewAnalysisFileId |
    GetNewAnalysisFileIdSuccess |
    GetNewAnalysisFileIdFailure |
    GetNewAnalysisData |
    GetNewAnalysisDataSuccess |
    GetNewAnalysisDataFailure |
    GetNewAnalysisFilterConfig |
    GetNewAnalysisFilterConfigSuccess |
    GetNewAnalysisFilterConfigFailure |
    GetNewAnalysisFilterAggregate |
    GetNewAnalysisFilterAggregateSuccess |
    GetNewAnalysisFilterAggregateFailure |
    ApplyNewAnalysisFilter |
    ApplyNewAnalysisFilterSuccess |
    ApplyNewAnalysisFilterFailure |
    SaveNewAnalysisLocalAppliedFilter |
    GetNewAnalysisFilterCount |
    GetNewAnalysisFilterCountSuccess |
    GetNewAnalysisFilterCountFailure |
    SaveNewAnalysisSort |
    SaveNewAnalysisConfiguration |
    SaveNewAnalysisConfigurationSuccess |
    SaveNewAnalysisConfigurationFailure |
    UpdateConfigurationCount |
    UpdateConfigurationCountSuccess |
    UpdateConfigurationCountFailure | 
    SaveNewAnalysisFilter |
    GetNewAnalysisTableConfig |
    GetNewAnalysisTableConfigSuccess |
    GetNewAnalysisTableConfigFailure |
    GetNewAnalysisInitialFileId |
    GetNewAnalysisInitialFileIdSuccess |
    GetNewAnalysisInitialFileIdFailure |
    SaveNewAnalysisCurrency;
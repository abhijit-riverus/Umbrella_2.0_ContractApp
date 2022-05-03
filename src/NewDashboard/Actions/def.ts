import { NewDashboardData, NewDashboardFilterAggregate, NewDashboardFilterConfig, NewDashboardFilterStructure } from "../State/newDashboardState";


export const GETNEWDASHBOARDFILEID = 'GETNEWDASHBOARDFILEID';
export type GETNEWDASHBOARDFILEID = typeof GETNEWDASHBOARDFILEID;
export const GETNEWDASHBOARDFILEID_SUCCESS = 'GETNEWDASHBOARDFILEID_SUCCESS';
export type GETNEWDASHBOARDFILEID_SUCCESS = typeof GETNEWDASHBOARDFILEID_SUCCESS;
export const GETNEWDASHBOARDFILEID_FAILURE = 'GETNEWDASHBOARDFILEID_FAILURE';
export type GETNEWDASHBOARDFILEID_FAILURE = typeof GETNEWDASHBOARDFILEID_FAILURE;

export const GETNEWDASHBOARDDATA = 'GETNEWDASHBOARDDATA';
export type GETNEWDASHBOARDDATA = typeof GETNEWDASHBOARDDATA;
export const GETNEWDASHBOARDDATA_SUCCESS = 'GETNEWDASHBOARDDATA_SUCCESS';
export type GETNEWDASHBOARDDATA_SUCCESS = typeof GETNEWDASHBOARDDATA_SUCCESS;
export const GETNEWDASHBOARDDATA_FAILURE = 'GETNEWDASHBOARDDATA_FAILURE';
export type GETNEWDASHBOARDDATA_FAILURE = typeof GETNEWDASHBOARDDATA_FAILURE;

export const GETNEWDASHBOARDFILTERCONFIG = 'GETNEWDASHBOARDFILTERCONFIG';
export type GETNEWDASHBOARDFILTERCONFIG = typeof GETNEWDASHBOARDFILTERCONFIG;
export const GETNEWDASHBOARDFILTERCONFIG_SUCCESS = 'GETNEWDASHBOARDFILTERCONFIG_SUCCESS';
export type GETNEWDASHBOARDFILTERCONFIG_SUCCESS = typeof GETNEWDASHBOARDFILTERCONFIG_SUCCESS;
export const GETNEWDASHBOARDFILTERCONFIG_FAILURE = 'GETNEWDASHBOARDFILTERCONFIG_FAILURE';
export type GETNEWDASHBOARDFILTERCONFIG_FAILURE = typeof GETNEWDASHBOARDFILTERCONFIG_FAILURE;

export const GETNEWDASHBOARDFILTERAGGREGATE = 'GETNEWDASHBOARDFILTERAGGREGATE';
export type GETNEWDASHBOARDFILTERAGGREGATE = typeof GETNEWDASHBOARDFILTERAGGREGATE;
export const GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS = 'GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS';
export type GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS = typeof GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS;
export const GETNEWDASHBOARDFILTERAGGREGATE_FAILURE = 'GETNEWDASHBOARDFILTERAGGREGATE_FAILURE';
export type GETNEWDASHBOARDFILTERAGGREGATE_FAILURE = typeof GETNEWDASHBOARDFILTERAGGREGATE_FAILURE;

export const APPLYNEWDASHBOARDFILTER = 'APPLYNEWDASHBOARDFILTER';
export type APPLYNEWDASHBOARDFILTER = typeof APPLYNEWDASHBOARDFILTER;
export const APPLYNEWDASHBOARDFILTER_SUCCESS = 'APPLYNEWDASHBOARDFILTER_SUCCESS';
export type APPLYNEWDASHBOARDFILTER_SUCCESS = typeof APPLYNEWDASHBOARDFILTER_SUCCESS;
export const APPLYNEWDASHBOARDFILTER_FAILURE = 'APPLYNEWDASHBOARDFILTER_FAILURE';
export type APPLYNEWDASHBOARDFILTER_FAILURE = typeof APPLYNEWDASHBOARDFILTER_FAILURE;

export const SAVENEWDASHBOARDSORT = 'SAVENEWDASHBOARDSORT';
export type SAVENEWDASHBOARDSORT = typeof SAVENEWDASHBOARDSORT;

export const SAVENEWDASHBOARDFILTER = 'SAVENEWDASHBOARDFILTER';
export type SAVENEWDASHBOARDFILTER = typeof SAVENEWDASHBOARDFILTER;

export interface GetNewDashboardFileId {
    type: GETNEWDASHBOARDFILEID;
}

export interface GetNewDashboardFileIdSuccess {
    type: GETNEWDASHBOARDFILEID_SUCCESS;
    payload: {
        newDashboardFileIds: number[];
    }
}

export interface GetNewDashboardFileIdFailure {
    type: GETNEWDASHBOARDFILEID_FAILURE;
}

export interface GetNewDashboardData {
    type: GETNEWDASHBOARDDATA;
    payload: {
        newDashboardFileIds: number[];
        sort: string;
        order: string;
    }
}

export interface GetNewDashboardDataSuccess {
    type: GETNEWDASHBOARDDATA_SUCCESS;
    payload: {
        newDashboardData: NewDashboardData[];
    }
}

export interface GetNewDashboardDataFailure {
    type: GETNEWDASHBOARDDATA_FAILURE;
}

export interface GetNewDashboardFilterConfig {
    type: GETNEWDASHBOARDFILTERCONFIG;
}

export interface GetNewDashboardFilterConfigSuccess {
    type: GETNEWDASHBOARDFILTERCONFIG_SUCCESS;
    payload: {
        newDashboardFilterConfig: NewDashboardFilterConfig[];
    }
}

export interface GetNewDashboardFilterConfigFailure {
    type: GETNEWDASHBOARDFILTERCONFIG_FAILURE;
}

export interface GetNewDashboardFilterAggregate {
    type: GETNEWDASHBOARDFILTERAGGREGATE;
    payload: {
        value: string;
        level: number;
        page: string;
        sort: string;
        order: string;
        filter: NewDashboardFilterStructure[];
        segment: string;
        isFilterForwarded: boolean;
    }
}

export interface GetNewDashboardFilterAggregateSuccess {
    type: GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS;
    payload: {
        newDashboardFilterAggregate: NewDashboardFilterAggregate[];
        segment: string;
        value: string;
        level: number;
        filter: NewDashboardFilterStructure[];
        isFilterForwarded: boolean;
    }
}

export interface GetNewDashboardFilterAggregateFailure {
    type: GETNEWDASHBOARDFILTERAGGREGATE_FAILURE;
}
 
export interface ApplyNewDashboardFilter {
    type: APPLYNEWDASHBOARDFILTER;
    payload: {
        sort: string;
        filter: NewDashboardFilterStructure[];
        newDashboardSortedBy: string;
        newDashboardSortOrder: string;
    }
}

export interface ApplyNewDashboardFilterSuccess {
    type: APPLYNEWDASHBOARDFILTER_SUCCESS;
    payload: {
        newDashboardFileIds: number[];
    }
}

export interface ApplyNewDashboardFilterFailure {
    type: APPLYNEWDASHBOARDFILTER_FAILURE;
}

export interface SaveNewDashboardSort {
    type: SAVENEWDASHBOARDSORT;
    payload: {
        newDashboardSortedBy: string;
        newDashboardSortOrder: string;
    }
}

export interface SaveNewDashboardFilter {
    type: SAVENEWDASHBOARDFILTER;
    payload: {
        appliedFilter: NewDashboardFilterStructure[];
    }
}

export type NewDashboardActions =
    GetNewDashboardFileId |
    GetNewDashboardFileIdSuccess |
    GetNewDashboardFileIdFailure |
    GetNewDashboardData |
    GetNewDashboardDataSuccess |
    GetNewDashboardDataFailure |
    GetNewDashboardFilterConfig |
    GetNewDashboardFilterConfigSuccess |
    GetNewDashboardFilterConfigFailure |
    GetNewDashboardFilterAggregate |
    GetNewDashboardFilterAggregateSuccess |
    GetNewDashboardFilterAggregateFailure |
    ApplyNewDashboardFilter |
    ApplyNewDashboardFilterSuccess |
    ApplyNewDashboardFilterFailure |
    SaveNewDashboardSort |
    SaveNewDashboardFilter ;
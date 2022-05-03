import { FilterConfig, AggregateState, AppliedFilters, AggregatesPayload } from "../State/AggregatesState";

export const GETFILTERCONFIG = 'GETFILTERCONFIG';
export type GETFILTERCONFIG = typeof GETFILTERCONFIG;
export const GETFILTERCONFIG_SUCCESS = 'GETFILTERCONFIG_SUCCESS';
export type GETFILTERCONFIG_SUCCESS = typeof GETFILTERCONFIG_SUCCESS;
export const GETFILTERCONFIG_FAILURE = 'GETFILTERCONFIG_FAILURE';
export type GETFILTERCONFIG_FAILURE = typeof GETFILTERCONFIG_FAILURE;

export const GETAGGREGATES = 'GETAGGREGATES';
export type GETAGGREGATES = typeof GETAGGREGATES;
export const GETAGGREGATES_SUCCESS = 'GETAGGREGATES_SUCCESS';
export type GETAGGREGATES_SUCCESS = typeof GETAGGREGATES_SUCCESS;
export const GETAGGREGATES_FAILURE = 'GETAGGREGATES_FAILURE';
export type GETAGGREGATES_FAILURE = typeof GETAGGREGATES_FAILURE;

export const ADDFILTER = 'ADDFILTER';
export type ADDFILTER = typeof ADDFILTER;
export const ADDFILTER_SUCCESS = 'ADDFILTER_SUCCESS';
export type ADDFILTER_SUCCESS = typeof ADDFILTER_SUCCESS;
export const ADDFILTER_FAILURE = 'ADDFILTER_FAILURE';
export type ADDFILTER_FAILURE = typeof ADDFILTER_FAILURE;

export const EXPANDAGGREGATE = 'EXPANDAGGREGATE';
export type EXPANDAGGREGATE = typeof EXPANDAGGREGATE;

export const REMOVEFILTERS = 'REMOVEFILTERS';
export type REMOVEFILTERS = typeof REMOVEFILTERS;

export const FILTERRESULT = 'FILTERRESULT';
export type FILTERRESULT = typeof FILTERRESULT;
export const FILTERRESULT_SUCCESS = 'FILTERRESULT_SUCCESS';
export type FILTERRESULT_SUCCESS = typeof FILTERRESULT_SUCCESS;
export const FILTERRESULT_FAILURE = 'FILTERRESULT_FAILURE';
export type FILTERRESULT_FAILURE = typeof FILTERRESULT_FAILURE;

export const DELETEFILTER = 'DELETEFILTER';
export type DELETEFILTER = typeof DELETEFILTER;

export const INITFILTERS = 'INITFILTERS';
export type INITFILTERS = typeof INITFILTERS;

export const SEARCHFILTER = 'SEARCHFILTER';
export type SEARCHFILTER = typeof SEARCHFILTER;
export const SEARCHFILTER_SUCCESS = 'SEARCHFILTER_SUCCESS';
export type SEARCHFILTER_SUCCESS = typeof SEARCHFILTER_SUCCESS;

export const SAVEAPPLIEDFILTERS = 'SAVEAPPLIEDFILTERS';
export type SAVEAPPLIEDFILTERS = typeof SAVEAPPLIEDFILTERS;

export interface InitFilter {
    type: INITFILTERS;
    payload: {
        appliedFilters: AppliedFilters[];
        sort: string;
    }
}

export interface SearchFilter {
    type: SEARCHFILTER;
    payload: {
        value: string;
        level: number;
        page: string;
        sort: string;
        type: string;
        filter: AppliedFilters[];
        fileId: number[];
        aggregateType: string;
    };
}
export interface SearchFilterSuccess {
    type: SEARCHFILTER_SUCCESS;
    payload: {
        filterResult: AggregateState[]; 
    };
}

export interface AddFilter {
    type: ADDFILTER;
    payload: {
        filters: AppliedFilters[];
        type: string;
        operator: string;
        path: string;
        value: string;
        alias: string;
        sort: string
        page: string;
        window: number;
        pageNumber: number;
        display: boolean;
        permission: boolean;
    }
}

export interface AddFilterSuccess {
    type: ADDFILTER_SUCCESS;
    payload: {
        filters: AppliedFilters[];
    }
}

export interface GetAggregates {
    type: GETAGGREGATES;
    payload: {
        data: AggregatesPayload;
        path: string;
        filter: AppliedFilters[];
        fileId: number[];
    }
}

export interface GetAggregatesSuccess {
    type: GETAGGREGATES_SUCCESS;
    payload: {
        aggregates: AggregateState[];
        path: string;
    }
}

export interface GetAggregatesFailure {
    type: GETAGGREGATES_FAILURE;
}

export interface GetFilterConfig {
    type: GETFILTERCONFIG;
    payload: {
        uniqueFileIds: number[];
        filter: AppliedFilters[];
    };
}

export interface GetFilterConfigSuccess {
    type: GETFILTERCONFIG_SUCCESS;
    payload: {
        config: FilterConfig[];
    };
}

export interface GetFilterConfigFailure {
    type: GETFILTERCONFIG_FAILURE;
}

export interface ExpandAggregate {
    type: EXPANDAGGREGATE;
    payload: {
        name: string;
    };
}

export interface FilterResult {
    type: FILTERRESULT;
    payload: {
        appliedFilters: AppliedFilters[];
        sort: string;
        window: number;
        isLoader: boolean;
        setToDefault: boolean;
    }
}

export interface FilterResultFailure {
    type: FILTERRESULT_FAILURE;
}

export interface RemoveFilters {
    type: REMOVEFILTERS;
}

export interface FilterResultSuccess {
    type: FILTERRESULT_SUCCESS;
    payload: {
        sort: string;
        isResultEmpty: boolean;
        setToDefault: boolean;
    }
}

export interface DeleteFilter {
    type: DELETEFILTER;
    payload: {
        filters: AppliedFilters[];
        path: string;
        sort: string;
        page: string;
        window: number;
        pageNumber: number;
    }
}

export interface SaveAppliedFilters {
    type: SAVEAPPLIEDFILTERS;
    payload: {
        savedFilterArray: string[];
    }
}

export type AggregateActions = ExpandAggregate |
    GetFilterConfig |
    GetFilterConfigFailure |
    GetFilterConfigSuccess |
    GetAggregates |
    GetAggregatesSuccess |
    GetAggregatesFailure |
    AddFilter |
    AddFilterSuccess |
    DeleteFilter |
    FilterResult |
    FilterResultSuccess |
    FilterResultFailure |
    RemoveFilters |
    SearchFilter |
    SearchFilterSuccess |
    InitFilter |
    SaveAppliedFilters;
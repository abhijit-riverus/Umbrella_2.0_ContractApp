import { JurisdictionData, UploadedByData, ContractTypeData, DashboardTableData, DashboardFilterStructure } from "../State/dashboardState";

export const GETDASHBOARDFILEID = 'GETDASHBOARDFILEID';
export type GETDASHBOARDFILEID = typeof GETDASHBOARDFILEID;
export const GETDASHBOARDFILEID_SUCCESS = 'GETDASHBOARDFILEID_SUCCESS';
export type GETDASHBOARDFILEID_SUCCESS = typeof GETDASHBOARDFILEID_SUCCESS;
export const GETDASHBOARDFILEID_FAILURE = 'GETDASHBOARDFILEID_FAILURE';
export type GETDASHBOARDFILEID_FAILURE = typeof GETDASHBOARDFILEID_FAILURE;

export const GETCONTRACTYPE = 'GETCONTRACTYPE';
export type GETCONTRACTYPE = typeof GETCONTRACTYPE;
export const GETCONTRACTYPE_SUCCESS = 'GETCONTRACTYPE_SUCCESS';
export type GETCONTRACTYPE_SUCCESS = typeof GETCONTRACTYPE_SUCCESS;
export const GETCONTRACTYPE_FAILURE = 'GETCONTRACTYPE_FAILURE';
export type GETCONTRACTYPE_FAILURE = typeof GETCONTRACTYPE_FAILURE;

export const GETJURISDICTION = 'GETJURISDICTION';
export type GETJURISDICTION = typeof GETJURISDICTION;
export const GETJURISDICTION_SUCCESS = 'GETJURISDICTION_SUCCESS';
export type GETJURISDICTION_SUCCESS = typeof GETJURISDICTION_SUCCESS;
export const GETJURISDICTION_FAILURE = 'GETJURISDICTION_FAILURE';
export type GETJURISDICTION_FAILURE = typeof GETJURISDICTION_FAILURE;

export const GETUPLOADEDBY = 'GETUPLOADEDBY';
export type GETUPLOADEDBY = typeof GETUPLOADEDBY;
export const GETUPLOADEDBY_SUCCESS = 'GETUPLOADEDBY_SUCCESS';
export type GETUPLOADEDBY_SUCCESS = typeof GETUPLOADEDBY_SUCCESS;
export const GETUPLOADEDBY_FAILURE = 'GETUPLOADEDBY_FAILURE';
export type GETUPLOADEDBY_FAILURE = typeof GETUPLOADEDBY_FAILURE;

export const GETTABLEDATA = 'GETTABLEDATA';
export type GETTABLEDATA = typeof GETTABLEDATA;
export const GETTABLEDATA_SUCCESS = 'GETTABLEDATA_SUCCESS';
export type GETTABLEDATA_SUCCESS = typeof GETTABLEDATA_SUCCESS;
export const GETTABLEDATA_FAILURE = 'GETTABLEDATA_FAILURE';
export type GETTABLEDATA_FAILURE = typeof GETTABLEDATA_FAILURE;

export const APPLYDASHBOARDFILTER = 'APPLYDASHBOARDFILTER';
export type APPLYDASHBOARDFILTER = typeof APPLYDASHBOARDFILTER;
export const APPLYDASHBOARDFILTER_SUCCESS = 'APPLYDASHBOARDFILTER_SUCCESS';
export type APPLYDASHBOARDFILTER_SUCCESS = typeof APPLYDASHBOARDFILTER_SUCCESS;
export const APPLYDASHBOARDFILTER_FAILURE = 'APPLYDASHBOARDFILTER_FAILURE';
export type APPLYDASHBOARDFILTER_FAILURE = typeof APPLYDASHBOARDFILTER_FAILURE;

export const SAVEDASHBOARDFILTERS = 'SAVEDASHBOARDFILTERS';
export type SAVEDASHBOARDFILTERS = typeof SAVEDASHBOARDFILTERS;

export interface GetDashboardFileId {
    type: GETDASHBOARDFILEID;
}

export interface GetDashboardFileIdSuccess {
    type: GETDASHBOARDFILEID_SUCCESS;
    payload: {
        initialFileIds: number[];
    }
}

export interface GetDashboardFileIdFailure {
    type: GETDASHBOARDFILEID_FAILURE;
}

export interface GetContractType {
    type: GETCONTRACTYPE;
    payload: {
        fileIds: number[];
    }
}

export interface GetContractTypeSuccess {
    type: GETCONTRACTYPE_SUCCESS;
    payload: {
        contractTypeData: ContractTypeData[];
    }
}

export interface GetContractTypeFailure {
    type: GETCONTRACTYPE_FAILURE;
}

export interface GetJurisdiction {
    type: GETJURISDICTION;
    payload: {
        fileIds: number[];
    }
}

export interface GetJurisdictionSuccess {
    type: GETJURISDICTION_SUCCESS;
    payload: {
        jurisdictionData: JurisdictionData[];
    }
}

export interface GetJurisdictionFailure {
    type: GETJURISDICTION_FAILURE;
}

export interface GetUploadedBy {
    type: GETUPLOADEDBY;
    payload: {
        fileIds: number[];
    }
}

export interface GetUploadedBySuccess {
    type: GETUPLOADEDBY_SUCCESS;
    payload: {
        uploadedByData: UploadedByData[];
    }
}

export interface GetUploadedByFailure {
    type: GETUPLOADEDBY_FAILURE;
}

export interface GetTableData {
    type: GETTABLEDATA;
    payload: {
        fileIds: number[];
    }
}

export interface GetTableDataSuccess {
    type: GETTABLEDATA_SUCCESS;
    payload: {
        dashboardTableData: DashboardTableData[];
    }
}

export interface GetTableDataFailure {
    type: GETTABLEDATA_FAILURE;
}

export interface ApplyDashboardFilter {
    type: APPLYDASHBOARDFILTER;
    payload: {
        fileIds: number[];
        dashboardFilterStruc: DashboardFilterStructure[];
    }
}

export interface ApplyDashboardFilterSuccess {
    type: APPLYDASHBOARDFILTER_SUCCESS;
    payload: {
        filteredFileIds: number[];
    }
}

export interface ApplyDashboardFilterFailure {
    type: APPLYDASHBOARDFILTER_FAILURE;
}

export interface SaveDashboardFilters {
    type: SAVEDASHBOARDFILTERS;
    payload: {
        savedFilters: string[];
    }
}

export type DashboardActions = 
    GetDashboardFileId |
    GetDashboardFileIdSuccess |
    GetDashboardFileIdFailure |
    GetContractType |
    GetContractTypeSuccess |
    GetContractTypeFailure |
    GetJurisdiction |
    GetJurisdictionSuccess |
    GetJurisdictionFailure |
    GetUploadedBy |
    GetUploadedBySuccess |
    GetUploadedByFailure |
    GetTableData |
    GetTableDataSuccess |
    GetTableDataFailure |
    ApplyDashboardFilter |
    ApplyDashboardFilterFailure |
    ApplyDashboardFilterSuccess |
    SaveDashboardFilters;
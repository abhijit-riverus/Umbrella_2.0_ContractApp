import { ReportsTableData, SavedConfigurationData } from "../State/reportsState";

export const GETALLREPORTSDATA = 'GETALLREPORTSDATA';
export type GETALLREPORTSDATA = typeof GETALLREPORTSDATA;
export const GETALLREPORTSDATA_SUCCESS = 'GETALLREPORTSDATA_SUCCESS';
export type GETALLREPORTSDATA_SUCCESS = typeof GETALLREPORTSDATA_SUCCESS;
export const GETALLREPORTSDATA_FAILURE = 'GETALLREPORTSDATA_FAILURE';
export type GETALLREPORTSDATA_FAILURE = typeof GETALLREPORTSDATA_FAILURE;

export const DELETEREPORT = 'DELETEREPORT';
export type DELETEREPORT = typeof DELETEREPORT;
export const DELETEREPORT_SUCCESS = 'DELETEREPORT_SUCCESS';
export type DELETEREPORT_SUCCESS = typeof DELETEREPORT_SUCCESS;
export const DELETEREPORT_FAILURE = 'DELETEREPORT_FAILURE';
export type DELETEREPORT_FAILURE = typeof DELETEREPORT_FAILURE;

export const SAVEDELETEREPORTDETAILS = 'SAVEDELETEREPORTDETAILS';
export type SAVEDELETEREPORTDETAILS = typeof SAVEDELETEREPORTDETAILS;

export const GETSAVEDCONFIGURATIONDATA = 'GETSAVEDCONFIGURATIONDATA';
export type GETSAVEDCONFIGURATIONDATA = typeof GETSAVEDCONFIGURATIONDATA;
export const GETSAVEDCONFIGURATIONDATA_SUCCESS = 'GETSAVEDCONFIGURATIONDATA_SUCCESS';
export type GETSAVEDCONFIGURATIONDATA_SUCCESS = typeof GETSAVEDCONFIGURATIONDATA_SUCCESS;
export const GETSAVEDCONFIGURATIONDATA_FAILURE = 'GETSAVEDCONFIGURATIONDATA_FAILURE';
export type GETSAVEDCONFIGURATIONDATA_FAILURE = typeof GETSAVEDCONFIGURATIONDATA_FAILURE;

export const DELETESAVEDCONFIGURATION = 'DELETESAVEDCONFIGURATION';
export type DELETESAVEDCONFIGURATION = typeof DELETESAVEDCONFIGURATION;
export const DELETESAVEDCONFIGURATION_SUCCESS = 'DELETESAVEDCONFIGURATION_SUCCESS';
export type DELETESAVEDCONFIGURATION_SUCCESS = typeof DELETESAVEDCONFIGURATION_SUCCESS;
export const DELETESAVEDCONFIGURATION_FAILURE = 'DELETESAVEDCONFIGURATION_FAILURE';
export type DELETESAVEDCONFIGURATION_FAILURE = typeof DELETESAVEDCONFIGURATION_FAILURE;

export const SAVEDELETESAVEDCONFIGDETAILS = 'SAVEDELETESAVEDCONFIGDETAILS';
export type SAVEDELETESAVEDCONFIGDETAILS = typeof SAVEDELETESAVEDCONFIGDETAILS;

export interface GetAllReportsData {
    type: GETALLREPORTSDATA,
    payload:{
        sort: string;
        order:string;
    }
}

export interface GetAllReportsDataSuccess {
    type: GETALLREPORTSDATA_SUCCESS,
    payload: {
        reportsTableData: ReportsTableData[];
    }
}

export interface GetAllReportsDataFailure {
    type: GETALLREPORTSDATA_FAILURE
}

export interface DeleteReport {
    type: DELETEREPORT,
    payload: {
        id: number
    }
}

export interface DeleteReportSuccess {
    type: DELETEREPORT_SUCCESS,
    payload: {
        deleteStatus: number
    }
}

export interface DeleteReportFailure {
    type: DELETEREPORT_FAILURE,
    payload: {
        deleteStatus: number
    }
}

export interface SaveDeleteReportDetails {
    type: SAVEDELETEREPORTDETAILS;
    payload: {
        reportName: string;
        uniqueReportId: number;
    }
}

export interface GetSavedConfigurationData {
    type: GETSAVEDCONFIGURATIONDATA;
    payload: {
        sortBy: string;
        sortOrder: string;
    }
}

export interface GetSavedConfigurationDataSuccess {
    type: GETSAVEDCONFIGURATIONDATA_SUCCESS,
    payload:{
        savedConfigurationData: SavedConfigurationData[];
    }
}

export interface GetSavedConfigurationDataFailure {
    type: GETSAVEDCONFIGURATIONDATA_FAILURE
}

export interface DeleteSavedConfiguration {
    type: DELETESAVEDCONFIGURATION;
    payload: {
        id: number;
        sortBy: string;
        sortOrder: string;
    }
}

export interface DeleteSavedConfigurationSuccess {
    type: DELETESAVEDCONFIGURATION_SUCCESS;
    payload: {
        deleteSavedConfigStatus: number;
    }
}

export interface DeleteSavedConfigurationFailure {
    type: DELETESAVEDCONFIGURATION_FAILURE;
    payload: {
        deleteSavedConfigStatus: number;
    }
}

export interface SaveDeleteSavedConfigDetails {
    type: SAVEDELETESAVEDCONFIGDETAILS;
    payload: {
        savedConfigId: number;
        savedConfigName: string;
    }
}

export type ReportsActions = GetAllReportsData | 
GetAllReportsDataSuccess |
GetAllReportsDataFailure |
DeleteReport |
DeleteReportSuccess |
DeleteReportFailure |
SaveDeleteReportDetails |
GetSavedConfigurationData |
GetSavedConfigurationDataSuccess |
GetSavedConfigurationDataFailure |
DeleteSavedConfiguration |
DeleteSavedConfigurationSuccess |
DeleteSavedConfigurationFailure |
SaveDeleteSavedConfigDetails;
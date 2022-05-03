import { ReportsTableData, SavedConfigurationData } from "../State/reportsState";
import { DELETEREPORT, DeleteReport, DeleteReportFailure, DeleteReportSuccess, DELETEREPORT_FAILURE, DELETEREPORT_SUCCESS, DeleteSavedConfiguration, DELETESAVEDCONFIGURATION, DeleteSavedConfigurationFailure, DeleteSavedConfigurationSuccess, DELETESAVEDCONFIGURATION_FAILURE, DELETESAVEDCONFIGURATION_SUCCESS, GetAllReportsData, GETALLREPORTSDATA, GetAllReportsDataFailure, GetAllReportsDataSuccess, GETALLREPORTSDATA_FAILURE, GETALLREPORTSDATA_SUCCESS, GetSavedConfigurationData, GETSAVEDCONFIGURATIONDATA, GetSavedConfigurationDataFailure, GetSavedConfigurationDataSuccess, GETSAVEDCONFIGURATIONDATA_FAILURE, GETSAVEDCONFIGURATIONDATA_SUCCESS, SAVEDELETEREPORTDETAILS, SaveDeleteReportDetails, SaveDeleteSavedConfigDetails, SAVEDELETESAVEDCONFIGDETAILS } from "./Def";

export default class ReportsActionGenerator {

    public static getAllReportsData(sort: string, order: string): GetAllReportsData {
        return {
            type: GETALLREPORTSDATA,
        payload: {
            sort: sort,
            order: order
        }
        }
    }

    public static getAllReportsDataSuccess(reportsTableData: ReportsTableData[]): GetAllReportsDataSuccess {
        return {
            type: GETALLREPORTSDATA_SUCCESS,
            payload: {
                reportsTableData: reportsTableData
            }
        }
    }

    public static getAllReportsDataFailure(): GetAllReportsDataFailure {
        return {
            type: GETALLREPORTSDATA_FAILURE
        }
    }

    public static deleteReport(id: number): DeleteReport {
        return {
            type: DELETEREPORT,
            payload: {
                id: id
            }
        }
    }

    public static deleteReportSuccess(deleteStatus: number): DeleteReportSuccess {
        return {
            type: DELETEREPORT_SUCCESS,
            payload:{
                deleteStatus: deleteStatus
            }
        }
    }

    public static deleteReportFailure(deleteStatus: number): DeleteReportFailure {
        return {
            type: DELETEREPORT_FAILURE,
            payload:{
                deleteStatus: deleteStatus
            }
        }
    }

    public static saveDeleteReportDetails(reportName: string, uniqueReportId: number): SaveDeleteReportDetails {
        return {
            type: SAVEDELETEREPORTDETAILS,
            payload: {
                reportName: reportName,
                uniqueReportId: uniqueReportId
            }
        };
    }

    public static getSavedConfigurationData(sortBy: string, sortOrder: string): GetSavedConfigurationData {
        return {
            type: GETSAVEDCONFIGURATIONDATA,
            payload: {
                sortBy: sortBy,
                sortOrder: sortOrder
            }
        }
    }

    public static getSavedConfigurationDataSuccess(savedConfigurationData: SavedConfigurationData[]): GetSavedConfigurationDataSuccess {
        return {
            type: GETSAVEDCONFIGURATIONDATA_SUCCESS,
            payload: {
                savedConfigurationData: savedConfigurationData
            }
        }
    }

    public static getSavedConfigurationDataFailure(): GetSavedConfigurationDataFailure {
        return {
            type: GETSAVEDCONFIGURATIONDATA_FAILURE
        }
    }

    public static deleteSavedConfiguration(id: number, sortBy: string, sortOrder: string): DeleteSavedConfiguration {
        return {
            type: DELETESAVEDCONFIGURATION,
            payload:{
                id: id,
                sortBy: sortBy,
                sortOrder: sortOrder
            }
        }
    }

    public static deleteSavedConfigurationSuccess(deleteSavedConfigStatus: number): DeleteSavedConfigurationSuccess {
        return {
            type: DELETESAVEDCONFIGURATION_SUCCESS,
            payload: {
                deleteSavedConfigStatus: deleteSavedConfigStatus
            }
        }
    }

    public static deleteSavedConfigurationFailure(deleteSavedConfigStatus: number): DeleteSavedConfigurationFailure {
        return {
            type: DELETESAVEDCONFIGURATION_FAILURE,
            payload: {
                deleteSavedConfigStatus: deleteSavedConfigStatus
            }
        }
    }

    public static saveDeleteSavedConfigDetails( savedConfigId: number, savedConfigName: string): SaveDeleteSavedConfigDetails {
        return {
            type: SAVEDELETESAVEDCONFIGDETAILS,
            payload: {
                savedConfigId: savedConfigId,
                savedConfigName: savedConfigName
            }
        }
    }

}
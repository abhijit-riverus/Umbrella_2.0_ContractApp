import { GetContractType, GETCONTRACTYPE, GETCONTRACTYPE_SUCCESS, GETCONTRACTYPE_FAILURE, GetContractTypeSuccess, GetContractTypeFailure, GETJURISDICTION, GETJURISDICTION_FAILURE, GETUPLOADEDBY, GETUPLOADEDBY_SUCCESS, GETUPLOADEDBY_FAILURE, GETTABLEDATA, GETTABLEDATA_SUCCESS, GETTABLEDATA_FAILURE, GetJurisdiction, GetJurisdictionSuccess, GetJurisdictionFailure, GetUploadedBy, GetUploadedBySuccess, GetUploadedByFailure, GetTableData, GetTableDataSuccess, GetTableDataFailure, GETJURISDICTION_SUCCESS, GetDashboardFileId, GETDASHBOARDFILEID, GetDashboardFileIdSuccess, GetDashboardFileIdFailure, GETDASHBOARDFILEID_SUCCESS, GETDASHBOARDFILEID_FAILURE, APPLYDASHBOARDFILTER, APPLYDASHBOARDFILTER_SUCCESS, APPLYDASHBOARDFILTER_FAILURE, ApplyDashboardFilter, ApplyDashboardFilterSuccess, ApplyDashboardFilterFailure, SaveDashboardFilters, SAVEDASHBOARDFILTERS } from "./def";
import { JurisdictionData, UploadedByData, ContractTypeData, DashboardTableData, DashboardFilterStructure } from "../State/dashboardState";

export default class DashboardActionGenerator {
    public static getDashboardFileId(): GetDashboardFileId {
        return {
            type: GETDASHBOARDFILEID
        };
    }
    public static getDashboardFileIdSuccess(initialFileIds: number[]): GetDashboardFileIdSuccess {
        return {
            type: GETDASHBOARDFILEID_SUCCESS,
            payload: {
                initialFileIds: initialFileIds
            }
        };
    }
    public static getDashboardFileIdFailure(): GetDashboardFileIdFailure {
        return {
            type: GETDASHBOARDFILEID_FAILURE
        };
    }
    public static getContractType(fileIds: number[]): GetContractType {
        return {
            type: GETCONTRACTYPE,
            payload: {
                fileIds: fileIds
            }
        };
    }
    public static getContractTypeSuccess(contractTypeData: ContractTypeData[]): GetContractTypeSuccess {
        return {
            type: GETCONTRACTYPE_SUCCESS,
            payload: {
                contractTypeData: contractTypeData
            }
        };
    }
    public static getContractTypeFailure(): GetContractTypeFailure {
        return {
            type: GETCONTRACTYPE_FAILURE
        };
    }
    public static getJurisdiction(fileIds: number[]): GetJurisdiction {
        return {
            type: GETJURISDICTION,
            payload: {
                fileIds: fileIds
            }
        };
    }
    public static getJurisdictionSuccess(jurisdictionData: JurisdictionData[]): GetJurisdictionSuccess {
        return {
            type: GETJURISDICTION_SUCCESS,
            payload: {
                jurisdictionData: jurisdictionData
            }
        };
    }
    public static getJurisdictionFailure(): GetJurisdictionFailure {
        return {
            type: GETJURISDICTION_FAILURE
        };
    }
    public static getUploadedBy(fileIds: number[]): GetUploadedBy {
        return {
            type: GETUPLOADEDBY,
            payload: {
                fileIds: fileIds
            }
        };
    }
    public static getUploadedBySuccess(uploadedByData: UploadedByData[]): GetUploadedBySuccess {
        return {
            type: GETUPLOADEDBY_SUCCESS,
            payload: {
                uploadedByData: uploadedByData
            }
        };
    }
    public static getUploadedByFailure(): GetUploadedByFailure {
        return {
            type: GETUPLOADEDBY_FAILURE
        };
    }
    public static getTableData(fileIds: number[]): GetTableData {
        return {
            type: GETTABLEDATA,
            payload: {
                fileIds: fileIds
            }
        };
    }
    public static getTableDataSuccess(dashboardTableData: DashboardTableData[]): GetTableDataSuccess {
        return {
            type: GETTABLEDATA_SUCCESS,
            payload: {
                dashboardTableData: dashboardTableData
            }
        };
    }
    public static getTableDataFailure(): GetTableDataFailure {
        return {
            type: GETTABLEDATA_FAILURE
        };
    }
    public static applyDashboardFilter(fileIds: number[], dashboardFilterStruc: DashboardFilterStructure[]): ApplyDashboardFilter {
        return {
            type: APPLYDASHBOARDFILTER,
            payload: {
                fileIds: fileIds,
                dashboardFilterStruc: dashboardFilterStruc
            }
        };
    }
    public static applyDashboardFilterSuccess(filteredFileIds: number[]): ApplyDashboardFilterSuccess {
        return {
            type: APPLYDASHBOARDFILTER_SUCCESS,
            payload: {
                filteredFileIds: filteredFileIds
            }
        };
    }
    public static applyDashboardFilterFailure(): ApplyDashboardFilterFailure {
        return {
            type: APPLYDASHBOARDFILTER_FAILURE
        };
    }
    public static savedDashboardFilters(savedFilters: string[]): SaveDashboardFilters {
        return {
            type: SAVEDASHBOARDFILTERS,
            payload: {
                savedFilters: savedFilters
            }
        };
    }
}
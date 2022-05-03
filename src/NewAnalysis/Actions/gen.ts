import { LocalNewAnalysisFilterStructure, NewAnalysisData, NewAnalysisFilterAggregate, NewAnalysisFilterConfig, NewAnalysisFilterStructure, NewAnalysisTableConfig } from "../State/newAnalysisState";
import { APPLYNEWANALYSISFILTER, ApplyNewAnalysisFilter, ApplyNewAnalysisFilterFailure, ApplyNewAnalysisFilterSuccess, APPLYNEWANALYSISFILTER_FAILURE, APPLYNEWANALYSISFILTER_SUCCESS, GETNEWANALYSISDATA, GetNewAnalysisData, GetNewAnalysisDataFailure, GetNewAnalysisDataSuccess, GETNEWANALYSISDATA_FAILURE, GETNEWANALYSISDATA_SUCCESS, GetNewAnalysisFileId, GETNEWANALYSISFILEID, GetNewAnalysisFileIdFailure, GetNewAnalysisFileIdSuccess, GETNEWANALYSISFILEID_FAILURE, GETNEWANALYSISFILEID_SUCCESS, GetNewAnalysisFilterAggregate, GETNEWANALYSISFILTERAGGREGATE, GetNewAnalysisFilterAggregateFailure, GetNewAnalysisFilterAggregateSuccess, GETNEWANALYSISFILTERAGGREGATE_FAILURE, GETNEWANALYSISFILTERAGGREGATE_SUCCESS, GETNEWANALYSISFILTERCONFIG, GetNewAnalysisFilterConfig, GetNewAnalysisFilterConfigFailure, GetNewAnalysisFilterConfigSuccess, GETNEWANALYSISFILTERCONFIG_FAILURE, GETNEWANALYSISFILTERCONFIG_SUCCESS, GETNEWANALYSISFILTERCOUNT, GetNewAnalysisFilterCount, GetNewAnalysisFilterCountFailure, GetNewAnalysisFilterCountSuccess, GETNEWANALYSISFILTERCOUNT_FAILURE, GETNEWANALYSISFILTERCOUNT_SUCCESS, GetNewAnalysisInitialFileId, GETNEWANALYSISINITIALFILEID, GetNewAnalysisInitialFileIdFailure, GetNewAnalysisInitialFileIdSuccess, GETNEWANALYSISINITIALFILEID_FAILURE, GETNEWANALYSISINITIALFILEID_SUCCESS, GETNEWANALYSISTABLECONFIG, GetNewAnalysisTableConfig, GetNewAnalysisTableConfigFailure, GetNewAnalysisTableConfigSuccess, GETNEWANALYSISTABLECONFIG_FAILURE, GETNEWANALYSISTABLECONFIG_SUCCESS, SaveNewAnalysisConfiguration, SAVENEWANALYSISCONFIGURATION, SaveNewAnalysisConfigurationFailure, SaveNewAnalysisConfigurationSuccess, SAVENEWANALYSISCONFIGURATION_FAILURE, SAVENEWANALYSISCONFIGURATION_SUCCESS, SaveNewAnalysisCurrency, SAVENEWANALYSISCURRENCY, SaveNewAnalysisFilter, SAVENEWANALYSISFILTER, SAVENEWANALYSISLOCALAPPLIEDFILTER, SaveNewAnalysisLocalAppliedFilter, SAVENEWANALYSISSORT, SaveNewAnalysisSort, UPDATECONFIGURATIONCOUNT, UpdateConfigurationCount, UpdateConfigurationCountFailure, UpdateConfigurationCountSuccess, UPDATECONFIGURATIONCOUNT_FAILURE, UPDATECONFIGURATIONCOUNT_SUCCESS } from "./def";


export default class NewAnalysisActionGenerator {
    public static getNewAnalysisFileId(): GetNewAnalysisFileId {
        return {
            type: GETNEWANALYSISFILEID
        };
    }
    public static getNewAnalysisFileIdSuccess(newAnalysisFileIds: number[]): GetNewAnalysisFileIdSuccess {
        return {
            type: GETNEWANALYSISFILEID_SUCCESS,
            payload: {
                newAnalysisFileIds: newAnalysisFileIds
            }
        };
    }
    public static getNewAnalysisFileIdFailure(): GetNewAnalysisFileIdFailure {
        return {
            type: GETNEWANALYSISFILEID_FAILURE
        };
    }
    public static getNewAnalysisData(newAnalysisFileIds: number[], sort: string, order: string): GetNewAnalysisData {
        return {
            type: GETNEWANALYSISDATA,
            payload: {
                newAnalysisFileIds: newAnalysisFileIds,
                sort: sort,
                order: order
            }
        };
    }
    public static getNewAnalysisDataSuccess(newAnalysisData: NewAnalysisData[]): GetNewAnalysisDataSuccess {
        return {
            type: GETNEWANALYSISDATA_SUCCESS,
            payload: {
                newAnalysisData: newAnalysisData
            }
        };
    }
    public static getNewAnalysisDataFailure(): GetNewAnalysisDataFailure {
        return {
            type: GETNEWANALYSISDATA_FAILURE
        };
    }
    public static getNewAnalysisFilterConfig(): GetNewAnalysisFilterConfig {
        return {
            type: GETNEWANALYSISFILTERCONFIG
        };
    }
    public static getNewAnalysisFilterConfigSuccess(newAnalysisFilterConfig: NewAnalysisFilterConfig[]): GetNewAnalysisFilterConfigSuccess {
        return {
            type: GETNEWANALYSISFILTERCONFIG_SUCCESS,
            payload: {
                newAnalysisFilterConfig: newAnalysisFilterConfig
            }
        };
    }
    public static getNewAnalysisFilterConfigFailure(): GetNewAnalysisFilterConfigFailure {
        return {
            type: GETNEWANALYSISFILTERCONFIG_FAILURE
        };
    }
    public static getNewAnalysisFilterAggregate( value: string, level: number, page: string, sort: string, order: string, filter: NewAnalysisFilterStructure[], segment: string, isFilterForwarded: boolean ): GetNewAnalysisFilterAggregate {
        return {
            type: GETNEWANALYSISFILTERAGGREGATE,
            payload: {
                value: value,
                level: level,
                page: page,
                sort: sort,
                order: order,
                filter: filter,
                segment: segment,
                isFilterForwarded: isFilterForwarded
            }
        };
    }
    public static getNewAnalysisFilterAggregateSuccess(newAnalysisFilterAggregate: NewAnalysisFilterAggregate[], segment: string, value: string, level: number, filter: NewAnalysisFilterStructure[], isFilterForwarded: boolean): GetNewAnalysisFilterAggregateSuccess {
        return {
            type: GETNEWANALYSISFILTERAGGREGATE_SUCCESS,
            payload: {
                newAnalysisFilterAggregate: newAnalysisFilterAggregate,
                segment: segment,
                value: value,
                level: level,
                filter: filter,
                isFilterForwarded: isFilterForwarded
            }
        };
    }
    public static getNewAnalysisFilterAggregateFailure(): GetNewAnalysisFilterAggregateFailure {
        return {
            type: GETNEWANALYSISFILTERAGGREGATE_FAILURE
        };
    }
    public static applyNewAnalysisFilter( sort: string, filter: NewAnalysisFilterStructure[], newAnalysisSortedBy: string, newAnalysisSortOrder: string): ApplyNewAnalysisFilter {
        return {
            type: APPLYNEWANALYSISFILTER,
            payload: {
                sort: sort,
                filter: filter,
                newAnalysisSortedBy: newAnalysisSortedBy,
                newAnalysisSortOrder: newAnalysisSortOrder
            }
        };
    }
    public static applyNewAnalysisFilterSuccess(newAnalysisFileIds: number[]): ApplyNewAnalysisFilterSuccess {
        return {
            type: APPLYNEWANALYSISFILTER_SUCCESS,
            payload: {
                newAnalysisFileIds: newAnalysisFileIds
            }
        };
    }
    public static applyNewAnalysisFilterFailure(): ApplyNewAnalysisFilterFailure {
        return {
            type: APPLYNEWANALYSISFILTER_FAILURE
        };
    }
    public static saveNewAnalysisLocalAppliedFilter(newAnalysisLocalAppliedFilter: LocalNewAnalysisFilterStructure[]): SaveNewAnalysisLocalAppliedFilter {
        return {
            type: SAVENEWANALYSISLOCALAPPLIEDFILTER,
            payload: {
                newAnalysisLocalAppliedFilter: newAnalysisLocalAppliedFilter
            }
        };
    }
    public static getNewAnalysisFilterCount( filter: NewAnalysisFilterStructure[] ): GetNewAnalysisFilterCount {
        return {
            type: GETNEWANALYSISFILTERCOUNT,
            payload: {
                filter: filter
            }
        };
    }
    public static getNewAnalysisFilterCountSuccess(count: number): GetNewAnalysisFilterCountSuccess {
        return {
            type: GETNEWANALYSISFILTERCOUNT_SUCCESS,
            payload: {
                count: count
            }
        };
    }
    public static getNewAnalysisFilterCountFailure(): GetNewAnalysisFilterCountFailure {
        return {
            type: GETNEWANALYSISFILTERCOUNT_FAILURE
        };
    }
    public static saveNewAnalysisSort(newAnalysisSortedBy: string, newAnalysisSortOrder: string): SaveNewAnalysisSort {
        return {
            type: SAVENEWANALYSISSORT,
            payload: {
                newAnalysisSortedBy: newAnalysisSortedBy,
                newAnalysisSortOrder: newAnalysisSortOrder
            }
        };
    }
    public static saveNewAnalysisConfiguration(title: string, description: string, type: string, lastResultCount: number, filter: NewAnalysisFilterStructure[] ): SaveNewAnalysisConfiguration {
        return {
            type: SAVENEWANALYSISCONFIGURATION,
            payload: {
                title: title,
                description: description,
                type: type,
                lastResultCount: lastResultCount,
                filter: filter
            }
        };
    }
    public static saveNewAnalysisConfigurationSuccess(id: number): SaveNewAnalysisConfigurationSuccess {
        return {
            type: SAVENEWANALYSISCONFIGURATION_SUCCESS,
            payload: {
                id: id
            }
        };
    }
    public static saveNewAnalysisConfigurationFailure(): SaveNewAnalysisConfigurationFailure {
        return {
            type: SAVENEWANALYSISCONFIGURATION_FAILURE
        };
    }
    public static updateConfigurationCount(count: number, ssid: number ): UpdateConfigurationCount {
        return {
            type: UPDATECONFIGURATIONCOUNT,
            payload: {
                count: count,
                ssid: ssid
            }
        };
    }
    public static updateConfigurationCountSuccess(id: number): UpdateConfigurationCountSuccess {
        return {
            type: UPDATECONFIGURATIONCOUNT_SUCCESS,
            payload: {
                id: id
            }
        };
    }
    public static updateConfigurationCountFailure(): UpdateConfigurationCountFailure {
        return {
            type: UPDATECONFIGURATIONCOUNT_FAILURE
        };
    }
    public static saveNewAnalysisFilter(appliedFilter: NewAnalysisFilterStructure[]): SaveNewAnalysisFilter {
        return {
            type: SAVENEWANALYSISFILTER,
            payload: {
                appliedFilter: appliedFilter
            }
        };
    }
    public static getNewAnalysisTableConfig(): GetNewAnalysisTableConfig {
        return {
            type: GETNEWANALYSISTABLECONFIG,
        };
    }
    public static getNewAnalysisTableConfigSuccess(newAnalysisTableConfig: NewAnalysisTableConfig[]): GetNewAnalysisTableConfigSuccess {
        return {
            type: GETNEWANALYSISTABLECONFIG_SUCCESS,
            payload: {
                newAnalysisTableConfig:newAnalysisTableConfig
            }
        };
    }
    public static getNewAnalysisTableConfigFailure(): GetNewAnalysisTableConfigFailure {
        return {
            type: GETNEWANALYSISTABLECONFIG_FAILURE
        };
    }
    public static getNewAnalysisInitialFileId(): GetNewAnalysisInitialFileId {
        return {
            type: GETNEWANALYSISINITIALFILEID
        };
    }
    public static getNewAnalysisInitialFileIdSuccess(newAnalysisInitialFileIds: number[]): GetNewAnalysisInitialFileIdSuccess {
        return {
            type: GETNEWANALYSISINITIALFILEID_SUCCESS,
            payload: {
                newAnalysisInitialFileIds: newAnalysisInitialFileIds
            }
        };
    }
    public static getNewAnalysisInitialFileIdFailure(): GetNewAnalysisInitialFileIdFailure {
        return {
            type: GETNEWANALYSISINITIALFILEID_FAILURE
        };
    }
    public static saveNewAnalysisCurrency(currencyName: string, typeName: string ): SaveNewAnalysisCurrency {
        return {
            type: SAVENEWANALYSISCURRENCY,
            payload: {
                currencyName: currencyName,
                typeName: typeName
            }
        };
    }
}
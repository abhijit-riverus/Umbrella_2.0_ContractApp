import { NewDashboardData, NewDashboardFilterAggregate, NewDashboardFilterConfig, NewDashboardFilterStructure } from "../State/newDashboardState";
import { APPLYNEWDASHBOARDFILTER, ApplyNewDashboardFilter, ApplyNewDashboardFilterFailure, ApplyNewDashboardFilterSuccess, APPLYNEWDASHBOARDFILTER_FAILURE, APPLYNEWDASHBOARDFILTER_SUCCESS, GETNEWDASHBOARDDATA, GetNewDashboardData, GetNewDashboardDataFailure, GetNewDashboardDataSuccess, GETNEWDASHBOARDDATA_FAILURE, GETNEWDASHBOARDDATA_SUCCESS, GetNewDashboardFileId, GETNEWDASHBOARDFILEID, GetNewDashboardFileIdFailure, GetNewDashboardFileIdSuccess, GETNEWDASHBOARDFILEID_FAILURE, GETNEWDASHBOARDFILEID_SUCCESS, GetNewDashboardFilterAggregate, GETNEWDASHBOARDFILTERAGGREGATE, GetNewDashboardFilterAggregateFailure, GetNewDashboardFilterAggregateSuccess, GETNEWDASHBOARDFILTERAGGREGATE_FAILURE, GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS, GETNEWDASHBOARDFILTERCONFIG, GetNewDashboardFilterConfig, GetNewDashboardFilterConfigFailure, GetNewDashboardFilterConfigSuccess, GETNEWDASHBOARDFILTERCONFIG_FAILURE, GETNEWDASHBOARDFILTERCONFIG_SUCCESS, SaveNewDashboardFilter, SAVENEWDASHBOARDFILTER, SAVENEWDASHBOARDSORT, SaveNewDashboardSort } from "./def";


export default class NewDashboardActionGenerator {
    public static getNewDashboardFileId(): GetNewDashboardFileId {
        return {
            type: GETNEWDASHBOARDFILEID
        };
    }
    public static getNewDashboardFileIdSuccess(newDashboardFileIds: number[]): GetNewDashboardFileIdSuccess {
        return {
            type: GETNEWDASHBOARDFILEID_SUCCESS,
            payload: {
                newDashboardFileIds: newDashboardFileIds
            }
        };
    }
    public static getNewDashboardFileIdFailure(): GetNewDashboardFileIdFailure {
        return {
            type: GETNEWDASHBOARDFILEID_FAILURE
        };
    }
    public static getNewDashboardData(newDashboardFileIds: number[], sort: string, order: string): GetNewDashboardData {
        return {
            type: GETNEWDASHBOARDDATA,
            payload: {
                newDashboardFileIds: newDashboardFileIds,
                sort: sort,
                order: order
            }
        };
    }
    public static getNewDashboardDataSuccess(newDashboardData: NewDashboardData[]): GetNewDashboardDataSuccess {
        return {
            type: GETNEWDASHBOARDDATA_SUCCESS,
            payload: {
                newDashboardData: newDashboardData
            }
        };
    }
    public static getNewDashboardDataFailure(): GetNewDashboardDataFailure {
        return {
            type: GETNEWDASHBOARDDATA_FAILURE
        };
    }
    public static getNewDashboardFilterConfig(): GetNewDashboardFilterConfig {
        return {
            type: GETNEWDASHBOARDFILTERCONFIG
        };
    }
    public static getNewDashboardFilterConfigSuccess(newDashboardFilterConfig: NewDashboardFilterConfig[]): GetNewDashboardFilterConfigSuccess {
        return {
            type: GETNEWDASHBOARDFILTERCONFIG_SUCCESS,
            payload: {
                newDashboardFilterConfig: newDashboardFilterConfig
            }
        };
    }
    public static getNewDashboardFilterConfigFailure(): GetNewDashboardFilterConfigFailure {
        return {
            type: GETNEWDASHBOARDFILTERCONFIG_FAILURE
        };
    }
    public static getNewDashboardFilterAggregate( value: string, level: number, page: string, sort: string, order: string, filter: NewDashboardFilterStructure[], segment: string, isFilterForwarded: boolean ): GetNewDashboardFilterAggregate {
        return {
            type: GETNEWDASHBOARDFILTERAGGREGATE,
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
    public static getNewDashboardFilterAggregateSuccess(newDashboardFilterAggregate: NewDashboardFilterAggregate[], segment: string, value: string, level: number, filter: NewDashboardFilterStructure[], isFilterForwarded: boolean): GetNewDashboardFilterAggregateSuccess {
        return {
            type: GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS,
            payload: {
                newDashboardFilterAggregate: newDashboardFilterAggregate,
                segment: segment,
                value: value,
                level: level,
                filter: filter,
                isFilterForwarded: isFilterForwarded
            }
        };
    }
    public static getNewDashboardFilterAggregateFailure(): GetNewDashboardFilterAggregateFailure {
        return {
            type: GETNEWDASHBOARDFILTERAGGREGATE_FAILURE
        };
    }
    public static applyNewDashboardFilter( sort: string, filter: NewDashboardFilterStructure[], newDashboardSortedBy: string, newDashboardSortOrder: string): ApplyNewDashboardFilter {
        return {
            type: APPLYNEWDASHBOARDFILTER,
            payload: {
                sort: sort,
                filter: filter,
                newDashboardSortedBy: newDashboardSortedBy,
                newDashboardSortOrder: newDashboardSortOrder
            }
        };
    }
    public static applyNewDashboardFilterSuccess(newDashboardFileIds: number[]): ApplyNewDashboardFilterSuccess {
        return {
            type: APPLYNEWDASHBOARDFILTER_SUCCESS,
            payload: {
                newDashboardFileIds: newDashboardFileIds
            }
        };
    }
    public static applyNewDashboardFilterFailure(): ApplyNewDashboardFilterFailure {
        return {
            type: APPLYNEWDASHBOARDFILTER_FAILURE
        };
    }
    public static saveNewDashboardSort(newDashboardSortedBy: string, newDashboardSortOrder: string): SaveNewDashboardSort {
        return {
            type: SAVENEWDASHBOARDSORT,
            payload: {
                newDashboardSortedBy: newDashboardSortedBy,
                newDashboardSortOrder: newDashboardSortOrder
            }
        };
    }
    
    public static saveNewDashboardFilter(appliedFilter: NewDashboardFilterStructure[]): SaveNewDashboardFilter {
        return {
            type: SAVENEWDASHBOARDFILTER,
            payload: {
                appliedFilter: appliedFilter
            }
        };
    }
}
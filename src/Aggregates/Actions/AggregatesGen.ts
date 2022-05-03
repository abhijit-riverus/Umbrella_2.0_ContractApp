import { GetFilterConfig, GETFILTERCONFIG, GetFilterConfigSuccess, GETFILTERCONFIG_SUCCESS, GetFilterConfigFailure, GETFILTERCONFIG_FAILURE, GetAggregates, GETAGGREGATES, GetAggregatesSuccess, GETAGGREGATES_SUCCESS, GetAggregatesFailure, GETAGGREGATES_FAILURE, AddFilter, ADDFILTER, AddFilterSuccess, ADDFILTER_SUCCESS, ExpandAggregate, EXPANDAGGREGATE, DeleteFilter, DELETEFILTER, FilterResult, FILTERRESULT, FilterResultSuccess, FILTERRESULT_SUCCESS, FilterResultFailure, FILTERRESULT_FAILURE, InitFilter, INITFILTERS, RemoveFilters, REMOVEFILTERS, SearchFilter, SEARCHFILTER, SearchFilterSuccess, SEARCHFILTER_SUCCESS, SAVEAPPLIEDFILTERS, SaveAppliedFilters } from "./AggregatesDef";
import { FilterConfig, AggregateState, AppliedFilters, AggregatesPayload } from "../State/AggregatesState";

export default class AggregatesActionGenerator {
    public static getFilterConfig(uniqueFileIds: number[], filter: AppliedFilters[]): GetFilterConfig {
        return {
            type: GETFILTERCONFIG,
            payload: {
                uniqueFileIds: uniqueFileIds,
                filter: filter
            }
        };
    }
    public static getFilterConfigSuccess(config: FilterConfig[]): GetFilterConfigSuccess {
        return {
            type: GETFILTERCONFIG_SUCCESS,
            payload: {
                config: config
            }
        };
    }
    public static getFilterConfigFailure(): GetFilterConfigFailure {
        return {
            type: GETFILTERCONFIG_FAILURE
        };
    }
    public static searchFilter(value: string, level: number, page: string, sort: string, type: string, filter: AppliedFilters[], fileId: number[], aggregateType: string): SearchFilter {
        return {
            type: SEARCHFILTER,
            payload: {
                value: value,
                level: level,
                page: page,
                sort: sort,
                type: type,
                filter: filter,
                fileId: fileId,
                aggregateType: aggregateType
            }
        };
    }
    public static searchFilterSuccess(filterResult: AggregateState[]): SearchFilterSuccess {
        return {
            type: SEARCHFILTER_SUCCESS,
            payload: {
                filterResult: filterResult
            }
        };
    }
    public static getAggregates(data: AggregatesPayload, filter: AppliedFilters[], path: string, fileId: number[]): GetAggregates {
       return {
            type: GETAGGREGATES,
            payload: {
                data: data,
                filter: filter,
                path: path,
                fileId: fileId
            }
        };
    }
    public static getAggregatesSuccess(aggregates: AggregateState[], path: string): GetAggregatesSuccess {
        return {
            type: GETAGGREGATES_SUCCESS,
            payload: {
                aggregates: aggregates,
                path: path
            }
        };
    }
    public static getAggregatesFailure(): GetAggregatesFailure {
        return {
            type: GETAGGREGATES_FAILURE
        };
    }
    public static addFilter(filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string, sort: string, page: string, window: number, pageNumber: number, display: boolean, permission: boolean): AddFilter {
        return {
            type: ADDFILTER,
            payload: {
                filters: filters,
                path: path,
                type: type,
                operator: operator,
                value: value,
                alias: alias,
                sort: sort,
                page: page,
                window: window,
                pageNumber: pageNumber,
                display: display,
                permission: permission
            }
        };
    }
    public static addFilterSuccess(filters: AppliedFilters[]): AddFilterSuccess {
        return {
            type: ADDFILTER_SUCCESS,
            payload: {
                filters: filters
            }
        };
    }
    public static expandAggregate(name: string): ExpandAggregate {
        return {
            type: EXPANDAGGREGATE,
            payload: {
                name: name
            }
        };
    }
    public static deleteFilter(filters: AppliedFilters[], path: string, sort: string, page: string, window: number, pageNumber: number): DeleteFilter {
        return {
            type: DELETEFILTER,
            payload: {
                filters: filters,
                path: path,
                sort: sort,
                page: page,
                window: window,
                pageNumber: pageNumber
            }
        }
    }
    public static filterResult(filters: AppliedFilters[], sort: string, window: number, isLoader: boolean, setToDefault: boolean): FilterResult {
        return {
            type: FILTERRESULT,
            payload: {
                appliedFilters: filters,
                sort: sort,
                window: window,
                isLoader: isLoader,
                setToDefault: setToDefault
            }
        }
    }
    public static filterResultSuccess(sort: string, isResultEmpty: boolean, setToDefault: boolean): FilterResultSuccess {
        return {
            type: FILTERRESULT_SUCCESS,
            payload: {
                sort: sort,
                isResultEmpty: isResultEmpty,
                setToDefault: setToDefault
            }
        }
    }
    public static filterResultFailure(): FilterResultFailure {
        return {
            type: FILTERRESULT_FAILURE
        }
    }
    public static InitFilter(appliedFilters: AppliedFilters[], sort: string): InitFilter {
        return {
            type: INITFILTERS,
            payload: {
                appliedFilters: appliedFilters,
                sort: sort
            }
        };
    }
    public static removeFilters(): RemoveFilters {
        return {
            type: REMOVEFILTERS
        };
    }
    public static saveAppliedFilters(savedFilterArray: string[]): SaveAppliedFilters {
        return {
            type: SAVEAPPLIEDFILTERS,
            payload: {
                savedFilterArray: savedFilterArray
            }
        };
    }
}
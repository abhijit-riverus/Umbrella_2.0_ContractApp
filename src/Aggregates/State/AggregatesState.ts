export default interface FilterModule {
    aggregates: AggregateState[];
    filterConfig: FilterConfig[];
    appliedFilters: AppliedFilters[];
    expandList: string[];
    expanding: boolean;
    sort: string;
    filterLoader: boolean;
    scrollBottomLoader: boolean;
    filterResult: AggregateState[];
    searchFilterLoader: boolean;
    isFilterResultEmpty: boolean;
    initFilter: boolean;
    setToDefault: boolean;
    savedFilterArray: string[];
}

export interface AppliedFilters {
    i: string;
    o: string;
    v: AppliedFilters[];
    a: string;
}

export interface AggregateState {
    label: string;
    type: string;
    value: string;
    alias: string;
    countValue: number;
    childrenCount: number;
    level: number;
    children: AggregateState[];
    path: string;
}

export interface AggregatesPayload {
    value: string;
    level: number;
    sort: string;
    label: string;
    type: string;
}

export interface FilterConfig {
    orderId: number;
    type: string;
    label: string;
    sort: string;
    baseLevel: number;
}

export function defaultFilterModuleState(): FilterModule {
    return {
        aggregates: [],
        filterConfig: [],
        appliedFilters: [],
        expandList: [],
        expanding: false,
        sort: '',
        filterLoader: false,
        filterResult: [],
        searchFilterLoader: false,
        isFilterResultEmpty: false,
        initFilter: false,
        setToDefault: true,
        savedFilterArray: [],
        scrollBottomLoader: false
    };
}
import FilterModule, { defaultFilterModuleState, AggregateState } from "../State/AggregatesState";
import { AggregateActions, GETFILTERCONFIG, GETFILTERCONFIG_SUCCESS, ADDFILTER_SUCCESS, GETAGGREGATES_SUCCESS, EXPANDAGGREGATE, GETAGGREGATES, GETAGGREGATES_FAILURE, FILTERRESULT_SUCCESS, INITFILTERS, FILTERRESULT, FILTERRESULT_FAILURE, REMOVEFILTERS, SEARCHFILTER, SEARCHFILTER_SUCCESS, SAVEAPPLIEDFILTERS } from "../Actions/AggregatesDef";
import AggregateUtils from "../Utils/utils";

export default function aggregatesReducer(state: FilterModule = defaultFilterModuleState(), action: AggregateActions): FilterModule {
    switch (action.type) {
        case GETFILTERCONFIG: {
            return { ...state, aggregates: [], filterResult: [] };
        }
        case GETFILTERCONFIG_SUCCESS: {
            return { ...state, aggregates: AggregateUtils.generateAggregateSkeleton(action.payload.config), filterConfig: action.payload.config };
        }
        case FILTERRESULT: {
            if (action.payload.isLoader) {
                return { ...state, filterLoader: true, isFilterResultEmpty: false, appliedFilters: action.payload.appliedFilters };
            } else {
                return { ...state, scrollBottomLoader: true, isFilterResultEmpty: false, appliedFilters: action.payload.appliedFilters };
            }
        }
        case FILTERRESULT_SUCCESS: {// isFilterResutEmpty to check whether the filter application yielded empty result so as to show error message on search result page. set this to false on every application
            return { ...state, sort: action.payload.sort, filterLoader: false, scrollBottomLoader: false, isFilterResultEmpty: action.payload.isResultEmpty, initFilter: false };
        }
        case FILTERRESULT_FAILURE: {
            return { ...state, filterLoader: false };
        }
        case ADDFILTER_SUCCESS: {
            return { ...state, appliedFilters: action.payload.filters, initFilter: false };
        }
        case GETAGGREGATES: {
            return { ...state, expanding: true };
        }
        case GETAGGREGATES_SUCCESS: {
            let oldAggregates = state.aggregates.slice(0);
            let newAggregates = establishRelation(oldAggregates, action.payload.aggregates, action.payload.path);
            return { ...state, aggregates: newAggregates, expanding: false };
        }
        case GETAGGREGATES_FAILURE: {
            return { ...state, expanding: false, initFilter: false };
        }
        case REMOVEFILTERS: {
            return { ...state, appliedFilters: [] };
        }
        case EXPANDAGGREGATE: {
            var name = action.payload.name;
            if (name === 'riverus') {
                return { ...state, expandList: [] };
            } else {
                var list = JSON.parse(JSON.stringify(state.expandList)) as string[];
                if (list.indexOf(name) > -1) {
                    list.splice(list.indexOf(name), 1);
                } else {
                    list.push(name);
                }
                return { ...state, expandList: list };
            }
        }
        case INITFILTERS: {
            return { ...state, sort: action.payload.sort, appliedFilters: action.payload.appliedFilters.slice(0), initFilter: true };
        }
        case SEARCHFILTER: {
            return { ...state, searchFilterLoader: true };
        }
        case SEARCHFILTER_SUCCESS: {
            return { ...state, filterResult: action.payload.filterResult, searchFilterLoader: false };
        }
        case SAVEAPPLIEDFILTERS: {
            return { ...state, savedFilterArray: action.payload.savedFilterArray }
        }
        default: return state;
    }
}

var count = 0;
function establishRelation(currentAggregates: AggregateState[], newAggregate: AggregateState[], path: string) {
    var returnAggregates: AggregateState[] = currentAggregates;
    if (path.includes('//')) { //For recursively pushing children inside aggregates.
        let toSearch = path.split('//')[count];
        let index = currentAggregates.findIndex((el) => { return el.value === toSearch })
        if (index > -1) {
            if (returnAggregates[index].level === 0) {
                returnAggregates[index].children = newAggregate;
            } else {
                count++;
                establishRelation(returnAggregates[index].children, newAggregate, path)
            }
        }
        count = 0;
    } else {
        let index = currentAggregates.findIndex((el) => { return el.value === path })
        if (index > -1) {
            currentAggregates[index].children = newAggregate;
            returnAggregates = currentAggregates;
        }
    }
    return returnAggregates;
}
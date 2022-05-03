import { filterForBiExists } from "../../NewAnalysis/Utils/newAnalysisUtils";
import {  APPLYNEWDASHBOARDFILTER, APPLYNEWDASHBOARDFILTER_SUCCESS, GETNEWDASHBOARDDATA, GETNEWDASHBOARDDATA_SUCCESS, GETNEWDASHBOARDFILEID, GETNEWDASHBOARDFILEID_SUCCESS, GETNEWDASHBOARDFILTERAGGREGATE, GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS, GETNEWDASHBOARDFILTERCONFIG_SUCCESS, NewDashboardActions, SAVENEWDASHBOARDSORT } from "../Actions/def";
import NewDashboardState, { defaultNewDashboardState } from "../State/newDashboardState";
import { getFilterFromFilterArrayDashboard } from "../Utils/newDashboardUtils";



export default function newDashboardReducer(state: NewDashboardState = defaultNewDashboardState(), action: NewDashboardActions): NewDashboardState {
    switch (action.type) {
        case GETNEWDASHBOARDFILEID:{
            return { ...state, newDashboardLoader: true, newDashboardDataLoader: true};
        }
        case GETNEWDASHBOARDFILEID_SUCCESS: {
            return { ...state, newDashboardFileIds: action.payload.newDashboardFileIds, newDashboardInitialFileIds: action.payload.newDashboardFileIds };
        }
        case GETNEWDASHBOARDDATA:{
            return { ...state, newDashboardDataLoader: true, newDashboardLoader: false };
        }
        case GETNEWDASHBOARDDATA_SUCCESS: {
            return { ...state, newDashboardData: action.payload.newDashboardData, newDashboardLoader: false, newDashboardDataLoader: false };
        }
        case GETNEWDASHBOARDFILTERCONFIG_SUCCESS: {
            return { ...state, newDashboardFilterConfig: action.payload.newDashboardFilterConfig };
        }
        case GETNEWDASHBOARDFILTERAGGREGATE: {
            if (action.payload.segment === 'tags' && action.payload.value === 'type' && action.payload.level === 0) {
                return { ...state, typeTagsAggregateLoader: true };
            }else if (action.payload.segment === 'party' && action.payload.value === 'name' && action.payload.level === 0) {
                return { ...state, partyAggregateLoader: true };
            } else if (action.payload.segment === 'term' && action.payload.value === 'end date' && action.payload.level === 0) {
                return {...state, endDateAggregateLoader: true};
            } else {
                return { ...state };
            }
        }
        case GETNEWDASHBOARDFILTERAGGREGATE_SUCCESS: {
           if (action.payload.segment === 'tags' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, tagsAggregate: action.payload.newDashboardFilterAggregate };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'type' && action.payload.level === 0) {
                return { ...state, typeTagsAggregateValues: action.payload.newDashboardFilterAggregate, typeTagsAggregateLoader: false };
            } else if (action.payload.segment === 'party' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, partyAggregate: action.payload.newDashboardFilterAggregate };
            } else if (action.payload.segment === 'party' && action.payload.value === 'name' && action.payload.level === 0) {
                return { ...state, partyAggregateValues: action.payload.newDashboardFilterAggregate, partyAggregateLoader: false };
            } else if (action.payload.segment === 'term' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, termAggregate: action.payload.newDashboardFilterAggregate };
            } else if (action.payload.segment === 'term' && action.payload.value === 'end date' && action.payload.level === 0) {
                let lastElementIndex = action.payload.newDashboardFilterAggregate.length - 1;
                let localMin: string = action.payload.newDashboardFilterAggregate[0].value;
                let localMax: string = action.payload.newDashboardFilterAggregate[lastElementIndex].value;
                if(action.payload.filter.length > 0 && filterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){ 
                    localMin = getFilterFromFilterArrayDashboard('>=', action.payload.segment, action.payload.value, action.payload.filter);
                    localMax = getFilterFromFilterArrayDashboard('<=',  action.payload.segment, action.payload.value, action.payload.filter);
                    return{ ...state, endDateLeftThumb: localMin, endDateRightThumb: localMax, endDateAggregateLoader: false };
                } else {
                    return { ...state, endDateAggregateValues: action.payload.newDashboardFilterAggregate, endDateMinValue: localMin, endDateMaxValue: localMax, endDateLeftThumb: localMin, endDateRightThumb: localMax, endDateAggregateLoader: false };
                }
            } else {
                return { ...state };
            }
        }
        case APPLYNEWDASHBOARDFILTER: {
            return { ...state, appliedFilter: action.payload.filter, newDashboardDataLoader: true, partyAggregateLoader: true,endDateAggregateLoader: true, typeTagsAggregateLoader: true };
        }
        case APPLYNEWDASHBOARDFILTER_SUCCESS: {
            return { ...state, newDashboardFileIds: action.payload.newDashboardFileIds, newDashboardDataLoader: false };
        }
        case SAVENEWDASHBOARDSORT: {
            return { ...state, newDashboardSortedBy: action.payload.newDashboardSortedBy, newDashboardSortOrder: action.payload.newDashboardSortOrder };
        }
        default: return state;
    }
}
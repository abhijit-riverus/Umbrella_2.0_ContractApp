import { getNormalizedDateToDateString } from "../../Utils/DataModifierUtil/dataModUtil";
import { appliedFiltersAliasDictionary } from "../../Utils/GeneralUtil/genUtils";
import { NewDashboardFilterAggregate, NewDashboardFilterConfig, NewDashboardFilterStructure } from "../State/newDashboardState";


export function filterForBiExistsDashboard(clauseName: string ,biName: string, filter: NewDashboardFilterStructure[]){
    let biExistsInFilter: boolean = false;
    for(let k = 0; k < filter.length; k++){
        if(clauseName === filter[k].i){
            if(biName === filter[k].v[0].i){
                biExistsInFilter = true;
                break;
            }
        }
    }
    return biExistsInFilter;
}

export function getFilterFromFilterArrayDashboard(operatorString: string, clauseName: string, biName: string, filterArray: NewDashboardFilterStructure[]){
    let filterValue: string = '';
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === clauseName && filterArray[k].v[0].i === biName && filterArray[k].v[0].v[0].r === operatorString ){
            filterValue = filterArray[k].v[0].v[0].i;
        }
    }
    return filterValue;
}

export function getNewDashboardSearchStrings(filterArray: NewDashboardFilterStructure[]){
    let tempSearchStrings: string[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content'){
            tempSearchStrings.push(filterArray[k].v[0].a);
        }
    }
    return tempSearchStrings;
}

export function iterateNewDashboardFilter(analysisFilters: NewDashboardFilterStructure, iterativeString: string): string{
    //recursive
    let tempIterativeString = iterativeString;
    if(analysisFilters.v.length >= 0){
        if (analysisFilters.l === 0) {
            tempIterativeString += analysisFilters.a; //datapoint
        } else if (analysisFilters.l === 1) {
            tempIterativeString += " | " + analysisFilters.a; //clause
        } else if(analysisFilters.l === 2) { 
            if(analysisFilters.i.toLocaleLowerCase() === 'yes' || analysisFilters.i.toLocaleLowerCase() === 'no'){
                tempIterativeString += " | " + appliedFiltersAliasDictionary[analysisFilters.i];    
            }else {
                let operator = analysisFilters.r;
                if(operator === "~*"){
                    operator = appliedFiltersAliasDictionary["~*"];
                }else if (operator === '='){
                    operator = '';
                    tempIterativeString += " |";
                }
                
                tempIterativeString +=  " " + operator + " " + analysisFilters.a;
            }
        } else if( analysisFilters.l === 3) { 
            let operator: string = analysisFilters.r;
            tempIterativeString += " " + operator + " " + analysisFilters.a;
        }
        if(analysisFilters.v.length > 0){
            return iterateNewDashboardFilter(analysisFilters.v[0], tempIterativeString);
        }
    }
    return tempIterativeString;
}

export function generateNewDashboardSearchFilter(searchTerm: string){
    let tempNewDashboardSearchFilter: NewDashboardFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    tempNewDashboardSearchFilter = {
        i: 'main_search_content',
        a: 'Search',
        o: 'AND',
        r: '=',
        l: 0,
        v: [
            {
                i: searchTerm,
                a: searchTerm,
                o: 'AND',
                r: '=',
                l: 1,
                v: []
            }
        ]
    }
    return tempNewDashboardSearchFilter;
}

export function addOrReplaceNewDashboardSearchFilters(filter: NewDashboardFilterStructure, filterArray: NewDashboardFilterStructure[]){
    let tempFilterArray: NewDashboardFilterStructure[] = [];
    
    let searchFilterExists: boolean = false;
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content' && filterArray[k].i === filter.i 
            && filterArray[k].v[0].i.toLowerCase() === filter.v[0].i.toLowerCase() ){
                searchFilterExists = true;
                tempFilterArray.push(filterArray[k]);
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    if(searchFilterExists === false){
        tempFilterArray.push(filter);
    }
    return tempFilterArray;
}

export function removeNewDashboardSearchFilter(searchTerm: string, filterArray: NewDashboardFilterStructure[]){
    let tempFilterArray: NewDashboardFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content' && filterArray[k].v[0].i === searchTerm ){
                continue;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    return tempFilterArray;
}

export function removeAllNewDashboardSearchFilters(filterArray: NewDashboardFilterStructure[]){
    let tempFilterArray: NewDashboardFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content'){
                continue;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    return tempFilterArray;
}

export function getConfigForClauseDashboard(clauseName: string, configComponent: NewDashboardFilterConfig[]){
    let configForClause: NewDashboardFilterConfig = {
        type: '',
        alias: '',
        orderid: -1,
        baseLevel: -1,
        sort: '',
        orderby: ''
    }
    for(let i = 0; i < configComponent.length; i++){
        if(configComponent[i].type === clauseName){
            configForClause = configComponent[i];
            break;
        }
    }
    return configForClause;
}

export function getChildFromAggregateDashboard(biName: string, parentAggregate: NewDashboardFilterAggregate[]){
    let childAggregate: NewDashboardFilterAggregate = {
        value: '',
        alias: '',
        operator: '',
        label: '',
        type: '',
        outputLevel: -1,
        flag: false,
        count: '',
        childrenCount: ''
    }

    for(let i = 0; i < parentAggregate.length; i++){
        if(biName === parentAggregate[i].value){
            childAggregate = parentAggregate[i];
            break;
        }
    }
    return childAggregate;
}

export function addOrRemoveDashboardFilter(filter: NewDashboardFilterStructure, filterArray: NewDashboardFilterStructure[]){
    let tempFilterArray: NewDashboardFilterStructure[] = [];
    let filterExists: boolean = false;
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === filter.i 
            && filterArray[k].v[0].i === filter.v[0].i 
            && filterArray[k].v[0].v[0].i === filter.v[0].v[0].i ){
                filterExists = true;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    if(filterExists === false){
        tempFilterArray.push(filter);
    }
    return tempFilterArray;
}

export function generateNewDashboardFilter(aggregate: NewDashboardFilterAggregate, parentAggregate: NewDashboardFilterAggregate, configComponent: NewDashboardFilterConfig){
    let tempLocalNewDashboardFilter: NewDashboardFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    if(configComponent.type === 'clause'){
        tempLocalNewDashboardFilter = {
            i: aggregate.value,
            a: aggregate.alias,
            o: 'AND',
            r: '=',
            l: 0,
            v: [
                {
                    i: configComponent.type,
                    a: configComponent.alias,
                    o: 'AND',
                    r: '=',
                    l: 1,
                    v: [
                        {
                            i: parentAggregate.value,
                            a: parentAggregate.alias,
                            o: 'AND',
                            r: '=', //later change operator based on date/boolean/number/number_currency/number_period
                            l: 2,
                            v: []
                        }
                    ]
                }
            ]
        }
    }else {
        tempLocalNewDashboardFilter = {
            i: configComponent.type,
            a: configComponent.alias,
            o: 'AND',
            r: '=',
            l: 0,
            v: [
                {
                    i: parentAggregate.value,
                    a: parentAggregate.alias,
                    o: 'AND',
                    r: '=',
                    l: 1,
                    v: [
                        {
                            i: aggregate.value,
                            a: aggregate.alias,
                            o: 'AND',
                            r: '=', //later change operator based on date/boolean/number/number_currency/number_period
                            l: 2,
                            v: []
                        }
                    ]
                }
            ]
        }
    }
    return tempLocalNewDashboardFilter;
}

export function isFilterApplied(aggregate: NewDashboardFilterAggregate, parentAggregate: NewDashboardFilterAggregate, appliedFilter: NewDashboardFilterStructure[], configComponent: NewDashboardFilterConfig){
    let isFilterApplied: boolean = false;
    for(let k = 0; k < appliedFilter.length; k++){
        if(appliedFilter[k].i !== 'main_search_content'){
            if(configComponent.type === 'clause'){
                if(aggregate.value === appliedFilter[k].i && configComponent.type === appliedFilter[k].v[0].i && parentAggregate.value === appliedFilter[k].v[0].v[0].i){
                    isFilterApplied = true;
                    break;
                }
            } else {
                if(aggregate.type === appliedFilter[k].i && parentAggregate.value === appliedFilter[k].v[0].i && aggregate.value === appliedFilter[k].v[0].v[0].i ){
                    isFilterApplied = true;
                    break;
                }
            }
            
        }
        
    }
    return isFilterApplied;
}

export function generateNewDashboardDateFilter(aggregate: NewDashboardFilterAggregate, parentAggregate: NewDashboardFilterAggregate, configComponent: NewDashboardFilterConfig, operatorValue: string){
    let tempLocalNewDashboardFilter: NewDashboardFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    tempLocalNewDashboardFilter = {
        i: configComponent.type,
        a: configComponent.alias,
        o: 'AND',
        r: '=',
        l: 0,
        v: [
            {
                i: parentAggregate.value,
                a: parentAggregate.alias,
                o: 'AND',
                r: '=',
                l: 1,
                v: [
                    {
                        i: aggregate.value,
                        a: getNormalizedDateToDateString(aggregate.value),
                        o: 'AND',
                        r: operatorValue, //later change operator based on date/boolean/number/number_currency/number_period
                        l: 2,
                        v: []
                    }
                ]
            }
        ]
    }
    return tempLocalNewDashboardFilter;
}


export function addOrReplaceDashboardFilter(filter: NewDashboardFilterStructure, filterArray: NewDashboardFilterStructure[]){
    let tempFilterArray: NewDashboardFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === filter.i 
            && filterArray[k].v[0].i === filter.v[0].i 
            && filterArray[k].v[0].v[0].r === filter.v[0].v[0].r ){
               continue;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    tempFilterArray.push(filter);
    return tempFilterArray;
}
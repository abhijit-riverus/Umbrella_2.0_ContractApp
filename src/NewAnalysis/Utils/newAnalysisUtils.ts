import { getNormalizedDateToDateString } from "../../Utils/DataModifierUtil/dataModUtil";
import { appliedFiltersAliasDictionary } from "../../Utils/GeneralUtil/genUtils";
import { LocalNewAnalysisFilterStructure, NewAnalysisFilterAggregate, NewAnalysisFilterConfig, NewAnalysisFilterStructure, NewAnalysisTableConfig } from "../State/newAnalysisState";

export function isFilterActive(aggregate: NewAnalysisFilterAggregate, parentAggregate: NewAnalysisFilterAggregate, newAnalysisLocalAppliedFilter:  LocalNewAnalysisFilterStructure[]) {
    let isFilterActive = false;
    for(let i = 0; i < newAnalysisLocalAppliedFilter.length; i++){
        if(newAnalysisLocalAppliedFilter[i].clauseLabel === aggregate.label && newAnalysisLocalAppliedFilter[i].biValue === parentAggregate.value && newAnalysisLocalAppliedFilter[i].filteredValue === aggregate.value){
            return true;
        }
    }
    return isFilterActive;
}

export function isFilterApplied(aggregate: NewAnalysisFilterAggregate, parentAggregate: NewAnalysisFilterAggregate, appliedFilter: NewAnalysisFilterStructure[], configComponent: NewAnalysisFilterConfig){
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

export function getLocalNewAnalysisFilterValue(filterAggregate: NewAnalysisFilterAggregate, parentFilterAggregate: NewAnalysisFilterAggregate){
    let newAnalysisLocalAnalysis: LocalNewAnalysisFilterStructure = {
        clauseLabel: filterAggregate.label,
        biValue: parentFilterAggregate.value,
        filteredValue: filterAggregate.value,
        operatorValue: filterAggregate.operator
    }
    return newAnalysisLocalAnalysis;
}

export function addOrRemoveNewAnalysisLocalFilter(localFilterValue: LocalNewAnalysisFilterStructure, newAnalysisLocalAppliedFilter: LocalNewAnalysisFilterStructure[]){
    let tempLocalNewAnalysisFilter: LocalNewAnalysisFilterStructure[] = [];
    let filterExists: boolean = false;
    for(let i = 0; i < newAnalysisLocalAppliedFilter.length; i++){
        if(localFilterValue.filteredValue === newAnalysisLocalAppliedFilter[i].filteredValue && localFilterValue.biValue === newAnalysisLocalAppliedFilter[i].biValue && localFilterValue.clauseLabel === newAnalysisLocalAppliedFilter[i].clauseLabel){
            filterExists = true;
        } else {
            tempLocalNewAnalysisFilter.push(newAnalysisLocalAppliedFilter[i]);
        }
    }
    if(filterExists === false){
        tempLocalNewAnalysisFilter.push(localFilterValue);
    }
    return tempLocalNewAnalysisFilter;
}

export function generateNewAnalysisFilter(aggregate: NewAnalysisFilterAggregate, parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig){
    let tempLocalNewAnalysisFilter: NewAnalysisFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    if(configComponent.type === 'clause'){
        tempLocalNewAnalysisFilter = {
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
        tempLocalNewAnalysisFilter = {
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
    return tempLocalNewAnalysisFilter;
}

export function addOrRemoveAnalysisFilter(filter: NewAnalysisFilterStructure, filterArray: NewAnalysisFilterStructure[]){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
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

export function getConfigForClause(clauseName: string, configComponent: NewAnalysisFilterConfig[]){
    let configForClause: NewAnalysisFilterConfig = {
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

export function getChildFromAggregate(biName: string, parentAggregate: NewAnalysisFilterAggregate[]){
    let childAggregate: NewAnalysisFilterAggregate = {
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

export function generateNewAnalaysisSearchFilter(searchTerm: string){
    let tempNewAnalysisSearchFilter: NewAnalysisFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    tempNewAnalysisSearchFilter = {
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
    return tempNewAnalysisSearchFilter;
}

export function addOrReplaceNewAnalysisSearchFilters(filter: NewAnalysisFilterStructure, filterArray: NewAnalysisFilterStructure[]){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
    
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

export function removeNewAnalysisSearchFilter(searchTerm: string, filterArray: NewAnalysisFilterStructure[]){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content' && filterArray[k].v[0].i === searchTerm ){
                continue;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    return tempFilterArray;
}

export function removeAllNewAnalysisSearchFilters(filterArray: NewAnalysisFilterStructure[]){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content'){
                continue;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    return tempFilterArray;
}

export function getNewAnalysisSearchStrings(filterArray: NewAnalysisFilterStructure[]){
    let tempSearchStrings: string[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === 'main_search_content'){
            tempSearchStrings.push(filterArray[k].v[0].a);
        }
    }
    return tempSearchStrings;
}

export function iterateNewAnalysisFilter(analysisFilters: NewAnalysisFilterStructure, iterativeString: string): string{
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
            return iterateNewAnalysisFilter(analysisFilters.v[0], tempIterativeString);
        }
    }
    return tempIterativeString;
}

export function addOrRemoveNewTableConfigDatapoint( newAnalysisTableConfig: NewAnalysisTableConfig , selectedDatapoints : string[]){
    let tempSelectedDatapoints: string[] = [];
    let exists: boolean =  false;
    for(let i = 0; i < selectedDatapoints.length; i++ ){
        if(selectedDatapoints[i] === newAnalysisTableConfig.item){
            exists = true;
        } else {
            tempSelectedDatapoints.push(selectedDatapoints[i]);
        }
    }
    if(exists === false){
        tempSelectedDatapoints.push(newAnalysisTableConfig.item);
    }
    return tempSelectedDatapoints;
}

export function filterForBiExists(clauseName: string, biName: string, filter: NewAnalysisFilterStructure[]){
    let biExistsInFilter: boolean = false;
    for(let k = 0; k < filter.length; k++){
        if(clauseName === 'clause'){
            if(clauseName === filter[k].v[0].i && biName === filter[k].v[0].v[0].i){
                biExistsInFilter = true;
                break;
            }
        } else {
            if(clauseName === filter[k].i && biName === filter[k].v[0].i){
                biExistsInFilter = true;
                break;
            }
        }
        
    }
    return biExistsInFilter;
}

export function amountFilterForBiExists(clauseName: string, currencyName: string, filter: NewAnalysisFilterStructure[]){
    let biExistsInFilter: boolean = false;
    for(let k = 0; k < filter.length; k++){
        if(clauseName === filter[k].i){
            if(currencyName === filter[k].v[0].v[0].i){
                biExistsInFilter = true;
                break;
            }
        }
    }
    return biExistsInFilter;
}


export function generateNewAnalysisDateFilter(aggregate: NewAnalysisFilterAggregate, parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig, operatorValue: string){
    let tempLocalNewAnalysisFilter: NewAnalysisFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    tempLocalNewAnalysisFilter = {
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
    return tempLocalNewAnalysisFilter;
}

export function addOrReplaceAnalysisFilter(filter: NewAnalysisFilterStructure, filterArray: NewAnalysisFilterStructure[]){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
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

export function addOrReplaceAmountAnalysisFilter(filter: NewAnalysisFilterStructure, filterArray: NewAnalysisFilterStructure[]){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === filter.i 
            && filterArray[k].v[0].i === filter.v[0].i 
            && filterArray[k].v[0].v[0].v[0].r === filter.v[0].v[0].v[0].r ){
               continue;
        } else {
            tempFilterArray.push(filterArray[k]);
        }
    }
    tempFilterArray.push(filter);
    return tempFilterArray;
}


export function getFilterFromFilterArray(operatorString: string, clauseName: string, biName: string, filterArray: NewAnalysisFilterStructure[]){
    let filterValue: string = '';
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === clauseName && filterArray[k].v[0].i === biName && filterArray[k].v[0].v[0].r === operatorString ){
            filterValue = filterArray[k].v[0].v[0].i;
        }
    }
    return filterValue;
}

export function getAmountFilterFromFilterArray(operatorString: string, clauseName: string, currencyName: string, filterArray: NewAnalysisFilterStructure[]){
    let filterValue: string = '';
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].i === clauseName && filterArray[k].v[0].v[0].i === currencyName && filterArray[k].v[0].v[0].v[0].r === operatorString ){
            filterValue = filterArray[k].v[0].v[0].v[0].i;
        }
    }
    return filterValue;
}

export function generateNewAnalysisAmountFilter(amountValue: string, currencyValue: string, parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig, operatorValue: string){
    let tempLocalNewAnalysisFilter: NewAnalysisFilterStructure = { i: '', a: '', o: 'AND', r: '=', l: 0, v: [] };
    tempLocalNewAnalysisFilter = {
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
                        i: currencyValue,
                        a: currencyValue,
                        o: 'AND',
                        r: '=', 
                        l: 2,
                        v: [
                            {
                                i: amountValue,
                                a: amountValue,
                                o: 'AND',
                                r: operatorValue, 
                                l: 3,
                                v: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return tempLocalNewAnalysisFilter;
}

export function getMaxNumberFromAggregate(aggregate: NewAnalysisFilterAggregate[]){
    let maxValue: number = -1;
    let currentVal: number = -1;
    let maxString: string = '100';
    if(aggregate.length > 0){
        maxValue = Number(aggregate[0].value);
        maxString = aggregate[0].value;
        for(let i = 0; i < aggregate.length; i++){
            currentVal = Number(aggregate[i].value);
            if(currentVal > maxValue){
                maxValue = currentVal;
                maxString = aggregate[i].value;
            }
        }
    }
    return maxString;
}

export function getMinNumberFromAggregate(aggregate: NewAnalysisFilterAggregate[]){
    let minValue: number = -1;
    let currentVal: number = -1;
    let minString: string = '0';
    if(aggregate.length > 0){
        minValue = Number(aggregate[0].value);
        minString = aggregate[0].value;
        for(let i = 0; i < aggregate.length; i++){
            currentVal = Number(aggregate[i].value);
            if(currentVal < minValue){
                minValue = currentVal;
                minString = aggregate[i].value;
            }
        }
    }
    return minString;
}

export function getCurrencyValueFromFilterArray( biName: string, parentClause: string, filterArray: NewAnalysisFilterStructure[]){
    let currencyValue: string = '₹ Indian Rupee';
    for(let k = 0; k < filterArray.length; k++){
        if(parentClause === filterArray[k].i && biName === filterArray[k].v[0].i){
            currencyValue = filterArray[k].v[0].v[0].i;
            break;
        }
    }
    return currencyValue;
}

export function removeNewAnalysisFilterForBi(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig, filterArray: NewAnalysisFilterStructure[] ){
    let tempFilterArray: NewAnalysisFilterStructure[] = [];
    for(let k = 0; k < filterArray.length; k++){
        if(filterArray[k].v[0].i === 'clause' && filterArray[k].v[0].v[0].i === parentAggregate.value){
            continue;
        } else if(filterArray[k].i === configComponent.type && filterArray[k].v[0].i === parentAggregate.value){
            continue;          
        }
        tempFilterArray.push(filterArray[k]);
    }
    return tempFilterArray;
}
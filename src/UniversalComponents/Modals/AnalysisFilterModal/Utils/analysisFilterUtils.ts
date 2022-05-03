import { AnalysisFilterStructure, LocalFilterStructure } from "../../../../Analysis/State/analysisState";


export function pushAnalysisFilter(tempLocalFilterStructure: LocalFilterStructure, appliedFiltersList: LocalFilterStructure[]){
    let editedAppliedFiltersList: LocalFilterStructure[] = [];
    let tempFilterStructure: LocalFilterStructure = {
        filterId: 0,
        selectedDatapoint: {alias: '', value: ''},
        selectedClause: {alias: '', value: ''},
        selectedOperator:{ operatorAlias: '', rule: '', operatorValue: '' },
        selectedFilterMode: {alias: 'Contain', value: 'AND'},
        selectedClauseType: '',
        textValue: '',
        currencyType: '',
        currencyNumber: '',
        periodType: '',
        periodNumber: '',
        dateValue: '',
        selectedListValue: {alias: '', value: ''},
        isSaved: false
    };
    if(appliedFiltersList.length > 0){
        for(let i = 0; i < appliedFiltersList.length; i++){
            if(appliedFiltersList[i].filterId === tempLocalFilterStructure.filterId){
                tempFilterStructure = tempLocalFilterStructure;
            }else {
                tempFilterStructure = appliedFiltersList[i];
            }
            editedAppliedFiltersList.push(tempFilterStructure);
        }
    }else{
        editedAppliedFiltersList.push(tempFilterStructure);
    }
    return editedAppliedFiltersList;
}


export function changeFilterEditStatus(appliedFilter: LocalFilterStructure, appliedFiltersList: LocalFilterStructure[]){
    let editedAppliedFiltersList: LocalFilterStructure[] = appliedFiltersList;
    for(let i = 0; i < appliedFiltersList.length; i++){
        if(appliedFiltersList[i].filterId === appliedFilter.filterId){
            editedAppliedFiltersList[i].isSaved = !appliedFiltersList[i].filterId;
        }
    }
    return editedAppliedFiltersList;
}

export function checkAppliedFiltersEditingStatus(appliedFiltersList: LocalFilterStructure[]){
    let editingStatus: boolean = false;
    let tempAppliedFilters = appliedFiltersList.filter((appliedFilter)=> appliedFilter.isSaved === false);
    if(tempAppliedFilters.length > 0){
        editingStatus = true;
    }
    return editingStatus;
}

export function deleteAppliedFilterFromArray(appliedFilter: LocalFilterStructure, appliedFiltersList: LocalFilterStructure[]) {
    let editedAppliedFiltersList: LocalFilterStructure[] = [];
    for( let i = 0; i < appliedFiltersList.length; i++){
        if( appliedFiltersList[i].filterId !== appliedFilter.filterId){
            editedAppliedFiltersList.push(appliedFiltersList[i]);
        }
    }
    return editedAppliedFiltersList;
}

export function getMaximumFilterId( appliedFiltersList: LocalFilterStructure[]){
    let maxFilterId: number = 0;
    for(let i = 0; i < appliedFiltersList.length; i++){
        if(appliedFiltersList[i].filterId > maxFilterId){
            maxFilterId = appliedFiltersList[i].filterId;
        }
    }
    return maxFilterId;
}

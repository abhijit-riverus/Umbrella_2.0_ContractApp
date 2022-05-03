import { FilterStructure, IndFilterStructure, AdvancedFilter, AnalysisPoints, OperatorInfo, LocalFilterStructure, AnalysisFilterStructure } from "../../Analysis/State/analysisState";
import { nature_tag_color, type_tag_color, others_tag_color } from "../../DocumentView/Component/Utils/docUtils";

export const FilterValueDictionary: any = {
    'Jurisdiction': 'jurisdiction',
    'Renewal Clause': 'renewal',
    'Lock-in Period': 'locked_in_period',
    'Termination at convenience': 'termination_at_convenience',
    'Force Majeure Clause': 'force_majeure',
    'Subletting/Assignment Clause': 'assignment',
    'Term Clause': 'term'
};

const TableHeadersDictionary: any = {
    'basicInfo': 'Basic Information',
    'premise': 'Premise Details',
    'term': 'Term',
    'renewal': 'Renewal',
    'payments': 'Payment Obligations',
    'indemnity': 'Indemnity/Reimbursements/Costs',
    'confidentiality': 'Confidentiality',
    'termination': 'Termination',
    'forceMajeure': 'Force Majeure',
    'governingLaw': 'Governing Law',
    'nonSolicitation': 'Non-solicitation',
    'nonCompete': 'Non-compete',
    'eventsOfDefault': 'Events of Default',
    'notice': 'Notice/Intimation Obligations',
    'insurance': 'Insurance',
    'subletting': 'Subletting/Assignment',
    'changeOfControl': 'Change of Control',
    'tags': 'Tags',
    'parties': 'Contracting Parties',
    'address': 'Address',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'duration': 'Duration',
    'present': 'Present',
    'amount': 'Amount',
    'nature': 'Nature',
    'terminationAtConvenience': 'Termination at Convenience',
    'lockInPeriod': 'Lock - in Period',
    'eventsCovered': 'Events Covered',
    'jurisdiction': 'Jurisdiction',
    'territory': 'Territory',
    'limitationOfLiability': 'Limitation Of Liability',
    /* 'cap': 'Cap',
    'disputeResolution': 'Dispute Resolution',
    'mode': 'Mode',
    'venue': 'Venue',
    'legal': 'Act/Statute' */
}

const WidthDictionary: any = {
    'tags': '200px',
    'parties': '220px',
    'address': '300px',
    'startDate': '150px',
    'endDate': '150px',
    'duration': '150px',
    'present': '150px',
    'amount': '150px',
    'nature': '150px',
    'terminationAtConvenience': '240px',
    'lockInPeriod': '130px',
    'eventsCovered': '285px',
    'jurisdiction': '160px',
    'territory': '160px',
    /* 'cap': '160px',
    'mode': '160px',
    'venue': '160px',
    'legal': '160px' */
}

export const filterModeList: OperatorInfo[] = [
    {
        operatorAlias: 'Contain',
        rule: '=',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Do not contain',
        rule: '=',
        operatorValue: 'NOT'
    }
];

const textOperators: OperatorInfo[] = [
    {
        operatorAlias: 'Contain',
        rule: '~*',
        operatorValue: 'AND'
    }
];

export const booleanOperators: OperatorInfo[] = [
    {
        operatorAlias: 'Is present',
        rule: '=',
        operatorValue: 'yes'
    },
    {
        operatorAlias: 'Is absent',
        rule: '=',
        operatorValue: 'no'
    }
];

const dateOperators: OperatorInfo[] = [
    {
        operatorAlias: 'Before',
        rule: '<',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'After',
        rule: '>',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Equal to (=)',
        rule: '=',
        operatorValue: 'AND'
    }
]

const numberOperators: OperatorInfo[] = [
    {
        operatorAlias: 'Equal to (=)',
        rule: '=',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Less than (<)',
        rule: '<',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Greater than (>)',
        rule: '>',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Less than or equal to (<=)',
        rule: '<=',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Greater that or equal to (>=)',
        rule: '>=',
        operatorValue: 'AND'
    }
]

const listOperators: OperatorInfo[] = [
    {
        operatorAlias: 'Is',
        rule: '=',
        operatorValue: 'AND'
    },
    {
        operatorAlias: 'Is not',
        rule: '=',
        operatorValue: 'AND'
    }
];

export const operatorDictionary: any = {
    'text': textOperators,
    'Boolean':  booleanOperators,
    'date': dateOperators,
    'number_period': numberOperators,
    'number_currency': numberOperators,
    'list': listOperators,
    'default': [],
    'boolean':  booleanOperators,
    '': []
}

export const periodList = ['Years', 'Months', 'Days'];

export const currencyList = ['SR Saudi riyal', '£ Saint Helenian Pound', '₹ Indian Rupee', '£ Pound Sterling', '$ Dollar', '￥ Japanese yen', '€ Euro'];

export const doubleValueClauses= ['number_period', 'number_currency'];

export function createFilterStructure(initialFilterStructure: FilterStructure, childLabel: string, activeValue: string) {
    let filterValue = initialFilterStructure.v;
    let index = filterValue.findIndex((el: IndFilterStructure) => { return el.i === FilterValueDictionary[childLabel] });
    if (filterValue.length > 0) {
        if (index > -1) {
            filterValue[index].v = {
                i: '',
                o: 'AND',
                v: activeValue
            };
        } else {
            filterValue.push({
                i: FilterValueDictionary[childLabel],
                o: 'AND',
                v: {
                    i: '',
                    o: 'AND',
                    v: activeValue
                }
            })
        }
    } else {
        filterValue.push({
            i: FilterValueDictionary[childLabel],
            o: 'AND',
            v: {
                i: '',
                o: 'AND',
                v: activeValue
            }
        })
    }
    return filterValue;
}

export interface IntermediateFilterStructure {
    i: string;
    o: string;
    v: string;
}

export function createAuxInterface(filterList: any[]) {
    
    let intermediateArray: IntermediateFilterStructure[] = [];
    filterList.length > 0 && filterList.forEach((el: any) => {
        el.value.forEach((ele: any) => {
            if (ele.childLabel === 'Present') {
                intermediateArray.push({
                    i: el.label,
                    o: 'AND',
                    v: ele.activeValue
                })
            } else {
                intermediateArray.push({
                    i: ele.childLabel,
                    o: 'AND',
                    v: ele.activeValue
                })
            }
        })
    })
    return intermediateArray;
}

export function generateFilterHighlightArray(advancedFilters: AdvancedFilter[]) {
    let returnArray: string[] = [];
    for (let i = 0; i < advancedFilters.length; i++) {
        for (let j = 0; j < advancedFilters[i].value.length; j++) {
            if (advancedFilters[i].value[j].activeValue !== "N/A" && advancedFilters[i].value[j].activeValue !== "") {
                returnArray.push(advancedFilters[i].label)
            }
        }
    }
    return returnArray;
}

export interface TableHeaderStructure {
    header: string;
    colSpan: number;
}

export interface ColumnHeaderStructure {
    header: string;
    colSpan: number;
    parent: string;
}

export function generateTableHeaders(data: AnalysisPoints) {
    //Very precious code. Generates an array out of key and length of values from data object.
    let returnObject: {
        tableHeader: TableHeaderStructure[],
        columnHeader: ColumnHeaderStructure[]
    };
    returnObject = {
        tableHeader: [],
        columnHeader: []
    }
    for (let [key, value] of Object.entries(data)) {
        if (key !== 'fileId' && key !== 'name' && key !== 'title') {
            returnObject.tableHeader.push({
                header: TableHeadersDictionary[key],
                colSpan: Object.keys(value).length
            })
            for (let index = 0; index < Object.keys(value).length; index++) {
                if (Object.keys(value)[index] !== 'display') {
                    returnObject.columnHeader.push({
                        header: TableHeadersDictionary[Object.keys(value)[index]],
                        colSpan: WidthDictionary[Object.keys(value)[index]],
                        parent: TableHeadersDictionary[key]
                    })
                }
            }
        }
    }
    return returnObject;
}

export function getBackgroundColor(categoryId: number) {
    if (categoryId === 1) {
        return nature_tag_color;
    }
    else if (categoryId === 2) {
        return type_tag_color;
    }
    else if (categoryId === 3) {
        return others_tag_color;
    }
}

export function createAnalysisFilterArray(appliedFilters: LocalFilterStructure[]): AnalysisFilterStructure[] {
    let analysisFiltersList: AnalysisFilterStructure[] = [];
    for(let i = 0; i < appliedFilters.length; i++){
        let tempFilter = createAnalysisFilterStructure(appliedFilters[i]);
        analysisFiltersList.push(tempFilter);
    }
    return analysisFiltersList;
}
 
function createAnalysisFilterStructure(appliedFilter: LocalFilterStructure) {
    
    let analysisFilter: AnalysisFilterStructure = {
        i: appliedFilter.selectedDatapoint.value,
        a: appliedFilter.selectedDatapoint.alias,
        o: appliedFilter.selectedFilterMode.value,
        r: '=',
        l: 0,
        v: [
            {
                i: appliedFilter.selectedClause.value,
                a: appliedFilter.selectedClause.alias,
                o: 'AND',
                r: '=',
                l: 1,
                v: [
                    {
                        i: getSelectedBIValue(appliedFilter),
                        a: getSelectedBIValue(appliedFilter),
                        o: 'AND',
                        r: appliedFilter.selectedOperator.rule,
                        l: 2,
                        v: getSelectedBiValueArray(appliedFilter)
                    }
                ]
            }
        ]
    };
    return analysisFilter;
}

function getSelectedBIValue(appliedFilter: LocalFilterStructure){
    let clauseType: string = appliedFilter.selectedClauseType; 
    let clauseValue: string = '';
    switch(clauseType) {
        case 'text': {
            clauseValue = appliedFilter.textValue;
            break;
        }
        case 'Boolean': {
            clauseValue = appliedFilter.selectedOperator.operatorValue;
            break;
        }
        case 'boolean': {
            clauseValue = appliedFilter.selectedOperator.operatorValue;
            break;
        }
        case 'date': {
            clauseValue = appliedFilter.dateValue;
            break;
        }
        case 'number_currency': {
            clauseValue = appliedFilter.currencyType;
            break;
        }
        case 'number_period': {
            clauseValue = appliedFilter.periodType;
            break;
        }
        case 'list': {
            clauseValue = appliedFilter.selectedListValue.value;
            break;
        }
        default: {
            break;
        }
    }
    return clauseValue;
}

function getSelectedBiValueArray(appliedFilter: LocalFilterStructure){
    let valueArray: AnalysisFilterStructure[] = [];
    let clauseType: string = appliedFilter.selectedClauseType; 
    switch(clauseType) {
        case 'number_currency': {
            valueArray = [
                {
                    i: appliedFilter.currencyNumber,
                    a: appliedFilter.currencyNumber,
                    o: "AND",
                    r: "=",
                    l: 3,
                    v: []
                }
            ]
            break;
        }
        case 'number_period': {
            valueArray = [
                {
                    i: appliedFilter.periodNumber,
                    a: appliedFilter.periodNumber,
                    o: "AND",
                    r: "=",
                    l: 3,
                    v: []
                }
            ]
            break;
        }
        default: {
            break;
        }
    }
    return valueArray;
}



export const appliedFiltersAliasDictionary: any = {
    'AND': 'File contain',
    'NOT': 'File do not contain',
    'yes': 'Is present',
    'no': 'Is absent',
    '~*': "contain"
}

export function iterateAnalysisFilter(analysisFilters: AnalysisFilterStructure, iterativeString: string): string{
    //recursive
    let tempIterativeString = iterativeString;
    if(analysisFilters.v.length >= 0){
        if (analysisFilters.l === 0) {
            tempIterativeString += appliedFiltersAliasDictionary[analysisFilters.o] + " - ";
            tempIterativeString += analysisFilters.a; //datapoint
        } else if (analysisFilters.l === 1) {
            tempIterativeString += " | " + analysisFilters.a; //clause
        } else if(analysisFilters.l === 2) { 
            if(analysisFilters.i === 'yes' || analysisFilters.i === 'no'){
                tempIterativeString += " | " + appliedFiltersAliasDictionary[analysisFilters.i];    
            }else {
                let operator = analysisFilters.r;
                if(operator === "~*"){
                    operator = appliedFiltersAliasDictionary["~*"];
                }
                tempIterativeString += " | " + operator + " " + analysisFilters.a;
            }
        } else if( analysisFilters.l === 3) { 
            tempIterativeString += " " + analysisFilters.a;
        }
        if(analysisFilters.v.length > 0){
            return iterateAnalysisFilter(analysisFilters.v[0], tempIterativeString);
        }
    }
    return tempIterativeString;
}   

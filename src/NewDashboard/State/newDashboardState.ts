
export default interface NewDashboardState {
    newDashboardLoader: boolean;
    newDashboardFileIds: number[];
    newDashboardSortedBy: string;
    newDashboardSortOrder: string;
    newDashboardData: NewDashboardData[];
    newDashboardDataLoader: boolean;
    newDashboardInitialFileIds: number[];
    newDashboardFilterConfig: NewDashboardFilterConfig[];
    appliedFilter: NewDashboardFilterStructure[];
    tagsAggregate: NewDashboardFilterAggregate[];
    typeTagsAggregateValues: NewDashboardFilterAggregate[];
    typeTagsAggregateLoader: boolean;
    partyAggregate: NewDashboardFilterAggregate[];
    partyAggregateValues: NewDashboardFilterAggregate[];
    partyAggregateLoader: boolean;
    termAggregate: NewDashboardFilterAggregate[];
    endDateAggregateValues: NewDashboardFilterAggregate[];
    endDateMinValue: string;
    endDateMaxValue: string;
    endDateLeftThumb: string;
    endDateRightThumb: string;
    endDateAggregateLoader: boolean; 
}

export interface NewDashboardData {
    fileid: string;
    title: string;
    file_name: string;
    term_start: string[];
    party: string[];
}

export interface NewDashboardData {
    fileid: string;
    title: string;
    file_name: string;
    term_start: string[];
    party: string[];
}

export interface NewDashboardFilterConfig {
    type: string;
    alias: string;
    orderid: number;
    baseLevel: number;
    sort: string;
    orderby: string;
}

export interface NewDashboardFilterAggregate {
    value: string;
    alias: string;
    operator: string;
    label: string;
    type: string;
    outputLevel: number;
    flag: boolean;
    count: string;
    childrenCount: string;
}

export interface NewDashboardFilterStructure {
    i: string;  //identifier
    a: string;  //alias
    o: string;  //operator
    r: string;  //rule
    l: number;  //levelId
    v: NewDashboardFilterStructure[]; //value
}


export function defaultNewDashboardState(): NewDashboardState {
    return {
        newDashboardLoader: false,
        newDashboardFileIds: [],
        newDashboardSortedBy: 'date',
        newDashboardSortOrder: 'ascending',
        newDashboardData: [],
        newDashboardDataLoader: false,
        newDashboardInitialFileIds: [],
        newDashboardFilterConfig: [],
        appliedFilter: [],
        tagsAggregate:[],
        typeTagsAggregateValues:[],
        typeTagsAggregateLoader: false,
        partyAggregate:[],
        partyAggregateValues:[],
        partyAggregateLoader: false,
        termAggregate:[],
        endDateAggregateValues:[],
        endDateMinValue: '',
        endDateMaxValue: '',
        endDateLeftThumb: '',
        endDateRightThumb: '',
        endDateAggregateLoader: false, 
    }
}
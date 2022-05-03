import { PartyData, TagData } from "../../DocumentView/State/documentState";
import { IntermediateFilterStructure } from "../../Utils/GeneralUtil/genUtils";

export default interface AnalysisState {
    analysisObject: AnalysisPoints[];
    tableConfig: ConfigItem[];
    analysisLoader: boolean;
    generalFilter: any;
    advancedFilter: AdvancedFilter[];
    filterFileIds: number[];
    initialFileIds: number[];
    count: number;
    savedAppliedFilter: IntermediateFilterStructure[];
    resetFlag: boolean;
    preferenceUpdated: boolean;
    csvLink: string;
    refreshTable: boolean;
    saveAdvancedFilterStructure: FilterStructure;
    isReportSuccess: boolean;
    openReportSnackbar: boolean;
    appliedFiltersList: LocalFilterStructure[];
    currentEditingFilterId: number;
    analysisFilteredFileIds: number[];
    savedFilterConfig: FilterConfigStructure[];
    savedFilterAggregate: FilterAggregateStructure[];
    filteredCount: number;
    savedAnalysisFiltersList: AnalysisFilterStructure[];
    savedFilterClauseType: string;
    savedClauseAggregate: FilterAggregateStructure[];
    savedValueAggregate: FilterAggregateStructure[];
    savedOperatorList: OperatorInfo[];
    analysisFileIds: number[];
}

export interface FileIdArray {
    fileIdArray: number[]
}

export interface AdvancedFilter {
    label: string;
    value: AdvancedFilterChild[];
}

export interface AdvancedFilterChild {
    childLabel: string;
    childValue: string[];
    activeValue: string;
}

export interface AnalysisPoints {
    fileId: number;
    name: string;
    title: string;
    basicInfo: BasicInfo;
    premise: PremiseDetails;
    term: Term;
    renewal: Renewal;
    payments: Payment;
    indemnity: Indemnity;
    confidentiality: Confidentiality;
    termination: Termination;
    insurance: Insurance;
    notice: Notice;
    eventsOfDefault: EventsOfDefault;
    forceMajeure: ForceMajeure;
    governingLaw: GoverningLaw;
    nonCompete: NonCompete;
    nonSolicitation: NonSolicitation;
    subletting: Subletting;
    changeOfControl: ChangeOfControl;
    limitationOfLiability: LimitationOfLiability;
}

/* interface BasicInfo {
    tags: TagData[];
    parties: PartyData[];
}

interface NonCompete { 
    present:  string;
    territory: string[];
    duration: string[];
}

interface ChangeOfControl { 
    present:  string;
}

interface NonSolicitation {
    present:  string;
    duration: string[];
}

interface EventsOfDefault {
    present: string;
}

interface Payment {
    present:  string;
    amount: string[];
    duration: string[];
}

interface Notice {
    present:  string;
}

interface Confidentiality {
    present:  string;
    nature: string[];
    duration: string[];
}

interface Indemnity {
    present: string;
    cap: string[];
    // payer: string[];
    // payee: string[];
    // limit: string[];
}

interface Insurance {
    present: string;
    // insurer: string[];
    // amount: string[];
}

interface Renewal {
    present: string;
}

interface Subletting {
    present: string;
}

interface PremiseDetails {
    address: string[];
}

export interface TermDate {
    phrase: string;
    heading: string;
    sentence: string;
}

export interface PresentData {
    status: string;
    heading: string;
    sentence: string;
}

interface Term {
    startDate: TermDate[];
    endDate: TermDate[];
    duration: TermDate[];
}

interface Termination {
    lockInPeriod: string;
    terminationAtConv: string;
}

interface ForceMajeure {
    present: string;
    eventsCovered: string[];
}

interface GoverningLaw {
    jurisdiction: string[];
}

interface LimitationOfLiability {
    present:  string;
    amount: string[];
}

interface DisputeResolution {
    present: string;
    mode: string[];
    panel: string[];
    venue: string[];
    legal: string[];
} */

interface BasicInfo {
    tags: string[];
    parties: string[];
}

interface NonCompete { 
    present:  string;
    territory: string[];
    duration: string[];
}

interface ChangeOfControl { 
    present:  string;
}

interface NonSolicitation {
    present:  string;
    duration: string[];
}

interface EventsOfDefault {
    present: string;
}

interface Payment {
    present:  string;
    amount: string[];
    duration: string[];
}

interface Notice {
    present:  string;
}

interface Confidentiality {
    present:  string;
    nature: string[];
    duration: string[];
}

interface Indemnity {
    present: string;
    //cap: string[];
    // payer: string[];
    // payee: string[];
    // limit: string[];
}

interface Insurance {
    present: string;
    // insurer: string[];
    // amount: string[];
}

interface Renewal {
    present: string;
}

interface Subletting {
    present: string;
}

interface PremiseDetails {
    address: string[];
}

export interface TermDate {
    date: string;
    para: string;
    heading: string;
}

export interface AnalysisDuration {
    phrase: string[];
    sentence: string[];
}

interface Term {
    startDate: TermDate[];
    endDate: TermDate[];
    duration: AnalysisDuration;
}

interface Termination {
    lockInPeriod: string[];
    terminationAtConvenience: string;
}

interface ForceMajeure {
    present: string;
    eventsCovered: string[];
}

interface GoverningLaw {
    jurisdiction: string[];
}

interface LimitationOfLiability {
    present:  string;
    amount: string[];
}

export interface FilterStructure {
    i: string;
    o: string;
    v: IndFilterStructure[];
}

export interface IndFilterStructure {
    i: string;
    o: string;
    v: any;
}

export interface ConfigItem {
    item: string;
    display: boolean;
}

export interface LocalFilterStructure {
    filterId: number;
    selectedDatapoint: ValueInfo;
    selectedClause: ValueInfo;
    selectedOperator: OperatorInfo;
    selectedFilterMode: ValueInfo;
    selectedClauseType: string; //eg. 'Text', 'Boolean' etc.
    textValue: string;
    currencyType: string;
    currencyNumber: string;
    periodType: string;
    periodNumber: string;
    dateValue: string;
    selectedListValue: ValueInfo;
    isSaved: boolean;
}

export interface FilterConfigStructure {
    type: string;
    alias: string;
    orderid: number;
    baseLevel: number;
}

export interface FilterAggregateStructure {
    value: string;
    alias: string;
    operator: string;
    label: string;
    type: string;
    outputLevel: number;
    flag: boolean;
    count: number;
    childrenCount: string;
}

export interface AnalysisFilterStructure {
    i: string;  //identifier
    a: string;  //alias
    o: string;  //operator
    r: string;  //rule
    l: number;  //levelId
    v: AnalysisFilterStructure[]; //value
}

export interface OperatorInfo {
    operatorAlias: string;
    rule: string;
    operatorValue: string;
}

export interface ValueInfo {
    alias: string;
    value: string;
}

export function defaultAnalysisState(): AnalysisState {
    return {
        tableConfig: [],
        analysisObject: [],
        analysisLoader: false,
        generalFilter: {},
        filterFileIds: [],
        advancedFilter: [],
        initialFileIds: [],
        count: -1,
        savedAppliedFilter: [],
        resetFlag: false,
        preferenceUpdated: false,
        csvLink: '',
        refreshTable: true,
        saveAdvancedFilterStructure: {
            i: 'filter',
            o: 'AND',
            v: []
        },
        isReportSuccess: false,
        openReportSnackbar: false,
        appliedFiltersList: [
            {
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
            }
        ],
        currentEditingFilterId: -1,
        analysisFilteredFileIds: [],
        savedFilterConfig: [],
        savedFilterAggregate: [],
        filteredCount: -1,
        savedAnalysisFiltersList: [],
        savedFilterClauseType: 'default',
        savedClauseAggregate: [],
        savedValueAggregate: [],
        savedOperatorList: [],
        analysisFileIds: []
    }
}
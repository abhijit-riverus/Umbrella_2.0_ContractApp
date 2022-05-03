
export default interface NewAnalysisState {
    newAnalysisLoader: boolean;
    newAnalysisFileIds: number[];
    newAnalysisSortedBy: string;
    newAnalysisSortOrder: string;
    newAnalysisData: NewAnalysisData[];
    newAnalysisDataLoader: boolean;
    newAnalysisInitialFileIds: number[];
    newAnalysisFilteredCount: number;
    newAnalysisFilterConfig: NewAnalysisFilterConfig[];
    newAnalysisTableConfig: NewAnalysisTableConfig[];
    newAnalysisTableConfigLoader: boolean;
    newAnalysisFilterAggregate: NewAnalysisFilterAggregate[];
    appliedFilter: NewAnalysisFilterStructure[];
    newAnalysisLocalAppliedFilter: LocalNewAnalysisFilterStructure[];
    clauseAggregate: NewAnalysisFilterAggregate[];
    clausePresentAggregateValues: NewAnalysisFilterAggregate[];
    clauseAbsentAggregateValues: NewAnalysisFilterAggregate[];
    clauseAggregateLoader: boolean;
    clausePresentAggregateLoader: boolean;
    clauseAbsentAggregateLoader: boolean;
    tagsAggregate: NewAnalysisFilterAggregate[];
    natureTagsAggregateValues: NewAnalysisFilterAggregate[];
    natureTagsAggregateLoader: boolean;
    typeTagsAggregateValues: NewAnalysisFilterAggregate[];
    typeTagsAggregateLoader: boolean;
    groupTagsAggregateValues: NewAnalysisFilterAggregate[];
    groupsTagsAggregateLoader: boolean;
    partyAggregate: NewAnalysisFilterAggregate[];
    partyAggregateValues: NewAnalysisFilterAggregate[];
    partyAggregateLoader: boolean;
    renewalAggregate: NewAnalysisFilterAggregate[];
    confidentialityAggregate: NewAnalysisFilterAggregate[];
    confidentialityNatureAggregateValues: NewAnalysisFilterAggregate[];
    confidentialityNatureAggregateLoader: boolean;
    changeOfControlAggregate: NewAnalysisFilterAggregate[];
    changeOfControlIntersectionAggregateValues: NewAnalysisFilterAggregate[];
    changeOfControlIntersectionLoader: boolean;
    terminationAggregate: NewAnalysisFilterAggregate[];
    terminationAtConvinienceAggregateValues: NewAnalysisFilterAggregate[];
    terminationAtConvinienceAggregateLoader: boolean;
    terminationEventAggregateValues: NewAnalysisFilterAggregate[];
    terminationEventAggregateLoader: boolean;
    eventOfDefaultAggregate: NewAnalysisFilterAggregate[];
    eventOfDefaultEventAggregateValues: NewAnalysisFilterAggregate[];
    eventOfDefaultEventAggregateLoader: boolean;
    forceMajeureAggregate: NewAnalysisFilterAggregate[];
    forceMajuereEventAggregateValues: NewAnalysisFilterAggregate[];
    forceMajuereEventAggregateLoader: boolean;
    governingLawAggregate: NewAnalysisFilterAggregate[];
    governingLawJurisdictionAggregateValues: NewAnalysisFilterAggregate[];
    governingLawJurisdictionAggregateLoader: boolean;
    disputeResolutionAggregate: NewAnalysisFilterAggregate[];
    disputeResolutionVenueAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionVenueAggregateLoader: boolean;
    disputeResolutionOthersAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionOthersAggregateLoader: boolean;
    disputeResolutionArbitrationAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionArbitrationAggregateLoader: boolean;
    disputeResolutionActStatuteAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionActStatuteAggregateLoader: boolean;
    disputeResolutionPanelAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionPanelAggregateLoader: boolean;
    disputeResolutionNegotiationAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionNegotiationAggregateLoader: boolean;
    disputeResolutionMediationAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionMediationAggregateLoader: boolean;
    disputeResolutionConciliationAggregateValues: NewAnalysisFilterAggregate[];
    disputeResolutionConciliationAggregateLoader: boolean;
    consentAggregate: NewAnalysisFilterAggregate[];
    consentTypeAggregateValues: NewAnalysisFilterAggregate[];
    consentTypeAggregateLoader: boolean;
    consentAuthorityAggregateValues: NewAnalysisFilterAggregate[];
    consentAuthorityAggregateLoader: boolean;
    termAggregate: NewAnalysisFilterAggregate[];
    startDateAggregateValues: NewAnalysisFilterAggregate[];
    startDateMinValue: string;
    startDateMaxValue: string;
    startDateLeftThumb: string;
    startDateRightThumb: string;
    startDateAggregateLoader: boolean;
    endDateAggregateValues: NewAnalysisFilterAggregate[];
    endDateMinValue: string;
    endDateMaxValue: string;
    endDateLeftThumb: string;
    endDateRightThumb: string;
    endDateAggregateLoader: boolean; 
    paymentAggregate: NewAnalysisFilterAggregate[];
    paymentCurrencyAggregateValues: NewAnalysisFilterAggregate[];
    paymentAmountAggregateValues: NewAnalysisFilterAggregate[];
    paymentAmountAggregateLoader: boolean;
    paymentAmountMinValue: string;
    paymentAmountMaxValue: string;
    paymentAmountLeftThumb: string;
    paymentAmountRightThumb: string;
    paymentAmountCurrency: string;
    paymentCurrencyAggregateLoader: boolean;
    indemnityAggregate: NewAnalysisFilterAggregate[];
    indemnityCurrencyAggregateValues: NewAnalysisFilterAggregate[];
    indemnityAmountAggregateValues: NewAnalysisFilterAggregate[];
    indemnityAmountAggregateLoader: boolean;
    indemnityAmountMinValue: string;
    indemnityAmountMaxValue: string;
    indemnityAmountLeftThumb: string;
    indemnityAmountRightThumb: string;
    indemnityAmountCurrency: string;
    indemnityCurrencyAggregateLoader: boolean;
    limitationOfLiabilityAggregate: NewAnalysisFilterAggregate[];
    limitationOfLiabilityCurrencyAggregateValues: NewAnalysisFilterAggregate[];
    limitationOfLiabilityAmountAggregateValues: NewAnalysisFilterAggregate[];
    limitationOfLiabilityAmountAggregateLoader: boolean;
    limitationOfLiabilityAmountMinValue: string;
    limitationOfLiabilityAmountMaxValue: string;
    limitationOfLiabilityAmountLeftThumb: string;
    limitationOfLiabilityAmountRightThumb: string;
    limitationOfLiabilityAmountCurrency: string;
    limitationOfLiabilityCurrencyAggregateLoader: boolean;
    indemnityPayerAggregateValues: NewAnalysisFilterAggregate[];
    indemnityPayerAggregateLoader: boolean;
    indemnityPayeeAggregateValues: NewAnalysisFilterAggregate[];
    indemnityPayeeAggregateLoader: boolean;
    indemnityTriggeringEventAggregateValues: NewAnalysisFilterAggregate[];
    indemnityTriggeringEventAggregateLoader: boolean;
    indemnityExtentOfCostsAggregateValues: NewAnalysisFilterAggregate[];
    indemnityExtentOfCostsAggregateLoader: boolean;
    nonCompeteAggregate: NewAnalysisFilterAggregate[];
    nonCompeteTerritoryAggregateValues: NewAnalysisFilterAggregate[];
    nonCompeteTerritoryAggregateLoader: boolean;
    sublettingAssignmentAggregate: NewAnalysisFilterAggregate[];
    sublettingAssignmentConsentAggregateValues: NewAnalysisFilterAggregate[]; 
    sublettingAssignmentConsentAggregateLoader: boolean;
    sublettingAssignmentNoticeAggregateValues: NewAnalysisFilterAggregate[]; 
    sublettingAssignmentNoticeAggregateLoader: boolean;
}

export interface NewAnalysisData {
    fileid: string;
    title: string;
    file_name: string;
    term_start: string[];
    party: string[];
}

export interface NewAnalysisFilterConfig {
    type: string;
    alias: string;
    orderid: number;
    baseLevel: number;
    sort: string;
    orderby: string;
}

export interface NewAnalysisFilterAggregate {
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

export interface NewAnalysisFilterStructure {
    i: string;  //identifier
    a: string;  //alias
    o: string;  //operator
    r: string;  //rule
    l: number;  //levelId
    v: NewAnalysisFilterStructure[]; //value
}

export interface LocalNewAnalysisFilterStructure {
    clauseLabel: string;
    biValue: string;
    filteredValue: string;
    operatorValue: string;
}

export interface NewAnalysisTableConfig {
    item: string;
    display: string;
}


export function defaultNewAnalysisState(): NewAnalysisState {
    return {
        newAnalysisLoader: false,
        newAnalysisFileIds: [],
        newAnalysisSortedBy: 'date',
        newAnalysisSortOrder: 'ascending',
        newAnalysisData: [],
        newAnalysisDataLoader: false,
        newAnalysisInitialFileIds: [],
        newAnalysisFilteredCount: -1,
        newAnalysisFilterConfig: [],
        newAnalysisTableConfig: [],
        newAnalysisTableConfigLoader: false,
        newAnalysisFilterAggregate: [],
        appliedFilter: [],
        newAnalysisLocalAppliedFilter: [],
        clauseAggregate: [],
        clausePresentAggregateValues: [],
        clauseAbsentAggregateValues: [],
        tagsAggregate: [],
        natureTagsAggregateValues: [],
        natureTagsAggregateLoader: false,
        typeTagsAggregateValues: [],
        typeTagsAggregateLoader: false,
        groupTagsAggregateValues: [],
        groupsTagsAggregateLoader: false,
        partyAggregate: [],
        partyAggregateValues: [],
        partyAggregateLoader: false,
        renewalAggregate: [],
        clauseAggregateLoader: false,
        clausePresentAggregateLoader: false,
        clauseAbsentAggregateLoader: false,
        confidentialityAggregate: [],
        confidentialityNatureAggregateValues: [],
        confidentialityNatureAggregateLoader: false,
        changeOfControlAggregate: [],
        changeOfControlIntersectionAggregateValues: [],
        changeOfControlIntersectionLoader: false,
        terminationAggregate: [],
        terminationAtConvinienceAggregateValues: [],
        terminationAtConvinienceAggregateLoader: false,
        terminationEventAggregateValues: [],
        terminationEventAggregateLoader: false,
        eventOfDefaultAggregate: [],
        eventOfDefaultEventAggregateValues: [],
        eventOfDefaultEventAggregateLoader: false,
        forceMajeureAggregate: [],
        forceMajuereEventAggregateValues: [],
        forceMajuereEventAggregateLoader: false,
        governingLawAggregate: [],
        governingLawJurisdictionAggregateValues: [],
        governingLawJurisdictionAggregateLoader: false,
        disputeResolutionAggregate: [],
        disputeResolutionVenueAggregateValues: [],
        disputeResolutionVenueAggregateLoader: false,
        disputeResolutionOthersAggregateValues: [],
        disputeResolutionOthersAggregateLoader: false,
        disputeResolutionArbitrationAggregateValues: [],
        disputeResolutionArbitrationAggregateLoader: false,
        disputeResolutionActStatuteAggregateValues: [],
        disputeResolutionActStatuteAggregateLoader: false,
        disputeResolutionPanelAggregateValues: [],
        disputeResolutionPanelAggregateLoader: false,
        disputeResolutionNegotiationAggregateValues: [],
        disputeResolutionNegotiationAggregateLoader: false,
        disputeResolutionMediationAggregateValues: [],
        disputeResolutionMediationAggregateLoader: false,
        disputeResolutionConciliationAggregateValues: [],
        disputeResolutionConciliationAggregateLoader: false,
        consentAggregate: [],
        consentTypeAggregateValues: [],
        consentTypeAggregateLoader: false,
        consentAuthorityAggregateValues: [],
        consentAuthorityAggregateLoader: false,
        termAggregate: [],
        startDateAggregateValues: [],
        startDateMinValue: '',
        startDateMaxValue: '',
        startDateLeftThumb: '',
        startDateRightThumb: '',
        startDateAggregateLoader: false,
        endDateAggregateValues: [],
        endDateMinValue: '',
        endDateMaxValue: '',
        endDateLeftThumb: '',
        endDateRightThumb: '',
        endDateAggregateLoader: false,
        paymentAggregate: [],
        paymentCurrencyAggregateValues: [],
        paymentAmountAggregateValues: [],
        paymentAmountAggregateLoader: false,
        paymentAmountMinValue: '',
        paymentAmountMaxValue: '',
        paymentAmountLeftThumb: '',
        paymentAmountRightThumb: '',
        paymentAmountCurrency: '₹ Indian Rupee',
        paymentCurrencyAggregateLoader: false,
        indemnityAggregate: [],
        indemnityCurrencyAggregateValues: [],
        indemnityAmountAggregateValues: [],
        indemnityAmountAggregateLoader: false,
        indemnityAmountMinValue: '',
        indemnityAmountMaxValue: '',
        indemnityAmountLeftThumb: '',
        indemnityAmountRightThumb: '',
        indemnityAmountCurrency: '₹ Indian Rupee',
        indemnityCurrencyAggregateLoader: false,
        limitationOfLiabilityAggregate: [],
        limitationOfLiabilityCurrencyAggregateValues: [],
        limitationOfLiabilityAmountAggregateValues: [],
        limitationOfLiabilityAmountAggregateLoader: false,
        limitationOfLiabilityAmountMinValue:'',
        limitationOfLiabilityAmountMaxValue:'',
        limitationOfLiabilityAmountLeftThumb:'',
        limitationOfLiabilityAmountRightThumb:'',
        limitationOfLiabilityAmountCurrency:'₹ Indian Rupee',
        limitationOfLiabilityCurrencyAggregateLoader: false,
        indemnityPayerAggregateValues: [],
        indemnityPayerAggregateLoader: false,
        indemnityPayeeAggregateValues: [],
        indemnityPayeeAggregateLoader: false,
        indemnityTriggeringEventAggregateValues: [],
        indemnityTriggeringEventAggregateLoader: false,
        indemnityExtentOfCostsAggregateValues: [],
        indemnityExtentOfCostsAggregateLoader: false,
        nonCompeteAggregate: [],
        nonCompeteTerritoryAggregateValues: [],
        nonCompeteTerritoryAggregateLoader: false,
        sublettingAssignmentAggregate: [],
        sublettingAssignmentConsentAggregateValues: [], 
        sublettingAssignmentConsentAggregateLoader: false,
        sublettingAssignmentNoticeAggregateValues: [], 
        sublettingAssignmentNoticeAggregateLoader: false
    }
}
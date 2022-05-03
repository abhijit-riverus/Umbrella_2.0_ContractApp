import { GETTABLECONFIG, GETTABLECONFIG_SUCCESS } from "../../Analysis/Actions/def";
import {  APPLYNEWANALYSISFILTER, APPLYNEWANALYSISFILTER_SUCCESS, GETNEWANALYSISDATA, GETNEWANALYSISDATA_SUCCESS, GETNEWANALYSISFILEID, GETNEWANALYSISFILEID_SUCCESS, GETNEWANALYSISFILTERAGGREGATE, GETNEWANALYSISFILTERAGGREGATE_SUCCESS, GETNEWANALYSISFILTERCONFIG_SUCCESS, GETNEWANALYSISFILTERCOUNT, GETNEWANALYSISFILTERCOUNT_SUCCESS, GETNEWANALYSISINITIALFILEID, GETNEWANALYSISINITIALFILEID_SUCCESS, GETNEWANALYSISTABLECONFIG, GETNEWANALYSISTABLECONFIG_SUCCESS, NewAnalysisActions, SAVENEWANALYSISCURRENCY, SAVENEWANALYSISFILTER, SAVENEWANALYSISLOCALAPPLIEDFILTER, SAVENEWANALYSISSORT } from "../Actions/def";
import NewAnalysisState, { defaultNewAnalysisState } from "../State/newAnalysisState";
import { filterForBiExists, getCurrencyValueFromFilterArray, getAmountFilterFromFilterArray, getMaxNumberFromAggregate, getMinNumberFromAggregate, getFilterFromFilterArray, amountFilterForBiExists } from "../Utils/newAnalysisUtils";



export default function newAnalysisReducer(state: NewAnalysisState = defaultNewAnalysisState(), action: NewAnalysisActions): NewAnalysisState {
    switch (action.type) {
        case GETNEWANALYSISFILEID:{
            return { ...state, newAnalysisLoader: true, newAnalysisDataLoader: true, clausePresentAggregateLoader: true, clauseAbsentAggregateLoader: true };
        }
        case GETNEWANALYSISFILEID_SUCCESS: {
            return { ...state, newAnalysisFileIds: action.payload.newAnalysisFileIds, newAnalysisInitialFileIds: action.payload.newAnalysisFileIds };
        }
        case GETNEWANALYSISDATA:{
            return { ...state, newAnalysisDataLoader: true, newAnalysisLoader: false };
        }
        case GETNEWANALYSISDATA_SUCCESS: {
            return { ...state, newAnalysisData: action.payload.newAnalysisData, newAnalysisLoader: false, newAnalysisDataLoader: false };
        }
        case GETNEWANALYSISFILTERCONFIG_SUCCESS: {
            return { ...state, newAnalysisFilterConfig: action.payload.newAnalysisFilterConfig };
        }
        case GETNEWANALYSISFILTERAGGREGATE: {
            if(action.payload.segment === 'clause' && action.payload.value === '' && action.payload.level === -1){
                return { ...state, clauseAggregateLoader: true };
            } else if(action.payload.segment === 'clause' && action.payload.value === 'yes' && action.payload.level === 0){
                return { ...state, clausePresentAggregateLoader: true };
            } else if(action.payload.segment === 'clause' && action.payload.value === 'no' && action.payload.level === 0){
                return { ...state, clauseAbsentAggregateLoader: true };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'nature' && action.payload.level === 0) {
                return { ...state, natureTagsAggregateLoader: true };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'type' && action.payload.level === 0) {
                return { ...state, typeTagsAggregateLoader: true };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'others' && action.payload.level === 0) {
                return { ...state, groupsTagsAggregateLoader: true };
            } else if (action.payload.segment === 'party' && action.payload.value === 'name' && action.payload.level === 0) {
                return { ...state, partyAggregateLoader: true };
            } else if (action.payload.segment === 'confidentiality' && action.payload.value === 'nature' && action.payload.level === 0) {
                return { ...state, confidentialityNatureAggregateLoader: true };
            } else if (action.payload.segment === 'changeofControl' && action.payload.value === 'intersection' && action.payload.level === 0) {
                return { ...state, changeOfControlIntersectionLoader: true };
            } else if (action.payload.segment === 'termination' && action.payload.value === 'at convenience' && action.payload.level === 0) {
                return { ...state, terminationAtConvinienceAggregateLoader: true };
            } else if (action.payload.segment === 'termination' && action.payload.value === 'event' && action.payload.level === 0) {
                return { ...state, terminationEventAggregateLoader: true };
            } else if (action.payload.segment === 'eventsofdefault' && action.payload.value === 'event' && action.payload.level === 0) {
                return { ...state, eventOfDefaultEventAggregateLoader: true };
            } else if (action.payload.segment === 'forcemajeure' && action.payload.value === 'event' && action.payload.level === 0) {
                return { ...state, forceMajuereEventAggregateLoader: true };
            } else if (action.payload.segment === 'governinglaw' && action.payload.value === 'jurisdiction' && action.payload.level === 0) {
                return { ...state, governingLawJurisdictionAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'venue' && action.payload.level === 0) {
                return { ...state, disputeResolutionVenueAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Others' && action.payload.level === 0) {
                return { ...state, disputeResolutionOthersAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Arbitration' && action.payload.level === 0) {
                return { ...state, disputeResolutionArbitrationAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'actstatute' && action.payload.level === 0) {
                return { ...state, disputeResolutionActStatuteAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'panel' && action.payload.level === 0) {
                return { ...state, disputeResolutionPanelAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Negotiation' && action.payload.level === 0) {
                return { ...state, disputeResolutionNegotiationAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Mediation' && action.payload.level === 0) {
                return { ...state, disputeResolutionMediationAggregateLoader: true };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Conciliation' && action.payload.level === 0) {
                return { ...state, disputeResolutionConciliationAggregateLoader: true };
            } else if (action.payload.segment === 'consent' && action.payload.value === 'Type' && action.payload.level === 0) {
                return { ...state, consentTypeAggregateLoader: true };
            } else if (action.payload.segment === 'consent' && action.payload.value === 'Authority' && action.payload.level === 0) {
                return { ...state, consentAuthorityAggregateLoader: true };
            } else if (action.payload.segment === 'term' && action.payload.value === 'start date' && action.payload.level === 0) {
                return {...state, startDateAggregateLoader: true};
            } else if (action.payload.segment === 'term' && action.payload.value === 'end date' && action.payload.level === 0) {
                return {...state, endDateAggregateLoader: true};
            } else if (action.payload.segment === 'paymentobligation' && action.payload.value === 'amount' && action.payload.level === 0) {
                return {...state, paymentCurrencyAggregateLoader: true};
            } else if (action.payload.segment === 'paymentobligation' && action.payload.value !== 'amount' && action.payload.value.length > 0 && action.payload.level === 1) {
                return {...state, paymentAmountAggregateLoader: true};
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'amount' && action.payload.level === 0) {
                return {...state, indemnityCurrencyAggregateLoader: true};
            } else if (action.payload.segment === 'indemnity' && action.payload.value !== 'amount' && action.payload.value.length > 0 && action.payload.level === 1) {
                return {...state, indemnityAmountAggregateLoader: true};
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'payer' && action.payload.level === 0) {
                return {...state, indemnityPayerAggregateLoader: true};
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'payee' && action.payload.level === 0) {
                return {...state, indemnityPayeeAggregateLoader: true};
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'triggering events' && action.payload.level === 0) {
                return {...state, indemnityTriggeringEventAggregateLoader: true};
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'extent of costs' && action.payload.level === 0) {
                return {...state, indemnityExtentOfCostsAggregateLoader: true};
            } else if (action.payload.segment === 'limitationofliability' && action.payload.value === 'amount' && action.payload.level === 0) {
                return {...state, limitationOfLiabilityCurrencyAggregateLoader: true};
            } else if (action.payload.segment === 'limitationofliability' && action.payload.value !== 'amount' && action.payload.value.length > 0 && action.payload.level === 1) {
                return {...state, limitationOfLiabilityAmountAggregateLoader: true};
            } else if (action.payload.segment === 'noncompete' && action.payload.value === 'territory' && action.payload.level === 0) {
                return {...state, nonCompeteTerritoryAggregateLoader: true};
            } else if (action.payload.segment === 'sublettingassignment' && action.payload.value === 'Consent' && action.payload.level === 0) {
                return { ...state, sublettingAssignmentConsentAggregateLoader: true };
            } else if (action.payload.segment === 'sublettingassignment' && action.payload.value === 'Notice' && action.payload.level === 0) {
                return { ...state, sublettingAssignmentNoticeAggregateLoader: true };
            } else {
                return { ...state };
            }
        }
        case GETNEWANALYSISFILTERAGGREGATE_SUCCESS: {
            if(action.payload.segment === 'clause' && action.payload.value === '' && action.payload.level === -1){
                return { ...state, clauseAggregate: action.payload.newAnalysisFilterAggregate, clauseAggregateLoader: true  };
            } else if(action.payload.segment === 'clause' && action.payload.value === 'yes' && action.payload.level === 0){
                return { ...state, clausePresentAggregateValues: action.payload.newAnalysisFilterAggregate, clausePresentAggregateLoader: false };
            } else if(action.payload.segment === 'clause' && action.payload.value === 'no' && action.payload.level === 0){
                return { ...state, clauseAbsentAggregateValues: action.payload.newAnalysisFilterAggregate, clauseAbsentAggregateLoader: false };
            } else if (action.payload.segment === 'tags' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, tagsAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'nature' && action.payload.level === 0) {
                return { ...state, natureTagsAggregateValues: action.payload.newAnalysisFilterAggregate, natureTagsAggregateLoader: false };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'type' && action.payload.level === 0) {
                return { ...state, typeTagsAggregateValues: action.payload.newAnalysisFilterAggregate, typeTagsAggregateLoader: false };
            } else if (action.payload.segment === 'tags' && action.payload.value === 'others' && action.payload.level === 0) {
                return { ...state, groupTagsAggregateValues: action.payload.newAnalysisFilterAggregate, groupsTagsAggregateLoader: false };
            } else if (action.payload.segment === 'party' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, partyAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'party' && action.payload.value === 'name' && action.payload.level === 0) {
                return { ...state, partyAggregateValues: action.payload.newAnalysisFilterAggregate, partyAggregateLoader: false };
            } else if (action.payload.segment === 'renewal' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, renewalAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'confidentiality' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, confidentialityAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'confidentiality' && action.payload.value === 'nature' && action.payload.level === 0) {
                return { ...state, confidentialityNatureAggregateValues: action.payload.newAnalysisFilterAggregate ,confidentialityNatureAggregateLoader: false };
            } else if (action.payload.segment === 'changeofControl' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, changeOfControlAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'changeofControl' && action.payload.value === 'intersection' && action.payload.level === 0) {
                return { ...state, changeOfControlIntersectionAggregateValues: action.payload.newAnalysisFilterAggregate ,changeOfControlIntersectionLoader: false };
            } else if (action.payload.segment === 'termination' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, terminationAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'termination' && action.payload.value === 'at convenience' && action.payload.level === 0) {
                return { ...state, terminationAtConvinienceAggregateValues: action.payload.newAnalysisFilterAggregate ,terminationAtConvinienceAggregateLoader: false };
            } else if (action.payload.segment === 'termination' && action.payload.value === 'event' && action.payload.level === 0) {
                return { ...state, terminationEventAggregateValues: action.payload.newAnalysisFilterAggregate, terminationEventAggregateLoader: false };
            } else if (action.payload.segment === 'eventsofdefault' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, eventOfDefaultAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'eventsofdefault' && action.payload.value === 'event' && action.payload.level === 0) {
                return { ...state, eventOfDefaultEventAggregateValues: action.payload.newAnalysisFilterAggregate, eventOfDefaultEventAggregateLoader: false };
            } else if (action.payload.segment === 'forcemajeure' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, forceMajeureAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'forcemajeure' && action.payload.value === 'event' && action.payload.level === 0) {
                return { ...state, forceMajuereEventAggregateValues: action.payload.newAnalysisFilterAggregate, forceMajuereEventAggregateLoader: false };
            } else if (action.payload.segment === 'governinglaw' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, governingLawAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'governinglaw' && action.payload.value === 'jurisdiction' && action.payload.level === 0) {
                return { ...state, governingLawJurisdictionAggregateValues: action.payload.newAnalysisFilterAggregate, governingLawJurisdictionAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, disputeResolutionAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'venue' && action.payload.level === 0) {
                return { ...state, disputeResolutionVenueAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionVenueAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Others' && action.payload.level === 0) {
                return { ...state, disputeResolutionOthersAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionOthersAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Arbitration' && action.payload.level === 0) {
                return { ...state, disputeResolutionArbitrationAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionArbitrationAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'actstatute' && action.payload.level === 0) {
                return { ...state, disputeResolutionActStatuteAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionActStatuteAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'panel' && action.payload.level === 0) {
                return { ...state, disputeResolutionPanelAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionPanelAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Negotiation' && action.payload.level === 0) {
                return { ...state, disputeResolutionNegotiationAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionNegotiationAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Mediation' && action.payload.level === 0) {
                return { ...state, disputeResolutionMediationAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionMediationAggregateLoader: false };
            } else if (action.payload.segment === 'disputeresolution' && action.payload.value === 'Conciliation' && action.payload.level === 0) {
                return { ...state, disputeResolutionConciliationAggregateValues: action.payload.newAnalysisFilterAggregate, disputeResolutionConciliationAggregateLoader: false };
            } else if (action.payload.segment === 'consent' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, consentAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'consent' && action.payload.value === 'Type' && action.payload.level === 0) {
                return { ...state, consentTypeAggregateValues: action.payload.newAnalysisFilterAggregate , consentTypeAggregateLoader: false };
            } else if (action.payload.segment === 'consent' && action.payload.value === 'Authority' && action.payload.level === 0) {
                return { ...state, consentAuthorityAggregateValues: action.payload.newAnalysisFilterAggregate, consentAuthorityAggregateLoader: false };
            } else if (action.payload.segment === 'term' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, termAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'term' && action.payload.value === 'start date' && action.payload.level === 0) {
                if(action.payload.newAnalysisFilterAggregate.length > 0){
                    let lastElementIndex = action.payload.newAnalysisFilterAggregate.length - 1;
                    let localMin: string = action.payload.newAnalysisFilterAggregate[0].value;
                    let localMax: string = action.payload.newAnalysisFilterAggregate[lastElementIndex].value;
                    if(action.payload.filter.length > 0 && filterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){ 
                        //when start date filter is applied
                        if(action.payload.isFilterForwarded === true){
                            let localAppliedLeftThumb = getFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                            let localAppliedRightThumb = getFilterFromFilterArray('<=',  action.payload.segment, action.payload.value, action.payload.filter);
                            //forwarded from reports page
                            return { ...state, startDateAggregateValues: action.payload.newAnalysisFilterAggregate, startDateMinValue: localMin, startDateMaxValue: localMax, startDateLeftThumb: localAppliedLeftThumb, startDateRightThumb: localAppliedRightThumb, startDateAggregateLoader: false };
                        } else {
                            localMin = getFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                            localMax = getFilterFromFilterArray('<=',  action.payload.segment, action.payload.value, action.payload.filter);
                            return{ ...state, startDateLeftThumb: localMin, startDateRightThumb: localMax, startDateAggregateLoader: false };
                        }
                    } else {
                        //initial, no start date filter applied
                        return { ...state, startDateAggregateValues: action.payload.newAnalysisFilterAggregate, startDateMinValue: localMin, startDateMaxValue: localMax, startDateLeftThumb: localMin, startDateRightThumb: localMax, startDateAggregateLoader: false };
                    }
                } else {
                    return { ...state, startDateAggregateValues: action.payload.newAnalysisFilterAggregate, startDateAggregateLoader: false };
                }
            } else if (action.payload.segment === 'term' && action.payload.value === 'end date' && action.payload.level === 0) {
                if(action.payload.newAnalysisFilterAggregate.length > 0){
                    let lastElementIndex = action.payload.newAnalysisFilterAggregate.length - 1;
                    let localMin: string = action.payload.newAnalysisFilterAggregate[0].value;
                    let localMax: string = action.payload.newAnalysisFilterAggregate[lastElementIndex].value;
                    if(action.payload.filter.length > 0 && filterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){ 
                        if(action.payload.isFilterForwarded === true){
                            let localAppliedLeftThumb = getFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                            let localAppliedRightThumb = getFilterFromFilterArray('<=',  action.payload.segment, action.payload.value, action.payload.filter);
                            return { ...state, endDateAggregateValues: action.payload.newAnalysisFilterAggregate, endDateMinValue: localMin, endDateMaxValue: localMax, endDateLeftThumb: localAppliedLeftThumb, endDateRightThumb: localAppliedRightThumb, endDateAggregateLoader: false };
                        } else {
                            localMin = getFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                            localMax = getFilterFromFilterArray('<=',  action.payload.segment, action.payload.value, action.payload.filter);
                            return{ ...state, endDateLeftThumb: localMin, endDateRightThumb: localMax, endDateAggregateLoader: false };
                        }
                    } else {
                        return { ...state, endDateAggregateValues: action.payload.newAnalysisFilterAggregate, endDateMinValue: localMin, endDateMaxValue: localMax, endDateLeftThumb: localMin, endDateRightThumb: localMax, endDateAggregateLoader: false };
                    }
                } else {
                    return { ...state, endDateAggregateValues: action.payload.newAnalysisFilterAggregate, endDateAggregateLoader: false };
                }
            } else if (action.payload.segment === 'paymentobligation' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, paymentAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'paymentobligation' && action.payload.value === 'amount' && action.payload.level === 0) {
                if(action.payload.newAnalysisFilterAggregate.length > 0){
                    if(action.payload.filter.length > 0 && filterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){
                        if(action.payload.isFilterForwarded === true){
                            return { ...state, paymentCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, paymentCurrencyAggregateLoader: false, paymentAmountCurrency: getCurrencyValueFromFilterArray(action.payload.value, action.payload.segment ,action.payload.filter) };
                        } else {
                            return { ...state, paymentCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, paymentCurrencyAggregateLoader: false };
                        }
                    } else {
                        return { ...state, paymentCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, paymentCurrencyAggregateLoader: false };
                    }
                } else {
                    return { ...state, paymentCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, paymentCurrencyAggregateLoader: false, paymentAmountAggregateLoader: false };
                }
            } else if (action.payload.segment === 'paymentobligation' && action.payload.value !== 'amount' && action.payload.value.length > 0 && action.payload.level === 1) {
                if(action.payload.newAnalysisFilterAggregate.length > 0){
                    let localMinAmount: string = getMinNumberFromAggregate(action.payload.newAnalysisFilterAggregate);
                    let localMaxAmount: string = getMaxNumberFromAggregate(action.payload.newAnalysisFilterAggregate);
                    if(action.payload.filter.length > 0 && amountFilterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){
                        let localLeftThumb: string = getAmountFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                        let localRightThumb: string = getAmountFilterFromFilterArray('<=', action.payload.segment, action.payload.value, action.payload.filter);
                        if(action.payload.isFilterForwarded === true){
                            return { ...state, paymentAmountAggregateValues: action.payload.newAnalysisFilterAggregate, paymentAmountMinValue: localMinAmount, paymentAmountMaxValue: localMaxAmount, paymentAmountLeftThumb: localLeftThumb, paymentAmountRightThumb: localRightThumb, paymentAmountAggregateLoader: false };
                        } else {
                            return { ...state, paymentAmountLeftThumb: localLeftThumb, paymentAmountRightThumb: localRightThumb, paymentAmountAggregateLoader: false };
                        }
                    } else {
                        return { ...state, paymentAmountAggregateValues: action.payload.newAnalysisFilterAggregate, paymentAmountMinValue: localMinAmount, paymentAmountMaxValue: localMaxAmount, paymentAmountLeftThumb: localMinAmount, paymentAmountRightThumb: localMaxAmount, paymentAmountAggregateLoader: false };
                    }
                } else {
                    return { ...state, paymentAmountAggregateValues: action.payload.newAnalysisFilterAggregate, paymentAmountAggregateLoader: false };
                }
            } else if (action.payload.segment === 'indemnity' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, indemnityAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'amount' && action.payload.level === 0) {
                if(action.payload.newAnalysisFilterAggregate.length > 0){
                    if(action.payload.filter.length > 0 && filterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){
                        if(action.payload.isFilterForwarded === true){
                            return { ...state, indemnityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, indemnityCurrencyAggregateLoader: false, indemnityAmountCurrency: getCurrencyValueFromFilterArray(action.payload.value, action.payload.segment ,action.payload.filter) };
                        } else {
                            return { ...state, indemnityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, indemnityCurrencyAggregateLoader: false };
                        }
                    } else {
                        return { ...state, indemnityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, indemnityCurrencyAggregateLoader: false };
                    }
                } else {
                    return { ...state, indemnityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, indemnityCurrencyAggregateLoader: false, indemnityAmountAggregateLoader: false };
                }
            } else if (action.payload.segment === 'indemnity' && action.payload.value !== 'amount' && action.payload.value.length > 0 && action.payload.level === 1) {
                let localMinAmount: string = getMinNumberFromAggregate(action.payload.newAnalysisFilterAggregate);
                let localMaxAmount: string = getMaxNumberFromAggregate(action.payload.newAnalysisFilterAggregate);
                if(action.payload.filter.length > 0 && amountFilterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){
                    let localLeftThumb: string = getAmountFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                    let localRightThumb: string = getAmountFilterFromFilterArray('<=', action.payload.segment, action.payload.value, action.payload.filter);
                    if(action.payload.isFilterForwarded === true){
                        return { ...state, indemnityAmountAggregateValues: action.payload.newAnalysisFilterAggregate, indemnityAmountMinValue: localMinAmount, indemnityAmountMaxValue: localMaxAmount, indemnityAmountLeftThumb: localLeftThumb, indemnityAmountRightThumb: localRightThumb, indemnityAmountAggregateLoader: false };
                    } else {
                        return { ...state, indemnityAmountLeftThumb: localLeftThumb, indemnityAmountRightThumb: localRightThumb, indemnityAmountAggregateLoader: false };
                    }
                } else {
                    return { ...state, indemnityAmountAggregateValues: action.payload.newAnalysisFilterAggregate, indemnityAmountMinValue: localMinAmount, indemnityAmountMaxValue: localMaxAmount, indemnityAmountLeftThumb: localMinAmount, indemnityAmountRightThumb: localMaxAmount, indemnityAmountAggregateLoader: false };
                }
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'payer' && action.payload.level === 0) {
                return { ...state, indemnityPayerAggregateValues: action.payload.newAnalysisFilterAggregate , indemnityPayerAggregateLoader: false  };
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'payee' && action.payload.level === 0) {
                return { ...state, indemnityPayeeAggregateValues: action.payload.newAnalysisFilterAggregate , indemnityPayeeAggregateLoader: false };
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'triggering events' && action.payload.level === 0) {
                return { ...state, indemnityTriggeringEventAggregateValues: action.payload.newAnalysisFilterAggregate , indemnityTriggeringEventAggregateLoader: false };
            } else if (action.payload.segment === 'indemnity' && action.payload.value === 'extent of costs' && action.payload.level === 0) {
                return { ...state, indemnityExtentOfCostsAggregateValues: action.payload.newAnalysisFilterAggregate , indemnityExtentOfCostsAggregateLoader: false };
            } else if (action.payload.segment === 'noncompete' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, nonCompeteAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'noncompete' && action.payload.value === 'territory' && action.payload.level === 0) {
                return { ...state, nonCompeteTerritoryAggregateValues: action.payload.newAnalysisFilterAggregate, nonCompeteTerritoryAggregateLoader: false };
            } else if (action.payload.segment === 'limitationofliability' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, limitationOfLiabilityAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'limitationofliability' && action.payload.value === 'amount' && action.payload.level === 0) {
                if(action.payload.newAnalysisFilterAggregate.length > 0){
                    if(action.payload.filter.length > 0 && filterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){
                        if(action.payload.isFilterForwarded === true){
                            return { ...state, limitationOfLiabilityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, limitationOfLiabilityCurrencyAggregateLoader: false, limitationOfLiabilityAmountCurrency: getCurrencyValueFromFilterArray(action.payload.value, action.payload.segment ,action.payload.filter) };
                        } else {
                            return { ...state, limitationOfLiabilityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, limitationOfLiabilityCurrencyAggregateLoader: false };
                        }
                    } else {
                        return { ...state, limitationOfLiabilityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, limitationOfLiabilityCurrencyAggregateLoader: false };
                    }
                } else {
                    return { ...state, limitationOfLiabilityCurrencyAggregateValues: action.payload.newAnalysisFilterAggregate, limitationOfLiabilityCurrencyAggregateLoader: false, limitationOfLiabilityAmountAggregateLoader: false };
                }
            } else if (action.payload.segment === 'limitationofliability' && action.payload.value !== 'amount' && action.payload.value.length > 0 && action.payload.level === 1) {
                let localMinAmount: string = getMinNumberFromAggregate(action.payload.newAnalysisFilterAggregate);
                let localMaxAmount: string = getMaxNumberFromAggregate(action.payload.newAnalysisFilterAggregate);
                if(action.payload.filter.length > 0 && amountFilterForBiExists(action.payload.segment, action.payload.value, action.payload.filter) === true){
                    let localLeftThumb: string = getAmountFilterFromFilterArray('>=', action.payload.segment, action.payload.value, action.payload.filter);
                    let localRightThumb: string = getAmountFilterFromFilterArray('<=', action.payload.segment, action.payload.value, action.payload.filter);
                    if(action.payload.isFilterForwarded === true){
                        return { ...state, limitationOfLiabilityAmountAggregateValues: action.payload.newAnalysisFilterAggregate, limitationOfLiabilityAmountMinValue: localMinAmount, limitationOfLiabilityAmountMaxValue: localMaxAmount, limitationOfLiabilityAmountLeftThumb: localLeftThumb, limitationOfLiabilityAmountRightThumb: localRightThumb, limitationOfLiabilityAmountAggregateLoader: false };
                    } else {
                        return { ...state, limitationOfLiabilityAmountLeftThumb: localLeftThumb, limitationOfLiabilityAmountRightThumb: localRightThumb, limitationOfLiabilityAmountAggregateLoader: false };
                    }
                } else {
                    return { ...state, limitationOfLiabilityAmountAggregateValues: action.payload.newAnalysisFilterAggregate, limitationOfLiabilityAmountMinValue: localMinAmount, limitationOfLiabilityAmountMaxValue: localMaxAmount, limitationOfLiabilityAmountLeftThumb: localMinAmount, limitationOfLiabilityAmountRightThumb: localMaxAmount, limitationOfLiabilityAmountAggregateLoader: false };
                }
            } else if (action.payload.segment === 'sublettingassignment' && action.payload.value === '' && action.payload.level === -1) {
                return { ...state, sublettingAssignmentAggregate: action.payload.newAnalysisFilterAggregate };
            } else if (action.payload.segment === 'sublettingassignment' && action.payload.value === 'Consent' && action.payload.level === 0) {
                return { ...state, sublettingAssignmentConsentAggregateValues: action.payload.newAnalysisFilterAggregate, sublettingAssignmentConsentAggregateLoader: false };
            } else if (action.payload.segment === 'sublettingassignment' && action.payload.value === 'Notice' && action.payload.level === 0) {
                return { ...state, sublettingAssignmentNoticeAggregateValues: action.payload.newAnalysisFilterAggregate, sublettingAssignmentNoticeAggregateLoader: false };
            } else {
                return { ...state };
            }
        }
        case SAVENEWANALYSISLOCALAPPLIEDFILTER: {
            return { ...state, newAnalysisLocalAppliedFilter: action.payload.newAnalysisLocalAppliedFilter };
        }
        case APPLYNEWANALYSISFILTER: {
            return { ...state, appliedFilter: action.payload.filter, newAnalysisDataLoader: true, clauseAggregateLoader: true, clausePresentAggregateLoader: true, clauseAbsentAggregateLoader: true, natureTagsAggregateLoader: true, typeTagsAggregateLoader: true, groupsTagsAggregateLoader: true, partyAggregateLoader: true, confidentialityNatureAggregateLoader: true, changeOfControlIntersectionLoader: true, terminationAtConvinienceAggregateLoader: true, terminationEventAggregateLoader: true, eventOfDefaultEventAggregateLoader: true, forceMajuereEventAggregateLoader: true, governingLawJurisdictionAggregateLoader: true, disputeResolutionVenueAggregateLoader: true, disputeResolutionOthersAggregateLoader: true, disputeResolutionArbitrationAggregateLoader: true, disputeResolutionActStatuteAggregateLoader: true, disputeResolutionPanelAggregateLoader: true, disputeResolutionNegotiationAggregateLoader: true, disputeResolutionMediationAggregateLoader: true, disputeResolutionConciliationAggregateLoader: true, consentTypeAggregateLoader: true, consentAuthorityAggregateLoader: true, startDateAggregateLoader: true, endDateAggregateLoader: true, paymentCurrencyAggregateLoader: true, paymentAmountAggregateLoader: true, indemnityAmountAggregateLoader: true, indemnityCurrencyAggregateLoader: true, indemnityPayeeAggregateLoader: true, indemnityPayerAggregateLoader: true, nonCompeteTerritoryAggregateLoader: true, indemnityExtentOfCostsAggregateLoader: true, indemnityTriggeringEventAggregateLoader: true, limitationOfLiabilityAmountAggregateLoader: true, limitationOfLiabilityCurrencyAggregateLoader: true, sublettingAssignmentNoticeAggregateLoader: true, sublettingAssignmentConsentAggregateLoader: true };
        }
        case APPLYNEWANALYSISFILTER_SUCCESS: {
            return { ...state, newAnalysisFileIds: action.payload.newAnalysisFileIds, newAnalysisDataLoader: false };
        }
        case GETNEWANALYSISFILTERCOUNT_SUCCESS: {
            return { ...state, newAnalysisFilteredCount: action.payload.count };
        }
        case SAVENEWANALYSISSORT: {
            return { ...state, newAnalysisSortedBy: action.payload.newAnalysisSortedBy, newAnalysisSortOrder: action.payload.newAnalysisSortOrder };
        }
        case SAVENEWANALYSISFILTER: {
            return { ...state, appliedFilter: action.payload.appliedFilter };
        }
        case GETNEWANALYSISTABLECONFIG: {
            return { ...state, newAnalysisTableConfigLoader: true }
        }
        case GETNEWANALYSISTABLECONFIG_SUCCESS: {
            return { ...state, newAnalysisTableConfigLoader: false, newAnalysisTableConfig: action.payload.newAnalysisTableConfig }
        }
        case GETNEWANALYSISINITIALFILEID:{
            return { ...state, newAnalysisLoader: true, newAnalysisDataLoader: true, clausePresentAggregateLoader: true, clauseAbsentAggregateLoader: true };
        }
        case GETNEWANALYSISINITIALFILEID_SUCCESS: {
            return { ...state, newAnalysisInitialFileIds: action.payload.newAnalysisInitialFileIds };
        }
        case SAVENEWANALYSISCURRENCY: {
            if(action.payload.typeName === 'paymentobligation' ) {
                return { ...state, paymentAmountCurrency: action.payload.currencyName };
            } else if(action.payload.typeName === 'indemnity') {
                return { ...state, indemnityAmountCurrency: action.payload.currencyName };
            } else if (action.payload.typeName === 'limitationofliability' ) {
                return { ...state, limitationOfLiabilityAmountCurrency: action.payload.currencyName };
            }
            return { ...state };
        }
        default: return state;
    }
}
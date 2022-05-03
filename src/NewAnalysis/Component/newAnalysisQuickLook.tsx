import React, { Component } from 'react'
import AmountSeriesSlider from '../../UniversalComponents/RangeSlider/amountSeriesSlider';
import DateSeriesSlider from '../../UniversalComponents/RangeSlider/dateSeriesSlider';
import {   NewAnalysisFilterAggregate, NewAnalysisFilterConfig, NewAnalysisFilterStructure } from '../State/newAnalysisState';
import {  getChildFromAggregate, getConfigForClause } from '../Utils/newAnalysisUtils';
import NewAnalysisQuickLookCard from './newAnalysisQuickLookCard';


interface Props {
    newAnalysisFileIds: number[];
    newAnalysisFilterConfig: NewAnalysisFilterConfig[];
    newAnalysisSortedBy: string;
    newAnalysisSortOrder: string;
    applyNewAnalysisFilter: ( sort: string, filter: NewAnalysisFilterStructure[], newAnalysisSortedBy: string, newAnalysisSortOrder: string) => void;
    appliedFilter: NewAnalysisFilterStructure[];
    getNewAnalysisFilterAggregate: ( value: string, level: number, page: string, sort: string, order: string, filter: NewAnalysisFilterStructure[], segment: string, isFilterForwarded: boolean ) => void;
    isFilterForwarded: boolean;
    clearForwardedFilter: () => void;
    getNewAnalysisFilterCount: ( filter: NewAnalysisFilterStructure[]) => void;
    newAnalysisFilteredCount: number;
    saveNewAnalysisCurrency: (currencyName: string, typeName: string ) => void;
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
interface State {
}

export default class NewAnalysisQuickLook extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
        this.getAggregateLoader = this.getAggregateLoader.bind(this);
        this.getAggregateValues = this.getAggregateValues.bind(this);
        this.getMinValue = this.getMinValue.bind(this);
        this.getMaxValue = this.getMaxValue.bind(this);
        this.getLeftThumb = this.getLeftThumb.bind(this);
        this.getRightThumb = this.getRightThumb.bind(this);
    }

    render() {
        let { appliedFilter, newAnalysisSortOrder, newAnalysisSortedBy, clauseAggregate,  applyNewAnalysisFilter, getNewAnalysisFilterCount, newAnalysisFilteredCount, saveNewAnalysisCurrency, newAnalysisFilterConfig, isFilterForwarded, clearForwardedFilter,getNewAnalysisFilterAggregate , tagsAggregate, partyAggregate, confidentialityAggregate, changeOfControlAggregate, terminationAggregate, disputeResolutionAggregate, consentAggregate,  eventOfDefaultAggregate, forceMajeureAggregate, governingLawAggregate, termAggregate, paymentAggregate,  paymentAmountAggregateLoader, paymentAmountAggregateValues, paymentAmountRightThumb, paymentAmountMinValue, paymentAmountMaxValue, paymentAmountLeftThumb, paymentAmountCurrency, paymentCurrencyAggregateLoader, paymentCurrencyAggregateValues, indemnityAggregate, limitationOfLiabilityAggregate, nonCompeteAggregate,  indemnityCurrencyAggregateLoader, indemnityCurrencyAggregateValues, indemnityAmountAggregateValues, indemnityAmountRightThumb, indemnityAmountMinValue, indemnityAmountMaxValue, indemnityAmountLeftThumb, indemnityAmountCurrency, indemnityAmountAggregateLoader, limitationOfLiabilityCurrencyAggregateValues, limitationOfLiabilityAmountAggregateLoader, limitationOfLiabilityAmountRightThumb, limitationOfLiabilityAmountMinValue, limitationOfLiabilityAmountMaxValue, limitationOfLiabilityAmountLeftThumb,limitationOfLiabilityAmountCurrency, limitationOfLiabilityAmountAggregateValues, limitationOfLiabilityCurrencyAggregateLoader, sublettingAssignmentAggregate } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 mt-4">

                    {clauseAggregate.length > 0 && 
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Clauses'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {clauseAggregate.map((clauseBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(clauseBi, getConfigForClause('clause', newAnalysisFilterConfig))} parentAggregate={clauseBi} aggregateValues={this.getAggregateValues(clauseBi, getConfigForClause('clause', newAnalysisFilterConfig))}  biTitle={clauseBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('clause', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {(tagsAggregate.length > 0 ||  partyAggregate.length > 0) &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Basic Information'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {tagsAggregate.slice(0, 3).map((tags, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(tags, getConfigForClause('tags', newAnalysisFilterConfig))} parentAggregate={tags} aggregateValues={this.getAggregateValues(tags, getConfigForClause('tags', newAnalysisFilterConfig))}  biTitle={tags.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('tags', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                        {partyAggregate.map((party, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(party, getConfigForClause('party', newAnalysisFilterConfig))} parentAggregate={party} aggregateValues={this.getAggregateValues(party, getConfigForClause('party', newAnalysisFilterConfig))}  biTitle={party.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('party', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {termAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Term Clause'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block"  style={{height: "160px"}}>
                                    <div className="row">
                                        {termAggregate.map((termAgg, i)=>
                                            <div className="col-md-5 mt-3 ml-5 mr-3">
                                                <DateSeriesSlider labelName={termAgg.alias} loader={this.getAggregateLoader(termAgg, getConfigForClause('term', newAnalysisFilterConfig))} 
                                                minValue={this.getMinValue(termAgg, getConfigForClause('term', newAnalysisFilterConfig))} 
                                                maxValue={this.getMaxValue(termAgg, getConfigForClause('term', newAnalysisFilterConfig))} 
                                                leftThumb={this.getLeftThumb(termAgg, getConfigForClause('term', newAnalysisFilterConfig))} 
                                                rightThumb={this.getRightThumb(termAgg, getConfigForClause('term', newAnalysisFilterConfig))} 
                                                dateAggregate={this.getAggregateValues(termAgg, getConfigForClause('term', newAnalysisFilterConfig))} parentAggregate={termAgg} configComponent={getConfigForClause('term', newAnalysisFilterConfig)} appliedFilter={appliedFilter} newAnalysisSortOrder={newAnalysisSortOrder} newAnalysisSortedBy={newAnalysisSortedBy} applyNewAnalysisFilter={applyNewAnalysisFilter} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {paymentAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Payment Obligation'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block"  style={{height: "160px"}}>
                                    <div className="row">
                                        {paymentAggregate.map((paymentAgg, i)=>
                                            <div className="col-md-5 mt-3 ml-5 mr-3">
                                                <AmountSeriesSlider labelName={paymentAgg.alias} amountLoader={paymentAmountAggregateLoader} currencyLoader={paymentCurrencyAggregateLoader}
                                                minValue={paymentAmountMinValue} 
                                                maxValue={paymentAmountMaxValue} 
                                                leftThumb={paymentAmountLeftThumb} 
                                                rightThumb={paymentAmountRightThumb} 
                                                currencyAggregate={paymentCurrencyAggregateValues} 
                                                amountAggregate={paymentAmountAggregateValues} 
                                                parentAggregate={paymentAgg} configComponent={getConfigForClause('paymentobligation', newAnalysisFilterConfig)} appliedFilter={appliedFilter} newAnalysisSortOrder={newAnalysisSortOrder} newAnalysisSortedBy={newAnalysisSortedBy} applyNewAnalysisFilter={applyNewAnalysisFilter} saveNewAnalysisCurrency={saveNewAnalysisCurrency} currencyValue={paymentAmountCurrency} isFilterForwarded={isFilterForwarded} getNewAnalysisFilterAggregate={getNewAnalysisFilterAggregate} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    {indemnityAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Indemnity'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block" style={{height: "460px"}}>
                                    <div className="row">
                                       {indemnityAggregate.map((indemnityBi, i)=>
                                            <>
                                            {indemnityBi.value === "amount" ?
                                                <div className="col-md-5 mt-3 ml-5 mr-3">
                                                    <AmountSeriesSlider labelName={indemnityBi.alias} amountLoader={indemnityAmountAggregateLoader} currencyLoader={indemnityCurrencyAggregateLoader}
                                                    minValue={indemnityAmountMinValue} 
                                                    maxValue={indemnityAmountMaxValue} 
                                                    leftThumb={indemnityAmountLeftThumb} 
                                                    rightThumb={indemnityAmountRightThumb} 
                                                    currencyAggregate={indemnityCurrencyAggregateValues} 
                                                    amountAggregate={indemnityAmountAggregateValues} 
                                                    parentAggregate={indemnityBi} configComponent={getConfigForClause('indemnity', newAnalysisFilterConfig)} appliedFilter={appliedFilter} newAnalysisSortOrder={newAnalysisSortOrder} newAnalysisSortedBy={newAnalysisSortedBy} applyNewAnalysisFilter={applyNewAnalysisFilter} saveNewAnalysisCurrency={saveNewAnalysisCurrency} currencyValue={indemnityAmountCurrency} isFilterForwarded={isFilterForwarded} getNewAnalysisFilterAggregate={getNewAnalysisFilterAggregate} clearForwardedFilter={clearForwardedFilter} />
                                                </div>
                                            :
                                                <div className="col-md-3" key={i}>
                                                    <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(indemnityBi, getConfigForClause('indemnity', newAnalysisFilterConfig))} parentAggregate={indemnityBi} aggregateValues={this.getAggregateValues(indemnityBi, getConfigForClause('indemnity', newAnalysisFilterConfig))}  biTitle={indemnityBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('indemnity', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                                </div>
                                            }
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {confidentialityAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Confidentiality'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {confidentialityAggregate.map((confidentialityBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(confidentialityBi, getConfigForClause('confidentiality', newAnalysisFilterConfig))} parentAggregate={confidentialityBi} aggregateValues={this.getAggregateValues(confidentialityBi, getConfigForClause('confidentiality', newAnalysisFilterConfig))}  biTitle={confidentialityBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('confidentiality', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {changeOfControlAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Change of Control'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {changeOfControlAggregate.map((changeOfControlBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(changeOfControlBi, getConfigForClause('changeofControl', newAnalysisFilterConfig))} parentAggregate={changeOfControlBi} aggregateValues={this.getAggregateValues(changeOfControlBi, getConfigForClause('changeofControl', newAnalysisFilterConfig))}  biTitle={changeOfControlBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('changeofControl', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {terminationAggregate.length > 0 &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Termination'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {terminationAggregate.map((terminationBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(terminationBi, getConfigForClause('termination', newAnalysisFilterConfig))} parentAggregate={terminationBi} aggregateValues={this.getAggregateValues(terminationBi, getConfigForClause('termination', newAnalysisFilterConfig))}  biTitle={terminationBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('termination', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {eventOfDefaultAggregate.length > 0 && 
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Events of Default'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {eventOfDefaultAggregate.map((eventOfDefaultBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(eventOfDefaultBi, getConfigForClause('eventsofdefault', newAnalysisFilterConfig))} parentAggregate={eventOfDefaultBi} aggregateValues={this.getAggregateValues(eventOfDefaultBi, getConfigForClause('eventsofdefault', newAnalysisFilterConfig))}  biTitle={eventOfDefaultBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('eventsofdefault', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {limitationOfLiabilityAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Limitation Of Liability'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                       {limitationOfLiabilityAggregate.map((limitationOfLiabilityBi, i)=>
                                            <>
                                            {limitationOfLiabilityBi.value === "amount" ?
                                                <div className="col-md-5 mt-3 ml-5 mr-3">
                                                    <AmountSeriesSlider labelName={limitationOfLiabilityBi.alias} amountLoader={limitationOfLiabilityAmountAggregateLoader} currencyLoader={limitationOfLiabilityCurrencyAggregateLoader}
                                                    minValue={limitationOfLiabilityAmountMinValue} 
                                                    maxValue={limitationOfLiabilityAmountMaxValue} 
                                                    leftThumb={limitationOfLiabilityAmountLeftThumb} 
                                                    rightThumb={limitationOfLiabilityAmountRightThumb} 
                                                    currencyAggregate={limitationOfLiabilityCurrencyAggregateValues} 
                                                    amountAggregate={limitationOfLiabilityAmountAggregateValues} 
                                                    parentAggregate={limitationOfLiabilityBi} configComponent={getConfigForClause('limitationofliability', newAnalysisFilterConfig)} appliedFilter={appliedFilter} newAnalysisSortOrder={newAnalysisSortOrder} newAnalysisSortedBy={newAnalysisSortedBy} applyNewAnalysisFilter={applyNewAnalysisFilter} saveNewAnalysisCurrency={saveNewAnalysisCurrency} currencyValue={limitationOfLiabilityAmountCurrency} isFilterForwarded={isFilterForwarded} getNewAnalysisFilterAggregate={getNewAnalysisFilterAggregate} clearForwardedFilter={clearForwardedFilter} />
                                                </div>
                                            :
                                                <div className="col-md-3" key={i}>
                                                    <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(limitationOfLiabilityBi, getConfigForClause('limitationofliability', newAnalysisFilterConfig))} parentAggregate={limitationOfLiabilityBi} aggregateValues={this.getAggregateValues(limitationOfLiabilityBi, getConfigForClause('limitationofliability', newAnalysisFilterConfig))}  biTitle={limitationOfLiabilityBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('limitationofliability', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                                </div>
                                            }
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {forceMajeureAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Force Majeure'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {forceMajeureAggregate.map((forceMajeureBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(forceMajeureBi, getConfigForClause('forcemajeure', newAnalysisFilterConfig))} parentAggregate={forceMajeureBi} aggregateValues={this.getAggregateValues(forceMajeureBi, getConfigForClause('forcemajeure', newAnalysisFilterConfig))}  biTitle={forceMajeureBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('forcemajeure', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    {governingLawAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Governing Law'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {governingLawAggregate.map((governingLawBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(governingLawBi, getConfigForClause('governinglaw', newAnalysisFilterConfig))} parentAggregate={governingLawBi} aggregateValues={this.getAggregateValues(governingLawBi, getConfigForClause('governinglaw', newAnalysisFilterConfig))}  biTitle={governingLawBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('governinglaw', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    {disputeResolutionAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Dispute Resolution'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block" style={{height: "460px"}}>
                                    <div className="row">
                                        {disputeResolutionAggregate.map((disputeResolutionBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(disputeResolutionBi, getConfigForClause('disputeresolution', newAnalysisFilterConfig))} parentAggregate={disputeResolutionBi} aggregateValues={this.getAggregateValues(disputeResolutionBi, getConfigForClause('disputeresolution', newAnalysisFilterConfig))}  biTitle={disputeResolutionBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('disputeresolution', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                    {nonCompeteAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Non Compete'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                        {nonCompeteAggregate.map((nonCompeteBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(nonCompeteBi, getConfigForClause('noncompete', newAnalysisFilterConfig))} parentAggregate={nonCompeteBi} aggregateValues={this.getAggregateValues(nonCompeteBi, getConfigForClause('noncompete', newAnalysisFilterConfig))}  biTitle={nonCompeteBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('noncompete', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    {consentAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Consent Clause'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                       {consentAggregate.map((consentBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(consentBi, getConfigForClause('consent', newAnalysisFilterConfig))} parentAggregate={consentBi} aggregateValues={this.getAggregateValues(consentBi, getConfigForClause('consent', newAnalysisFilterConfig))}  biTitle={consentBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('consent', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                {sublettingAssignmentAggregate.length > 0 &&  
                    <div className="row">
                        <div className="col-md-12">
                            <div className="new-analysis-clause-title">{'Subletting/Assignment'}</div>
                            <div className="row">
                                <div className="col-md-12 new-analysis-clause-block">
                                    <div className="row">
                                       {sublettingAssignmentAggregate.map((sublettingAssignmentBi, i)=>
                                            <div className="col-md-3" key={i}>
                                                <NewAnalysisQuickLookCard newAnalysisSortedBy={newAnalysisSortedBy} newAnalysisSortOrder={newAnalysisSortOrder} appliedFilter={appliedFilter} loader={this.getAggregateLoader(sublettingAssignmentBi, getConfigForClause('sublettingassignment', newAnalysisFilterConfig))} parentAggregate={sublettingAssignmentBi} aggregateValues={this.getAggregateValues(sublettingAssignmentBi, getConfigForClause('sublettingassignment', newAnalysisFilterConfig))}  biTitle={sublettingAssignmentBi.alias} biType={'card'} applyNewAnalysisFilter={applyNewAnalysisFilter}  configComponent={getConfigForClause('sublettingassignment', newAnalysisFilterConfig)} getNewAnalysisFilterCount={getNewAnalysisFilterCount} newAnalysisFilteredCount={newAnalysisFilteredCount} isFilterForwarded={isFilterForwarded} clearForwardedFilter={clearForwardedFilter} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
        );
    }

    getAggregateLoader(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig ): boolean{
        let {clauseAbsentAggregateLoader, clausePresentAggregateLoader, partyAggregateLoader, typeTagsAggregateLoader, groupsTagsAggregateLoader, natureTagsAggregateLoader, consentTypeAggregateLoader, consentAuthorityAggregateLoader, terminationEventAggregateLoader, forceMajuereEventAggregateLoader, changeOfControlIntersectionLoader, eventOfDefaultEventAggregateLoader, confidentialityNatureAggregateLoader, disputeResolutionPanelAggregateLoader, disputeResolutionVenueAggregateLoader, disputeResolutionOthersAggregateLoader, governingLawJurisdictionAggregateLoader, terminationAtConvinienceAggregateLoader, disputeResolutionMediationAggregateLoader, disputeResolutionActStatuteAggregateLoader, disputeResolutionArbitrationAggregateLoader, disputeResolutionNegotiationAggregateLoader, disputeResolutionConciliationAggregateLoader,startDateAggregateLoader, endDateAggregateLoader, paymentAmountAggregateLoader, paymentCurrencyAggregateLoader, indemnityPayeeAggregateLoader, indemnityPayerAggregateLoader, indemnityAmountAggregateLoader, indemnityCurrencyAggregateLoader, nonCompeteTerritoryAggregateLoader, indemnityExtentOfCostsAggregateLoader, indemnityTriggeringEventAggregateLoader, limitationOfLiabilityAmountAggregateLoader, limitationOfLiabilityCurrencyAggregateLoader, sublettingAssignmentNoticeAggregateLoader, sublettingAssignmentConsentAggregateLoader } = this.props;
        if(configComponent.type === 'clause' && parentAggregate.value === 'yes'){
            return clausePresentAggregateLoader; 
        } else if(configComponent.type === 'clause' && parentAggregate.value === 'no'){
            return clauseAbsentAggregateLoader; 
        } else if (configComponent.type === 'tags' && parentAggregate.value === 'nature') {
            return natureTagsAggregateLoader; 
        } else if (configComponent.type === 'tags' && parentAggregate.value === 'type') {
            return typeTagsAggregateLoader; 
        } else if (configComponent.type === 'tags' && parentAggregate.value === 'others') {
            return groupsTagsAggregateLoader; 
        } else if (configComponent.type === 'party' && parentAggregate.value === 'name') {
            return partyAggregateLoader; 
        } else if (configComponent.type === 'confidentiality' && parentAggregate.value === 'nature') {
            return confidentialityNatureAggregateLoader; 
        } else if (configComponent.type === 'changeofControl' && parentAggregate.value === 'intersection') {
            return changeOfControlIntersectionLoader; 
        } else if (configComponent.type === 'termination' && parentAggregate.value === 'at convenience') {
            return terminationAtConvinienceAggregateLoader; 
        } else if (configComponent.type === 'termination' && parentAggregate.value === 'event') {
            return terminationEventAggregateLoader; 
        } else if (configComponent.type === 'eventsofdefault' && parentAggregate.value === 'event') {
            return eventOfDefaultEventAggregateLoader; 
        } else if (configComponent.type === 'forcemajeure' && parentAggregate.value === 'event') {
            return forceMajuereEventAggregateLoader; 
        } else if (configComponent.type === 'governinglaw' && parentAggregate.value === 'jurisdiction') {
            return governingLawJurisdictionAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'venue') {
            return disputeResolutionVenueAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Others') {
            return disputeResolutionOthersAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Arbitration') {
            return disputeResolutionArbitrationAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'actstatute') {
            return disputeResolutionActStatuteAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'panel') {
            return disputeResolutionPanelAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Negotiation') {
            return disputeResolutionNegotiationAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Mediation') {
            return disputeResolutionMediationAggregateLoader; 
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Conciliation') {
            return disputeResolutionConciliationAggregateLoader; 
        } else if (configComponent.type === 'consent' && parentAggregate.value === 'Type') {
            return consentTypeAggregateLoader; 
        } else if (configComponent.type === 'consent' && parentAggregate.value === 'Authority') {
            return consentAuthorityAggregateLoader; 
        } else if (configComponent.type === 'term' && parentAggregate.value === 'start date') {
            return startDateAggregateLoader; 
        } else if (configComponent.type === 'term' && parentAggregate.value === 'end date') {
            return endDateAggregateLoader; 
        } else if (configComponent.type === 'paymentobligation' && parentAggregate.value === 'amount') {
            return  paymentCurrencyAggregateLoader;
        } else if (configComponent.type === 'paymentobligation' && parentAggregate.value !== 'amount' && parentAggregate.value.length > 0) {
            return  paymentAmountAggregateLoader;
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'amount') {
            return indemnityCurrencyAggregateLoader; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value !== 'amount' && parentAggregate.value !== 'payer' && parentAggregate.value !== 'payee' && parentAggregate.value !== 'triggering events' && parentAggregate.value !== 'extent of costs' && parentAggregate.value.length > 0) {
            return indemnityAmountAggregateLoader;
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'payer') {
            return indemnityPayerAggregateLoader; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'payee') {
            return indemnityPayeeAggregateLoader; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'triggering events') {
            return indemnityTriggeringEventAggregateLoader; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'extent of costs') {
            return indemnityExtentOfCostsAggregateLoader; 
        } else if (configComponent.type === 'noncompete' && parentAggregate.value === 'territory') {
            return nonCompeteTerritoryAggregateLoader; 
        } else if (configComponent.type === 'limitationofliability' && parentAggregate.value === 'amount') {
            return limitationOfLiabilityCurrencyAggregateLoader; 
        } else if (configComponent.type === 'limitationofliability' && parentAggregate.value !== 'amount' && parentAggregate.value.length > 0) {
            return limitationOfLiabilityAmountAggregateLoader;
        } else if (configComponent.type === 'sublettingassignment' && parentAggregate.value === 'Consent') {
            return sublettingAssignmentConsentAggregateLoader; 
        } else if (configComponent.type === 'sublettingassignment' && parentAggregate.value === 'Notice') {
            return sublettingAssignmentNoticeAggregateLoader; 
        }
        return  false; 
    }

    getAggregateValues(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig ): NewAnalysisFilterAggregate[] {
        let {partyAggregateValues, typeTagsAggregateValues, groupTagsAggregateValues, natureTagsAggregateValues, consentTypeAggregateValues, clauseAbsentAggregateValues, clausePresentAggregateValues, consentAuthorityAggregateValues, terminationEventAggregateValues, forceMajuereEventAggregateValues, eventOfDefaultEventAggregateValues, confidentialityNatureAggregateValues, disputeResolutionVenueAggregateValues, disputeResolutionPanelAggregateValues, disputeResolutionOthersAggregateValues, governingLawJurisdictionAggregateValues, terminationAtConvinienceAggregateValues, disputeResolutionMediationAggregateValues, disputeResolutionActStatuteAggregateValues, changeOfControlIntersectionAggregateValues, disputeResolutionNegotiationAggregateValues, disputeResolutionArbitrationAggregateValues, disputeResolutionConciliationAggregateValues, startDateAggregateValues, endDateAggregateValues, paymentAmountAggregateValues, paymentCurrencyAggregateValues, indemnityPayeeAggregateValues, indemnityPayerAggregateValues, indemnityAmountAggregateValues, indemnityCurrencyAggregateValues, nonCompeteTerritoryAggregateValues, indemnityExtentOfCostsAggregateValues, indemnityTriggeringEventAggregateValues, limitationOfLiabilityAmountAggregateValues, limitationOfLiabilityCurrencyAggregateValues, sublettingAssignmentNoticeAggregateValues, sublettingAssignmentConsentAggregateValues } = this.props; 
        let tempAggregateValues: NewAnalysisFilterAggregate[] = [];
        if(configComponent.type === 'clause' && parentAggregate.value === 'yes'){
            return  clausePresentAggregateValues;
        } else if(configComponent.type === 'clause' && parentAggregate.value === 'no'){
            return  clauseAbsentAggregateValues;
        } else if (configComponent.type === 'tags' && parentAggregate.value === 'nature') {
            return  natureTagsAggregateValues;
        } else if (configComponent.type === 'tags' && parentAggregate.value === 'type') {
            return  typeTagsAggregateValues;
        } else if (configComponent.type === 'tags' && parentAggregate.value === 'others') {
            return  groupTagsAggregateValues;
        } else if (configComponent.type === 'party' && parentAggregate.value === 'name') {
            return  partyAggregateValues;
        } else if (configComponent.type === 'confidentiality' && parentAggregate.value === 'nature') {
            return  confidentialityNatureAggregateValues;
        } else if (configComponent.type === 'changeofControl' && parentAggregate.value === 'intersection') {
            return  changeOfControlIntersectionAggregateValues;
        } else if (configComponent.type === 'termination' && parentAggregate.value === 'at convenience') {
            return  terminationAtConvinienceAggregateValues;
        } else if (configComponent.type === 'termination' && parentAggregate.value === 'event') {
            return  terminationEventAggregateValues;
        } else if (configComponent.type === 'eventsofdefault' && parentAggregate.value === 'event') {
            return  eventOfDefaultEventAggregateValues;
        } else if (configComponent.type === 'forcemajeure' && parentAggregate.value === 'event') {
            return  forceMajuereEventAggregateValues;
        } else if (configComponent.type === 'governinglaw' && parentAggregate.value === 'jurisdiction') {
            return  governingLawJurisdictionAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'venue') {
            return  disputeResolutionVenueAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Others') {
            return  disputeResolutionOthersAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Arbitration') {
            return  disputeResolutionArbitrationAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'actstatute') {
            return  disputeResolutionActStatuteAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'panel') {
            return  disputeResolutionPanelAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Negotiation') {
            return  disputeResolutionNegotiationAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Mediation') {
            return  disputeResolutionMediationAggregateValues;
        } else if (configComponent.type === 'disputeresolution' && parentAggregate.value === 'Conciliation') {
            return  disputeResolutionConciliationAggregateValues;
        } else if (configComponent.type === 'consent' && parentAggregate.value === 'Type') {
            return  consentTypeAggregateValues;
        } else if (configComponent.type === 'consent' && parentAggregate.value === 'Authority') {
            return  consentAuthorityAggregateValues;
        } else if (configComponent.type === 'term' && parentAggregate.value === 'start date') {
            return  startDateAggregateValues;
        } else if (configComponent.type === 'term' && parentAggregate.value === 'end date') {
            return  endDateAggregateValues;
        } else if (configComponent.type === 'paymentobligation' && parentAggregate.value === 'amount') {
            return  paymentCurrencyAggregateValues;
        } else if (configComponent.type === 'paymentobligation' && parentAggregate.value !== 'amount' && parentAggregate.value.length > 0) {
            return  paymentAmountAggregateValues;
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'amount') {
            return indemnityCurrencyAggregateValues; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value !== 'amount' && parentAggregate.value !== 'payer' && parentAggregate.value !== 'payee' && parentAggregate.value !== 'triggering events' && parentAggregate.value !== 'extent of costs' && parentAggregate.value.length > 0) {
            return indemnityAmountAggregateValues;
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'payer') {
            return indemnityPayerAggregateValues; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'payee') {
            return indemnityPayeeAggregateValues; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'triggering events') {
            return indemnityTriggeringEventAggregateValues; 
        } else if (configComponent.type === 'indemnity' && parentAggregate.value === 'extent of costs') {
            return indemnityExtentOfCostsAggregateValues; 
        } else if (configComponent.type === 'noncompete' && parentAggregate.value === 'territory') {
            return nonCompeteTerritoryAggregateValues; 
        } else if (configComponent.type === 'limitationofliability' && parentAggregate.value === 'amount') {
            return limitationOfLiabilityCurrencyAggregateValues; 
        } else if (configComponent.type === 'limitationofliability' && parentAggregate.value !== 'amount' && parentAggregate.value.length > 0) {
            return limitationOfLiabilityAmountAggregateValues;
        } else if (configComponent.type === 'sublettingassignment' && parentAggregate.value === 'Consent') {
            return sublettingAssignmentConsentAggregateValues; 
        } else if (configComponent.type === 'sublettingassignment' && parentAggregate.value === 'Notice') {
            return sublettingAssignmentNoticeAggregateValues; 
        }
        return tempAggregateValues;
    }

    getMinValue(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig): string{
        let {startDateMinValue, endDateMinValue} = this.props;
        let minValue: string = '';
        if (configComponent.type === 'term' && parentAggregate.value === 'start date') {
            return  startDateMinValue;
        } else if (configComponent.type === 'term' && parentAggregate.value === 'end date') {
            return  endDateMinValue;
        }
        return minValue;
    }

    getMaxValue(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig): string{
        let {startDateMaxValue, endDateMaxValue} = this.props;
        let maxValue: string = '';
        if (configComponent.type === 'term' && parentAggregate.value === 'start date') {
            return  startDateMaxValue;
        } else if (configComponent.type === 'term' && parentAggregate.value === 'end date') {
            return  endDateMaxValue;
        }
        return maxValue;
    }

    getLeftThumb(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig): string{
        let {startDateLeftThumb, endDateLeftThumb} = this.props;
        let leftThumb: string = '';
        if (configComponent.type === 'term' && parentAggregate.value === 'start date') {
            return  startDateLeftThumb;
        } else if (configComponent.type === 'term' && parentAggregate.value === 'end date') {
            return  endDateLeftThumb;
        }
        return leftThumb;
    }

    getRightThumb(parentAggregate: NewAnalysisFilterAggregate, configComponent: NewAnalysisFilterConfig): string{
        let {startDateRightThumb, endDateRightThumb} = this.props;
        let rightThumb: string = '';
        if (configComponent.type === 'term' && parentAggregate.value === 'start date') {
            return  startDateRightThumb;
        } else if (configComponent.type === 'term' && parentAggregate.value === 'end date') {
            return  endDateRightThumb;
        }
        return rightThumb;
    }
}

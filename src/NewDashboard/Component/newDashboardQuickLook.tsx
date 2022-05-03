import React, { Component } from 'react'
import DateSeriesSliderDashboard from '../../UniversalComponents/RangeSlider/dateSeriesSliderDashboard';
import {   NewDashboardFilterAggregate, NewDashboardFilterConfig, NewDashboardFilterStructure } from '../State/newDashboardState';
import {  getConfigForClauseDashboard } from '../Utils/newDashboardUtils';
import NewDashboardQuickLookCard from './newDashboardQuickLookCard';


interface Props {
    newDashboardFileIds: number[];
    newDashboardFilterConfig: NewDashboardFilterConfig[];
    newDashboardSortedBy: string;
    newDashboardSortOrder: string;
    applyNewDashboardFilter: ( sort: string, filter: NewDashboardFilterStructure[], newDashboardSortedBy: string, newDashboardSortOrder: string) => void;
    appliedFilter: NewDashboardFilterStructure[];
    getNewDashboardFilterAggregate: ( value: string, level: number, page: string, sort: string, order: string, filter: NewDashboardFilterStructure[], segment: string, isFilterForwarded: boolean ) => void;
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
interface State {
}

export default class NewDashboardQuickLook extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let { appliedFilter, newDashboardSortOrder, newDashboardSortedBy, applyNewDashboardFilter, newDashboardFilterConfig,tagsAggregate, partyAggregate, termAggregate, partyAggregateLoader, partyAggregateValues, typeTagsAggregateLoader, typeTagsAggregateValues, endDateLeftThumb, endDateMaxValue, endDateMinValue, endDateRightThumb, endDateAggregateLoader, endDateAggregateValues } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 mt-4">
                    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12" style={{marginBottom: '16px', height: "230px"}} >
                                    <div className="row">
                                        {tagsAggregate.slice(0, 3).map((tags, i)=>
                                            <>{ tags.value === 'type' &&
                                                <div className="col-md-3 mt-1" key={i}>
                                                    <NewDashboardQuickLookCard newDashboardSortedBy={newDashboardSortedBy} newDashboardSortOrder={newDashboardSortOrder} appliedFilter={appliedFilter} loader={typeTagsAggregateLoader} parentAggregate={tags} aggregateValues={typeTagsAggregateValues}  biTitle={tags.alias} biType={'card'} applyNewDashboardFilter={applyNewDashboardFilter}  configComponent={getConfigForClauseDashboard('tags', newDashboardFilterConfig)}/>
                                                </div>
                                            }
                                            </>
                                        )}
                                        {partyAggregate.map((party, i)=>
                                            <div className="col-md-3 mt-1" key={i}>
                                                <NewDashboardQuickLookCard newDashboardSortedBy={newDashboardSortedBy} newDashboardSortOrder={newDashboardSortOrder} appliedFilter={appliedFilter} loader={partyAggregateLoader} parentAggregate={party} aggregateValues={partyAggregateValues}  biTitle={party.alias} biType={'card'} applyNewDashboardFilter={applyNewDashboardFilter}  configComponent={getConfigForClauseDashboard('party', newDashboardFilterConfig)} />
                                            </div>
                                        )}
                                        {termAggregate.map((termAgg, i)=>
                                            <>{ termAgg.value === 'end date' && 
                                                <div className="col-md-5 mt-1 ml-2">
                                                    <DateSeriesSliderDashboard labelName={termAgg.alias} loader={endDateAggregateLoader} 
                                                    minValue={endDateMinValue} 
                                                    maxValue={endDateMaxValue} 
                                                    leftThumb={endDateLeftThumb} 
                                                    rightThumb={endDateRightThumb} 
                                                    dateAggregate={endDateAggregateValues} parentAggregate={termAgg} configComponent={getConfigForClauseDashboard('term', newDashboardFilterConfig)} appliedFilter={appliedFilter} newDashboardSortOrder={newDashboardSortOrder} newDashboardSortedBy={newDashboardSortedBy} applyNewDashboardFilter={applyNewDashboardFilter} />
                                                </div>
                                            }
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
        );
    }
}

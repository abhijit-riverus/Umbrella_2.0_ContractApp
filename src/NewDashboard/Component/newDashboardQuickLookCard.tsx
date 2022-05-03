import React, { Component } from 'react'
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';
import LinesLoader from '../../UniversalComponents/Loader/linesLoader';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import { NewDashboardFilterAggregate,  NewDashboardFilterConfig,  NewDashboardFilterStructure } from '../State/newDashboardState';
import { addOrRemoveDashboardFilter, generateNewDashboardFilter, isFilterApplied } from '../Utils/newDashboardUtils';


interface Props {
    newDashboardSortedBy: string;
    newDashboardSortOrder: string;
    appliedFilter: NewDashboardFilterStructure[];
    applyNewDashboardFilter: ( sort: string, filter: NewDashboardFilterStructure[], newDashboardSortedBy: string, newDashboardSortOrder: string) => void;
    loader: boolean;
    biTitle: string;
    biType: string;
    parentAggregate: NewDashboardFilterAggregate;
    aggregateValues: NewDashboardFilterAggregate[];
    configComponent: NewDashboardFilterConfig;
}

interface State {
}

export default class NewDashboardQuickLookCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let { biTitle, biType } = this.props;
        return (
            <div className="row">
                <div className="col-md-11 mt-3 ml-3 new-analysis-quick-look-card-container">
                    <div className="row new-analysis-quick-look-title">
                        <div className="col-md-10">
                            {biTitle === 'Type' ? 
                            <>
                                <img src="/static_images/contract-type-icn.svg" alt="con" />&nbsp;
                                Contract Type
                            </>                            
                            :
                            biTitle}
                        </div>
                    </div>
                    {this.renderFilter(biTitle, biType)}
                </div>
            </div>
        );
    }

    renderFilter(title: string, type: string){
        let {loader, aggregateValues, parentAggregate, appliedFilter, configComponent} = this.props;
        if(type === 'card'){
            if (loader) {
                return (
                    <LinesLoader animatedLines={[{ width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }, { width: 100, height: 10 }, { width: 100, height: 10 }, { width: 100, height: 10 }]} />
                );
            } else {
                return (
                    <Scrollable maxHeight={160}>
                        {aggregateValues.length > 0 &&
                            aggregateValues.map((aggregate: NewDashboardFilterAggregate, i: number) =>
                                <div className="row" key={i}>
                                    <div onClick={() => this.selectFilter(aggregate) }
                                        className={isFilterApplied(aggregate, parentAggregate, appliedFilter, configComponent ) === true ? "col-md-12 new-analysis-quick-look-sub-title-active" : "col-md-12 new-analysis-quick-look-sub-title"}>
                                        <span>
                                            {aggregate.alias.length > 30 ? 
                                                <DarkTooltip title={aggregate.alias} placement="right-end">
                                                    <span className="dotted-line">
                                                        {aggregate.alias.slice(0, 30) + '...'}
                                                    </span>
                                                </DarkTooltip>
                                            : aggregate.alias}
                                        </span>
                                        <span style={{ float: 'right' }}>{aggregate.count}</span>
                                    </div>
                                </div>
                            ) }
                    </Scrollable>
                );
            }
        } else {
            return(
                <>

                </>
            );
        }
    }

    selectFilter(aggregate: NewDashboardFilterAggregate){
        let {  parentAggregate, appliedFilter, configComponent, newDashboardSortOrder, newDashboardSortedBy} = this.props;
        
        let tempFilter: NewDashboardFilterStructure = generateNewDashboardFilter(aggregate, parentAggregate, configComponent);
        let tempAppliedFilter: NewDashboardFilterStructure[] =  addOrRemoveDashboardFilter(tempFilter, appliedFilter);
        this.props.applyNewDashboardFilter('', tempAppliedFilter, newDashboardSortedBy, newDashboardSortOrder);
        
    }
}

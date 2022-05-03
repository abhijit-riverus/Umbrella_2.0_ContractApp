import React, { Component } from 'react'
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';
import LinesLoader from '../../UniversalComponents/Loader/linesLoader';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import { NewAnalysisFilterAggregate,  NewAnalysisFilterConfig,  NewAnalysisFilterStructure } from '../State/newAnalysisState';
import { addOrRemoveAnalysisFilter, filterForBiExists, generateNewAnalysisFilter, isFilterApplied, removeNewAnalysisFilterForBi } from '../Utils/newAnalysisUtils';


interface Props {
    newAnalysisSortedBy: string;
    newAnalysisSortOrder: string;
    appliedFilter: NewAnalysisFilterStructure[];
    applyNewAnalysisFilter: ( sort: string, filter: NewAnalysisFilterStructure[], newAnalysisSortedBy: string, newAnalysisSortOrder: string) => void;
    loader: boolean;
    biTitle: string;
    biType: string;
    parentAggregate: NewAnalysisFilterAggregate;
    aggregateValues: NewAnalysisFilterAggregate[];
    configComponent: NewAnalysisFilterConfig;
    getNewAnalysisFilterCount: ( filter: NewAnalysisFilterStructure[]) => void;
    newAnalysisFilteredCount: number;
    isFilterForwarded: boolean;
    clearForwardedFilter: () => void;
}

interface State {
}

export default class NewAnalysisQuickLookCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let { biTitle, biType, parentAggregate, configComponent, appliedFilter } = this.props;
        return (
            <div className="row">
                <div className="col-md-11 mt-3 ml-3 new-analysis-quick-look-card-container">
                    <div className="row new-analysis-quick-look-title">
                        <div className="col-md-10">
                            {biTitle}
                        </div>
                        { filterForBiExists(configComponent.type, parentAggregate.value, appliedFilter) === true && 
                            <div className="col-md-2">
                            <span className="cursor-pointer new-analysis-clear-widget-filter" onClick={() => this.clearFilter()} style={{float: "right"}} >Clear</span>   
                            </div>
                        }
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
                            aggregateValues.map((aggregate: NewAnalysisFilterAggregate, i: number) =>
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

    selectFilter(aggregate: NewAnalysisFilterAggregate){
        let {  parentAggregate, appliedFilter, configComponent, newAnalysisSortOrder, newAnalysisSortedBy, isFilterForwarded } = this.props;
        
        let tempFilter: NewAnalysisFilterStructure = generateNewAnalysisFilter(aggregate, parentAggregate, configComponent);
        let tempAppliedFilter: NewAnalysisFilterStructure[] =  addOrRemoveAnalysisFilter(tempFilter, appliedFilter);
        this.props.applyNewAnalysisFilter('', tempAppliedFilter, newAnalysisSortedBy, newAnalysisSortOrder);
        if(isFilterForwarded){
           this.props.clearForwardedFilter(); 
        }
    }

    clearFilter(){
        let { parentAggregate, configComponent, appliedFilter, newAnalysisSortOrder, newAnalysisSortedBy, isFilterForwarded } = this.props;

        let tempAppliedFilter: NewAnalysisFilterStructure[] =  removeNewAnalysisFilterForBi(parentAggregate, configComponent, appliedFilter);
        this.props.applyNewAnalysisFilter('', tempAppliedFilter, newAnalysisSortedBy, newAnalysisSortOrder);
        if(isFilterForwarded){
           this.props.clearForwardedFilter(); 
        }
    }
}

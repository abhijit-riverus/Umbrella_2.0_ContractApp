import * as React from 'react';
import { AnalysisFilterStructure, LocalFilterStructure } from '../../../../Analysis/State/analysisState';

interface Props {
    analysisFileIds: number[];
    getAnalysis: (analysisFileIds: number[]) => void;
    count: number;
    savedAnalysisFiltersList: AnalysisFilterStructure[];
    applyAnalysisFilter: (sort: string, filter: AnalysisFilterStructure[]) =>  void;
    saveAppliedFiltersList: (appliedFiltersList: LocalFilterStructure[]) => void;
    saveAnalysisFiltersList: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => void;
    saveFilteredCount: (filteredCount: number) => void;
}

interface State {
}

export default class AnalysisFiltersCount extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { count } = this.props;
        if (count < 0) {
            return (
                <div className="row">
                    <div className="col-md-12 filter-count-header" style={{ lineHeight: '70px' }}>
                        <img src="/static_images/no-preference-icn.svg" style={{ padding: '2%' }} /> &nbsp;
                        Select some preferences to get started...
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 filter-count-header" style={{ lineHeight: '55px' }}>
                            <img src="/static_images/preference-icn.svg" style={{ padding: '2%', textAlign: 'left' }} />
                                <span style={{ textAlign: 'center' }}><span className="filter-count">{count !== -1 && count }</span>&nbsp;&nbsp;Results</span>
                                
                                <hr className="count-hr" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 filter-count-header py-3" style={{ display: 'flex', justifyContent: 'center' }}>
                            {count > 0 ? <button className="upload-yellow-btn" data-dismiss="modal" onClick={() => this.clickApply()}>Apply</button>
                                :
                                <button disabled className="upload-disable-btn">Apply</button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 filter-count-header mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <span className="reset-filter cursor-pointer" onClick={() => this.resetFilters()}>Reset Filters</span>
                        </div>
                    </div>
                </>
            )
        }
    }

    clickApply(){
        let { savedAnalysisFiltersList} = this.props;
        this.props.applyAnalysisFilter("name", savedAnalysisFiltersList);
    }

    resetFilters(){
        let { analysisFileIds } = this.props;
        let tempLocalFilterStructure: LocalFilterStructure = {
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
        this.props.saveAppliedFiltersList([tempLocalFilterStructure]);
        this.props.saveAnalysisFiltersList([]);
        this.props.saveFilteredCount(-1);
        this.props.getAnalysis(analysisFileIds);
    }
    
}
import * as React from 'react';
import { AdvancedFilter, AnalysisFilterStructure, FilterAggregateStructure, FilterConfigStructure, FilterStructure, LocalFilterStructure, OperatorInfo } from '../../../../Analysis/State/analysisState';
import Scrollable from '../../../Scrollable/scrollable';
import { checkAppliedFiltersEditingStatus, getMaximumFilterId } from '../Utils/analysisFilterUtils';
import AnalysisFilters from './analysisFilters';
import AnalysisFiltersCount from './analysisFiltersCount';

interface Props {
    initialFileIds: number[];
    getAnalysis: (initialFileIds: number[]) => void;
    filterIconClicked: boolean;
    setFilterIcon: (clicked: boolean) => void;
    appliedFiltersList: LocalFilterStructure[];
    saveAppliedFiltersList: (appliedFiltersList: LocalFilterStructure[]) => void;
    currentEditingFilterId: number;
    saveCurrentEditingFilterId: (currentEditingFilterId: number) => void;
    analysisFilteredFileIds: number[];
    savedFilterConfig: FilterConfigStructure[];
    getAnalysisFilterConfig: () => void;
    savedFilterAggregate: FilterAggregateStructure[];
    getFilterAggregate: (value: string, level: number, segment: string, page: string) => void;
    filteredCount: number;
    getFilteredCount: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => void;
    savedAnalysisFiltersList: AnalysisFilterStructure[];
    saveAnalysisFiltersList: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => void;
    applyAnalysisFilter: (sort: string, filter: AnalysisFilterStructure[]) =>  void;
    savedFilterClauseType: string;
    saveFilterClauseType: (savedFilterClauseType: string) => void;
    savedOperatorList: OperatorInfo[];
    saveOperatorList: (savedOperatorList: OperatorInfo[]) => void;
    savedClauseAggregate: FilterAggregateStructure[];
    saveClauseAggregate: (savedClauseAggregate: FilterAggregateStructure[]) => void;
    savedValueAggregate: FilterAggregateStructure[];
    saveValueAggregate: (savedValueAggregate: FilterAggregateStructure[]) => void;
    saveFilteredCount: (filteredCount: number) => void;
    analysisFileIds: number[];
}

interface State {
}

export default class AnalysisFilterModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        this.props.getAnalysisFilterConfig();
    }

    render() {
        let { initialFileIds, appliedFiltersList, saveAppliedFiltersList, currentEditingFilterId, saveCurrentEditingFilterId, analysisFilteredFileIds, savedFilterConfig, getAnalysisFilterConfig, savedFilterAggregate, getFilterAggregate, filteredCount, getFilteredCount, savedAnalysisFiltersList, applyAnalysisFilter, savedFilterClauseType, saveFilterClauseType, savedOperatorList, saveOperatorList, savedClauseAggregate, saveClauseAggregate, savedValueAggregate, saveValueAggregate, saveAnalysisFiltersList, getAnalysis, saveFilteredCount, analysisFileIds } = this.props;
        return (
            <div className="col-md-12 col-12">
                <div className="modal" id="analysisFilterModal" aria-labelledby="analysisFilterModal" aria-hidden="true" data-backdrop="false">
                    <div className="modal-dialog modal-dialog-centered my-0" style={{ maxWidth: '97%' }}>
                        <div className="modal-content" style={{ paddingRight: '35px' }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Scrollable maxHeight={600}>
                                        <div className="row">
                                            <div className="col-md-8 mt-5 ml-4">
                                                <div className="row">
                                                    <div className="col-md-12 col-12">
                                                        <div className="row">
                                                            <div className="col-md-12 filter-header">
                                                                Filters
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-12 px-0">
                                                                        <div className="filter-preference-heading">Select filter preferences</div>
                                                                    </div>
                                                                </div>
                                                                {appliedFiltersList.length > 0 && appliedFiltersList.map((appliedFilter, i)=>
                                                                    <div key={i} > 
                                                                        <AnalysisFilters appliedFiltersList={appliedFiltersList} saveAppliedFiltersList={saveAppliedFiltersList} currentEditingFilterId={currentEditingFilterId} saveCurrentEditingFilterId={saveCurrentEditingFilterId} 
                                                                        analysisFileIds={analysisFileIds} savedFilterConfig={savedFilterConfig} getAnalysisFilterConfig={getAnalysisFilterConfig} savedFilterAggregate={savedFilterAggregate} getFilterAggregate={getFilterAggregate} filteredCount={filteredCount} getFilteredCount={getFilteredCount} savedAnalysisFiltersList={savedAnalysisFiltersList}  saveAnalysisFiltersList={saveAnalysisFiltersList}applyAnalysisFilter={applyAnalysisFilter} savedFilterClauseType={savedFilterClauseType} saveFilterClauseType={saveFilterClauseType} savedOperatorList={savedOperatorList} saveOperatorList={saveOperatorList} savedClauseAggregate={savedClauseAggregate} saveClauseAggregate={saveClauseAggregate} savedValueAggregate={savedValueAggregate} saveValueAggregate={saveValueAggregate} currentAppliedAnalysisFilter={appliedFilter} />
                                                                        {i === appliedFiltersList.length -1 ?
                                                                            <div>
                                                                                {checkAppliedFiltersEditingStatus(appliedFiltersList) === true ?
                                                                                    <div className="filter-add-button" style={{color: "#BEBEBE"}}>
                                                                                        +<span className="filter-add-text">Add</span>
                                                                                    </div>
                                                                                :
                                                                                    <div className="filter-add-button">
                                                                                        +<span className="filter-add-text cursor-pointer" onClick={()=> this.addFilter()}>Add</span>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <div className="filter-operator-heading">AND</div>
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mt-5 ml-4">
                                                <AnalysisFiltersCount analysisFileIds={analysisFileIds} count={filteredCount} savedAnalysisFiltersList={savedAnalysisFiltersList} applyAnalysisFilter={applyAnalysisFilter} saveAppliedFiltersList={saveAppliedFiltersList} saveAnalysisFiltersList={saveAnalysisFiltersList} getAnalysis={getAnalysis} saveFilteredCount={saveFilteredCount} />
                                            </div>
                                        </div>
                                    </Scrollable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="cross-btn" src="/static_images/hide-filter-modal.svg" alt="hide-filter" data-dismiss="modal" style={{ marginLeft: '50%', marginTop: '-15px' }}/*  onClick={() => window.location.reload()}  *//>
                </div>
            </div>
        );
    }

    addFilter(){
        let {appliedFiltersList} = this.props;
        let tempAppliedFiltersList = appliedFiltersList; 
        let filterId = getMaximumFilterId(appliedFiltersList) + 1; 
        let tempLocalFilterStructure: LocalFilterStructure = {
            filterId: filterId,
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
        tempAppliedFiltersList.push(tempLocalFilterStructure);
        this.props.saveAppliedFiltersList(tempAppliedFiltersList);
        this.props.saveCurrentEditingFilterId(filterId);
    }
}   
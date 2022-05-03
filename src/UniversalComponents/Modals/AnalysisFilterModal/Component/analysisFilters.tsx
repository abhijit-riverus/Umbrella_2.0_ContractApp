import * as React from 'react';
import { AnalysisFilterStructure, FilterAggregateStructure, FilterConfigStructure, LocalFilterStructure, OperatorInfo, ValueInfo } from '../../../../Analysis/State/analysisState';
import { booleanOperators, createAnalysisFilterArray, currencyList, filterModeList, iterateAnalysisFilter, operatorDictionary, periodList } from '../../../../Utils/GeneralUtil/genUtils';
import Scrollable from '../../../Scrollable/scrollable';
import { changeFilterEditStatus, deleteAppliedFilterFromArray, getMaximumFilterId, pushAnalysisFilter } from '../Utils/analysisFilterUtils';

interface Props {
    appliedFiltersList: LocalFilterStructure[];
    saveAppliedFiltersList: (appliedFiltersList: LocalFilterStructure[]) => void;
    currentEditingFilterId: number;
    saveCurrentEditingFilterId: (currentEditingFilterId: number) => void;
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
    savedValueAggregate: FilterAggregateStructure[]
    saveValueAggregate: (savedValueAggregate: FilterAggregateStructure[]) => void;
    currentAppliedAnalysisFilter: LocalFilterStructure;
    analysisFileIds: number[];
}
interface State {
    expandDatapoint: boolean;
    expandClause: boolean;
    expandOperator: boolean;
    expandValue: boolean;
    expandPeriod: boolean;
    expandCurrency: boolean;
    expandFilterMode: boolean;
    filterId: number;
    selectedDatapoint: ValueInfo;
    selectedClause: ValueInfo;
    selectedOperator: OperatorInfo;
    selectedFilterMode: ValueInfo;
    selectedClauseType: string;
    textValue: string;
    currencyType: string;
    currencyNumber: string;
    periodType: string;
    periodNumber: string;
    dateValue: string;
    selectedListValue: ValueInfo;
    isSaved: boolean;
}

export default class AnalysisFilters extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expandDatapoint: false,
            expandClause: false,
            expandOperator: false,
            expandValue: false,
            expandPeriod: false,
            expandCurrency: false,
            expandFilterMode: false,
            filterId: -1,
            selectedDatapoint: {alias: '', value: ''},
            selectedClause: {alias: '', value: ''},
            selectedOperator: { operatorAlias: '', rule: '', operatorValue: '' },
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
    }

    componentDidMount(){
        let {currentAppliedAnalysisFilter} = this.props;
        this.setState({ 
            filterId: currentAppliedAnalysisFilter.filterId,
            selectedDatapoint: currentAppliedAnalysisFilter.selectedDatapoint,
            selectedClause: currentAppliedAnalysisFilter.selectedClause,
            selectedOperator: currentAppliedAnalysisFilter.selectedOperator,
            selectedFilterMode: currentAppliedAnalysisFilter.selectedFilterMode,
            selectedClauseType: currentAppliedAnalysisFilter.selectedClauseType,
            textValue: currentAppliedAnalysisFilter.textValue,
            currencyType: currentAppliedAnalysisFilter.currencyType,
            currencyNumber: currentAppliedAnalysisFilter.currencyNumber,
            periodType: currentAppliedAnalysisFilter.periodType,
            periodNumber: currentAppliedAnalysisFilter.periodNumber,
            dateValue: currentAppliedAnalysisFilter.dateValue,
            selectedListValue: currentAppliedAnalysisFilter.selectedListValue,
            isSaved: currentAppliedAnalysisFilter.isSaved
        });
    }

    componentWillReceiveProps(nextProps: Props){

        if(this.props.savedFilterAggregate !== nextProps.savedFilterAggregate && nextProps.savedFilterAggregate.length > 0){
            if(nextProps.savedFilterAggregate[0].outputLevel === 0){ 
                this.props.saveClauseAggregate(nextProps.savedFilterAggregate);

                if(this.state.filterId === nextProps.currentEditingFilterId){
                    if(nextProps.savedFilterAggregate.length === 1){
                        let clauseType = nextProps.savedFilterAggregate[0].operator;
                        let clause = nextProps.savedFilterAggregate[0];
                        this.setState({ 
                            selectedClauseType: clauseType,
                            selectedClause: {alias: clause.alias, value: clause.value}, 
                            expandClause: false,
                            expandOperator: false, 
                            selectedOperator: { operatorAlias: '', rule: '', operatorValue: '' },
                            textValue: '',
                            currencyType: '',
                            currencyNumber: '',
                            periodType: '',
                            periodNumber: '',
                            dateValue: '',
                            selectedListValue: {alias: '', value: ''},
                            expandPeriod: false,
                            expandCurrency: false,
                            expandValue: false,
                        });
                        this.props.saveFilterClauseType(clauseType);
                        this.props.saveOperatorList(operatorDictionary[clauseType]);
                    }
                }

            }else if(nextProps.savedFilterAggregate[0].outputLevel === 1){
                this.props.saveValueAggregate(nextProps.savedFilterAggregate);
                
                if(this.state.filterId === nextProps.currentEditingFilterId){
                    let clauseType = nextProps.savedFilterAggregate[0].operator;
                    this.setState({ selectedClauseType: clauseType});
                    this.props.saveFilterClauseType(clauseType);
                    this.props.saveOperatorList(operatorDictionary[clauseType]);
                }
            }
        }

        if(this.props.currentAppliedAnalysisFilter !== nextProps.currentAppliedAnalysisFilter){
            this.setState({ 
                filterId: nextProps.currentAppliedAnalysisFilter.filterId,
                selectedDatapoint: nextProps.currentAppliedAnalysisFilter.selectedDatapoint,
                selectedClause: nextProps.currentAppliedAnalysisFilter.selectedClause,
                selectedOperator: nextProps.currentAppliedAnalysisFilter.selectedOperator,
                selectedFilterMode: nextProps.currentAppliedAnalysisFilter.selectedFilterMode,
                selectedClauseType: nextProps.currentAppliedAnalysisFilter.selectedClauseType,
                textValue: nextProps.currentAppliedAnalysisFilter.textValue,
                currencyType: nextProps.currentAppliedAnalysisFilter.currencyType,
                currencyNumber: nextProps.currentAppliedAnalysisFilter.currencyNumber,
                periodType: nextProps.currentAppliedAnalysisFilter.periodType,
                periodNumber: nextProps.currentAppliedAnalysisFilter.periodNumber,
                dateValue: nextProps.currentAppliedAnalysisFilter.dateValue,
                selectedListValue: nextProps.currentAppliedAnalysisFilter.selectedListValue,
                isSaved: nextProps.currentAppliedAnalysisFilter.isSaved
            });
        }
    }

    render() {
        return(
            <div>
                {this.filterRow()}
            </div>
        );
    }

    filterRow() {
        let {expandDatapoint, expandClause, expandOperator, expandFilterMode, selectedFilterMode, selectedDatapoint, selectedClause, selectedOperator, isSaved, selectedClauseType} = this.state;
        let {savedClauseAggregate, savedOperatorList, savedFilterClauseType, savedFilterConfig } = this.props;
        
        return (
            <div className="row">
                <div className="col-md-12 analysis-filter-container" style={{ background: isSaved === true ? '#F9F9F9' : 'white'}}>
                    <div className="row">
                        <div className="col-md-2 pr-0 mb-2">
                            <span className="filter-contains">Filter files that: </span>
                        </div>
                        <div className="col-md-2 px-0 mb-2">
                                {isSaved === true ?
                                    <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  >
                                        <input type="text" className="modal-input" placeholder="Select filter type" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedFilterMode.alias} readOnly  />
                                        <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                                    </span>
                                :
                                    <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ expandFilterMode: !this.state.expandFilterMode})} >
                                        <input type="text" className="modal-input" placeholder="Select filter type" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedFilterMode.alias} readOnly  />
                                        <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: expandFilterMode ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                    </span>
                                }
                                {expandFilterMode &&
                                    <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                        <Scrollable maxHeight={100}>
                                            {filterModeList.map((filterMode, i)=>
                                                <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={(e) => this.onFilterModeSelection(filterMode)} >{filterMode.operatorAlias}</div>
                                            )}
                                        </Scrollable>
                                    </div>
                                }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="filter-input-heading">Datapoint</div>
                            <div className="row">
                                <div className="col-md-12">
                                    {isSaved === true ?
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  >
                                            <input type="text" className="modal-input" placeholder="Select Datapoint" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedDatapoint.alias} readOnly maxLength={50} />
                                            <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                                        </span>
                                    :
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ expandDatapoint: !this.state.expandDatapoint})} >
                                            <input type="text" className="modal-input" placeholder="Select Datapoint" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedDatapoint.alias} readOnly maxLength={50} />
                                            <img src="/static_images/tag-dropdown-active.svg" alt="dropdown"  style={{ transform: expandDatapoint ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                        </span>
                                        
                                    }
                                    {expandDatapoint &&
                                        <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                            <Scrollable maxHeight={100}>
                                                {savedFilterConfig.map((filterConfig, i)=>
                                                    <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={(e) => this.onDatapointSelection(filterConfig)} >{filterConfig.alias}</div>
                                                )}
                                            </Scrollable>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="filter-input-heading">Clause/BI</div>
                            <div className="row">
                                <div className="col-md-12">
                                    {isSaved === true ? 
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }} >
                                            <input type="text" className="modal-input" placeholder="Select Clause/Bi" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedClause.alias} readOnly maxLength={50} />
                                            <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                                        </span> 
                                    :
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ expandClause: !this.state.expandClause})} >
                                            <input type="text" className="modal-input" placeholder="Select Clause/Bi" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedClause.alias} readOnly maxLength={50} />
                                            <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: expandClause ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                        </span>
                                    }
                                    {expandClause && 
                                        <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                            <Scrollable maxHeight={100}>
                                                {savedClauseAggregate.map((clause, i)=>
                                                    <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.onClauseSelection(clause)} >{clause.alias}</div>
                                                )}
                                            </Scrollable>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="filter-input-heading">Operator</div>
                            <div className="row">
                                <div className="col-md-12">
                                    {isSaved === true ?
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }} >
                                            <input type="text" className="modal-input" placeholder="Select Operator" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOperator.operatorAlias} readOnly  maxLength={50} />
                                            <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                                        </span>
                                    :
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ expandOperator: !this.state.expandOperator})} >
                                            <input type="text" className="modal-input" placeholder="Select Operator" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOperator.operatorAlias} readOnly  maxLength={50} />
                                            <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: expandOperator ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                        </span>
                                    }
                                    {expandOperator &&
                                        <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                            <Scrollable maxHeight={100}>
                                                {savedOperatorList.map((operator, i)=>
                                                    <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={(e) => this.onOperatorSelection(operator)} >{operator.operatorAlias}</div>
                                                )}
                                            </Scrollable>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="filter-input-heading">Value</div>
                            {this.valueCustomField(selectedClauseType)}
                        </div>
                        <div className="col-md-2">
                            <div className="filter-input-heading">&nbsp;</div>
                            { isSaved === true ?
                                <span>
                                    <span className="filter-actions-button">
                                        <img className="filter-actions-img" src="/static_images/edit-filter-icon.svg" alt="editfilter" onClick={()=> this.onEditFilter()} />
                                    </span>
                                    <span className="filter-actions-button">
                                        <img className="filter-actions-img" src="/static_images/delete-filter-icon.svg" alt="deletefilter" onClick={()=> this.onDeleteFilter()} />
                                    </span>
                                </span>
                            : 
                                <span>
                                    <span className="filter-actions-button">
                                        <img className="filter-actions-img" src="/static_images/cancel-filter-icn.svg" alt="cancelfilter" onClick={()=> this.onCancelFilter()} />
                                    </span>
                                    <span className="filter-actions-button">
                                        <img className="filter-actions-img" src="/static_images/tick-filter-icn.svg" alt="savefilter" onClick={() => this.onSaveFilter()} />
                                    </span>
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    valueCustomField(selectedClauseType: string){
        let { expandPeriod, expandCurrency, expandValue, textValue, currencyType, currencyNumber, periodType, periodNumber, selectedListValue, dateValue, isSaved } = this.state;
        let { savedValueAggregate } = this.props;
        switch(selectedClauseType){

            case 'text': {
                return(
                    <span>
                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                            {isSaved === true ?
                                <input type="text" placeholder={'Enter text'} style={{ width: '100%', border: 'none', outline: 'none' }} value={textValue} readOnly />
                            :
                                <input type="text" placeholder={'Enter text'} style={{ width: '100%', border: 'none', outline: 'none' }} value={textValue} onChange={(e) => this.onInputChange(e, selectedClauseType)} />
                            }
                        </span>
                    </span>
                );
            }
            case 'date': {
                return(
                    <span>
                        {isSaved === true ? 
                            <input type="text" className="modal-input" value={dateValue} readOnly style={{ width: '100%' }} />
                        :
                            <input type="date" className="modal-input" value={dateValue} onChange={(e) => this.onInputChange(e, selectedClauseType)} style={{ width: '100%' }} />
                        }
                    </span>
                );
            }
            case 'number_currency': {
                return(
                    <div className="row">
                        <div className="col-md-6 pl-0">
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                <input type="text" placeholder={'Enter amount'} style={{ width: '100%', border: 'none', outline: 'none' }} value={currencyNumber} onChange={(e) => this.onInputChange(e, 'number_currency')} />
                            </span>
                        </div>
                        <div className="col-md-6 pl-0">
                            {isSaved === true ?
                                <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                    <input type="text" placeholder={'Select currency'} style={{ width: '100%', border: 'none', outline: 'none' }} value={currencyType} readOnly />
                                    <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                                </span>
                            :
                                <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandCurrency: !this.state.expandCurrency })} >
                                    <input type="text" placeholder={'Select currency'} style={{ width: '100%', border: 'none', outline: 'none' }} value={currencyType} readOnly />
                                    <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: this.state.expandCurrency ? 'rotate(180deg)' : 'none', zIndex: 3 }} />
                                </span>
                            }
                            {expandCurrency &&
                                <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                    <Scrollable maxHeight={100}>
                                        {currencyList.map((currency, i)=>
                                            <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.onCurrencyTypeSelection(currency)} >{currency}</div>
                                        )}
                                    </Scrollable>
                                </div>
                            }
                        </div>
                    </div>
                );
            }
            case 'number_period': {
                return(
                    <div className="row">
                        <div className="col-md-6 pl-0">
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                <input type="text" placeholder={'Enter number'} style={{ width: '100%', border: 'none', outline: 'none' }} value={periodNumber} onChange={(e) => this.onInputChange(e, 'number_period')} />
                            </span>
                        </div>
                        <div className="col-md-6 pl-0">
                            {isSaved === true ?
                                <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                    <input type="text" placeholder={'Select period'} style={{ width: '100%', border: 'none', outline: 'none' }} value={periodType} readOnly />
                                    <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                                </span>
                            :
                                <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandPeriod: !this.state.expandPeriod })} >
                                    <input type="text" placeholder={'Select period'} style={{ width: '100%', border: 'none', outline: 'none' }} value={periodType} readOnly />
                                    <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: this.state.expandPeriod ? 'rotate(180deg)' : 'none', zIndex: 3 }} />
                                </span>
                            }
                            {expandPeriod &&
                                <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px" }}>
                                    <Scrollable maxHeight={100}>
                                        {periodList.map((period, i)=>
                                            <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.onPeriodTypeSelection(period)} >{period}</div>
                                        )}
                                    </Scrollable>
                                </div>
                            }
                        </div>
                    </div>
                );
            }
            case 'list': {
                return(
                    <span>
                        {isSaved === true ?
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                <input type="text" className="modal-input" placeholder={"Select a value"} style={{ width: '100%', border: 'none', outline: 'none' }} readOnly value={selectedListValue.alias} />
                                <img src="/static_images/tag-dropdown-inactive.svg" alt="disabled-dropdown" />
                            </span>
                        :
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandValue: !this.state.expandValue })} >
                                <input type="text" className="modal-input" placeholder={"Select a value"} style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedListValue.alias} />
                                <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: this.state.expandValue ? 'rotate(180deg)' : 'none', zIndex: 3 }} />
                            </span>
                        }
                        {expandValue &&
                            <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                <Scrollable maxHeight={100}>
                                    {savedValueAggregate.map((item, i)=>
                                        <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.onListValueSelection(item.alias, item.value)} >{item.alias}</div>
                                    )}
                                </Scrollable>
                            </div>
                        }  
                    </span>
                );
            }
            default : {
                return(
                    <span>
                        <span className="filter-modal-input" style={{ background: '#BEBEBE', border: '1px solid #DDDDDD' }} >
                            <input type="text" className="modal-input" readOnly style={{ width: '100%', border: 'none', outline: 'none', background: '#BEBEBE' }} placeholder={'Select value'} value={''} />
                            <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                        </span>  
                    </span>
                )
            }
        }
    }

    onFilterModeSelection(operatorInfo: OperatorInfo) {
        this.setState({ 
            selectedFilterMode: {alias: operatorInfo.operatorAlias, value: operatorInfo.operatorValue}, 
            expandFilterMode: false 
        });
    }

    onDatapointSelection(datapoint: FilterConfigStructure) {
        this.setState({ 
            selectedDatapoint: {alias: datapoint.alias, value: datapoint.type }, 
            expandDatapoint: false,
            selectedClause: { alias: '', value: ''},
            expandClause: false,
            selectedOperator: {
                operatorAlias: '',
                rule: '',
                operatorValue: ''
            },
            expandOperator: false,
            expandPeriod: false,
            expandCurrency: false,
            expandFilterMode: false,
            expandValue: false,
            textValue: '',
            currencyType: '',
            currencyNumber: '',
            periodType: '',
            periodNumber: '',
            dateValue: '',
            selectedListValue: {alias: '', value: ''}

        });
        this.props.saveClauseAggregate([]);
        this.props.saveOperatorList([]);
        this.props.getFilterAggregate(datapoint.type, datapoint.baseLevel, datapoint.type, 'analysis');
        this.props.saveCurrentEditingFilterId(this.state.filterId);
    }

    onClauseSelection(clause: FilterAggregateStructure) {
        let { selectedDatapoint } = this.state;
        this.setState({ 
            selectedClause: {alias: clause.alias, value: clause.value}, 
            selectedClauseType: clause.operator,
            expandClause: false,
            expandOperator: false, 
            selectedOperator: { operatorAlias: '', rule: '', operatorValue: '' },
            textValue: '',
            currencyType: '',
            currencyNumber: '',
            periodType: '',
            periodNumber: '',
            dateValue: '',
            selectedListValue: {alias: '', value: ''},
            expandPeriod: false,
            expandCurrency: false,
            expandValue: false,
        });
        if(clause.operator === "list"){
            this.props.getFilterAggregate(clause.value, clause.outputLevel, selectedDatapoint.value, 'analysis');
        }else{
            this.props.saveFilterClauseType(clause.operator);
            this.props.saveOperatorList(operatorDictionary[clause.operator]);
        }
        this.props.saveCurrentEditingFilterId(this.state.filterId);
    }

    onOperatorSelection(operatorInfo: OperatorInfo) {
        this.setState({ 
            selectedOperator: operatorInfo, 
            expandOperator: false,
            textValue: '',
            currencyType: '',
            currencyNumber: '',
            periodType: '',
            periodNumber: '',
            dateValue: '',
            selectedListValue: {alias: '', value: ''}
        });
        this.props.saveCurrentEditingFilterId(this.state.filterId);
    }

    onListValueSelection(alias: string, value: string) {
        this.setState({ 
            selectedListValue: { alias: alias, value: value}, 
            expandValue: false
        });
        this.props.saveCurrentEditingFilterId(this.state.filterId);
    }

    onCurrencyTypeSelection(value: string){
        this.setState({ currencyType: value, expandCurrency: false});
        this.props.saveCurrentEditingFilterId(this.state.filterId);
    }

    onPeriodTypeSelection(value: string){
        this.setState({ periodType: value, expandPeriod: false});
        this.props.saveCurrentEditingFilterId(this.state.filterId);
    }

    onInputChange(event: any, inputType: string) {
        let value = event.target.value;
        switch(inputType){
            case 'text': {
                this.setState({ textValue: value });
                break;
            }
            case 'date': {
                this.setState({ dateValue: value });
                break;
            }
            case 'number_currency': {
                this.setState({ currencyNumber: value });
                break;
            }
            case 'number_period': {
                this.setState({ periodNumber: value});
                break;
            }
            case 'searchList': {
                //later
                break;
            }
            default: {
                break;
            }
        }
    }

    onSaveFilter(){
        let { savedFilterClauseType, appliedFiltersList } = this.props;
        let { filterId, selectedDatapoint, selectedClause, selectedFilterMode, selectedListValue, selectedOperator, textValue, dateValue, currencyType, currencyNumber, periodNumber, periodType, selectedClauseType } = this.state;
        if(savedFilterClauseType !== "default" && savedFilterClauseType !== ""){
            let tempLocalFilterStructure: LocalFilterStructure = {
                filterId:  filterId,
                selectedDatapoint: selectedDatapoint,
                selectedClause: selectedClause,
                selectedOperator: selectedOperator,
                selectedFilterMode: selectedFilterMode,
                selectedClauseType: selectedClauseType,
                textValue: textValue, 
                dateValue: dateValue,
                currencyType: currencyType,
                currencyNumber: currencyNumber,
                periodType: periodType,
                periodNumber: periodNumber,
                selectedListValue: selectedListValue,
                isSaved: true
            }

            let tempAppliedFilters = appliedFiltersList;
            tempAppliedFilters = pushAnalysisFilter(tempLocalFilterStructure, appliedFiltersList);
            this.props.saveAppliedFiltersList(tempAppliedFilters);
            //TODO (if needed): Skip the filters where isSaved is false 
            let analysisFilters = createAnalysisFilterArray(tempAppliedFilters);
            this.props.saveAnalysisFiltersList(analysisFilters);
            this.props.getFilteredCount(analysisFilters);
            this.setState({
                expandDatapoint: false,
                expandClause: false,
                expandOperator: false,
                expandValue: false,
                expandPeriod: false,
                expandCurrency: false,
                expandFilterMode: false
            })
        }
    }


    onEditFilter(){
        let { appliedFiltersList, } = this.props;
        let { filterId, selectedDatapoint, selectedClause } = this.state;
        this.setState({ isSaved: false});
        let filteredAppliedFilter = appliedFiltersList.filter((appliedFilter) => appliedFilter.filterId === filterId );
        let tempAppliedFilters = changeFilterEditStatus(filteredAppliedFilter[0], appliedFiltersList);
        this.props.saveAppliedFiltersList(tempAppliedFilters);
        this.props.getFilterAggregate(selectedDatapoint.value, -1, selectedDatapoint.value, 'analysis'); //aggregate to get clause list
        this.props.getFilterAggregate(selectedClause.value, 0, selectedDatapoint.value, 'analysis');
        this.props.saveOperatorList([]); //TODO: Later, set to operators of respective clause
        let analysisFilters = createAnalysisFilterArray(tempAppliedFilters);
        this.props.saveAnalysisFiltersList(analysisFilters);
        this.props.getFilteredCount(analysisFilters);
        this.props.saveCurrentEditingFilterId(filterId);
    }

    onDeleteFilter(){
        let {appliedFiltersList, currentAppliedAnalysisFilter} = this.props;
        let editedAppliedFilters = deleteAppliedFilterFromArray(currentAppliedAnalysisFilter, appliedFiltersList);
        if(editedAppliedFilters.length === 0){
            editedAppliedFilters.push({
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
            });
        }
        this.props.saveAppliedFiltersList(editedAppliedFilters);
        let analysisFilters = createAnalysisFilterArray(editedAppliedFilters);
        this.props.saveAnalysisFiltersList(analysisFilters);
        this.props.getFilteredCount(analysisFilters);
        this.props.saveCurrentEditingFilterId(getMaximumFilterId(appliedFiltersList));
    }

    onCancelFilter(){
        let {currentAppliedAnalysisFilter,appliedFiltersList} = this.props;
        let {  } = this.props;
        let { filterId } = this.state;
        this.setState({ 
            filterId: currentAppliedAnalysisFilter.filterId,
            selectedDatapoint: currentAppliedAnalysisFilter.selectedDatapoint,
            selectedClause: currentAppliedAnalysisFilter.selectedClause,
            selectedOperator: currentAppliedAnalysisFilter.selectedOperator,
            selectedFilterMode: currentAppliedAnalysisFilter.selectedFilterMode,
            textValue: currentAppliedAnalysisFilter.textValue,
            currencyType: currentAppliedAnalysisFilter.currencyType,
            currencyNumber: currentAppliedAnalysisFilter.currencyNumber,
            periodType: currentAppliedAnalysisFilter.periodType,
            periodNumber: currentAppliedAnalysisFilter.periodNumber,
            dateValue: currentAppliedAnalysisFilter.periodNumber,
            selectedListValue: currentAppliedAnalysisFilter.selectedListValue,
            isSaved: currentAppliedAnalysisFilter.isSaved,
            expandDatapoint: false,
            expandClause: false,
            expandOperator: false,
            expandValue: false,
            expandPeriod: false,
            expandCurrency: false,
            expandFilterMode: false,
        });
        this.props.saveOperatorList([]);
        this.props.saveCurrentEditingFilterId(-1);
        let filteredAppliedFilter = appliedFiltersList.filter((appliedFilter) => appliedFilter.filterId === filterId );
        let tempAppliedFilters = changeFilterEditStatus(filteredAppliedFilter[0], appliedFiltersList);
        this.props.saveAppliedFiltersList(tempAppliedFilters);
    }
}

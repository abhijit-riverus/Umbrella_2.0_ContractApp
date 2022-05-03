import React from 'react';
import { isNullOrUndefined } from 'is-what';
import CircleLoader from '../Loader/circleLoader';
import {  NewAnalysisFilterAggregate, NewAnalysisFilterConfig, NewAnalysisFilterStructure } from '../../NewAnalysis/State/newAnalysisState';
import { addOrReplaceAmountAnalysisFilter, filterForBiExists, generateNewAnalysisAmountFilter, removeNewAnalysisFilterForBi} from '../../NewAnalysis/Utils/newAnalysisUtils';
import Slider, { Mark } from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import Scrollable from '../Scrollable/scrollable';


interface Props {
    labelName: string;
    amountLoader: boolean;
    currencyLoader: boolean;
    minValue: string;
    maxValue: string;
    leftThumb: string;
    rightThumb: string;
    amountAggregate: NewAnalysisFilterAggregate[];
    currencyAggregate: NewAnalysisFilterAggregate[];
    currencyValue: string;
    parentAggregate: NewAnalysisFilterAggregate;
    configComponent: NewAnalysisFilterConfig;
    appliedFilter: NewAnalysisFilterStructure[];
    newAnalysisSortedBy: string;
    newAnalysisSortOrder: string;
    applyNewAnalysisFilter: ( sort: string, filter: NewAnalysisFilterStructure[], newAnalysisSortedBy: string, newAnalysisSortOrder: string, applyType: string) => void;
    getNewAnalysisFilterAggregate: ( value: string, level: number, page: string, sort: string, order: string, filter: NewAnalysisFilterStructure[], segment: string, isFilterForwarded: boolean ) => void;
    isFilterForwarded: boolean;
    clearForwardedFilter: () => void;
    saveNewAnalysisCurrency: (currencyName: string, typeName: string ) => void;
}
interface State {
    min: number;
    max: number;
    leftThumbValue: number;
    rightThumbValue: number;
    selectedCurrency: string;
    expandCurrency: boolean;
}

const iOSBoxShadow = "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const CustomRangeSlider = withStyles({
    root: {
      color: "#F1F1F1;",
      height: 2,
      padding: "15px 0"
    },
    thumb: {
      height: 22,
      width: 22,
      backgroundColor: "#88305F",
      boxShadow: iOSBoxShadow,
      marginTop: -7,
      marginLeft: -7,
      "&:focus, &:hover, &$active": {
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: iOSBoxShadow
        }
      }
    },
    active: {},
    valueLabel: {
      left: "calc(-185% + 1px)",
      top: -32,
      border: "1px solid #FBCE2F",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      borderRadius: "5px",
      padding: "0px 10px",
      fontSize: "12px",
      textAlign: 'center',
      "& *": {
        background: "transparent",
        color: "#000",
        textAlign: 'center',
        minWidth:  '80px'
      }
    },
    mark: {
        "& *": {
            color: "#6D6E71",
            fontSize: '11px',
            marginTop: 2
        }
    },
    markActive: {
        "& *": {
            color: "#6D6E71",
            fontSize: '11px',
            marginTop: 2
        }
    },
    track: {
      height: 2,
      borderRadius: 5
    },
    rail: {
      height: 8,
      borderRadius: 5,
      opacity: 1,
      backgroundColor: "#F1F1F1"
    }
  })(Slider);

export default class AmountSeriesSlider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            min: 0,
            max: 100,
            leftThumbValue: 0,
            rightThumbValue: 100,
            selectedCurrency: '',
            expandCurrency: false
        }
        this.changeViewPort = this.changeViewPort.bind(this);
        this.getMarks = this.getMarks.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if(this.props.currencyAggregate !== nextProps.currencyAggregate && nextProps.currencyAggregate !== null && nextProps.currencyAggregate.length > 0 ){
            if(nextProps.isFilterForwarded === true){
                nextProps.getNewAnalysisFilterAggregate(nextProps.currencyValue, nextProps.currencyAggregate[0].outputLevel, 'newanalysis', 'count', 'DESC', nextProps.appliedFilter, nextProps.currencyAggregate[0].type , nextProps.isFilterForwarded );
                // nextProps.clearForwardedFilter(); 
            } else {
                nextProps.getNewAnalysisFilterAggregate(nextProps.currencyValue, nextProps.currencyAggregate[0].outputLevel, 'newanalysis', 'count', 'DESC', nextProps.appliedFilter, nextProps.currencyAggregate[0].type , nextProps.isFilterForwarded );
            }
        }
        if(this.props.amountAggregate !== nextProps.amountAggregate){
            this.setState({ min: Number(nextProps.minValue)});
            this.setState({ max: Number(nextProps.maxValue)});
            this.setState({ leftThumbValue: Number(nextProps.leftThumb)});
            this.setState({ rightThumbValue: Number(nextProps.rightThumb)});
            this.setState({ selectedCurrency: nextProps.currencyValue });
        }
        if(this.props.currencyValue !== nextProps.currencyValue ){
            this.setState({ selectedCurrency: nextProps.currencyValue });
        }
        if(this.props.minValue !== nextProps.minValue){
            this.setState({ min: Number(nextProps.minValue)});
        }
        if(this.props.maxValue !== nextProps.maxValue){
            this.setState({ max: Number(nextProps.maxValue)});
        }
        if(this.props.leftThumb !== nextProps.leftThumb){
            this.setState({ leftThumbValue: Number(nextProps.leftThumb)});
        }
        if(this.props.rightThumb !== nextProps.rightThumb){
            this.setState({ rightThumbValue: Number(nextProps.rightThumb)});
        }
    }
    render() {
        let { min, max, leftThumbValue, rightThumbValue, expandCurrency, selectedCurrency } = this.state;
        let { amountLoader, currencyLoader, labelName, currencyAggregate, amountAggregate, configComponent, parentAggregate, appliedFilter } = this.props;
        if (!isNullOrUndefined(amountLoader) && !isNullOrUndefined(currencyLoader) ) {
            if (amountLoader || currencyLoader) {
                return (
                    <div className="row">
                        <div className="col-md-12 pt-2 date-slider-block">
                            <CircleLoader />
                        </div>
                    </div>
                );
            } else {
                if(currencyAggregate.length > 0 || amountAggregate.length > 0){
                    return (
                        <div className="row">
                            <div className="col-md-12 pt-1 date-slider-block"/*   style={{zIndex: 10}} */ >
                                <div className="row">
                                    <div className="col-md-2 ml-4 mb-2 px-0">
                                        <div className="date-slider-title">{labelName}</div>
                                    </div>
                                    <div className="col-md-3 ml-1 mb-2 px-0">
                                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDDD', padding: '2px 4px' }} onClick={() => this.setState({ expandCurrency: !this.state.expandCurrency })} >
                                            <input type="text" placeholder={'Select currency'} style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedCurrency} readOnly />
                                            <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: this.state.expandCurrency ? 'rotate(180deg)' : 'none', zIndex: 3 }} />
                                        </span>
                                        {expandCurrency &&
                                        <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px", zIndex: 20, position: 'absolute'  }}>
                                            <Scrollable maxHeight={100}>
                                                {currencyAggregate !== null && currencyAggregate.length > 0 && currencyAggregate.map((currency, i)=>
                                                    <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.onCurrencyTypeSelection(currency.value)} >{currency.value}</div>
                                                )}
                                            </Scrollable>
                                        </div>
                                        }
                                    </div>
                                    { filterForBiExists(configComponent.type, parentAggregate.value, appliedFilter) === true && 
                                        <div className="col-md-6 ml-1 mb-2 px-0">
                                            <span className="cursor-pointer new-analysis-clear-widget-filter" onClick={() => this.clearFilter()} style={{float: "right"}} >Clear</span>    
                                        </div>
                                   }
                                </div>
                                <div className="row">
                                    <div className="col-md-10 pt-4 mt-2 mx-auto px-2">
                                    <CustomRangeSlider step={10} min={min} max={max} marks={this.getMarks()} defaultValue={[leftThumbValue, rightThumbValue]} valueLabelDisplay="auto" onChangeCommitted={this.changeViewPort} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="row">
                            <div className="col-md-12 pt-1 date-slider-block"/*   style={{zIndex: 10}} */ >
                                <div className="row">
                                    <div className="col-md-11 mx-auto px-0">
                                        <div className="date-slider-title">{labelName}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-10 pt-4 mt-2 mx-auto px-2 date-slider-title" style={{color: "#6D6E71"}}>
                                        No Amounts Present
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                
        }
        } else {
        // do nothing
        }
    }
    changeViewPort(event: React.ChangeEvent<{}>, value: any) {
        let { parentAggregate, appliedFilter, configComponent, newAnalysisSortOrder, newAnalysisSortedBy, currencyValue, isFilterForwarded} = this.props;
        if (!isNullOrUndefined(value[0])) {
            let min = value[0];
            let max = value[1];
            let minString: string = '' + min;
            let maxString: string = '' + max;
            if(max >= min){
                let minAmountFilter: NewAnalysisFilterStructure = generateNewAnalysisAmountFilter(minString, currencyValue, parentAggregate, configComponent, '>=');
                let maxAmountFilter: NewAnalysisFilterStructure = generateNewAnalysisAmountFilter(maxString, currencyValue,  parentAggregate, configComponent, '<=');
                let tempAppliedFilter: NewAnalysisFilterStructure[] =  addOrReplaceAmountAnalysisFilter(minAmountFilter, appliedFilter);
                tempAppliedFilter = addOrReplaceAmountAnalysisFilter(maxAmountFilter, tempAppliedFilter);
                this.props.applyNewAnalysisFilter( '', tempAppliedFilter, newAnalysisSortedBy, newAnalysisSortOrder, 'current');
                if(isFilterForwarded){
                    this.props.clearForwardedFilter(); 
                 }
            }
        }
    }

    onCurrencyTypeSelection(value: string){
        let {configComponent, currencyAggregate, appliedFilter, isFilterForwarded } = this.props;
        this.setState({ selectedCurrency: value, expandCurrency: false});
        this.props.saveNewAnalysisCurrency( value , configComponent.type );
        this.props.getNewAnalysisFilterAggregate(value, currencyAggregate[0].outputLevel, 'newanalysis', 'count', 'DESC', appliedFilter,currencyAggregate[0].type , isFilterForwarded );
    }

    getMarks(): Mark[]{
        let {min, max} = this.state;
        let mark: Mark[] = [
            {
                value: min,
                label: min
            },
            {
                value: max,
                label: max
            }
        ];
        return mark;
    }

    clearFilter(){
        let { parentAggregate, configComponent, appliedFilter, isFilterForwarded, newAnalysisSortOrder, newAnalysisSortedBy } = this.props;
        let tempAppliedFilter: NewAnalysisFilterStructure[] = removeNewAnalysisFilterForBi(parentAggregate, configComponent, appliedFilter);
        
        this.props.applyNewAnalysisFilter( '', tempAppliedFilter, newAnalysisSortedBy, newAnalysisSortOrder, 'current');
        if(isFilterForwarded){
            this.props.clearForwardedFilter(); 
        }
    }
}
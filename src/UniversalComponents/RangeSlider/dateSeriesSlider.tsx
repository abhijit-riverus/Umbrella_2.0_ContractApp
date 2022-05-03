import React from 'react';
import { isNullOrUndefined } from 'is-what';
import CircleLoader from '../Loader/circleLoader';
import {  NewAnalysisFilterAggregate, NewAnalysisFilterConfig, NewAnalysisFilterStructure } from '../../NewAnalysis/State/newAnalysisState';
import { getNormalizedDateToDateString } from '../../Utils/DataModifierUtil/dataModUtil';
import { addOrReplaceAnalysisFilter, filterForBiExists, generateNewAnalysisDateFilter, removeNewAnalysisFilterForBi} from '../../NewAnalysis/Utils/newAnalysisUtils';
import { getDateIndex } from './sliderUtils';
import Slider, { Mark } from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

export declare type SliderValue = number | [number, number];

interface Props {
    labelName: string;
    loader: boolean;
    minValue: string;
    maxValue: string;
    leftThumb: string;
    rightThumb: string;
    dateAggregate: NewAnalysisFilterAggregate[];
    parentAggregate: NewAnalysisFilterAggregate;
    configComponent: NewAnalysisFilterConfig;
    appliedFilter: NewAnalysisFilterStructure[];
    newAnalysisSortedBy: string;
    newAnalysisSortOrder: string;
    applyNewAnalysisFilter: ( sort: string, filter: NewAnalysisFilterStructure[], newAnalysisSortedBy: string, newAnalysisSortOrder: string, applyType: string) => void;
    isFilterForwarded: boolean;
    clearForwardedFilter: () => void;
}
interface State {
    min: number;
    max: number;
    leftThumbValue: number;
    rightThumbValue: number;
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
      left: "calc(-130% + 1px)",
      top: -32,
      border: "1px solid #FBCE2F",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      borderRadius: "5px",
      padding: "0px 10px",
      width: "90px",
      fontSize: "12px",
      "& *": {
        background: "transparent",
        color: "#000",
        width: "90px",
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

export default class DateSeriesSlider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            min: getDateIndex(props.maxValue, props.dateAggregate) ,
            max: getDateIndex(props.maxValue, props.dateAggregate),
            leftThumbValue: getDateIndex(props.leftThumb, props.dateAggregate),
            rightThumbValue: getDateIndex(props.rightThumb, props.dateAggregate)
        }
        this.getDateForIndex = this.getDateForIndex.bind(this);
        this.changeViewPort = this.changeViewPort.bind(this);
        this.getMarks = this.getMarks.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if(this.props.dateAggregate !== nextProps.dateAggregate){
            this.setState({ min: getDateIndex(nextProps.minValue, nextProps.dateAggregate) });
            this.setState({ max: getDateIndex(nextProps.maxValue , nextProps.dateAggregate) });
            this.setState({ leftThumbValue: getDateIndex(nextProps.leftThumb, nextProps.dateAggregate) });
            this.setState({ rightThumbValue: getDateIndex(nextProps.rightThumb, nextProps.dateAggregate) });
        }
        if(this.props.minValue !== nextProps.minValue){
            this.setState({ min: getDateIndex(nextProps.minValue, nextProps.dateAggregate) });
        }
        if(this.props.maxValue !== nextProps.maxValue){
            this.setState({ max: getDateIndex(nextProps.maxValue , nextProps.dateAggregate) });
        }
        if(this.props.leftThumb !== nextProps.leftThumb){
            this.setState({ leftThumbValue: getDateIndex(nextProps.leftThumb, nextProps.dateAggregate) });
        }
        if(this.props.rightThumb !== nextProps.rightThumb){
            this.setState({ rightThumbValue: getDateIndex(nextProps.rightThumb, nextProps.dateAggregate) });
        }
    }
    render() {
        let { min, max, leftThumbValue, rightThumbValue } = this.state;
        let { loader, labelName, dateAggregate, configComponent, parentAggregate, appliedFilter } = this.props;
        if (!isNullOrUndefined(loader)) {
            if (loader) {
                return (
                    <div className="row">
                        <div className="col-md-12 pt-2 date-slider-block">
                            <CircleLoader />
                        </div>
                    </div>
                );
            } else {
                if(dateAggregate.length > 0){
                    return (
                        <div className="row">
                            <div className="col-md-12 pt-1 date-slider-block"/*   style={{zIndex: 10}} */ >
                                <div className="row">
                                    <div className="col-md-11 pl-2 mx-auto px-0">
                                        <div className="date-slider-title">{labelName}</div>
                                    </div>
                                    { filterForBiExists(configComponent.type, parentAggregate.value, appliedFilter) === true && 
                                        <div className="col-md-1">
                                            <span className="cursor-pointer new-analysis-clear-widget-filter" onClick={() => this.clearFilter()} style={{float: "right"}} >Clear</span>    
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-10 pt-4 mt-2 mx-auto px-2">
                                    <CustomRangeSlider step={1} min={min} max={max} marks={this.getMarks()} defaultValue={[leftThumbValue, rightThumbValue]} valueLabelDisplay="auto" valueLabelFormat={this.getDateForIndex} onChangeCommitted={this.changeViewPort} />
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
                                    <div className="col-md-10 mx-auto px-0">
                                        <div className="date-slider-title">{labelName}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-10 pt-4 mt-2 mx-auto px-2 date-slider-title" style={{color: "#6D6E71"}}>
                                        No Dates Present
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
        let {dateAggregate, parentAggregate, appliedFilter, configComponent, newAnalysisSortOrder, newAnalysisSortedBy, isFilterForwarded} = this.props;
        if (!isNullOrUndefined(value[0])) {
            let min = value[0];
            let max = value[1];
            if(max >= min){
                let minDateFilter: NewAnalysisFilterStructure = generateNewAnalysisDateFilter(dateAggregate[min], parentAggregate, configComponent, '>=');
                let maxDateFilter: NewAnalysisFilterStructure = generateNewAnalysisDateFilter(dateAggregate[max], parentAggregate, configComponent, '<=');
                let tempAppliedFilter: NewAnalysisFilterStructure[] =  addOrReplaceAnalysisFilter(minDateFilter, appliedFilter);
                tempAppliedFilter = addOrReplaceAnalysisFilter(maxDateFilter, tempAppliedFilter);
                this.props.applyNewAnalysisFilter( '', tempAppliedFilter, newAnalysisSortedBy, newAnalysisSortOrder, 'current');
                if(isFilterForwarded){
                    this.props.clearForwardedFilter(); 
                }
            }
        }
    }

    getDateForIndex(value: number, index: number): string{
        let{ dateAggregate} = this.props;
        let dateValue: string = '';
        if(value !== undefined && dateAggregate !== undefined && dateAggregate.length > 0 ){
            dateValue = getNormalizedDateToDateString(dateAggregate[value].value); 
        }
        return dateValue;
    }

    getMarks(): Mark[]{
        let {min, max} = this.state;
        let mark: Mark[] = [
            {
                value: min,
                label: this.getDateForIndex(min, 0)
            },
            {
                value: max,
                label: this.getDateForIndex(max, 0)
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
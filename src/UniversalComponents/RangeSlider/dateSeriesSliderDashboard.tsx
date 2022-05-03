import React from 'react';
import { isNullOrUndefined } from 'is-what';
import CircleLoader from '../Loader/circleLoader';
import { getNormalizedDateToDateString } from '../../Utils/DataModifierUtil/dataModUtil';
import { getDateIndex } from './sliderUtils';
import Slider, { Mark } from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { NewDashboardFilterAggregate, NewDashboardFilterConfig, NewDashboardFilterStructure } from '../../NewDashboard/State/newDashboardState';
import { addOrReplaceDashboardFilter, generateNewDashboardDateFilter } from '../../NewDashboard/Utils/newDashboardUtils';

interface Props {
    labelName: string;
    loader: boolean;
    minValue: string;
    maxValue: string;
    leftThumb: string;
    rightThumb: string;
    dateAggregate: NewDashboardFilterAggregate[];
    parentAggregate: NewDashboardFilterAggregate;
    configComponent: NewDashboardFilterConfig;
    appliedFilter: NewDashboardFilterStructure[];
    newDashboardSortedBy: string;
    newDashboardSortOrder: string;
    applyNewDashboardFilter: ( sort: string, filter: NewDashboardFilterStructure[], newDashboardSortedBy: string, newDashboardSortOrder: string) => void;
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

export default class DateSeriesSliderDashboard extends React.Component<Props, State> {
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
        let { loader, labelName, dateAggregate } = this.props;
        if (!isNullOrUndefined(loader)) {
            if (loader) {
                return (
                    <div className="row">
                        <div className="col-md-12 pt-4 mt-3 date-slider-block"  style={{height: "200px"}} >
                            <CircleLoader />
                        </div>
                    </div>
                );
            } else {
                if(dateAggregate.length > 0){
                    return (
                        <div className="row">
                            <div className="col-md-12 pt-1 mt-3 date-slider-block" style={{height: "200px"}} >
                                <div className="row">
                                    <div className="col-md-11 mt-1 mx-auto px-0">
                                        <div className="date-slider-title">{labelName}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-10 pt-4 mt-3 mx-auto px-2">
                                    <CustomRangeSlider step={1} min={min} max={max} marks={this.getMarks()} defaultValue={[leftThumbValue, rightThumbValue]} valueLabelDisplay="auto" valueLabelFormat={this.getDateForIndex} onChangeCommitted={this.changeViewPort} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="row">
                            <div className="col-md-12 pt-1 mt-3 date-slider-block" style={{height: "200px"}}  >
                                <div className="row">
                                    <div className="col-md-11 mx-auto px-0">
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
        let {dateAggregate, parentAggregate, appliedFilter, configComponent, newDashboardSortOrder, newDashboardSortedBy,} = this.props;
        if (!isNullOrUndefined(value[0])) {
            let min = value[0];
            let max = value[1];
            if(max >= min){
                let minDateFilter: NewDashboardFilterStructure = generateNewDashboardDateFilter(dateAggregate[min], parentAggregate, configComponent, '>=');
                let maxDateFilter: NewDashboardFilterStructure = generateNewDashboardDateFilter(dateAggregate[max], parentAggregate, configComponent, '<=');
                let tempAppliedFilter: NewDashboardFilterStructure[] =  addOrReplaceDashboardFilter(minDateFilter, appliedFilter);
                tempAppliedFilter = addOrReplaceDashboardFilter(maxDateFilter, tempAppliedFilter);
                this.props.applyNewDashboardFilter( '', tempAppliedFilter, newDashboardSortedBy, newDashboardSortOrder);
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
}
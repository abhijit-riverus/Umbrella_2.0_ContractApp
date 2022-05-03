import React, { Component } from 'react';
import Scrollable from '../../../../../UniversalComponents/Scrollable/scrollable';
import { dateInfo, DurationType,  editedDates,  LinkDateRequest,  } from '../../../../State/documentState';
import { dateBiMap, getTermDurationInfoFromChild, } from '../../../Utils/docUtils';

interface Props {
    savedInsight: any;
    durationList: DurationType[];
    dataPointName: string;
    editDuration: (duration: LinkDateRequest) => void;
    clearNormalizedEdit: () => void;
}

interface State {
    dateInAddMode: dateInfo;
    hideOptions: boolean;
    selectedOption: DurationType;
}

export default class TermDurationNormalizedAddEdit extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dateInAddMode: {
                dateId: -1,
                phrase: '',
                paraId: -1,
                rowId: -1,
                columnId: -1,
                duration_value: -1,
                duration_typeid: -1
            },
            hideOptions: false,
            selectedOption: {
                durationTypeId: -1,
                durationName: '',
                durationType: ''
            }
        }
    }

    componentDidMount() {
        let {durationList} = this.props;
        let termDuration = getTermDurationInfoFromChild(this.props.savedInsight);
        this.setState({dateInAddMode: termDuration,
            selectedOption: (termDuration.duration_typeid !== undefined && termDuration.duration_typeid) !== -1 ? durationList.filter((item)=> item.durationTypeId === termDuration.duration_typeid)[0] : this.state.selectedOption
        });
    }
    
    setDuration = (duration: DurationType) => {
        let tempDateInAddMode: dateInfo = this.state.dateInAddMode;
        tempDateInAddMode.duration_typeid = duration.durationTypeId
        this.setState({selectedOption: duration, hideOptions: false, dateInAddMode: tempDateInAddMode});
    }

    render() {
         let { durationList } = this.props;
         let { dateInAddMode, hideOptions, selectedOption } = this.state;
        return (
            <div className="row">
                <div className="col-md-12" id="duration-container">
                    <div className="row">
                        <div className="col-md-3 py-2" style={{marginLeft: '10px'}}>
                            Duration
                        </div>
                        <div className="col-md-3 py-2">
                            <input type="text" className="duration-input" value={dateInAddMode.duration_value === -1 ? '' : dateInAddMode.duration_value} placeholder="Enter no." onChange={(e) => this.setDurationValue(e)} style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-3 py-2">
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ hideOptions: !this.state.hideOptions})} >
                                <input type="text" className="modal-input" placeholder="Select duration" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOption.durationName === '' ? '' : selectedOption.durationName } readOnly  />
                                <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: hideOptions ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                            </span>
                            {hideOptions &&
                                <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                    <Scrollable maxHeight={100}>
                                        {durationList.map((durationItem, i)=>
                                            <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.setDuration(durationItem)} >{durationItem.durationName}</div>
                                        )}
                                    </Scrollable>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-10 align-right">
                            <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                            {this.getSaveStatus() ?
                                <span className="upload-yellow-btn ml-4" id="save-btn"
                                    onClick={() => this.onSave()}>
                                    Save
                                </span>
                                :
                                <span className="upload-disable-btn ml-4" id="save-btn">
                                    Save
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getSaveStatus() {
        let { dateInAddMode } = this.state;
        let isSavedDatesLinked: boolean = false;
        if(dateInAddMode.paraId !== -1 && dateInAddMode.duration_value !== undefined && dateInAddMode.duration_value > -1 && dateInAddMode.duration_typeid !== undefined && dateInAddMode.duration_typeid > -1){
            isSavedDatesLinked = true;
        }
        return isSavedDatesLinked;
    }

    setDurationValue(event: any){
        let { dateInAddMode } = this.state;
        let {durationList} = this.props;
        let value = event.target.value;
        let duration: number = dateInAddMode.duration_value !== undefined ? dateInAddMode.duration_value : -1;
        if(value.length === 0){
            duration =  -1;
        } else {
            if(!isNaN(value) && value.length > 0){ 
                duration = Number(value);
            }
        }
        let tempDateInAddMode: dateInfo = dateInAddMode;
        tempDateInAddMode.duration_value = duration;
        let durationString: string = ''; 
        let durationTypeName: string = '';
        if(duration > -1){
            durationString += duration;
        }
        if(tempDateInAddMode.duration_typeid !== undefined  && tempDateInAddMode.duration_typeid > -1){
            let durationType: DurationType = durationList.filter((item)=> item.durationTypeId === tempDateInAddMode.duration_typeid)[0]
            durationTypeName += durationType.durationName; 
        }
        tempDateInAddMode.phrase = '' + durationString + ' ' + durationTypeName; 
        this.setState({ dateInAddMode: tempDateInAddMode });
    }

    

    onCancel() {
        this.props.clearNormalizedEdit();
        this.setState({
            dateInAddMode: {
                dateId: -1,
                phrase: '',
                paraId: -1,
                rowId: -1,
                columnId: -1,
                duration_value: -1,
                duration_typeid: -1
            },
            hideOptions: false,
            selectedOption: {
                durationTypeId: -1,
                durationName: '',
                durationType: ''
            }
        });
    }

    onSave() {
        let { dateInAddMode } = this.state;
        let {  dataPointName } = this.props;
        let editedTermDurations: editedDates = { 
            upsert: [dateInAddMode], 
            deleted: [], 
            bi: dateBiMap[dataPointName] 
        };

        let tempDateRequest: LinkDateRequest = {
            data: 'Yes',
            editedDates: editedTermDurations,
            mode: 'manual'
        }
        this.props.editDuration(tempDateRequest);
        this.props.clearNormalizedEdit();
        this.setState({
            dateInAddMode: {
                dateId: -1,
                phrase: '',
                paraId: -1,
                rowId: -1,
                columnId: -1,
                duration_value: -1,
                duration_typeid: -1
            },
            hideOptions: false,
            selectedOption: {
                durationTypeId: -1,
                durationName: '',
                durationType: ''
            }
        });
    }
}

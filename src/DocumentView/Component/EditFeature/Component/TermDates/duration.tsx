import React, { Component } from 'react';
import Scrollable from '../../../../../UniversalComponents/Scrollable/scrollable';
import { dateInfo, DurationType, editedDates, LinkDateRequest, tableInfo } from '../../../../State/documentState';
import { deleteDateFromDateArray, dateBiMap, getFilteredDatePhrases, getFilteredDateParas, getFilteredDateTableCells, getTermDurationFromChildArray } from '../../../Utils/docUtils';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editDuration: (duration: LinkDateRequest) => void;
    savedDuration: any;
    dataPointName: string;
    highlightedId: number[] | null;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
    savedHighlightedDates: dateInfo[] | null;
    saveHighlightedDates: (savedHighlightedDates: dateInfo[] | null) => void;
    dateInAddEditMode: dateInfo | null;
    saveDateInAddEditMode: (dateInAddEditMode: dateInfo | null) => void;
    dateEditingStatus: boolean;
    saveDateEditingStatus: (dateEditingStatus: boolean) => void;
    durationList: DurationType[];
}

interface State {
    dateInAddMode: dateInfo;
    hideOptions: boolean;
    selectedOption: DurationType;
}

export default class Duration extends Component<Props, State> {
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
        let termDuration = getTermDurationFromChildArray(this.props.savedDuration);
        this.setState({dateInAddMode: termDuration,
            selectedOption: (termDuration.duration_typeid !== undefined && termDuration.duration_typeid) !== -1 ? durationList.filter((item)=> item.durationTypeId === termDuration.duration_typeid)[0] : this.state.selectedOption
        });
    }
    componentWillReceiveProps(nextProps: Props) {
        if (this.props.dateInAddEditMode !== nextProps.dateInAddEditMode) {
            if (nextProps.dateInAddEditMode !== null && nextProps.dateInAddEditMode.dateId === -1) {
                if (this.state.dateInAddMode !== null && (nextProps.dateInAddEditMode.paraId !== this.state.dateInAddMode.paraId || nextProps.dateInAddEditMode.rowId !== this.state.dateInAddMode.rowId || nextProps.dateInAddEditMode.columnId !== this.state.dateInAddMode.columnId)) {
                    this.setState({ dateInAddMode: nextProps.dateInAddEditMode });
                }
            }
        }
    }
    render() {
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-12 m-0 bi-label-clickable" style={{ fontWeight: 600 }}>
                            Add Duration
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 edit-title-header">
                            Add/edit the duration to your contract here...
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 bi-label-clickable edit-date-title">
                            Duration
                        </div>
                        <div className="col-md-12" style={{ margin: 'auto' }}>
                            {this.getDuration()}
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <span className="mr-2">
                                <img alt='active' src='/static_images/checkbox_active.svg' className="filter-select-asset cursor-pointer " />
                            </span>&nbsp;&nbsp;
                            Share feedback with Riverus.
                        </div>
                    </div> */}
                    {this.saveOrCancel()}
                </div>
            </div>
        );
    }

    selectDate = (event: any) => {
        event.preventDefault();
        let selectedDate = event.currentTarget.value;
        let tempDateInAddMode: dateInfo = {
            dateId: -1,
            phrase: selectedDate,
            paraId: -1,
            rowId: -1,
            columnId: -1,
            duration_typeid: -1,
            duration_value: -1
        }
        this.setState({ dateInAddMode: tempDateInAddMode });
        this.props.saveDateEditingStatus(false);
        this.props.saveHighlightedId(null);
        this.props.saveHighlightedTableCells(null);
        this.props.saveDateInAddEditMode(null);
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
        this.props.saveDateEditingStatus(false);
        this.props.saveHighlightedId(null);
        this.props.saveHighlightedTableCells(null);
        this.props.saveDateInAddEditMode(null);
    }

    editLinkedPara(dateInfo: dateInfo) {
        let { saveHighlightedDataPoint, dataPointName } = this.props;

        if (dateInfo.paraId !== null && dateInfo.paraId !== -1 && dateInfo.rowId !== null && dateInfo.rowId !== -1 && dateInfo.columnId !== null && dateInfo.columnId !== -1) {
            let tempTableCell = {
                paraId: dateInfo.paraId,
                rowId: dateInfo.rowId,
                columnId: dateInfo.columnId
            }
            let scrollToTableCellId = document.getElementById('p' + dateInfo.paraId + ';r' + dateInfo.rowId + ';c' + dateInfo.columnId);
            scrollToTableCellId !== undefined && scrollToTableCellId !== null && scrollToTableCellId.scrollIntoView({ block: 'center' });
            this.props.saveHighlightedTableCells([tempTableCell]);
            this.props.saveHighlightedId(null);
        } else if (dateInfo.paraId !== null && dateInfo.paraId !== -1 && (dateInfo.rowId === null || dateInfo.rowId === -1) && (dateInfo.columnId === null || dateInfo.columnId === -1)) {
            let scrollToParaId = document.getElementById('p' + dateInfo.paraId);
            scrollToParaId !== undefined && scrollToParaId !== null && scrollToParaId.scrollIntoView({ block: 'center' });
            this.props.saveHighlightedId([dateInfo.paraId]);
            this.props.saveHighlightedTableCells(null);
        }
        this.props.saveDateInAddEditMode(dateInfo);
        saveHighlightedDataPoint(dataPointName);
        this.props.saveDateEditingStatus(true);
        this.props.editOptionSelected(true);
    }

    linkToPara(dateInfo: dateInfo) {
        this.props.saveDateEditingStatus(true);
        this.props.saveHighlightedId(null);
        this.props.saveHighlightedTableCells(null);
        this.props.editOptionSelected(true);
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
        this.props.saveDateInAddEditMode(dateInfo);
    }

    getDuration() {
        let { dateInAddMode, hideOptions, selectedOption } = this.state;
        let { durationList } = this.props;
    
        return (
            <div className="row">
                <div className="col-md-3 py-2">
                        <input type="text" className="duration-input" value={dateInAddMode.duration_value === -1 ? '' : dateInAddMode.duration_value} placeholder="Enter no." onChange={(e) => this.setDurationValue(e)} style={{ width: '100%' }} />
                    </div>
                    <div className="col-md-3 py-2">
                        <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ hideOptions: !this.state.hideOptions})} >
                            <input type="text" className="modal-input" placeholder="Select currency" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOption.durationName === '' ? '' : selectedOption.durationName } readOnly  />
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
                {this.linkParaToDate(dateInAddMode)}
            </div>
        )
    }

    linkParaToDate = (dateString: dateInfo | null) => {
        let { dateInAddEditMode, dateEditingStatus } = this.props;
        if (dateString !== null) {
            if (dateEditingStatus === true && dateInAddEditMode !== null && dateString.dateId === dateInAddEditMode.dateId) {
                if (dateInAddEditMode.paraId !== null && dateInAddEditMode.paraId > -1) {
                    return (
                        <>
                            <div className="col-md-10">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex" >
                                <span className="linked-para-count">
                                    {1}
                                </span>
                            </div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#C1C1C1' }} >
                                    Link to paragraph(s)
                                </span>
                            </div>
                            <div className="col-md-12 link-to-info">
                                Please highlight the paragraphs on the document, you wish to link to this data point and click on save.
                            </div>
                        </>
                    )
                }
            }

            if ((dateInAddEditMode !== null && dateInAddEditMode.dateId !== dateString.dateId) || (dateInAddEditMode === null)) {
                if (dateString.paraId !== null && dateString.paraId > -1 ) {
                    return (
                        <>
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#88305F' }} onClick={() => this.editLinkedPara(dateString)}>
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                        </>
                    )
                } else if (dateString.paraId === null || dateString.paraId === -1) {
                    return (
                        <>
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#88305F' }}
                                    onClick={() => this.linkToPara(dateString)} >
                                    Link to paragraph(s)
                                </span>
                            </div>
                        </>
                    )
                }
            }
        }
    }

    saveOrCancel = () => {
        return (
            <div className="row my-2">
                {/* <div className="col-md-5" /> */}
                <div className="col-md-12 align-right">
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

    onCancel() {
        this.props.saveHighlightedDates(null);
        this.props.saveDateInAddEditMode(null);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedId(null);
        this.props.editOptionSelected(false);
        this.props.saveDateEditingStatus(false);
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
        let editedDates: editedDates = { 
            upsert: [dateInAddMode], 
            deleted: [], 
            bi: dateBiMap[dataPointName] 
        };

        let tempDateRequest: LinkDateRequest = {
            data: 'Yes',
            editedDates: editedDates,
            mode: 'manual'
        }

        this.props.editDuration(tempDateRequest);
        this.props.saveHighlightedDates(null);
        this.props.saveDateInAddEditMode(null);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedId(null);
        this.props.saveDateEditingStatus(false);
        this.props.editOptionSelected(false);
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

    setDuration = (duration: DurationType) => {
        let tempDateInAddMode: dateInfo = this.state.dateInAddMode;
        tempDateInAddMode.duration_typeid = duration.durationTypeId
        this.setState({selectedOption: duration, hideOptions: false, dateInAddMode: tempDateInAddMode});
    }

}
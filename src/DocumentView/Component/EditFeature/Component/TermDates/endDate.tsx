import React, { Component } from 'react';
import { dateInfo, editedDates, LinkDateRequest, tableInfo } from '../../../../State/documentState';
import { getDatesFromChild, deleteDateFromDateArray, dateBiMap, getFilteredDatePhrases, getFilteredDateParas, getFilteredDateTableCells, normalizeDates } from '../../../Utils/docUtils';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editEndDates: (endDates: LinkDateRequest) => void;
    savedDates: any;
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
}

interface State {
    dateInAddMode: dateInfo | null;

}

export default class EndDate extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dateInAddMode: null
        }
    }
    componentDidMount() {
        let endDates = getDatesFromChild(this.props.savedDates)
        this.props.saveHighlightedDates(endDates);
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
                            Add End Dates
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 edit-title-header">
                            Add/edit the end date to your contract here...
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 bi-label-clickable edit-date-title">
                            Dates
                        </div>
                        <div className="col-md-12" style={{ margin: 'auto' }}>
                            {this.getEndDates()}
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
        let selectedDate = normalizeDates(event.currentTarget.value);
        let tempDateInAddMode: dateInfo = {
            dateId: -1,
            phrase: selectedDate,
            paraId: -1,
            rowId: -1,
            columnId: -1
        }
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

    getEndDates() {
        let { dateInAddMode } = this.state;
        let { savedHighlightedDates } = this.props;
        if (savedHighlightedDates !== null && savedHighlightedDates.length > 0) {
            return (
                <>
                    {savedHighlightedDates.map((date, i) =>
                        i===0 && <div className="row" key={i}>
                            <div className="col-md-8 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                <input type="text" className="tag-input" value={date.phrase} style={{ width: '100%' }} readOnly onChange={() => { }} />
                            </div>
                            <div className="col-md-4 align-right">
                                {/* <img className='cursor-pointer' src="/static_images/less-parties.svg" alt="remove-icon" onClick={() => this.addOrRemoveDates('remove', date)} /> */}
                            </div>
                            {this.linkParaToDate(date)}
                        </div>
                    )}
                    {/* <div className="row">
                        <div className="col-md-8 my-1 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                            <input type="date" className="tag-input"
                                onChange={(e) => this.selectDate(e)}
                                style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-4 align-right">
                            {dateInAddMode !== null && dateInAddMode.phrase !== '' ?
                                <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemoveDates('add', dateInAddMode)} />
                                : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                            }
                        </div>
                        {dateInAddMode !== null && dateInAddMode.phrase !== '' && this.linkParaToDate(dateInAddMode)}
                    </div> */}
                </>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-md-8 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                        <input type="date" className="tag-input" placeholder="Enter text" onChange={(e) => this.selectDate(e)} style={{ width: '100%' }} />
                    </div>
                    <div className="col-md-4 align-right">
                        {/* {dateInAddMode !== null && dateInAddMode.phrase !== '' ?
                            <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemoveDates('add', dateInAddMode)} />
                            : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                        } */}

                    </div>
                    {this.linkParaToDate(dateInAddMode)}
                </div>
            )
        }
    }

    linkParaToDate = (dateString: dateInfo | null) => {
        let { editOptionSelected, dataPointName, highlightedId, saveHighlightedId, dateInAddEditMode, dateEditingStatus } = this.props;
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
                if (dateString.paraId !== null && dateString.paraId > -1 && dateString.phrase !== '') {
                    return (
                        <>
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#88305F' }} onClick={() => this.editLinkedPara(dateString)}>
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                        </>
                    )
                } else if (dateString.phrase !== '' && (dateString.paraId === null || dateString.paraId === -1)) {
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
        let { savedHighlightedDates } = this.props;
        let { dateInAddMode } = this.state;
        let isSavedDatesLinked: boolean = false;
        if (savedHighlightedDates !== null && savedHighlightedDates.length > 0) {
            if (savedHighlightedDates.findIndex((date) => (date.paraId === null || date.paraId === -1)) === -1) {
                isSavedDatesLinked = true;
            }
        } else if (savedHighlightedDates === null || savedHighlightedDates.length === 0) {
            isSavedDatesLinked = true;
        }
        let isNewDateLinked = false;
        if (dateInAddMode !== null) {
            if (dateInAddMode.paraId !== null && dateInAddMode.paraId !== -1) {
                isNewDateLinked = true;
            }
        } else if (dateInAddMode === null) {
            isNewDateLinked = true;
        }
        if (isSavedDatesLinked === true && isNewDateLinked === true) {
            return true;
        }
        return false;
    }

    onCancel() {
        this.props.saveHighlightedDates(null);
        this.props.saveDateInAddEditMode(null);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedId(null);
        this.props.editOptionSelected(false);
        this.props.saveDateEditingStatus(false);
        this.setState({ dateInAddMode: null });
    }

    onSave() {
        let { dateInAddMode } = this.state;
        let { dateInAddEditMode, savedHighlightedDates, dataPointName } = this.props;
        let tempHighlightedDates = savedHighlightedDates !== null ? savedHighlightedDates : [];
        if (dateInAddMode !== null && dateInAddMode.phrase !== '') {
            tempHighlightedDates.push(dateInAddMode);
        }
        let oldDates = getDatesFromChild(this.props.savedDates);
        let upsertDates: dateInfo[] = [];
        let deletedDates: dateInfo[] = [];
        let editedDates: editedDates = { upsert: [], deleted: [], bi: '' };
        if (oldDates.length === 0) {
            if (savedHighlightedDates === null || savedHighlightedDates.length === 0) {
                //nothing added nor deleted
                editedDates.upsert = [];
                editedDates.deleted = [];
            } else if (savedHighlightedDates !== null && savedHighlightedDates.length > 0) {
                //new dates added
                upsertDates = [];
                savedHighlightedDates.forEach((date) => upsertDates.push(date));
                editedDates.upsert = upsertDates;
                editedDates.deleted = [];
            }
        } else if (oldDates.length > 0 && (savedHighlightedDates === null || savedHighlightedDates.length === 0)) {
            //all old dates deleted
            deletedDates = [];
            oldDates.forEach((date) => deletedDates.push(date));
            editedDates.upsert = [];
            editedDates.deleted = deletedDates;
        } else {
            let oldDatePhrases = getFilteredDatePhrases(oldDates);
            let changedDatePhrases = getFilteredDatePhrases(tempHighlightedDates);
            let oldDateParas = getFilteredDateParas(oldDates);
            let changedDateParas = getFilteredDateParas(tempHighlightedDates);
            let oldDateTableCells = getFilteredDateTableCells(oldDates);
            let changedDateTableCells = getFilteredDateTableCells(tempHighlightedDates);

            let editedDatePhrases = this.getAddedDeletedDatePhrases(oldDatePhrases, changedDatePhrases);
            let editedDateParas = this.getAddedDeletedDateParas(oldDateParas, changedDateParas);
            let editedDateTableCells = this.getAddedDeletedDateTableCells(oldDateTableCells, changedDateTableCells);

            editedDates = this.mergeAddedDeletedDates(editedDatePhrases, editedDateParas, editedDateTableCells);

        }

        editedDates.bi = dateBiMap[dataPointName];

        let tempDateRequest: LinkDateRequest = {
            data: 'Yes',
            editedDates: editedDates,
            mode: 'manual'
        }

        this.props.editEndDates(tempDateRequest);
        this.props.saveHighlightedDates(null);
        this.props.saveDateInAddEditMode(null);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedId(null);
        this.props.saveDateEditingStatus(false);
        this.props.editOptionSelected(false);
        this.setState({ dateInAddMode: null });
    }

    addOrRemoveDates(action: string, dateInfo: dateInfo | null) {
        if (dateInfo !== null) {
            let { dateInAddMode } = this.state;
            let { savedHighlightedDates, dateInAddEditMode } = this.props;
            if (action === 'add') {
                if (dateInAddMode !== null) {
                    let lastDateLength = -1;
                    if (savedHighlightedDates !== null) {
                        lastDateLength = savedHighlightedDates.length;
                    } else {
                        lastDateLength = 0;
                    }
                    let tempDate = dateInAddMode;
                    tempDate.dateId = lastDateLength;
                    let tempDates = savedHighlightedDates !== null ? savedHighlightedDates : [];
                    tempDates.push(tempDate);
                    this.props.saveHighlightedDates(tempDates);
                    this.setState({ dateInAddMode: null });
                    this.props.saveDateInAddEditMode(null);
                    this.props.saveHighlightedId(null);
                    this.props.saveHighlightedTableCells(null);
                    this.props.saveDateEditingStatus(false);
                }
            } else if (action === 'remove') {
                if (savedHighlightedDates !== null) {
                    let tempFilteredDates = deleteDateFromDateArray(dateInfo, savedHighlightedDates);
                    this.props.saveHighlightedDates(tempFilteredDates);
                    this.props.saveDateInAddEditMode(null);
                    this.props.saveHighlightedTableCells(null);
                    this.props.saveHighlightedId(null);
                    this.props.saveDateEditingStatus(false);
                }


            }
        }
    }

    getAddedDeletedDateParas(previousDateParas: dateInfo[], changedDateParas: dateInfo[]): editedDates {
        let addedDateParas: dateInfo[] = [];
        let deletedDateParas: dateInfo[] = [];
        if (previousDateParas.length > 0) {
            if (changedDateParas.length > 0) {
                //newly added
                for (let i = 0; i < changedDateParas.length; i++) {
                    let addedExists = false;
                    for (let j = 0; j < previousDateParas.length; j++) {
                        if (changedDateParas[i].phrase === previousDateParas[j].phrase && changedDateParas[i].paraId === previousDateParas[j].paraId) {
                            addedExists = true;
                            break;
                        }
                    }
                    if (addedExists === false) {
                        addedDateParas.push(changedDateParas[i]);
                    }
                }

                //deleted elements
                for (let i = 0; i < previousDateParas.length; i++) {
                    let deletedExists = false;
                    for (let j = 0; j < changedDateParas.length; j++) {
                        if (previousDateParas[i].phrase === changedDateParas[j].phrase && previousDateParas[i].paraId === changedDateParas[j].paraId) {
                            deletedExists = true;
                            break;
                        }
                    }
                    if (deletedExists === false) {
                        deletedDateParas.push(previousDateParas[i]);
                    }
                }

            } else {
                //all old deleted
                for (let i = 0; i < previousDateParas.length; i++) {
                    deletedDateParas.push(previousDateParas[i]);
                }
            }
        } else {
            if (changedDateParas.length > 0) {
                //newly added
                for (let i = 0; i < changedDateParas.length; i++) {
                    addedDateParas.push(changedDateParas[i]);
                }
            }
        }

        let editedDateParas: editedDates = {
            upsert: addedDateParas,
            deleted: deletedDateParas,
            bi: ''
        }
        return editedDateParas;
    }

    getAddedDeletedDateTableCells(previousDateTableCells: dateInfo[], changedDateTableCells: dateInfo[]) {
        let addedDateTableCells: dateInfo[] = [];
        let deletedDateTableCells: dateInfo[] = [];
        if (previousDateTableCells.length > 0) {
            if (changedDateTableCells.length > 0) {
                //newly added
                for (let i = 0; i < changedDateTableCells.length; i++) {
                    let addedExists = false;
                    for (let j = 0; j < previousDateTableCells.length; j++) {
                        if (changedDateTableCells[i].phrase === previousDateTableCells[j].phrase && changedDateTableCells[i].paraId === previousDateTableCells[j].paraId && changedDateTableCells[i].rowId === previousDateTableCells[j].rowId && changedDateTableCells[i].columnId === previousDateTableCells[j].columnId) {
                            addedExists = true;
                            break;
                        }
                        if (addedExists === false) {
                            addedDateTableCells.push(changedDateTableCells[i]);
                        }
                    }
                }
                //deleted elements
                for (let i = 0; i < previousDateTableCells.length; i++) {
                    let deletedExists = false;
                    for (let j = 0; j < changedDateTableCells.length; j++) {
                        if (previousDateTableCells[i].phrase === changedDateTableCells[j].phrase && previousDateTableCells[i].paraId === changedDateTableCells[j].paraId && previousDateTableCells[i].rowId === changedDateTableCells[j].rowId && previousDateTableCells[i].columnId === changedDateTableCells[j].columnId) {
                            deletedExists = true;
                            break;
                        }
                    }
                    if (deletedExists === false) {
                        deletedDateTableCells.push(previousDateTableCells[i]);
                    }
                }

            } else {
                //all deleted
                for (let i = 0; i < previousDateTableCells.length; i++) {
                    deletedDateTableCells.push(previousDateTableCells[i]);
                }
            }
        } else {
            //all newly added
            if (changedDateTableCells.length > 0) {
                for (let i = 0; i < changedDateTableCells.length; i++) {
                    addedDateTableCells.push(changedDateTableCells[i]);
                }
            }
        }

        let editedDateTableCells: editedDates = {
            upsert: addedDateTableCells,
            deleted: deletedDateTableCells,
            bi: ''
        }
        return editedDateTableCells;
    }

    getAddedDeletedDatePhrases(previousDatePhrases: dateInfo[], changedDatePhrases: dateInfo[]) {
        let addedDatePhrases: dateInfo[] = [];
        let deletedDatePhrases: dateInfo[] = [];

        if (previousDatePhrases.length > 0) {
            if (changedDatePhrases.length > 0) {
                //newly added
                for (let i = 0; i < changedDatePhrases.length; i++) {
                    let addedExists = false;
                    for (let j = 0; j < previousDatePhrases.length; j++) {
                        if (changedDatePhrases[i].phrase === previousDatePhrases[j].phrase) {
                            addedExists = true;
                            break;
                        }
                    }
                    if (addedExists === false) {
                        addedDatePhrases.push(changedDatePhrases[i]);
                    }
                }
                //deleted elements
                for (let i = 0; i < previousDatePhrases.length; i++) {
                    let deletedExists = false;
                    for (let j = 0; j < changedDatePhrases.length; j++) {
                        if (previousDatePhrases[i].phrase === changedDatePhrases[j].phrase) {
                            deletedExists = true;
                            break;
                        }
                    }
                    if (deletedExists === false) {
                        deletedDatePhrases.push(previousDatePhrases[i]);
                    }
                }

            } else {
                //all deleted
                for (let i = 0; i < previousDatePhrases.length; i++) {
                    deletedDatePhrases.push(previousDatePhrases[i]);
                }
            }
        } else {
            if (changedDatePhrases.length > 0) {
                //all newly added
                for (let i = 0; i < changedDatePhrases.length; i++) {
                    addedDatePhrases.push(changedDatePhrases[i]);
                }
            }
        }

        let editedDatePhrases: editedDates = {
            upsert: addedDatePhrases,
            deleted: deletedDatePhrases,
            bi: ''
        }
        return editedDatePhrases;
    }

    mergeAddedDeletedDates(firstEditedDates: editedDates, secondEditedDates: editedDates, thirdEditedDates: editedDates) {
        let upsertDates = firstEditedDates.upsert.concat(secondEditedDates.upsert).concat(thirdEditedDates.upsert);
        let deletedDates = firstEditedDates.deleted.concat(secondEditedDates.deleted).concat(thirdEditedDates.deleted);

        let mergedEditedDates = {
            upsert: upsertDates,
            deleted: deletedDates,
            bi: ''
        }
        return mergedEditedDates;
    }

}
import React, { Component } from 'react';
import Scrollable from '../../../../../UniversalComponents/Scrollable/scrollable';
import { DurationType, editedPhrases, LinkPhraseRequest, phraseInfo, tableInfo } from '../../../../State/documentState';
import {  isTableCell, phraseBiMap, phraseLevelMapping } from '../../../Utils/docUtils';

interface Props {
    dataPointName: string;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editOptionSelected: (editOptionSelected: boolean) => void;
    savedInsight: any;
    editPhrasesRequest: (newPhraseRequest: LinkPhraseRequest) => void;
    savedHighlightedPhrases: phraseInfo[] | null;
    saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) => void;
    phraseEditOptionSelected: boolean;
    savePhraseEditOption: (phraseEditOptionSelected: boolean) => void;
    phraseInDeleteMode: phraseInfo | null;
    phraseDeleteStatus: boolean;
    saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) => void;
    phraseInAddMode: phraseInfo | null;
    phraseAddStatus: boolean;
    saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) => void;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
    durationList: DurationType[];
}

interface State {
    isAddingPhrase: boolean;
    isEditingState: boolean;
    currentEditingPhrase: phraseInfo | null;
    hideOptions: boolean;
    selectedOption: DurationType;
    durationValue: number;
}

export default class LinkDurationPhrases extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAddingPhrase: false,
            isEditingState: false,
            currentEditingPhrase: null,
            hideOptions: false,
            selectedOption: {
                durationName: '',
                durationType: '',
                durationTypeId: -1
            },
            durationValue: -1
        }
    }

    componentDidMount() {
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
    }
    componentWillReceiveProps(nextProps: Props) {
        if (this.props.phraseInAddMode !== nextProps.phraseInAddMode) {
            if (nextProps.phraseInAddMode !== null) {
                this.setState({ isAddingPhrase: false });
            }
        }
    }

    render() {
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-12 m-0 bi-label-clickable" style={{ fontWeight: 600 }}>
                            Add {phraseLevelMapping[this.props.dataPointName]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 edit-title-header">
                            Add/edit {phraseLevelMapping[this.props.dataPointName]} to your contract here...
                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-md-12 bi-label-clickable edit-date-title">
                            {phraseLevelMapping[this.props.dataPointName]}
                        </div> */}
                        <div className="col-md-12">
                            {this.getPhraseEdit()}
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

                    {this.saveOrCancelPhraseEdit()}

                </div>
            </div>
        )
    }

    getPhraseEdit() {
        let {  phraseInAddMode, durationList } = this.props;
        let {durationValue, selectedOption, hideOptions} = this.state;
        return (
            <div className="row">
                <div className="col-md-3 bi-label-clickable edit-date-title">
                    {phraseLevelMapping[this.props.dataPointName]}
                </div>
                <div className="col-md-8" style={{ color: '#4D4D4D', fontSize: '14px' }}>
                        <div className="row">
                            <div className="col-md-4 py-2">
                                <input type="text" className="duration-input" value={durationValue === -1 ? '' : durationValue} placeholder="Enter no." onChange={(e) => this.setDurationValue(e)} style={{ width: '100%' }} />
                            </div>
                            <div className="col-md-6 py-2">
                                <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD', lineHeight: '24px' }}  onClick={() => this.setState({ hideOptions: !this.state.hideOptions})} >
                                    <input type="text" className="modal-input" placeholder="Select duration" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOption.durationName } readOnly  />
                                    <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: hideOptions ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                </span>
                                {hideOptions &&
                                    <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px", position: 'absolute', zIndex: 2, width: '83%'  }}>
                                        <Scrollable maxHeight={100}>
                                            {durationList.map((durationItem, i)=>
                                                <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.setDuration(durationItem)} >{durationItem.durationName}</div>
                                            )}
                                        </Scrollable>
                                    </div>
                                }
                            </div>
                        </div>
                        {this.linkPhraseOnDoc(phraseInAddMode)}
                </div>
            </div>
        );
    }

    setDurationValue(event: any){
        let { durationValue } = this.state;
        let value = event.target.value;
        let duration: number = durationValue;
        if(value.length === 0){
            duration =  -1;
        } else {
            if(!isNaN(value) && value.length > 0){ 
                duration = Number(value);
            }
        }
        this.setState({ durationValue: duration });
    }

    setDuration = (duration: DurationType) => {
        this.setState({selectedOption: duration, hideOptions: false});
    }

    saveOrCancelPhraseEdit() {
        return (
            <div className="row my-2">
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

    getSaveStatus(){
        let { phraseInAddMode } = this.props;
        let {durationValue, selectedOption} = this.state;
        let saveStatus: boolean = false;
        if(phraseInAddMode !== null && phraseInAddMode.paraId !== null && phraseInAddMode.paraId !== -1 && durationValue !== -1 && selectedOption.durationTypeId !== -1){
            saveStatus = true;
        }
        return saveStatus;
    }

    linkPhraseOnDoc(phraseInfo: phraseInfo | null) {
        if (phraseInfo === null) {
            return (
                <>
                    <div className="col-md-12">
                        <span className="link-to cursor-pointer" style={{ color: this.state.isAddingPhrase !== true ? '#88305F' : this.props.phraseEditOptionSelected === true ? '#C1C1C1' : '#88305F', cursor: 'pointer' }} onClick={() => this.linkToPhrase()} >
                            Link phrase(s)
                        </span>
                    </div>
                    {this.props.phraseEditOptionSelected === true ?
                        <div className="col-md-12 mt-4 link-to-info">
                            Please hover and click to select text on the document, to link it to this data point and click on save.
                    </div>
                        : <div />}
                </>
            );

        } else {
            return (
                <div className="row">
                    <div className="col-md-12 ml-3">
                        <span className="link-to" style={{ color: this.state.currentEditingPhrase === phraseInfo ? '#C1C1C1' : '#88305F', cursor: 'pointer' }} onClick={() => this.editLinkedPhraseOnDoc(phraseInfo)} >
                            Edit linked phrase(s)
                            </span>
                    </div>
                    <div className="col-md-2 pr-0 ml-3 display-flex"  >
                        <span className="linked-para-count">
                            {phraseInfo === null ? 0 : 1}
                        </span>
                    </div>
                </div>
            )
        }
    }

    linkToPhrase() {
        this.props.savePhraseEditOption(true);
        this.setState({ isAddingPhrase: true, currentEditingPhrase: null, isEditingState: false });
        this.props.saveDeletePhrase(null, false);
        this.props.saveHighlightedTableCells(null);
        this.props.editOptionSelected(true);
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
    }

    editLinkedPhraseOnDoc(phraseInfo: phraseInfo) {
        let deletePhraseElement = '';
        if (isTableCell(phraseInfo)) {
            let tempTablCell: tableInfo = {
                paraId: phraseInfo.paraId,
                rowId: phraseInfo.rowId !== null ? phraseInfo.rowId : -1,
                columnId: phraseInfo.columnId !== null ? phraseInfo.columnId : -1
            }
            deletePhraseElement = 'p' + phraseInfo.paraId + ';r' + phraseInfo.rowId + ';c' + phraseInfo.columnId;
            this.props.saveHighlightedTableCells([tempTablCell]);
        } else {
            deletePhraseElement = 'p' + phraseInfo.paraId + ';w' + phraseInfo.startWordId;
            this.props.saveHighlightedTableCells(null);
        }
        let phraseElement = document.getElementById(deletePhraseElement);
        phraseElement !== undefined && phraseElement !== null && phraseElement.scrollIntoView({ block: 'center' }); //scroll to linked phrase
        document.documentElement.style.scrollBehavior = 'smooth';

        this.props.saveDeletePhrase(phraseInfo, true);
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
        this.setState({ isEditingState: true, isAddingPhrase: false, currentEditingPhrase: phraseInfo });
        this.props.editOptionSelected(true);
    }


    onCancel() {
        this.props.saveDeletePhrase(null, false);
        this.props.saveAddPhrase(null, false);
        this.props.saveHighlightedPhrases(null);
        this.props.savePhraseEditOption(false);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedTableCells(null);
        this.setState({
            isAddingPhrase: false,
            isEditingState: false,
            currentEditingPhrase: null,
            hideOptions: false,
            selectedOption: {
                durationName: '',
                durationType: '',
                durationTypeId: -1
            },
            durationValue: -1
        });
    }

    onSave() {
        let { phraseInAddMode } = this.props;
        let {selectedOption, durationValue} = this.state;
        let tempPhraseRequest: LinkPhraseRequest = { mode: "", editedPhrases: { upsert: [], deleted: [], bi: '' } };
        let addedDeletedPhrases: editedPhrases = { upsert: [], deleted: [], bi: '' };
        let newPhrase: phraseInfo = phraseInAddMode === null ? {
            paraId: -1,
            startWordId: -1,
            endWordId: -1,
            startSentenceId:-1,
            endSentenceId:-1,
            rowId:-1,
            columnId:-1,
            phrase: '',
            durationValue: -1,
            durationTypeId: -1,
        } : phraseInAddMode;

        addedDeletedPhrases = {
            upsert: [{
                paraId: newPhrase.paraId,
                startWordId: newPhrase.startWordId,
                endWordId: newPhrase.endWordId,
                startSentenceId: newPhrase.startSentenceId,
                endSentenceId: newPhrase.endSentenceId,
                rowId: newPhrase.rowId,
                columnId: newPhrase.rowId,
                phrase: newPhrase.phrase,
                durationValue: durationValue,
                durationTypeId: selectedOption.durationTypeId
            }],
            deleted: [],
            bi: phraseBiMap[this.props.dataPointName]
        } 

        tempPhraseRequest = {
            editedPhrases: addedDeletedPhrases,
            mode: 'manual'
        }
        this.props.editPhrasesRequest(tempPhraseRequest);
        this.props.saveDeletePhrase(null, false);
        this.props.saveAddPhrase(null, false);
        this.props.savePhraseEditOption(false);
        this.props.saveHighlightedPhrases(null);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
        this.props.saveHighlightedTableCells(null);
        this.setState({
            isAddingPhrase: false,
            isEditingState: false,
            currentEditingPhrase: null,
            hideOptions: false,
            selectedOption: {
                durationName: '',
                durationType: '',
                durationTypeId: -1
            },
            durationValue: -1
        });
    }
}
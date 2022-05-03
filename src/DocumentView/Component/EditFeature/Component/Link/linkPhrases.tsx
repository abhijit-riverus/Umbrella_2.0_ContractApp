import React, { Component } from 'react';
import { editedPhrases, LinkPhraseRequest, phraseInfo, tableInfo } from '../../../../State/documentState';
import { deletePhraseFromPhraseArray, filterPhrasesFromPhrasesArray, filterTableCellsFromPhraseArray, getPhrasesFromChild, isTableCell, phraseBiMap, phraseLevelMapping } from '../../../Utils/docUtils';

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
}

interface State {
    isAddingPhrase: boolean;
    isEditingState: boolean;
    currentEditingPhrase: phraseInfo | null;
}

export default class LinkPhrases extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAddingPhrase: false,
            isEditingState: false,
            currentEditingPhrase: null
        }
    }

    componentDidMount() {
        //let oldPhrases = getPhrasesFromChild(this.props.savedInsight);
        //this.props.saveHighlightedPhrases(oldPhrases);
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
                        <div className="col-md-12 bi-label-clickable edit-date-title">
                            {phraseLevelMapping[this.props.dataPointName]}
                        </div>
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
        let { savedHighlightedPhrases, phraseInAddMode } = this.props;
        if (savedHighlightedPhrases !== null && savedHighlightedPhrases.length > 0) {
            return (
                <>
                    {savedHighlightedPhrases.map((phraseIter, i) =>
                        <div className="row" key={i}>
                            <div className="col-md-11 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                <textarea rows={2} cols={50} name="text" maxLength={50} className="tag-input" value={phraseIter.phrase}
                                    style={{ minHeight: '131px', lineHeight: '15px', width: '100%' }} readOnly onChange={() => { }}></textarea>
                            </div>
                            <div className="col-md-1 align-right">
                                <img className='cursor-pointer' src="/static_images/less-parties.svg" alt="remove-icon" onClick={() => this.addOrRemovePhrase('remove', phraseIter)} />
                            </div>
                            {this.linkPhraseOnDoc(phraseIter)}
                        </div>
                    )}
                    <div className="row">
                        <div className="col-md-11 my-1 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                            <textarea rows={2} cols={50} name="text" maxLength={50} className="tag-input" readOnly
                                value={phraseInAddMode !== null ? phraseInAddMode.phrase : ''} style={{ minHeight: '131px', lineHeight: '15px', width: '100%' }}
                                onChange={() => { }}></textarea>
                        </div>
                        <div className="col-md-1 align-right">
                            {phraseInAddMode !== null ?
                                <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemovePhrase('add', phraseInAddMode)} />
                                : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                            }
                        </div>
                        {this.linkPhraseOnDoc(phraseInAddMode)}
                    </div>
                </>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-11 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                        <textarea rows={3} cols={70} name="text" maxLength={50} className="tag-input"
                            value={phraseInAddMode !== null ? phraseInAddMode.phrase : ''} style={{ minHeight: '131px', lineHeight: '15px', width: '100%' }}></textarea>
                    </div>
                    <div className="col-md-1 align-right">
                        {phraseInAddMode !== null ?
                            <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemovePhrase('add', phraseInAddMode)} />
                            : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                        }
                    </div>
                    {this.linkPhraseOnDoc(phraseInAddMode)}
                </div>
            );
        }
    }

    saveOrCancelPhraseEdit() {
        return (
            <div className="row my-2">
                {/* <div className="col-md-5" /> */}
                <div className="col-md-12 align-right">
                    <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                    <span className="upload-yellow-btn ml-4" id="save-btn"
                        onClick={() => this.onSave()}>
                        Save
                    </span>
                </div>
            </div>
        );
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

    addOrRemovePhrase(action: string, phraseInfo: phraseInfo | null) {
        if (action === 'add') {
            this.props.saveAddPhrase(null, false);
            this.props.saveDeletePhrase(null, false);
            this.props.saveHighlightedTableCells(null);
            let tempPhrases = this.props.savedHighlightedPhrases;
            if (tempPhrases !== null && phraseInfo !== null) {
                tempPhrases.push(phraseInfo);
                this.props.saveHighlightedPhrases(tempPhrases);
            } else {
                if (phraseInfo === null) {
                    this.props.saveHighlightedPhrases(phraseInfo);
                } else {
                    this.props.saveHighlightedPhrases([phraseInfo]);
                }
            }
            this.setState({ isEditingState: false, isAddingPhrase: false, currentEditingPhrase: null });
        } else if (action === 'remove') {
            if (phraseInfo !== null) {
                let tempPhrases = deletePhraseFromPhraseArray(phraseInfo, this.props.savedHighlightedPhrases);
                this.props.saveHighlightedPhrases(tempPhrases.length === 0 ? null : tempPhrases);
            } else {
                this.props.saveHighlightedPhrases(null);
            }
            this.props.saveDeletePhrase(null, false);
            this.props.saveHighlightedTableCells(null);
        }
        this.props.savePhraseEditOption(false);
    }


    onCancel() {
        this.props.saveDeletePhrase(null, false);
        this.props.saveAddPhrase(null, false);
        this.props.saveHighlightedPhrases(null);
        this.props.savePhraseEditOption(false);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedTableCells(null);
    }

    onSave() {
        let tempPhraseRequest: LinkPhraseRequest = { mode: "", editedPhrases: { upsert: [], deleted: [], bi: '' } };

        let changedPhrasesArray = this.props.savedHighlightedPhrases !== null ? this.props.savedHighlightedPhrases : [];
        if (this.props.phraseInAddMode !== null) {
            changedPhrasesArray.push(this.props.phraseInAddMode);
        }
        let addedDeletedPhrases: editedPhrases = { upsert: [], deleted: [], bi: '' };

        let changedPhrases = filterPhrasesFromPhrasesArray(changedPhrasesArray);
        let changedTableCells = filterTableCellsFromPhraseArray(changedPhrasesArray);

        let editedPhrases = this.getAddedAndDeletedPhrases([], changedPhrases)
        let editedTableCells = this.getEditedTableCellPhrases([], changedTableCells);
        addedDeletedPhrases = this.mergePhrases(editedPhrases, editedTableCells);

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
    }

    getAddedAndDeletedPhrases(previousLinkedPhrases: phraseInfo[], changedLinkedPhrases: phraseInfo[]): editedPhrases {
        let addedPhrases: phraseInfo[] = [];
        let deletedPhrases: phraseInfo[] = [];
        if (previousLinkedPhrases.length !== 0) {
            if (changedLinkedPhrases !== null && changedLinkedPhrases.length !== 0) {
                //get newly added phrases
                for (let i = 0; i < changedLinkedPhrases.length; i++) {
                    let exists = false;
                    for (let j = 0; j < previousLinkedPhrases.length; j++) {
                        if (changedLinkedPhrases[i].paraId === previousLinkedPhrases[j].paraId) {
                            if (changedLinkedPhrases[i].startWordId === previousLinkedPhrases[j].startWordId && changedLinkedPhrases[i].endWordId === previousLinkedPhrases[j].endWordId) {
                                exists = true;
                                break;
                            }
                        }
                    }
                    if (exists === false) {
                        addedPhrases.push(changedLinkedPhrases[i]);
                    }
                }

                //get Deleted phrases
                for (let i = 0; i < previousLinkedPhrases.length; i++) {
                    let exists = false;
                    for (let j = 0; j < changedLinkedPhrases.length; j++) {
                        if (previousLinkedPhrases[i].paraId === changedLinkedPhrases[j].paraId) {
                            if (previousLinkedPhrases[i].startWordId === changedLinkedPhrases[j].startWordId && previousLinkedPhrases[i].endWordId === changedLinkedPhrases[j].endWordId) {
                                exists = true;
                                break;
                            }
                        }
                    }
                    if (exists === false) {
                        deletedPhrases.push(previousLinkedPhrases[i]);
                    }
                }
                //all deleted
            } else if (changedLinkedPhrases.length === 0) {
                for (let i = 0; i < previousLinkedPhrases.length; i++) {
                    deletedPhrases.push(previousLinkedPhrases[i]);
                }
            }
        } else {
            //newly added
            if (changedLinkedPhrases !== null && changedLinkedPhrases.length !== 0) {
                for (let i = 0; i < changedLinkedPhrases.length; i++) {
                    addedPhrases.push(changedLinkedPhrases[i]);
                }
            }
        }
        let biType = phraseBiMap[this.props.dataPointName];

        let tempEditedPhrases: editedPhrases = {
            upsert: addedPhrases,
            deleted: deletedPhrases,
            bi: biType
        }
        return tempEditedPhrases;
    }

    getEditedTableCellPhrases(previousLinkedTableCells: phraseInfo[], changedLinkedTableCells: phraseInfo[]) {
        let addedTableCells: phraseInfo[] = [];
        let deletedTableCells: phraseInfo[] = [];
        if (previousLinkedTableCells.length > 0) {
            if (changedLinkedTableCells.length > 0) {
                //newly added
                for (let i = 0; i < changedLinkedTableCells.length; i++) {
                    let addedCellExists = false;
                    for (let j = 0; j < previousLinkedTableCells.length; j++) {
                        if (changedLinkedTableCells[i].paraId === previousLinkedTableCells[j].paraId && changedLinkedTableCells[i].rowId === previousLinkedTableCells[j].rowId && changedLinkedTableCells[i].columnId === previousLinkedTableCells[j].columnId) {
                            addedCellExists = true;
                            break;
                        }
                    }
                    if (addedCellExists === false) {
                        addedTableCells.push(changedLinkedTableCells[i]);
                    }
                }

                //deleted elements
                for (let i = 0; i < previousLinkedTableCells.length; i++) {
                    let deletedCellExists = false;
                    for (let j = 0; j < changedLinkedTableCells.length; j++) {
                        if (previousLinkedTableCells[i].paraId === changedLinkedTableCells[j].paraId && previousLinkedTableCells[i].rowId === changedLinkedTableCells[j].rowId && previousLinkedTableCells[i].columnId === changedLinkedTableCells[j].columnId) {
                            deletedCellExists = true;
                            break;
                        }
                    }
                    if (deletedCellExists === false) {
                        deletedTableCells.push(previousLinkedTableCells[i]);
                    }
                }
            } else {
                //previous deleted
                for (let i = 0; i < previousLinkedTableCells.length; i++) {
                    deletedTableCells.push(previousLinkedTableCells[i]);
                }
            }
        } else {
            //all newly added
            if (changedLinkedTableCells.length > 0) {
                for (let i = 0; i < changedLinkedTableCells.length; i++) {
                    addedTableCells.push(changedLinkedTableCells[i]);
                }
            }
        }

        let editedTableCells: editedPhrases = {
            upsert: addedTableCells,
            deleted: deletedTableCells,
            bi: ''
        }
        return editedTableCells;
    }

    mergePhrases(firstEditedPhraseArray: editedPhrases, secondEditedPhraseArray: editedPhrases) {
        let upsertPhrases: phraseInfo[] = firstEditedPhraseArray.upsert.concat(secondEditedPhraseArray.upsert);
        let deletedPhrases: phraseInfo[] = firstEditedPhraseArray.deleted.concat(secondEditedPhraseArray.deleted);
        let biType = phraseBiMap[this.props.dataPointName];
        let mergedPhrases: editedPhrases = {
            upsert: upsertPhrases,
            deleted: deletedPhrases,
            bi: biType
        }
        return mergedPhrases;
    }
}
import { duration } from '@material-ui/core';
import { table } from 'console';
import React, { Component } from 'react';
import { editedSentences, LinkSentenceRequest, sentenceInfo, tableInfo } from '../../../../State/documentState';
import { dataForMap } from '../../../Utils/docUtils';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editPresentSentences: (presentValue: LinkSentenceRequest) => void;
    dataPointName: string;
    savedHighlightedSentences: sentenceInfo[] | null;
    saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) => void;
    savedPresentData: any;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
}

interface State {
    highlight: boolean;
}

export const regulatoryMap: any = {
    'Yes': 'Non-Regulatory',
    'No': 'Regulatory'
}

export default class ConsentAddEdit extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            highlight: false
        }
    }

    render() {
        let {  dataPointName} = this.props;
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-12 m-0 bi-label-clickable" style={{ fontWeight: 600 }}>
                            Add {dataPointName}
                        </div>
                        <div className="col-md-12 my-1 edit-title-header">
                            Add/Edit the {dataPointName} clause of your contract here
                        </div>
                    </div>
                    {dataPointName === 'Consent Clause' && 
                        <>
                            {this.showLinkClause()}
                            {this.saveOrCancelSingleSentence()}
                        </>                    
                    }
                    {dataPointName === 'Consent Authority' && 
                        <>
                            {this.showLinkClause()}
                            {this.saveOrCancelSingleSentence()}
                        </>                    
                    }
                </div>
            </div>
        );
    }

    showLinkClause(){
        let { highlight } = this.state;
        let {savedHighlightedTableCells, savedHighlightedSentences} = this.props;
        let sentenceLength: number = savedHighlightedSentences !== null && savedHighlightedSentences.length > 0 ? savedHighlightedSentences.length : 0; 
        let tableLength: number = savedHighlightedTableCells !== null && savedHighlightedTableCells.length > 0 ? savedHighlightedTableCells.length : 0; 
        let sentencesLength = sentenceLength + tableLength; 

        if (((savedHighlightedSentences !== null && savedHighlightedSentences !== undefined && savedHighlightedSentences.length > 0) || (savedHighlightedTableCells !== null && savedHighlightedTableCells !== undefined && savedHighlightedTableCells.length > 0)) && highlight === true) {
           
            return (
                <div className="row">
                    <div className="col-md-4 my-2">
                        Clause
                    </div>
                    <div className="col-md-6 my-2">
                        <span className="link-to" style={{ color: '#C1C1C1' }}>
                            Edit linked sentence(s)
                        </span>
                    </div>
                    <div className="col-md-2 pr-0 display-flex">
                        <span className="linked-para-count">
                            {sentencesLength}
                        </span>
                    </div>
                </div>
            )
        } else {
            if(highlight === true){
                return (
                    <>
                        <div className="row">
                            <div className="col-md-4 my-2">
                                Clause
                            </div>
                            <div className="col-md-6 my-2">
                                <span className="link-to cursor-pointer" style={{ color:'#C1C1C1' }} >
                                    Link to sentences(s)
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 link-to-info">
                                Please highlight the sentences on the document, you wish to link to this data point and click on save.
                            </div>
                        </div>
                    </>
                )
            } else {
                return (
                    <div className="row">
                        <div className="col-md-4 my-2">
                            Clause
                        </div>
                        <div className="col-md-6 my-2">
                            <span className="link-to cursor-pointer" style={{ color: '#88305F' }}
                                onClick={() => this.linkSingleSentence()}>
                                Link to sentences(s)
                            </span>
                        </div>
                    </div>
                );
            }
            
        }
    }

    saveOrCancelSingleSentence(){
        let {savedHighlightedSentences, savedHighlightedTableCells} = this.props;
        return(
            <div className="row my-2">
                <div className="col-md-5" />
                <div className="col-md-7">
                    <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancelClause()}>Cancel</span>
                    {((savedHighlightedSentences !== null && savedHighlightedSentences.length > 0) || (savedHighlightedTableCells !== null && savedHighlightedTableCells.length > 0))  ?
                        <span className="upload-yellow-btn ml-4" id="save-btn"
                            onClick={() => this.onSaveClause()}>
                            Save
                        </span>
                    :
                        <span className="upload-disable-btn ml-4" id="save-btn" >
                            Save
                        </span>
                    }
                </div>
            </div>
        );
    }


    linkSingleSentence(){
        let { saveHighlightedDataPoint, dataPointName } = this.props;
        this.setState({highlight: true});

        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedSentences(null);

        this.props.editOptionSelected(true);
        saveHighlightedDataPoint(dataPointName);
    }

    onSaveClause(){
        let addSentenceRequest = this.addOrRemovePresent('add');
        this.props.editPresentSentences(addSentenceRequest);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedSentences(null);
        this.setState({highlight: false });
    }

    onCancelClause(){
        this.props.editOptionSelected(false);
        this.props.saveHighlightedSentences(null);
        this.props.saveHighlightedTableCells(null);
        this.setState({highlight: false});
    }

    addOrRemovePresent(action: string): LinkSentenceRequest {
        let { savedHighlightedSentences, savedHighlightedTableCells, savedPresentData } = this.props;
        let tempPresentList: LinkSentenceRequest = { data: '', mode: '' };

        //edited sentences
        let previousLinkedSentences: sentenceInfo[] = [];
        let editedSentencesObject = this.getAddedAndDeletedSentences(savedHighlightedSentences, previousLinkedSentences);

        //edited table cells
        let previousLinkedTableCells: tableInfo[] = [];
        let editedTableCellsObject = this.getAddedAndDeletedTableCells(savedHighlightedTableCells, previousLinkedTableCells);

        //merge both
        let mergeEditedSentences = this.mergeEditedSentences(editedTableCellsObject, editedSentencesObject);

        if (action === 'add') {
            if (savedHighlightedSentences !== null || savedHighlightedTableCells !== null) {
                tempPresentList = {
                    mode: 'manual',
                    editedSentences: mergeEditedSentences
                }
            } else {
                tempPresentList = {
                    mode: 'retain'
                };
            }
        }
        return tempPresentList;
    }

    getAddedAndDeletedSentences(changedLinkedSentences: sentenceInfo[] | null, previousLinkedSentences: sentenceInfo[]) {

        let addedSentences: sentenceInfo[] = [];
        let deletedSentences: sentenceInfo[] = [];

        if (previousLinkedSentences.length !== 0) {
            if (changedLinkedSentences !== null) {
                if (changedLinkedSentences.length !== 0) {
                    //get newly added elements
                    for (let i = 0; i < changedLinkedSentences.length; i++) {
                        let addedExists = false;
                        for (let j = 0; j < previousLinkedSentences.length; j++) {
                            if (changedLinkedSentences[i].paraId === previousLinkedSentences[j].paraId) {
                                if (changedLinkedSentences[i].sentenceId === previousLinkedSentences[j].sentenceId) {
                                    addedExists = true;
                                    break;
                                }
                            }
                        }
                        if (addedExists === false) {
                            addedSentences.push({
                                paraId: changedLinkedSentences[i].paraId,
                                sentenceId: changedLinkedSentences[i].sentenceId,
                                rowId: -1,
                                columnId: -1,
                                phrase: '',
                                typestring: '',
                                startWordId: -1,
                                endWordId: -1
                            });
                        }
                    }

                    //get deleted elements
                    for (let i = 0; i < previousLinkedSentences.length; i++) {
                        let deletedExists = false;
                        for (let j = 0; j < changedLinkedSentences.length; j++) {
                            if (previousLinkedSentences[i].paraId === changedLinkedSentences[j].paraId) {
                                if (previousLinkedSentences[i].sentenceId === changedLinkedSentences[j].sentenceId) {
                                    deletedExists = true;
                                    break;
                                }
                            }
                        }
                        if (deletedExists === false) {
                            deletedSentences.push({
                                paraId: previousLinkedSentences[i].paraId,
                                sentenceId: previousLinkedSentences[i].sentenceId,
                                rowId: previousLinkedSentences[i].rowId,
                                columnId: previousLinkedSentences[i].columnId
                            });
                        }
                    }
                } else if (changedLinkedSentences.length === 0) {
                    for (let i = 0; i < previousLinkedSentences.length; i++) {
                        deletedSentences.push({
                            paraId: previousLinkedSentences[i].paraId,
                            sentenceId: previousLinkedSentences[i].sentenceId,
                            rowId: previousLinkedSentences[i].rowId,
                            columnId: previousLinkedSentences[i].columnId
                        });
                    }
                }
            }
        } else {
            if (changedLinkedSentences !== null) {
                if (changedLinkedSentences.length !== 0) {
                    //adding for first time, newly added elements
                    for (let i = 0; i < changedLinkedSentences.length; i++) {
                        addedSentences.push({
                            paraId: changedLinkedSentences[i].paraId,
                            sentenceId: changedLinkedSentences[i].sentenceId,
                            rowId: changedLinkedSentences[i].rowId,
                            columnId: changedLinkedSentences[i].columnId,
                            phrase: '',
                            typestring: '',
                            startWordId: -1,
                            endWordId: -1
                        });
                    }
                }
            }
        }

        let addedDeletedSentences: editedSentences = {
            upsert: addedSentences,
            deleted: deletedSentences
        };

        return addedDeletedSentences;
    }

    getAddedAndDeletedTableCells(changedLinkedTableCells: tableInfo[] | null, previousLinkedTableCells: tableInfo[]) {
        let addedTableCells: tableInfo[] = [];
        let deletedTableCells: tableInfo[] = [];
        if (previousLinkedTableCells.length !== 0 && previousLinkedTableCells !== null) {
            if (changedLinkedTableCells !== null && changedLinkedTableCells.length !== 0) {
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
                        addedTableCells.push({
                            paraId: changedLinkedTableCells[i].paraId,
                            rowId: changedLinkedTableCells[i].rowId,
                            columnId: changedLinkedTableCells[i].columnId,
                            phrase: '',
                            typestring: '',
                            startWordId: -1,
                            endWordId: -1
                        });
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
                        deletedTableCells.push({
                            paraId: previousLinkedTableCells[i].paraId,
                            rowId: previousLinkedTableCells[i].rowId,
                            columnId: previousLinkedTableCells[i].columnId
                        });
                    }
                }
            } else {
                //all deleted
                for (let i = 0; i < previousLinkedTableCells.length; i++) {
                    deletedTableCells.push({
                        paraId: previousLinkedTableCells[i].paraId,
                        rowId: previousLinkedTableCells[i].rowId,
                        columnId: previousLinkedTableCells[i].columnId
                    });
                }
            }
        } else if (changedLinkedTableCells !== null && changedLinkedTableCells.length !== 0) {
            //newly added
            for (let i = 0; i < changedLinkedTableCells.length; i++) {
                addedTableCells.push({
                    paraId: changedLinkedTableCells[i].paraId,
                    rowId: changedLinkedTableCells[i].rowId,
                    columnId: changedLinkedTableCells[i].columnId,
                    phrase: '',
                    typestring: '',
                    startWordId: -1,
                    endWordId: -1
                });
            }
        }

        //Convert table cells json to sentence level json
        let upsertSentences: sentenceInfo[] = [];
        let deletedSentences: sentenceInfo[] = [];

        for (let i = 0; i < addedTableCells.length; i++) {
            upsertSentences.push({
                paraId: addedTableCells[i].paraId,
                sentenceId: -1,
                rowId: addedTableCells[i].rowId,
                columnId: addedTableCells[i].columnId,
                phrase: addedTableCells[i].phrase,
                typestring: addedTableCells[i].typestring,
                startWordId: -1,
                endWordId: -1
            });
        }

        for (let i = 0; i < deletedTableCells.length; i++) {
            deletedSentences.push({
                paraId: deletedTableCells[i].paraId,
                sentenceId: -1,
                rowId: deletedTableCells[i].rowId,
                columnId: deletedTableCells[i].columnId
            });
        }

        let editedTableCellsAsSentence: editedSentences = {
            upsert: upsertSentences,
            deleted: deletedSentences
        }
        return editedTableCellsAsSentence;
    }

    mergeEditedSentences(firstEditedSentences: editedSentences, secondEditedSentences: editedSentences) {
        let {dataPointName} = this.props;
        let mergedAddedSentences: sentenceInfo[] = firstEditedSentences.upsert.concat(secondEditedSentences.upsert);
        let mergedDeletedSentences: sentenceInfo[] = firstEditedSentences.deleted.concat(secondEditedSentences.deleted);

        let mergedEditedSentences: editedSentences = {
            upsert: mergedAddedSentences,
            deleted: mergedDeletedSentences,
            dataFor: dataForMap[dataPointName]
        }
        return mergedEditedSentences;
    }
    
}
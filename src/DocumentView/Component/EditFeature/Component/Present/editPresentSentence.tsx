import React, { Component } from 'react';
import { editedSentences, LinkSentenceRequest, sentenceInfo, tableInfo } from '../../../../State/documentState';
import { getSentencesFromChild, getTableCellsFromChild } from '../../../Utils/docUtils';
import SaveOrCancelSentence from '../saveOrCancelSentence';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editPresentSentences: (presentValue: LinkSentenceRequest) => void;
    savedPresent: string;
    dataPointName: string;
    savedPresentData: any;
    savedHighlightedSentences: sentenceInfo[] | null;
    saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) => void;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
}

interface State {
    present: string;
}

export default class EditPresentSentence extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            present: props.savedPresent,
        };
    }

    render() {
        let {
            editOptionSelected,
            dataPointName,
            savedHighlightedSentences,
            saveHighlightedSentences,
            savedPresentData,
            savedHighlightedTableCells,
            saveHighlightedTableCells,
        } = this.props;
        let { present } = this.state;
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
                    <div className="row">
                        <div className="col-md-5 bi-label-clickable edit-date-title" style={{ fontWeight: 600 }}>
                            Present
                        </div>
                        <div
                            className="col-md-3"
                            style={{ margin: 'auto' }}
                            onClick={() => this.setState({ present: 'Yes' })}
                        >
                            <img
                                className="cursor-pointer"
                                src={
                                    present === 'Yes'
                                        ? '/static_images/radio-active.svg'
                                        : '/static_images/radio-inactive.svg'
                                }
                                alt="radio-btn"
                            />
                            &nbsp;&nbsp;
                            <span>Yes</span>
                        </div>
                        <div
                            className="col-md-3"
                            style={{ margin: 'auto' }}
                            onClick={() => this.setState({ present: 'No' })}
                        >
                            <img
                                className="cursor-pointer"
                                src={
                                    present === 'No'
                                        ? '/static_images/radio-active.svg'
                                        : '/static_images/radio-inactive.svg'
                                }
                                alt="radio-btn"
                            />
                            &nbsp;&nbsp;
                            <span>No</span>
                        </div>
                    </div>
                    <SaveOrCancelSentence
                        enableHighlightOption={present === 'Yes'}
                        dataPointName={dataPointName}
                        editOptionSelected={editOptionSelected}
                        editDataPoint={() => this.editPresent()}
                        savedHighlightedSentences={savedHighlightedSentences}
                        saveHighlightedDataPoint={(highlight?: boolean) => this.saveHighlightedDataPoint(highlight)}
                        enableSaveBtn={true}
                        saveHighlightedSentences={(savedHighlightedSentences: sentenceInfo[] | null) =>
                            saveHighlightedSentences(savedHighlightedSentences)
                        }
                        previouslyLinkedSentences={
                            getSentencesFromChild(savedPresentData) !== []
                                ? getSentencesFromChild(savedPresentData)
                                : undefined
                        }
                        savedHighlightedTableCells={savedHighlightedTableCells}
                        saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                            saveHighlightedTableCells(savedHighlightedTableCells)
                        }
                        previouslyLinkedTableCells={
                            getTableCellsFromChild(savedPresentData) !== []
                                ? getTableCellsFromChild(savedPresentData)
                                : undefined
                        }
                    />
                </div>
            </div>
        );
    }

    saveHighlightedDataPoint(highlight?: boolean) {
        let { saveHighlightedDataPoint, dataPointName } = this.props;
        saveHighlightedDataPoint(dataPointName);
    }

    editPresent() {
        // this.addOrRemovePresent(present === 'Yes' ? 'add' : 'remove');
        let addSentenceRequest = this.addOrRemovePresent('add');
        this.props.editPresentSentences(addSentenceRequest);
        this.props.saveHighlightedSentences(null);
        this.props.saveHighlightedTableCells(null);
        this.props.editOptionSelected(false);
    }

    addOrRemovePresent(action: string): LinkSentenceRequest {
        let { present } = this.state;
        let { savedHighlightedSentences, savedHighlightedTableCells, savedPresentData } = this.props;
        let tempPresentList: LinkSentenceRequest = { data: '', mode: '' };

        //edited sentences
        let previousLinkedSentences = getSentencesFromChild(savedPresentData);
        let editedSentencesObject = this.getAddedAndDeletedSentences(
            savedHighlightedSentences,
            previousLinkedSentences,
        );

        //edited table cells
        let previousLinkedTableCells = getTableCellsFromChild(savedPresentData);
        let editedTableCellsObject = this.getAddedAndDeletedTableCells(
            savedHighlightedTableCells,
            previousLinkedTableCells,
        );

        //merge both
        let mergeEditedSentences = this.mergeEditedSentences(editedTableCellsObject, editedSentencesObject);

        if (action === 'add') {
            if (savedHighlightedSentences !== null || savedHighlightedTableCells !== null) {
                tempPresentList = {
                    data: present,
                    mode: 'manual',
                    editedSentences: mergeEditedSentences,
                };
            } else {
                tempPresentList = {
                    data: present,
                    mode: 'retain',
                };
            }
        }
        return tempPresentList;
    }

    getAddedAndDeletedSentences(
        changedLinkedSentences: sentenceInfo[] | null,
        previousLinkedSentences: sentenceInfo[],
    ) {
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
                                columnId: previousLinkedSentences[i].columnId,
                            });
                        }
                    }
                } else if (changedLinkedSentences.length === 0) {
                    for (let i = 0; i < previousLinkedSentences.length; i++) {
                        deletedSentences.push({
                            paraId: previousLinkedSentences[i].paraId,
                            sentenceId: previousLinkedSentences[i].sentenceId,
                            rowId: previousLinkedSentences[i].rowId,
                            columnId: previousLinkedSentences[i].columnId,
                        });
                    }
                }
            }
        } else {
            if (changedLinkedSentences !== null) {
                if (changedLinkedSentences.length !== 0) {
                    //adding for first time, newly added elements
                    for (let i = 0; i < changedLinkedSentences.length; i++) {
                        addedSentences.push(changedLinkedSentences[i]);
                    }
                }
            }
        }

        let addedDeletedSentences: editedSentences = {
            upsert: addedSentences,
            deleted: deletedSentences,
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
                        if (
                            changedLinkedTableCells[i].paraId === previousLinkedTableCells[j].paraId &&
                            changedLinkedTableCells[i].rowId === previousLinkedTableCells[j].rowId &&
                            changedLinkedTableCells[i].columnId === previousLinkedTableCells[j].columnId
                        ) {
                            addedCellExists = true;
                            break;
                        }
                    }
                    if (addedCellExists === false) {
                        addedTableCells.push({
                            paraId: changedLinkedTableCells[i].paraId,
                            rowId: changedLinkedTableCells[i].rowId,
                            columnId: changedLinkedTableCells[i].columnId,
                        });
                    }
                }

                //deleted elements
                for (let i = 0; i < previousLinkedTableCells.length; i++) {
                    let deletedCellExists = false;
                    for (let j = 0; j < changedLinkedTableCells.length; j++) {
                        if (
                            previousLinkedTableCells[i].paraId === changedLinkedTableCells[j].paraId &&
                            previousLinkedTableCells[i].rowId === changedLinkedTableCells[j].rowId &&
                            previousLinkedTableCells[i].columnId === changedLinkedTableCells[j].columnId
                        ) {
                            deletedCellExists = true;
                            break;
                        }
                    }
                    if (deletedCellExists === false) {
                        deletedTableCells.push({
                            paraId: previousLinkedTableCells[i].paraId,
                            rowId: previousLinkedTableCells[i].rowId,
                            columnId: previousLinkedTableCells[i].columnId,
                        });
                    }
                }
            } else {
                //all deleted
                for (let i = 0; i < previousLinkedTableCells.length; i++) {
                    deletedTableCells.push({
                        paraId: previousLinkedTableCells[i].paraId,
                        rowId: previousLinkedTableCells[i].rowId,
                        columnId: previousLinkedTableCells[i].columnId,
                    });
                }
            }
        } else if (changedLinkedTableCells !== null && changedLinkedTableCells.length !== 0) {
            //newly added
            for (let i = 0; i < changedLinkedTableCells.length; i++) {
                addedTableCells.push(changedLinkedTableCells[i]);
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
            });
        }

        for (let i = 0; i < deletedTableCells.length; i++) {
            deletedSentences.push({
                paraId: deletedTableCells[i].paraId,
                sentenceId: -1,
                rowId: deletedTableCells[i].rowId,
                columnId: deletedTableCells[i].columnId,
            });
        }

        let editedTableCellsAsSentence: editedSentences = {
            upsert: upsertSentences,
            deleted: deletedSentences,
        };
        return editedTableCellsAsSentence;
    }

    mergeEditedSentences(firstEditedSentences: editedSentences, secondEditedSentences: editedSentences) {
        let mergedAddedSentences: sentenceInfo[] = firstEditedSentences.upsert.concat(secondEditedSentences.upsert);
        let mergedDeletedSentences: sentenceInfo[] = firstEditedSentences.deleted.concat(secondEditedSentences.deleted);

        let mergedEditedSentences: editedSentences = {
            upsert: mergedAddedSentences,
            deleted: mergedDeletedSentences,
        };
        return mergedEditedSentences;
    }
}

import React, { Component } from 'react';
import {
    editedParas,
    LinkParagraphRequest,
    LinkParaRequest,
    paraInfo,
    tableInfo,
} from '../../../../State/documentState';
import { getParasFromChild, getTableCellsFromChild, paraBiMap } from '../../../Utils/docUtils';
import SaveOrCancel from '../saveOrCancel';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editPresent: (newParasRequest: LinkParaRequest) => void;
    savedPresent: string;
    dataPointName: string;
    highlightedId: number[] | null;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    savedPresentData: any;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
}

interface State {
    present: string;
}

export default class EditPresent extends Component<Props, State> {
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
            highlightedId,
            saveHighlightedId,
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
                    <SaveOrCancel
                        enableHighlightOption={present === 'Yes'}
                        dataPointName={dataPointName}
                        editOptionSelected={editOptionSelected}
                        editDataPoint={() => this.editPresent()}
                        highlightedId={highlightedId}
                        saveHighlightedDataPoint={(highlight?: boolean) => this.saveHighlightedDataPoint(highlight)}
                        enableSaveBtn={true}
                        saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                        previouslyLinkedPara={
                            getParasFromChild(this.props.savedPresentData) !== []
                                ? getParasFromChild(this.props.savedPresentData)
                                : undefined
                        }
                        previouslyLinkedTableCells={
                            getTableCellsFromChild(this.props.savedPresentData) !== []
                                ? getTableCellsFromChild(this.props.savedPresentData)
                                : undefined
                        }
                        savedHighlightedTableCells={savedHighlightedTableCells}
                        saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                            saveHighlightedTableCells(savedHighlightedTableCells)
                        }
                        handleSubmitSelectedUserGroups={() => {}}
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
        let newParasRequest = this.addOrRemovePresent('add');
        this.props.editPresent(newParasRequest);
        this.props.saveHighlightedId(null);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedTableCells(null);
    }

    addOrRemovePresent(action: string) {
        let { present } = this.state;
        let { highlightedId, savedHighlightedTableCells, dataPointName } = this.props;
        let tempPresentList: LinkParaRequest = { data: '', mode: '', editedParas: { upsert: [], deleted: [], bi: '' } };
        let previousParas = getParasFromChild(this.props.savedPresentData);
        let changedParas: number[] = [];
        if (this.props.highlightedId !== null) {
            changedParas = this.props.highlightedId;
        } else {
            changedParas = [];
        }

        let previousTableCells = getTableCellsFromChild(this.props.savedPresentData);
        let changedLinkedTableCells = savedHighlightedTableCells;

        //edited Paras
        let editedParas: editedParas = this.getAddedAndDeletedParas(previousParas, changedParas);
        //edited Table cells
        let editedTablesCells: editedParas = this.getAddedAndDeletedTableCells(
            previousTableCells,
            changedLinkedTableCells,
        );
        //merge both
        let mergeEditedParas: editedParas = this.mergeEditedParas(editedParas, editedTablesCells);

        if (action === 'add') {
            if (highlightedId !== null || savedHighlightedTableCells !== null) {
                tempPresentList = {
                    data: present,
                    mode: 'manual',
                    editedParas: mergeEditedParas,
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

    getAddedAndDeletedParas(previousParas: number[], changedParas: number[]) {
        let addedParas: paraInfo[] = [];
        let deletedParas: paraInfo[] = [];
        if (previousParas.length !== 0) {
            if (changedParas.length !== 0) {
                //get newly added elements
                for (let i = 0; i < changedParas.length; i++) {
                    let exists = false;
                    for (let j = 0; j < previousParas.length; j++) {
                        if (changedParas[i] === previousParas[j]) {
                            exists = true;
                            break;
                        }
                    }
                    if (exists === false) {
                        addedParas.push({
                            paraId: changedParas[i],
                            rowId: -1,
                            columnId: -1,
                        });
                    }
                }

                //get deleted elements
                for (let i = 0; i < previousParas.length; i++) {
                    let exists = false;
                    for (let j = 0; j < changedParas.length; j++) {
                        if (previousParas[i] === changedParas[j]) {
                            exists = true;
                            break;
                        }
                    }
                    if (exists === false) {
                        deletedParas.push({
                            paraId: previousParas[i],
                            rowId: -1,
                            columnId: -1,
                        });
                    }
                }
            } else if (changedParas.length === 0) {
                //all previous paras deleted
                for (let i = 0; i < previousParas.length; i++) {
                    deletedParas.push({
                        paraId: previousParas[i],
                        rowId: -1,
                        columnId: -1,
                    });
                }
            }
        } else {
            //adding for first time
            if (changedParas.length !== null) {
                if (changedParas.length !== 0) {
                    for (let i = 0; i < changedParas.length; i++) {
                        addedParas.push({
                            paraId: changedParas[i],
                            rowId: -1,
                            columnId: -1,
                        });
                    }
                }
            }
        }

        let addedDeletedParas: editedParas = {
            upsert: addedParas,
            deleted: deletedParas,
            bi: '',
        };

        return addedDeletedParas;
    }

    getAddedAndDeletedTableCells(previousLinkedTableCells: tableInfo[], changedLinkedTableCells: tableInfo[] | null) {
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

        //Convert table cells json to para level json
        let upsertParas: paraInfo[] = [];
        let deletedParas: paraInfo[] = [];

        for (let i = 0; i < addedTableCells.length; i++) {
            upsertParas.push({
                paraId: addedTableCells[i].paraId,
                rowId: addedTableCells[i].rowId,
                columnId: addedTableCells[i].columnId,
            });
        }

        for (let i = 0; i < deletedTableCells.length; i++) {
            deletedParas.push({
                paraId: deletedTableCells[i].paraId,
                rowId: deletedTableCells[i].rowId,
                columnId: deletedTableCells[i].columnId,
            });
        }

        let editedTableCellsAsPara: editedParas = {
            upsert: upsertParas,
            deleted: deletedParas,
            bi: '',
        };
        return editedTableCellsAsPara;
    }

    mergeEditedParas(firstEditedParas: editedParas, secondEditedParas: editedParas) {
        let { dataPointName } = this.props;
        let mergedAddedParas: paraInfo[] = firstEditedParas.upsert.concat(secondEditedParas.upsert);
        let mergedDeletedParas: paraInfo[] = firstEditedParas.deleted.concat(secondEditedParas.deleted);

        let mergeEditedParas: editedParas = {
            upsert: mergedAddedParas,
            deleted: mergedDeletedParas,
            bi: paraBiMap[dataPointName],
        };
        return mergeEditedParas;
    }
}

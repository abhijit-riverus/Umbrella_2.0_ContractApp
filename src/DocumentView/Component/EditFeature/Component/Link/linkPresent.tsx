import React, { Component } from 'react';
import { editedParas, LinkParagraphRequest, LinkParaRequest, paraInfo, tableInfo } from '../../../../State/documentState';
import { getParasFromChild, getTableCellsFromChild, paraBiMap, paraLevelComponents } from '../../../Utils/docUtils';
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
    highlight: boolean;
}

export default class LinkPresent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            highlight: false
        }
    }

    render() {
        let { editOptionSelected, dataPointName, highlightedId, saveHighlightedId, savedHighlightedTableCells, saveHighlightedTableCells } = this.props;
        let { highlight } = this.state;
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
                        <div className="col-md-12">

                        </div>
                    </div>
                    {this.saveOrCancel()}
                </div>
            </div>
        );
    }
    editPresent() {
        let newParasRequest = this.addOrRemovePresent('add');
        this.props.editPresent(newParasRequest);
        this.props.saveHighlightedId(null);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedTableCells(null);
    }

    saveOrCancel() {
        let {highlightedId, savedHighlightedTableCells} = this.props;
        return (
            <>
                {paraLevelComponents.indexOf(this.props.dataPointName) > -1 && this.props.dataPointName !== 'Start Dates' && this.props.dataPointName !== 'End Dates' && this.props.dataPointName !== 'Duration' && this.props.dataPointName !== 'Lock-in Period' && this.showLinkToParagraph()}
                <div className="row my-2 align-right">
                    <div className="col-md-12 align-right">
                        <span className="add-datapoint" style={{ textDecoration: 'none', marginLeft: '8rem' }} onClick={() => this.cancel()}>Cancel</span>
                        {((highlightedId !== null && highlightedId.length > 0 ) || (savedHighlightedTableCells !== null && savedHighlightedTableCells.length > 0)) ?
                            <span className="upload-yellow-btn ml-4" id="save-btn"
                                onClick={() => this.onSave()}>
                                Save
                            </span>
                            :
                            <span className="upload-disable-btn ml-4" id="save-btn" >
                                Save
                            </span>
                        }
                    </div>
                </div>
            </>
        );
    }

    linkToParas(){
        let { saveHighlightedDataPoint, dataPointName } = this.props;
        saveHighlightedDataPoint(dataPointName);
        this.props.editOptionSelected(true);
        this.setState({ highlight: true });
        this.props.saveHighlightedId(null);
        this.props.saveHighlightedTableCells(null);
    }

    onSave() {
        let newParasRequest = this.addOrRemovePresent('add');
        this.props.editPresent(newParasRequest);
        this.props.editOptionSelected(false); 
        this.props.saveHighlightedId(null); 
        this.props.saveHighlightedTableCells(null);
        this.setState({ highlight: false });
    }

    cancel(){
        this.setState({ highlight: false });
        this.props.editOptionSelected(false);
        this.props.saveHighlightedId(null);
        this.props.saveHighlightedTableCells(null);
    }

    showLinkToParagraph(){
        let { highlight } = this.state;
        let {savedHighlightedTableCells, highlightedId} = this.props;
        let sentenceLength: number = highlightedId !== null && highlightedId.length > 0 ? highlightedId.length : 0; 
        let tableLength: number = savedHighlightedTableCells !== null && savedHighlightedTableCells.length > 0 ? savedHighlightedTableCells.length : 0; 
        let sentencesLength = sentenceLength + tableLength; 

        if (((highlightedId !== null && highlightedId !== undefined && highlightedId.length > 0) || (savedHighlightedTableCells !== null && savedHighlightedTableCells !== undefined && savedHighlightedTableCells.length > 0)) && highlight === true) {
           
            return (
                <div className="row">
                    <div className="col-md-10">
                        <span className="link-to" style={{ color: '#C1C1C1' }}>
                            Edit linked paragraph(s)
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
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color:'#C1C1C1' }} >
                                    Link to paragraph(s)
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 link-to-info">
                                Please highlight the paragraphs on the document, you wish to link to this data point and click on save.
                            </div>
                        </div>
                    </>
                )
            } else {
                return (
                    <div className="row">
                        <div className="col-md-12">
                            <span className="link-to cursor-pointer" style={{ color: '#88305F' }}
                                onClick={() => this.linkToParas()}>
                                Link to paragraph(s)
                            </span>
                        </div>
                    </div>
                );
            }
            
        }
    }

    addOrRemovePresent(action: string) {
        let { highlightedId, savedHighlightedTableCells, dataPointName } = this.props;
        let tempPresentList: LinkParaRequest = { data: '', mode: '', editedParas: { upsert: [], deleted: [], bi: '' } };
        let previousParas: number[] = [];
        let changedParas: number[] = [];
        if (this.props.highlightedId !== null) {
            changedParas = this.props.highlightedId;
        } else {
            changedParas = [];
        }

        let previousTableCells: tableInfo[] = [];
        let changedLinkedTableCells = savedHighlightedTableCells;

        //edited Paras
        let editedParas: editedParas = this.getAddedAndDeletedParas(previousParas, changedParas);
        //edited Table cells
        let editedTablesCells: editedParas = this.getAddedAndDeletedTableCells(previousTableCells, changedLinkedTableCells);
        //merge both
        let mergeEditedParas: editedParas = this.mergeEditedParas(editedParas, editedTablesCells);

        if (action === 'add') {
            if (highlightedId !== null || savedHighlightedTableCells !== null) {
                tempPresentList = {
                    data: 'Yes',
                    mode: 'manual',
                    editedParas: mergeEditedParas
                };
            } else {
                tempPresentList = {
                    data: 'No',
                    mode: 'retain'
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
                            columnId: -1
                        })
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
                            columnId: -1
                        })
                    }
                }

            } else if (changedParas.length === 0) {
                //all previous paras deleted
                for (let i = 0; i < previousParas.length; i++) {
                    deletedParas.push({
                        paraId: previousParas[i],
                        rowId: -1,
                        columnId: -1
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
                            columnId: -1
                        })
                    }
                }
            }
        }

        let addedDeletedParas: editedParas = {
            upsert: addedParas,
            deleted: deletedParas,
            bi: ''
        }

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
                        if (changedLinkedTableCells[i].paraId === previousLinkedTableCells[j].paraId && changedLinkedTableCells[i].rowId === previousLinkedTableCells[j].rowId && changedLinkedTableCells[i].columnId === previousLinkedTableCells[j].columnId) {
                            addedCellExists = true;
                            break;
                        }
                    }
                    if (addedCellExists === false) {
                        addedTableCells.push({
                            paraId: changedLinkedTableCells[i].paraId,
                            rowId: changedLinkedTableCells[i].rowId,
                            columnId: changedLinkedTableCells[i].columnId
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
                columnId: addedTableCells[i].columnId
            });
        }

        for (let i = 0; i < deletedTableCells.length; i++) {
            deletedParas.push({
                paraId: deletedTableCells[i].paraId,
                rowId: deletedTableCells[i].rowId,
                columnId: deletedTableCells[i].columnId
            });
        }

        let editedTableCellsAsPara: editedParas = {
            upsert: upsertParas,
            deleted: deletedParas,
            bi: ''
        }
        return editedTableCellsAsPara;
    }

    mergeEditedParas(firstEditedParas: editedParas, secondEditedParas: editedParas) {
        let {dataPointName} = this.props;
        let mergedAddedParas: paraInfo[] = firstEditedParas.upsert.concat(secondEditedParas.upsert);
        let mergedDeletedParas: paraInfo[] = firstEditedParas.deleted.concat(secondEditedParas.deleted);

        let mergeEditedParas: editedParas = {
            upsert: mergedAddedParas,
            deleted: mergedDeletedParas,
            bi: paraBiMap[dataPointName]
        }
        return mergeEditedParas;
    }
}
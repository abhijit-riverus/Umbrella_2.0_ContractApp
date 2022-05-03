import { duration } from '@material-ui/core';
import { table } from 'console';
import React, { Component } from 'react';
import { durationInfo, editedDuration, editedParas, LinkDurationRequest, LinkParaRequest, paraInfo, tableInfo } from '../../../../State/documentState';
import { getParasFromChild, getSingleParaIdFromChild, getSingleTableCellFromChild, getSingleText, getTableCellsFromChild } from '../../../Utils/docUtils';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editPresent: (newParasRequest: LinkDurationRequest) => void;
    dataPointName: string;
    highlightedId: number[] | null;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    savedPresentData: any;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
}

interface State {
    highlight: boolean;
    editHighlight: boolean;
    durationText: string;
    durationParaId: number;
    durationTableCell: tableInfo | null; 
}

export default class EditSinglePara extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            highlight: false,
            editHighlight: false,
            durationText: getSingleText(this.props.savedPresentData),
            durationParaId:  getSingleParaIdFromChild(this.props.savedPresentData),
            durationTableCell: getSingleTableCellFromChild(this.props.savedPresentData)
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps: Props){
        if(this.props.highlightedId !== nextProps.highlightedId){
            if(nextProps.highlightedId === null || nextProps.highlightedId.length === 0){
                this.setState({durationParaId: -1});

                if(this.props.highlightedId !== null && this.props.highlightedId.length > 0){ //clear old highlighted background from document
                    let paraId =  'p'+ this.props.highlightedId[0];
                    let paraHeader = document.getElementById(paraId);
                    if(paraHeader !== undefined && paraHeader !== null){ paraHeader.style.background = 'none'; } 
                }

                if(nextProps.savedHighlightedTableCells === null){
                    this.setState({durationText: '', highlight: false, editHighlight: false});
                    nextProps.saveHighlightedDataPoint('');
                }
            }else if(nextProps.highlightedId !== null && nextProps.highlightedId.length > 0){
                this.setState({durationParaId: nextProps.highlightedId[0], editHighlight: true, highlight: false});
            }
        }

        if(this.props.savedHighlightedTableCells !== nextProps.savedHighlightedTableCells ){
            if(nextProps.savedHighlightedTableCells === null || nextProps.savedHighlightedTableCells.length === 0){
                this.setState({durationTableCell: null});

                if(this.props.savedHighlightedTableCells !== null && this.props.savedHighlightedTableCells.length > 0){ // clear old table cell 
                    let tableCellId = 'p' + this.props.savedHighlightedTableCells[0].paraId + ';r' + this.props.savedHighlightedTableCells[0].rowId + ';c' + this.props.savedHighlightedTableCells[0].columnId;
                    let tableCellHeader = document.getElementById(tableCellId);
                    if(tableCellHeader !== undefined && tableCellHeader !== null ){ tableCellHeader.style.background = 'none'}
                }

                if(nextProps.highlightedId === null || nextProps.highlightedId.length === 0){ //if para and table cell not selected, stop editing mode and reset durationText
                    this.setState({durationText: '', highlight: false, editHighlight: false});
                    nextProps.saveHighlightedDataPoint('');
                }
            } else if(nextProps.savedHighlightedTableCells !== null && nextProps.savedHighlightedTableCells.length > 0){
                this.setState({durationTableCell: nextProps.savedHighlightedTableCells[0], editHighlight: true, highlight: false});
            }
        }
    }

    render() {
        let { editOptionSelected, dataPointName, highlightedId, saveHighlightedId} = this.props;
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
                    {this.showDuration()}
                    {this.saveOrCancelSinglePara()}
                </div>
            </div>
        );
    }

    showDuration(){

        if(this.state.highlight === true){
            return(
                <>
                    <div className="row">
                            <div className="col-md-10 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                <textarea rows={2} cols={40} name="text" maxLength={50} className="tag-input" value={this.state.durationText} 
                                    style={{ minHeight: '60px', lineHeight: '15px' }} onChange={()=>{}}></textarea>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-10">
                            <span className="link-to cursor-pointer" style={{ color: '#C1C1C1'}}>
                                Link to paragraph(s)
                            </span>
                        </div>
                    </div>
                    {this.state.highlight && <div className="row">
                        <div className="col-md-12 link-to-info">
                            Please highlight the paragraphs on the document, you wish to link to this data point and click on save.
                        </div>
                    </div>}
                </> 
            )
        } else if(this.state.editHighlight === true){
           return (
            <>
                <div className="row">
                    <div className="col-md-10 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                        <textarea rows={2} cols={40} name="text" maxLength={50} className="tag-input" value={this.state.durationText}
                            style={{ minHeight: '60px', lineHeight: '15px' }} readOnly onChange={() => { }}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <span className="link-to" style={{ color:'#C1C1C1' }} >
                            Edit linked paragraph(s)
                        </span>
                    </div>
                    <div className="col-md-2 pr-0 display-flex">
                        <span className="linked-para-count">
                            {(this.state.durationParaId > 0 || this.state.durationTableCell !== null) ? 1 : 0}
                        </span>
                    </div>
                </div>  
            </>
           );
        }

        if( ((this.state.durationParaId !== -1) || (this.state.durationTableCell !== null)) && this.state.durationText !== ''){
            //Previous para, can be edited/deleted
            return (
                <>
                    <div className="row">
                        <div className="col-md-10 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                            <textarea rows={2} cols={40} name="text" maxLength={50} className="tag-input" value={this.state.durationText}
                                style={{ minHeight: '60px', lineHeight: '15px' }} readOnly onChange={() => { }}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <span className="link-to cursor-pointer" style={{ color:'#88305F' }} onClick={()=>this.editPara()}>
                                Edit linked paragraph(s)
                            </span>
                        </div>
                    </div>  
                </>
            )
        }else if(this.state.durationParaId === -1 || this.state.durationTableCell === null){
            return (
                <>
                    <div className="row">
                        <div className="col-md-10 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                            <textarea rows={2} cols={40} name="text" maxLength={50} className="tag-input" value={this.state.durationText} placeholder={"Please type in lock in period here"} style={{ minHeight: '60px', lineHeight: '15px' }} onChange={(e)=>this.handleChange(e)}></textarea>
                        </div>
                    </div>
                    {this.state.durationText !== '' && 
                        <>
                            <div className="row">
                                <div className="col-md-10">
                                    <span className="link-to cursor-pointer" style={{ color:'#88305F' }}
                                        onClick={() => this.linkToPara()}>
                                        Link to paragraph(s)
                                    </span>
                                </div>
                            </div>
                        </> 
                    }
                </>
            );
        }
    }

    saveOrCancelSinglePara(){
        return(
            <div className="row my-2">
                <div className="col-md-5" />
                <div className="col-md-7">
                    <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                    {this.state.durationText !== '' && this.state.durationParaId === -1 && this.state.durationTableCell === null ?
                    <span className="upload-disable-btn ml-4" id="save-btn"
                    onClick={() => this.onSave()}>
                        Save
                    </span> :
                    <span className="upload-yellow-btn ml-4" id="save-btn"
                        onClick={() => this.onSave()}>
                        Save
                    </span>
                    }
                </div>
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({durationText: e.target.value});
      }


    linkToPara(){
        let { saveHighlightedDataPoint, dataPointName } = this.props;
        this.setState({highlight: true, editHighlight: false});

        //set table edit option true
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedId(null);

        this.props.editOptionSelected(true);
        saveHighlightedDataPoint(dataPointName);
    }

    editPara(){
        let { saveHighlightedDataPoint, dataPointName } = this.props;
        let {durationParaId, durationTableCell} = this.state;
        if(durationParaId !== null &&  durationParaId > -1){
            this.props.saveHighlightedId([durationParaId]);
            //scroll into para
            let paraId = 'p'+ durationParaId;
            let paraHeader = document.getElementById(paraId);
            if(paraHeader !== null && paraHeader !== undefined){
                paraHeader.scrollIntoView({block: 'center'});
            }
        }else if (durationTableCell !== null){ 
            this.props.saveHighlightedTableCells([durationTableCell]);
            //scroll into table cell
            let tableCellId = 'p'+ durationTableCell.paraId + ';r' + durationTableCell.rowId + ';c' + durationTableCell.columnId;
            let tableCellHeader = document.getElementById(tableCellId);
            if(tableCellHeader !== null && tableCellHeader !== undefined){
                tableCellHeader.scrollIntoView({block: 'center'});
            }
        }
        
        this.setState({highlight: false, editHighlight: true});
        this.props.editOptionSelected(true);
        saveHighlightedDataPoint(dataPointName);
    }

    onSave(){
        let linkDurationRequest = this.addOrRemoveDuration();
        this.props.editPresent(linkDurationRequest);
        this.props.editOptionSelected(false);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedId(null);
        this.setState({highlight: false, editHighlight: false, durationParaId: -1, durationText: '', durationTableCell: null});
    }

    onCancel(){
        this.props.editOptionSelected(false);
        this.props.saveHighlightedId(null);
        this.props.saveHighlightedTableCells(null);
        this.setState({highlight: false, editHighlight: false, durationParaId: -1, durationText: '', durationTableCell: null});
    }

    addOrRemoveDuration() {
        let { highlightedId, savedHighlightedTableCells } = this.props;
        let tempPresentList: LinkDurationRequest= { data: '', mode: '', editedParas: {upsert:[], deleted: []} };
        let previousParas = getSingleParaIdFromChild(this.props.savedPresentData);
        let changedParas: number[] = this.props.highlightedId !== null ? this.props.highlightedId : [];

        let previousTableCells: tableInfo | null = getSingleTableCellFromChild(this.props.savedPresentData);
        let changedTableCells: tableInfo | null = savedHighlightedTableCells !== null && savedHighlightedTableCells.length > 0 ? savedHighlightedTableCells[0] : null;

        let editedDuration: editedDuration = this.getAddedAndDeletedSinglePara(previousParas, changedParas);
        let editedTableCells: editedDuration = this.getAddedAndDeletedTableCell(previousTableCells, changedTableCells);

        let mergedEditedDuration: editedDuration = this.mergeEditedDuration(editedDuration, editedTableCells);

        tempPresentList={
            data: 'Yes',
            mode: 'manual',
            editedParas: mergedEditedDuration
        };

        return tempPresentList;
    }

    getAddedAndDeletedSinglePara(previousParas: number, changedParas: number[]){
        let upsertParas: durationInfo[] = [];
        let deletedParas: durationInfo[] = [];
        if(previousParas === -1){
            if(changedParas.length > 0){
                //newly added
                upsertParas.push({
                    phrase: this.state.durationText,
                    paraId: this.state.durationParaId,
                    rowId: -1,
                    columnId: -1
                });
            }
        }else{
            if(changedParas.length > 0){
                //edited
                upsertParas.push({
                    phrase: this.state.durationText,
                    paraId: this.state.durationParaId,
                    rowId: -1,
                    columnId: -1
                });
                deletedParas.push({
                    phrase: getSingleText(this.props.savedPresentData),
                    paraId: getSingleParaIdFromChild(this.props.savedPresentData),
                    rowId: -1,
                    columnId: -1
                })
            }else{
                //deleted old
                deletedParas.push({
                    phrase: getSingleText(this.props.savedPresentData),
                    paraId: getSingleParaIdFromChild(this.props.savedPresentData),
                    rowId: -1,
                    columnId: -1
                })
            }
        }

        let changedDuration = {
            upsert: upsertParas,
            deleted: deletedParas
        }

        return changedDuration;
    }

    getAddedAndDeletedTableCell(previousTableCell: tableInfo | null, changedTableCell: tableInfo | null){
        let addedTableCell: durationInfo[] = [];
        let deletedTableCell: durationInfo[] = [];
        let {durationText} = this.state;

        if(previousTableCell !== null){
            if(changedTableCell !== null){
                //edited - old deleted, new added 
                if(previousTableCell.paraId !== changedTableCell.paraId || previousTableCell.rowId !== changedTableCell.rowId || previousTableCell.columnId !== changedTableCell.columnId){
                    deletedTableCell.push({
                        paraId: previousTableCell.paraId,
                        rowId: previousTableCell.rowId,
                        columnId: previousTableCell.columnId,
                        phrase: getSingleText(this.props.savedPresentData)
                    }); 
                    addedTableCell.push({
                        paraId: changedTableCell.paraId,
                        rowId: changedTableCell.rowId,
                        columnId: changedTableCell.columnId,
                        phrase: durationText
                    });
                }
            }else if(changedTableCell === null){
                //old deleted, nothing new added
                deletedTableCell.push({
                    paraId: previousTableCell.paraId,
                    rowId: previousTableCell.rowId,
                    columnId: previousTableCell.columnId,
                    phrase: getSingleText(this.props.savedPresentData)
                });
                addedTableCell = [];
            }
        }else {
            //new added, nothing deleted
            if(changedTableCell !== null){
                addedTableCell.push({
                    paraId: changedTableCell.paraId,
                    rowId: changedTableCell.rowId,
                    columnId: changedTableCell.columnId,
                    phrase: durationText
                });
                deletedTableCell = [];
            }
        }

        let editedTableCells: editedDuration = {
            upsert: addedTableCell,
            deleted: deletedTableCell
        }

        return editedTableCells;
    }

    mergeEditedDuration(firstEditedDuration: editedDuration, secondEditedDuration: editedDuration){
        let mergeEditedDuration: editedDuration = {
            upsert: firstEditedDuration.upsert.concat(secondEditedDuration.upsert),
            deleted: firstEditedDuration.deleted.concat(secondEditedDuration.deleted)
        }
        return mergeEditedDuration;
    }
}
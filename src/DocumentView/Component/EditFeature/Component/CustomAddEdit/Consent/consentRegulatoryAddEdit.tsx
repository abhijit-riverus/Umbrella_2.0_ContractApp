import { duration } from '@material-ui/core';
import { table } from 'console';
import React, { Component } from 'react';
import { editedSentences, LinkSentenceRequest, sentenceInfo, tableInfo } from '../../../../../State/documentState';
import { dataForMap } from '../../../../Utils/docUtils';
import { regulatoryMap } from '../consentAddEdit';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editPresentSentences: (presentValue: LinkSentenceRequest) => void;
    dataPointName: string;
    savedInsightChild: any;
}

interface State {
    regulatory: string;
}


export default class ConsentRegulatoryAddEdit extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            regulatory: this.props.savedInsightChild[0].name
        }
    }

    componentWillReceiveProps(nextProps: Props){
        if(this.props.savedInsightChild !== nextProps.savedInsightChild && nextProps.savedInsightChild.length > 0){
            this.setState({regulatory: nextProps.savedInsightChild[0].name });
        }
        
    }

    render() {
        let {  dataPointName} = this.props;
        let { regulatory } = this.state;
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-4 my-2" >
                            Regulatory
                        </div>
                        <div className="col-md-3 my-2 ml-0" style={{ margin: 'auto' }} onClick={() => this.setState({ regulatory: 'Yes' })}>
                            <img className="cursor-pointer" src={regulatory === 'Yes' ? "/static_images/radio-active.svg" : "/static_images/radio-inactive.svg"} alt="radio-btn" />&nbsp;&nbsp;
                                <span>Yes</span>
                        </div>
                        <div className="col-md-3 my-2 ml-0" style={{ margin: 'auto' }} onClick={() => this.setState({ regulatory: 'No' })}>
                            <img className="cursor-pointer" src={regulatory === 'No' ? "/static_images/radio-active.svg" : "/static_images/radio-inactive.svg"} alt="radio-btn" />&nbsp;&nbsp;
                                <span>No</span>
                        </div>
                    </div>
                    {this.saveOrCancelRegulatory()}
                </div>
            </div>
        );
    }

    saveOrCancelRegulatory(){
        return(
            <div className="row my-2">
                <div className="col-md-5" />
                <div className="col-md-7">
                    <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                    {this.props.savedInsightChild.length > 0 && this.state.regulatory !== this.props.savedInsightChild[0].name  ?
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
        );
    }

    onSave(){
        let addSentenceRequest = this.addOrRemoveRegulatory('add');
        this.props.editPresentSentences(addSentenceRequest);
        this.props.editOptionSelected(false);
    }

    onCancel(){
        this.props.editOptionSelected(false);
    }

    addOrRemoveRegulatory(action: string): LinkSentenceRequest {
        let { savedInsightChild, dataPointName } = this.props;
        let { regulatory } = this.state;
        let tempPresentList: LinkSentenceRequest = { data: '', mode: '' };

        let mergeEditedSentences: editedSentences = {
            upsert: [
                {
                    paraId: savedInsightChild[0].dataPoints.paraId,
                    sentenceId: savedInsightChild[0].dataPoints.startSentenceId,
                    rowId: savedInsightChild[0].dataPoints.rowId,
                    columnId: savedInsightChild[0].dataPoints.columnId,
                    startWordId: savedInsightChild[0].dataPoints.startWordId,
                    endWordId: savedInsightChild[0].dataPoints.endWordId,
                    phrase: '',
                    typestring:  regulatoryMap[regulatory]
                }
            ],
            deleted: [],
            dataFor: dataForMap[dataPointName]
        } 

        if (action === 'add') {
            tempPresentList = {
                mode: 'manual',
                editedSentences: mergeEditedSentences
            }
        }
        return tempPresentList;
    }
    
}
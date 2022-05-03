import { duration } from '@material-ui/core';
import { table } from 'console';
import React, { Component } from 'react';
import { editedSentences, LinkSentenceRequest, ParentClauseDataPoint, sentenceInfo, tableInfo } from '../../../../../State/documentState';
import { dataForMap, getAuthoritiesFromChild } from '../../../../Utils/docUtils';
import { regulatoryMap } from '../consentAddEdit';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editPresentSentences: (presentValue: LinkSentenceRequest) => void;
    dataPointName: string;
    savedInsightChild: any;
    savedParentClauseDataPoint: ParentClauseDataPoint;
}

interface State {
    savedAuthorities: sentenceInfo[];
    authorityInAddMode: sentenceInfo;
}

export default class ConsentAuthorityAddEdit extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            savedAuthorities: [],
            authorityInAddMode: {
                paraId: props.savedParentClauseDataPoint.paraId,
                sentenceId: props.savedParentClauseDataPoint.sentenceId,
                rowId: props.savedParentClauseDataPoint.rowId,
                columnId: props.savedParentClauseDataPoint.columnId,
                startWordId: -1,
                endWordId: -1,
                phrase: '',
                typestring: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        let authoritiesArray: sentenceInfo[] = getAuthoritiesFromChild(this.props.savedInsightChild);
        this.setState({savedAuthorities: authoritiesArray});
    }

    render() {
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-12 m-0 bi-label-clickable" style={{ fontWeight: 600 }}>
                            Add Consent Authority
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 edit-title-header">
                            Add/edit the authorities to your contract here...
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 bi-label-clickable edit-date-title">
                            Authority
                        </div>
                        <div className="col-md-12" style={{ margin: 'auto' }}>
                            {this.getAuthorities()}
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
                    {this.saveOrCancelAuthority()}
                </div>
            </div>
        );
    }

    getAuthorities() {
        let {  dataPointName, } = this.props;
        let { savedAuthorities, authorityInAddMode} = this.state;
        return (
            <>
                {savedAuthorities.map((authorityItem: sentenceInfo, i: number) =>
                    <div className="row" key={i}>
                         <div className="col-md-8 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                            <span className="simple-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                <input type="text" placeholder={'Enter text'} style={{ width: '100%', border: 'none', outline: 'none' }} value={authorityItem.phrase} readOnly/>
                            </span>
                        </div>
                        <div className="col-md-4 align-right">
                            <img className='cursor-pointer' src="/static_images/less-parties.svg" alt="remove-icon" onClick={() => this.addOrRemoveAuthority('remove', authorityItem)} />
                        </div>
                    </div>
                )}
               <div className="row">
                    <div className="col-md-8 my-1 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                        <span className="simple-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                            <input type="text" placeholder={'Enter text'} style={{ width: '100%', border: 'none', outline: 'none' }} value={authorityInAddMode.phrase} onChange={(e) => this.handleChange(e)} />
                        </span>
                    </div>
                    <div className="col-md-4 align-right">
                        {authorityInAddMode.phrase !== undefined && authorityInAddMode.phrase.length > 0  ?
                            <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemoveAuthority('add', authorityInAddMode)} />
                            : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                        }
                    </div>
                </div>
            </>
        );
    }


    saveOrCancelAuthority(){
        return(
            <div className="row my-2">
                <div className="col-md-5" />
                <div className="col-md-7">
                    <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                    <span className="upload-yellow-btn ml-4" id="save-btn"
                        onClick={() => this.onSave()}>
                        Save
                    </span>
                </div>
            </div>
        );
    }

    handleChange(e: any) {
        let {authorityInAddMode} = this.state;
        e.preventDefault();
        this.setState({authorityInAddMode: {
                paraId: authorityInAddMode.paraId,
                sentenceId: authorityInAddMode.sentenceId,
                rowId: authorityInAddMode.rowId,
                columnId: authorityInAddMode.columnId,
                startWordId: authorityInAddMode.startWordId,
                endWordId: authorityInAddMode.endWordId,
                phrase: e.target.value,
                typestring: authorityInAddMode.typestring 
        }});
    }

    

    onSave(){
        let addSentenceRequest = this.addOrRemovePresent('add');
        this.props.editPresentSentences(addSentenceRequest);
        this.props.editOptionSelected(false);
    }

    onCancel(){
        this.props.editOptionSelected(false);
    }

    addOrRemoveAuthority(action:  string, authority: sentenceInfo){
        let {savedParentClauseDataPoint} = this.props;
        let {savedAuthorities, authorityInAddMode} = this.state;
        if(action === "add"){

            let tempSavedAuthorities: sentenceInfo[] = savedAuthorities;
            tempSavedAuthorities.push(authority);

            this.setState({
                authorityInAddMode: {
                    paraId: savedParentClauseDataPoint.paraId,
                    sentenceId:savedParentClauseDataPoint.sentenceId,
                    rowId:savedParentClauseDataPoint.rowId,
                    columnId:savedParentClauseDataPoint.columnId,
                    startWordId: -1,
                    endWordId: -1,
                    phrase: '',
                    typestring: '' 
                }
            });
        }
        else if(action === "remove"){
            let tempFilteredAuthorities: sentenceInfo[] = [];
            for(let i = 0; i < savedAuthorities.length; i++){
                if(savedAuthorities[i].startWordId === authority.startWordId && savedAuthorities[i].endWordId === authority.endWordId && savedAuthorities[i].phrase === authority.phrase){
                    continue;
                }else{
                    tempFilteredAuthorities.push(savedAuthorities[i]);
                }
            }
            this.setState({savedAuthorities: tempFilteredAuthorities});
        }
    }

    addOrRemovePresent(action: string): LinkSentenceRequest {
        let { savedInsightChild } = this.props;
        let { savedAuthorities, authorityInAddMode } = this.state;
        let tempPresentList: LinkSentenceRequest = { data: '', mode: '' };

        let oldAuthorities: sentenceInfo[] = getAuthoritiesFromChild(savedInsightChild);
        let changedAuthorities: sentenceInfo[] = savedAuthorities;
        if(authorityInAddMode.phrase !== undefined && authorityInAddMode.phrase.length > 0){
            changedAuthorities.push(authorityInAddMode);
        }

        let mergeEditedAuthorities: editedSentences = this.getAddedAndDeletedAuthorities(changedAuthorities, oldAuthorities);

        if (action === 'add') {
            tempPresentList = {
                mode: 'manual',
                editedSentences: mergeEditedAuthorities
            }
        }
        return tempPresentList;
    }

    getAddedAndDeletedAuthorities(changedAuthorities: sentenceInfo[] | null, previousAuthorities: sentenceInfo[]) {
        let { dataPointName } = this.props;
        let addedAuthorities: sentenceInfo[] = [];
        let deletedAuthorities: sentenceInfo[] = [];

        if (previousAuthorities.length !== 0) {
            if (changedAuthorities !== null) {
                if (changedAuthorities.length !== 0) {
                    //get newly added elements
                    for (let i = 0; i < changedAuthorities.length; i++) {
                        let addedExists = false;
                        for (let j = 0; j < previousAuthorities.length; j++) {
                            if (changedAuthorities[i].startWordId === previousAuthorities[j].startWordId && changedAuthorities[i].endWordId  === previousAuthorities[j].endWordId && changedAuthorities[i].phrase === previousAuthorities[j].phrase) {
                                    addedExists = true;
                                    break;
                            }
                        }
                        if (addedExists === false) {
                            addedAuthorities.push(changedAuthorities[i]);
                        }
                    }

                    //get deleted elements
                    for (let i = 0; i < previousAuthorities.length; i++) {
                        let deletedExists = false;
                        for (let j = 0; j < changedAuthorities.length; j++) {
                            if (previousAuthorities[i].paraId === changedAuthorities[j].paraId && previousAuthorities[i].sentenceId === changedAuthorities[j].sentenceId && previousAuthorities[i].phrase === changedAuthorities[j].phrase) {
                                    deletedExists = true;
                                    break;
                            }
                        }
                        if (deletedExists === false) {
                            deletedAuthorities.push(previousAuthorities[i]);
                        }
                    }
                } else if (changedAuthorities.length === 0) {
                    for (let i = 0; i < previousAuthorities.length; i++) {
                        deletedAuthorities.push(previousAuthorities[i]);
                    }
                }
            }
        } else {
            if (changedAuthorities !== null) {
                if (changedAuthorities.length !== 0) {
                    //adding for first time, newly added elements
                    for (let i = 0; i < changedAuthorities.length; i++) {
                        addedAuthorities.push(changedAuthorities[i]);
                    }
                }
            }
        }

        let addedDeletedAuthorties: editedSentences = {
            upsert: addedAuthorities,
            deleted: deletedAuthorities,
            dataFor: dataForMap[dataPointName]
        };

        return addedDeletedAuthorties;
    }

}
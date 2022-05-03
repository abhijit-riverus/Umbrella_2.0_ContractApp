import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { clauseTypeList } from '../../../../ClauseLibrary/Component/Utils/clauseLibraryUtils'
import { FolderHeadingInfo } from '../../../../ClauseLibrary/State/clauseLibraryState'
import Scrollable from '../../../Scrollable/scrollable'

interface Props {
    selectedClauseText: string;
    currentFileId: number;
    folderHeadingList: FolderHeadingInfo[];
    folderSubHeadingList: FolderHeadingInfo[];
    createClause: (clauseName: string, extractedText: string, userText: string, clauseType: string, sourceFileId: number, folderId: number) => void;
    getFolderSubHeading: (parentId: number) => void;
}

interface State {
    expandHeading: boolean;
    expandSubHeading: boolean;
    expandClauseType: boolean;
    searchHeading: string;
    searchSubHeading: string;
    selectedHeading: FolderHeadingInfo;
    selectedSubHeading: FolderHeadingInfo;
    selectedClauseType: string;
    relevantClauseText: string;
    clauseName: string;
}


export default class CreateClauseModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            expandHeading: false,
            expandSubHeading: false,
            expandClauseType: false,
            searchHeading: '',
            searchSubHeading: '',
            selectedHeading: {folderId: -1, folderName: '', parentId: -1},
            selectedSubHeading: {folderId: -1, folderName: '', parentId: -1},
            selectedClauseType: '',
            relevantClauseText: this.props.selectedClauseText,
            clauseName: ''
        }
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('createClauseModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("create-clause-modal-close-btn")?.click();
                //window.location.reload();
            }
        }
    }

    componentDidUpdate(prevProps: Props) {
        if(this.props.selectedClauseText !== prevProps.selectedClauseText) {
            this.setState({ relevantClauseText: this.props.selectedClauseText });
        }
    }

    render() {
        let { selectedClauseText, folderHeadingList, folderSubHeadingList } = this.props;
        let { expandHeading, expandSubHeading, expandClauseType, relevantClauseText, selectedHeading, selectedSubHeading, selectedClauseType, clauseName } = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="createClauseModal" aria-labelledby="createClauseModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 modal-body">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="create-clause-modal-close-btn" onClick={() => this.closeModal
                                        ()}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span> 
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="col-md-4 modal-title">
                                        {"Create a new Clause"}
                                        </div>
                                    <div className="col-md-7" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}></div>
                                    <div className="modal-body modal-subtitle">
                                        <div className="row">
                                            
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-12 clause-modal-heading">
                                                        Clause Name
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="row">
                                                            <div className="col-md-12 align-left">
                                                                <span className="clause-input" style={{ background: "white", border: '1px solid #DDDDDD' }} >
                                                                    <input type="text" className="clause-input" placeholder="Enter clause name" style={{ width: '100%', border: 'none', outline: 'none', background: "white" }} value={clauseName} onChange={(e)=> this.setClauseName(e)} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-12 clause-modal-heading">
                                                        Clause Heading
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="row">
                                                            <div className="col-md-12 align-left">
                                                                <span className="clause-input" style={{ background: "white", border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandHeading: !this.state.expandHeading })}>
                                                                    <input type="text" readOnly className="clause-input" placeholder="Choose one option" style={{ width: '100%', border: 'none', outline: 'none', background: "white" }} value={selectedHeading.folderName} />
                                                                    <img src="/static_images/new-tag-dropdown-active.svg" alt="dropdown" style={{ transform: expandHeading ? 'rotate(180deg)' : 'none' }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {expandHeading &&
                                                            <div className=" col-md-12 clause-options-container">
                                                                <div className="row ">
                                                                    <div className="col-md-12 clause-autocomplete-container align-left" style={{ margin: 0 }}>
                                                                        <Scrollable maxHeight={90}>
                                                                            {folderHeadingList.map((heading, i) =>
                                                                                <div className="clause-input-suggestion cursor-pointer align-left" style={{ fontSize: '14px' }} key={i} onClick={() => this.setHeading(heading)}>{heading.folderName}</div>
                                                                            )}
                                                                        </Scrollable>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-12 clause-modal-heading">
                                                        Sub-Heading
                                                    </div>
                                                    {folderSubHeadingList.length > 0 ?
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-12 align-left">
                                                                    <span className="clause-input" style={{ background: "white", border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandSubHeading: !this.state.expandSubHeading })}>
                                                                        <input type="text" readOnly className="clause-input" placeholder="Choose one option" style={{ width: '100%', border: 'none', outline: 'none', background: "white" }} value={selectedSubHeading.folderName} />
                                                                        <img src="/static_images/new-tag-dropdown-active.svg" alt="dropdown" style={{ transform: expandSubHeading ? 'rotate(180deg)' : 'none' }} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {expandSubHeading &&
                                                                <div className=" col-md-12 clause-options-container">
                                                                    <div className="row ">
                                                                        <div className="col-md-12 clause-autocomplete-container align-left" style={{ margin: 0 }}>
                                                                            <Scrollable maxHeight={90}>
                                                                                {folderSubHeadingList.map((subHeading, i) =>
                                                                                    <div className="clause-input-suggestion cursor-pointer align-left" style={{ fontSize: '14px' }} key={i} onClick={() => this.setSubHeaing(subHeading)}>{subHeading.folderName}</div>
                                                                                )}
                                                                            </Scrollable>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    :
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-12 align-left">
                                                                    <span className="clause-input" style={{ background: "#BEBEBE", border: '1px solid #DDDDDD' }} >
                                                                        <input type="text" readOnly className="clause-input" placeholder="No Sub-Headings present" style={{ width: '100%', border: 'none', outline: 'none', background: "#BEBEBE" }} value={selectedSubHeading.folderName} />
                                                                        <img src="/static_images/new-tag-dropdown-active.svg" alt="dropdown" /* style={{ transform: expandSubHeading ? 'rotate(180deg)' : 'none' }} */ />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-12 clause-modal-heading">
                                                        Clause Type
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="row">
                                                            <div className="col-md-12 align-left">
                                                                <span className="clause-input" style={{ background: "white", border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandClauseType: !this.state.expandClauseType })}>
                                                                    <input type="text" readOnly className="clause-input" placeholder="Choose one option" style={{ width: '100%', border: 'none', outline: 'none', background: "white" }} value={selectedClauseType} />
                                                                    <img src="/static_images/new-tag-dropdown-active.svg" alt="dropdown" style={{ transform: expandClauseType ? 'rotate(180deg)' : 'none' }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {expandClauseType &&
                                                            <div className=" col-md-12 clause-options-container">
                                                                <div className="row ">
                                                                    <div className="col-md-12 clause-autocomplete-container align-left" style={{ margin: 0 }}>
                                                                        <Scrollable maxHeight={90}>
                                                                            {clauseTypeList.map((clauseType, i) =>
                                                                                <div className="clause-input-suggestion cursor-pointer align-left" style={{ fontSize: '14px' }} key={i} onClick={() => this.setClauseType(clauseType)}>{clauseType}</div>
                                                                            )}
                                                                        </Scrollable>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-12 clause-modal-heading">
                                                        Relevant Clause
                                                    </div>
                                                    <div className="col-md-12">
                                                    <textarea rows={6} cols={70} name="text" className="clause-input custom-scrollbar-checkbox" placeholder={'Enter relevant clause text'} value={relevantClauseText} style={{ minHeight: '100px', lineHeight: '15px' }}  onChange={(e) => this.setRelevantText(e)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-2" />
                                                    <div className="col-md-7">
                                                        <span className="upload-yellow-btn py-1 mb-4" id="save-btn" data-dismiss="modal"
                                                            onClick={() => this.createClause()}>
                                                            Create
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    setClauseName(event: any){
        event.preventDefault();
        let clauseName = event.target.value;
        this.setState({ clauseName: clauseName });
    }

    setHeading(heading: FolderHeadingInfo) {
        this.setState({ selectedHeading: heading, expandHeading: false });
        this.props.getFolderSubHeading(heading.folderId);
    }

    setSubHeaing(subHeading: FolderHeadingInfo) {
        this.setState({ selectedSubHeading: subHeading, expandSubHeading: false });
    }

    setClauseType(clauseType: string) {
        this.setState({ selectedClauseType: clauseType, expandClauseType: false });
    }

    setRelevantText(event: any) {
        event.preventDefault();
        let relevantText = event.target.value;
        this.setState({ relevantClauseText: relevantText });
    }

    createClause(){
        let { folderHeadingList, folderSubHeadingList, selectedClauseText, currentFileId } = this.props;
        let { selectedHeading, selectedSubHeading, clauseName, selectedClauseType, relevantClauseText } = this.state;
        let folderId: number = -1; 
        if(folderSubHeadingList !== undefined && folderSubHeadingList.length > 0 ){
            if(selectedHeading.folderId !== -1 && selectedSubHeading.folderId !== -1 ){
                folderId = selectedSubHeading.folderId;
            } else if (selectedHeading.folderId !== -1) {
                folderId = selectedHeading.folderId;
            }
        } else {
            if(folderHeadingList.length > 0 && selectedHeading.folderId !== -1){
                folderId = selectedHeading.folderId;
            }
        }

        if(folderId !== -1) {
            this.props.createClause(clauseName, selectedClauseText, relevantClauseText, selectedClauseType, currentFileId, folderId);
        }else {
            //show error, please select a folder
        }
        this.setState({
            expandHeading: false,
            expandSubHeading: false,
            expandClauseType: false,
            searchHeading: '',
            searchSubHeading: '',
            selectedHeading: {folderId: -1, folderName: '', parentId: -1},
            selectedSubHeading: {folderId: -1, folderName: '', parentId: -1},
            selectedClauseType: '',
            relevantClauseText: this.props.selectedClauseText,
            clauseName: ''
        })
    }

    closeModal = () => {
        this.setState({
            expandHeading: false,
            expandSubHeading: false,
            expandClauseType: false,
            searchHeading: '',
            searchSubHeading: '',
            selectedHeading: {folderId: -1, folderName: '', parentId: -1},
            selectedSubHeading: {folderId: -1, folderName: '', parentId: -1},
            selectedClauseType: '',
            relevantClauseText: this.props.selectedClauseText,
            clauseName: ''
        })
    }
}
import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { clauseTypeList } from '../../../../ClauseLibrary/Component/Utils/clauseLibraryUtils'
import { ClauseInfo, FolderHeadingInfo } from '../../../../ClauseLibrary/State/clauseLibraryState'
import { getDate, getDateFormat, getTodaysDate } from '../../../../Utils/DataModifierUtil/dataModUtil'
import HeimdallUtil from '../../../HeimdallChild/HeimdallUtil/heimdallUtil'
import Scrollable from '../../../Scrollable/scrollable'
import ShowMessageModal from '../../ShowMessageModal/showMessageModal'

interface Props {
    folderHeadingList: FolderHeadingInfo[];
    folderSubHeadingList: FolderHeadingInfo[];
    createClause: (clauseName: string, extractedText: string, userText: string, clauseType: string, sourceFileId: number, folderId: number) => void;
    getFolderSubHeading: (parentId: number) => void;
    editClause: (clauseId: number, clauseName: string, userText: string, clauseType: string, folderId: number) => void;
    selectedClauseData: ClauseInfo;
    saveSelectedClauseData: (selectedClauseData: ClauseInfo) => void;
    clauseModalMode: string;
    getClausesData: (clauseIds: number[]) =>  void;
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
    extractedClauseText: string;
    userEditedClauseText: string;
    sourceFileId: number;
    sourceFileName: string; 
    clauseName: string;
    createdOn: string;
    createdBy: string;
}


export default class CreateClausePageModal extends Component<Props, State> {
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
            extractedClauseText: '',
            userEditedClauseText: '',
            clauseName: '',
            sourceFileId: -1,
            sourceFileName: '',
            createdOn: getTodaysDate(),
            createdBy: HeimdallUtil.getUsername() 
        }
    }

    componentWillReceiveProps(nextProps: Props){

        if(this.props.selectedClauseData  != nextProps.selectedClauseData){
            if(nextProps.clauseModalMode === 'view'){
                let selectedClause = nextProps.selectedClauseData;
                let clauseCreatedOn = getDate(selectedClause.createdOn)
                this.setState({
                    expandHeading: false,
                    expandSubHeading: false,
                    expandClauseType: false,
                    searchHeading: selectedClause.clauseFolderName,
                    searchSubHeading: selectedClause.clauseSubFolderName,
                    selectedHeading: {folderId: selectedClause.clauseFolderId, folderName: selectedClause.clauseFolderName, parentId: -1},
                    selectedSubHeading: {folderId: selectedClause.clauseSubFolderId, folderName: selectedClause.clauseSubFolderName, parentId: selectedClause.clauseFolderId},
                    selectedClauseType: selectedClause.clauseType,
                    extractedClauseText: selectedClause.extractedClause,
                    userEditedClauseText: selectedClause.userEditedClause,
                    clauseName: selectedClause.clauseName,
                    createdOn: clauseCreatedOn !== undefined ? clauseCreatedOn : "",
                    sourceFileId: selectedClause.sourceFileId,
                    sourceFileName: selectedClause.sourceFileName,
                    createdBy: selectedClause.createdBy 
                })
                //this.props.getFolderSubHeading(selectedClause.clauseFolderId);
            } else {
                this.setState({
                    expandHeading: false,
                    expandSubHeading: false,
                    expandClauseType: false,
                    searchHeading: '',
                    searchSubHeading: '',
                    selectedHeading: {folderId: -1, folderName: '', parentId: -1},
                    selectedSubHeading: {folderId: -1, folderName: '', parentId: -1},
                    selectedClauseType: '',
                    extractedClauseText: '',
                    clauseName: '',
                    createdOn: getTodaysDate(),
                    sourceFileId: -1,
                    sourceFileName: '',
                    createdBy: HeimdallUtil.getUsername() 
                });
            }
        }
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('createClausePageModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("create-clause-page-modal-close-btn")?.click();
                //window.location.reload();
            }
        }
    }

    render() {
        let { folderHeadingList, folderSubHeadingList, clauseModalMode } = this.props;
        let { expandHeading, expandSubHeading, expandClauseType, extractedClauseText, selectedHeading, selectedSubHeading, selectedClauseType, clauseName, createdOn, sourceFileName, sourceFileId, createdBy,userEditedClauseText } = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="createClausePageModal" aria-labelledby="createClausePageModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="create-clause-page-modal-close-btn" onClick={() => this.closeModal
                                        ()}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" style={{width: "15px", marginTop: "4px"}} />
                                        </span> 
                                    </div>
                                    <div className="col-md-12 modal-title">
                                        {clauseModalMode === "create" ?"Create new clause" : "View Clause"}
                                        <hr />
                                    </div>
                                    <hr />
                                    <div className="modal-body modal-subtitle">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-12 create-clause-page-modal-heading">
                                                        Creating a new clause
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-12 my-3">
                                                                <div className="row">
                                                                    <div className="col-md-12 clause-modal-heading">
                                                                        Clause Heading
                                                                    </div>
                                                                    <div className="col-md-9">
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
                                                                                        <Scrollable maxHeight={100}>
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
                                                                        <div className="col-md-9">
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
                                                                                                    <div className="clause-input-suggestion cursor-pointer align-left" style={{ fontSize: '14px' }} key={i} onClick={() => this.setSubHeading(subHeading)}>{subHeading.folderName}</div>
                                                                                                )}
                                                                                            </Scrollable>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    :
                                                                        <div className="col-md-9">
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
                                                                    <div className="col-md-9">
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
                                                                        Added on:
                                                                    </div>
                                                                    <div className="col-md-12 addedon-text">
                                                                        {createdOn}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 my-3">
                                                                <div className="row">
                                                                    <div className="col-md-12 clause-modal-heading">
                                                                        Added By:
                                                                    </div>
                                                                    <div className="col-md-12 addedon-text">
                                                                        {createdBy}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="row">
                                                            <div className="col-md-12 my-3">
                                                                <div className="row">
                                                                    <div className="col-md-12 clause-modal-heading">
                                                                        Clause Name
                                                                    </div>
                                                                    <div className="col-md-9">
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
                                                                        Relevant Clause
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <textarea rows={6} cols={70} name="text" className="clause-input custom-scrollbar-checkbox" placeholder={'Enter relevant clause text'} value={userEditedClauseText} style={{ minHeight: '100px', lineHeight: '15px', height: "150px", fontSize: "14px" }}  onChange={(e) => this.setRelevantText(e)}></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            { clauseModalMode === 'view' && sourceFileId !== null && sourceFileId !== -1 &&
                                                                <div className="col-md-12 my-3">
                                                                    <div className="row">
                                                                        <div className="col-md-12 clause-modal-heading">
                                                                            Source
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="clause-library-file-text cursor-pointer" onClick={() => window.open('/document/clauselibrary/' + btoa(sourceFileId.toString()), "_blank")}>
                                                                                <span>
                                                                                    {sourceFileName}
                                                                                </span>
                                                                                <span className="pl-2" >
                                                                                    <img src="/static_images/new-tab-purple.svg" alt="new-tab" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12 pt-2 clause-library-file-text cursor-pointer" data-toggle="modal" data-target="#showMessageModal" onClick={()=> this.showOriginalMessagePopup()}>
                                                                            See original clause text
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-2" />
                                                            <div className="col-md-7">
                                                                <span className="upload-yellow-btn py-1 mb-4" id="save-btn" data-dismiss="modal"
                                                                    onClick={() => this.createOrEditClause()}>
                                                                    {clauseModalMode === "view" ? "Save":"Create"}
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
                </div>
                <ShowMessageModal title={'View original clause text'} messageText={extractedClauseText} />
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

    setSubHeading(subHeading: FolderHeadingInfo) {
        this.setState({ selectedSubHeading: subHeading, expandSubHeading: false });
    }

    setClauseType(clauseType: string) {
        this.setState({ selectedClauseType: clauseType, expandClauseType: false });
    }

    setRelevantText(event: any) {
        event.preventDefault();
        let relevantText = event.target.value;
        this.setState({ userEditedClauseText: relevantText });
    }

    createOrEditClause(){
        let { folderHeadingList, folderSubHeadingList, clauseModalMode, selectedClauseData } = this.props;
        let { selectedHeading, selectedSubHeading, clauseName, selectedClauseType, userEditedClauseText } = this.state;

        let folderId: number = -1; 
        if(folderSubHeadingList !== undefined && folderSubHeadingList.length > 0 ){
            if(selectedHeading.folderId !== -1 && selectedHeading.folderId !== null && selectedSubHeading.folderId !== -1 && selectedSubHeading.folderId !== null ){
                folderId = selectedSubHeading.folderId;
            } else if (selectedHeading.folderId !== -1 && selectedHeading.folderId !== null) {
                folderId = selectedHeading.folderId;
            }
        } else {
            if(folderHeadingList.length > 0 && selectedHeading.folderId !== -1 && selectedHeading.folderId !== null){
                folderId = selectedHeading.folderId;
            }
        }
        if(clauseModalMode === "view"){
            this.props.editClause(selectedClauseData.clauseId, clauseName, userEditedClauseText, selectedClauseType, folderId );
            this.props.saveSelectedClauseData({
                clauseId: -1,
                clauseName: '',
                clauseFolderId: -1,
                clauseFolderName: '',
                clauseSubFolderId: -1,
                clauseSubFolderName: '',
                clauseType: '',
                extractedClause: '',
                userEditedClause: '',
                sourceFileId: -1,
                sourceFileName: '', 
                createdOn: '',
                createdBy: '',
                modifiedOn: ''
            });

        } else{
            let selectedClauseText = userEditedClauseText;
            let currentFileId: number =  -1;

            if(folderId !== -1) {
                this.props.createClause(clauseName, selectedClauseText, userEditedClauseText, selectedClauseType, currentFileId, folderId);
            }else {
                //show error, please select a folder
            }
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
            extractedClauseText: '',
            userEditedClauseText: '',
            clauseName: '',
            sourceFileId: -1,
            sourceFileName: '',
            createdOn: getTodaysDate(),
            createdBy: HeimdallUtil.getUsername() 
        })
    }

    showOriginalMessagePopup() {
        
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
            extractedClauseText: '',
            userEditedClauseText: '',
            clauseName: '',
            sourceFileId: -1,
            sourceFileName: '',
            createdOn: getTodaysDate(),
            createdBy: HeimdallUtil.getUsername() 
        })
    }
}
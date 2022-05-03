import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { editChildrenInFileList, editParentInFileList, getChildrenFileFromList, getFileIdsFromFiles, getParentFileFromList, getSortedChildrenFileList, getSortedParentFileList } from '../../../DocumentLibrary/Component/Utils/libraryUtils'
import { BasicFileInfo, ChildrenFileInfo, ParentFileInfo } from '../../../DocumentLibrary/State/documentLibraryState'
import Scrollable from '../../Scrollable/scrollable'

interface Props {
    initialFileIds: number[];
    sort: string;
    order: string;
    savedMultipleSelectedFiles: BasicFileInfo[];
    saveMultipleSelectedFiles: (savedMultipleSelectedFiles: BasicFileInfo[]) => void;
    selectedFile: BasicFileInfo | null;
    saveSelectedFile: (selectedFile: BasicFileInfo | null) => void;
    selectedLibraryAction: string;
    isBulkAction: boolean;
    saveSelectedLibraryAction: (selectedLibraryAction: string, isBulkAction: boolean) => void;
    savedParentFileList: ParentFileInfo[];
    addParent: (childFileIds: number[], editedParentFileId: number) => void;
    getParentFileList: (selectedFileId: number, fileIds: number[], bulkFileIds: number[]) => void;
    getDocumentHierarchy: (sort: string, order: string, fileIds: number[]) => void;
    savedChildrenFileList: ChildrenFileInfo[];
    getChildrenFileList: (selectedFileId: number, fileIds: number[]) => void;
    removeParent: (childFileIds: number[], editedParentFileId: number) => void;
}

interface State {
    docName: string;
    successBtn: boolean;
    activeTab: string;
    expandParent: boolean;
    expandChild: boolean;
    currentParentFile: ParentFileInfo;
    matchedParentFileList: ParentFileInfo[];
    currentChildrenFiles: ChildrenFileInfo[];
    matchedChildrenFileList: ChildrenFileInfo[];
    searchTermParent: string;
    searchTermChildren: string;
}       

export default class AddHierarchyModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            docName: '',
            successBtn: false,
            activeTab: 'addParent',
            expandParent: false,
            expandChild: false,
            currentParentFile: getParentFileFromList(this.props.savedParentFileList),
            matchedParentFileList: getSortedParentFileList(this.props.savedParentFileList),
            currentChildrenFiles: getChildrenFileFromList(this.props.savedChildrenFileList),
            matchedChildrenFileList: getSortedChildrenFileList(this.props.savedChildrenFileList),
            searchTermParent: '',
            searchTermChildren: ''
        }
    }

    componentWillReceiveProps(nextProps: Props){
        if(nextProps.savedParentFileList !== this.props.savedParentFileList){
            this.setState({
                currentParentFile: getParentFileFromList(nextProps.savedParentFileList), 
                matchedParentFileList: getSortedParentFileList(nextProps.savedParentFileList)
            });
        }
        if(nextProps.savedChildrenFileList !== this.props.savedChildrenFileList){
            this.setState({
                currentChildrenFiles: getChildrenFileFromList(nextProps.savedChildrenFileList),
                matchedChildrenFileList: getSortedChildrenFileList(nextProps.savedChildrenFileList),
            });
        }
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('addHierarchyModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("add-hierarchy-close-btn")?.click();
            }
        }
    }

    render() {
        let {isBulkAction} = this.props;
        let {expandParent, expandChild, matchedParentFileList, searchTermParent, searchTermChildren, matchedChildrenFileList} = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="addHierarchyModal" aria-labelledby="addHierarchyModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 modal-body">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="add-hierarchy-close-btn" onClick={() => this.closeModal
                                        ()}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span> 
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="col-md-4 modal-title">
                                        {isBulkAction ? "Add Hierarchy" : "Add Hierarchy" }
                                        </div>
                                    <div className="col-md-7" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="modal-body modal-subtitle" style={{paddingTop: "2px"}}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="row add-hierarchy-tab">
                                                    <div className="col-md-12" style={{background: this.state.activeTab === "addParent" ? "#FFFFFF":"#F8F8F8", borderTop: "2px solid #EDECEC", borderRight: this.state.activeTab === "addParent" ? "4px solid  #88305F" : "none"}} onClick={()=> this.setState({activeTab: "addParent"})}>
                                                        <div className="add-hierarchy-header" style={{ position: "relative", top: "20px", textAlign: 'center', fontSize: "14px"}}>
                                                            Add a parent
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row add-hierarchy-tab">
                                                    <div className="col-md-12" style={{background: this.state.activeTab === "addChild" ? "#FFFFFF":"#F8F8F8", borderRight: this.state.activeTab === "addChild" ? "4px solid  #88305F" : "none" }} onClick={() => isBulkAction === false && this.setState({activeTab: "addChild"})}>
                                                        <div className="add-hierarchy-header" style={{ position: "relative", top: "20px", textAlign: 'center', fontSize: "14px"}}>
                                                            Add child
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                {this.state.activeTab === "addParent" ? 
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="row add-hierarchy-header">
                                                                <div className="col-md-12">
                                                                    Select a parent for this document
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 align-left">
                                                                    <span className="tag-input" style={{ background: isBulkAction === true ? "" : "#FFFFFF", border: '1px solid #DDDDDD' }} onClick={() => this.setState({ expandParent: !this.state.expandParent, searchTermParent: this.state.expandParent === true ? '' : searchTermParent })} >
                                                                        {expandParent === false ? "" : 
                                                                            <img src="/static_images/search-inline-icn.svg" alt="dropdown" />
                                                                        }
                                                                        <input type="text" className="tag-input" placeholder={expandParent ? "Search for a document" :"Select a document"} style={{ width: '100%', border: 'none', outline: 'none', background: isBulkAction === true ? "" : "#FFFFFF" }} value={searchTermParent} onChange={(e)=>this.getSuggestedParentFile(e)} />
                                                                        <img src="/static_images/new-tag-dropdown-active.svg" alt="dropdown" style={{ transform: this.state.expandParent ? 'rotate(180deg)' : 'none', zIndex: 3, width: '15px'  }} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {expandParent && 
                                                                <div className="row">
                                                                    <div className="col-md-12 tag-autocomplete-container align-left" style={{ margin: 0 }}>
                                                                        <Scrollable maxHeight={200}>
                                                                            {matchedParentFileList.map((file, i)=>
                                                                                <div className="files-input-suggestion cursor-pointer" key={i} >
                                                                                    <span>
                                                                                        <input type="radio" id={""+file.fileId} value={file.fileId} checked={file.isParent === 1 ? true : false} onChange= {()=> this.selectParentFile(file)}  />
                                                                                        <label /* htmlFor={""+file.fileId} */> &nbsp;&nbsp;{file.fileName}</label>
                                                                                    </span>
                                                                                </div> 
                                                                            )}
                                                                        </Scrollable>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="row">
                                                                <div className="col-md-3" />
                                                                <div className="col-md-7">
                                                                    <span className="upload-yellow-btn py-1 mb-4 mt-3" id="save-btn" data-dismiss="modal"
                                                                        onClick={() => this.onSaveParent()}>
                                                                        Save
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                :
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="add-hierarchy-header">
                                                                Select children files for this document
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 align-left">
                                                                    <span className="tag-input" style={{ background: isBulkAction === true ? "#E9E9E9" : "#FFFFFF", border: '1px solid #DDDDDD' }} onClick={() => isBulkAction === false && this.setState({ expandChild: !this.state.expandChild, searchTermChildren: this.state.expandChild === true ? '' : searchTermChildren })} >
                                                                        {expandChild === false ? "" : 
                                                                            <img src="/static_images/search-inline-icn.svg" alt="dropdown" />
                                                                        }
                                                                        <input type="text" className="tag-input" placeholder={expandChild ? "Search for a document" :"Select a document"} style={{ width: '100%', border: 'none', outline: 'none', background: isBulkAction === true ? "#E9E9E9" : "#FFFFFF" }} value={searchTermChildren} onChange={(e)=>this.getSuggestedChildrenFile(e)} />
                                                                        <img src="/static_images/new-tag-dropdown-active.svg" alt="dropdown" style={{ transform: this.state.expandChild ? 'rotate(180deg)' : 'none', zIndex: 3, width: '15px'  }} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {expandChild && 
                                                                <div className="row">
                                                                    <div className="col-md-12 tag-autocomplete-container align-left" style={{ margin: 0, zIndex: 10 }}>
                                                                        <Scrollable maxHeight={200}>
                                                                            {matchedChildrenFileList.map((file, i)=>
                                                                                <div className="files-input-suggestion cursor-pointer"  key={i} >
                                                                                    <span>
                                                                                        <input type="checkbox" id={""+file.fileId} value={file.fileId} checked={file.isChild === true ? true : false} disabled={(file.parentExists === true && file.isChild === false) ? true : false} onChange= {()=> this.selectChildFile(file)} />
                                                                                         &nbsp;&nbsp;
                                                                                        <label htmlFor={""+file.fileId} style={{color: (file.parentExists === true && file.isChild === false) ? '#B4A5A5': ''}}>{file.fileName}{(file.parentExists === true && file.isChild === false) ? ' (Parent exists)': ''}</label>
                                                                                    </span>
                                                                                </div> 
                                                                            )}
                                                                        </Scrollable>
                                                                    </div>
                                                                </div>
                                                            }
                                                            
                                                            <div className="row">
                                                                <div className="col-md-3" />
                                                                <div className="col-md-7">
                                                                    <span className="upload-yellow-btn py-1 mb-4 mt-4" id="save-btn" data-dismiss="modal"
                                                                        onClick={() => this.onSaveChild()}>
                                                                        Save
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
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

    getSuggestedParentFile(event: any){
        let {expandParent, matchedParentFileList} = this.state;
        let {savedParentFileList} = this.props;
        if(expandParent === true){
            let searchParentName = event.target.value;
            this.setState({searchTermParent: searchParentName});
            if(searchParentName === ''){
                this.setState({matchedParentFileList: getSortedParentFileList(savedParentFileList)});
            } else {
                if(savedParentFileList !== null){
                    let parentFilesList = savedParentFileList;
                    let filteredFiles = parentFilesList.filter((file)=> file.fileName.toLowerCase().indexOf(searchParentName.toLowerCase()) > -1 );
                    this.setState({matchedParentFileList: filteredFiles});
                }else {
                    this.setState({matchedParentFileList: getSortedParentFileList(savedParentFileList)});
                }
            }
        }
    }

    selectParentFile(parentFile: ParentFileInfo){
        let {savedParentFileList} =  this.props;
        let editedParentFileList = editParentInFileList(parentFile, savedParentFileList);
        let editedParentFile = getParentFileFromList(editedParentFileList);
        this.setState({matchedParentFileList: editedParentFileList, currentParentFile: editedParentFile});
    }

    getSuggestedChildrenFile(event: any){
        let {expandChild, matchedChildrenFileList} = this.state;
        let {savedChildrenFileList} = this.props;
        if(expandChild === true){
            let searchChildName = event.target.value;
            this.setState({searchTermChildren: searchChildName});
            if(searchChildName === ''){
                this.setState({matchedChildrenFileList: getSortedChildrenFileList(savedChildrenFileList)});
            } else {
                if(savedChildrenFileList !== null){
                    let childrenFilesList = savedChildrenFileList;
                    let filteredFiles = childrenFilesList.filter((file)=> file.fileName.toLowerCase().indexOf(searchChildName.toLowerCase()) > -1 );
                    this.setState({matchedChildrenFileList: filteredFiles});
                }else {
                    this.setState({matchedChildrenFileList: getSortedChildrenFileList(savedChildrenFileList)});
                }
            }
        }
    }

    selectChildFile(childFile: ChildrenFileInfo){
        let {matchedChildrenFileList} = this.state;
        if(!(childFile.parentExists === true && childFile.isChild === false)){
            let editedChildrenFileList = editChildrenInFileList(childFile, matchedChildrenFileList);
            let editedChildFiles = getChildrenFileFromList(editedChildrenFileList);
            this.setState({matchedChildrenFileList: editedChildrenFileList, currentChildrenFiles: editedChildFiles });
        }
    }

    onSaveParent(){
        let {selectedFile, getDocumentHierarchy, initialFileIds, isBulkAction, savedMultipleSelectedFiles, sort, order} = this.props;
        let {currentParentFile} = this.state;
        let editedFileIds: number[] = [];
        if(currentParentFile.fileId !== -1){
            if(isBulkAction === true){
                editedFileIds = getFileIdsFromFiles(savedMultipleSelectedFiles);
            }else if(selectedFile !== null && isBulkAction === false){
                editedFileIds.push(selectedFile.fileId);
            }
            let editedParentFileId: number = currentParentFile.fileId;
            this.props.addParent(editedFileIds, editedParentFileId);
            this.setState({
                docName: '',
                successBtn: false,
                activeTab: 'addParent',
                expandParent: false,
                expandChild: false,
                currentParentFile: {fileId: -1, fileName: '', levelId: -1, isParent: -1},
                matchedParentFileList: [],
                currentChildrenFiles: [],
                matchedChildrenFileList: [],
                searchTermParent: ''
            })
            //getDocumentHierarchy(sort, order, initialFileIds); //get File Hierarchy
            window.location.reload();
        }
        this.props.saveMultipleSelectedFiles([]);
        this.props.saveSelectedFile(null);
        this.props.saveSelectedLibraryAction('', false);
    }

    onSaveChild(){
        let {savedChildrenFileList, selectedFile, initialFileIds, sort, order} = this.props;
        let {matchedChildrenFileList} = this.state;
        let previousChildrenFileList = getChildrenFileFromList(savedChildrenFileList);
        let changedChildrenFileList = getChildrenFileFromList(matchedChildrenFileList);
        let addedDeletedFileIds = this.getAddedAndDeletedChildrenFiles(previousChildrenFileList, changedChildrenFileList);
        if(selectedFile!== null){
            let upsertChildrenFileIds = addedDeletedFileIds.upsertChildrenFileIds;
            let deletedChildrenFileIds =  addedDeletedFileIds.deletedChildrenFileIds;
            if(upsertChildrenFileIds.length > 0 ){
                this.props.addParent(upsertChildrenFileIds, selectedFile.fileId);
            }
            if(deletedChildrenFileIds.length > 0){
                this.props.removeParent(deletedChildrenFileIds, selectedFile.fileId);
            }
            //this.props.getDocumentHierarchy(sort, order, initialFileIds);
            window.location.reload();
        }
        this.props.saveMultipleSelectedFiles([]);
        this.props.saveSelectedFile(null);
        this.props.saveSelectedLibraryAction('', false);
    }

    getAddedAndDeletedChildrenFiles(oldChildrenFileList:ChildrenFileInfo[],newChildrenFileList:ChildrenFileInfo[]){
        let addedChildrenFileIds: number[] = [];
        let deletedChildrenFileIds: number[] = [];
        if(oldChildrenFileList.length > 0){
            if(newChildrenFileList.length > 0){
                //newly added children
                for(let i = 0; i < newChildrenFileList.length; i++){
                    let exists = false;
                    for(let j = 0; j < oldChildrenFileList.length; j++){
                        if(newChildrenFileList[i].fileId === oldChildrenFileList[j].fileId){
                            exists = true;
                        }
                    }
                    if(exists === false){
                        addedChildrenFileIds.push(newChildrenFileList[i].fileId);
                    }
                }

                //deleted children
                for(let i = 0; i < oldChildrenFileList.length; i++){
                    let exists = false;
                    for(let j = 0; j < newChildrenFileList.length; j++){
                        if(oldChildrenFileList[i].fileId === newChildrenFileList[j].fileId){
                            exists = true;
                        }
                    }
                    if(exists === false){
                        deletedChildrenFileIds.push(oldChildrenFileList[i].fileId);
                    }
                }
            } else if(newChildrenFileList.length === 0){
                for(let i = 0; i < oldChildrenFileList.length; i++){
                    deletedChildrenFileIds.push(oldChildrenFileList[i].fileId);
                }
            }
        }else {
            if(newChildrenFileList.length > 0){
                for(let i = 0; i < newChildrenFileList.length; i++){
                    addedChildrenFileIds.push(newChildrenFileList[i].fileId);
                }
            }
        }
        let editedChildren = {
            upsertChildrenFileIds: addedChildrenFileIds,
            deletedChildrenFileIds: deletedChildrenFileIds
        }
        return editedChildren;
    }

    closeModal = () => {
        this.setState({
            docName: '',
            successBtn: false,
            activeTab: 'addParent',
            expandParent: false,
            expandChild: false,
            currentParentFile: {fileId: -1, fileName: '', levelId: -1, isParent: -1},
            matchedParentFileList: [],
            matchedChildrenFileList: [],
            currentChildrenFiles: [],
            searchTermParent: ''
        })
    }
}
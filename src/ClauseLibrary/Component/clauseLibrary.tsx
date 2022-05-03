import React, { Component } from 'react';
import { History } from 'history';
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon';
import FolderListHeader from './FolderList/folderListHeader';
import FolderListView from './FolderList/folderListView';
/* import { dummyFolderStructure } from './Utils/clauseLibraryUtils'; */
import { ClauseFolderState, ClauseInfo, ClauseStructure } from '../State/clauseLibraryState';
import CreateSubFolderModal from '../../UniversalComponents/Modals/ClauseLibraryModals/CreateSubFolderModal/createSubFolderModal';
import BarLoader from '../../UniversalComponents/Loader/barLoader';
import CreateClausePageModal from '../../UniversalComponents/Modals/ClauseLibraryModals/CreateClausePageModal/createClausePageModalCon';
import {  getClauseIdsFromFolderHierarchy } from './Utils/clauseLibraryUtils';


interface Props {
    pageWatcher: (page: string) => void;
    history: History;
    clauseLibraryLoader: boolean;
    collapsedFolderIds: number[];
    saveCollapsedFolderIds: (collapsedFolderIds: number[]) => void;
    clauseLibraryData: ClauseFolderState[];
    createFolderHeading: (folderName: string) => void;
    createFolderSubHeading: (folderName: string, parentId: number) => void;
    getFolderHeading: () => void;
    selectedClauseData: ClauseInfo;
    saveSelectedClauseData: (selectedClauseData: ClauseInfo) => void;
    getFolderSubHeading: (parentId: number) => void;
    deleteFolder: (folderId: number) => void;
    deleteClause: (clauseId:number) => void;
    getClauseLibraryData: () => void;
    getClausesData: (clauseIds: number[]) => void;
    clausesData: ClauseStructure[];
}

interface State {
    showAddFolderOption: boolean;
    folderNameText: string;
    selectedFolderId: number;
    selectedFolderName: string;
    clauseModalMode: string;
}

export default class ClauseLibrary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAddFolderOption: false,
            folderNameText: '',
            selectedFolderId: -1,
            selectedFolderName: '',
            clauseModalMode: ''
        }
    }

    componentDidMount() {
        let { pageWatcher } = this.props;
        pageWatcher('clauselibrary');
        this.props.getClauseLibraryData();
    }

    render() {
        let { history, collapsedFolderIds, saveCollapsedFolderIds, createFolderSubHeading, clauseLibraryLoader, saveSelectedClauseData, selectedClauseData, getFolderHeading, getFolderSubHeading, deleteClause, deleteFolder, getClauseLibraryData, clauseLibraryData, clausesData } = this.props;
        let { showAddFolderOption, folderNameText, selectedFolderId, selectedFolderName, clauseModalMode } = this.state;
        return (
            <div className="row">
                <div className="col-md-1" style={{ zIndex: 2 }}>
                    <SideNavbar history={history} />
                </div>
                <div className="col-md-11 mt-5" style={{ zIndex: 1 }}>
                   <div className="row">
                       <div className="col-md-11 mt-3">
                            <div className="row">
                                <div className="col-md-10">
                                    <h4>Clause Library</h4>
                                </div>
                                <div className="col-md-2">
                                    <span className="upload-yellow-btn py-1" id="save-btn" style={{ fontSize: "13px", padding: "10px 25px"}} data-toggle="modal" data-target="#createClausePageModal" onClick={()=> this.showCreateClausePopup()}  >
                                        {"Create new clause"}
                                    </span>
                                </div>
                            </div>
                           
                        </div>
                   </div>
                    <div className="row clause-library-heading-row">
                            <div className="col-md-1 mt-2 folder-heading-text">
                                    Folder
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-md-11 mt-3 ml-5">
                            <div className="row">
                                <div className="col-md-12 clause-folder-view">
                                    <div className="row clause-folder-heading-row">
                                        <div className="col-md-12 clause-folder-heading-text">
                                            Clause Folders
                                        </div>
                                    </div>
                                    <FolderListHeader />
                                    {clauseLibraryLoader === true ?
                                        <BarLoader/>
                                    :
                                        <>
                                            <div className="row clause-folder-heading-row">
                                                <div className="col-md-12">
                                                    {showAddFolderOption === false ?
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <span className="cursor-pointer" onClick={() => this.setState({ showAddFolderOption: !this.state.showAddFolderOption })}>
                                                                        <img src="/static_images/add-parent-folder-icn.svg" alt="add-folder"/>&nbsp;
                                                                        <span className="add-folder-heading">Add new folder</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        :
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <span className="cursor-pointer" onClick={() => this.setState({ showAddFolderOption: !this.state.showAddFolderOption })} >
                                                                        <img src="/static_images/add-parent-folder-inactive-icn.svg" alt="add-folder"/>&nbsp;
                                                                        <span className="add-folder-heading-inactive">Add new folder</span>
                                                                    </span>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <div className="row">
                                                                        <div className="col-md-2 px-0 add-folder-name-text">
                                                                            Name the folder
                                                                        </div>
                                                                        <div className="col-md-2 px-0">
                                                                            <span className="folder-input" style={{ background: "white", border: '1px solid #DDDDDD' }} >
                                                                                <input type="text" className="folder-input" placeholder="Enter folder name" style={{ width: '100%', border: 'none', outline: 'none', background: "white" }} value={folderNameText} onChange={(e)=> this.setNewFolderName(e)} />
                                                                            </span>
                                                                        </div>
                                                                        <div className="col-md-1">
                                                                            <span className="create-folder-yellow-btn" onClick={() => this.createNewFolder()} >
                                                                                Create
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                            <FolderListView clauseLibraryData={clauseLibraryData} collapsedFolderIds={collapsedFolderIds} saveCollapsedFolderIds={saveCollapsedFolderIds} setSelectedFolderInfo={(folderId: number, folderName: string)=> this.setState({ selectedFolderId: folderId, selectedFolderName: folderName })} setClauseModalMode={(clauseModalMode: string)=> this.setState({ clauseModalMode: clauseModalMode})} selectedClauseData={selectedClauseData} saveSelectedClauseData={saveSelectedClauseData} getFolderHeading={getFolderHeading} getFolderSubHeading={getFolderSubHeading} getClauseLibraryData={getClauseLibraryData} deleteClause={deleteClause} deleteFolder={deleteFolder} clausesData={clausesData} />
                                        </>
                                    }   
                                </div>
                            </div>               
                        </div>
                    </div>
                </div>
                <CreateSubFolderModal parentFolderId={selectedFolderId} parentFolderName={selectedFolderName} createFolderSubHeading={createFolderSubHeading} />
                <CreateClausePageModal clauseModalMode={clauseModalMode} />
            </div >
        );

    }

    setNewFolderName(event: any) {
        event.preventDefault();
        let newFolderName = event.target.value;
        this.setState({ folderNameText: newFolderName }); 
    }

    createNewFolder() {
        let { folderNameText } = this.state;

        if(folderNameText.length > 0){
            this.props.createFolderHeading(folderNameText);
            this.setState({ folderNameText: '', showAddFolderOption: false });
        }
    }

    showCreateClausePopup(){
        this.props.getFolderHeading();
        this.setState({clauseModalMode: 'create'});
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
    }
}

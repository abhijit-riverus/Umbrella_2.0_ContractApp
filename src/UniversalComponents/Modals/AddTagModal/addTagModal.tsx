import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import LibraryAddTag from '../../../DocumentLibrary/Component/TaggingComponents/libraryAddTag'
import { BasicFileInfo } from '../../../DocumentLibrary/State/documentLibraryState'
import { TagData } from '../../../DocumentView/State/documentState'

interface Props {
    listTagNature: () => void;
    listTagType: () => void;
    tagNature: TagData[];
    tagType: TagData[];
    otherTags: TagData[];
    listOtherTags: () => void;
    createOtherTags: (name: string) => void;
    storeOtherTags: (storedOtherTags: any) => void;
    newTagData: TagData;
    storedOtherTags: any;
    savedMultipleSelectedFiles: BasicFileInfo[];
    saveMultipleSelectedFiles: (savedMultipleSelectedFiles: BasicFileInfo[]) => void;
    selectedFile: BasicFileInfo | null;
    saveSelectedFile: (selectedFile: BasicFileInfo | null) => void;
    selectedLibraryAction: string;
    isBulkAction: boolean
    saveSelectedLibraryAction: (selectedLibraryAction: string, isBulkAction: boolean) => void;
    editTags: (editFileIds: number[], dataType: string, tagEditData: any, isBulkAction: boolean) => void;
    savedFileTagData: any[];
    saveFileTagData: (savedFileTagData: any[]) => void;
    initialFileIds: number[];
    getDocumentHierarchy: (sort: string, order: string, fileIds: number[]) => void;
    otherTagsLoader: boolean;
}

interface State {
    docName: string;
    successBtn: boolean;
}

export default class AddTagModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            docName: '',
            successBtn: false
        }
    }
    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false)
        let { listTagType, listTagNature } = this.props;
        listTagNature();
        listTagType();
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('addTagModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("add-tag-close-btn")?.click();
                //window.location.reload();
            }
        }
    }

    render() {
        let {  newTagData,  storedOtherTags,  storeOtherTags, createOtherTags, listTagNature, listTagType, tagNature, tagType, listOtherTags, otherTags, savedFileTagData, isBulkAction, selectedLibraryAction, selectedFile, savedMultipleSelectedFiles, editTags, saveSelectedLibraryAction, saveSelectedFile, saveFileTagData, getDocumentHierarchy, initialFileIds, otherTagsLoader} = this.props;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="addTagModal" aria-labelledby="addTagModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 modal-body">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="add-tag-close-btn" onClick={() => this.closeModal
                                        ()}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span> 
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="col-md-4 modal-title">
                                        {isBulkAction ? "Add to Groups" : "Add Tags" }
                                        </div>
                                    <div className="col-md-7" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="modal-body modal-subtitle">
                                        <LibraryAddTag storedOtherTags={storedOtherTags} 
                                        storeOtherTags={storeOtherTags} 
                                        newTagData={newTagData} 
                                        createOtherTags={createOtherTags} 
                                        tagNature={tagNature} tagType={tagType} 
                                        listOtherTags={listOtherTags} 
                                        otherTags={otherTags} 
                                        tags={savedFileTagData} 
                                        isBulkAction={isBulkAction} 
                                        selectedLibraryAction={selectedLibraryAction} 
                                        selectedFile={selectedFile} 
                                        savedMultipleSelectedFiles={savedMultipleSelectedFiles} 
                                        listTagNature={listTagNature} 
                                        listTagType={listTagType} 
                                        editTags={editTags} 
                                        saveSelectedFile={saveSelectedFile} 
                                        saveSelectedLibraryAction={saveSelectedLibraryAction} 
                                        saveFileTagData={saveFileTagData} initialFileIds={initialFileIds} 
                                        getDocumentHierarchy={getDocumentHierarchy} 
                                        otherTagsLoader={otherTagsLoader} />
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    dismissModal = () => {
        this.setState({docName: '', successBtn: false});
        //window.location.reload();
    }

    closeModal = () => {
        this.setState({docName: '', successBtn: false});
    }
}
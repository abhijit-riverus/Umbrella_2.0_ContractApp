
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';
import { truncateString } from '../../Utils/DataModifierUtil/dataModUtil';
import { BasicFileInfo, DocumentHierarchyData, LibraryTagFilterStructure, TagInfo } from '../State/documentLibraryState';
import {getCategoryId, getTagColor } from './Utils/libraryUtils';



interface Props {
    documentChildren: DocumentHierarchyData[];
    initialFileIds: number[];
    savedMultipleSelectedFiles: BasicFileInfo[];
    saveMultipleSelectedFiles: (savedMultipleSelectedFiles: BasicFileInfo[]) => void;
    savedCollapsedFileIds: number[];
    saveCollapsedFileIds: (savedCollapsedFileIds: number[]) => void;
    appliedLibraryTagFilters: LibraryTagFilterStructure[];
    applyLibraryTagFilters: (appliedLibraryTagFilters: LibraryTagFilterStructure[], initialFileIds: number[]) => void;
    selectedFile: BasicFileInfo | null;
    saveSelectedFile: (selectedFile: BasicFileInfo | null) => void;
    saveSelectedLibraryAction: (selectedLibraryAction: string, isBulkAction: boolean) => void;
    savedFileTagData: any[];
    saveFileTagData: (savedFileTagData: any[]) => void;
    getParentFileList: (selectedFileId: number,fileIds: number[], bulkFileIds: number[]) => void;
    getChildrenFileList: (selectedFileId: number,fileIds: number[]) => void;
    setModal: (type: string, title: string, tags: TagInfo[]) => void; 
}

interface State {

}

export default class HierarchyTagsList extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    selectAddTag = (selectedFileId: number, selectedFileName: string, selectedFileLevelId: number) => {
        let {documentChildren} = this.props;
        this.props.saveSelectedFile({fileId: selectedFileId, fileName: selectedFileName, levelId: selectedFileLevelId});
        this.props.saveSelectedLibraryAction('tags', false);
        let tagData = this.getSelectedFileTagData(documentChildren, selectedFileId);
        this.props.saveFileTagData(tagData);
    }

    selectAddHierarchy = (selectedFileId: number, selectedFileName: string, selectedFileLevelId: number) => {
        let {initialFileIds} = this.props;
        this.props.getParentFileList(selectedFileId, initialFileIds, []);
        this.props.getChildrenFileList(selectedFileId, initialFileIds);
        this.props.saveSelectedFile({fileId: selectedFileId, fileName: selectedFileName, levelId: selectedFileLevelId});
        this.props.saveSelectedLibraryAction('hierarchy', false);
    }

    getSelectedFileTagData(documentHierarchy: DocumentHierarchyData[], selectedFileId: number | null ){
        //recursive
        let returnVal: any[] = [];
        if(documentHierarchy.length > 0){

            documentHierarchy.map((document, i) => {
                if(selectedFileId !== null && document.fileId === selectedFileId ){
                    let tagsData =[];
                    for(let i = 0; i < document.tags.length; i++){
                        tagsData.push({
                            name: document.tags[i].tagName,
                            dataPoints: {
                                tagId: document.tags[i].tagId,
                                categoryId: getCategoryId(document.tags[i].tagCategory)
                            }
                        })
                    }
                    returnVal = tagsData;
                }else {
                    if(document.children.length > 0){
                        return this.getSelectedFileTagData(document.children, selectedFileId);
                    }
                }
            })
        }
        return returnVal;
    }

    tagCounts = (tags: TagInfo[]) => {
        let natureTagCount = 0;
        let typeTagCount = 0;
        let othersTagCount = 0;
        tags.map((tag, i) => {
            if(tag.tagCategory === 'nature'){
                return natureTagCount + 1;
            } else if(tag.tagCategory === 'type'){
                return typeTagCount + 1;
            }
            else if(tag.tagCategory === 'others'){
                return othersTagCount + 1;
            }
        })

        let showOthersTagLimit = 3 - (natureTagCount + typeTagCount);

        return showOthersTagLimit;
    }

    getExtraCount = (numberOfTags: number) => {
        let extraCount = numberOfTags - 3;
        return '+' + extraCount;
    }

    setModal(check: boolean, type: string, title: string, tags: TagInfo[]) {
        if (check) {
            this.props.setModal(type, title, tags);
            let link = document.getElementById('documentLibraryTableButton');
            !isNullOrUndefined(link) && link.click();
        }
    }
    
    render(){
        let {documentChildren, savedMultipleSelectedFiles, saveMultipleSelectedFiles, savedCollapsedFileIds, saveCollapsedFileIds, 
            appliedLibraryTagFilters, applyLibraryTagFilters, initialFileIds, saveSelectedFile, saveSelectedLibraryAction, 
            selectedFile,saveFileTagData, savedFileTagData, getParentFileList, getChildrenFileList, setModal} = this.props;
        return (
            <>
                {documentChildren.length > 0 && documentChildren.map((document, i) => 
                    <> 
                    <div className="col-md-12 px-0 tag-list-container" key={i} 
                    style={{ marginTop: document.levelId === 0 ? "none" : "none", display: 'inline-flex'}}>
                        <div className="col-md-9" style={{overflow: 'hidden'}} >
                        {/* <span className={'library-file-item'} style={{ marginTop: document.levelId === 0 ? "none" : "none"}} > */}
                        <div className="row">
                            <div className="col-md-12 pl-4">
                            {document.tags.length > 0 ?
                                <>
                                   { document.tags.map((tag, i)=>
                                        tag.tagCategory === 'nature' && 
                                        <>
                                            <span className="library-tag-label mr-1" 
                                            style={{ backgroundColor: getTagColor(tag.tagCategory), zIndex: 4}} 
                                            onClick={()=> this.props.applyLibraryTagFilters( [{tagId: tag.tagId, tagName: tag.tagName}], initialFileIds) } 
                                            key={i} >
                                            {tag.tagName.length > 8 
                                            ? 
                                            <DarkTooltip title={tag.tagName} placement={'right-end'}>
                                            <span>{truncateString(tag.tagName, 8)}</span>
                                            </DarkTooltip>  
                                            : tag.tagName
                                            }
                                            </span> 
                                        </>
                                    )}
                                    { document.tags.map((tag, i)=>
                                        tag.tagCategory === 'type' && 
                                        <>
                                            <span className="library-tag-label mx-1" 
                                            style={{ backgroundColor: getTagColor(tag.tagCategory), zIndex: 4}} 
                                            onClick={()=> this.props.applyLibraryTagFilters( [{tagId: tag.tagId, tagName: tag.tagName}], initialFileIds) } 
                                            key={i} >
                                            {tag.tagName.length > 8 
                                            ? <DarkTooltip title={tag.tagName} placement={'right-end'}>
                                            <span>{truncateString(tag.tagName, 8)}</span>
                                            </DarkTooltip> 
                                            : tag.tagName}
                                            </span> 
                                        </>
                                    )}
                                    { document.tags.map((tag, i)=>
                                        tag.tagCategory === 'others' 
                                        ? i < this.tagCounts(document.tags) 
                                            ? <>
                                                <span className="library-tag-label mr-2" 
                                                style={{ backgroundColor: getTagColor(tag.tagCategory), zIndex: 4}} 
                                                onClick={()=> this.props.applyLibraryTagFilters( [{tagId: tag.tagId, tagName: tag.tagName}], initialFileIds) } 
                                                key={i} >
                                                {tag.tagName.length > 8 
                                                ? <DarkTooltip title={tag.tagName} placement={'right-end'}>
                                                <span>{truncateString(tag.tagName, 8)}</span>
                                                </DarkTooltip> 
                                                : tag.tagName}
                                                </span> 
                                            </>
                                            : i === this.tagCounts(document.tags) && <span className="extra-count cursor-pointer" 
                                                onClick={() => this.setModal(true, 'Tags',  document.title, document.tags)}>
                                                {this.getExtraCount(document.tags.length)}
                                                </span>
                                            : <> </>
                                    )}

                                </>
                                :
                                <div>
                                <span className="library-tag-label">
                                    <img src="/static_images/empty-dash-grey-icn.svg" alt="empty" />
                                </span> 
                                </div>
                            }                            
                            </div>
                            
                        </div>
                        {/* {document.tags.length > 0 ?
                                <span>
                                   { document.tags.map((tag, i)=>
                                        <span className="library-tag-label" style={{ backgroundColor: getTagColor(tag.tagCategory), zIndex: 4}} onClick={()=> this.props.applyLibraryTagFilters( [{tagId: tag.tagId, tagName: tag.tagName}], initialFileIds) } key={i} >
                                            {tag.tagName}
                                        </span>
                                    )}
                                </span>
                                :
                                <span className="library-tag-label">
                                    <img src="/static_images/empty-dash-grey-icn.svg" alt="empty" />
                                </span>
                            } */}
                        {/* </span> */}
                        </div>
                        <div className="col-md-3 ml-4 pl-3">
                        {/* <span className={'library-file-item'} style={{ marginTop: document.levelId === 0 ? "none" : "none"}} > */}
                            <span className="add-actions-img cursor-pointer" style={{marginRight: "20px"}}>
                                <img src="/static_images/add-hierarchy-icn.svg" alt='add-hierarchy' data-toggle="modal" data-target="#addHierarchyModal"  onClick={()=> this.selectAddHierarchy(document.fileId, document.fileName, document.levelId)} />
                            </span>
                            <span className="add-actions-img cursor-pointer" style={{marginRight: "20px"}}>
                                <img src="/static_images/add-tag-icn.svg" alt='add-tag' data-toggle="modal" data-target="#addTagModal" onClick={() => this.selectAddTag(document.fileId, document.fileName, document.levelId)} />
                            </span>
                            
                        {/* </span> */}
                        </div>
                        </div>
                        {(document.children.length > 0) && savedCollapsedFileIds.indexOf(document.fileId) === -1 &&
                            <HierarchyTagsList documentChildren={document.children} 
                            initialFileIds={initialFileIds} 
                            savedMultipleSelectedFiles={savedMultipleSelectedFiles} 
                            saveMultipleSelectedFiles={saveMultipleSelectedFiles} 
                            savedCollapsedFileIds={savedCollapsedFileIds} 
                            saveCollapsedFileIds={saveCollapsedFileIds} 
                            appliedLibraryTagFilters={appliedLibraryTagFilters} 
                            applyLibraryTagFilters={applyLibraryTagFilters}  
                            selectedFile={selectedFile} 
                            saveSelectedFile={saveSelectedFile} 
                            saveSelectedLibraryAction={saveSelectedLibraryAction} 
                            saveFileTagData={saveFileTagData} 
                            savedFileTagData={savedFileTagData} 
                            getParentFileList={getParentFileList} 
                            getChildrenFileList={getChildrenFileList} 
                            setModal={setModal}
                            />
                        }
                        </>
                )}
            </>
        )
    }
}
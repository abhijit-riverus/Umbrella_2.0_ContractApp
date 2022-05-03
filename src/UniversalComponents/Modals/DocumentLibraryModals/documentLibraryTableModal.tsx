import React, { Component } from 'react'
import { getTagColor } from '../../../DocumentLibrary/Component/Utils/libraryUtils';
import { LibraryTagFilterStructure, partyInfo, TagInfo } from '../../../DocumentLibrary/State/documentLibraryState';
import Scrollable from '../../Scrollable/scrollable';

interface Props {
    type: string; // party or tags
    title: string; // document name
    parties: partyInfo[];
    tags: TagInfo[];
    applyLibraryTagFilters?: (appliedLibraryTagFilters: LibraryTagFilterStructure[], initialFileIds: number[]) => void;
    initialFileIds: number[];
    list?: string[];
}
interface State {

}

export default class DocumentLibraryTablemodal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    switchView = (type: string) => {
        let {parties, tags, list} = this.props
        switch(type){
            case 'Parties': {
                return (
                    <>
                        {
                            parties.length > 0 && parties.map((party: partyInfo, key: number) =>
                                <div className="row">
                                    <div className="col-md-12 member-name px-3">
                                        {key + 1}.&nbsp;{party.partyName}
                                    </div>
                                </div>
                                
                            )
                        }
                    </>
                )
            }
            case 'Tags': {
                return (
                    <>
                    <Scrollable maxHeight={200}>
                    {
                        tags.length > 0 && tags.map((tag: TagInfo, key: number) =>
                            <div className="row">
                                <div className="col-md-12 py-2" style={{textAlign: 'left'}}>
                                    <span className="library-tag-label mr-2" 
                                    style={{ backgroundColor: getTagColor(tag.tagCategory), zIndex: 4, width: 'fit-content', height: 'auto'}} 
                                    onClick={()=> this.props.applyLibraryTagFilters !== undefined && this.props.applyLibraryTagFilters( [{tagId: tag.tagId, tagName: tag.tagName}], this.props.initialFileIds) } 
                                    key={key} >
                                    {tag.tagName}
                                    </span>
                                </div>
                            </div>
                            )
                    }
                    </Scrollable>
                    </>
                )
            }
            case 'List': {
                return (
                    <>
                        {list !== undefined &&
                            list.length > 0 && list.map((value: string, key: number) =>
                                <div className="row">
                                    <div className="col-md-12 member-name px-3">
                                        {key + 1}.&nbsp;{value}
                                    </div>
                                </div>
                                
                            )
                        }
                    </>
                )
            }
            case 'List Dashboard': {
                return (
                    <>
                        {list !== undefined &&
                            list.length > 0 && list.map((value: string, key: number) =>
                                <div className="row">
                                    <div className="col-md-12 member-name px-3">
                                        {key + 1}.&nbsp;{value}
                                    </div>
                                </div>
                                
                            )
                        }
                    </>
                )
            }
        }
    }

    getModalContainerTop(type: string){
        let top: string = '20%';
        if(type === 'List'){
            top = '23%';
        } else if(type === 'List Dashboard'){
            top = '60%';
        } else if (type === 'Tags'){
            top = '37%';
        } else {
            top = '42%';
        }

        return top;
    }

    getModalContainerLeft(type: string){
        let left: string = '20%';
        if(type === 'List'){
            left = '25%';
        } else if(type === 'List Dashboard'){
            left = '25%';
        } else if (type === 'Tags'){
            left = '25%';
        } else {
            left = '8%';
        }
        return left;
    }

    getModalContainerWidth(type: string){
        let width: string = '20%';
        if(type === 'List'){
            width = '14%';
        } else if(type === 'List Dashboard'){
            width = '14%';
        } else if (type === 'Tags'){
            width = '14%';
        } else {
            width = '14%';
        }
        return width;
    }

    render() {
        let { type, title } = this.props;
                return (
                    <>
                        <div className="row modal" id="documentLibraryTableModal" aria-labelledby="documentLibraryTableModal" aria-hidden="true" data-backdrop="false"
                            style={{ backdropFilter: 'none', background: 'transparent' }}>
                            <div className="col-md-12 modal-dialog" style={{ width: this.getModalContainerWidth(type), top: this.getModalContainerTop(type), left: this.getModalContainerLeft(type)}}>
                                <div className="row">
                                    <div className="col-md-12 modal-content" style={{ borderRadius: '10px' }}>
                                        <div className="row">
                                            <div className="modal-body modal-title mb-0">
                                                <div className="col-md-12 mt-2">
                                                    <div className="row" style={{ borderBottom: '1px solid #808080' }}>
                                                        <div className="col-md-10">
                                                            <span className="modal-docname">{title}</span>
                                                        </div>
                                                        <div className="col-md-2" style={{marginTop: '-4px'}}>
                                                            <span id="analysis-btn-outside-click" 
                                                            data-dismiss="modal" 
                                                            style={{ outline: 'none', cursor: 'pointer', float: 'right' }}>
                                                                <img src="/static_images/gray-close-modal-icn.svg" alt="" />
                                                                {/* <i className="fa fa-times" aria-hidden="true"></i> */}
                                                                </span>
                                                        </div>
                                                        <div className="col-md-10" style={{ marginTop: '-8px', textAlign: 'left' }}>
                                                            <span className="label" style={{ textDecoration: 'underline' }}>
                                                                {(type === 'List' || type === 'List Dashboard') ? 'Parties' : type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {this.switchView(type)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </>
    )
}
}
            

import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { FileHierarchy } from '../../../DocumentLibrary/State/documentLibraryState';
import BarLoader from '../../Loader/barLoader';
import DocumentTree from './documentTree';

interface Props {
    currentFileId: number;
    documentTree: FileHierarchy;
    saveDocumentTree: (documentTree: FileHierarchy) => void;
}

interface State {
    docName: string;
    successBtn: boolean;
}

const testStructure: FileHierarchy = {
    "fileID": 3924,
    "levelID": 0,
    "children": [
        {
            "fileID": 4729,
            "levelID": 1,
            "children": [
                {
                    "fileID": 3956,
                    "levelID": 2,
                    "children": [],
                    "fileName": "Cree, Inc._FourthAmendmentCreditAgreement.pdf"
                },
                {
                    "fileID": 3927,
                    "levelID": 2,
                    "children": [],
                    "fileName": "Edgar_Thompson.pdf"
                },
                {
                    "fileID": 3926,
                    "levelID": 2,
                    "children": [],
                    "fileName": "India_Khivraj Tech Park Pvt. Ltd.pdf"
                },
                {
                    "fileID": 3963,
                    "levelID": 2,
                    "children": [],
                    "fileName": "Law_Insider_kite-pharma-inc_license-agreement_Filed_04-04-2014_Contract_reuploaded (1).pdf"
                }
            ],
            "fileName": "5GCC (1).pdf"
        },
        {
            "fileID": 3925,
            "levelID": 1,
            "children": [],
            "fileName": "Olapic.pdf"
        },
        {
            "fileID": 3967,
            "levelID": 1,
            "children": [],
            "fileName": "Turning Point Therapeutics, Inc._Lease.pdf"
        }
    ],
    "fileName": "ManagementDynamics.pdf"
}

export default class ViewFileHierarchyModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            docName: '',
            successBtn: false
        }
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('viewFileHierarchyModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("file-hierarchy-modal-close-btn")?.click();
                //window.location.reload();
            }
        }
    }

    render() {
         let { currentFileId, documentTree, saveDocumentTree } = this.props;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="viewFileHierarchyModal" aria-labelledby="viewFileHierarchyModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 modal-body">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="file-hierarchy-modal-close-btn" onClick={() => this.closeModal
                                        ()}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span> 
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="col-md-4 modal-title">
                                        <img className="file-hierarchy-title-img" src="/static_images/hierarchy-btn-img.svg" alt="btn-img" />
                                        {"Document Tree"}
                                        </div>
                                    <div className="col-md-7" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}></div>
                                    <div className="modal-body modal-subtitle">
                                        {documentTree.fileID ===  -1 ?
                                            <BarLoader/>

                                        :
                                            <div className="document-tree-container">
                                                <div className="document-tree">
                                                    <div className="document-tree-title-text cursor-pointer" style={{background: currentFileId === documentTree.fileID ? '#FFF5D4' :'none' }} onClick={() => window.open('/document/documentlibrary/' + btoa(documentTree.fileID.toString()), "_blank")} >
                                                        {documentTree.fileName}
                                                    </div>
                                                    <DocumentTree documentChildren={documentTree.children} currentFileId={currentFileId} saveDocumentTree={saveDocumentTree} />
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
        )
    }

    closeModal = () => {
        this.setState({docName: '', successBtn: false});
        this.props.saveDocumentTree({ 
            fileID: -1, 
            fileName: '', 
            levelID: -1, 
            children: []
        });
    }
}
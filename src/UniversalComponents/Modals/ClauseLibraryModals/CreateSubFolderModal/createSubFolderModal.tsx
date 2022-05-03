import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';

interface Props {
    parentFolderId: number;
    parentFolderName: string;
    createFolderSubHeading: (folderName: string, parentId: number) => void;
}

interface State {
    subFolderNameText: string;
}


export default class CreateSubFolderModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            subFolderNameText: ''
        }
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('createSubFolderModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("create-sub-folder-modal-close-btn")?.click();
                //window.location.reload();
            }
        }
    }

    componentDidUpdate(prevProps: Props) {
    }

    render() {
        let { parentFolderName } = this.props;
        let { subFolderNameText } = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="createSubFolderModal" aria-labelledby="createSubFolderModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 modal-body">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="create-sub-folder-modal-close-btn" onClick={() => this.closeModal
                                        ()}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span> 
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="col-md-6 modal-title">
                                        {"Creating new sub-folder"}
                                        </div>
                                    <div className="col-md-5" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}></div>
                                    <div className="modal-body modal-subtitle">
                                        <div className="row">
                                            <div className="col-md-12 mb-1 folder-heading">
                                                {"In "}<span style={{ fontWeight: 600 }}>{parentFolderName}</span> 
                                            </div>
                                            <div className="col-md-12 my-2">
                                                <div className="row">
                                                    <div className="col-md-12 ml-2 folder-heading">
                                                        Name sub-folder
                                                    </div>
                                                    <div className="col-md-8 ml-2">
                                                        <div className="row">
                                                            <div className="col-md-12 align-left">
                                                                <span className="clause-input" style={{ background: "white", border: '1px solid #DDDDDD' }} >
                                                                    <input type="text" className="clause-input" placeholder="Enter name of the folder" style={{ width: '100%', border: 'none', outline: 'none', background: "white" }} value={subFolderNameText} onChange={(e)=> this.setSubFolderName(e)} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row">
                                                    <div className="col-md-2" />
                                                    <div className="col-md-7">
                                                        <span className="upload-yellow-btn py-1 mb-4" id="save-btn" data-dismiss="modal"
                                                            onClick={() => this.createNewSubFolder()}>
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

    setSubFolderName(event: any){
        event.preventDefault();
        let subFolderName =  event.target.value;
        this.setState({ subFolderNameText: subFolderName });
    }

    createNewSubFolder(){
        let { parentFolderId } = this.props;
        let { subFolderNameText } = this.state;
        if(subFolderNameText.length > 0){
            this.props.createFolderSubHeading(subFolderNameText, parentFolderId);
            this.setState({
                subFolderNameText: ""
            });
        }
    }

    closeModal = () => {
        this.setState({
            subFolderNameText: ""
        })
    }
}
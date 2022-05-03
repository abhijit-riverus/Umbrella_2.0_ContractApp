import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';

interface Props {
    title: string;
    messageText: string;
}

interface State {
}


export default class ShowMessageModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = { 
        }
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('showMessageModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("show-message-modal-close-btn")?.click();
                //window.location.reload();
            }
        }
    }

    render() {
        let { title, messageText } = this.props;
        let { } = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="showMessageModal" aria-labelledby="showMessageModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="show-message-modal-close-btn" onClick={() => this.closeModal() }>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" style={{width: "15px", marginTop: "4px"}} />
                                        </span> 
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}></div>
                                    <div className="col-md-7 modal-title">
                                        {title}
                                        </div>
                                    <div className="col-md-4" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}></div>
                                    <div className="modal-body modal-subtitle">
                                        <div className="row">
                                            <div className="col-md-12 message-style">
                                                {messageText}
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

    closeModal = () => {
    }
}
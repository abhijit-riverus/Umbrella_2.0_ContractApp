import * as React from 'react';
import { isNullOrUndefined } from 'is-what';

interface Props {
    linkConfirmation: (confirm: boolean) => void;
}

export default class LinkParagraphModal extends React.Component<Props> {
    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false)
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('linkParaModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("link-close-btn")?.click();
            }
        }
    }

    render() {
        let { linkConfirmation } = this.props;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="linkParaModal" aria-labelledby="linkParaModal" aria-hidden="true" data-backdrop="false">
                    <div className="col-md-12 modal-dialog" style={{ marginTop: '10%', width: '25%' }}>
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 my-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="link-close-btn">
                                                    <img src="/static_images/close-modal-icn.svg" alt="close" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="modal-body modal-title" style={{ margin: '0 15%' }}>
                                            Linking this paragraph will unlink the previously linked paragraph.
                                        </div>
                                        <div className="modal-body modal-subtitle">
                                            Are you sure you want to link this paragraph?
                                        </div>
                                        <div className="modal-body modal-subtitle">
                                            <div className="row">
                                                <div className="col-md-5 align-right" style={{ lineHeight: '25px' }}>
                                                    <span data-dismiss="modal" className="mailto-riverus">Cancel</span>
                                                </div>
                                                <div className="col-md-7">
                                                    <button data-dismiss="modal" className="upload-yellow-btn" style={{ padding: '2% 3%' }} onClick={() => linkConfirmation(true)}>
                                                        Yes, do it anyway
                                                    </button>
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
        );
    }
}
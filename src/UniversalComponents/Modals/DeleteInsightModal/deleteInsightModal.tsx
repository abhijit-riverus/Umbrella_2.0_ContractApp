import * as React from 'react';
import { isNullOrUndefined } from 'is-what';

interface Props {
    deleteInsight: (confirmed: boolean) => void;
}

interface State{
}

export default class DeleteInsightModal extends React.Component<Props, State> {
    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false)
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('deleteInsightModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("delete-insight-btn")?.click();
            }
        }
    }

    render() {
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="deleteInsightModal" aria-labelledby="deleteInsightModal" aria-hidden="true" data-backdrop="false">
                    <div className="col-md-12 modal-dialog" style={{ marginTop: '10%', width: '30%', zIndex: 1000 }}>
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 my-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="delete-insight-btn">
                                                    <img src="/static_images/close-modal-icn.svg" alt="close" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="modal-body modal-title" style={{ margin: '0 15%' }}>
                                            Are you sure you want to delete!
                                        </div>
                                        <div className="confirm-delete-img">
                                            <img src="/static_images/confirm-delete-insight-icn.svg" alt="delete-insight" />
                                        </div>
                                        <div className="modal-body modal-subtitle">
                                            <div className="row">
                                                <div className="col-md-5 align-right" style={{ lineHeight: '25px' }}>
                                                    <span data-dismiss="modal" className="mailto-riverus" onClick={() => this.cancelInsightDelete()}>Cancel</span>
                                                </div>
                                                <div className="col-md-7">
                                                    <button data-dismiss="modal" className="upload-yellow-btn" style={{ padding: '3% 6%' }} onClick={() => this.confirmInsightDelete()}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="delete-insight-message">
                                            Deleting this data will permanently delete it from thes system.
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

    confirmInsightDelete(){
        this.props.deleteInsight(true);
    }

    cancelInsightDelete(){
        this.props.deleteInsight(false);
    }
}
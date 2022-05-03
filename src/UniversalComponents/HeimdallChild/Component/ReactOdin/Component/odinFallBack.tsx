import React from 'react';

interface Props {
}

export default function OdinFallBack(props: Props) {
    return (
        <div className="modal" id="fallback-modal-container">
            <div className="modal-dialog" role="document" style={{zIndex: 10}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            If you survive in battle, it is with Odin's grace, and if you fall, it is because he has betrayed you. But now, he is not letting you see this feature since you do not have clearance.
                        </h5>
                    </div>
                    <div className="modal-body">
                        <p>
                            You are seeing this because, you are an unauthorized user for the feature. Please contact the admin if you feel otherwise.
                        </p>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
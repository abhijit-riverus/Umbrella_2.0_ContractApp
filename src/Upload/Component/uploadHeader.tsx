import React from 'react';

export default function UploadHeader() {
    return (
        <div className="row upload-header-container">
            <div className="col-md-2">
                File name
            </div>
            <div className="col-md-2">
                Uploaded by
            </div>
            <div className="col-md-2">
                Uploaded on
            </div>
            <div className="col-md-2">
                Size
            </div>
            <div className="col-md-2">
                Status
            </div>
            <div className="col-md-2">
                Actions
            </div>
        </div>
    );
}
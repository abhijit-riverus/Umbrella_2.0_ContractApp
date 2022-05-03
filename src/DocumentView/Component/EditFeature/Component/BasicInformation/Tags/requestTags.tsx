import React from 'react';

export default function RequestTags() {
    return (
        <div className="row" style={{ background: 'white' }}>
            <div className="col-md-12 py-2 raise-request-container">
                Can’t find a relevant nature or type of document?<br />
                <span className="add-datapoint" style={{ fontSize: '14px' }} data-toggle="modal" data-target="#requestModal">
                    Raise a request
                    </span>&nbsp;
                    and we’ll get back to you soon!
                </div>
        </div>
    );
}
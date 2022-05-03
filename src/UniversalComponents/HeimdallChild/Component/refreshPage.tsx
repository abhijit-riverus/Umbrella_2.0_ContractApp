import * as React from 'react';

export default function RefreshPage() {
    return (
        <div id="overlay" style={{ zIndex: 7 }} >
            <div id="session-expiry" >
                <div className="row" id="session-expiry-row">
                    <div className="col-md-12 col-12" id="refresh-modal-icon">
                        <img src="/static_images/timmer-icon.svg" />
                    </div>
                    <div className="col-md-12 col-12" id="session-expiry-heading">
                        Momentary lapse of session!
                        </div>
                    <div className="col-md-12 col-12" id="session-expiry-sub-heading">
                        We apologise for the inconvenience, and welcome back!
                        </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-12" id="login-row">
                        <button id="session-expiry-button" className="cursor-pointer" onClick={() => window.location.reload()}>
                            Resume
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
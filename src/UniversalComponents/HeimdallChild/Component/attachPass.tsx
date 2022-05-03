import React from 'react'
// import { INCOMETAXSITE } from '../../../Configuration/global';

interface Props {
    activatePass: (refreshToken: string) => void;
    refreshToken: string;
}
interface State { }

export default class AttachPass extends React.Component<Props, State> {

    render() {
        let { activatePass, refreshToken } = this.props;
        return (
            <div id="overlay" style={{ zIndex: 7 }} >
                <div id="session-expiry" className="attach-pass-modal">
                    <div className="row" id="session-expiry-row">
                        <div className="col-md-12 col-12" id="refresh-modal-icon">
                            <img src="/static_images/pass-timer.svg" />
                        </div>
                        <div className="col-md-12 col-12" id="session-expiry-heading">
                            Telescope - The Ready Research Library
                        </div>
                        <div className="col-md-12 col-12" id="session-expiry-sub-heading">
                            <p>Hey there! You are about to use one of your Telescope access passes.</p>
                            <p className="mt-3">Would you like to view our Ready Research Docket?</p>
                        </div>
                        <div className="col-md-12 col-12">
                            <button id="activate-pass-button" onClick={() => activatePass(refreshToken)}>Yes, Continue</button>
                        </div>
                        <div className="col-md-12 col-12">
                            <p id="go-to-rm-button">
                                {/* <a href={INCOMETAXSITE + '/auth?token=' + refreshToken + '&redirection=' + INCOMETAXSITE}>
                                    <img src="/static_images/blue-right-arrow.svg" /> &nbsp; &nbsp; Go to Research Map instead</a> */} </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



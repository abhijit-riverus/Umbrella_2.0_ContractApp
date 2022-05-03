import React from 'react';
import { Link } from 'react-router-dom';
import { AUTHURL } from '../../../Configuration/global';
import RiverusLoader from '../../Loader/riverusLoader';

interface Props {
    productName: string;
}
interface State {
    isMobile: boolean;
}

export default class NoClaims extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isMobile: window.screen.width < 600 ? true : false,
        }
    }

    gotoButton=()=>{
        localStorage.setItem('accessToken', 'LOGOUT');
        localStorage.setItem('refreshToken', 'LOGOUT');
        /*setTimeout(() => {
            window.location.href = AUTHURL.replace("/auth", "");
        }, 1000);*/
    }

    render() {
        let { isMobile } = this.state;
        let { productName } = this.props;
        if (isMobile) {
            return (
                <div className="row">
                    <div className="col-md-12 col-12" style={{  height: '100vh', zIndex: 9 }} id="no-claims-div">
                    <div id="fall-back-container-mb">
                            <RiverusLoader percent="75%" success={true} loading={false}/>
                            <p id="fall-back-heading">{productName.toUpperCase()}</p>
                                <p id="fall-back-sub-heading">Almost There!</p>
                                <p id="fall-back-content">Get it all in one place !<br />
                                Know more about {productName} by contacting us at <a>hello@riverus.in.</a></p>
                            </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-12 col-12" style={{ height: '100vh', zIndex: 9 }} id="telescope-web-intro-page">
                        <div id="fall-back-container">
                            <RiverusLoader percent="75%" success={true} loading={false}/>
                            <p id="fall-back-heading">{productName.toUpperCase()}</p>
                                <p id="fall-back-sub-heading">Almost There!</p>
                                <p id="fall-back-content">Get it all in one place !<br />
                                Know more about {productName} by contacting us at <a>hello@riverus.in.</a></p>
                                <p id="goto-product-button" onClick={this.gotoButton}>Go back to Riverus <img src="/static_images/right-arrow.svg" /></p>
                            </div>
                    </div>
                </div>
            )
        }
    }
}
import React, { Component } from 'react';
import MobSetting from './mobSetting';
import { Link } from 'react-router-dom';

interface Props {
    toggleVisibility: (display: boolean) => void;
    userName: string;
    userDetail: any;
    refreshToken: string;
    logout: () => void;
    page: string;
}

interface State {
    display: boolean;
    isSetting: boolean;
    homePageException: string[];
    searchBarException: string[];
}

export default class MobileMenu extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            display: false,
            isSetting: false,
            homePageException: ['home'],
            searchBarException: ['home', 'judgetoc']
        };
    }
    visibleSetting = () => {
        this.setState({ isSetting: !this.state.isSetting })
    }
    render() {
        let { display, isSetting, searchBarException } = this.state;
        let { userName, refreshToken, logout, page, toggleVisibility } = this.props;
        return (
            <div className="row">
                <div className="col-12" id="mobile-menubar">
                    <div className="row">
                        <div className="col-2 text-left p-0">
                            <img alt="hamburger" src="/static_images/hamburger-icon.svg" onClick={this.visibleSetting} />
                            {isSetting && <MobSetting userName={userName} logout={logout} refreshToken={refreshToken} visibleSetting={this.visibleSetting} />}
                        </div>
                        <div className="col-8 text-center" id="mobile-header-image">
                            <a href={'/'}><img alt="" src="/static_images/mobile-menubar-logo.svg" /></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
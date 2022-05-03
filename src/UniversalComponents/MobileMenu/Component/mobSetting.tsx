import React, { PureComponent } from 'react'
import { AUTHURL } from '../../../Configuration/global';

interface Props {
    userName: string;
    logout: () => void;
    refreshToken: string;
    visibleSetting: () => void;
}

export default class MobSetting extends PureComponent<Props> {
    render() {
        let { userName, logout, refreshToken, visibleSetting } = this.props;
        return (
            <>
                <div id="mob-setting-container">
                    <div className="row">
                        <div className="col-9 scale-in-hor-left" id="mob-setting-inner-container">
                            <div className="row">
                                <div className="col-md-12 col-12" id="mob-setting-top-layer">
                                    <div className="row">
                                        <div className="col-2 text-right">
                                            <img src="/static_images/cross-mob-icon.svg" className="mt-2" onClick={visibleSetting} alt='icon' />
                                        </div>
                                        <div className="col-10 text-left p-0">
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src="/static_images/riverus-round-logo.svg" className="mt-3" alt='icon' />
                                                </div>
                                                <div className="col-9 mt-4 p-2" id="setting-detail-container">
                                                    {userName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" id="mob-setting-top-layer-2">
                                    <div className="row">
                                        <div className="col-md-6 col-6" id="setting-mob-tab-active">
                                            Settings
                            </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-12" id="mob-setting-middle-layer">
                                    <div className="row">
                                        <div className="col-12 py-2 mt-3">
                                            {/* <a target={'_blank'} href={AUTHURL.replace('/auth', '/me')}>
                                                <img src="/static_images/account-icon.svg" className="mr-2" alt='icon' /> Account</a> */}
                                        </div>
                                        <div className="col-12 py-2" onClick={() => logout()}>
                                            <img src="/static_images/signout-icon-mob.svg" className="mr-2" alt='icon' /> Sign Out
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scale-in-hor-left" id="mob-setting-bottom-layer">
                    Contact us at &nbsp; hello@riverus.com
        </div>
            </>
        )
    }
}
import * as React from 'react';
import { AUTHURL } from '../../../Configuration/global';
export interface Props {
    isLoggedIn: boolean;
    userName: string;
    logout: () => void;
}

export interface State {
    loggedIn: boolean;
    visible: boolean;
}

export default class UserSession extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loggedIn: props.isLoggedIn,
            visible: false
        };
    }
    componentWillReceiveProps(props: Props) {
        // TODO: If no user present, add condition
        this.setState({ loggedIn: props.isLoggedIn });
    }
    render() {

        var componentContent = <>User State</>;
        let { visible } = this.state;
        if (this.state.loggedIn) {
            componentContent =
                (
                    <span className="dropdown">
                        <span onClick={() => this.setState({ visible: !visible })} data-toggle="dropdown" style={{ fontSize: '12px', zIndex: 99999, cursor: 'pointer' }}>
                            {this.props.userName.toUpperCase()} &nbsp;
                    <i className="fa fa-bars" onClick={() => this.setState({ visible: !this.state.visible })} />
                        </span>
                        <div style={{ display: visible ? 'inline' : 'none' }} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="dropdown-item">
                                {/* <a style={{ color: '#4C4C4C' }} href={AUTHURL.replace('/auth', '/me')} id="disable-underline" >PROFILE</a> */}
                            </div>
                            <div className="dropdown-item" onClick={() => this.props.logout()} >
                                LOGOUT
                        </div>
                        </div>
                    </span>
                );
        } else {
            componentContent = <span> <a href={AUTHURL + '?redirect=' + window.location.origin}> Login </a> </span>;
        }
        return componentContent;
    }
}
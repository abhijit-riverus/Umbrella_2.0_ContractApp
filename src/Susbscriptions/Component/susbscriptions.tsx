import React, { Component } from 'react';
import { History } from 'history';
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon';

interface Props {
    pageWatcher: (page: string) => void;
    history: History;
}
interface State {

}
export default class Susbscriptions extends Component<Props, State> {
    componentDidMount() {
        let { pageWatcher } = this.props;
        pageWatcher('subscriptions');
    }
    render() {
        let { history } = this.props;
        return (
            <div className="row">
                <div className="col-md-1">
                    <SideNavbar history={history} />
                </div>
                <div className="col-md-11 mt-5">
                    Susbscriptions
                </div>
            </div>
        );
    }
}

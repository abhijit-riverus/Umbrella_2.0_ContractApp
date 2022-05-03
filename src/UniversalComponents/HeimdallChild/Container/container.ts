import { connect } from 'react-redux';
import Heimdall from '../Component/heimdall';
import HeimdallActionGen from '../Actions/actionGen';
import { StoreTree } from '../../../Utils/MainReducer/mainReducer';
import { History } from 'history';

interface HeimdallProps{
    children: any,
    history: History,
    url: string
}

export function mapStateToProps(appState: StoreTree, ownProps: HeimdallProps) {
    return {
        refreshToken: appState.heimdall.refreshToken,
        accessToken: appState.heimdall.accessToken,
        isLoggedIn: appState.heimdall.isLoggedIn,
        history: ownProps.history,
        refreshPage: appState.heimdall.refreshPage,
        children: ownProps.children,
        tokenClaims: appState.heimdall.claims,
        url: ownProps.url,
        attachPass: appState.heimdall.attachPass
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        reviveToken: (refreshToken: string) => dispatch(HeimdallActionGen.reviveToken(refreshToken, false)),
        dispatch: dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Heimdall);
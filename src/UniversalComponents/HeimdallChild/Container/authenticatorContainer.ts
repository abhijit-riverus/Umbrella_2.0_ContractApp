import { connect } from 'react-redux';
import Authenticator from '../Component/Authenticator';
import HeimdallActionGen from '../Actions/actionGen';
import { StoreTree } from '../../../Utils/MainReducer/mainReducer';
export function mapStateToProps(appState: StoreTree) {
    return {
        isValid: appState.heimdall.isLoggedIn,
        accessToken: appState.heimdall.accessToken
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        reviveToken: (refreshToken: string) => dispatch(HeimdallActionGen.reviveToken(refreshToken, false)),
        dispatch: dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator);
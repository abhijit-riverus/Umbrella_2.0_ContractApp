import { connect } from 'react-redux';
import { StoreTree } from '../../../Utils/MainReducer/mainReducer';
import HeimdallActionGen from '../Actions/actionGen';
import AttachPass from '../Component/attachPass';

export function mapStateToProps(appState: StoreTree) {
    return {
        refreshToken: appState.heimdall.refreshToken
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        activatePass: (refreshToken: string) => dispatch(HeimdallActionGen.activatePass(refreshToken)),
        dispatch: dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachPass);
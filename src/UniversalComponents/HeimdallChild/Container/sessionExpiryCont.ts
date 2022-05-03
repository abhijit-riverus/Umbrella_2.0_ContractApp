import { connect } from "react-redux";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import SessionExpiry from "../Component/sessionExpiry";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        logoutLoader: appState.heimdall.logoutLoader,
        claims: appState.heimdall.claims,
        appAccessAutorization: appState.heimdall.accessToken,
        isOdinRequired: false,
        revivingToken: appState.heimdall.revivingToken
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SessionExpiry);
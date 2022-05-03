import { connect } from "react-redux";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import MobileMenu from "../Component/mobileMenu";
import HeimdallActionGen from "../../HeimdallChild/Actions/actionGen";
import SearchBarActionGenerator from "../../SearchBar/Action/actionGen";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        refreshToken: appState.heimdall.refreshToken,
        userName: appState.heimdall.userName,
        page: appState.app.pageType
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        toggleVisibility: (display: boolean) => dispatch(SearchBarActionGenerator.toggleVisibility(display)),
        logout: () => dispatch(HeimdallActionGen.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
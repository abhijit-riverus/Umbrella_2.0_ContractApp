import { connect } from "react-redux";
import Menu from "../Components/Menu";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import HeimdallActionGen from "../../HeimdallChild/Actions/actionGen";
import SearchBarActionGenerator from "../../SearchBar/Action/actionGen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        history: ownProps.history,
        userName: appState.heimdall.userName,
        userEmail: appState.heimdall.userEmail,
        sessionExpired: appState.heimdall.sessionExpired,
        refreshToken: appState.heimdall.refreshToken,
        visibility: appState.searchBar.visibility,
        isLoggedIn: appState.heimdall.isLoggedIn,
        pageType: appState.app.pageType,
        platform: appState.heimdall.platform
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        logout: () => dispatch(HeimdallActionGen.logout()),
        toggleSearchBarVisibility: (visibility: boolean) => dispatch(SearchBarActionGenerator.toggleVisibility(visibility)),
        gotoUmbrella: () => dispatch(HeimdallActionGen.gotoUmbrella()),
        gotoStyllus: () => dispatch(HeimdallActionGen.gotoStyllus())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
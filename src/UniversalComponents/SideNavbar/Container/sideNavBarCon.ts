import { connect } from "react-redux";
import { SideNavbar } from "../Component/sideNavbar";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        pageType: appState.app.pageType,
        platform: appState.heimdall.platform
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideNavbar);
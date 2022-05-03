import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import AppActionGenerator from "../../App/Actions/actionGen";
import Settings from "../Component/settings";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
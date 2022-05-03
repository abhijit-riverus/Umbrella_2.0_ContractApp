import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import AppActionGenerator from "../../App/Actions/actionGen";
import Project from "../Component/project";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Project);
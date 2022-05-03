import { connect } from "react-redux";
import HistoryActionGenerator from "../../History/Actions/gen";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import IntroPage from "../Component/introPage";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        isLoggedIn: appState.heimdall.isLoggedIn,
        userUploads: appState.historyModule.userUploads
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getUserUploads: () => dispatch(HistoryActionGenerator.getUserUploads())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IntroPage);
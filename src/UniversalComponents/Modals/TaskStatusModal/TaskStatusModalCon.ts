import { connect } from "react-redux";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import TaskStatusModal from "./TaskStatusModal";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        createTaskSuccess: appState.taskManagement.createTaskSuccess
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskStatusModal);
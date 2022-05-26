import { connect } from "react-redux";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import RequestTagModal from "./requestTagModal";
import { TagRequestStructure } from "../../../DocumentView/State/documentState";
import DocumentActionGenerator from "../../../DocumentView/Actions/Gen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {

    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        requestTags: (tagList: TagRequestStructure[], comment: string) => dispatch(DocumentActionGenerator.requestTags(tagList, comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestTagModal);
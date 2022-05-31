import React from "react";
import { connect } from "react-redux";
import AppActionGenerator from "../../App/Actions/actionGen";
import DraftComponent from "../Component/DraftComponent";
export function mapStateToProps(appState: any, ownProps: any) {
    return {
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DraftComponent);
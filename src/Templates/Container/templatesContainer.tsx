import { connect } from "react-redux";
import template from "../Component/template";
import React from "react";
import AppActionGenerator from "../../App/Actions/actionGen";
export function mapStateToProps(appState: any, ownProps: any) {
    return {
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(template);
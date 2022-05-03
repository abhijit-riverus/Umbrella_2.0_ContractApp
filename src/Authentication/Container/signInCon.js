import React, { Component } from "react";
import SignIn from "../Component/signIn";
import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

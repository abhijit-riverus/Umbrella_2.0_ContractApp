import React, { Component } from "react-router";
import PrivetRoute from "./privateRoute";

const PrivetRouteHOC = (ComposedClass: any) => {
	class SecurityCheck extends Component {
		render() {
			return (
				<PrivetRoute>
					<ChildComponent />
				</PrivetRoute>
			);
		}
	}
};

export default PrivetRouteHOC;

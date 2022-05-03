import * as React from "react";
import { History } from "history";
import { AUTHURL } from "../../../Configuration/global";
import AuthLoader from "./authLoader";

interface Props {
	isValid: boolean;
	accessToken: string;
	history: History;
	reviveToken: (refreshToken: string) => void;
}
interface State {
	redirection: string;
	token: string;
	redirected: boolean;
}

export default class Authenticator extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			redirected: false,
			token: "",
			redirection: "",
		};
	}
	componentWillMount() {
		var url = window.location.href;
		var redirection = "";
		var token = "";
		if (
			url.includes("redirection") &&
			url.split("redirection=")[1] !== undefined
		) {
			redirection = url.split("redirection=")[1];
			this.setState({ redirection: redirection });
		}
		if (
			url.includes("token") &&
			url.split("token=")[1].split("&redirection")[0] !== undefined
		) {
			token = url.split("token=")[1].split("&redirection")[0];
			this.setState({ token: token });
			this.props.reviveToken(token);
		}
	}
	componentWillReceiveProps(nextProps: Props) {
		if (!this.state.redirected) {
			if (
				nextProps.accessToken.length > 0 &&
				nextProps.accessToken !== "LOGOUT"
			) {
				window.location.href = this.state.redirection;
				this.setState({ redirected: true });
			}
		}
		/*if (!nextProps.isValid) {
            setTimeout(() => { window.location.href = AUTHURL.replace('auth', 'login'); }, 2000);
        }*/
	}

	logout = () => {
		// setTimeout(() => {
		// 	window.location.href = AUTHURL.replace("auth", "login");
		// }, 2000);
	};
	render() {
		let { isValid } = this.props;
		return (
			<>
				{isValid && (
					<div className="row">
						<div className="col-md-12 text-center" id="auth-image">
							<img src="/static_images/window-1.svg" />
							<AuthLoader />
							<img src="/static_images/window-2.svg" />
						</div>
					</div>
				)}
				{!isValid && (
					<div className="row">
						<div className="col-md-12 text-center" id="auth-image">
							<img src="/static_images/window-1.svg" />
							{/* <AuthLoader /> */}
							{this.logout()}
							<img src="/static_images/window-2.svg" />
						</div>
					</div>
				)}
			</>
		);
	}
}

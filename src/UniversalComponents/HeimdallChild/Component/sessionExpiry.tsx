import * as React from "react";
import { AUTHURL } from "../../../Configuration/global";

interface Props {
	logoutLoader: boolean;
	claims: string[];
	appAccessAutorization: string;
	isOdinRequired: boolean;
	revivingToken: boolean;
}

export default class SessionExpiry extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
	}
	/*componentDidMount(){
        if(localStorage.getItem('accessToken') === "LOGOUT"){
            setTimeout(() => {
                window.location.href = AUTHURL + '?redirection=' + window.location.href + '&origin=' + window.location.origin;
            }, 3000);
        }
    }*/
	logoutAndClearSession() {
		localStorage.setItem("accessToken", "LOGOUT");
		localStorage.setItem("refreshToken", "LOGOUT");
		setTimeout(() => {
			window.location.href =
				AUTHURL +
				"?redirection=" +
				window.location.href +
				"&origin=" +
				window.location.origin;
		}, 1000);
	}
	render() {
		let {
			logoutLoader,
			isOdinRequired,
			claims,
			appAccessAutorization,
			revivingToken,
		} = this.props;
		return (
			<div className="row">
				<div className="col-12 col-md-12" id="overlay">
					<div id="session-expiry">
						<div className="row" id="session-expiry-row">
							<div
								className="col-md-12 col-12"
								id="refresh-modal-icon"
							>
								<img src="/static_images/timmer-icon.svg" />
							</div>
							<div
								className="col-md-12 col-12"
								id="session-expiry-heading"
							>
								Session obscured by time!
							</div>
							<div
								className="col-md-12 col-12"
								id="session-expiry-sub-heading"
							>
								It’s been a while since we last saw you, so to
								keep things secure, the session was logged out.
								Welcome back!
							</div>
						</div>
						<div className="row">
							<div className="col-md-12" id="login-row">
								{logoutLoader ? (
									"Logging you out..."
								) : (
									<span
										onClick={() =>
											this.logoutAndClearSession()
										}
										className="cursor-pointer"
									>
										<button id="session-expiry-button">
											Login
										</button>
									</span>
								)}
							</div>
						</div>
						{isOdinRequired && !revivingToken && (
							<div className="row">
								<div className="col-md-12">
									{claims.indexOf(appAccessAutorization) >
										-1 && (
										<div className="row">
											{/*<div className="col-md-12 col-12 col-sm-12">
                                                You do not have access to this product. Please <a href={AUTHURL.replace('auth', 'pricing')}>subscribe</a> or contact us for further support
                                                </div> */}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

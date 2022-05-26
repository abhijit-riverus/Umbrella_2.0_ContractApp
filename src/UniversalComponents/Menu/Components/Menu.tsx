import React from "react";
import { History } from "history";
import UserInfo from "./userInfo";
import Notification from "../../Notification/Container/notificationCon";
import { AUTHURL } from "../../../Configuration/global";
import { UMBRELLA } from "../../HeimdallChild/Actions/definitions";

interface Props {
	pageType: string;
	history: History;
	visibility: boolean;
	isLoggedIn: boolean;
	match: any;
	sessionExpired: boolean;
	refreshToken: string;
	userName: string;
	userEmail: string;
	logout: () => void;
	toggleSearchBarVisibility: (visibility: boolean) => void;
	gotoUmbrella: () => void;
	gotoStyllus: () => void;
	platform: string;
}

export default class Menu extends React.Component<Props> {
	render() {
		let {
			logout,
			userName,
			userEmail,
			toggleSearchBarVisibility,
			visibility,
			pageType,
			platform,
			gotoStyllus,
			gotoUmbrella,
			isLoggedIn
		} = this.props;
		return (
			<div className="row">
				<div className="col-md-12 web-menu-container">
					<div className="row">
						<div className="col-md-3">
							<span className="web-riverus-image">
								{/* <a
									href={AUTHURL.replace("/auth", "")}
									target="_blank"
									rel="noopener noreferrer"
								> */}
								<a href="/">
									<img
										alt="icon"
										className="mt-2"
										src="/static_images/web-menubar-logo.svg"
									/>
								</a>
							</span>
							<span>
								<a href="/">
									{platform == UMBRELLA ? <img
										alt="icon"
										className="mt-2 ml-2"
										src="/static_images/web-menubar-contracts-icon.svg"
									/> : <img
										alt="icon"
										className="mt-2 ml-2"
										src="/static_images/styllus_menu_bar_icn.svg"
									/>}
								</a>
							</span>
						</div>
						<div className="col-md-9 pr-0 generic-web-menu">
							{isLoggedIn && platform == UMBRELLA ?
								<button type="button" className="btn btn-warning navigate-btn mb-2" onClick={() => {
									gotoStyllus();
									this.props.history.push('/templates')
								}}>Go to Stylus</button>
								: <button type="button" className="btn btn-warning navigate-btn mb-2" onClick={() => {
									gotoUmbrella();
									window.location.href = "/dashboard"
								}}>Go to Umbrella</button>}
							<div
								className="generic-web-menu-item"
								onClick={() =>
									toggleSearchBarVisibility(!visibility)
								}
								style={{
									borderBottom:
										pageType === "search"
											? "4px solid #996C84"
											: "none",
								}}
							>
								<img
									src={
										pageType === "search"
											? "/static_images/search-inline-icn.svg"
											: "/static_images/web-menubar-search-icon.svg"
									}
									alt="search-icon"
								/>
							</div>
							<Notification userEmail={userEmail} />
							<UserInfo logout={logout} userName={userName} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

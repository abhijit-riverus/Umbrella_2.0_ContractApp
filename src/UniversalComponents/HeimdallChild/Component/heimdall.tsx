import * as React from "react";
import { History } from "history";
import { AUTHURL } from "../../../Configuration/global";
import StorageEvents from "../HeimdallUtil/heimdallUtil";
import RefreshPage from "./refreshPage";
import AttachPass from "../Container/passContainer";

interface Props {
	history: History;
	refreshToken: string;
	accessToken: string;
	isLoggedIn: boolean;
	dispatch: any;
	reviveToken: (refreshToken: string) => void;
	children: any;
	refreshPage: boolean;
	tokenClaims: string[];
	url: string;
	attachPass: boolean;
}
interface State {
	token: string;
	revived: boolean;
}

export default class Heimdall extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			token: this.props.refreshToken,
			revived: false,
		};
	}
	componentWillMount() {
		this.checkURL();
	}
	componentDidMount() {
		let { dispatch } = this.props;
		this.getAndReviveToken();
		window.addEventListener(
			"storage",
			StorageEvents.listenStorageChange(dispatch)
		);
	}
	// shouldComponentUpdate(nextProps: Props) {
	//     if (nextProps.accessToken !== this.props.accessToken) {
	//         return false;
	//     } else {
	//         return true;
	//     }
	// }
	componentWillReceiveProps(NextProps: Props) {
		if (NextProps.url !== this.props.url) {
			this.props.reviveToken(this.props.refreshToken);
		}
	}
	componentDidUpdate() {
		this.getAndReviveToken();
	}
	render() {
		let { children, refreshPage, attachPass } = this.props;
		return (
			<>
				{children}
				{refreshPage && <RefreshPage />}
				{attachPass && <AttachPass />}
			</>
		);
	}
	checkURL() {
		let location = window.location.href;
		var extracted = {
			token: this.state.token,
		};
		if (location.includes("token")) {
			extracted.token = location.split("?token=")[1].split("&")[0];
		}
		this.setState({
			token: extracted.token,
		});
	}
	public getAndReviveToken() {
		let { token, revived } = this.state;
		if (
			token === undefined ||
			token === null ||
			token === "" ||
			token === "LOGOUT"
		) {
			var location = "";
			location =
				AUTHURL +
				"?redirection=" +
				window.location.href +
				"&origin=" +
				window.location.origin;
			window.location.href = location;
		} else if (!revived) {
			this.props.reviveToken(token);
			this.setState({ revived: true });
		}
	}
}

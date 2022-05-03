// import React, { Component } from "react";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import {
// 	getCustomKeyCloakByRealm,
// 	keycloak,
// } from "../../Configuration/keycloak";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Nav from "../../Keycloak/Component/nav";
// import WelcomePage from "../../Keycloak/Pages/homePage";
// import SecuredPage from "../../Keycloak/Pages/securedPage";
// import PrivateRoute from "../../Keycloak/Helpers/privateRoute.js";
// import PrivetRouteHOC from "../../Keycloak/Helpers/privateRoute";
// import {
// 	getKeyCloakRealmFromLS,
// 	removeKeyCloakRealmOnLS,
// } from "../../Authentication/Actions/authentication";
// import LoginPage from "../../Authentication/Container/signInCon";
// import { useKeycloak } from "@react-keycloak/web";
// const keycloakProviderInitConfig = {
// 	onLoad: "check-sso",
// };
// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		const keyCloakRealm = getKeyCloakRealmFromLS();
// 		this.state = {
// 			keycloak:
// 				keyCloakRealm && keyCloakRealm.length > 0
// 					? getCustomKeyCloakByRealm(keyCloakRealm)
// 					: null,
// 		};
// 	}
// 	onKeyCloakSubmit = async (realmName) => {
// 		const realmNameOnLS = await getKeyCloakRealmFromLS();
// 		console.log(
// 			"🚀 ~ file: KeycloackApp.js ~ line 26 ~ App ~ realmName",
// 			realmName,
// 			realmNameOnLS
// 		);

// 		if (realmName === realmNameOnLS) {
// 			this.setState({
// 				keycloak: getCustomKeyCloakByRealm(realmName),
// 			});
// 			// const { keycloak } = useKeycloak();
// 			// keycloak.login();
// 		}
// 	};
// 	onKeyCloakReset = () => {
// 		removeKeyCloakRealmOnLS();
// 	};
// 	onKeycloakEvent = (event, error) => {
// 		console.log("onKeycloakEvent", event, error);
// 		// On Logout
// 		if (event === "onAuthLogout") {
// 			// Cleanup stored Keycloak realm name
// 			localStorage.removeItem("kcRealm");

// 			// Cleanup keycloak instance
// 			this.setState({
// 				keycloak: null,
// 			});
// 		}
// 	};
// 	onKeycloakTokens = (tokens) => {
// 		console.log("onKeycloakTokens", tokens);
// 	};

// 	render() {
// 		// this.onKeyCloakReset();
// 		const { keycloak } = this.state;
// 		console.log(
// 			"🚀 ~ file: KeycloackApp.js ~ line 41 ~ App ~ render ~ keycloak",
// 			keycloak
// 		);
// 		return (
// 			<div>
// 				{keycloak && (
// 					<ReactKeycloakProvider
// 						authClient={keycloak}
// 						initConfig={keycloakProviderInitConfig}
// 						onEvent={this.onKeycloakEvent}
// 						onTokens={this.onKeycloakTokens}
// 					>
// 						<Nav
// 							onKeyCloakReset={() => {
// 								// this.onKeyCloakReset();
// 							}}
// 						/>
// 						<BrowserRouter>
// 							<Switch>
// 								<Route exact path="/" component={WelcomePage} />

// 								<PrivateRoute>
// 									<Route
// 										path="/secured"
// 										component={SecuredPage}
// 									/>
// 								</PrivateRoute>
// 							</Switch>
// 						</BrowserRouter>
// 					</ReactKeycloakProvider>
// 				)}
// 				{!keycloak && (
// 					<LoginPage onKeyCloakSubmit={this.onKeyCloakSubmit} />
// 					// <Switch>
// 					// 	<Route exact path="/login" component={loginPage} />
// 					// </Switch>
// 				)}
// 			</div>
// 		);
// 	}
// }

// export default App;

import Nav from "../../Keycloak/Component/nav";
import WelcomePage from "../../Keycloak/Pages/homePage";
import SecuredPage from "../../Keycloak/Pages/securedPage";
import { keycloak } from "../../Configuration/keycloak";
import PrivateRoute from "../../Keycloak/Helpers/privateRoute.js";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
	setLocalStorage,
	getLocalStorage,
} from "../../Authentication/Actions/authentication";

function App() {
	const onKeycloakTokens = (tokens) => {
		if (tokens && tokens.idToken) {
			setLocalStorage("accessToken", tokens.token);
			setLocalStorage("refreshToken", tokens.refreshToken);
		}
	};

	return (
		<div>
			<ReactKeycloakProvider
				authClient={keycloak}
				onTokens={onKeycloakTokens}
			>
				<Nav />
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={WelcomePage} />
						<PrivateRoute>
							<Route path="/secured" component={SecuredPage} />
						</PrivateRoute>
					</Switch>
				</BrowserRouter>
			</ReactKeycloakProvider>
		</div>
	);
}

export default App;

import React, { Suspense } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Menu from "../../UniversalComponents/Menu/Container/MenuCon";
import SessionExpiry from "../../UniversalComponents/HeimdallChild/Container/sessionExpiryCont";
import ReactOdin from "../../UniversalComponents/HeimdallChild/Component/ReactOdin/Component/reactOdin";
import Heimdall from "../../UniversalComponents/HeimdallChild/Container/container";
import { FREEROUTES, ROUTES } from "../../Configuration/routes";
import searchBarCon from "../../UniversalComponents/SearchBar/Container/searchBarCon";
import { isNullOrUndefined } from "is-what";
import MobileMenu from "../../UniversalComponents/MobileMenu/Component/mobileMenu";
import LogoutModal from "../../UniversalComponents/HeimdallChild/Component/logoutModal";
import NoClaims from "../../UniversalComponents/HeimdallChild/Component/noClaims";
import PrivateRoute from "../../Keycloak/Helpers/privateRoute.js";
import {
  // keycloak,
  getCustomKeyCloakByRealm,
} from "../../Configuration/keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../Authentication/Actions/authentication";
import {
  getKeyCloakRealmFromLS,
  removeKeyCloakRealmOnLS,
} from "../../Authentication/Actions/authentication";
import { useKeycloak } from "@react-keycloak/web";
const history = createBrowserHistory();

interface Props {
  isLoggedIn: boolean;
  refreshPage: boolean;
  tokenClaims: string[];
  visibility: boolean;
  toggleSearchBarVisibility: (visibility: boolean) => void;
  logoutLoader: boolean;
}

interface State {
  width: number;
  isMobile: boolean;
  realmName: String;
  keycloak: any;
}
const KeycloakHook = () => {
  const { keycloak, initialized } = useKeycloak();
  return keycloak;
};
// console.log("huuuuu88899999");
// console.log("+++++", getCustomKeyCloakByRealm("nzc"));
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const keyCloakRealm = getKeyCloakRealmFromLS();
    // console.log("keyCloakRealm", keyCloakRealm);
    this.state = {
      width: window.screen.width,
      isMobile: window.screen.width < 600,
      realmName: "",
      keycloak:
        keyCloakRealm && keyCloakRealm.length > 0
          ? getCustomKeyCloakByRealm(keyCloakRealm)
          : null,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    if (window.screen.width !== this.state.width) {
      window.location.reload();
    }
  };
  onKeycloakTokens = (tokens: any) => {
    if (tokens && tokens.idToken) {
      setLocalStorage("accessToken", tokens.token);
      setLocalStorage("refreshToken", tokens.refreshToken);
    }
  };
  handleKeycloakRealmNameChange = (realmName: String) => {
    console.log("🚀 ~ file: App.tsx ~ line 65 ~ App ~ realmName", realmName);
    this.setState({
      realmName: realmName,
      keycloak:
        realmName && realmName.length > 0
          ? getCustomKeyCloakByRealm(realmName)
          : null,
    });
    const keycloak = KeycloakHook();
    keycloak.login();
  };
  render() {
    let { isLoggedIn, tokenClaims, visibility, logoutLoader, refreshPage } =
      this.props;
    let { isMobile } = this.state;

    return (
      <ReactKeycloakProvider
        authClient={this.state.keycloak}
        onTokens={this.onKeycloakTokens}
      >
        <div style={{ fontFamily: "Arial" }}>
          <div className="container-fluid static-content">
            <Router history={history}>
              {isMobile ? (
                <Route path={"*"} component={MobileMenu} />
              ) : (
                <Route path={"*"} component={Menu} />
              )}
            </Router>
          </div>
          <div
            className="container-fluid"
            style={{ position: "absolute", marginLeft: "0px" }}
          >
            <Router history={history}>
              <Route path={"*"} component={searchBarCon} />
            </Router>
          </div>
          <div
            id={visibility ? "app-overlay" : "app-boundary"}
            style={{ zIndex: 999 }}
            onClick={() => this.removeOverlay()}
          />
          {!isLoggedIn &&
            !logoutLoader &&
            !window.location.href.includes("?token") && <SessionExpiry />}
          {logoutLoader && !refreshPage && <LogoutModal />}
          <div className="container-fluid">
            {isLoggedIn && (
              <PrivateRoute
                handleKeycloakRealmNameChange={
                  this.handleKeycloakRealmNameChange
                }
              >
                <Router history={history}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      {ROUTES.map((route, i) => (
                        <Route
                          key={i}
                          path={route.path}
                          component={route.component}
                          exact={route.exact}
                        />
                      ))}
                    </Switch>
                  </Suspense>
                </Router>
              </PrivateRoute>

              // <Heimdall history={history} url={window.location.href}>
              // <TestView />
              // </Heimdall>
              // 	<ReactOdin
              // 		claims={tokenClaims}
              // 		allegiance="/products/production.contracts.riverus.in;0"
              // 		fallBack={
              // 			<NoClaims productName={"Contracts"} />
              // 		}
              // 	>
              // 		<Router history={history}>
              // 			</Suspense>
              // 	</ReactOdin>
            )}
          </div>
          <Router history={history}>
            <Switch>
              {FREEROUTES.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                />
              ))}
            </Switch>
          </Router>
        </div>
      </ReactKeycloakProvider>
    );
  }
  removeOverlay() {
    let a = document.getElementById("app-overlay");
    if (!isNullOrUndefined(a)) {
      a.id = "app-boundary";
      this.props.toggleSearchBarVisibility(false);
    }
  }
}

const TestView = () => {
  return <h1>Hello World</h1>;
};

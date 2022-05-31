import React, { Suspense, useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
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
import { getCustomKeyCloakByRealm } from "../../Configuration/keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../Authentication/Actions/authentication";
import {
  getKeyCloakRealmFromLS,
  setKeyCloakRealmOnLS,
  removeKeyCloakRealmOnLS,
} from "../../Authentication/Actions/authentication";
import { KeycloakProvider } from "../../Keycloak/lib";
import Nav from "../../Keycloak/Component/nav";
import { useKeycloak } from "../../Keycloak/lib";
import {
  STYLLUS,
  UMBRELLA,
} from "../../UniversalComponents/HeimdallChild/Actions/definitions";

const history = createBrowserHistory();

console.log(
  "getCustomKeyCloakByRealm*******11222333",
  getCustomKeyCloakByRealm
);

interface Props {
  isLoggedIn: boolean;
  refreshPage: boolean;
  tokenClaims: string[];
  visibility: boolean;
  toggleSearchBarVisibility: (visibility: boolean) => void;
  logoutLoader: boolean;
  platform: string;
}

interface State {
  width: number;
  isMobile: boolean;
  realmName: String;
  keycloakConfig: any;
}
const keycloakProviderInitConfig = {
  onLoad: "login-required",
};

const App = (props: Props) => {
  console.log(
    "🚀 ~ file: AppFunctional.tsx ~ line 58 ~ App ~ props",
    window.location.href
  );
  const keyCloakRealm = getKeyCloakRealmFromLS();
  console.log(
    "🚀 ~ file: AppFunctional.tsx ~ line 56 ~ App ~ keyCloakRealm",
    keyCloakRealm
  );
  const [isMobile, setIsMobile] = useState(window.screen.width < 600);
  const [width, setWidth] = useState(window.screen.width);
  // const [realmName, setRealmName] = useState("");
  const [keycloakConfig, setKeycloakConfig] = useState(
    keyCloakRealm && keyCloakRealm.length > 0
      ? getCustomKeyCloakByRealm(keyCloakRealm)
      : null
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

  const handleWindowSizeChange = () => {
    if (window.screen.width !== width) {
      window.location.reload();
    }
  };
  const setupKeycloakWithConfig = () => {};
  const onKeycloakTokens = (tokens: any) => {
    console.log(
      "🚀 ~ file: AppFunctional.tsx ~ line 82 ~ onKeycloakTokens ~ tokens",
      tokens
    );
    // console.log(JSON.stringify(tokens.token));
    // console.log("_____________");
    if (tokens && tokens.idToken) {
      setLocalStorage("accessToken", tokens.token);
      setLocalStorage("refreshToken", tokens.refreshToken);
    }
  };
  const removeOverlay = (props?: any) => {
    let a = document.getElementById("app-overlay");
    if (!isNullOrUndefined(a)) {
      a.id = "app-boundary";
      props.toggleSearchBarVisibility(false);
    }
  };
  const handleKeycloakRealmNameChange = (realmName: String) => {
    setKeyCloakRealmOnLS(realmName.toString());
    // setRealmName(realmName.toString());
    console.log("realName", realmName);
    setKeycloakConfig(
      realmName && realmName.length > 0
        ? getCustomKeyCloakByRealm(realmName)
        : null
    );
    // const [keycloak] = useKeycloak();
    // keycloak.login();
  };

  let {
    isLoggedIn,
    tokenClaims,
    visibility,
    logoutLoader,
    refreshPage,
    platform,
  } = props;
  console.log("keycloakConfig", keycloakConfig);
  const realmName = window.location.href.split("/")[3];
  if (keycloakConfig)
    return (
      <ReactKeycloakProvider
        authClient={keycloakConfig}
        onTokens={onKeycloakTokens}
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
            onClick={() => removeOverlay()}
          />
          {!isLoggedIn &&
            !logoutLoader &&
            !window.location.href.includes("?token") && <SessionExpiry />}
          {logoutLoader && !refreshPage && <LogoutModal />}
          <div className="container-fluid">
            {isLoggedIn && (
              <PrivateRoute
                handleKeycloakRealmNameChange={handleKeycloakRealmNameChange}
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
  else
    return (
      <Nav handleKeycloakRealmNameChange={handleKeycloakRealmNameChange} />
    );
};

export default App;

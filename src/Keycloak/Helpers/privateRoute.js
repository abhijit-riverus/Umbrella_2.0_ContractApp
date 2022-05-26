// import { useKeycloak } from "../lib";
import { useKeycloak } from "@react-keycloak/web";
import Nav from "../../Keycloak/Component/nav";
import axios from "axios";
import {
  getKeyCloakRealmFromLS,
  removeKeyCloakRealmOnLS,
} from "../../Authentication/Actions/authentication";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import BarLoader from "../../UniversalComponents/Loader/barLoader";

// import {} from "../../UniversalComponents/Notification/Saga/notificationSaga";

import {
  notificationWatcher,
  getData,
} from "../../UniversalComponents/Notification/Saga/notificationSaga";

import {
  getLocalStorage,
  setUserId,
  getUserId,
} from "../../Authentication/Actions/authentication";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleWare = createSagaMiddleware();

const PrivateRoute = ({ handleKeycloakRealmNameChange, children }) => {
  const { keycloak } = useKeycloak();
  // console.log("+++++++++++++++++++++==============", keycloak);
  const [isLoading, setIsLoading] = useState(true);
  const keycloakRealmName = getKeyCloakRealmFromLS();
  const isLoggedIn = keycloak.authenticated;
  // console.log("============>>><<<<<<", JSON.stringify(keycloak));
  // var authenticatedUser = keycloak.idTokenParsed.name;
  // console.log("authenticatedUser", authenticatedUser);
  /* console.log(
    "iiiiiii+++++===>",
    keycloak,
    keycloak.clientId,
    keycloak.idToken,
    "========",
    keycloak.refreshTokenParsed.scope,
    "uuuuuu+++++"
  );*/
  const [loadingTime, setLoadingTime] = useState(0);
  const handleKeycloakRedirection = () => {
    // console.log("uuuuuuuuuuuuuuuuuuuu", keycloak);
    if (keycloak && !isLoggedIn) {
      // console.log(keycloak);
      // console.log("keycloak login data", keycloak);
      keycloak.login();
    }
  };
  // const handleRealmNameReset = () => {

  // };

  async function test_data() {
    const options = {
      headers: {
        Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
        // Origin: process.env.REACT_APP_HOST,
      },
    };

    const url_data = "http://localhost:8000/api/v1/contracts/";
    await axios
      .get(url_data, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        if (response.status == 200) {
          // setUserId("user_id", response.data.user_id);
          console.log("User Details****", response);
        }
        return response;
        // return response.json();
      })
      .then(function (data) {})
      .catch(function (err) {
        console.log(err);
      });
  }

  async function get_Data() {
    // console.log(
    //   "logged Innnnnn +++++;;;;;;;;;;;;;;;;;;;;",
    //   localStorage.getItem("user_id")
    // );
    const options = {
      headers: {
        Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
        // Origin: process.env.REACT_APP_HOST,
      },
    };

    const url_data =
      process.env.REACT_APP_SITE_API +
      "users/" +
      localStorage.getItem("user_id") +
      "/";
    await axios
      .get(url_data, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        // console.log(
        //   "logged Innnnnn +++++",
        //   response,
        //   "-*******",
        //   response.status,
        //   response.data.user_id
        // );
        if (response.status == 200) {
          setUserId("user_id", response.data.user_id);
          console.log("User Details", response);
          // test_data();
          // console.log(
          //   "sample *****logged Innnnnn +++++ goto user profile",
          //   response
          // );
          // notificationWatcher();
          // notificationWatcher();
          // getData(response.data.user_id);
          // get_Data();
          // sagaMiddleWare.run(notificationWatcher);
          // getUserProfileID();
          // console.log("logged Innnnnn +++++77");
        }
        return response;
        // return response.json();
      })
      .then(function (data) {
        // console.log("logged Innnnnn +++++====", data);
        if (data === "success") {
          // console.log("logged Innnnnn +++++", data);
          //this.setState({ msg: "User has been deleted." });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  async function getUserId() {
    // console.log("logged Innnnnn +++++", getLocalStorage(`accessToken`));
    const options = {
      headers: {
        Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
        // Origin: process.env.REACT_APP_HOST,
      },
    };
    const url_data =
      process.env.REACT_APP_SITE_API + "contracts/useridbytoken/";
    axios
      .get(url_data, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        // console.log(
        //   "logged Innnnnn +++++",
        //   response,
        //   "-*******",
        //   response.status,
        //   response.data.user_id
        // );
        if (response.status == 200) {
          setUserId("user_id", response.data.user_id);
          console.log("Get User Id ", response);
          // console.log("logged Innnnnn +++++ goto user profile");
          // notificationWatcher();
          // notificationWatcher();
          // getData();
          get_Data();
          // sagaMiddleWare.run(notificationWatcher);
          // getUserProfileID();
          // console.log("logged Innnnnn +++++77");
        }
        return response;
        // return response.json();
      })
      .then(function (data) {
        // console.log("logged Innnnnn +++++====", data);
        if (data === "success") {
          // console.log("logged Innnnnn +++++", data);
          //this.setState({ msg: "User has been deleted." });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log(loadingTime, isLoggedIn);
    if (isLoggedIn === true) {
      getUserId();
      // notificationWatcher();
      // sagaMiddleWare.run(notificationWatcher);
      // console.log("logged Innnnnn");
    } else if (loadingTime === 1 && isLoggedIn === false) {
      alert("Error connection. Check your client id again!");
    } else if (loadingTime === 1) {
      alert("Error connection. Check your client id again!");
      removeKeyCloakRealmOnLS();
      window.location.reload();
    }
  }, [loadingTime]);
  if (isLoggedIn === true) {
    return children;
  } else if (isLoggedIn === false) {
    return (
      <RedirectToKeycloak
        keycloakRealmName={keycloakRealmName}
        handleKeycloakRedirection={handleKeycloakRedirection}
        handleKeycloakRealmNameChange={handleKeycloakRealmNameChange}
      />
    );
  } else {
    setTimeout(() => {
      setLoadingTime(1);
    }, 10000);

    return (
      <div className="">
        <BarLoader />
      </div>
    );
  }
};

const RedirectToKeycloak = (props) => {
  // props.handleKeycloakRedirection();
  const [realmName, setRealmName] = useState(props.keycloakRealmName);
  return (
    <Container>
      <Row>
        <Col sm={3}></Col>
        <Col className="realm-input-view">
          <h4>Continue to Client/Organization {props.keycloakRealmName}</h4>
          <hr />

          <Button
            size="sm"
            onClick={() => {
              props.handleKeycloakRedirection();
            }}
          >
            LOGIN
          </Button>
          <hr />
          <Row>
            <Col sm={12}>
              <h6>Select Another Client/Organization</h6>

              {/* </Col>
						<Col sm={6}> */}
              <input
                type="text"
                value={realmName}
                onChange={(e) => {
                  setRealmName(e.target.value);
                }}
              />
            </Col>
          </Row>

          <br />
          <Button
            size="sm"
            onClick={() => {
              console.log("click");
              props.handleKeycloakRealmNameChange(realmName);
            }}
          >
            Continue
          </Button>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default PrivateRoute;

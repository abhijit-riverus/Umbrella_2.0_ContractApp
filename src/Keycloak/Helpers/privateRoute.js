// import { useKeycloak } from "../lib";
import { useKeycloak } from "@react-keycloak/web";
import Nav from "../../Keycloak/Component/nav";
import {
	getKeyCloakRealmFromLS,
	removeKeyCloakRealmOnLS,
} from "../../Authentication/Actions/authentication";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
const PrivateRoute = ({ handleKeycloakRealmNameChange, children }) => {
	const { keycloak } = useKeycloak();
	const [isLoading, setIsLoading] = useState(true);
	const keycloakRealmName = getKeyCloakRealmFromLS();
	const isLoggedIn = keycloak.authenticated;
	const [loadingTime, setLoadingTime] = useState(0);
	const handleKeycloakRedirection = () => {
		if (keycloak && !isLoggedIn) {
			console.log(keycloak);
			keycloak.login();
		}
	};
	// const handleRealmNameReset = () => {

	// };
	useEffect(() => {
		console.log(loadingTime, isLoggedIn);
		if (isLoggedIn === true) {
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
					<h4>
						Continue to Client/Organization{" "}
						{props.keycloakRealmName}
					</h4>
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

import React, { useState } from "react";
// import { useKeycloak } from "@react-keycloak/web";
import { Container, Row, Col, Button } from "react-bootstrap";
const Nav = (props) => {
	// const { keycloak, initialized } = useKeycloak();
	const { handleKeycloakRealmNameChange } = props;
	const [realmName, setRealmName] = useState("");
	return (
		<Container>
			<Row>
				<Col sm={3}></Col>
				<Col className="realm-input-view">
					{/* {!keycloak.authenticated && ( */}
					<div>
						<h1>AUTHENTICATION</h1>
						<hr />
						<Row>
							<Col>
								<label>Your Client/Organization name</label>
							</Col>
							<Col>
								<input
									style={{ width: "100%" }}
									type="text"
									value={realmName}
									onChange={(e) => {
										setRealmName(e.target.value);
									}}
								/>
							</Col>
						</Row>
						<br />

						<br />
						<Button
							type="button"
							onClick={() => {
								handleKeycloakRealmNameChange(realmName);
							}}
						>
							Continue
						</Button>
					</div>
					{/* )} */}
				</Col>
				<Col sm={3}></Col>
			</Row>
		</Container>
	);
};

export default Nav;

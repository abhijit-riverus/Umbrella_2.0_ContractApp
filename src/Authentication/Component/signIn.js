import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { setKeyCloakRealmOnLS } from "../Actions/authentication";
const SignIn = (props) => {
	const [realmName, setRealmName] = useState("");
	const { onKeyCloakSubmit } = props;
	const handleKeyCloakSubmit = async () => {
		if (realmName && realmName.length > 0) {
			await setKeyCloakRealmOnLS(realmName);
			onKeyCloakSubmit(realmName);
		} else {
			alert("Client Id can not be empty!");
		}
	};
	return (
		<Container>
			<Row>
				<Col sm="3"></Col>
				<Col sm="6" className="sign-in-view">
					<h2>AUTHENTICATION</h2>
					<hr />
					<Row>
						<Col sm="4">
							<label>Client Name</label>
						</Col>

						<Col sm="8">
							<input
								className="full-width-text-input"
								type="text"
								value={realmName}
								onChange={(e) => {
									setRealmName(e.target.value);
								}}
							/>
						</Col>
					</Row>
					<br />
					<small>
						Client/Organization Name only contains small case
						letters with hyphens(-)/underscore(_) instead of spaces.
					</small>
					<br />
					<br />
					<Button
						type="submit"
						onClick={() => {
							handleKeyCloakSubmit();
						}}
					>
						Continue to Log In
					</Button>
				</Col>
				<Col sm="3"></Col>
			</Row>
		</Container>
		// <div className="row">
		// 	<div className="col-12 col-md-12" id="overlay">
		// 		<div id="session-expiry">
		// 			<div className="row" id="session-expiry-row">
		// 				<div className="col-md-12 col-12">
		// 					<h2>Authentication</h2>
		// 				</div>
		// 				<hr />
		// 				<div className="col-md-4 col-4">Client Name</div>
		// 				<div className="col-md-8 col-8">
		// 					<input
		// 						type="text"
		// 						value={clientId}
		// 						onChange={(e) => {
		// 							setClientId(e.target.value);
		// 						}}
		// 					/>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};
export default SignIn;

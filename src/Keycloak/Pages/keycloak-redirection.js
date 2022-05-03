import React, { useCallback, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { withKeycloak } from "../lib";

const KeycloakRedirection = withRouter(
	withKeycloak(({ keycloak, location }) => {
		const login = useCallback(() => {
			keycloak.login();
		}, []);

		return (
			<div>
				<button type="button" onClick={login}>
					Login
				</button>
			</div>
		);
	})
);

export default KeycloakRedirection;

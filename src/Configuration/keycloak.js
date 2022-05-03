import Keycloak from "keycloak-js";
import { KEYCLOAK_URL, KEYCLOAK_CLIENT_ID } from "./global";

export const keycloak = new Keycloak({
	url: "http://localhost:8080/auth",
	realm: "my-realm",
	clientId: "umbrella",
	// realm: "MyDemo",
	// "auth-server-url": "http://localhost:8080/auth",
	// "ssl-required": "external",
	// resource: "my-react-client",
	// "public-client": true,
	// "confidential-port": 0,
});

export const getCustomKeyCloakByRealm = (realm) => {
	const keycloak = new Keycloak({
		url: KEYCLOAK_URL,
		realm: realm,
		clientId: KEYCLOAK_CLIENT_ID,
	});
	return keycloak;
};

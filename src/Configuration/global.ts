export const TOKENREFRESHINTERVAL: number = Number(
  process.env.REACT_APP_TOKEN_REFRESH_INTERVAL
); // Refresh tokens in 3 minutes
export const TOKENEXPIRYDURATION: number = Number(
  process.env.REACT_APP_TOKEN_EXPIRY_DURATION
); // Token actually expires after 5 minutes

export const AUTHAPI = "" + process.env.REACT_APP_AUTH_API;

export const SITEAPI =
  "" + process.env.REACT_APP_SITE_API + "my-realm" + "/contracts/";

export const SITE_API_BY_REALM_NAME = (realmName: String) => {
  // return "" + process.env.REACT_APP_SITE_API + realmName + "/contracts/";
  return "" + process.env.REACT_APP_SITE_API + "contracts/";
};

export const HOST = "" + process.env.REACT_APP_HOST;

export const AUTHURL = "" + process.env.REACT_APP_AUTH_URL;

export const AVAILABLESITES = [
  {
    identifier: "auth",
    domainName: "riverus.in",
  },
  {
    identifier: "contracts",
    domainName: "contracts.riverus.in",
  },
];

export function getSitesString() {
  let sites: string[] = [];
  for (let i = 0; i < AVAILABLESITES.length; i++) {
    sites.push(AVAILABLESITES[i].domainName);
  }
  return sites.join(";;");
}

// KEYCLOAK
export const KEYCLOAK_URL: string = "" + process.env.REACT_APP_KEYCLOAK_URL;
export const KEYCLOAK_CLIENT_ID: string =
  "" + process.env.REACT_APP_KEYCLOAK_CLIENTID;

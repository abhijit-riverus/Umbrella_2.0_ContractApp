import HeimdallActionGen from "../Actions/actionGen";
import { isNullOrUndefined } from "is-what";
import {
  getSitesString,
  TOKENREFRESHINTERVAL,
} from "../../../Configuration/global";
import { useKeycloak } from "@react-keycloak/web";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../../Authentication/Actions/authentication";
export interface User {
  iss: string;
  aud: string;
  iat: number;
  sub: string;
  jti: string;
  exp: string;
  userType: string;
  userName: string;
  ordId: number;
  claims: string[];
  componentClaims: string[];
}

export interface Claim {
  name: string;
  value: string;
}
const CheckLogInStatusInKeycloak = () => {
  // const { keycloak } = useKeycloak();
  // return keycloak.authenticated;
  return true;
  // return false;
};
export default class HeimdallUtil {
  public static listenStorageChange(dispatch: any) {
    return function storeListener(storeEvent: any) {
      if (storeEvent.key === "accessToken") {
        if (storeEvent.newValue === "LOGOUT") {
          dispatch(HeimdallActionGen.logout());
        }
      }
      if (storeEvent.key === "refreshToken") {
        if (storeEvent.newValue === "LOGOUT") {
          dispatch(HeimdallActionGen.logout());
        }
      }
    };
  }
  public static checkLoginStatus() {
    // OLD METHOD
    // var jwt: string = "";
    // jwt = this.getTokenFromStorage().accessToken;
    // if (!isNullOrUndefined(jwt)) {
    // 	if (jwt === "LOGOUT" || jwt.length === 0) {
    // 		return false;
    // 	} else {
    // 		return true;
    // 	}
    // } else {
    // 	return false;
    // }

    // NEW KEYCLOAK
    const isLoggedIn = CheckLogInStatusInKeycloak();
    return isLoggedIn ? isLoggedIn : false;
  }
  public static getConfig(extraToken?: string) {
    var tokenLatest: string = "";
    tokenLatest = "Token 2e8c259163886711152ce41256fbedc1fa125569"; //"Bearer " + getLocalStorage("accessToken")?.toString();
    // console.log(
    // 	"🚀 ~ file: heimdallUtil.ts ~ line 67 ~ HeimdallUtil ~ getConfig ~ tokenLatest",
    // 	tokenLatest
    // );

    // tokenLatest =
    // 	"Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUQlFCR0ZBQ3Y3c2tOdXJCMmJuYkpfdkxOaE8tc1hVRFBLRzJWRlpCYTlJIn0.eyJleHAiOjE2NDYzMDM1NjIsImlhdCI6MTY0NjMwMzI2MiwiYXV0aF90aW1lIjoxNjQ2MzAzMjYwLCJqdGkiOiJmY2Q1NzkyMS0xMjc2LTRjNjgtOGU5MC1hYzg4ZGU0M2RiNjYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvbXktcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTczMzdmYzgtNjNjYy00MDZkLWFjOGUtZDQyMmNlZjMwYjkzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidW1icmVsbGEiLCJub25jZSI6IjAzODM2ZTcyLTcyYjUtNDMwMi05MWEyLTk3NDA1NDc5NjA3MSIsInNlc3Npb25fc3RhdGUiOiI4M2YzNjc1Ni00ZWU1LTQ3ZDQtYTZiZS1hODUwZTRmMWY3ZmUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbXktcmVhbG0iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiODNmMzY3NTYtNGVlNS00N2Q0LWE2YmUtYTg1MGU0ZjFmN2ZlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJSaWFzYXQgQWxpIiwiZ3JvdXBzIjpbIi9iYWNrLWVuZCIsIi9mdWxsLXN0YWNrIl0sInByZWZlcnJlZF91c2VybmFtZSI6InJpYXNhdCIsImdpdmVuX25hbWUiOiJSaWFzYXQiLCJmYW1pbHlfbmFtZSI6IkFsaSIsImVtYWlsIjoicmlhc2F0YWxpNDI0MkBnbWFpbC5jb20ifQ.Dwejgyv7uUDeBbtvKN6ERYpvuiF1bJj1hu9f_lenF86rNsddYAiBld8UPR19RRRxPYIxCX8XP33vgm-9GBRgRdTJwxu5TiUoyTHVJMmHPVRxxDlzfs_9y2c8AylLgfK7fXaf01TgGcEyP-hLEP7BR26yfH3Qi25j903-vlypSw-te45qP3q7ppHxwo-Iap8lvvKt3zHv7cPQSfllQ3hjPeZtq4xmnTZtRMpBwk-2bCEt0IkVwJiIVCPCCebx43x_gIas6i4AELK_uIHt11r9ce1kyUtkJVBHompkEgJp99QJsZ2u1sy_dNezFlcepT2gjb_nSQXNRszgjygiYFNxIg";
    var sites = getSitesString();
    if (!isNullOrUndefined(tokenLatest)) {
      if (!isNullOrUndefined(extraToken)) {
        return {
          headers: {
            Authorization: tokenLatest,
            "Content-Type": "application/json",
            gReCaptcha: extraToken,
            // "Sites-Requested": sites,
          },
        };
      } else {
        return {
          headers: {
            Authorization: tokenLatest,
            "Content-Type": "application/json",
            // "Sites-Requested": sites,
          },
        };
      }
    } else {
      return {
        headers: {
          Authorization: "loggedout",
          "Content-Type": "application/json",
          // "Sites-Requested": sites,
        },
      };
    }
  }
  public static saveToken(accessToken: string, refreshToken: string): boolean {
    if (accessToken === "" || refreshToken === "") {
      return false;
    }
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem('lastFetch', new Date().getTime().toString());
    // TODO: check for empty tokens and return false
    return true;
  }
  public static checkExpiry() {
    var jwt = localStorage.getItem("accessToken");
    if (!isNullOrUndefined(jwt)) {
      if (jwt.length > 0 && (jwt === "LOGOUT" || jwt === "undefined")) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  public static getTokenFromStorage(): TokenData {
    // TODO: get actual data
    let accessToken = ("Bearer " +
      localStorage.getItem("accessToken")) as string;
    let refreshToken = localStorage.getItem("refreshToken") as string;
    let timeStampString = localStorage.getItem("lastFetch") as string;
    let currentDate = new Date();
    var timeStamp = new Date(currentDate.getTime() - TOKENREFRESHINTERVAL);
    if (!isNullOrUndefined(timeStampString)) {
      let timeStampNumber = parseInt(timeStampString, 10);
      timeStamp = new Date(timeStampNumber);
    }
    return {
      accessToken:
        accessToken === null || accessToken === undefined ? "" : accessToken,
      refreshToken:
        refreshToken === null || refreshToken === undefined ? "" : refreshToken,
      lastFetch: timeStamp,
    };
  }
  public static decodeToken(accessToken: string) {
    var user: any = {
      iss: "",
      aud: "",
      iat: 0,
      sub: "",
      userName: "",
      userType: "",
      claims: [],
      jti: "",
      exp: 0,
      ordId: 0,
      componentClaims: [],
    };
    if (
      accessToken.length > 0 &&
      accessToken !== "LOGOUT" &&
      accessToken !== "undefined"
    ) {
      let tokenParts = accessToken.split(".");
      let decodedToken = atob(tokenParts[1]);
      let parsedJson = JSON.parse(decodedToken);
      var claims: any[] = [];
      var componentClaims: any[] = [];
      user = parsedJson as any;
      user.claims = [];
      user.claims = claims;
      user.componentClaims = [];
      user.componentClaims = componentClaims;
      return user;
    } else {
      return user;
    }
  }
  public static getUsername() {
    var accessToken = localStorage.getItem("accessToken");
    if (
      !isNullOrUndefined(accessToken) &&
      accessToken.length > 0 &&
      accessToken !== "LOGOUT" &&
      accessToken !== "undefined"
    ) {
      let tokenParts = accessToken.split(".");
      let decodedToken = atob(tokenParts[1]);
      let parsedJson = JSON.parse(decodedToken);
      let user: any = parsedJson as any;
      return user.userName;
    } else {
      return "";
    }
  }
  public static getEmailId() {
    var accessToken = localStorage.getItem("accessToken");
    if (
      !isNullOrUndefined(accessToken) &&
      accessToken.length > 0 &&
      accessToken !== "LOGOUT" &&
      accessToken !== "undefined"
    ) {
      let tokenParts = accessToken.split(".");
      let decodedToken = atob(tokenParts[1]);
      let parsedJson = JSON.parse(decodedToken);
      let user: User = parsedJson as any;
      return user.sub;
    } else {
      return "";
    }
  }
  public static getClaims() {
    var accessToken = localStorage.getItem("accessToken");
    if (
      !isNullOrUndefined(accessToken) &&
      accessToken.length > 0 &&
      accessToken !== "LOGOUT" &&
      accessToken !== "undefined"
    ) {
      let tokenParts = accessToken.split(".");
      let decodedToken = atob(tokenParts[1]);
      let parsedJson = JSON.parse(decodedToken);
      let user: User = parsedJson as any;
      return user.claims;
    } else {
      return [];
    }
  }
  public static getComponentClaims() {
    var accessToken = localStorage.getItem("accessToken");
    if (
      !isNullOrUndefined(accessToken) &&
      accessToken.length > 0 &&
      accessToken !== "LOGOUT" &&
      accessToken !== "undefined"
    ) {
      let tokenParts = accessToken.split(".");
      let decodedToken = atob(tokenParts[1]);
      let parsedJson = JSON.parse(decodedToken);
      let user: User = parsedJson as any;
      // console.log(user.componentClaims)
      return user.componentClaims;
    } else {
      return [];
    }
  }
  public static getExp() {
    var accessToken = localStorage.getItem("accessToken");
    if (
      !isNullOrUndefined(accessToken) &&
      accessToken.length > 0 &&
      accessToken !== "LOGOUT" &&
      accessToken !== "undefined"
    ) {
      let tokenParts = accessToken.split(".");
      let decodedToken = atob(tokenParts[1]);
      let parsedJson = JSON.parse(decodedToken);
      let user: any = parsedJson as any;
      return user.exp;
    } else {
      return "0";
    }
  }
  public static clearSession() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("refreshToken");
  }
}
export interface TokenData {
  accessToken: string;
  refreshToken: string;
  lastFetch: Date;
}

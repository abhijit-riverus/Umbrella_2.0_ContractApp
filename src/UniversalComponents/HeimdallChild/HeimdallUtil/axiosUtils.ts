import axios from "axios";
import { isNullOrUndefined } from "is-what";
import { store } from "../../..";
import {
  AUTHAPI,
  TOKENREFRESHINTERVAL,
  SITE_API_BY_REALM_NAME,
} from "../../../Configuration/global";
import HeimdallUtil from "./heimdallUtil";
import HeimdallActionGen from "../Actions/actionGen";
import { getKeyCloakRealmFromLS } from "../../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
export default class AxiosGateWay {
  public static get(url: string, extraToken?: string) {
    // AxiosGateWay.validateAccessToken();
    // console.log(url);
    // console.log("------", HeimdallUtil.getConfig(extraToken), ">>>>>>>>>", url);
    var response = axios.get(url, HeimdallUtil.getConfig(extraToken));
    console.log(
      "🚀 ~ file: axiosUtils.ts ~ line 18 ~ AxiosGateWay ~ get ~ response",
      response
    );
    response.then((result) => {
      // console.log("iiiiii", url);
      console.log(
        "🚀 ~ file: axiosUtils.ts ~ line 23 ~ AxiosGateWay ~ response.then ~ result",
        result
      );
      onlineMode();
    });
    response.catch((error) => {
      // console.log("catch error", url);
      console.log(
        "🚀 ~ file: axiosUtils.ts ~ line 26 ~ AxiosGateWay ~ get ~ error",
        url,
        error
      );
      if (!error.response) {
        alertUser();
      }
      if (
        (error.response.status === 403 &&
          localStorage.getItem("accessToken") !== "LOGOUT") ||
        (error.response.status === 504 &&
          localStorage.getItem("accessToken") !== "LOGOUT")
      ) {
        store.dispatch(HeimdallActionGen.reloadPage(true));
      }
      if (error.response.status === 406) {
        store.dispatch(HeimdallActionGen.attachPass(true));
      }
      if (!isNullOrUndefined(error.response) && error.response.status === 401) {
        var refreshToken = HeimdallUtil.getTokenFromStorage().refreshToken;
        AxiosGateWay.validateRefreshToken(refreshToken);
      }
    });
    return response;
  }

  public static postTwo(
    url: string,
    headers: any,
    data: any,
    params: any,
    captchaResponse?: string
  ) {
    // this.validateAccessToken();

    var usualHeaders = HeimdallUtil.getConfig(captchaResponse);
    usualHeaders.headers["Content-Type"] = headers["Content-Type"];

    var response = axios({
      method: "post",
      url: url,
      headers: usualHeaders.headers,
      data: data,
      params: params,
    });

    response.then((result) => {
      onlineMode();
    });

    response.catch((error) => {
      if (!error.response) {
        alertUser();
      }
      if (
        error.response.status === 403 &&
        localStorage.getItem("accessToken") !== "LOGOUT" &&
        (url.includes(SITEAPI) || url.includes(AUTHAPI))
      ) {
        store.dispatch(HeimdallActionGen.reloadPage(true));
      }
      if (!isNullOrUndefined(error.response) && error.response.status === 401) {
        var refreshToken = HeimdallUtil.getTokenFromStorage().refreshToken;
        AxiosGateWay.validateRefreshToken(refreshToken);
      }
    });

    return response;
  }

  public static post(url: string, params: any, captchaResponse?: string) {
    // this.validateAccessToken();
    var response = axios.post(
      url,
      params,
      HeimdallUtil.getConfig(captchaResponse)
    );
    response.then((result) => {
      onlineMode();
    });
    response.catch((error) => {
      if (!error.response) {
        alertUser();
      }
      if (
        (error.response.status === 403 &&
          localStorage.getItem("accessToken") !== "LOGOUT") ||
        (error.response.status === 504 &&
          localStorage.getItem("accessToken") !== "LOGOUT")
      ) {
        store.dispatch(HeimdallActionGen.reloadPage(true));
      }
      if (error.response.status === 406) {
        store.dispatch(HeimdallActionGen.attachPass(true));
      }
      if (!isNullOrUndefined(error.response) && error.response.status === 401) {
        var refreshToken = HeimdallUtil.getTokenFromStorage().refreshToken;
        AxiosGateWay.validateRefreshToken(refreshToken);
      }
    });
    return response;
  }
  public static put(url: string, params: any, captchaResponse?: string) {
    // AxiosGateWay.validateAccessToken();
    var response = axios.put(
      url,
      params,
      HeimdallUtil.getConfig(captchaResponse)
    );
    response.then((result) => {
      onlineMode();
    });
    response.catch((error) => {
      if (!error.response) {
        alertUser();
      }
      if (
        (error.response.status === 403 &&
          localStorage.getItem("accessToken") !== "LOGOUT") ||
        (error.response.status === 504 &&
          localStorage.getItem("accessToken") !== "LOGOUT")
      ) {
        store.dispatch(HeimdallActionGen.reloadPage(true));
      }
      if (error.response.status === 406) {
        store.dispatch(HeimdallActionGen.attachPass(true));
      }
      if (!isNullOrUndefined(error.response) && error.response.status === 401) {
        var refreshToken = HeimdallUtil.getTokenFromStorage().refreshToken;
        AxiosGateWay.validateRefreshToken(refreshToken);
      }
    });
    return response;
  }
  public static delete(url: string, params: any, captchaResponse?: string) {
    // AxiosGateWay.validateAccessToken();
    const axiosConfig = {
      headers: HeimdallUtil.getConfig(captchaResponse),
      data: params,
    };
    var response = axios.delete(url, axiosConfig);
    response.then((result) => {
      onlineMode();
    });
    response.catch((error) => {
      if (!error.response) {
        alertUser();
      }
      if (!isNullOrUndefined(error.response) && error.response.status === 403) {
        var refreshToken = HeimdallUtil.getTokenFromStorage().refreshToken;
        this.validateRefreshToken(refreshToken);
      }
    });
    return response;
  }
  public static validateAccessToken() {
    var accessToken = HeimdallUtil.getTokenFromStorage().accessToken;
    if (accessToken === "" || accessToken === "LOGOUT") {
      // logged out user
    } else {
      var exp = parseInt(store.getState().heimdall.expiry.toString(), 10);
      if (Date.now() - exp > TOKENREFRESHINTERVAL) {
        var refreshToken = HeimdallUtil.getTokenFromStorage().refreshToken;
        if (refreshToken !== undefined) {
          AxiosGateWay.validateRefreshToken(refreshToken);
        }
      } else {
        // do nothing;
      }
    }
  }
  public static validateRefreshToken(refreshToken: string) {
    // var url = AUTHAPI + "/refreshtoken";
    // var response = axios.post(
    // 	url,
    // 	{ refreshToken },
    // 	HeimdallUtil.getConfig()
    // );
    // response
    // 	.then((result) => {
    // 		var newAccessToken = result.data.queryResult;
    // 		localStorage.setItem("accessToken", newAccessToken);
    // 		localStorage.setItem("lastFetch", Date.now().toString());
    // 	})
    // 	.catch((error) => {
    // 		if (error.response.status === 403) {
    // 			localStorage.setItem("accessToken", "LOGOUT");
    // 		} else if (error.response.status === 401) {
    // 			localStorage.setItem("accessToken", "LOGOUT");
    // 			localStorage.setItem("refreshToken", "LOGOUT");
    // 		}
    // 	});
  }
}

function alertUser() {
  store.dispatch(HeimdallActionGen.Offline());
}

function onlineMode() {
  store.dispatch(HeimdallActionGen.Online());
}

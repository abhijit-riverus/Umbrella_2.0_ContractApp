import { REVIVETOKEN, ReviveToken, ReviveTokenSuccess, REVIVETOKEN_SUCCESS, ReviveTokenFailure, REVIVETOKEN_FAILURE, Logout, LOGOUT, LOGOUT_SUCCESS, LogoutSuccess, RefreshPage, PAGE_REFRESH, Offline, OFFLINE, Online, ONLINE, PollStatusAPI, POLLSTATUSAPI, ActivatePass, ACTIVATEPASS, ActivatePassSuccess, ACTIVATEPASS_SUCCESS, ActivatePassFailure, ACTIVATEPASS_FAILURE, AttachPass, ATTACHPASS, GOTOSTYLLUS, GotoStyllus, GOTOUMBRELA, GotoUmbrella } from './definitions';

export default class HeimdallActionGen {
    public static reviveToken(refreshToken: string, isLocal: boolean): ReviveToken {
        return {
            type: REVIVETOKEN,
            payload: {
                refreshToken: refreshToken,
                isLocal: isLocal
            }
        };
    }
    public static reviveTokenSuccess(accessToken: string, refreshToken: string): ReviveTokenSuccess {
        return {
            type: REVIVETOKEN_SUCCESS,
            payload: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        };
    }
    public static reviveTokenFailure(): ReviveTokenFailure {
        return {
            type: REVIVETOKEN_FAILURE
        };
    }
    public static logout(): Logout {
        return {
            type: LOGOUT
        };
    }
    public static logoutSuccess(): LogoutSuccess {
        return {
            type: LOGOUT_SUCCESS
        };
    }
    public static reloadPage(refreshPage: boolean): RefreshPage {
        return {
            type: PAGE_REFRESH,
            payload: {
                refreshPage: refreshPage
            }
        };
    }
    public static Offline(): Offline {
        return {
            type: OFFLINE
        };
    }
    public static Online(): Online {
        return {
            type: ONLINE
        };
    }
    public static pollStatusAPI(): PollStatusAPI {
        return {
            type: POLLSTATUSAPI
        };
    }
    public static activatePass(refreshToken: string): ActivatePass {
        return {
            type: ACTIVATEPASS,
            payload: {
                refreshToken: refreshToken
            }
        }
    }
    public static activatePassSuccess(): ActivatePassSuccess {
        return {
            type: ACTIVATEPASS_SUCCESS
        }
    }
    public static activatePassFailure(): ActivatePassFailure {
        return {
            type: ACTIVATEPASS_FAILURE
        }
    }
    public static attachPass(attachPass: boolean): AttachPass {
        return {
            type: ATTACHPASS,
            payload: {
                attachPass: attachPass
            }
        }
    }

    public static gotoStyllus(): GotoStyllus {
        return {
            type: GOTOSTYLLUS
        }
    }

    public static gotoUmbrella(): GotoUmbrella {
        return {
            type: GOTOUMBRELA
        }
    }
}
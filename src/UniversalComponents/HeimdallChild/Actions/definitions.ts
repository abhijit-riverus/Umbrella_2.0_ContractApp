export const REVIVETOKEN = 'REVIVETOKEN';
export type REVIVETOKEN = typeof REVIVETOKEN;
export const REVIVETOKEN_SUCCESS = 'REVIVETOKEN_SUCCESS';
export type REVIVETOKEN_SUCCESS = typeof REVIVETOKEN_SUCCESS;
export const REVIVETOKEN_FAILURE = 'REVIVETOKEN_FAILURE';
export type REVIVETOKEN_FAILURE = typeof REVIVETOKEN_FAILURE;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS;
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export type LOGOUT_FAILURE = typeof LOGOUT_FAILURE;

export const ACTIVATEPASS = 'ACTIVATEPASS'
export type ACTIVATEPASS = typeof ACTIVATEPASS;
export const ACTIVATEPASS_SUCCESS = 'ACTIVATEPASS_SUCCESS';
export type ACTIVATEPASS_SUCCESS = typeof ACTIVATEPASS_SUCCESS;
export const ACTIVATEPASS_FAILURE = 'ACTIVATEPASS_FAILURE';
export type ACTIVATEPASS_FAILURE = typeof ACTIVATEPASS_FAILURE;

export const PAGE_REFRESH = 'PAGE_REFRESH';
export type PAGE_REFRESH = typeof PAGE_REFRESH;

export const OFFLINE = 'OFFLINE';
export type OFFLINE = typeof OFFLINE;

export const ONLINE = 'ONLINE';
export type ONLINE = typeof ONLINE;

export const POLLSTATUSAPI = 'POLLSTATUSAPI';
export type POLLSTATUSAPI = typeof POLLSTATUSAPI;

export const ATTACHPASS = 'ATTACHPASS';
export type ATTACHPASS = typeof ATTACHPASS;

export const GOTOSTYLLUS = 'GOTOSTYLLUS';
export type GOTOSTYLLUS = typeof GOTOSTYLLUS;

export const GOTOUMBRELA = 'GOTOUMBRELLA';
export type GOTOUMBRELA = typeof GOTOUMBRELA;

export const UMBRELLA = 'UMBRELLA';
export const STYLLUS = 'STYLLUS';

export interface PollStatusAPI {
    type: POLLSTATUSAPI;
}

export interface ReviveToken {
    type: REVIVETOKEN;
    payload: {
        refreshToken: string;
        isLocal: boolean;
    };
}
export interface ReviveTokenSuccess {
    type: REVIVETOKEN_SUCCESS;
    payload: {
        accessToken: string;
        refreshToken: string;
    };
}
export interface ReviveTokenFailure {
    type: REVIVETOKEN_FAILURE;
}
export interface Logout {
    type: LOGOUT;
}
export interface LogoutSuccess {
    type: LOGOUT_SUCCESS;
}

export interface LogoutFailure {
    type: LOGOUT_FAILURE;
}
export interface RefreshPage {
    type: PAGE_REFRESH;
    payload: {
        refreshPage: boolean;
    }
}
export interface Offline {
    type: OFFLINE;
}

export interface Online {
    type: ONLINE;
}

export interface ActivatePass {
    type: ACTIVATEPASS;
    payload: {
        refreshToken: string
    }
}

export interface ActivatePassSuccess {
    type: ACTIVATEPASS_SUCCESS;
}

export interface ActivatePassFailure {
    type: ACTIVATEPASS_FAILURE
}

export interface AttachPass {
    type: ATTACHPASS;
    payload: {
        attachPass: boolean;
    }
}
export interface GotoStyllus {
    type: GOTOSTYLLUS;
}

export interface GotoUmbrella {
    type: GOTOUMBRELA;
}
export type heimdallActions = ReviveToken |
    ReviveTokenSuccess |
    ReviveTokenFailure |
    Logout |
    LogoutSuccess |
    LogoutFailure |
    RefreshPage |
    Offline |
    Online |
    PollStatusAPI |
    ActivatePass |
    ActivatePassSuccess |
    ActivatePassFailure |
    AttachPass | GotoStyllus | GotoUmbrella;
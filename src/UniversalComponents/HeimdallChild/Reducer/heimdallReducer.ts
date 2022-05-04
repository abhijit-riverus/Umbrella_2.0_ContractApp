import HeimdallState, { getDefaultHeimdallState } from '../State/heimdallState';
import { heimdallActions, REVIVETOKEN_SUCCESS, REVIVETOKEN_FAILURE, REVIVETOKEN, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE, PAGE_REFRESH, OFFLINE, ONLINE, ATTACHPASS, ACTIVATEPASS, GOTOSTYLLUS, STYLLUS, GOTOUMBRELA, UMBRELLA } from '../Actions/definitions';
import HeimdallUtil from '../HeimdallUtil/heimdallUtil';
import { AUTHURL } from '../../../Configuration/global';

export default function HeimdallReducer(state: HeimdallState = getDefaultHeimdallState(), action: heimdallActions): HeimdallState {
    switch (action.type) {
        case REVIVETOKEN: {
            return { ...state, refreshToken: action.payload.refreshToken, revivingToken: true };
        }
        case REVIVETOKEN_SUCCESS: {
            return { ...state, revivingToken: false, accessToken: action.payload.accessToken.slice(0), sessionExpired: HeimdallUtil.checkExpiry(), userEmail: HeimdallUtil.getEmailId(), userName: HeimdallUtil.getUsername(), expiry: HeimdallUtil.getExp(), claims: HeimdallUtil.getClaims(), componentClaims: HeimdallUtil.getComponentClaims() };
        }
        case REVIVETOKEN_FAILURE: {
            return { ...state, accessToken: 'LOGOUT', revivingToken: false, isLoggedIn: false };
        }
        case LOGOUT: {
            return { ...state, logoutLoader: true };
        }
        /*case LOGOUT_SUCCESS: {
            localStorage.setItem('accessToken', 'LOGOUT');
            localStorage.setItem('refreshToken', 'LOGOUT');
            setTimeout(() => { window.location.href = AUTHURL.replace('auth', 'logout'); }, 1000); // redirect the user to logout at auth
            return { ...state, isLoggedIn: false, accessToken: 'LOGOUT', refreshToken: '', userName: '', sessionExpired: true };
        }*/
        case LOGOUT_FAILURE: {
            return { ...state };
        }
        case PAGE_REFRESH: {
            return { ...state, refreshPage: action.payload.refreshPage }
        }
        case OFFLINE: {
            return { ...state, systemInternetState: false, occurence: 1 };
        }
        case ONLINE: {
            return { ...state, systemInternetState: true };
        }
        case ATTACHPASS: {
            return { ...state, attachPass: action.payload.attachPass }
        }
        case ACTIVATEPASS: {
            return { ...state }
        }
        case GOTOSTYLLUS: {
            return {
                ...state,
                platform: STYLLUS
            }
        }
        case GOTOUMBRELA: {
            return {
                ...state,
                platform: UMBRELLA
            }
        }
        default: {
            return state;
        }
    }
}
import { UMBRELLA } from '../Actions/definitions';
import HeimdallUtil from '../HeimdallUtil/heimdallUtil';

export default interface HeimdallState {
    isLoggedIn: boolean;
    refreshToken: string;
    accessToken: string;
    userName: string;
    expiry: string;
    sessionExpired: boolean;
    userEmail: string;
    claims: string[];
    logoutLoader: boolean;
    revivingToken: boolean;
    refreshPage: boolean;
    systemInternetState: boolean;
    occurence: number;
    componentClaims: string[];
    attachPass: boolean;
    platform: string;
}

export function getDefaultHeimdallState(): HeimdallState {
    return {
        refreshToken: HeimdallUtil.getTokenFromStorage().refreshToken,
        accessToken: HeimdallUtil.getTokenFromStorage().accessToken,
        isLoggedIn: HeimdallUtil.checkLoginStatus(),
        expiry: HeimdallUtil.getExp(),
        userName: '',
        sessionExpired: HeimdallUtil.checkExpiry(),
        userEmail: HeimdallUtil.getEmailId(),
        claims: HeimdallUtil.getClaims(),
        logoutLoader: false,
        revivingToken: false,
        refreshPage: false,
        systemInternetState: true,
        occurence: -1,
        componentClaims: HeimdallUtil.getComponentClaims(),
        attachPass: false,
        platform: UMBRELLA
    };
}
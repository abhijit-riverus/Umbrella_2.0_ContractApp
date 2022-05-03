import axios from 'axios';
import HeimdallUtil from '../HeimdallUtil/heimdallUtil';
import AxiosGateWay from '../HeimdallUtil/axiosUtils';

export default class HeimdallAPI {
    public static reviveToken(url: string, refreshToken: string) {
        return axios.post(url, { refreshToken }, HeimdallUtil.getConfig()).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static logout(url: string, refreshToken: string) {
        return AxiosGateWay.post(url, {'refreshToken': refreshToken}).then (
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static PollStatus(url: string){
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        ).catch(error => {
            return error.response;
        });
    }
    public static activatePass(url: string){
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        ).catch(error => {
            return error.response;
        });
    }
}
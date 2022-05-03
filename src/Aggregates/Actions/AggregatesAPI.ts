import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

export default class AggregatesAPI {
    public static getFilterConfig(url: string) {
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static searchFilter(url: string, payload: any) {
        return AxiosGateWay.post(url, payload).then(
            response => {
                return response;
            }
        ).catch(
            error => {
                return error.response;
            } 
        );
    }
    public static getAggregates(url: string, object: any) {
        return AxiosGateWay.post(url, object).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static filterResult(url: string, object: any) {
        return AxiosGateWay.post(url, object).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
}
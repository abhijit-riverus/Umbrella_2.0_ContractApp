import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

export default class SearchAPI {
    public static search(url: string, object: any) {
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
    public static count(url: string, object: any) {
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
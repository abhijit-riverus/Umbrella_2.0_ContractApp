import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

export default class FileUploadAPI {
    public static fileUpload(url: string, headers: any, data: any, params: any) {
        
        return AxiosGateWay.postTwo(url, headers, data, params).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static checkFOrDuplicates(url: string, object: any) {
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
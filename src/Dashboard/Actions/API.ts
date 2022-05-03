import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

export default class DashboardAPI {
    public static getDashboardFileIdArray(url: string) {
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
    public static getContractType(url: string, payload: any) {
        return AxiosGateWay.post(url, payload).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static getJurisdiction(url: string, payload: any) {
        return AxiosGateWay.post(url, payload).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static getUploadedBy(url: string, payload: any) {
        return AxiosGateWay.post(url, payload).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static getTableData(url: string, payload: any) {
        return AxiosGateWay.post(url, payload).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static applyDashboardFilter(url: string, payload: any) {
        return AxiosGateWay.post(url, payload).then(
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
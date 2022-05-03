import { HOST } from "../../Configuration/global";
import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";
import { getMimeType } from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";
import { AnalysisFilterStructure, FilterStructure } from "../State/analysisState";

export default class AnalysisAPI {
    public static getAnalysisData(url: string, fileIds: number[]) {
        return AxiosGateWay.post(url, { fileIds: fileIds }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static getAnalysisFileIdArray(url: string) {
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
    public static getTableConfig(url: string) {
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
    public static getGeneralFilter(url: string, fileIds: number[]) {
        return AxiosGateWay.post(url, { fileIds: fileIds }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static applyGeneralFilter(url: string, fileIds: number[], filterType: string) {
        return AxiosGateWay.post(url, { fileIds: fileIds, filterType: filterType }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static getAdvancedFilter(url: string, fileIds: number[]) {
        return AxiosGateWay.post(url, { fileIds: fileIds }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static applyAdvancedFilter(url: string, fileIds: number[], filterStructure: any) {
        return AxiosGateWay.post(url, { fileIds: fileIds, filterStructure: filterStructure }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static updatePreference(url: string, payload: any) {
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

    public static generateReport(url: string, name: string, filter: AnalysisFilterStructure[], fileIds: number[], preference: string[]){
        
        return AxiosGateWay.post(url, { name: name, filter: filter, fileIds: fileIds, preference: preference }).then(
            result => {
                var hiddenElement = document.createElement('a');
                hiddenElement.href = HOST + '/' + result.data.queryResult;
                hiddenElement.download = name + '.csv';
                hiddenElement.dispatchEvent(new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window }));
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static getAnalysisFilterConfig(url: string) {
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

    public static getFilterAggregate(url: string, value: string, level: number, page: string) {
        return AxiosGateWay.post(url, { value: value, level: level, page: page }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static getFilteredCount(url: string, filter: AnalysisFilterStructure[]) {
        return AxiosGateWay.post(url, { filter: filter }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static applyAnalysisFilter(url: string, sort: string, filter: AnalysisFilterStructure[]) {
        return AxiosGateWay.post(url, { sort: sort, filter: filter }).then(
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

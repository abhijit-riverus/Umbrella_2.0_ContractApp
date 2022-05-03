import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";
import { NewAnalysisFilterStructure } from "../State/newAnalysisState";

export default class NewAnalysisAPI {
    public static getNewAnalysisFileIdArray(url: string) {
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
    public static getNewAnalysisData(url: string, fileIds: number[], sort: string, order: string ) {
        return AxiosGateWay.post(url, {fileIds: fileIds, sort: sort, order: order}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static getNewAnalysisFilterConfig(url: string) {
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
    public static getNewAnalysisFilterAggregate(url: string, value: string, level: number, page: string, sort: string, order: string, filter: NewAnalysisFilterStructure[], segment: string ) {
        return AxiosGateWay.post(url, {value: value,  level: level, page: page, sort: sort, order: order, filter: filter, segment: segment}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static applyNewAnalysisFilter(url: string, sort: string, filter: NewAnalysisFilterStructure[] ) {
        return AxiosGateWay.post(url, {sort: sort, filter: filter}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static getNewAnalysisFilterCount(url: string, filter: NewAnalysisFilterStructure[] ) {
        return AxiosGateWay.post(url, {filter: filter}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static saveNewAnalysisConfiguration(url: string, title: string, description: string, type: string, lastResultCount: number, filter: NewAnalysisFilterStructure[] ) {
        return AxiosGateWay.post(url, {title: title, description: description, type: type, lastResultCount: lastResultCount, filter: filter}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static updateConfigurationCount(url: string, count: number, ssid: number ) {
        return AxiosGateWay.post(url, {count: count, ssid: ssid}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static getNewAnalysisTableConfig(url: string) {
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
    public static getNewAnalysisInitialFileIdArray(url: string) {
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
}

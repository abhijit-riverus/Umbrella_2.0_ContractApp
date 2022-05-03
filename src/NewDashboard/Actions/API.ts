import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";
import { NewDashboardFilterStructure } from "../State/newDashboardState";

export default class NewDashboardAPI {
    public static getNewDashboardFileIdArray(url: string) {
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
    public static getNewDashboardData(url: string, fileIds: number[], sort: string, order: string ) {
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
    public static getNewDashboardFilterConfig(url: string) {
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
    public static getNewDashboardFilterAggregate(url: string, value: string, level: number, page: string, sort: string, order: string, filter: NewDashboardFilterStructure[], segment: string ) {
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
    public static applyNewDashboardFilter(url: string, sort: string, filter: NewDashboardFilterStructure[] ) {
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
}

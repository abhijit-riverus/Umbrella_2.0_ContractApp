import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

export default class TaskManagementPageAPI {

    public static getAllTasksData(url: string, fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string){
        return AxiosGateWay.post(url, {fileID, requestID, sort, order, selfAssigned, clauseType}).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }

    public static getLastUpdatedOn(url: string, selfAssigned: boolean){
        return AxiosGateWay.post(url,{selfAssigned}).then(
            result => {
                return result;
            }
        ).catch(error => {
            return error.response;
        })
    }

    public static getProgressNameList(url: string) {
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        )
    }

    public static updateProgress(url: string, requestID: number, progressID: number) {
        return AxiosGateWay.post(url, {requestID, progressID}).then(
            result => {
                return result;
            }
        ).catch(error => {
            return error.response;
        })
    }

    public static getTaskCount(url: string){
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        ).catch(
            error=> {
                return error.response;
        })
    }
}
import AxiosGateWay from "../../../HeimdallChild/HeimdallUtil/axiosUtils";

export default class TaskManagementAPI {

    public static createTask(url: string, payload: any) {
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

    public static getBISentence(url: string, payload: any) {
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

    public static getClauseType(url: string){
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

    public static getBIType(url: string, payload: any) {
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

    public static getTaskState(url: string) {
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        )
        .catch(err => {
            return err.response;
        })
    }

    public static getTaskProgress(url: string) {
        return AxiosGateWay.get(url).then(
            result => {
                return result;
            }
        )
        .catch(err => {
            return err.response;
        })
    }

    public static getUserData(url: string) {
        
        return AxiosGateWay.get(url).then(
        result => {
            return result;
        })
        .catch(err => {
            return err.response;
        })
    }

    public static updateTask(url: string, payload: any) {
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

    public static postComment(url: string, payload: any) {
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

    public static getComments(url: string) {
        return AxiosGateWay.get(url).then(
        result => {
            return result;
        })
        .catch(err => {
            return err.response;
        })
    }

}
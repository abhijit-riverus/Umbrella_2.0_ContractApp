import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";


export default class ClauseLibraryAPI {
    public static getFolderHeading(url: string) {
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
    public static getFolderSubHeading(url: string) {
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
    public static createFolderHeading(url: string, folderName: string) {
        return AxiosGateWay.post(url, { folderName: folderName }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static createFolderSubHeading(url: string, folderName: string, parentId: number) {
        return AxiosGateWay.post(url, { folderName: folderName, parentId: parentId }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static createClause(url: string, clauseName: string, extractedText: string, userText: string, clauseType: string, sourceFileId: number, folderId: number) {
        return AxiosGateWay.post(url, { clauseName: clauseName, extractedText: extractedText, userText: userText, clauseType: clauseType, sourceFileId: sourceFileId, folderId: folderId }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static editClause(url: string, clauseId: number, clauseName: string, userText: string, clauseType: string, folderId: number) {
        return AxiosGateWay.post(url, { clauseId: clauseId, clauseName: clauseName, userText: userText, clauseType: clauseType, folderId }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static deleteClause(url: string, clauseId: number) {
        return AxiosGateWay.post(url, { clauseId: clauseId }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static deleteFolder(url: string, folderId: number) {
        return AxiosGateWay.post(url, { folderId: folderId }).then(
            result => {
                return result;
            }
        ).catch(
            error => {
                return error.response;
            }
        );
    }
    public static getClauseLibraryData(url: string) {
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
    public static getClausesData(url: string, clauseIds: number[]) {
        return AxiosGateWay.post(url, { clauseIds: clauseIds }).then(
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
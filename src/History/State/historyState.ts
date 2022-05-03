import { FileInfo } from "../../Upload/State/uploadState";

export default interface HistoryState {
    historyLoader: boolean;
    userUploads: FileInfo[];
    deleteStatus: number;
    uniqueFileId: number;
    documentName: string;
}

export function defaultHistoryState(): HistoryState {
    return {
        historyLoader: false,
        userUploads: [],
        deleteStatus: -1,
        uniqueFileId: -1,
        documentName: ''
    }
}
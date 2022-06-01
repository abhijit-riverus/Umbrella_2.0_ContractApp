import { FileInfo, FileList } from "../../Upload/State/uploadState";

export default interface HistoryState {
  historyLoader: boolean;
  userUploads: FileList[];
  deleteStatus: number;
  uniqueFileId: string;
  documentName: string;
}

export function defaultHistoryState(): HistoryState {
  return {
    historyLoader: false,
    userUploads: [],
    deleteStatus: -1,
    uniqueFileId: "",
    documentName: "",
  };
}

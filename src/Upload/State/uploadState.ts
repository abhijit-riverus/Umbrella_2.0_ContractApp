import { UploadValidityObject } from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";

export default interface UploadState {
  fileChunk: ChunkState;
  fileInfo: FileInfo[];
  fileUploadRequest: FileInfo[];
  uploadLoader: boolean;
  duplicateFiles: string[];
  toBeUploaded: File[];
  filesCount: number;
  filesToUpload: File[];
  uploadValidityObject: UploadValidityObject;
  totalFiles: File[];
  fileList: FileList[];
}

export interface ChunkState {
  chunk: any;
  chunkId: number;
  chunksQuantity: number;
  fileId: number;
  fileName: string;
  fileSize: number;
  isLastChunkOfFile: boolean;
}

export interface FileInfo {
  fileState: FileState;
  status: StatusPoints;
}

export interface FileList {
  id: string;
  file_name: string;
  created_by: string;
  created_on: string;
  file_size: number;
  file_hash: string;
  status: string;
}

export interface StatusPoints {
  fileId: number;
  textract: boolean;
  analytics: boolean;
  normalization: boolean;
}

export interface FileState {
  duplicateFileId: number;
  fileId: number;
  name: string;
  size: number;
  uploadedBy: string;
  time: string;
  progressState: ProgressState;
}

export interface ProgressState {
  process: string;
  percentage: number;
}

export function defaultUploadState(): UploadState {
  return {
    fileChunk: {
      chunk: null,
      chunkId: 0,
      chunksQuantity: 0,
      fileId: 0,
      fileName: "",
      fileSize: 0,
      isLastChunkOfFile: false,
    },
    fileInfo: [],
    uploadLoader: false,
    fileUploadRequest: [],
    duplicateFiles: [],
    toBeUploaded: [],
    filesCount: 0,
    filesToUpload: [],
    uploadValidityObject: {
      exceededFileNameArray: [],
      acceptedFiles: [],
      unsupportedFiles: [],
    },
    totalFiles: [],
    fileList: [],
  };
}

export function generateGuid() {
  var result, i, j;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j === 8 || j === 12 || j === 16 || j === 20) result = result + "-";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
}

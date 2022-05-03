import { FileState, StatusPoints, FileInfo } from "../State/uploadState";
import { FileUpload, FILEUPLOAD, FileUploadSuccess, FILEUPLOAD_SUCCESS, FileUploadFailure, FILEUPLOAD_FAILURE, ChangeStatus, CHANGESTATUS, ChangeStatusSuccess, CHANGESTATUS_SUCCESS, CheckDuplicate, CHECKDUPLICATE, CheckDuplicateSuccess, CHECKDUPLICATE_SUCCESS, CHECKDUPLICATE_FAILURE, CheckDuplicateFailure, StoreUploadValidity, STOREUPLOADVALIDITY } from "./def";
import { UploadValidityObject } from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";

export default class UploadActionGenerator {
    public static fileUpload(fileChunk: any, fileUploadRequest: FileInfo[]): FileUpload {
        return {
            type: FILEUPLOAD,
            payload: {
                fileChunk: fileChunk,
                fileUploadRequest: fileUploadRequest
            }
        };
    }
    public static fileUploadSuccess(fileInfo: FileInfo, filesCount: number): FileUploadSuccess {
        return {
            type: FILEUPLOAD_SUCCESS,
            payload: {
                fileInfo: fileInfo,
                filesCount: filesCount
            }
        };
    }
    public static fileUploadFailure(fileUploadRequest: FileState[]): FileUploadFailure {
        return {
            type: FILEUPLOAD_FAILURE,
            payload: {
                fileUploadRequest: fileUploadRequest
            }
        };
    }
    public static changeStatus(): ChangeStatus {
        return {
            type: CHANGESTATUS
        };
    }
    public static changeStatusSuccess(statusPoints: StatusPoints): ChangeStatusSuccess {
        return {
            type: CHANGESTATUS_SUCCESS,
            payload: {
                statusPoints: statusPoints
            }
        };
    }
    public static checkDuplicate(fileNameArray: string[], file: File[]): CheckDuplicate {
        return {
            type: CHECKDUPLICATE,
            payload: {
                fileNameArray: fileNameArray,
                file: file
            }
        };
    }
    public static checkDuplicateSuccess(toBeUploaded: File[], duplicateFiles: string[]): CheckDuplicateSuccess {
        return {
            type: CHECKDUPLICATE_SUCCESS,
            payload: {
                toBeUploaded: toBeUploaded,
                duplicateFiles: duplicateFiles
            }
        };
    }
    public static checkDuplicateFailure(): CheckDuplicateFailure {
        return {
            type: CHECKDUPLICATE_FAILURE
        };
    }
    public static storeUploadValidity(uploadValidityObject: UploadValidityObject, totalFiles: File[]): StoreUploadValidity {
        return {
            type: STOREUPLOADVALIDITY,
            payload: {
                uploadValidityObject: uploadValidityObject,
                totalFiles: totalFiles
            }
        }
    }
}
import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import UploadContainer from "../Component/uploadContainer";
import { FileInfo } from "../State/uploadState";
import AppActionGenerator from "../../App/Actions/actionGen";
import { UploadValidityObject } from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";
import HistoryActionGenerator from "../../History/Actions/gen";
import UploadActionGenerator from "../Actions/gen";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        fileInfo: appState.upload.fileInfo,
        userName: appState.heimdall.userName,
        duplicateFiles: appState.upload.duplicateFiles,
        toBeUploaded: appState.upload.toBeUploaded,
        uploadLoader: appState.upload.uploadLoader,
        filesCount: appState.upload.filesCount,
        uploadValidityObject: appState.upload.uploadValidityObject,
        totalFiles: appState.upload.totalFiles
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        uploadFiles: (fileChunk: any, fileInfo: FileInfo[]) => dispatch(UploadActionGenerator.fileUpload(fileChunk, fileInfo)),
        changeStatus: () => dispatch(UploadActionGenerator.changeStatus()),
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        deleteFile: (fileId: number) => dispatch(HistoryActionGenerator.deleteFile(fileId)),
        storeUploadValidity: (uploadValidityObject: UploadValidityObject, totalFiles: File[]) => dispatch(UploadActionGenerator.storeUploadValidity(uploadValidityObject, totalFiles)),
        checkDuplicate: (fileNameArray: string[], file: File[]) => dispatch(UploadActionGenerator.checkDuplicate(fileNameArray, file)),
        saveDeleteDetails: (documentName: string, uniqueFileId: number) => dispatch(HistoryActionGenerator.saveDeleteDetails(documentName, uniqueFileId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer);
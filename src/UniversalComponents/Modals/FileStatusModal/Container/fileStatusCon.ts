import { connect } from "react-redux";
import { StoreTree } from "../../../../Utils/MainReducer/mainReducer";
import FileStatusModal from "../Component/fileStatusModal";
import { generateFileNameArray, sucessfullyUploadedFiles } from "../../../../Utils/UploadCheckUtil.ts/uploadCheckUtil";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        duplicateFiles: appState.upload.duplicateFiles,
        totalFiles: appState.upload.totalFiles,
        sucessfullFiles: sucessfullyUploadedFiles(appState.upload.totalFiles, appState.upload.duplicateFiles, appState.upload.uploadValidityObject),
        uploadValidityObject: appState.upload.uploadValidityObject
    }
}

export default connect(mapStateToProps)(FileStatusModal);
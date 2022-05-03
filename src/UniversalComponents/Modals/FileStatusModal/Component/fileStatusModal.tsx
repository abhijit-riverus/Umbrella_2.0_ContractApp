import * as React from 'react';
import { isNullOrUndefined } from 'is-what';
import Scrollable from '../../../Scrollable/scrollable';
import { History } from 'history';
import { UploadValidityObject } from '../../../../Utils/UploadCheckUtil.ts/uploadCheckUtil';

interface Props {
    uploadValidityObject: UploadValidityObject;
    totalFiles: File[];
    sucessfullFiles: number;
    duplicateFiles: string[];
    history: History;
}

export default class FileStatusModal extends React.Component<Props> {
    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false)
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('fileStatusModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("btn-outside-click")?.click();
            }
        }
    }
    render() {
        let { uploadValidityObject, sucessfullFiles, duplicateFiles, totalFiles, history } = this.props;
        let dupFilesCount = duplicateFiles.length;
        let sizeExceededCount = uploadValidityObject.exceededFileNameArray.length;
        let unsupportedCount = uploadValidityObject.unsupportedFiles.length;
        let totalFilesCount = totalFiles.length;
        let failedFiles = totalFilesCount - sucessfullFiles;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="fileStatusModal" aria-labelledby="fileStatusModal" aria-hidden="true" data-backdrop="false">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 my-3">
                                        <div className="modal-body modal-title">
                                            Adding {sucessfullFiles} {sucessfullFiles > 1 ? 'files' : 'file'} out of {totalFilesCount} {totalFilesCount > 1 ? 'files' : 'file'}!
                                        <span id="btn-outside-click" data-dismiss="modal" style={{ outline: 'none', cursor: 'pointer' }}><img src="/static_images/close-modal-icn.svg" /></span>
                                        </div>
                                        <img src="/static_images/addfilesmodal-icn.svg" style={{ marginBottom: '3%' }} alt="add-files" />
                                        <div className="modal-body modal-subtitle">
                                            View all your processed files <span onClick={() => history.push('/uploads')} className="message-link" style={{ display: 'initial' }} >here</span>.
                                        </div>
                                    </div>
                                </div>
                                {failedFiles > 0 && <div className="row">
                                    <div className="col-md-12 error-message-container pt-2">
                                        <div className="row">
                                            <div className="col-md-12 upload-error-message">
                                                Failed to upload {failedFiles} files.
                                            </div>
                                        </div>
                                        <Scrollable maxHeight={400}>
                                            {unsupportedCount > 0 && <div className="row">
                                                <div className="col-md-12" style={{ borderBottom: '1px solid #E4E4E4' }}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="modal-body modal-title mt-3" style={{ float: 'left' }}>
                                                                Unsupported file format!
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <img src="/static_images/unsupported-format-icn.svg" style={{ marginBottom: '3%' }} alt="add-files" />
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="modal-body modal-subtitle align-left" style={{ color: '#5B5B5B' }}>
                                                                {unsupportedCount > 0 && uploadValidityObject.unsupportedFiles.map((name, i) =>
                                                                    <span className="dup-file-name" key={i}>{i === unsupportedCount - 1 ? name : name + ', '}</span>)}&nbsp;
                                                    {unsupportedCount > 1 ? 'are' : 'is'} unsupported file {unsupportedCount > 1 ? 'formats' : 'format'}.
                                                            </div>
                                                            <div className="modal-body modal-subtitle align-left">
                                                                Please try uploading again from the file formats which are-<br />
                                                                <img src="/static_images/img-pdf.svg" alt="pdf" />&nbsp;&nbsp;&nbsp;
                                                                <img src="/static_images/img-docx.svg" alt="docx" />&nbsp;&nbsp;&nbsp;
                                                                <img src="/static_images/img-doc.svg" alt="doc" />&nbsp;&nbsp;&nbsp;
                                                                <img src="/static_images/img-txt.svg" alt="txt" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}

                                            {sizeExceededCount > 0 && <div className="row">
                                                <div className="col-md-12" style={{ borderBottom: '1px solid #E4E4E4' }}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="modal-body modal-title mt-3" style={{ float: 'left' }}>
                                                                File size exceeds 100 MB!
                                                             </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <img src="/static_images/size-exceed-icn.svg" style={{ marginBottom: '3%' }} alt="add-files" />
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="modal-body modal-subtitle align-left" style={{ color: '#5B5B5B' }}>
                                                                {sizeExceededCount > 0 && uploadValidityObject.exceededFileNameArray.map((name, i) =>
                                                                    <span className="dup-file-name" key={i}>{i === sizeExceededCount - 1 ? name : name + ', '}</span>)}&nbsp;
                                                    {sizeExceededCount > 1 ? 'are' : 'is'} larger than 100 MB.
                                                    <div className="modal-body modal-subtitle align-left">
                                                                    Please try uploading files less than 100 MB.
                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}

                                            {dupFilesCount > 0 && <div className="row">
                                                <div className="col-md-12" style={{ borderBottom: '1px solid #E4E4E4' }}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="modal-body modal-title mt-3" style={{ float: 'left' }}>
                                                                Duplicate {dupFilesCount > 1 ? 'files' : 'file'}!
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <img src="/static_images/duplicate-file-icn.svg" style={{ marginBottom: '3%' }} alt="add-files" />
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="modal-body modal-subtitle align-left" style={{ color: '#5B5B5B' }}>
                                                                {dupFilesCount > 0 && duplicateFiles.map((name, i) =>
                                                                    <span className="dup-file-name" key={i}>{i === dupFilesCount - 1 ? name : name + ', '}</span>)}&nbsp;
                                                    {dupFilesCount > 1 ? 'were' : 'was'} uploaded earlier.
                                                            </div>
                                                            <div className="modal-body modal-subtitle align-left">
                                                                Please change the name of the file to continue uploading.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </Scrollable>
                                    </div>
                                    <div className="col-md-12 modal-subtitle" style={{ textAlign: 'center', lineHeight: '40px' }}>
                                        Please write to&nbsp;
                                                <a className="mailto-riverus" href="mailto:hello@riverus.in.">hello@riverus.in</a>
                                                &nbsp;for help.
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
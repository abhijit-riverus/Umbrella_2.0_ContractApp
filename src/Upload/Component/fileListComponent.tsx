import React from 'react';
import { getUploadedTime, humanFileSize, truncateFileName } from '../../Utils/DataModifierUtil/dataModUtil';
import { FAILED, DONE } from '../../Constants/const';
import { FileInfo, FileState } from '../State/uploadState';
import { History } from 'history';
import { isNullOrUndefined } from 'is-what';
import DeleteFileModal from '../../UniversalComponents/Modals/DeleteFileModal/deleteFileCon';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
    file: FileInfo;
    history: History;
    from: string;
    saveDeleteDetails: (documentName: string, uniqueFileId: number) => void;
}

export default class FileListComponent extends React.Component<Props> {
    render() {
        let { file } = this.props;
        return (
            <div className="mb-2">
                <div className="row upload-file-item">
                    <div className="col-md-10 cursor-pointer" onClick={() => this.goToIndividualContract(file.fileState)} style={{ display: 'contents' }}>
                        {file.fileState.name.length > 15 ?
                            <div className="col-md-2 file-name-style">
                                <Tooltip title={file.fileState.name} placement="right-end">
                                    <span className="dotted-line">
                                        {truncateFileName(file.fileState.name)}
                                    </span>
                                </Tooltip>
                            </div> :
                            <div className="col-md-2 file-name-style">
                                {file.fileState.name}
                            </div>}
                        <div className="col-md-2 uploadedby-style">
                            {file.fileState.uploadedBy}
                        </div>
                        <div className="col-md-2 uploadedby-style">
                            {getUploadedTime(file.fileState.time)}
                        </div>
                        <div className="col-md-2 filesize-style">
                            {humanFileSize(file.fileState.size, true)}
                        </div>
                        <div className="col-md-2" style={{ color: this.getColor() }}>
                            {file.fileState.progressState.process}
                        </div>
                    </div>
                    <div className="col-md-2 tooltip">
                        {file.fileState.progressState.process === DONE ?

                            <Tooltip title={'Delete file'} placement="right-end">
                                <img onClick={() => this.displayDeleteModal(file.fileState.name, file.fileState.fileId)} style={{ cursor: 'pointer' }} src="/static_images/delete-icon.svg" alt="delete-icn" />
                            </Tooltip>
                            : <img src="/static_images/delete-icon-disable.svg" alt="delete-icn" />}
                    </div>
                </div>
                {file.fileState.progressState.process !== DONE && <div className="row">
                    <div className={file.fileState.progressState.process === FAILED ? "nanobar-failed" : "nanobar"} style={{ width: this.setNanoBarWidth() }} />
                </div>}
                <DeleteFileModal />
                <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#deleteModal" id="deleteButton"></button>
            </div>
        )
    }

    setNanoBarWidth() {
        return (this.props.file.fileState.progressState.percentage) + '%';
    }

    displayDeleteModal = (name: string, fileId: number) => {
        this.props.saveDeleteDetails(name, fileId);
        let link = document.getElementById('deleteButton');
        !isNullOrUndefined(link) && link.click();
    }

    getColor() {
        let { file } = this.props;
        let process = file.fileState.progressState.process.toUpperCase();
        switch (process) {
            case 'UPLOADING': {
                return '#FFAC5F';
            }
            case 'UPLOADED': {
                return '#FFAC5F';
            }
            case 'PROCESSING': {
                return '#FFAC5F';
            }
            case 'FAILED': {
                return '#FF685F';
            }
            case 'DONE': {
                return '#43C888';
            }
            default: {
                return '#8D8D8D';
            }
        }
    }

    goToIndividualContract(fileState: FileState) {
        if (fileState.progressState.process === 'Done') {
            let fileId = fileState.fileId as any;
            this.props.history.push('/document/' + this.props.from + '/' + btoa(fileId));
        }
    }
}
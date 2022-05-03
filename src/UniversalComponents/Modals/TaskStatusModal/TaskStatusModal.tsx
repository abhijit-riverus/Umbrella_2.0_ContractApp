import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { isNullOrUndefined } from 'is-what';
import CircleLoader from '../../Loader/circleLoader';

interface Props {
    createTaskSuccess: number;
    editMode?: boolean;

}

interface State {

}

export default class TaskStatusModal extends Component<Props, State>  {
    constructor(props: Props) {
        super(props)

        this.state = {

        }

    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false)
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('taskStatusModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("delete-btn-outside-click")?.click();
                window.location.reload();
            }
        }
    }

    render() {
        let { createTaskSuccess, editMode } = this.props;
        return (
            <>
                <div className="col-md-12 col-12">
                    <div className="row modal" id="taskStatusModal" aria-labelledby="taskStatusModal" aria-hidden="true" data-backdrop="false">
                        <div className="col-md-12 modal-dialog modal-dialog-centered" style={{ height: '204px', width: '420px' }}>
                            <div className="row" style={{ margin: 'auto' }}>
                                <div className="col-md-12 modal-content">
                                    <div className="row">
                                        <div className="col-md-12 my-3">
                                            <div className="modal-body modal-title">
                                                {createTaskSuccess === -1 && <CircleLoader />}
                                                {createTaskSuccess === 1 ? !isNullOrUndefined(editMode) && editMode === true ? <>Task details updated successfully!</> : <>Task added successfully!</> : <></>}
                                                {createTaskSuccess === 0 ? !isNullOrUndefined(editMode) && editMode === true ? <>Failed to update Task details!</> : <>Task was not added!</> : <></>}
                                                <span className="float-right" id="delete-btn-outside-click" data-dismiss="modal" style={{}}><img src="/static_images/close-modal-icn.svg" /></span>
                                            </div>
                                            {createTaskSuccess === 1 &&
                                                <img src="/static_images/create-task-success-img.svg" style={{ marginBottom: '3%' }} alt="success" />
                                            }
                                            {createTaskSuccess === 0 &&
                                                <img src="/static_images/create-task-failure-img.svg" style={{ marginBottom: '3%' }} alt="failure" />
                                            }
                                            <div className="modal-body modal-subtitle">
                                                {createTaskSuccess === 1 && <>View all your tasks for this document <Link to="/tasks" style={{ color: '#88305F', textDecoration: 'underline' }}>here</Link>.</>}
                                                {createTaskSuccess === 0 ? !isNullOrUndefined(editMode) && editMode === true ? <>The task was not saved, please try editing the task again.</> : <>The task was not saved, please try creating the task again.</> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
import React, { Component } from 'react'
import { getUserNameInitials } from '../../../TaskManagement/Component/Utils/taskManagementUtils';
import { AllTasksData, AssociateGroup, ProgressNameList } from '../../../TaskManagement/State/taskManagementPageState';
import BarLoader from '../../../UniversalComponents/Loader/barLoader';
import CircleLoader from '../../../UniversalComponents/Loader/circleLoader';
import { CurrentTask, TaskState } from '../../../UniversalComponents/Modals/TaskManagementModal/State/taskManagementState';
import Scrollable from '../../../UniversalComponents/Scrollable/scrollable';
import { getDueDateFormat, truncateFileName, truncateString, truncateTaskName } from '../../../Utils/DataModifierUtil/dataModUtil';
import { DarkTooltip } from '../documentInsights';
import onClickOutside from "react-onclickoutside";

const defaultTask: AllTasksData = {
    requestID: 0,
    taskTitle: '',
    description: '',
    clauseName: '',
    clauseAlias: '',
    biType: '',
    biColumnName: '',
    progressID: 0,
    progressName: '',
    stateName: '',
    dueDate: '',
    contractID: 0,
    linkedText: '',
    contractName: '',
    associateGroup: [],
    reminder: {
        reminderStart: 0,
        reminderStartType: '',
        reminderType: '',
        reminderUntil: '',
        frequencyType: ''
    },
    checkList: []
}


interface Props {
    hidden: boolean;
    currentTask: CurrentTask;
    allTasksData: AllTasksData[];
    getAllTasksData: (fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string) => void;
    fileId: number;
    // progressNameList: ProgressNameList[];
    taskProgress: TaskState[];
    updateProgress: (requestID: number, progressID: number) => void;
    isProgressUpdated: number;
    taskLoader: boolean;
    setEditMode: (editMode: boolean, currentEditTaskData: AllTasksData) => void;
    setHideTaskPage: (hide: boolean) => void;
}

interface State {
    hideProgressOptions: boolean;
    requestID: number;
}

class TaskPagecomponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hideProgressOptions: true,
            requestID: 0
        }

    }

    componentDidMount() {
        // let { getAllTasksData, fileId, currentTask } = this.props;
        // getAllTasksData(fileId, '', '', false, currentTask.name);
    }

    componentWillReceiveProps(nextProps: Props) {
        let { fileId, currentTask, getAllTasksData } = this.props;
        if (nextProps.isProgressUpdated !== this.props.isProgressUpdated && nextProps.isProgressUpdated !== -1) {
            getAllTasksData(fileId, 0, '', '', false, currentTask.name);
            //this.setState({ hideProgressOptions: !this.state.hideProgressOptions });
        }
    }

    getExtraCount = (numberOfAssociates: number) => {
        let extraCount = numberOfAssociates - 3;
        return '+' + extraCount;
    }

    updateProgress(requestID: number, progressID: number) {
        let { updateProgress } = this.props;
        updateProgress(requestID, progressID);
    }

    handleClickOutside = () => {
        //console.log('onClickOutside() method called')
        this.props.setHideTaskPage(true);
    }

    render() {
        let { hidden, currentTask, allTasksData, taskProgress, updateProgress, taskLoader, setEditMode, isProgressUpdated } = this.props;
        let { hideProgressOptions, requestID } = this.state;
        return (
            <>
                <div className="row" id="task-page-container" hidden={hidden}>
                    <div className="col-md-12">
                        <div className="row offset-md-1">
                            <div className="col-md-12 ml-3">
                                <div className="row px-1 mx-4" id="individual-task-page-container">
                                    <div className="col-md-12 breadcrumb-container text-format">
                                        {currentTask.name === ''
                                            ?
                                            <>Tasks or events &gt; {currentTask.contractName}</>
                                            :
                                            <>Tasks or events &gt; {currentTask.contractName} &gt; {currentTask.name}</>
                                        }
                                    </div>

                                    {
                                        taskLoader === true ?
                                            <div className="col-md-12" style={{ height: '25rem', verticalAlign: 'middle', display: 'flex' }}>
                                                <CircleLoader />
                                            </div>
                                            :
                                            allTasksData.length === 0 || allTasksData === undefined ?
                                                <>
                                                    <div className="col-md-12" style={{ marginTop: '50px', marginBottom: '30px', textAlign: 'center' }}>
                                                        <img src="/static_images/empty-task-page-img.svg" alt="empty-tasks" />
                                                    </div>
                                                    <div className="col-md-12 text-format" style={{ textAlign: 'center' }}>
                                                        No tasks or events added yet.
                                                    </div>
                                                    <div className="col-md-12 create-task-link my-3" style={{ textAlign: 'center' }} onClick={(e) => setEditMode(false, defaultTask)}>
                                                        <span data-toggle="modal" data-target="#taskModal">Add new task here</span>
                                                    </div>
                                                    <div className="col-md-12 link-info" style={{ paddingLeft: '5rem', background: '#F7F7F7', marginBottom: '10rem' }}>
                                                        <ul>
                                                            <li className="my-3">Create events related to clauses by clicking on the <img src="/static_images/create-task-icn.svg" alt="empty-tasks" style={{ marginBottom: '5px' }} /> icon</li>
                                                            <li className="my-3">Assign members and set reminders and get notified about your tasks. </li>
                                                        </ul>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="col-md-12 breadcrumb-container table-header">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                Task name
                                                    </div>
                                                            <div className="col-md-3">
                                                                Assigned to
                                                    </div>
                                                            <div className="col-md-3">
                                                                Due date
                                                    </div>
                                                            <div className="col-md-3">
                                                                Progress
                                                    </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 create-task-link my-3" style={{ textAlign: 'left', paddingLeft: '2rem' }} onClick={(e) => setEditMode(false, defaultTask)}>
                                                        <span data-toggle="modal" data-target="#taskModal"><img src="/static_images/add-new-task-icn.svg" alt="" style={{ verticalAlign: 'baseline' }} /> Add new task</span>
                                                    </div>
                                                    <div className="col-md-12" style={{ padding: '0rem 0.7rem' }}>
                                                        <Scrollable maxHeight={380}>
                                                            {
                                                                allTasksData.length > 0 && allTasksData.map((task, key) =>
                                                                    <div id={key + ''} className="col-md-12 breadcrumb-container table-content" style={{ marginBottom: key === allTasksData.length - 1 ? '10rem' : '' }}>
                                                                        <div className="row">
                                                                            <div className="col-md-3" id="task-name">
                                                                                {/* {task.taskTitle} */}
                                                                                {task.taskTitle !== null && task.taskTitle.length > 10 ?
                                                                                    <>
                                                                                        <DarkTooltip title={task.taskTitle} placement="right-end">
                                                                                            <span style={{ display: 'initial' }}>
                                                                                                {truncateString(task.taskTitle, 10)}
                                                                                            </span>
                                                                                        </DarkTooltip>
                                                                                        <DarkTooltip title={'Edit Task'} placement="right-end" >
                                                                                            <span data-toggle="modal" data-target="#taskModal" className="cursor-pointer" onClick={(e) => setEditMode(true, task)}><img src="/static_images/edit-task-icn.svg"></img>
                                                                                            </span>
                                                                                        </DarkTooltip>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <span style={{ display: 'initial' }}>
                                                                                            {task.taskTitle}&nbsp;
                                                                                    </span>
                                                                                        <DarkTooltip title={'Edit Task'} placement="right-end" >
                                                                                            <span data-toggle="modal" data-target="#taskModal" className="cursor-pointer" onClick={(e) => setEditMode(true, task)}><img src="/static_images/edit-task-icn.svg"></img>
                                                                                            </span>
                                                                                        </DarkTooltip>
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                            <div className="col-md-3 p-0" id="assigned-to" style={task.associateGroup.length === 0 ? { display: 'block', left: '1.1vw' } : {}}>
                                                                                {task.associateGroup.length === 0 && <img src="/static_images/empty-dash.svg"></img>}
                                                                                {task.associateGroup.length < 3 &&

                                                                                    task.associateGroup.map((user: AssociateGroup, key: number) =>
                                                                                        <DarkTooltip title={user.name} placement="bottom">
                                                                                            <div className="avatar-circle-sm" style={{ marginLeft: key > 0 ? '0.5rem' : '', backgroundColor: user.hexCode }} >
                                                                                                <span className="initials">{user.aliasName}</span>
                                                                                            </div>
                                                                                        </DarkTooltip>
                                                                                    )
                                                                                }
                                                                                {task.associateGroup.length >= 3 && task.associateGroup.map((user: AssociateGroup, key: number) =>
                                                                                    key < 3 ? <DarkTooltip title={user.name} placement="bottom">
                                                                                        <div className="avatar-circle-sm" style={{ marginLeft: key > 0 ? '0.5rem' : '', backgroundColor: user.hexCode }} >
                                                                                            <span className="initials">{user.aliasName}</span>
                                                                                        </div>
                                                                                    </DarkTooltip>

                                                                                        : key === 3 ? <span id="extra-count"
                                                                                        // onClick={() => this.setModal(true, 'Assigned to', task.associateGroup.length, task.associateGroup)}
                                                                                        >{this.getExtraCount(task.associateGroup.length)}</span> : <> </>
                                                                                )
                                                                                }
                                                                            </div>
                                                                            <div className="col-md-3" id="due-date">
                                                                                {getDueDateFormat(task.dueDate)}
                                                                            </div>
                                                                            <div className="col-md-3" id="progress">
                                                                                <span onClick={() => this.setState({ hideProgressOptions: !hideProgressOptions, requestID: task.requestID })}>{task.progressName} {isProgressUpdated === -1 && task.requestID === requestID ? <img src="/static_images/small-loader.svg" /> : <img src="/static_images/expand-icn.svg" alt="img" />}
                                                                                </span>

                                                                                {task.requestID === requestID && <div id="progress-options-container" hidden={hideProgressOptions}>
                                                                                    {taskProgress.map((progress, key) =>
                                                                                        <p onClick={() => this.setState({ hideProgressOptions: true }, () => this.updateProgress(task.requestID, +progress.id))} >{progress.name}</p>
                                                                                    )}
                                                                                </div>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </Scrollable>
                                                    </div>
                                                </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default onClickOutside(TaskPagecomponent);
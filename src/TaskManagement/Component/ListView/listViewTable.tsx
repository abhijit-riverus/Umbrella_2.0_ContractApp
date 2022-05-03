import React, { Component } from 'react';
import { AllTasksData, AssociateGroup, ProgressNameList, ProgressUpdated } from '../../State/taskManagementPageState';
import Tooltip from '@material-ui/core/Tooltip';
import { getDueDateFormat, truncateFileName, truncateString } from '../../../Utils/DataModifierUtil/dataModUtil';
import { DarkTooltip } from '../../../DocumentView/Component/documentInsights';
import { getUserNameInitials } from '../Utils/taskManagementUtils';
import { isNullOrUndefined } from 'is-what';

export interface UpdateProgress{
    requestID: number,
    updatedTo: string
}

interface Props {
    allTasksData: AllTasksData[];
    setModal: (title: string, numberOfMembers: number, associateGroup: AssociateGroup[]) => void;
    progressNameList: ProgressNameList[];
    updateProgress: (requestID: number, progressID: number) => void;
    isProgressUpdated: number;
    updatedProgressQueue: ProgressUpdated[];
    resetUpdatedProgressQueue: (progressUpdated: ProgressUpdated[]) => void;
}

interface State {
    hideProgressOptions: boolean;
    requestID: number;
    updatedProgress: UpdateProgress[];
    updateProgressTo: string;
    executionQueue: ProgressUpdated[];
}

export default class ListViewTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hideProgressOptions: true,
            requestID: 0,
            updatedProgress: [],
            updateProgressTo: '',
            executionQueue: []
        }

    }
    getExtraCount = (numberOfAssociates: number) => {
        let extraCount = numberOfAssociates - 3;
        return '+' + extraCount;
    }

    setModal(check: boolean, title: string, numberOfMembers: number, associateGroup: AssociateGroup[]) {
        if (check) {
            this.props.setModal(title, numberOfMembers, associateGroup);
            let link = document.getElementById('taskManagementTableButton');
            !isNullOrUndefined(link) && link.click();
        }
    }

    updateProgress(requestID: number, progressID: number, updateProgressTo: string) {
        let { updateProgress } = this.props;
        updateProgress(requestID, progressID);
        let temp: ProgressUpdated = {
            requestID: requestID,
            progressID: progressID
        }
        this.state.executionQueue.push(temp);
        this.setState({ hideProgressOptions: !this.state.hideProgressOptions, updateProgressTo: updateProgressTo, executionQueue: this.state.executionQueue });
    }

    componentWillReceiveProps(nextProps: Props){
        if(this.props.updatedProgressQueue !== nextProps.updatedProgressQueue){
            if(this.state.executionQueue.length > 0){
                let temp = [...this.state.executionQueue] 
                let filteredData: ProgressUpdated[] = [];                
                
                for(let i = 0; i < temp.length; i++ ){
                    let isPush: boolean = false;
                    for(let j = 0; j < nextProps.updatedProgressQueue.length; j++){
                        if(nextProps.updatedProgressQueue[j].requestID !== this.state.executionQueue[i].requestID){
                            isPush = true;
                            // break;
                        } else {
                            isPush = false;
                        }
                    }

                    isPush === true && filteredData.push(temp[i]);
                }
                if(filteredData.length === 0){
                    nextProps.resetUpdatedProgressQueue(filteredData);
                }
                this.setState({updatedProgress: this.state.updatedProgress, executionQueue: filteredData}); 
            }
        }
    }

    render() {
        let { allTasksData, progressNameList, isProgressUpdated, updatedProgressQueue } = this.props;
        let { hideProgressOptions, requestID, executionQueue } = this.state;
        return (
            <>
                { allTasksData.map((task: AllTasksData, key: number) =>
                    <div className="col-md-12" style={{ borderBottom: '1px solid #E1E1E1', marginLeft: '0.8rem', height: '45px', backgroundColor: 'white' }}>
                        <div className="row list-view-table">
                            <div id="contract-name" className="col-md-2">
                                <span style={{ display: 'initial', cursor: 'pointer' }}
                                    // onClick={() => window.open('/document/tasks/' + btoa(task.contractID.toString()) + '/' + btoa(task.requestID.toString()), "_blank")}
                                    >
                                    {
                                    (task.taskTitle === null || task.taskTitle === '') && <img src="/static_images/empty-dash.svg"></img>
                                    }
                                    {task.taskTitle !== null && task.taskTitle.length > 25 ?
                                        <DarkTooltip title={task.taskTitle} placement="right-end">
                                            <span style={{ display: 'initial', cursor: 'pointer' }}
                                            onClick={() => window.open('/document/tasks/' + btoa(task.contractID.toString()) + '/' + btoa(task.requestID.toString()), "_blank")}
                                            >
                                                {truncateString(task.taskTitle, 25)}
                                            </span>
                                        </DarkTooltip>
                                    :
                                        <span style={{ display: 'initial', cursor: 'pointer' }} 
                                        onClick={() => window.open('/document/tasks/' + btoa(task.contractID.toString()) + '/' + btoa(task.requestID.toString()), "_blank")}
                                        >
                                        {task.taskTitle}
                                        </span>
                                }
                                </span>
                            </div>
                            <div id="contract-name" className="col-md-2">
                                {
                                    (task.contractName === null || task.contractName === '') && <img src="/static_images/empty-dash.svg"></img>
                                }

                                {task.contractName !== null && task.contractName.length > 15 ?
                                    <DarkTooltip title={task.contractName} placement="right-end">
                                        <span style={{ display: 'initial', cursor: 'pointer' }}
                                            onClick={() => window.open('/document/tasks/' + btoa(task.contractID.toString()), "_blank")}>
                                            {truncateFileName(task.contractName)}
                                        </span>
                                    </DarkTooltip>
                                    :
                                    <span style={{ display: 'initial', cursor: 'pointer' }} onClick={() => window.open('/document/tasks/' + btoa(task.contractID.toString()), "_blank")}>
                                        {task.contractName}
                                    </span>
                                }
                            </div>
                            <div id="clause-name" className="col-md-2">
                                {(task.clauseName === null || task.clauseName === '') ? <img src="/static_images/empty-dash.svg"></img> : task.clauseName}
                            </div>
                            <div id="assigned-to" className="col-md-2" style={task.associateGroup.length === 0 ? { display: 'block', left: '1.1vw' } : {}}>
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

                                        : key === 3 ? <span id="extra-count" onClick={() => this.setModal(true, 'Assigned to', task.associateGroup.length, task.associateGroup)}>{this.getExtraCount(task.associateGroup.length)}</span>
                                            : <> </>
                                )
                                }
                            </div>
                            <div id="date" className="col-md-1">
                                {(task.dueDate === null || task.dueDate === '') ? <img src="/static_images/empty-dash.svg"></img> : getDueDateFormat(task.dueDate)}
                            </div>
                            <div id="status" className="col-md-1 p-0">
                                {(task.stateName === null || task.stateName === '') ? <img src="/static_images/empty-dash.svg"></img> : task.stateName}
                            </div>
                            <div id="progress" className="col-md-2">
                                <span onClick={() => this.setState({ hideProgressOptions: !hideProgressOptions, requestID: task.requestID })}>
                                { task.progressName} 
                                {executionQueue.findIndex( i => i.requestID === task.requestID) > -1 
                                ? <img src="/static_images/small-loader.svg" /> 
                                : <img src="/static_images/expand-icn.svg" alt="img" />
                                }
                                </span>

                                {task.requestID === requestID && <div id="progress-options-container" hidden={hideProgressOptions}>
                                    {progressNameList.map((progress, key) =>
                                        <p onClick={() => this.updateProgress(task.requestID, +progress.id, progress.name)} >{progress.name}</p>
                                    )}
                                </div>}
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
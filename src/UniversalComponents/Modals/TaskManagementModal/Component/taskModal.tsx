import * as React from 'react';
import Task from './task';
import Reminder from './reminder';
import Link from './link';
import { TaskData, UserData, TaskState, CurrentTask, BIType, BISentence, ClauseType, TaskEdit, CheckList, Comments } from '../State/taskManagementState';
import { InsightsInterface } from "../../../../DocumentView/State/documentState";
import { isNullOrUndefined } from 'is-what';
import { reminderFrequencyType, reminderFrequencyTypeKey } from '../../../../Constants/const';
import { AllTasksData } from '../../../../TaskManagement/State/taskManagementPageState';
import Notes from './notes';
import Checklist from './checkList';
import CommentSection from './commentSection';

interface Props {
    userData: UserData[];
    taskData: TaskData;
    taskState: TaskState[];
    taskProgress: TaskState[];
    insightsData: InsightsInterface[];
    currentTask: CurrentTask;
    biType: BIType[];
    biSentence: BISentence;
    fileID: number;
    getUserData: () => void;
    getTaskState: () => void;
    getTaskProgress: () => void;
    getBIType: (clauseType: string) => void;
    getBISentence: (fileiID: number, biColumnName: string) => void;
    createTask: (taskData: TaskData) => void;
    clauseType: ClauseType[];
    editMode?: boolean;
    currentEditTaskData?: AllTasksData;
    updateTask: (taskData: TaskEdit) => void;
    biTypeLoader: boolean;
    biTextLoader: boolean;
    origin?: string; // insights or infobar
    comments: Comments[];
    postComment: (requestid: number, comment: string) => void;
    getComments: (requestId: number) => void;
    commentLoader: boolean;
}

interface State {
    addedUsers: UserData[];
    taskData: TaskData;
    selectedTaskState: TaskState;
    selectedBITypeValue: SelectedBIType;
    selectedfrequencyType: SelectedBIType;
    requestID: number;
    displayErrorMessage: boolean;
    errorMessage: string;
    absentFields: string[];
}

interface SelectedBIType {
    value: string
}

export default class TaskModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            addedUsers: [],
            taskData: {
                title: '',
                description: '',
                activityGroup: [],
                dueDate: '',
                progressID: 1,
                reminder: {
                    reminderType: 'Before',
                    reminderStart: 1,
                    reminderStartType: 'Days',
                    reminderUntil: '',
                    frequencyType: 'never'
                },
                link: {
                    fileID: 0,
                    clauseType: '',
                    biType: '',
                    linkedTableID: 0,
                    linkedText: ''
                },
                checkList: []
            },
            selectedTaskState: {
                id: 1,
                name: 'Not Started'
            },
            selectedBITypeValue: {
                value: ''
            },
            selectedfrequencyType: {
                value: 'Never'
            },
            requestID: 0,
            displayErrorMessage: false,
            errorMessage: 'Please enter all the mandatory fields',
            absentFields: [],
        };

        this.insertUsers = this.insertUsers.bind(this);
        this.insertTitle = this.insertTitle.bind(this);
        this.insertDueDate = this.insertDueDate.bind(this);
        this.insertStatus = this.insertStatus.bind(this);
        this.insertReminderDuration = this.insertReminderDuration.bind(this);
        this.insertReminderDurationType = this.insertReminderDurationType.bind(this);
        this.insertReminderDurationBeforeAfter = this.insertReminderDurationBeforeAfter.bind(this);
        this.insertReminderRepeatWhen = this.insertReminderRepeatWhen.bind(this);
        this.insertReminderRepeatUntil = this.insertReminderRepeatUntil.bind(this);
        this.insertClauseType = this.insertClauseType.bind(this);
        this.insertBIType = this.insertBIType.bind(this);
        this.insertLinkedText = this.insertLinkedText.bind(this);
        this.insertDescription = this.insertDescription.bind(this);
        this.insertComment = this.insertComment.bind(this);

        this.insertCheckListItem = this.insertCheckListItem.bind(this);
        // this.updateCheckListItem = this.updateCheckListItem.bind(this);

        this.insertState = this.insertState.bind(this);
        this.createTask = this.createTask.bind(this);
    }

    insertTitle(title: string) {
        let newState = this.state;
        newState.taskData.title = title;
        this.setState(newState);
    }

    insertDueDate(due: string) {
        let newState = this.state;
        newState.taskData.dueDate = due;
        this.setState(newState);
    }

    insertStatus(progressID: number) {
        let newState = this.state;
        newState.taskData.progressID = progressID;
        this.setState(newState);
    }

    insertReminderDuration(duration: string) {
        let newState = this.state;
        newState.taskData.reminder.reminderStart = parseInt(duration);
        this.setState(newState);
    }

    insertReminderDurationType(durationType: string) {
        let newState = this.state;
        newState.taskData.reminder.reminderStartType = durationType;
        this.setState(newState);
    }

    insertReminderDurationBeforeAfter(durationBeforeAfter: string) {
        let newState = this.state;
        newState.taskData.reminder.reminderType = durationBeforeAfter;
        this.setState(newState);
    }

    insertReminderRepeatWhen(repeatFrequency: string) {
        let newState = this.state;
        newState.selectedfrequencyType.value = repeatFrequency;
        newState.taskData.reminder.frequencyType = reminderFrequencyType[repeatFrequency];
        this.setState(newState);
    }

    insertReminderRepeatUntil(repeatUntil: string) {
        let newState = this.state;
        newState.taskData.reminder.reminderUntil = repeatUntil;
        this.setState(newState);
    }

    insertUsers(userData: UserData) {
        let newState = this.state;
        newState.addedUsers.push(userData);
        newState.taskData.activityGroup.push(userData.id);
        this.setState(newState);
    }

    insertDescription(description: string) {
        let newState = this.state;
        newState.taskData.description = description;
        this.setState(newState);
    }

    insertComment(description: string) {
        // let newState = this.state;
        // newState.taskData.description = description;
        // this.setState(newState);
    }

    removeUser = (userData: UserData) => {
        // let newState = this.state;
        let addedUsersCopy = this.state.addedUsers.map((user: UserData) => user);
        let filteredAD = addedUsersCopy.filter((user: UserData) => userData.id !== user.id);

        let activityGroupCopy = this.state.taskData.activityGroup.map((userid: number) => userid);
        let filteredAG = activityGroupCopy.filter((userid) => userData.id !== userid);
        let newTaskData = {
            title: this.state.taskData.title,
            description: this.state.taskData.description,
            activityGroup: filteredAG,
            dueDate: this.state.taskData.dueDate,
            progressID: this.state.taskData.progressID,
            reminder: {
                reminderType: this.state.taskData.reminder.reminderType,
                reminderStart: this.state.taskData.reminder.reminderStart,
                reminderStartType: this.state.taskData.reminder.reminderStartType,
                reminderUntil: this.state.taskData.reminder.reminderUntil,
                frequencyType: this.state.taskData.reminder.frequencyType
            },
            link: {
                fileID: this.state.taskData.link.fileID,
                clauseType: this.state.taskData.link.clauseType,
                biType: this.state.taskData.link.biType,
                linkedTableID: this.state.taskData.link.linkedTableID,
                linkedText: this.state.taskData.link.linkedText
            },
            checkList: this.state.taskData.checkList
        }
        this.setState({ addedUsers: filteredAD, taskData: newTaskData });
    }

    insertState(taskState: TaskState) {
        let newState = this.state;
        newState.taskData.progressID = taskState.id;
        newState.selectedTaskState.id = taskState.id;
        newState.selectedTaskState.name = taskState.name;
        this.setState(newState);
    }

    insertClauseType(clauseType: string) {
        let newState = this.state;
        newState.taskData.link.clauseType = clauseType;
        this.setState(newState);
    }

    insertBIType(biType: BIType) {
        let newState = this.state;
        newState.taskData.link.biType = biType.columnName;
        newState.selectedBITypeValue.value = biType.biType;
        this.setState(newState);
    }

    insertLinkedText(linkedText: string) {
        let newState = this.state;
        newState.taskData.link.linkedText = linkedText;
        this.setState(newState);
    }

    insertCheckListItem(item: string) {
        let checkListItem: CheckList = {
            id: -1,
            title: item,
            flag: false,
            delete: false
        }
        let newState = this.state;
        newState.taskData.checkList.push(checkListItem);
        this.setState(newState);
    }

    updateCheckListItem = (title: string, flag: boolean, updateType: string, id: number, editedTitle:string, index: number) => {

        switch(updateType){
            case 'checkbox': {
                // const itemsIndex = this.state.taskData.checkList.findIndex(item => item.title == title );

                let updatedCL = [...this.state.taskData.checkList];
                updatedCL[index] = {...updatedCL[index], flag: flag};
                

                let newTaskData = {
                    title: this.state.taskData.title,
                    description: this.state.taskData.description,
                    activityGroup: this.state.taskData.activityGroup,
                    dueDate: this.state.taskData.dueDate,
                    progressID: this.state.taskData.progressID,
                    reminder: {
                        reminderType: this.state.taskData.reminder.reminderType,
                        reminderStart: this.state.taskData.reminder.reminderStart,
                        reminderStartType: this.state.taskData.reminder.reminderStartType,
                        reminderUntil: this.state.taskData.reminder.reminderUntil,
                        frequencyType: this.state.taskData.reminder.frequencyType
                    },
                    link: {
                        fileID: this.state.taskData.link.fileID,
                        clauseType: this.state.taskData.link.clauseType,
                        biType: this.state.taskData.link.biType,
                        linkedTableID: this.state.taskData.link.linkedTableID,
                        linkedText: this.state.taskData.link.linkedText
                    },
                    checkList: updatedCL
                }
                this.setState({ taskData: newTaskData });
                break;
            }
            case 'title': {
                // const itemsIndex = this.state.taskData.checkList.findIndex(item => item.id == id );

                let updatedCL = [...this.state.taskData.checkList];
                updatedCL[index] = {...updatedCL[index], title: editedTitle};
                

                let newTaskData = {
                    title: this.state.taskData.title,
                    description: this.state.taskData.description,
                    activityGroup: this.state.taskData.activityGroup,
                    dueDate: this.state.taskData.dueDate,
                    progressID: this.state.taskData.progressID,
                    reminder: {
                        reminderType: this.state.taskData.reminder.reminderType,
                        reminderStart: this.state.taskData.reminder.reminderStart,
                        reminderStartType: this.state.taskData.reminder.reminderStartType,
                        reminderUntil: this.state.taskData.reminder.reminderUntil,
                        frequencyType: this.state.taskData.reminder.frequencyType
                    },
                    link: {
                        fileID: this.state.taskData.link.fileID,
                        clauseType: this.state.taskData.link.clauseType,
                        biType: this.state.taskData.link.biType,
                        linkedTableID: this.state.taskData.link.linkedTableID,
                        linkedText: this.state.taskData.link.linkedText
                    },
                    checkList: updatedCL
                }
                this.setState({ taskData: newTaskData });
                break;
            }
            case 'delete': {
                // const itemsIndex = this.state.taskData.checkList.findIndex(item => item.id == id );

                let updatedCL = [...this.state.taskData.checkList];
                updatedCL[index] = {...updatedCL[index], delete: true};
                // let filteredCL = updatedCL.filter((item: CheckList) => item.id !== id);

                let newTaskData = {
                    title: this.state.taskData.title,
                    description: this.state.taskData.description,
                    activityGroup: this.state.taskData.activityGroup,
                    dueDate: this.state.taskData.dueDate,
                    progressID: this.state.taskData.progressID,
                    reminder: {
                        reminderType: this.state.taskData.reminder.reminderType,
                        reminderStart: this.state.taskData.reminder.reminderStart,
                        reminderStartType: this.state.taskData.reminder.reminderStartType,
                        reminderUntil: this.state.taskData.reminder.reminderUntil,
                        frequencyType: this.state.taskData.reminder.frequencyType
                    },
                    link: {
                        fileID: this.state.taskData.link.fileID,
                        clauseType: this.state.taskData.link.clauseType,
                        biType: this.state.taskData.link.biType,
                        linkedTableID: this.state.taskData.link.linkedTableID,
                        linkedText: this.state.taskData.link.linkedText
                    },
                    checkList: updatedCL
                }
                this.setState({ taskData: newTaskData });
                break;
            }
        }
        
    }

    componentDidMount() {
        this.props.getTaskProgress();
        this.props.getUserData();
    }

    dismissModal = () => {
        // let dismissBtn = document.getElementById('request-close-btn');
        // setTimeout(() => { dismissBtn?.click() }, 1500);
        this.setState({
            addedUsers: [],
            taskData: {
                title: '',
                description: '',
                activityGroup: [],
                dueDate: '',
                progressID: 1,
                reminder: {
                    reminderType: 'Before',
                    reminderStart: 1,
                    reminderStartType: 'Days',
                    reminderUntil: '',
                    frequencyType: 'never'
                },
                link: {
                    fileID: 0,
                    clauseType: '',
                    biType: '',
                    linkedTableID: 0,
                    linkedText: ''
                },
                checkList: []
            },
            selectedTaskState: {
                id: 1,
                name: 'Not Started'
            },
            selectedBITypeValue: {
                value: ''
            },
            selectedfrequencyType: {
                value: 'Never'
            },
            requestID: 0,
            displayErrorMessage: false,
        });

    }

    passMandatoryFieldsCheck = () => {
        let { taskData } = this.state;
        if(taskData.title !== '' && taskData.link.clauseType !== '' && taskData.link.biType !== '' && taskData.link.linkedText !== ''){
            return true;
        } else {
            let absentFields: string[] = [];
            taskData.title === '' && absentFields.push('Title');
            taskData.link.clauseType === '' && absentFields.push('Clause Type');
            taskData.link.biType === '' && absentFields.push('BI Type');
            taskData.link.linkedText === '' && absentFields.push('Link To Text');
            let message: string = '';

            // this.state.absentFields = [...absentFields];
            this.setState({absentFields: [...absentFields]});

            switch(absentFields.length){
                case 1: {
                    message = 'Please enter ' +  absentFields[0];
                    break;
                }
                case 2: {
                    message = 'Please enter ' +  absentFields[0] + ' and ' + absentFields[1];
                    break;
                }
                case 3: {
                    message = 'Please enter ' +  absentFields[0] + ', ' + absentFields[1] + ', and ' + absentFields[2];
                    break;
                }
                case 4: {
                    message = 'Please enter ' +  absentFields[0] + ', ' + absentFields[1] + ', ' + absentFields[2] + ', and ' + absentFields[3];
                    break;
                }
            }
            this.setState({errorMessage: message});
            return false;
        }
    }

    createTask = () => {
        if(this.passMandatoryFieldsCheck() === true){

            let dismissModalLink = document.getElementById('dismissModalButton');
            !isNullOrUndefined(dismissModalLink) && dismissModalLink.click();
            
            this.setState({displayErrorMessage: false});

            let newState = this.state;
            newState.taskData.link.fileID = this.props.fileID;

            this.setState(newState);

            if (this.props.editMode === true) {
                let taskData: TaskEdit = {
                    requestID: this.state.requestID,
                    title: this.state.taskData.title,
                    description: this.state.taskData.description,
                    activityGroup: this.state.taskData.activityGroup,
                    dueDate: this.state.taskData.dueDate,
                    progressID: this.state.taskData.progressID + '',
                    reminder: this.state.taskData.reminder,
                    link: this.state.taskData.link,
                    checkList: this.state.taskData.checkList
                }
                this.props.updateTask(taskData)
            } else {
                // Dispatch action through prop
                this.props.createTask(newState.taskData);
            }
            let link = document.getElementById('taskStatusModalButton');
            !isNullOrUndefined(link) && link.click();

            this.setState({
                addedUsers: [],
                taskData: {
                    title: '',
                    description: '',
                    activityGroup: [],
                    dueDate: '',
                    progressID: 1,
                    reminder: {
                        reminderType: 'Before',
                        reminderStart: 1,
                        reminderStartType: 'Days',
                        reminderUntil: '',
                        frequencyType: 'never'
                    },
                    link: {
                        fileID: 0,
                        clauseType: '',
                        biType: '',
                        linkedTableID: 0,
                        linkedText: ''
                    },
                    checkList: []
                },
                selectedTaskState: {
                    id: 1,
                    name: 'Not Started'
                },
                selectedBITypeValue: {
                    value: ''
                },
                selectedfrequencyType: {
                    value: 'Never'
                },
                requestID: 0,
                displayErrorMessage: false,
            });
    } else {
        this.setState({displayErrorMessage: true});
    }
    }

    componentWillReceiveProps(nextProps: Props) {

        let { editMode, currentEditTaskData, userData, currentTask, getComments } = this.props;
        if (nextProps.editMode === true) {
            if (!isNullOrUndefined(currentEditTaskData) && !isNullOrUndefined(nextProps.currentEditTaskData)) {
                if (nextProps.currentEditTaskData !== currentEditTaskData) {

                    getComments(nextProps.currentEditTaskData.requestID);

                    let addedUsersCopy: UserData[] = [];
                    let activityGroupCopy: number[] = [];

                    for (let i = 0; i < nextProps.currentEditTaskData.associateGroup.length; i++) {
                        let usersData: UserData = {
                            id: nextProps.currentEditTaskData.associateGroup[i].profileID,
                            name: nextProps.currentEditTaskData.associateGroup[i].name,
                            email: nextProps.currentEditTaskData.associateGroup[i].email,
                            aliasName: nextProps.currentEditTaskData.associateGroup[i].aliasName,
                            hexID: nextProps.currentEditTaskData.associateGroup[i].hexID + '',
                            code: nextProps.currentEditTaskData.associateGroup[i].hexCode,
                        }
                        addedUsersCopy.push(usersData);
                    }

                    nextProps.currentEditTaskData.associateGroup.map(user => activityGroupCopy.push(user.profileID));

                    this.setState({
                        addedUsers: addedUsersCopy,
                        taskData: {
                            title: nextProps.currentEditTaskData.taskTitle,
                            description: nextProps.currentEditTaskData.description,
                            activityGroup: activityGroupCopy,
                            dueDate: nextProps.currentEditTaskData.dueDate,
                            progressID: nextProps.currentEditTaskData.progressID,
                            reminder: {
                                reminderType: nextProps.currentEditTaskData.reminder.reminderType,
                                reminderStart: nextProps.currentEditTaskData.reminder.reminderStart,
                                reminderStartType: nextProps.currentEditTaskData.reminder.reminderStartType,
                                reminderUntil: nextProps.currentEditTaskData.reminder.reminderUntil,
                                frequencyType: nextProps.currentEditTaskData.reminder.frequencyType
                            },
                            link: {
                                fileID: nextProps.currentEditTaskData.contractID,
                                clauseType: nextProps.currentEditTaskData.clauseName,
                                biType: nextProps.currentEditTaskData.biColumnName,
                                linkedTableID: 0,
                                linkedText: nextProps.currentEditTaskData.linkedText
                            },
                            checkList: nextProps.currentEditTaskData.checkList
                        },
                        selectedTaskState: {
                            id: nextProps.currentEditTaskData.progressID,
                            name: nextProps.currentEditTaskData.progressName
                        },
                        selectedBITypeValue: {
                            value: nextProps.currentEditTaskData.biType
                        },
                        selectedfrequencyType: {
                            value: reminderFrequencyTypeKey[nextProps.currentEditTaskData.reminder.frequencyType]
                        },
                        requestID: nextProps.currentEditTaskData.requestID,
                        displayErrorMessage: false
                    });
                }
            }
        }

    }

    render() {

        let { userData, getUserData, taskProgress, currentTask, getBIType,
            getBISentence, biType, biSentence, fileID, clauseType, biTypeLoader, biTextLoader, origin, comments, postComment, 
            getComments, commentLoader } = this.props;
        let { displayErrorMessage, errorMessage, absentFields } = this.state;
        return (

            <div className="col-md-12 col-12">
                <div className="row modal" id="taskModal" aria-labelledby="taskModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '1.2rem' }}>
                                    </div>
                                    <div className="col-md-4 modal-title" style={{ marginTop: '0.6rem', textAlign: 'center' }}>
                                        {this.props.editMode === true ? 'Edit Task or Event' : 'Add Task or Event'}
                                    </div>
                                    <div className="col-md-6" style={{ borderTop: '1px solid #996C84', marginTop: '1.2rem' }}>
                                    </div>
                                    <div className="col-md-1" onClick={() => this.dismissModal()}>
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer', marginTop: '0.5rem' }} id="request-close-btn">
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span>
                                    </div>
                                    <div className="col-md-12 modal-body">
                                        <div className="row">
                                            <div className="col-md-12 mt-12 ml-12 data-block">
                                                <Task getUserData={getUserData}
                                                    userData={userData}
                                                    insertUser={this.insertUsers}
                                                    addedUsers={this.state.addedUsers}
                                                    taskProgress={taskProgress}
                                                    selectedState={this.state.selectedTaskState}
                                                    insertState={this.insertState}
                                                    insertTitle={this.insertTitle}
                                                    insertDueDate={this.insertDueDate}
                                                    removeUser={this.removeUser}
                                                    title={this.state.taskData.title}
                                                    dueDate={this.state.taskData.dueDate} 
                                                    displayErrorMessage={displayErrorMessage}
                                                    absentFields = {absentFields}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row" style={{ paddingBottom: '2rem' }}>
                                            <div className="col-md-12 mt-12 ml-12 data-block">
                                                <Reminder insertReminderDuration={this.insertReminderDuration}
                                                    insertReminderDurationType={this.insertReminderDurationType}
                                                    insertReminderDurationBeforeAfter={this.insertReminderDurationBeforeAfter}
                                                    insertReminderRepeatWhen={this.insertReminderRepeatWhen}
                                                    insertReminderRepeatUntil={this.insertReminderRepeatUntil}
                                                    reminderStart={this.state.taskData.reminder.reminderStart}
                                                    reminderStartType={this.state.taskData.reminder.reminderStartType}
                                                    reminderType={this.state.taskData.reminder.reminderType}
                                                    frequencyType={this.state.taskData.reminder.frequencyType}
                                                    reminderUntil={this.state.taskData.reminder.reminderUntil}
                                                    selectedfrequencyType={this.state.selectedfrequencyType.value}
                                                />
                                            </div>
                                        </div>
                                        <div className="row" style={{ background: '#F5F5F5', border: '1px solid #E1E1E1', borderRadius: '0px', height: '166px' }}>
                                            <div className="col-md-12 mt-12 ml-12 data-block">
                                                <Link currentTask={currentTask}
                                                    clauseType={clauseType}
                                                    getBIType={getBIType}
                                                    getBISentence={getBISentence} biType={biType} biSentence={biSentence}
                                                    fileID={fileID}
                                                    insertClauseType={this.insertClauseType}
                                                    insertBIType={this.insertBIType}
                                                    insertLinkedText={this.insertLinkedText}
                                                    clauseTypeState={this.state.taskData.link.clauseType}
                                                    biTypeState={this.state.taskData.link.biType}
                                                    linkedTextState={this.state.taskData.link.linkedText}
                                                    selectedBITypeValue={this.state.selectedBITypeValue.value}
                                                    editModeOn={this.props.editMode}
                                                    contractName={this.props.currentEditTaskData?.contractName}
                                                    contractID={this.props.currentEditTaskData?.contractID}
                                                    biTypeLoader={biTypeLoader}
                                                    biTextLoader={biTextLoader}
                                                    origin={origin}
                                                    displayErrorMessage={displayErrorMessage}
                                                />

                                            </div>
                                        </div>

                                        <div className="row" style={{ paddingBottom: '2rem' }}>
                                            <Notes description={this.state.taskData.description} insertDescription={this.insertDescription} />
                                        </div>
                                        
                                        <div className="row" style={{ }}>
                                                <Checklist checkList={this.state.taskData.checkList} 
                                                insertCheckListItem={this.insertCheckListItem}
                                                updateCheckListItem={this.updateCheckListItem}
                                                />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8"></div>
                                            <div className="col-md-4 float-right">
                                                <span className="upload-yellow-btn ml-4" id="save-btn" style={this.props.editMode === true ? { padding: '1.3% 6%' } : {}}
                                                    onClick={(e) => this.createTask()} >
                                                    {this.props.editMode === true ? 'Save Changes' : 'Save'}
                                                </span>
                                                <button style={{ display: 'none' }} type="button" 
                                                data-dismiss="modal" id="dismissModalButton"></button>
                                            </div>
                                            { displayErrorMessage === true &&
                                            <>
                                                <div className="col-md-12" style={{color: 'red', textAlign: 'end'}}> 
                                                    {errorMessage}
                                                </div>
                                            </>
                                        }
                                        </div>
                                        { this.state.requestID !== 0 &&
                                        <div className="row" style={{ marginBottom: '0px' }}>
                                               <CommentSection comments={comments} postComment={postComment} 
                                               getComments={getComments} requestID={this.state.requestID} commentLoader={commentLoader}/>
                                        </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
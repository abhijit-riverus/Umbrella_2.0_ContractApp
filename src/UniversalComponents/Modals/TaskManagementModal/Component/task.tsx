import * as React from 'react';
import AddUser from './addUser';
import { UserData, TaskState } from '../State/taskManagementState';
import { isNullOrUndefined } from 'is-what';

interface Props {
    getUserData: () => void;
    userData: UserData[];
    insertUser: (userID: UserData) => void;
    removeUser: (userData: UserData) => void;
    addedUsers: UserData[],
    taskProgress: TaskState[],
    selectedState: TaskState,
    insertState: (taskState: TaskState) => void,
    insertTitle: (title: string) => void,
    insertDueDate: (dueDate: string) => void
    title: string;
    dueDate: string;
    displayErrorMessage: boolean;
    absentFields: string[];
}

interface State {
    showAddUser: boolean;
    showSetStatus: boolean;
    initialStatus: TaskState;
    hideAddUser: boolean;
    hideProgressOptions: boolean;
}

export default class Task extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showAddUser: false,
            showSetStatus: false,
            initialStatus: {
                id: 1,
                name: 'Not Started'
            },
            hideAddUser: true,
            hideProgressOptions: true,
        }

        this.props.insertState(this.state.initialStatus);
    }

    // componentDidMount() {
    //     document.addEventListener('mouseup', this.handleOutsideClick, false)
    // }

    // handleOutsideClick = (e: MouseEvent) => {
    //     let outsideDiv = document.getElementById('add-user-container');
    //     if (!isNullOrUndefined(outsideDiv)) {
    //         if (e.target === outsideDiv) {
    //         this.setState({ hideAddUser: true });
    //         }
    //     }
    // }

    togleSetStatus() {
        this.setState({
            showSetStatus: !this.state.showSetStatus
        })
    }

    // toggleShowAddUser() {
    //     this.setState({
    //         showAddUser: !this.state.showAddUser
    //     })
    // }

    setTaskState(taskState: TaskState) {
        this.props.insertState(taskState);
        this.togleSetStatus();
        this.setState({ hideProgressOptions: !this.state.hideProgressOptions });
    }


    componentWillReceiveProps(nextProps: Props) {

    }


    render() {
        let { getUserData, userData, insertUser, addedUsers, taskProgress, insertState, selectedState,
            insertTitle, insertDueDate, removeUser, title, dueDate, displayErrorMessage } = this.props;

        let { hideAddUser, hideProgressOptions } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-md-12 task-label required">
                        Enter Title
                    </div>
                    <div className="col-md-12 col-12" style={{ height: '35px'}}>
                        <input type="text" id="task-title"
                            className="task-title-input float-left mr-1" 
                            placeholder="Enter the name of the task" 
                            value={title} onChange={(e) => insertTitle(e.target.value)} 
                            style={{ backgroundColor: displayErrorMessage === true && title === '' ? '#ffdddd' : '', border: displayErrorMessage === true && title.length === 0 ? '2px solid #c00000' : '' }}
                            />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1 col-1 mt-3" style={{}}>
                        <img alt='Add Member' id="add-member" src='/static_images/add-icn.svg' 
                        onClick={() => this.setState({ hideAddUser: !hideAddUser })} />
                    </div>

                    {addedUsers.length > 0 &&
                        <div className="col-md-11 mt-2">
                            {addedUsers.map(el =>
                                <p data-letters={el.aliasName} data-toggle="tooltip" data-placement="bottom" title={el.name} style={{ background: el.code }}>{el.aliasName}</p>
                            )}
                        </div>
                    }

                </div>

                {/* { this.state.showAddUser && */}
                {/* <div className="row" id="addUser-container"> */}
                <AddUser getUserData={getUserData} userData={userData} insertUser={insertUser} hideAddUser={hideAddUser} addedUsers={addedUsers} removeUser={removeUser} setHideAddUser={(hideAddUser: boolean) => this.setState({ hideAddUser: hideAddUser })}/>
                {/* </div> */}
                {/* } */}

                <div className="row task-label" style={{ marginTop: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #D6D6D6' }}>
                    <div className="col-md-2 pr-0">Due Date: </div>
                    <div className="col-md-4" style={{ paddingLeft: '7px' }}>
                        <input type="date" id="due-date-input" value={dueDate} onChange={(e) => insertDueDate(e.target.value)}></input></div>
                    <div className="col-md-2 pr-0 pl-2">Progress: </div>
                    <div className="col-md-4 pl-0">
                        <div id="progress-input" onClick={() => this.setState({ hideProgressOptions: !hideProgressOptions })}>
                            {selectedState.name}
                            <span className="float-right" style={{ padding: '0px 6px' }}>
                                <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" />
                            </span>
                        </div>
                        <div id="progress-options-container" className="progress-options" style={{ width: '90%' }} hidden={hideProgressOptions}>
                            {taskProgress.map((progress, key) =>
                                <p onClick={(e) => this.setTaskState(progress)} style={{ padding: '7px 7px 5px' }}>{progress.name}</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
import React, { Component } from 'react'
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon'
import { History } from 'history';
import Listview from './ListView/listView';
import { AllTasksData, ProgressNameList, ProgressUpdated, TaskCount } from '../State/taskManagementPageState';
import TaskModal from '../../UniversalComponents/Modals/TaskManagementModal/Container/taskModalCon';


interface Props {
    history: History;
    pageWatcher: (page: string) => void;
    allTasksData: AllTasksData[];
    getAllTasksData: (fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string) => void;
    getLastUpdatedOn: (selfAssigned: boolean) => void;
    lastUpdate: string;
    progressNameList: ProgressNameList[];
    getProgressNameList: () => void;
    isProgressUpdated: number;
    updateProgress: (requestID: number, progressID: number) => void;
    getTaskCount: () => void;
    taskCount: TaskCount;
    loader: boolean;
    lastUpdatedOnLoader: boolean;
    taskCountLoader: boolean;
    updatedProgressQueue: ProgressUpdated[];
    resetUpdatedProgressQueue: (progressUpdated: ProgressUpdated[]) => void;
}

interface State {
    tabs: string[];
    activeTabName: string;
    activeTaskFilter: string;
    sort: string;
    order: string;

}
export default class TaskManagement extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            tabs: ['List View'],
            activeTabName: 'List View',
            activeTaskFilter: 'All tasks',
            sort: 'title',
            order: 'asc',
        }

    }

    componentDidMount() {
        let { pageWatcher, getAllTasksData, getLastUpdatedOn, getProgressNameList, getTaskCount } = this.props;
        pageWatcher('tasks');
        getAllTasksData(0, 0, 'title', 'asc', false, '');
        getLastUpdatedOn(true);
        getProgressNameList();
        getTaskCount();
    }

    componentWillReceiveProps(nextProps: Props) {
        let { getAllTasksData } = this.props;
        let { sort, order, activeTaskFilter } = this.state;
        // if (nextProps.isProgressUpdated !== this.props.isProgressUpdated && nextProps.isProgressUpdated !== -1) {
        //     if (activeTaskFilter === 'My Tasks') {
        //         getAllTasksData(0, 0, sort, order, true, '');
        //     } else {
        //         getAllTasksData(0, 0, sort, order, false, '');
        //     }
        // }
    }

    switchView = () => {
        let { allTasksData, getAllTasksData, progressNameList, updateProgress, loader, isProgressUpdated, updatedProgressQueue, resetUpdatedProgressQueue } = this.props;
        switch (this.state.activeTabName) {
            case 'List View': {
                return (
                    <Listview allTasksData={allTasksData} 
                    setSortAndOrder={(sort: string, order: string) => this.setState({ sort: sort, order: order })} 
                    getAllTasksData={getAllTasksData} 
                    progressNameList={progressNameList} 
                    updateProgress={updateProgress} loader={loader} 
                    isProgressUpdated={isProgressUpdated} 
                    updatedProgressQueue={updatedProgressQueue}
                    resetUpdatedProgressQueue={resetUpdatedProgressQueue}
                    />
                )

            }
            case 'Card view': {
                return (
                    <>
                    </>
                )
            }
            case 'Card view': {
                return (
                    <>
                    </>
                )
            }

            default:
                break;
        }
    }

    onClickMyTasks = () => {
        let { sort, order } = this.state;
        this.setState({ activeTaskFilter: 'My Tasks' });
        this.props.getAllTasksData(0, 0, sort, order, true, '');
    }

    onClickAllTasks = () => {
        let { sort, order } = this.state;
        this.setState({ activeTaskFilter: 'All tasks' });
        this.props.getAllTasksData(0, 0, sort, order, false, '');
    }

    onClickAddTasks = (fileName: string) => {
        // let { setTaskPage, setCurrentTask, getAllTasksData, fileID, getClauseType } = this.props;
        // let { hideTaskPage } = this.state;
        // setCurrentTask('', '', fileName);
        // setTaskPage(hideTaskPage);
        // getAllTasksData(fileID, '', '', false, '');
        // getClauseType();
    }

    render() {
        let { history, getAllTasksData, lastUpdate, taskCount, lastUpdatedOnLoader, taskCountLoader, isProgressUpdated, updatedProgressQueue } = this.props;
        let { activeTaskFilter } = this.state
        return (
            <>
                <div className="row">
                    <div className="col-md-1" style={{ zIndex: 2 }}>
                        <SideNavbar history={history} />
                    </div>
                    <div className="col-md-11 mt-5">
                        <div className="row mr-2">
                            <div className="col-md-12 mt-3">
                                <div className="row">
                                    <div className="col-md-12 pl-0">
                                        <h4 style={{ fontWeight: 600 }}>Tasks</h4>
                                        <h6 className="tasks-subtitle">Last Updated on {lastUpdatedOnLoader === true ? <> &nbsp;<img src="/static_images/small-loader.svg" /></> : lastUpdate}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mr-2" style={{ borderBottom: '1px solid #E1E1E1', backgroundColor: 'white' }}>
                            <div className="col-md-6 mt-3" id="tasks-tab-container" style={{ width: '-webkit-fill-available' }}>
                                <div className="row">
                                    {this.state.tabs.map((label, i) => (
                                        <>
                                            <div className={this.state.activeTabName === label ? "col-md-3 active-tasks-tab-label" : "col-md-3 default-tasks-tab-label"} id={'l' + i} onClick={() => this.setState({ activeTabName: label })}>{label}</div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-6 align-right" style={{ width: '-webkit-fill-available' }}>
                                {/* <button type="button" style={{ marginTop: '15px', padding: '1.3% 3%', display: 'inline-flex' }} className="upload-yellow-btn" data-toggle="modal" data-target="#taskModal">Add Tasks</button> */}
                            </div>
                        </div>
                        <div className="row mr-2" style={{ borderBottom: '1px solid #E1E1E1', backgroundColor: 'white' }}>
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-6 align-left">
                                        {activeTaskFilter === 'All tasks' ?
                                            <button className='active-filter-button'>All tasks <span className="all-tasks-count">{taskCountLoader === true ? <img src="/static_images/small-loader.svg" /> : taskCount.allTaskCount}</span></button>
                                            :
                                            // <div className="col-md-6 align-left">
                                            <div className="my-tasks-link" onClick={this.onClickAllTasks}>All tasks <span className="all-tasks-count">{taskCountLoader === true ? <img src="/static_images/small-loader.svg" /> : taskCount.allTaskCount}</span></div>
                                            // </div>
                                        }
                                    </div>
                                    <div className="col-md-6 align-left">
                                        {
                                            activeTaskFilter === 'My Tasks' ?
                                                <button className='active-filter-button'>My Tasks <span className="all-tasks-count">{taskCountLoader === true ? <img src="/static_images/small-loader.svg" /> : taskCount.myTaskCount}</span></button>
                                                :
                                                // <div className="col-md-6 align-left">
                                                <div className="my-tasks-link" onClick={this.onClickMyTasks}>My Tasks <span className="all-tasks-count">{taskCountLoader === true ? <img src="/static_images/small-loader.svg" /> : taskCount.myTaskCount}</span></div>
                                            // </div>
                                        }

                                    </div>
                                    {/* <div className="col-md-6 align-left">
                                        <div className={activeTaskFilter === 'My Tasks' ? 'active-filter-button' :"my-tasks-link"}>My Tasks <span className="all-tasks-count">5</span></div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row mr-2" >
                            {this.switchView()}
                        </div>
                    </div>
                    {/* <TaskModal fileID={0} /> */}
                </div>
            </>
        )
    }
}


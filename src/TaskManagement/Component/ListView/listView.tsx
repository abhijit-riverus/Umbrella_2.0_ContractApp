import React, { Component } from 'react'
import BarLoader from '../../../UniversalComponents/Loader/barLoader'
import TaskManagementTablemodal from '../../../UniversalComponents/Modals/TaskManagementTableModal/taskManagementTableModal'
import Scrollable from '../../../UniversalComponents/Scrollable/scrollable'
import { AllTasksData, AssociateGroup, ProgressNameList, ProgressUpdated } from '../../State/taskManagementPageState'
import ListViewHeader from './listViewHeader'
import ListViewTable from './listViewTable'

interface Props {
    allTasksData: AllTasksData[];
    setSortAndOrder: (sort: string, order: string) => void;
    getAllTasksData: (fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string) => void;
    progressNameList: ProgressNameList[];
    updateProgress: (requestID: number, progressID: number) => void;
    loader: boolean;
    isProgressUpdated: number;
    updatedProgressQueue: ProgressUpdated[];
    resetUpdatedProgressQueue: (progressUpdated: ProgressUpdated[]) => void;
}

interface State {
    title: string;
    numberOfMembers: number;
    associateGroup: AssociateGroup[];
}

export default class Listview extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            title: '',
            numberOfMembers: 0,
            associateGroup: []
        }

    }

    componentDidMount() {

    }

    render() {
        let { setSortAndOrder, getAllTasksData, progressNameList, updateProgress, loader, isProgressUpdated, updatedProgressQueue, resetUpdatedProgressQueue } = this.props;
        let { title, numberOfMembers, associateGroup } = this.state;
        return (
            <>
                <div className="col-md-12 p-0" style={{}}>
                    <div className="row" style={{ borderBottom: '1px solid #E1E1E1', marginLeft: '0rem', marginRight: '0rem', backgroundColor: 'white' }}>
                        <ListViewHeader setSortAndOrder={setSortAndOrder} getAllTasksData={getAllTasksData} />
                    </div>
                    <Scrollable maxHeight={420}>
                        <div className="row mr-2" style={{ marginBottom: '200px' }}>
                            {loader === true ? <BarLoader />
                                :
                                <ListViewTable allTasksData={this.props.allTasksData} 
                                setModal={(title: string, numberOfMembers: number, associateGroup: AssociateGroup[]) => this.setState({ title: title, numberOfMembers: numberOfMembers, associateGroup: associateGroup })} 
                                progressNameList={progressNameList} 
                                updateProgress={updateProgress} 
                                isProgressUpdated={isProgressUpdated} 
                                updatedProgressQueue={updatedProgressQueue}
                                resetUpdatedProgressQueue={resetUpdatedProgressQueue}
                                />
                            }
                        </div>
                    </Scrollable>
                    <TaskManagementTablemodal title={title} numberOfMembers={numberOfMembers} associateGroup={associateGroup} />
                    <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#taskManagementTableModal" id="taskManagementTableButton"></button>
                </div>
            </>
        )
    }
}

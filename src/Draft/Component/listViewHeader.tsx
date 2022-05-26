import React, { Component } from 'react'

interface Props {
    setSortAndOrder: (sort: string, order: string) => void;
    getAllTasksData: (fileID: number, requestID: number, sort: string, order: string, selfAssigned: boolean, clauseType: string) => void;
}

interface State {
    sort: string;
    titleOrder: boolean;
    fileNameOrder: boolean;
    dueOrder: boolean;
    progressNameOrder: boolean;
    stateNameOrder: boolean;
    clauseNameOrder: boolean;
}

export default class ListViewHeader extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            sort: 'title',
            titleOrder: true,
            fileNameOrder: false,
            dueOrder: false,
            progressNameOrder: false,
            stateNameOrder: false,
            clauseNameOrder: false,
        }

    }

    setSortingAndOrder(sortBy: string) {
        let { titleOrder, fileNameOrder, dueOrder, progressNameOrder, stateNameOrder, clauseNameOrder } = this.state;
        let { setSortAndOrder, getAllTasksData } = this.props;
        switch (sortBy) {
            case 'title': {
                if (titleOrder) {
                    let order = 'asc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                } else {
                    let order = 'desc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                }
                break;
            }
            case 'file_name': {
                if (fileNameOrder) {
                    let order = 'asc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                } else {
                    let order = 'desc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                }
                break;
            }
            case 'due': {
                if (dueOrder) {
                    let order = 'asc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                } else {
                    let order = 'desc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                }
                break;
            }
            case 'progress_name': {
                if (progressNameOrder) {
                    let order = 'asc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                } else {
                    let order = 'desc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                }
                break;
            }
            case 'state_name': {
                if (stateNameOrder) {
                    let order = 'asc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                } else {
                    let order = 'desc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                }
                break;
            }
            case 'clause_name': {
                if (clauseNameOrder) {
                    let order = 'asc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                } else {
                    let order = 'desc';
                    setSortAndOrder(sortBy, order);
                    getAllTasksData(0, 0, sortBy, order, false, '');
                }
                break;
            }
            default:
                break;
        }

    }

    render() {
        let { titleOrder, fileNameOrder, dueOrder, progressNameOrder, stateNameOrder, clauseNameOrder, sort } = this.state;
        return (
            <>
                <div className="col-md-12 p-0">
                    <div className="row list-view-header">
                        <div className="col-md-1" >
                            Project Name
                        </div>
                        <div className="col-md-2"
                        >
                            Contract Name
                        </div>
                        <div className="col-md-2"
                        >
                            Contract Type
                        </div>
                        <div className="col-md-2">
                            Counter-party Name
                        </div>
                        <div className="col-md-1"
                        >
                            Owner
                        </div>
                        <div className="col-md-1"
                        >
                            Created on
                        </div>
                        <div className="col-md-2"
                        >
                            Current Status
                        </div>
                        <div className="col-md-1"
                        >
                            Deadline
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

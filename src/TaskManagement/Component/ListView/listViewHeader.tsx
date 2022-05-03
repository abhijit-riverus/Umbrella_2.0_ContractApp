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
                        <div className="col-md-2 sorting-option" onClick={() => this.setState({ sort: 'title', titleOrder: !titleOrder, fileNameOrder: true, dueOrder: true, progressNameOrder: true, stateNameOrder: true, clauseNameOrder: true }, () => { this.setSortingAndOrder('title') })} >
                            All Tasks { sort === 'title' ?
                            titleOrder === true 
                            ? <img src="/static_images/down-arrow.svg" /> 
                            : <img src="/static_images/up-arrow.svg" />
                            : <></>
                            }
                        </div>
                        <div className="col-md-2 sorting-option" onClick={() => this.setState({ sort: 'file_name', fileNameOrder: !fileNameOrder, titleOrder: true, dueOrder: true, progressNameOrder: true, stateNameOrder: true, clauseNameOrder: true }, () => { this.setSortingAndOrder('file_name') })}>
                            Contract { sort === 'file_name' ?
                            fileNameOrder === true 
                            ? <img src="/static_images/down-arrow.svg" /> 
                            : <img src="/static_images/up-arrow.svg" />
                            : <></>
                            }
                        </div>
                        <div className="col-md-2 sorting-option" 
                        onClick={() => this.setState({ sort: 'clause_name', clauseNameOrder: !clauseNameOrder, titleOrder: true, dueOrder: true, progressNameOrder: true, stateNameOrder: true, fileNameOrder: true }, () => { this.setSortingAndOrder('clause_name') })}
                        style={{paddingLeft: '1.3rem'}}
                        >
                            Clause { sort === 'clause_name' ?
                            clauseNameOrder === true 
                            ? <img src="/static_images/down-arrow.svg" /> 
                            : <img src="/static_images/up-arrow.svg" />
                            : <></>
                            }
                        </div>
                        <div className="col-md-2" style={{paddingLeft: '0.4rem'}}>
                            Assigned to
                        </div>
                        <div className="col-md-1 sorting-option" 
                        onClick={() => this.setState({ sort: 'due', dueOrder: !dueOrder, titleOrder: true, clauseNameOrder: true, progressNameOrder: true, stateNameOrder: true, fileNameOrder: true }, () => { this.setSortingAndOrder('due') })}
                        style={{right: '2vw', paddingLeft: '1.5rem'}}
                        >
                            Date { sort === 'due' ?
                            dueOrder === true 
                            ? <img src="/static_images/down-arrow.svg" /> 
                            : <img src="/static_images/up-arrow.svg" />
                            : <></>
                            }
                        </div>
                        <div className="col-md-1 sorting-option" 
                        onClick={() => this.setState({ sort: 'state_name', stateNameOrder: !stateNameOrder, titleOrder: true, clauseNameOrder: true, progressNameOrder: true, dueOrder: true, fileNameOrder: true }, () => { this.setSortingAndOrder('state_name') })}
                        style={{right: '2vw', paddingLeft: '0.5rem'}}
                        >
                            Status { sort === 'state_name' ?
                            stateNameOrder === true 
                            ? <img src="/static_images/down-arrow.svg" /> 
                            : <img src="/static_images/up-arrow.svg" />
                            : <></>
                            }
                        </div>
                        <div className="col-md-2 sorting-option" 
                        onClick={() => this.setState({ sort: 'progress_name', progressNameOrder: !progressNameOrder, titleOrder: true, clauseNameOrder: true, stateNameOrder: true, dueOrder: true, fileNameOrder: true }, () => { this.setSortingAndOrder('progress_name') })}
                        style={{right: '2vw', paddingLeft: '1.2rem'}}
                        >
                            Progress { sort === 'progress_name' ?
                            progressNameOrder === true 
                            ? <img src="/static_images/down-arrow.svg" /> 
                            : <img src="/static_images/up-arrow.svg" />
                            : <></>
                        }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

import React, { Component } from 'react';

interface Props{
    getSavedConfigurationData: (sortBy: string, sortOrder: string) => void;
    reportSortBy: string;
    reportSortOrder: string;
}

interface State{
}
export default class ReportsHeader extends Component < Props, State > {
    constructor(props: Props) {
        super(props)

        this.state = {
        }

    }

    render(){
        let { reportSortBy, reportSortOrder } = this.props;
        return (
            <div className="row reports-header-container mr-2">
                <div className="col-md-1" style={{paddingTop: '0.8%'}}>
                    ID
                </div>
                <div className="col-md-3 report-header" onClick={()=> this.sortOn('title')} >
                    Report Name&nbsp;
                    {reportSortBy === 'title' && reportSortOrder === 'descending'
                        && <img className="cursor-pointer" src="/static_images/up-arrow.svg" alt="up-arrow" />
                    }
                    { reportSortBy === 'title' && reportSortOrder === 'ascending'
                        && <img className="cursor-pointer" src="/static_images/down-arrow.svg" alt="down-arrow" />
                    }
                </div>
                <div className="col-md-2 report-header" onClick={()=> this.sortOn('email')} >
                    Created By&nbsp;
                    {reportSortBy === 'email' && reportSortOrder === 'descending'
                        && <img className="cursor-pointer" src="/static_images/up-arrow.svg" alt="up-arrow" />
                    }
                    { reportSortBy === 'email' && reportSortOrder === 'ascending'
                        && <img className="cursor-pointer" src="/static_images/down-arrow.svg" alt="down-arrow" />
                    }
                </div>
                <div className="col-md-2 report-header" onClick={()=> this.sortOn('date')} >
                    Date&nbsp;
                    {reportSortBy === 'date' && reportSortOrder === 'descending'
                        && <img className="cursor-pointer" src="/static_images/up-arrow.svg" alt="up-arrow" />
                    }
                    { reportSortBy === 'date' && reportSortOrder === 'ascending'
                        && <img className="cursor-pointer" src="/static_images/down-arrow.svg" alt="down-arrow" />
                    }
                </div>
                <div className="col-md-2" style={{paddingTop: '0.8%'}}>
                    Details
                </div>
                <div className="col-md-2" style={{paddingTop: '0.8%'}}>
                    Actions
                </div>
            </div>
        );
    }

    sortOn(title: string){
        let {reportSortOrder, reportSortBy} = this.props;
        let tempSortby: string = '';        
        let tempSortOrder: string = '';
        if(title === reportSortBy){
            if(reportSortOrder === 'descending'){
                tempSortOrder = 'ascending';
            } else {
                tempSortOrder = 'descending';
            }
        } else {
            tempSortOrder = 'ascending';
        }
        
        tempSortby = title;
        this.props.getSavedConfigurationData(tempSortby, tempSortOrder);
    }
}
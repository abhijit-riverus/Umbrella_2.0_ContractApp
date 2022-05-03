import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { AnalysisFilterStructure, FilterStructure } from '../../Analysis/State/analysisState';
import { NewAnalysisFilterStructure } from '../../NewAnalysis/State/newAnalysisState';
import { getDateFormat, truncateString } from '../../Utils/DataModifierUtil/dataModUtil';
import { ReportsTableData, SavedConfigurationData } from '../State/reportsState'
import { History } from 'history';
import HeimdallUtil from '../../UniversalComponents/HeimdallChild/HeimdallUtil/heimdallUtil';
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';

interface Props {
    setModal: (savedConfigName: string, savedConfigId: number, numberOfFiles: number, filtersApplied: NewAnalysisFilterStructure[]) => void;
    savedConfigurationData: SavedConfigurationData[];
    history: History;
    reportSortBy: string;
    reportSortOrder: string;
    saveDeleteSavedConfigDetails: ( savedConfigId: number, savedConfigName: string) => void;
}

interface State {

}

export default class Reportstable extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }

    }

    setModal(check: boolean, reportName: string, reportId: number, numberOfFiles: number, filtersApplied: AnalysisFilterStructure[]) {
        if (check) {
            this.props.setModal(reportName, reportId, numberOfFiles, filtersApplied);
            let link = document.getElementById('reportsTableButton');
            !isNullOrUndefined(link) && link.click();
        }
    }

    handleDeleteReport = (reportId: number, reportName: string) => {
        this.props.saveDeleteSavedConfigDetails(reportId, reportName);
        let link = document.getElementById('deleteReportButton');
        !isNullOrUndefined(link) && link.click();

    }

    render() {
        let { savedConfigurationData, history } = this.props;
        return (
            <>
                {savedConfigurationData.map((savedConfig: SavedConfigurationData, i: number) =>
                    <div className="row reports-table mr-2 mt-3 mb-1" key={i} >
                        <div style={{ fontStyle: 'italic' }} className="col-md-1 data-info">
                            {savedConfig.id}
                        </div>
                        <div className="col-md-3 data-info" style={{ color: '#88305F', cursor: 'pointer' }} onClick={() => history.push({ pathname: '/analysis' , state: { selectedSavedConfig: savedConfig } })}>
                            {savedConfig.title.length > 50 ?
                                truncateString(savedConfig.title, 50)
                                :
                                savedConfig.title
                            }
                        </div>
                        <div className="col-md-2 data-info">
                            {savedConfig.createdby}
                        </div>
                        <div className="col-md-2 data-info">
                            {getDateFormat(savedConfig.createdon)}
                        </div>
                        <div className="col-md-2 data-info" style={{ paddingTop: '0.4%', paddingLeft: '1%' }}>
                            <div className="row">
                                <div className="col-md-10">{savedConfig.last_result_count} files</div>
                                <div className="col-md-10" onClick={()=>this.setModal(true, savedConfig.title, Number(savedConfig.id),Number(savedConfig.last_result_count),savedConfig.filter)}><span className="view-more">View</span></div>
                            </div>
                        </div>
                        <div className="col-md-2 data-info">
                            <div className="row">
                                <div className="col-md-6">
                                    {savedConfig.createdby !== HeimdallUtil.getEmailId()  ?
                                        <img className="clause-copy-icn" src="/static_images/clause-libary-delete-inactive-icn.svg" alt="folder-delete-disabled" />
                                    :
                                        <DarkTooltip title={'Delete'} placement="right-end">
                                            <div style={{ paddingBottom: '5px', cursor: 'pointer' }} onClick={() => this.handleDeleteReport(Number(savedConfig.id), savedConfig.title)}>
                                                <img src="/static_images/delete-report.svg" alt="delete-report" />
                                            </div>
                                        </DarkTooltip>
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                )
                }
            </>
        )
    }
}
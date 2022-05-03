import React, { Component } from 'react'
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon'
import { History } from 'history';
import ReportsHeader from './reportsHeader';
import { ReportsTableData, SavedConfigurationData } from '../State/reportsState';
import Reportstable from './reportsTable';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import Reportstablemodal from '../../UniversalComponents/Modals/ReportsTableModal/reportsTableModal';
import BarLoader from '../../UniversalComponents/Loader/barLoader';
import DeleteReportModal from '../../UniversalComponents/Modals/DeleteReportModal/deleteReportCon';
import { NewAnalysisFilterStructure } from '../../NewAnalysis/State/newAnalysisState';


interface Props {
    history: History;
    pageWatcher: (page: string) => void;
    getAllReportsData: (sort: string, order: string) => void;
    reportsTableData: ReportsTableData[];
    generateReportSuccess: (csvLink: string) => void;
    generateReportFailure: () => void;
    deleteSuccess: boolean;
    reportsTableLoader: boolean;
    savedConfigurationData: SavedConfigurationData[];
    getSavedConfigurationData: (sortBy: string, sortOrder: string) => void;
    reportSortBy: string;
    reportSortOrder: string;
    deleteSavedConfiguration: (id: number, sortBy: string, sortOrder: string) => void;
    deleteSavedConfigStatus: number;
    deleteSavedConfigId: number;
    deleteSavedConfigName: string;
    saveDeleteSavedConfigDetails: ( savedConfigId: number, savedConfigName: string) => void;
}
interface State {
    savedConfigName: string;
    savedConfigId: number;
    numberOfFiles: number;
    filtersApplied: NewAnalysisFilterStructure[];
}

export default class Reports extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            savedConfigName: '',
            savedConfigId: -1,
            numberOfFiles: 0,
            filtersApplied: []
        }
    }

    componentDidMount() {
        let { pageWatcher, reportSortBy, reportSortOrder } = this.props;
        pageWatcher('reports');
        this.props.getSavedConfigurationData(reportSortBy, reportSortOrder);
    }

    render() {
        let { history, reportsTableLoader, savedConfigurationData, reportSortBy, reportSortOrder, getSavedConfigurationData, deleteSavedConfiguration, deleteSavedConfigId, deleteSavedConfigName, deleteSavedConfigStatus, saveDeleteSavedConfigDetails } = this.props
        let { savedConfigName, savedConfigId, numberOfFiles, filtersApplied } = this.state;
        return (
            <>
                <div className="row">
                    <div className="col-md-1" style={{ zIndex: 2 }}>
                        <SideNavbar history={history} />
                    </div>
                    <div className="col-md-11 mt-5">
                        <div className="row">
                            <div className="col-md-12 mt-3">
                                <div className="row">
                                    <div className="col-md-12 pl-0">
                                        <h4>Reports</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {reportsTableLoader === true ?
                            <BarLoader />
                        :
                            <>
                                { !(savedConfigurationData !== null && savedConfigurationData.length > 0) ?
                                    <div className="row">
                                        <div className="col-md-10 text-center mt-5 ml-5">
                                            <div className="tagline">Digitize your contracts and get instant insights!</div>
                                            <img className="cursor-pointer" alt="add-files" src="/static_images/go-back-upload-img.svg" onClick={() => window.location.href = '/addfiles'} />
                                        </div>
                                    </div>
                                :
                                    <>
                                        <div className="row">
                                            <div className="col-md-12 mt-5 mb-2">
                                                <ReportsHeader reportSortBy={reportSortBy} reportSortOrder={reportSortOrder} getSavedConfigurationData={getSavedConfigurationData} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <Scrollable maxHeight={480}>
                                                    <Reportstable history={history} setModal={(savedConfigName: string, savedConfigId: number, numberOfFiles: number, filtersApplied: NewAnalysisFilterStructure[]) => this.setState({ savedConfigName: savedConfigName, savedConfigId: savedConfigId, numberOfFiles: numberOfFiles, filtersApplied: filtersApplied })} savedConfigurationData={savedConfigurationData} reportSortBy={reportSortBy} reportSortOrder={reportSortOrder} saveDeleteSavedConfigDetails={saveDeleteSavedConfigDetails} />
                                                </Scrollable>
                                                <Reportstablemodal savedConfigName={savedConfigName} savedConfigId={Number(savedConfigId)} numberOfFiles={Number(numberOfFiles)} filtersApplied={filtersApplied} />

                                                {/* Following is an invisible button used to trigger the requestTableModal the button is being clicked manually in reportsTable setModal() function*/}
                                                <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#reportsTableModal" id="reportsTableButton"></button>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        }
                    </div>
                    <DeleteReportModal />
                    <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#deleteReportModal" id="deleteReportButton"></button>
                </div>
            </>
        )
    }
}

import React, { Component } from 'react';
import { History } from 'history';
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon';
import DashboardQuickLook from './dashboardQuickLook';
import { JurisdictionData, UploadedByData, ContractTypeData, DashboardTableData, DashboardFilterStructure } from '../State/dashboardState';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import LinesLoader from '../../UniversalComponents/Loader/linesLoader';
import { isNullOrUndefined } from 'is-what';
import AnalysisTableModal from '../../UniversalComponents/Modals/AnalysisTableModal/analysisTableModal';
import NumberLoader from '../../UniversalComponents/Loader/number';
import DeleteFileModal from '../../UniversalComponents/Modals/DeleteFileModal/deleteFileCon';
import { getDashboardDate } from '../../Utils/DataModifierUtil/dataModUtil';
import Tooltip from '@material-ui/core/Tooltip';
import BarLoader from '../../UniversalComponents/Loader/barLoader';

interface Props {
    pageWatcher: (page: string) => void;
    history: History;
    getJurisdiction: (fileIds: number[]) => void;
    getUploadedBy: (fileIds: number[]) => void;
    getTableData: (fileIds: number[]) => void;
    getContractType: (fileIds: number[]) => void;
    getDashboardFileId: () => void;
    initialFileIds: number[];
    jurisdictionData: JurisdictionData[];
    uploadedByData: UploadedByData[];
    contractTypeData: ContractTypeData[];
    dashboardTableData: DashboardTableData[];
    jurisdictionLoader: boolean;
    uploadedByLoader: boolean;
    contractTypeLoader: boolean;
    dashboardTableLoader: boolean;
    saveDeleteDetails: (documentName: string, uniqueFileId: number) => void;
    applyDashboardFilter: (fileIds: number[], filterStructure: DashboardFilterStructure[]) => void;
    filteredFileIds: number[];
    saveDashboardFilters: (savedFilters: string[]) => void;
    savedFilters: string[];
    dashboardLoader: boolean;
}

interface State {
    data: string[];
    dataPoint: string;
    documentName: string;
    initialCount: number;
}

export default class Dashboard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            dataPoint: '',
            documentName: '',
            initialCount: -1
        }
    }

    componentWillMount() {
        this.props.getDashboardFileId();
    }

    componentDidMount() {
        let { pageWatcher, saveDashboardFilters } = this.props;
        pageWatcher('dashboard');
        saveDashboardFilters([]);
    }

    componentWillReceiveProps(nextProps: Props) {
        let { getJurisdiction, getTableData, getUploadedBy, getContractType, initialFileIds, filteredFileIds } = this.props;

        if(nextProps.initialFileIds !== null){
            if (nextProps.initialFileIds.length > 0 && initialFileIds !== nextProps.initialFileIds) {   
                getJurisdiction(nextProps.initialFileIds);
                getTableData(nextProps.initialFileIds);
                getUploadedBy(nextProps.initialFileIds);
                getContractType(nextProps.initialFileIds);
                this.setState({ initialCount: nextProps.initialFileIds.length });
            }
        }

        if(nextProps.filteredFileIds !== null){
            if (nextProps.filteredFileIds.length > 0 && filteredFileIds !== nextProps.filteredFileIds) {
                getJurisdiction(nextProps.filteredFileIds);
                getTableData(nextProps.filteredFileIds);
                getUploadedBy(nextProps.filteredFileIds);
                getContractType(nextProps.filteredFileIds);
            }
        }
    }

    removeFilter = () => {
        window.location.reload();
        this.props.saveDashboardFilters([]);
        this.props.applyDashboardFilter(this.props.initialFileIds, []);
    }

    render() {
        let { data, dataPoint, documentName, initialCount } = this.state;
        let { history, saveDashboardFilters, savedFilters, jurisdictionData, uploadedByData, contractTypeData, jurisdictionLoader, contractTypeLoader, uploadedByLoader, dashboardTableLoader, dashboardTableData, applyDashboardFilter, initialFileIds, dashboardLoader } = this.props;
        return (
            <div className="row">
                <div className="col-md-1" style={{ zIndex: 2 }}>
                    <SideNavbar history={history} />
                </div>
                <div className="col-md-11 mt-5" style={{ zIndex: 1 }}>
                    <div className="row">
                        <div className="col-md-10 mt-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Dashboard</h4>
                                </div>
                            </div>
                        </div>
                        {initialFileIds !== null && initialFileIds.length !== 0 && <div className="col-md-2 mt-4">
                            <button type="button" className="upload-yellow-btn" style={{ padding: '10px 40px' }} onClick={() => window.location.href = '/addfiles'}>
                                <img src="/static_images/upload-btn-img.svg" alt="btn-img" />&nbsp;Upload
                        </button>
                        </div>}
                    </div>
                    {(dashboardLoader) ?
                        <BarLoader />
                    :
                        <>
                        {!(initialFileIds !== null && initialFileIds.length > 0) ?
                            <div className="row">
                                <div className="col-md-10 text-center mt-5 ml-5">
                                    <div className="tagline">Digitize your contracts and get instant insights!</div>
                                    <img className="cursor-pointer" src="/static_images/go-back-upload-img.svg" onClick={() => window.location.href = '/addfiles'} alt="add-files" />
                                </div>
                            </div>
                        :
                            <>
                                <DashboardQuickLook filter={['Contract type', 'Jurisdiction', 'Uploaded by']} jurisdictionLoader={jurisdictionLoader} contractTypeLoader={contractTypeLoader} uploadedByLoader={uploadedByLoader} savedFilters={savedFilters}
                                    jurisdictionData={jurisdictionData} uploadedByData={uploadedByData} contractTypeData={contractTypeData} applyDashboardFilter={applyDashboardFilter} initialFileIds={initialFileIds} saveDashboardFilters={saveDashboardFilters} />
                                <div className="row">
                                    <div className="col-md-12 mt-2">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div className="total-uploads-circle"> {dashboardTableLoader ? <NumberLoader /> : initialCount}<br /><div className="total-uploads-text">Total uploads</div></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
                                                        <img className="cursor-pointer" src="/static_images/analyse-btn-img.svg" alt="analyse" onClick={() => window.location.href = '/analysis'} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8 pr-5">
                                                <div className="row">
                                                    <div className="col-md-12 table-info mt-4">
                                                        <div className="row">
                                                            <div className="col-md-4" style={{ borderRight: '1px solid #DFDFDF', lineHeight: '35px' }}>
                                                                {dashboardTableData.length} out of {initialCount} Documents.
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="row">
                                                                    <div className="col-md-1" style={{ padding: '1%' }}>
                                                                        {savedFilters.length > 0 && <img className="cursor-pointer" src="/static_images/remove-filter-icn.svg" alt="remove-filter" onClick={() => this.removeFilter()} />}
                                                                    </div>
                                                                    <div className="col-md-11 dashboard-tag-scroll" style={{ overflowX: 'scroll' }}>
                                                                        {savedFilters.length > 0 &&
                                                                            <>
                                                                                <span style={{ whiteSpace: 'nowrap', display: 'flex' }}>
                                                                                    {savedFilters.map((ind: string, i: number) =>
                                                                                        <div key={i} className="mr-2 mt-2">
                                                                                            <div className="active-filter-tags mr-2">
                                                                                                <span>&nbsp;&nbsp;{ind}&nbsp;&nbsp;</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </span>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row upload-header-container" style={{ boxShadow: 'none', lineHeight: '20px' }}>
                                                    <div className="col-md-3">
                                                        Name
                                            </div>
                                                    <div className="col-md-2">
                                                        Title
                                            </div>
                                                    <div className="col-md-2">
                                                        Effective Date
                                            </div>
                                                    <div className="col-md-2">
                                                        Jurisdiction
                                            </div>
                                                    <div className="col-md-1">
                                                        Actions
                                            </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 upload-list-container" style={{ height: '35vh' }}>
                                                        {dashboardTableLoader ?
                                                            <LinesLoader animatedLines={[{ width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }
                                                                , { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }]} />
                                                            :
                                                            <Scrollable maxHeight={250} minHeight={'35vh'}>
                                                                {dashboardTableData.map((data, i) =>
                                                                    <React.Fragment key={i}>
                                                                        <div className="row upload-file-item" style={{
                                                                            height: '45px', padding: '0.5%', border: 'none', boxShadow: 'none', background: i % 2 === 0 ? '#FCFCFC' : '#FFFFFF'
                                                                        }}>
                                                                            <div className="cursor-pointer" style={{ display: 'contents' }}>
                                                                                {data.name.length > 20 ?
                                                                                    <div className="col-md-3 file-name-style" onClick={() => this.props.history.push('/document/dashboard/' + btoa(data.fileId.toString()))}>
                                                                                        <Tooltip title={data.name} placement="right-end">
                                                                                            <span className="dotted-line">
                                                                                                {data.name.slice(0, 15) + '...'}
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    </div> :
                                                                                    <div className="col-md-3 file-name-style" onClick={() => this.props.history.push('/document/dashboard/' + btoa(data.fileId.toString()))} >
                                                                                        {data.name}
                                                                                    </div>
                                                                                }
                                                                                <div className="col-md-2 uploadedby-style title-style" style={{ display: 'initial' }}>
                                                                                    {!isNullOrUndefined(data.title) && data.title.length > 0 ?
                                                                                        (data.title.length > 20 ?
                                                                                            <Tooltip title={data.title} placement="right-end">
                                                                                                <span className="dotted-line">
                                                                                                    {data.title.slice(0, 18) + '...'}
                                                                                                </span>
                                                                                            </Tooltip> :
                                                                                            <span>
                                                                                                {data.title}
                                                                                            </span>)
                                                                                        : <img src="/static_images/empty-dash.svg" alt="none" />}
                                                                                </div>
                                                                                <div className="col-md-2 uploadedby-style">
                                                                                    {!isNullOrUndefined(data.effectiveDate) && data.effectiveDate.length > 0 ?
                                                                                        <span>
                                                                                            {getDashboardDate(data.effectiveDate)}
                                                                                        </span> : <img src="/static_images/empty-dash.svg" alt="none" />}
                                                                                </div>
                                                                                <div className="col-md-2 uploadedby-style" style={{ fontSize: '12px' }}>
                                                                                    <div className="row">
                                                                                        <div className="col-md-9">
                                                                                            {data.jurisdiction.length > 0 ?
                                                                                                (data.jurisdiction[0].length > 20 ?
                                                                                                    <Tooltip title={data.jurisdiction[0]} placement="right-end">
                                                                                                        <span>{data.jurisdiction[0].slice(0, 20) + '...'}</span>
                                                                                                    </Tooltip> :
                                                                                                    <span>{data.jurisdiction[0]}</span>)
                                                                                                : <img src="/static_images/empty-dash.svg" alt="none" />}
                                                                                        </div>
                                                                                        {data.jurisdiction.length > 1 &&
                                                                                            <div className="col-md-2">
                                                                                                <span id="extra-pop" onClick={() => this.setModal(true, data.jurisdiction, 'Jurisdiction', data.name)}>
                                                                                                    +{data.jurisdiction.length - 1}
                                                                                                </span>
                                                                                            </div>}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-1 tooltip">
                                                                                    <img onClick={() => this.displayDeleteModal(data.name, data.fileId)} style={{ cursor: 'pointer' }} src="/static_images/delete-icon.svg" alt="delete-icn" />
                                                                                    <span className="tooltiptext">Delete file</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </React.Fragment>
                                                                )}
                                                            </Scrollable>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </>
                    }
                    
                </div>
                <DeleteFileModal />
                <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#deleteModal" id="deleteButton"></button>
                <AnalysisTableModal analysisModalData={data} dataPoint={dataPoint} documentName={documentName} />
                <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#analysisTableModal" id="analysisTableButton"></button>
            </div>
        );
    }

    displayDeleteModal = (name: string, fileId: number) => {
        this.props.saveDeleteDetails(name, fileId);
        let link = document.getElementById('deleteButton');
        !isNullOrUndefined(link) && link.click();
    }

    setModal(check: boolean, data: string[], dataPoint: string, documentName: string) {
        if (check) {
            this.setState({ data: data, dataPoint: dataPoint, documentName: documentName });
            let link = document.getElementById('analysisTableButton');
            !isNullOrUndefined(link) && link.click();
        }
    }
}
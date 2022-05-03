import React, { Component } from 'react';
import { History } from 'history';
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon';
import { AnalysisPoints, AdvancedFilter, FilterStructure, TermDate, ConfigItem, AnalysisFilterStructure, LocalFilterStructure } from '../State/analysisState';
import AnalysisTable from './analysisTable';
import AnalysisQuickLook from './analysisQuickLook';
import { IntermediateFilterStructure } from '../../Utils/GeneralUtil/genUtils';
import AnalysisTableModal from '../../UniversalComponents/Modals/AnalysisTableModal/analysisTableModal';
import TableConfigComponent from './tableConfigComponent';
import BarLoader from '../../UniversalComponents/Loader/barLoader';
import { Link } from 'react-router-dom';
import GenerateReportModal from '../../UniversalComponents/Modals/GenerateReportModal/generateReportCon';
import CustomizedSnackbar from '../../UniversalComponents/Snackbars/Component/customizedSnackbar';
import AnalysisFilterModal from '../../UniversalComponents/Modals/AnalysisFilterModal/Container/analysisFilterModalCon';

interface Props {
    pageWatcher: (page: string) => void;
    history: History;
    analysisObject: AnalysisPoints[];
    getAnalysisFileId: () => void;
    getAnalysis: (initialFileIds: number[]) => void;
    analysisLoader: boolean;
    initialFileIds: number[];
    filterFileIds: number[];
    generalFilter: any;
    applyGeneralFilter: (fileIds: number[], filterType: string) => void;
    getGeneralFilter: (fileIds: number[]) => void;
    advancedFilter: AdvancedFilter[];
    savedAppliedFilter: IntermediateFilterStructure[];
    getAdvancedFilters: (fileIds: number[]) => void;
    applyAdvancedFilters: (fileIds: number[], filterStructure: FilterStructure) => void;
    saveAppliedFilters: (auxArray: IntermediateFilterStructure[]) => void;
    setResetFlag: (resetFlag: boolean) => void;
    tableConfig: ConfigItem[];
    getTableConfig: () => void;
    updatePreference: (display: boolean, columnName: string, refreshTable?: boolean) => void;
    preferenceUpdated: boolean;
    csvLink: string,
    generateReport: (name: string, filter: AnalysisFilterStructure[], fileIds: number[], preference: string[]) => void;
    refreshTable: boolean;
    isReportSuccess: boolean;
    openReportSnackbar: boolean;
    saveAdvancedFilterStructure: (advancedFilterStructure: FilterStructure) => void;
    generateReportFailure: () => void;
    savedAnalysisFiltersList: AnalysisFilterStructure[];
    saveAppliedFiltersList: (appliedFiltersList: LocalFilterStructure[]) => void;
    saveAnalysisFiltersList: (savedAnalysisFiltersList: AnalysisFilterStructure[]) => void;
    saveFilteredCount: (filteredCount: number) => void;
    analysisFileIds: number[];
}

interface State {
    selectedFilter: string;
    filterIconClicked: boolean;
    data: any[];
    dataPoint: string;
    documentName: string;
    dataType?: string;
    isSuccess: boolean;
}

export default class Analysis extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedFilter: "all",
            filterIconClicked: false,
            data: [],
            dataPoint: '',
            documentName: '',
            dataType: '',
            isSuccess: false,
        }
    }

    componentDidMount() {
        let { pageWatcher, getAnalysisFileId, saveAppliedFilters, getTableConfig, generateReportFailure } = this.props;
        pageWatcher('analysis');
        getAnalysisFileId();
        getTableConfig();
        saveAppliedFilters([]);
    }

    componentWillReceiveProps(nextProps: Props) {
        let { getGeneralFilter, initialFileIds, advancedFilter, getTableConfig, preferenceUpdated, getAnalysis, refreshTable, isReportSuccess, openReportSnackbar, analysisFileIds } = nextProps;
        if (this.props.analysisFileIds !== analysisFileIds) {
            getGeneralFilter(analysisFileIds);
        }
        if (this.props.advancedFilter !== advancedFilter) {
            this.setState({ selectedFilter: 'all' });
        }
        if (preferenceUpdated && this.props.preferenceUpdated !== preferenceUpdated) {
            if (refreshTable === false) {
                getTableConfig();
            } else {
                getTableConfig();
                getAnalysis(analysisFileIds);
            }
        }
    }

    selectFilter = (filter: string) => {
        let { selectedFilter } = this.state;
        let { applyGeneralFilter, filterFileIds, initialFileIds, analysisFileIds } = this.props;
        if (selectedFilter !== filter) {
            this.setState({ selectedFilter: filter });
            applyGeneralFilter(analysisFileIds.length > 0 ? analysisFileIds : analysisFileIds, filter);
        } else {
            this.setState({ selectedFilter: filter });
        }
    }

    switchRender() {
        let { analysisObject, analysisLoader, history } = this.props;
        if (analysisLoader) {
            return (
                <BarLoader />
            )
        } else {
            return (
                <>
                    {analysisObject.length > 0 &&
                        <div className="col-md-12">
                            <AnalysisTable analysisObject={analysisObject} history={history}
                                setModal={(data: string[] | TermDate[], dataPoint: string, documentName: string, dataType?: string) => this.setState({ data: data, dataPoint: dataPoint, documentName: documentName, dataType: dataType })} />
                        </div>
                    }
                </>
            );
        }
    }

    render() {
        let { history, generalFilter, savedAppliedFilter, initialFileIds, analysisLoader, tableConfig, updatePreference, isReportSuccess, openReportSnackbar, savedAnalysisFiltersList, analysisFileIds } = this.props;
        let { selectedFilter, filterIconClicked, data, dataPoint, documentName, dataType } = this.state;
        return (
            <div className="row">
                <div className="col-md-1" style={{ zIndex: 2 }}>
                    <SideNavbar history={history} />
                </div>
                <div className="col-md-11 mt-5">
                    <div className="row">
                        <div className="col-md-10 mt-3">
                            <div className="row">
                                <div className="col-md-12 pl-0">
                                    <h4>Analysis</h4>
                                </div>
                                <div className="col-md-12 mb-4 mt-4">
                                    <AnalysisQuickLook selectFilter={this.selectFilter} selectedFilter={selectedFilter} generalFilter={generalFilter} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {analysisLoader === true ?
                        <BarLoader />
                    :
                        <>
                            {analysisFileIds.length === 0 ?
                                <div className="row">
                                    <div className="col-md-10 text-center mt-5 ml-5">
                                        <div className="tagline">Digitize your contracts and get instant insights!</div>
                                        <img className="cursor-pointer" src="/static_images/go-back-upload-img.svg" onClick={() => window.location.href = '/addfiles'} />
                                    </div>
                                </div>
                                :
                                <div className="row">
                                    <div className="col-md-12 pl-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {/* {!analysisLoader && <div className="col-md-12 filter-icon-bg"> */}
                                                <div className="row">
                                                    <TableConfigComponent tableConfig={tableConfig} updatePreference={updatePreference} />
                                                    <div className="col-md-1">
                                                        <button type="button" className="upload-yellow-btn configure-btn" data-toggle="modal" data-target="#reportModal">Generate Report</button>
                                                    </div>
                                                    {/* <div className="col-md-4 filtertags-container"> */}
                                                    {!analysisLoader && <>
                                                        
                                                        <div className="col-md-9 filtertags-container">
                                                            {/* { savedAppliedFilter.length > 0 &&
                                                                savedAppliedFilter.map((ind: IntermediateFilterStructure, i: number) =>
                                                                    <div key={i} className="mr-2 mt-1">
                                                                        {ind.v !== 'N/A' && ind.v !== '' && <div className="active-filter-tags">
                                                                            <span>&nbsp;&nbsp;{ind.i}&nbsp;-&nbsp;{ind.v}&nbsp;&nbsp;</span>
                                                                        </div>}
                                                                    </div>
                                                                )
                                                            } */}
                                                            {savedAnalysisFiltersList.length > 0 &&
                                                                <div>
                                                                    <span className="active-filter-tags">&nbsp;&nbsp;{savedAnalysisFiltersList.length + " Filters Applied"}&nbsp;&nbsp;</span>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="col-md-1 px-0" style={{ marginTop: '-15px' }}>
                                                            <span className="filter-btn-class">
                                                                {savedAnalysisFiltersList.length > 0 &&
                                                                    <>
                                                                        {/* <img src="/static_images/scroll-info-arrow.svg" alt="scroll-arrow" style={{ borderRight: '1px solid #E5E5E5', padding: '10px 5px 10px 0' }} /> */}
                                                                        <img src="/static_images/remove-filter-icn.svg" alt="remove-filter" onClick={() => this.removeFilters()} style={{ paddingLeft: '5px' }} />
                                                                    </>}
                                                                <img src={savedAnalysisFiltersList.length > 0 ? "/static_images/filter-icon-active.svg" : "/static_images/filter-icon-inactive.svg"}
                                                                    alt="filter-icn" data-toggle="modal" style={{ cursor: 'pointer' }}
                                                                    data-target="#analysisFilterModal" onClick={() => this.setState({ filterIconClicked: true })} /></span>
                                                        </div>
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.switchRender()}
                                    {this.renderModal()}
                                    <AnalysisTableModal analysisModalData={data} dataPoint={dataPoint} documentName={documentName} dataType={dataType} />
                                    <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#analysisTableModal" id="analysisTableButton"></button>
                                </div>
                            }
                        </>
                    }
                    
                </div>
                <GenerateReportModal />
                <CustomizedSnackbar isSuccess={isReportSuccess} isOpen={openReportSnackbar} />
            </div>
        );
    }

    /* removeFilter = () => { //Old Filter reset
        let { applyAdvancedFilters, getAdvancedFilters, initialFileIds, saveAppliedFilters, setResetFlag, saveAdvancedFilterStructure } = this.props;
        applyAdvancedFilters(initialFileIds, { i: 'filter', o: 'AND', v: [] });
        getAdvancedFilters(initialFileIds);
        saveAppliedFilters([]);
        this.setState({ filterIconClicked: false });
        setResetFlag(true);
        saveAdvancedFilterStructure({ i: 'filter', o: 'AND', v: [] });
    } */

    removeFilters = () => {
        let {  getAnalysisFileId, getTableConfig } = this.props;
        let tempLocalFilterStructure: LocalFilterStructure = {
            filterId: 0,
            selectedDatapoint: {alias: '', value: ''},
            selectedClause: {alias: '', value: ''},
            selectedOperator:{ operatorAlias: '', rule: '', operatorValue: '' },
            selectedFilterMode: {alias: 'Contain', value: 'AND'},
            selectedClauseType: '',
            textValue: '',
            currencyType: '',
            currencyNumber: '',
            periodType: '',
            periodNumber: '',
            dateValue: '',
            selectedListValue: {alias: '', value: ''},
            isSaved: false
        };
        this.props.saveAppliedFiltersList([tempLocalFilterStructure]);
        this.props.saveAnalysisFiltersList([]);
        this.props.saveFilteredCount(-1);
        getAnalysisFileId();
        getTableConfig();
    }

    renderModal() {
        let { filterIconClicked } = this.state;
        return (
            <AnalysisFilterModal filterIconClicked={filterIconClicked} 
                setFilterIcon={(clicked: boolean) => { this.setState({ filterIconClicked: clicked }); this.removeFilters() }} />
        )
    }
}
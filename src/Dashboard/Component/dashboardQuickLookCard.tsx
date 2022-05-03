import React, { Component } from 'react';
import { JurisdictionData, UploadedByData, ContractTypeData, DashboardFilterStructure } from '../State/dashboardState';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import LinesLoader from '../../UniversalComponents/Loader/linesLoader';

interface Props {
    title: string;
    jurisdictionData: JurisdictionData[];
    uploadedByData: UploadedByData[];
    contractTypeData: ContractTypeData[];
    jurisdictionLoader: boolean;
    uploadedByLoader: boolean;
    contractTypeLoader: boolean;
    applyDashboardFilter: (fileIds: number[], filterStructure: DashboardFilterStructure[]) => void;
    initialFileIds: number[];
    savedFilters: string[];
    saveDashboardFilters: (savedFilters: string[]) => void;
}

interface State {
    activeJurisdiction: string;
    activeUploadedBy: string;
    activeContractType: string;
}

var filterStruc: DashboardFilterStructure[] = [];

export default class DashboardQuickLookCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activeJurisdiction: '',
            activeUploadedBy: '',
            activeContractType: ''
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.savedFilters.length === 0) {
            this.setState({
                activeJurisdiction: '',
                activeUploadedBy: '',
                activeContractType: ''
            })
        }
    }

    render() {
        let { title } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 dashboard-quick-look-card-container">
                    <div className="row dashboard-quick-look-title">
                        <div className="col-md-2">
                            {this.getIcnImage(title)}
                        </div>
                        <div className="col-md-10">
                            {title}
                        </div>
                    </div>
                    {this.switchTitle(title)}
                </div>
            </div>
        );
    }
    getIcnImage(title: string) {
        switch (title) {
            case 'Jurisdiction': {
                return <img src="/static_images/jurisdiction-icn.svg" alt="jur" />
            }
            case 'Uploaded by': {
                return <img src="/static_images/uploaded-by-icn.svg" alt="upl" />
            }
            case 'Contract type': {
                return <img src="/static_images/contract-type-icn.svg" alt="con" />
            }
            default: {
                return <div />
            }
        }
    }
    switchTitle(title: string) {
        let { jurisdictionData, uploadedByData, contractTypeData, jurisdictionLoader, uploadedByLoader, contractTypeLoader } = this.props;
        let { activeJurisdiction, activeUploadedBy, activeContractType } = this.state;

        switch (title) {
            case 'Jurisdiction': {
                if (jurisdictionLoader) {
                    return (
                        <LinesLoader animatedLines={[{ width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }]} />
                    );
                } else {
                    return (
                        <Scrollable maxHeight={150}>
                            {jurisdictionData.length > 0 ?
                                jurisdictionData.map((jur: JurisdictionData, i: number) =>
                                    <div className="row" key={i}>
                                        <div onClick={() => { activeJurisdiction === jur.jurisdiction ? this.setState({ activeJurisdiction: '' }) : this.setState({ activeJurisdiction: jur.jurisdiction }); this.applyFilter('jurisdiction', jur.jurisdiction) }}
                                            className={activeJurisdiction === jur.jurisdiction ? "col-md-12 dashboard-quick-look-sub-title-active" : "col-md-12 dashboard-quick-look-sub-title"}>
                                            <span>{jur.jurisdiction}</span>
                                            <span style={{ float: 'right' }}>{jur.count}</span>
                                        </div>
                                    </div>
                                ) : <span className="dashboard-quick-look-sub-title">No jurisdiction</span>}
                        </Scrollable>
                    );
                }
            }
            case 'Uploaded by': {
                if (uploadedByLoader) {
                    return (
                        <LinesLoader animatedLines={[{ width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }]} />
                    );
                } else {
                    return (
                        <Scrollable maxHeight={150}>
                            {uploadedByData.length > 0 ?
                                uploadedByData.map((upl: UploadedByData, i: number) =>
                                    <div className="row" key={i}>
                                        <div onClick={() => { activeUploadedBy === upl.email ? this.setState({ activeUploadedBy: '' }) : this.setState({ activeUploadedBy: upl.name }); this.applyFilter('uploadedBy', upl.email) }}
                                            className={activeUploadedBy === upl.email ? "col-md-12 dashboard-quick-look-sub-title-active" : "col-md-12 dashboard-quick-look-sub-title"}>
                                            <span>{upl.name}</span>
                                            <span style={{ float: 'right' }}>{upl.count}</span>
                                        </div>
                                    </div>
                                ) : <span className="dashboard-quick-look-sub-title">No data</span>}
                        </Scrollable>
                    );
                }
            }
            case 'Contract type': {
                if (contractTypeLoader) {
                    return (
                        <LinesLoader animatedLines={[{ width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }, { width: 0, height: 10 }, { width: 100, height: 10 }]} />
                    );
                } else {
                    return (
                        <Scrollable maxHeight={150}>
                            {contractTypeData.length > 0 ?
                                contractTypeData.map((con: ContractTypeData, i: number) =>
                                    <div className="row" key={i}>
                                        <div onClick={() => { activeContractType === con.contractType ? this.setState({ activeContractType: '' }) : this.setState({ activeContractType: con.contractType }); this.applyFilter('contractType', con.contractType) }}
                                            className={activeContractType === con.contractType ? "col-md-12 dashboard-quick-look-sub-title-active" : "col-md-12 dashboard-quick-look-sub-title"}>
                                            <span>{con.contractType}</span>
                                            <span style={{ float: 'right' }}>{con.count}</span>
                                        </div>
                                    </div>
                                ) : <span className="dashboard-quick-look-sub-title">No contract type</span>}
                        </Scrollable>
                    );
                }
            }
            default: {
                return (
                    <div />
                )
            }
        }
    }

    applyFilter = (label: string, value: string) => {
        let { applyDashboardFilter, initialFileIds, saveDashboardFilters } = this.props;
        let { activeContractType, activeJurisdiction, activeUploadedBy } = this.state;
        switch (label) {
            case 'jurisdiction': {
                let val = activeJurisdiction === value ? '' : value;
                activeJurisdiction === value ? this.setState({ activeJurisdiction: '' }) : this.setState({ activeJurisdiction: value });
                if (val !== '') {
                    if (val === value) {
                        let index = filterStruc.findIndex((el: any) => { return el.label === 'jurisdiction' });
                        if (index > -1) {
                            filterStruc[index].value = value
                        } else {
                            filterStruc.push({
                                label: 'jurisdiction',
                                value: value
                            })
                        }
                    } else {
                        filterStruc.push({
                            label: 'jurisdiction',
                            value: value
                        })
                    }
                } else {
                    let index = filterStruc.findIndex((el: any) => { return el.label === 'jurisdiction' });
                    if (index > -1) {
                        filterStruc.splice(index, 1)
                    }
                }
                break;
            }
            case 'uploadedBy': {
                let val = activeUploadedBy === value ? '' : value;
                activeUploadedBy === value ? this.setState({ activeUploadedBy: '' }) : this.setState({ activeUploadedBy: value });
                if (val !== '') {
                    if (val === value) {
                        let index = filterStruc.findIndex((el: any) => { return el.label === 'uploadedBy' });
                        if (index > -1) {
                            filterStruc[index].value = value
                        } else {
                            filterStruc.push({
                                label: 'uploadedBy',
                                value: value
                            })
                        }
                    } else {
                        filterStruc.push({
                            label: 'uploadedBy',
                            value: value
                        })
                    }
                } else {
                    let index = filterStruc.findIndex((el: any) => { return el.label === 'uploadedBy' });
                    if (index > -1) {
                        filterStruc.splice(index, 1)
                    }
                }
                break;
            }
            case 'contractType': {
                let val = activeContractType === value ? '' : value;
                activeContractType === value ? this.setState({ activeContractType: '' }) : this.setState({ activeContractType: value });
                if (val !== '') {
                    if (val === value) {
                        let index = filterStruc.findIndex((el: any) => { return el.label === 'contractType' });
                        if (index > -1) {
                            filterStruc[index].value = value
                        } else {
                            filterStruc.push({
                                label: 'contractType',
                                value: value
                            })
                        }
                    } else {
                        filterStruc.push({
                            label: 'contractType',
                            value: value
                        })
                    }
                } else {
                    let index = filterStruc.findIndex((el: any) => { return el.label === 'contractType' });
                    if (index > -1) {
                        filterStruc.splice(index, 1)
                    }
                }
                break;
            }
        }
        let intermediateArr: string[] = [];
        for (let i = 0; i < filterStruc.length; i++) {
            intermediateArr.push(filterStruc[i].value);
        }
        saveDashboardFilters(intermediateArr);
        applyDashboardFilter(initialFileIds, filterStruc);
    }
}
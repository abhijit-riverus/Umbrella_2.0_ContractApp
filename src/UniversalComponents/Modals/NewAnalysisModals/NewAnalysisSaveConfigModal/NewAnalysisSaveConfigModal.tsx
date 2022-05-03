import axios, { AxiosRequestConfig } from 'axios';
import React, { Component } from 'react'
import { NewAnalysisFilterStructure } from '../../../../NewAnalysis/State/newAnalysisState';
import { iterateNewAnalysisFilter } from '../../../../NewAnalysis/Utils/newAnalysisUtils';
import Scrollable from '../../../Scrollable/scrollable';

interface Props {
    appliedFilters: NewAnalysisFilterStructure[];
    initialFilteredCount: number;
    saveNewAnalysisConfiguration: (title: string, description: string, type: string, lastResultCount: number, filter: NewAnalysisFilterStructure[]) => void;
}

interface State {
    docName: string;
}

export default class NewAnalysisSaveConfigModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            docName: '',
        }

    }

    onChangeDocName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ docName: e.currentTarget.value });
    }

    saveConfig(){
        let {appliedFilters, initialFilteredCount} = this.props;
        let {docName} = this.state;
        if(docName.length > 0  && appliedFilters.length > 0){
            this.props.saveNewAnalysisConfiguration(docName, '', 'newanalysis', initialFilteredCount, appliedFilters);
            this.setState({docName: ''});
            this.dismissModal();
        }
    }

    render() {
        let { appliedFilters } = this.props;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="newAnalysisSaveConfigModal" aria-labelledby="newAnalysisSaveConfigModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 modal-body">
                                        <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="request-close-btn">
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </span>
                                    </div>
                                    <div className="col-md-1" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <div className="col-md-4 modal-title">
                                    Save configuration
                                        </div>
                                    <div className="col-md-7" style={{ borderTop: '1px solid #996C84', marginTop: '0.2rem' }}>

                                    </div>
                                    <form style={{ width: '-webkit-fill-available' }}>
                                        <div className="modal-body modal-subtitle">
                                            {/* <div className="report-header" style={{ textAlign: 'left' }}>
                                                Save configuration
                                                    <div className="report-sub-header">
                                                    With the applied filters
                                                    </div>
                                            </div> */}
                                            <div className="my-2" style={{ height: '50px' }}>
                                                <div className="mb-1 report-field-heading">Name</div>
                                                <div>
                                                    <input type="text" id="" name="docname" className="docname-input float-left mr-1" placeholder="Enter text" onChange={(e) => { this.setState({ docName: e.currentTarget.value }) }} />{/* 
                                                    <span className="doc-ext mt-3 float-left">.xlsx</span> */}
                                                </div>
                                                
                                            </div >
                                            {appliedFilters.length > 0 ? 
                                                <div className="my-4" style={{ height: '80px' }}>
                                                    <div className="mb-1 report-field-heading">Filters Applied</div>
                                                    <div className="report-modal-filters-list">
                                                        <Scrollable maxHeight={66}>
                                                            {appliedFilters.length > 0 && 
                                                                appliedFilters.map((filter, i) => (
                                                                    <div key ={i} className={"report-modal-filters-text"}>
                                                                        {iterateNewAnalysisFilter(filter, '')}
                                                                    </div>
                                                            ))}
                                                        </Scrollable>
                                                    </div>
                                                </div >
                                            : 
                                                <div className="my-4" style={{ height: '80px' }}>
                                                    <div className="mb-1 report-field-heading">Filters Applied</div>
                                                    <div className="report-modal-filters-list"></div>
                                                </div >
                                            }
                                           
                                            <div className="my-4" style={{ display: 'flex', justifyContent: 'center', lineHeight: '28px' }}>
                                                {this.state.docName !== '' ?
                                                    <button type="button" className="upload-yellow-btn" onClick={()=>this.saveConfig()}>Save</button>
                                                    :
                                                    <button type="button" className="upload-yellow-btn" style={{ background: 'lightgrey' }}>Save</button>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    dismissModal = () => {
        let dismissBtn = document.getElementById('request-close-btn');
        setTimeout(() => { dismissBtn?.click() }, 1500);
    }
}

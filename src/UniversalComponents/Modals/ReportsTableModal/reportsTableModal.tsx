import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { AdvancedFilter, AnalysisFilterStructure, FilterStructure } from '../../../Analysis/State/analysisState';
import { NewAnalysisFilterStructure } from '../../../NewAnalysis/State/newAnalysisState';
import { iterateNewAnalysisFilter } from '../../../NewAnalysis/Utils/newAnalysisUtils';
import { createAuxInterface, createFilterStructure, IntermediateFilterStructure, iterateAnalysisFilter } from '../../../Utils/GeneralUtil/genUtils';
import Scrollable from '../../Scrollable/scrollable';

interface Props {
    savedConfigName: string;
    savedConfigId: number;
    numberOfFiles: number;
    filtersApplied: NewAnalysisFilterStructure[];
}
interface State {

}

export default class Reportstablemodal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let { savedConfigName, savedConfigId, numberOfFiles, filtersApplied } = this.props;
        return (
            <>
                <div className="row modal" id="reportsTableModal" aria-labelledby="reportsTableModal" aria-hidden="true" data-backdrop="false"
                    style={{ backdropFilter: 'none', background: 'transparent' }}>
                    <div className="col-md-12 modal-dialog" style={{ width: '35%', top: '35%', left: '8%', height: "300px" }}>
                        <div className="row">
                            <div className="col-md-12 modal-content" style={{ borderRadius: '10px' }}>
                                <div className="row">
                                    <div className="modal-body modal-title mb-0">
                                        <div className="col-md-12 mt-3 mb-2">
                                            <div className="row" style={{ borderBottom: '1px solid #808080', paddingBottom: '8px' }}>
                                                <div className="col-md-10">
                                                    <span className="modal-docname">{savedConfigName}</span>
                                                </div>
                                                <div className="col-md-2">
                                                    <span id="analysis-btn-outside-click" data-dismiss="modal" style={{ outline: 'none', cursor: 'pointer', float: 'right', marginTop: '-10px' }}><img src="/static_images/close-analysismodal-icn.svg" /></span>
                                                </div>
                                                {/* <div className="col-md-10" style={{ marginTop: '-10px', marginBottom: '5px', textAlign: 'left' }}>
                                                    <span className="label" style={{ textDecoration: 'underline' }}>{savedConfigId}</span>
                                                </div> */}
                                            </div>
                                            <div className="row" style={{ borderBottom: '1px solid #808080' }}>
                                                <div className="col-md-5 label">
                                                    Number of files -
                                                </div>
                                                <div className="col-md-7 label" style={{ fontWeight: 'normal' }}>
                                                    {numberOfFiles} files
                                                </div>
                                            </div>
                                            <div className="row" style={{ borderBottom: '1px solid #808080', marginBottom: "20px" }}>
                                                <div className="col-md-12 mb-2">
                                                    <div className="label"> Filters applied - </div>
                                                    <div style={{ fontWeight: 'normal' }}>
                                                        {filtersApplied !== undefined && filtersApplied.length > 0 ?
                                                            <div className ="row">
                                                                <div className="col-md-12 report-table-modal-filter-container">
                                                                    <Scrollable maxHeight={100}>
                                                                        {filtersApplied.map((filter, i) => (
                                                                            <div key ={i} className={"report-table-modal-filters-text"}>
                                                                                {iterateNewAnalysisFilter(filter, '')}
                                                                            </div>
                                                                        ))}
                                                                    </Scrollable>
                                                                </div>
                                                            </div>
                                                        :
                                                            <img src="/static_images/empty-dash.svg"></img>
                                                        }
                                                    </div>   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
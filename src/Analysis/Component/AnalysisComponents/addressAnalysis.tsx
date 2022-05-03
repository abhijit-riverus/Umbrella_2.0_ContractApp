import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { ColumnHeaderStructure } from '../../../Utils/GeneralUtil/genUtils';
import { AnalysisPoints } from '../../State/analysisState';

interface Props {
    analysisData: AnalysisPoints;
    indHeader: ColumnHeaderStructure;
    setModal: (check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => void;
}

class AddressAnalysis extends Component<Props> {
    render() {
        let { analysisData, indHeader, setModal } = this.props;
        if (indHeader.header === 'Address') {
            return (
                <td style={{ minWidth: '300px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.premise.address[0]) ?
                        <>
                            <div className="row">
                                {analysisData.premise.address[0].length > 70 ?
                                    <div className="col-md-10 pr-0">
                                        <Tooltip title={analysisData.premise.address[0]} placement="right-end" >
                                            <span className='dotted-line'>
                                                {analysisData.premise.address[0].slice(0, 70) + '...'}
                                            </span>
                                        </Tooltip>
                                    </div>
                                    :
                                    <div className="col-md-10 pr-0">{analysisData.premise.address[0]}</div>
                                }
                                {analysisData.premise.address.length > 1 &&
                                    <div className="col-md-2">
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.premise.address, 'Address', analysisData.name)}>
                                            +{analysisData.premise.address.length - 1}
                                        </span>
                                    </div>}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>}
                </td>
            );
        } else if (indHeader.header === 'Events Covered') {
            return (
                <td style={{ minWidth: '285px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.forceMajeure.eventsCovered[0]) ?
                        <>
                            <div className="row">
                                {analysisData.forceMajeure.eventsCovered[0].length > 70 ?
                                    <div className="col-md-10 pr-0">
                                        <Tooltip title={analysisData.forceMajeure.eventsCovered[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.forceMajeure.eventsCovered[0].slice(0, 70) + '...'}
                                            </span>
                                        </Tooltip>
                                    </div>
                                    :
                                    <span>{analysisData.forceMajeure.eventsCovered[0]}</span>
                                }
                                {analysisData.forceMajeure.eventsCovered.length > 1 &&
                                    <div className="col-md-2">
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.forceMajeure.eventsCovered, 'Events Covered', analysisData.name)}>
                                            +{analysisData.forceMajeure.eventsCovered.length - 1}
                                        </span>
                                    </div>}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>}
                </td>
            );
        } else {
            return (
                <span />
            )
        }
    }
}

export default AddressAnalysis;
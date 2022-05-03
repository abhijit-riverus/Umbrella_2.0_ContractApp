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

class JurisdictionAnalysis extends Component<Props> {
    render() {
        let { analysisData, indHeader, setModal } = this.props;
        if (indHeader.header === 'Jurisdiction') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.governingLaw.jurisdiction[0]) ?
                        <>
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    {analysisData.governingLaw.jurisdiction[0].length > 40 ?
                                        <Tooltip title={analysisData.governingLaw.jurisdiction[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.governingLaw.jurisdiction[0].slice(0, 40) + '...'}
                                            </span>
                                        </Tooltip>
                                        :
                                        <span>{analysisData.governingLaw.jurisdiction[0]}</span>}
                                </div>
                                <div className="col-md-2 pr-0">
                                    {analysisData.governingLaw.jurisdiction.length > 1 &&
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.governingLaw.jurisdiction, 'Jurisdiction', analysisData.name)}>
                                            +{analysisData.governingLaw.jurisdiction.length - 1}
                                        </span>}
                                </div>
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>
                    }
                </td>
            );
        }
        else if (indHeader.header === 'Territory') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.nonCompete.territory[0]) ?
                        <>
                            <div className="row">
                                <div className="col-md-10 pr-0">
                                    {analysisData.nonCompete.territory[0].length > 40 ?
                                        <Tooltip title={analysisData.nonCompete.territory[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.nonCompete.territory[0].slice(0, 40) + '...'}
                                            </span>
                                        </Tooltip>
                                        :
                                        <span>{analysisData.nonCompete.territory[0]}</span>}
                                </div>
                                <div className="col-md-2 pr-0">
                                    {analysisData.nonCompete.territory.length > 1 &&
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.nonCompete.territory, 'Teroritory', analysisData.name)}>
                                            +{analysisData.nonCompete.territory.length - 1}
                                        </span>}
                                </div>
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>
                    }
                </td>
            );
        } /* else if (indHeader.header === 'Mode') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.disputeresolution.mode[0]) ?
                        <>
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    {analysisData.disputeresolution.mode[0].length > 40 ?
                                        <Tooltip title={analysisData.disputeresolution.mode[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.disputeresolution.mode[0].slice(0, 40) + '...'}
                                            </span>
                                        </Tooltip>
                                        :
                                        <span>{analysisData.disputeresolution.mode[0]}</span>}
                                </div>
                                <div className="col-md-2 pr-0">
                                    {analysisData.disputeresolution.mode.length > 1 &&
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.disputeresolution.mode, 'Jurisdiction', analysisData.name)}>
                                            +{analysisData.disputeresolution.mode.length - 1}
                                        </span>}
                                </div>
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>
                    }
                </td>
            );
        } else if (indHeader.header === 'Panel') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.disputeresolution.panel[0]) ?
                        <>
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    {analysisData.disputeresolution.panel[0].length > 40 ?
                                        <Tooltip title={analysisData.disputeresolution.panel[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.disputeresolution.panel[0].slice(0, 40) + '...'}
                                            </span>
                                        </Tooltip>
                                        :
                                        <span>{analysisData.disputeresolution.panel[0]}</span>}
                                </div>
                                <div className="col-md-2 pr-0">
                                    {analysisData.disputeresolution.panel.length > 1 &&
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.disputeresolution.panel, 'Jurisdiction', analysisData.name)}>
                                            +{analysisData.disputeresolution.panel.length - 1}
                                        </span>}
                                </div>
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>
                    }
                </td>
            );
        } else if (indHeader.header === 'Venue') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.disputeresolution.venue[0]) ?
                        <>
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    {analysisData.disputeresolution.venue[0].length > 40 ?
                                        <Tooltip title={analysisData.disputeresolution.venue[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.disputeresolution.venue[0].slice(0, 40) + '...'}
                                            </span>
                                        </Tooltip>
                                        :
                                        <span>{analysisData.disputeresolution.venue[0]}</span>}
                                </div>
                                <div className="col-md-2 pr-0">
                                    {analysisData.disputeresolution.venue.length > 1 &&
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.disputeresolution.venue, 'Jurisdiction', analysisData.name)}>
                                            +{analysisData.disputeresolution.venue.length - 1}
                                        </span>}
                                </div>
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>
                    }
                </td>
            );
        } else if (indHeader.header === 'Act/Statute') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.disputeresolution.legal[0]) ?
                        <>
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    {analysisData.disputeresolution.legal[0].length > 40 ?
                                        <Tooltip title={analysisData.disputeresolution.legal[0]} placement="right-end">
                                            <span className='dotted-line'>
                                                {analysisData.disputeresolution.legal[0].slice(0, 40) + '...'}
                                            </span>
                                        </Tooltip>
                                        :
                                        <span>{analysisData.disputeresolution.legal[0]}</span>}
                                </div>
                                <div className="col-md-2 pr-0">
                                    {analysisData.disputeresolution.legal.length > 1 &&
                                        <span id="extra-pop" onClick={() => setModal(true, analysisData.disputeresolution.legal, 'Jurisdiction', analysisData.name)}>
                                            +{analysisData.disputeresolution.legal.length - 1}
                                        </span>}
                                </div>
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>
                    }
                </td>
            );
        } */
        else {
            return (
                <span />
            );
        }
    }
}

export default JurisdictionAnalysis;
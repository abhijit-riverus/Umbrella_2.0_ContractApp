import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { ColumnHeaderStructure } from '../../../Utils/GeneralUtil/genUtils';
import { AnalysisPoints } from '../../State/analysisState';
import { History } from 'history';

interface Props {
    analysisData: AnalysisPoints;
    indHeader: ColumnHeaderStructure;
    history: History;
    setModal: (check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => void;
}

class TermBIAnalysis extends Component<Props> {
    render() {
        let { analysisData, indHeader, setModal, history } = this.props;
        /* if (indHeader.header === 'Start Date') {
            return (
                <td style={{ minWidth: '150px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.term.startDate[0]) ?
                        <>
                            <div className="row">
                                {analysisData.term.startDate[0].phrase !== null && analysisData.term.startDate[0].phrase.length > 0 ?
                                    <>
                                        <div className="col-md-10 pr-0">
                                            {analysisData.term.startDate[0].phrase.length > 15 ?
                                                <Tooltip title={analysisData.term.startDate[0]} placement="right-end">
                                                    <span>
                                                        {analysisData.term.startDate[0].phrase.slice(0, 15) + '...'}
                                                    </span>
                                                </Tooltip> :
                                                <span>
                                                    {analysisData.term.startDate[0].phrase}
                                                </span>
                                            }
                                        </div>
                                        <div className="col-md-10 pr-0">
                                            <span className="view-more" onClick={() => setModal(true, analysisData.term.startDate, 'Start Date', analysisData.name, 'termDate')}>View</span>
                                        </div>
                                    </> :
                                    <div className="col-md-10 pr-0">
                                        <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                            onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Term clause', bi: 'Start Dates' } })}>
                                            Add&nbsp;
                                                    <img src="/static_images/new-tab-purple.svg" />
                                        </span>
                                    </div>}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                    onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Term clause', bi: 'Start Dates' } })}>
                                    Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                </span>
                            </div>
                        </div>}
                </td>
            )
        }
        else if (indHeader.header === 'End Date') {
            return (
                <td style={{ minWidth: '150px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.term.endDate[0]) ?
                        <>
                            <div className="row">
                                {analysisData.term.endDate[0].phrase !== null && analysisData.term.endDate[0].phrase.length > 0 ?
                                    <>
                                        <div className="col-md-10 pr-0">
                                            {analysisData.term.endDate[0].phrase.length > 15 ?
                                                <Tooltip title={analysisData.term.endDate[0]} placement="right-end">
                                                    <span>
                                                        {analysisData.term.endDate[0].phrase.slice(0, 15) + '...'}
                                                    </span>
                                                </Tooltip> :
                                                <span>
                                                    {analysisData.term.endDate[0].phrase}
                                                </span>
                                            }
                                        </div>
                                        <div className="col-md-10 pr-0">
                                            <span className="view-more" onClick={() => setModal(true, analysisData.term.endDate, 'End Date', analysisData.name, 'termDate')}>View</span>
                                        </div>
                                    </> :
                                    <div className="col-md-10 pr-0">
                                        <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                            onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Term clause', bi: 'End Dates' } })}>
                                            Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                        </span>
                                    </div>}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                    onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Term clause', bi: 'End Dates' } })}>
                                    Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                </span>
                            </div>
                        </div>}
                </td>
            )
        } */
        if (indHeader.header === 'Start Date') {
            return (
                <td style={{ minWidth: '150px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.term.startDate[0]) ?
                        <>
                            <div className="row">
                                {analysisData.term.startDate[0].date !== null && analysisData.term.startDate[0].date.length > 0 ?
                                    <>
                                        <div className="col-md-10 pr-0">
                                            {analysisData.term.startDate[0].date.length > 15 ?
                                                <Tooltip title={analysisData.term.startDate[0].date} placement="right-end">
                                                    <span>
                                                        {analysisData.term.startDate[0].date.slice(0, 15) + '...'}
                                                    </span>
                                                </Tooltip> :
                                                <span>
                                                    {analysisData.term.startDate[0].date}
                                                </span>
                                            }
                                        </div>
                                        <div className="col-md-10 pr-0">
                                            <span className="view-more" onClick={() => setModal(true, analysisData.term.startDate, 'Start Date', analysisData.name, 'termDate')}>View</span>
                                        </div>
                                    </> :
                                    <div className="col-md-10 pr-0">
                                        <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                            onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Term clause', bi: 'Start Dates' } })}>
                                            Add&nbsp;
                                                    <img src="/static_images/new-tab-purple.svg" />
                                        </span>
                                    </div>}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                    onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Term clause', bi: 'Start Dates' } })}>
                                    Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                </span>
                            </div>
                        </div>}
                </td>
            )
        }
        else if (indHeader.header === 'End Date') {
            return (
                <td style={{ minWidth: '150px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.term.endDate[0]) ?
                        <>
                            <div className="row">
                                {analysisData.term.endDate[0].date !== null && analysisData.term.endDate[0].date.length > 0 ?
                                    <>
                                        <div className="col-md-10 pr-0">
                                            {analysisData.term.endDate[0].date.length > 15 ?
                                                <Tooltip title={analysisData.term.endDate[0].date} placement="right-end">
                                                    <span>
                                                        {analysisData.term.endDate[0].date.slice(0, 15) + '...'}
                                                    </span>
                                                </Tooltip> :
                                                <span>
                                                    {analysisData.term.endDate[0].date}
                                                </span>
                                            }
                                        </div>
                                        <div className="col-md-10 pr-0">
                                            <span className="view-more" onClick={() => setModal(true, analysisData.term.endDate, 'End Date', analysisData.name, 'termDate')}>View</span>
                                        </div>
                                    </> :
                                    <div className="col-md-10 pr-0">
                                        <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                            onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Term clause', bi: 'End Dates' } })}>
                                            Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                        </span>
                                    </div>}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                    onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Term clause', bi: 'End Dates' } })}>
                                    Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                </span>
                            </div>
                        </div>}
                </td>
            )
        }
        else if (indHeader.header === 'Duration') {
            if (indHeader.parent === 'Term') {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.term.duration.phrase[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.term.duration.phrase[0] !== null && analysisData.term.duration.phrase[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.term.duration.phrase[0].length > 15 ?
                                                    <Tooltip title={analysisData.term.duration.phrase[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.term.duration.phrase[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.term.duration.phrase[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.term.duration.phrase, 'Duration', analysisData.name, 'termDuration')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Term clause', bi: 'Duration' } })}>
                                                Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>
                                    }
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Term clause', bi: 'Duration' } })}>
                                        Add&nbsp;
                                    <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                )
            } else if (indHeader.parent === 'Confidentiality') {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.confidentiality.duration[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.confidentiality.duration[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.confidentiality.duration[0].length > 15 ?
                                                    <Tooltip title={analysisData.confidentiality.duration[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.confidentiality.duration[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.confidentiality.duration[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.confidentiality.duration, 'Duration', analysisData.name)}>View</span>
                                            </div>
                                        </> : <img src="/static_images/empty-dash.svg" />}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <img src="/static_images/empty-dash.svg" />
                                </div>
                            </div>}
                    </td>
                )
            }
            else if (indHeader.parent === 'Payment Obligations') {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.payments.duration[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.payments.duration[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.payments.duration[0].length > 15 ?
                                                    <Tooltip title={analysisData.payments.duration[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.payments.duration[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.payments.duration[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.payments.duration, 'Duration', analysisData.name)}>View</span>
                                            </div>
                                        </> : <img src="/static_images/empty-dash.svg" />}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <img src="/static_images/empty-dash.svg" />
                                </div>
                            </div>}
                    </td>
                )
            }
            else if (indHeader.parent === 'Non-compete') {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.nonCompete.duration[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.nonCompete.duration[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.nonCompete.duration[0].length > 15 ?
                                                    <Tooltip title={analysisData.nonCompete.duration[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.nonCompete.duration[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.nonCompete.duration[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.nonCompete.duration, 'Duration', analysisData.name)}>View</span>
                                            </div>
                                        </> : <img src="/static_images/empty-dash.svg" />}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <img src="/static_images/empty-dash.svg" />
                                </div>
                            </div>}
                    </td>
                )
            }
            else if (indHeader.parent === 'Non-solicitation') {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.nonSolicitation.duration[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.nonSolicitation.duration[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.nonSolicitation.duration[0].length > 15 ?
                                                    <Tooltip title={analysisData.nonSolicitation.duration[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.nonSolicitation.duration[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.nonSolicitation.duration[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.nonSolicitation.duration, 'Duration', analysisData.name)}>View</span>
                                            </div>
                                        </> : <img src="/static_images/empty-dash.svg" />}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <img src="/static_images/empty-dash.svg" />
                                </div>
                            </div>}
                    </td>
                )
            } else {
                return (
                    <span />
                )
            }
        }
        else if (indHeader.header === 'Nature') {
            return (
                <td style={{ minWidth: '150px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.confidentiality.nature[0]) ?
                        <>
                            <div className="row">
                                {analysisData.confidentiality.nature[0] !== null && analysisData.confidentiality.nature[0].length > 0 ?
                                    <>
                                        <div className="col-md-10 pr-0">
                                            {analysisData.confidentiality.nature[0].length > 15 ?
                                                <Tooltip title={analysisData.confidentiality.nature[0]} placement="right-end">
                                                    <span>
                                                        {analysisData.confidentiality.nature[0].slice(0, 15) + '...'}
                                                    </span>
                                                </Tooltip> :
                                                <span>
                                                    {analysisData.confidentiality.nature[0]}
                                                </span>
                                            }
                                        </div>
                                        <div className="col-md-10 pr-0">
                                            <span className="view-more" onClick={() => setModal(true, analysisData.confidentiality.nature, 'Nature', analysisData.name)}>View</span>
                                        </div>
                                    </> : <img src="/static_images/empty-dash.svg" />}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>}
                </td>
            )
        }
        else if (indHeader.header === 'Amount') {
            if(indHeader.parent === 'Payment Obligations'){   
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.payments.amount[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.payments.amount[0] !== null && analysisData.payments.amount[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.payments.amount[0].length > 15 ?
                                                    <Tooltip title={analysisData.payments.amount[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.payments.amount[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.payments.amount[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.payments.amount, 'Amount', analysisData.name)}>View</span>
                                            </div>
                                        </> : <img src="/static_images/empty-dash.svg" />}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <img src="/static_images/empty-dash.svg" />
                                </div>
                            </div>}
                    </td>
                )
            }else if(indHeader.parent === 'Limitation Of Liability'){
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.limitationOfLiability.amount[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.limitationOfLiability.amount[0] !== null && analysisData.limitationOfLiability.amount[0].length > 0 ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.limitationOfLiability.amount[0].length > 15 ?
                                                    <Tooltip title={analysisData.limitationOfLiability.amount[0]} placement="right-end">
                                                        <span>
                                                            {analysisData.limitationOfLiability.amount[0].slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.limitationOfLiability.amount[0]}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.limitationOfLiability.amount, 'Amount', analysisData.name)}>View</span>
                                            </div>
                                        </> : <img src="/static_images/empty-dash.svg" />}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <img src="/static_images/empty-dash.svg" />
                                </div>
                            </div>}
                    </td>
                )
            }
        }
        /* else if (indHeader.header === 'Cap') {
            return (
                <td style={{ minWidth: '160px', display: 'table-cell' }}>
                    {!isNullOrUndefined(analysisData.indemnity.cap[0]) ?
                        <>
                            <div className="row">
                                {analysisData.indemnity.cap[0] !== null && analysisData.indemnity.cap[0].length > 0 ?
                                    <>
                                        <div className="col-md-10 pr-0">
                                            {analysisData.indemnity.cap[0].length > 15 ?
                                                <Tooltip title={analysisData.indemnity.cap[0]} placement="right-end">
                                                    <span>
                                                        {analysisData.indemnity.cap[0].slice(0, 15) + '...'}
                                                    </span>
                                                </Tooltip> :
                                                <span>
                                                    {analysisData.indemnity.cap[0]}
                                                </span>
                                            }
                                        </div>
                                        <div className="col-md-10 pr-0">
                                            <span className="view-more" onClick={() => setModal(true, analysisData.indemnity.cap, 'Amount', analysisData.name)}>View</span>
                                        </div>
                                    </> : <img src="/static_images/empty-dash.svg" />}
                            </div>
                        </> :
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                <img src="/static_images/empty-dash.svg" />
                            </div>
                        </div>}
                </td>
            )
        } */
        else {
            return (
                <span />
            );
        }
    }
}

export default TermBIAnalysis;
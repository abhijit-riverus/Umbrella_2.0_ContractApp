import Tooltip from '@material-ui/core/Tooltip';
import { isNullOrUndefined } from 'is-what';
import React, { Component } from 'react';
import { ColumnHeaderStructure } from '../../../Utils/GeneralUtil/genUtils';
import { AnalysisPoints } from '../../State/analysisState';
import { History } from 'history';

interface Props {
    analysisData: AnalysisPoints;
    indHeader: ColumnHeaderStructure;
    history: History;
    setModal: (check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => void;
}

class PresentAnalysis extends Component<Props> {
    render() {
        let { indHeader, analysisData, setModal, history } = this.props;
        switch (indHeader.parent) {
            case 'Termination': {
                return (
                    <td style={{ minWidth: '240px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.termination.terminationAtConvenience === "Yes" || analysisData.termination.terminationAtConvenience === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '240px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.termination.terminationAtConv[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.termination.terminationAtConv[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.termination.terminationAtConv.length > 15 ?
                                                    <Tooltip title={analysisData.termination.terminationAtConv.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.termination.terminationAtConv.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.termination.terminationAtConv.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.termination.terminationAtConv, 'Termination at Convenience', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Termination at Convenience', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Termination at Convenience', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Payment Obligations': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.payments.present === "Yes" || analysisData.payments.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.payments.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.payments.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.payments.present.length > 15 ?
                                                    <Tooltip title={analysisData.payments.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.payments.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.payments.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.payments.present, 'Payment Obligations', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Payment Obligations', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Payment Obligations', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Renewal': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.renewal.present === "Yes" ||analysisData.renewal.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.renewal.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.renewal.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.renewal.present.length > 15 ?
                                                    <Tooltip title={analysisData.renewal.present.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.renewal.present.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.renewal.present.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.renewal.present, 'Renewal', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Renewal', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Renewal', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Change of Control': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.changeOfControl.present === "Yes" || analysisData.changeOfControl.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.changeOfControl.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.changeOfControl.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.changeOfControl.present.length > 15 ?
                                                    <Tooltip title={analysisData.changeOfControl.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.changeOfControl.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.changeOfControl.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.changeOfControl.present, 'Change of Control', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Change of Control', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Change of Control', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Confidentiality': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.confidentiality.present === "Yes" || analysisData.confidentiality.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.confidentiality.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.confidentiality.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.confidentiality.present.length > 15 ?
                                                    <Tooltip title={analysisData.confidentiality.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.confidentiality.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.confidentiality.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.confidentiality.present, 'Confidentiality', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Confidentiality', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Confidentiality', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Insurance': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.insurance.present === "Yes" || analysisData.insurance.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.insurance.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.insurance.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.insurance.present.length > 15 ?
                                                    <Tooltip title={analysisData.insurance.present.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.insurance.present.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.insurance.present.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.insurance.present, 'Insurance clause', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Insurance clause', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Insurance clause', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Subletting/Assignment': {
                return (
                    <td style={{ minWidth: '160px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.subletting.present === "Yes" || analysisData.subletting.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.subletting.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.subletting.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.subletting.present.length > 15 ?
                                                    <Tooltip title={analysisData.subletting.present.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.subletting.present.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.subletting.present.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.subletting.present, 'Subletting/Assignment', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Subletting/Assignment', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Subletting/Assignment', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Non-compete': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.nonCompete.present === "Yes" || analysisData.nonCompete.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.nonCompete.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.nonCompete.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.nonCompete.present.length > 15 ?
                                                    <Tooltip title={analysisData.nonCompete.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.nonCompete.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.nonCompete.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.nonCompete.present, 'Non-compete clause', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Non-compete clause', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Non-compete clause', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Non-solicitation': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.nonSolicitation.present === "Yes" || analysisData.nonSolicitation.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.nonSolicitation.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.nonSolicitation.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.nonSolicitation.present.length > 15 ?
                                                    <Tooltip title={analysisData.nonSolicitation.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.nonSolicitation.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.nonSolicitation.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.nonSolicitation.present, 'Non-solicitation clause', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Non-solicitation clause', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Non-solicitation clause', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Force Majeure': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.forceMajeure.present === "Yes" || analysisData.forceMajeure.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.forceMajeure.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.forceMajeure.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.forceMajeure.present.length > 15 ?
                                                    <Tooltip title={analysisData.forceMajeure.present.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.forceMajeure.present.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.forceMajeure.present.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.forceMajeure.present, 'Force Majeure', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Force Majeure', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Force Majeure', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Events of Default': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.eventsOfDefault.present === "Yes" || analysisData.eventsOfDefault.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.eventsOfDefault.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.eventsOfDefault.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.eventsOfDefault.present.length > 15 ?
                                                    <Tooltip title={analysisData.eventsOfDefault.present.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.eventsOfDefault.present.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.eventsOfDefault.present.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.eventsOfDefault.present, 'eventsOfDefault', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'eventsOfDefault', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'eventsOfDefault', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Notice/Intimation Obligations': {
                return (
                    <td style={{ minWidth: '220px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.notice.present === "Yes" || analysisData.notice.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '220px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.notice.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.notice.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.notice.present.length > 15 ?
                                                    <Tooltip title={analysisData.notice.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.notice.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.notice.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.notice.present, 'Notice Obligations', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Notice Obligations', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Notice Obligations', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            case 'Indemnity/Reimbursements/Costs': {
                return (
                    <td style={{ minWidth: '250px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.indemnity.present === "Yes" || analysisData.indemnity.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.indemnity.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.indemnity.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.indemnity.present.length > 15 ?
                                                    <Tooltip title={analysisData.indemnity.present.length + ' paras'} placement="right-end">
                                                        <span>
                                                            {(analysisData.indemnity.present.length + ' paras').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.indemnity.present.length + ' paras'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.indemnity.present, 'Indemnity/Reimbursements/Costs', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Indemnity/Reimbursements/Costs', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Indemnity/Reimbursements/Costs', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ) */
            }
            case 'Limitation Of Liability': {
                return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        <div className="row">
                            <div className="col-md-12 pr-0">
                                <i id="present-icon" className={(analysisData.limitationOfLiability.present === "Yes" || analysisData.limitationOfLiability.present === "yes") ? "fas fa-check" : "fas fa-times"} />
                            </div>
                        </div>
                    </td>
                );
                /* return (
                    <td style={{ minWidth: '150px', display: 'table-cell' }}>
                        {!isNullOrUndefined(analysisData.limitationOfLiability.present[0]) ?
                            <>
                                <div className="row">
                                    {analysisData.limitationOfLiability.present[0].status !== 'No' ?
                                        <>
                                            <div className="col-md-10 pr-0">
                                                {analysisData.limitationOfLiability.present.length > 15 ?
                                                    <Tooltip title={analysisData.limitationOfLiability.present.length + ' sentences'} placement="right-end">
                                                        <span>
                                                            {(analysisData.limitationOfLiability.present.length + ' sentences').slice(0, 15) + '...'}
                                                        </span>
                                                    </Tooltip> :
                                                    <span>
                                                        {analysisData.limitationOfLiability.present.length + ' sentences'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-md-10 pr-0">
                                                <span className="view-more" onClick={() => setModal(true, analysisData.limitationOfLiability.present, 'Limitation Of Liability', analysisData.name, 'present')}>View</span>
                                            </div>
                                        </> :
                                        <div className="col-md-10 pr-0">
                                            <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Limitation Of Liability', bi: 'Present' } })}>
                                                Add&nbsp;
                                                        <img src="/static_images/new-tab-purple.svg" />
                                            </span>
                                        </div>}
                                </div>
                            </> :
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <span className="mailto-riverus" style={{ fontSize: '13px' }}
                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { page: 'Analysis', clause: 'Limitation Of Liability', bi: 'Present' } })}>
                                        Add&nbsp;
                                        <img src="/static_images/new-tab-purple.svg" />
                                    </span>
                                </div>
                            </div>}
                    </td>
                ); */
            }
            default: {
                return (
                    <span />
                )
            }
        }
    }
}

export default PresentAnalysis;
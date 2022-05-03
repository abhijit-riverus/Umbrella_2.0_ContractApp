import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { AnalysisPoints } from '../../State/analysisState';
import { History } from 'history';

interface Props {
    analysisData: AnalysisPoints;
    history: History;
    setModal: (check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => void;
}

class PartiesAnalysis extends Component<Props> {
    render() {
        let { analysisData, setModal, history } = this.props;
        return (
            <td style={{ minWidth: '220px', textAlign: 'left', alignItems: 'center', display: 'table-cell' }}>
                {!isNullOrUndefined(analysisData.basicInfo.parties[0]) ?
                    <>
                        <div className="row">
                            {analysisData.basicInfo.parties.slice(0, 2).map((ind, i) =>
                                <div className="col-md-5 pr-0" style={{ width: '110px' }} key={i}>
                                    {ind.length > 10 ?
                                        <Tooltip title={ind} placement="right-end">
                                            <span>
                                                {ind.slice(0, 10) + '..'} </span>
                                        </Tooltip>
                                        :
                                        <span>{ind}</span>
                                    }<br />

                                    {/* {ind.partyType.length > 10 ?
                                        <Tooltip title={ind.partyType} placement="right-end">
                                            <span>
                                                {'(' + ind.partyType.slice(0, 10) + '..' + ')'} </span>
                                        </Tooltip>
                                        :
                                        <span>{ind.partyType !== '' && '(' + ind.partyType + ')'}</span>
                                    } */}
                                </div>
                            )}
                            {analysisData.basicInfo.parties.length > 2 &&
                                <div className="col-md-2  pr-0 display-flex">
                                    <span id="extra-pop" style={{ left: '-5px' }} onClick={() => setModal(true, analysisData.basicInfo.parties, 'Contracting Parties', analysisData.name, 'parties')}>
                                        +{analysisData.basicInfo.parties.length - 2}
                                    </span>
                                </div>}
                        </div>
                    </> :
                    <div className="row">
                        <div className="col-md-8 pr-0">
                            <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Basic Information', bi: 'Contracting Parties' } })}>
                                Add&nbsp;
                             <img src="/static_images/new-tab-purple.svg" />
                            </span>
                        </div>
                    </div>}
            </td>
        )
    }
}

export default PartiesAnalysis;
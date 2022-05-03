import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { getBackgroundColor } from '../../../Utils/GeneralUtil/genUtils';
import { AnalysisPoints } from '../../State/analysisState';
import { History } from 'history';

interface Props {
    analysisData: AnalysisPoints;
    history: History;
    setModal: (check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => void;
}

class TagsAnalysis extends Component<Props> {
    render() {
        let { analysisData, setModal, history } = this.props;
        return (
            <td style={{ minWidth: '200px', display: 'table-cell', alignItems: 'center' }}>
                {!isNullOrUndefined(analysisData.basicInfo.tags[0]) ?
                    <>
                        <div className="row">
                            <div className="col-md-8 pr-0">
                                {analysisData.basicInfo.tags.slice(0, 2).map((ind, i) =>
                                    <span className="table-tag-label" style={{ /* background: getBackgroundColor(ind.id), */lineHeight: '15px', borderRadius: '2px' }} key={i}>
                                        {ind.length > 15 ?
                                            <Tooltip title={ind} placement="right-end">
                                                <span>
                                                    {ind.slice(0, 15) + '...'} <br />
                                                </span>
                                            </Tooltip> :
                                            <span>
                                                {ind}<br />
                                            </span>}
                                    </span>
                                )}
                            </div>

                            {analysisData.basicInfo.tags.length > 2 && <div className="col-md-2 display-flex pr-0">
                                <span id="extra-pop" onClick={() => setModal(true, analysisData.basicInfo.tags, 'Tags', analysisData.name, 'tags')}>
                                    +{analysisData.basicInfo.tags.length - 2}
                                </span>
                            </div>}
                        </div>
                    </> :
                    <div className="row">
                        <div className="col-md-8 pr-0">
                            <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                onClick={() => history.push({ pathname: '/document/analysis/' + btoa(analysisData.fileId.toString()), state: { clause: 'Basic Information', bi: 'Tags' } })}>
                                Add&nbsp;
                                <img src="/static_images/new-tab-purple.svg" />
                            </span>
                        </div>
                    </div>}
            </td>
        )
    }
}

export default TagsAnalysis;
import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { AnalysisPoints } from '../../State/analysisState';

interface Props {
    analysisData: AnalysisPoints;
}

class LockInAnalysis extends Component<Props> {
    render() {
        let { analysisData } = this.props;
        return (
            <td style={{ minWidth: '130px', display: 'table-cell' }}>
                {!isNullOrUndefined(analysisData.termination.lockInPeriod) && analysisData.termination.lockInPeriod.length > 0 ?
                    <>
                        <div className="row">
                            {analysisData.termination.lockInPeriod[0].length > 70 ?
                                <div className="col-md-10 pr-0">
                                    <Tooltip title={analysisData.termination.lockInPeriod[0]} placement="right-end">
                                        <span className='dotted-line'>
                                            {analysisData.termination.lockInPeriod[0].slice(0, 70) + '...'}
                                        </span>
                                    </Tooltip>
                                </div>
                                :
                                <span>{analysisData.termination.lockInPeriod[0]}</span>
                            }
                        </div>
                    </> :
                    <div className="row">
                        <div className="col-md-8 pr-0">
                            <img src="/static_images/empty-dash.svg" />
                        </div>
                    </div>}
            </td>
        );
    }
}

export default LockInAnalysis;
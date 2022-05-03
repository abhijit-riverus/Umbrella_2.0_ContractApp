import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { Child } from '../../State/documentState';
import { DarkTooltip } from '../documentInsights';

interface Props {
    authorities: Child[];
}

export default function AuthoritiesInsights(props: Props) {
    return (
        // <div className="row">
        <div className="col-md-12 pr-0">
            {props.authorities !== undefined && props.authorities.map((authority: any, i) =>
                <div className="row" key={i}>
                    <div className="col-md-10 ml-2 pr-0 pl-2">
                        <div className="row">
                            {authority.name.length > 30 ?
                                <DarkTooltip title={authority.name} placement="right-end">
                                    <div className="col-md-12 mb-2 parties-data" style={{ fontSize: '14px' }}>
                                        {i + 1}.&nbsp;{authority.name.slice(0, 50) + '...'}
                                    </div>
                                </DarkTooltip> :
                                <div className="col-md-12 mb-2 parties-data" style={{ fontSize: '14px' }}>
                                    {i + 1}.&nbsp;{authority.name}
                                </div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
        // </div>
    );
}
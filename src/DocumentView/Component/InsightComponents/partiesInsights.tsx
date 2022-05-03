import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { Child } from '../../State/documentState';
import { DarkTooltip } from '../documentInsights';

interface Props {
    parties: Child[];
}

export default function PartiesInsights(props: Props) {
    return (
        // <div className="row">
        <div className="col-md-12 pr-0">
            {props.parties.map((party: any, i) =>
                <div className="row" key={i}>
                    <div className="col-md-12 my-2 pr-0">
                        <div className="row">
                            {party.partyName.length > 30 ?
                                <DarkTooltip title={party.partyName} placement="right-end">
                                    <div className="col-md-12 parties-data" style={{ fontSize: '14px' }}>
                                        {i + 1}.&nbsp;{party.partyName.slice(0, 50) + '...'}
                                    </div>
                                </DarkTooltip> :
                                <div className="col-md-12 parties-data" style={{ fontSize: '14px' }}>
                                    {i + 1}.&nbsp;{party.partyName}
                                </div>}
                        </div>
                        <div className="row">
                            <div className="col-md-12 parties-data ml-3" style={{ fontSize: '12px' }}>
                                {party.partyType}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        // </div>
    );
}
import * as React from 'react';
import { isNullOrUndefined } from 'is-what';
import { getUploadedTime } from '../../../Utils/DataModifierUtil/dataModUtil';
export interface Props {
    uploadedBy: string;
    uploadedOn: string;
    contractType: string;
}

export default function SubTitle(props: Props) {
    let { uploadedBy, uploadedOn, contractType } = props;
    return (
        <div className="row">
            <div className="col-12">
                <span className="contract-type">{contractType}</span></div>
            <div className="col-12">
                {!isNullOrUndefined(uploadedOn) && uploadedOn.length > 0 && <span className="subtitle pr-1" style={{ borderRight: '1px solid #D0D0D0' }}>&nbsp;&nbsp;{getUploadedTime(uploadedOn)}</span>}
                <span className="subtitle ml-1">{uploadedBy}</span>
            </div>
        </div>
    );
}
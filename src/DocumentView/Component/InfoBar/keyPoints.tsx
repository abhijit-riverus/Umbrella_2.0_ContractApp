import React from 'react';
import { MetaData } from '../../State/documentState';

interface Props {
    metaData: MetaData[];
}

export default class KeyPoints extends React.Component<Props> {
    render() {
        let { metaData } = this.props;
        return (
            <>
                {metaData.map((data: MetaData, i: number) =>
                    <div className="keypoint-container px-1 mx-4" key={i}>
                        <span className="keypoint-data">{data.label}
                        </span>&nbsp;
                        <span className="keypoint-value tooltip">{this.displayValue(data)}
                            {data.label === 'Jurisdiction' && data.value.length > 1 &&
                                <span className="tooltiptext" id="jurisdiction-tooltiptext" key={i}>
                                    {data.value.map((value: string, i: number) =>
                                        <div key={i}>
                                            {value}
                                        </div>
                                    )}
                                </span>
                            }
                        </span>
                    </div>
                )}
            </>
        );
    }
    displayValue(data: any) {
        if (data.label === 'Jurisdiction') {
            if (data.value.length > 0) {
                let valueString = data.value.join(', ');
                if (valueString.length > 10 && data.value.length > 1) {
                    let len = data.value.length - 1;
                    return valueString.slice(0, 10) + '..+' + len;
                } else {
                    return data.value
                }
            } else {
                return 'N/A'
            }
        } else {
            return data.value
        }
    }
}
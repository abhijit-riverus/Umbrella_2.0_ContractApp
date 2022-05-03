import React from 'react';
import { isNullOrUndefined } from 'is-what';

export interface AnimatedLines {
    width: number;
    height: number;
    marginTop?: string;
}

export interface Props {
    animatedLines: AnimatedLines[];
}

export default class LinesLoader extends React.Component<Props> {
    render() {
        let { animatedLines } = this.props;
        return (
            <div className="col-md-12">
                {animatedLines.map((line, i) =>
                    <div key={i} className="content-placeholder" style={{ width: line.width + '%', height: line.height + 'px' }}>
                        <div className="animated-background" style={{ backgroundColor: '#f6f7f8', marginTop: !isNullOrUndefined(line.marginTop) ? line.marginTop : '6px' }} />
                    </div>
                )}
            </div>
        );
    }
}
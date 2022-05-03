import * as React from 'react';
import { isNullOrUndefined } from 'is-what';

interface Props {
    maxHeight: number | string;
    minHeight?: string;
    mode?: string;
    padding? : boolean;
}

export default class Scrollable extends React.Component<Props> {
    render() {
        if (typeof (this.props.maxHeight) === 'number') {
            return (
                <div className="row">
                    <div className={!isNullOrUndefined(this.props.mode) ? "col-md-12 custom-scrollbar-checkbox-dark" : !isNullOrUndefined(this.props.padding) && this.props.padding === false ? "col-md-12 custom-scrollbar-checkbox p-0" : "col-md-12 custom-scrollbar-checkbox"}
                        style={{ maxHeight: this.props.maxHeight + 'px', minHeight: !isNullOrUndefined(this.props.minHeight) ? this.props.minHeight : '' }}>
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className={!isNullOrUndefined(this.props.mode) ? "col-md-12 custom-scrollbar-checkbox-dark" : "col-md-12 custom-scrollbar-checkbox"}
                        style={{ maxHeight: this.props.maxHeight + 'vh', minHeight: !isNullOrUndefined(this.props.minHeight) ? this.props.minHeight : '' }}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
}
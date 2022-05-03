import * as React from 'react';

interface Props {
    minWidth: number;
}

export default class HorizontalScroll extends React.Component<Props> {
    render() {    
        return (
            <div className="row">
                <div className="col-md-12 custom-horizontal-scroll" style={{ maxWidth: this.props.minWidth + 'px' }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
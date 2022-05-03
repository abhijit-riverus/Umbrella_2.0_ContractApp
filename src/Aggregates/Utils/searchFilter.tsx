import * as React from 'react';

export interface Props {
    type: string;
    search: (e: string, type: string) => void;
}
export default class SearchFilter extends React.Component<Props> {
    render() {
        return (
            <div className="col-md-12" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <input type="text" className="search-filter-input" onChange={(e) => this.props.search(e.currentTarget.value.trim(), this.props.type)} style={{ width: '100%' }} />
            </div>
        );
    }
}

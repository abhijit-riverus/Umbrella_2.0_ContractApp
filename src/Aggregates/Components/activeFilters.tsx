import * as React from 'react';
import ChildFilter from './ChildFilter';
import { AppliedFilters } from '../State/AggregatesState';

export interface Props {
    isMobile: boolean;
    appliedFilters: AppliedFilters[];
    page: string;
    window: number;
    count: number;
    countLoader: boolean;
    deleteFilter: (filters: AppliedFilters[], path: string, sort: string, page: string, window: number, pageNumber: number) => void;
}

export default class ActiveFilters extends React.Component<Props> {
    render() {
        let { window, appliedFilters, deleteFilter, page, countLoader } = this.props;
        return (
            <div className="row" >
                <div className="col-md-12" id="radii-row" style={{ borderRadius: '5px 5px 0px 0px' }}>
                    <div className="search-card">
                        <div className="row" id="results-for-row">
                            <div className="col-md-12">
                                <div className="row">
                                    {appliedFilters.map((type, i) => (
                                        <span key={i}>
                                            {this.checkSearchFilters(type.i) && <ChildFilter deleteFilter={(path) => deleteFilter(appliedFilters, path, '', page, window, 0)} path={type.i} childFilters={type.v} isChild={false} />}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    checkSearchFilters(name: string) {
        switch (name) {
            case 'main_search_content': {
                return false;
            }
            default: {
                return true;
            }
        }
    }
}
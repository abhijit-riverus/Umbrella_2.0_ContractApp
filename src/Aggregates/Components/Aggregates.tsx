import React from 'react';
import LinesLoader from '../../UniversalComponents/Loader/linesLoader';
import { AggregateState, AppliedFilters } from '../State/AggregatesState';
import Facets from './Facets';

interface Props {
    page: string;
    searchFilterLoader: boolean;
    isMobile: boolean;
    aggregates: AggregateState[];
    filterResult: AggregateState[];
    expandList: string[];
    expanding: boolean;
    appliedFilters: AppliedFilters[];
    sort: string;
    pageNumber: number;
    window: number;
    uniqueFileIds: number[];
    searchLoader: boolean;
    countLoader: boolean;
    filterLoader: boolean;
    scrollBottomLoader: boolean;
    savedFilterArray: string[];
    savedAppliedFilter: (savedFilterArray: string[]) => void;
    searchFilter: (term: string, sort: string, type: string, filter: AppliedFilters[], fileId: number[], page: string, aggregateType: string) => void;
    addFilter: (filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string, sort: string, page: string, window: number, pageNumber: number, display: boolean, permission: boolean) => void;
    expandAggregate: (name: string) => void;
    getAggregates: (value: string, level: number, page: string, sort: string, label: string, type: string, filters: AppliedFilters[], path: string, fileId: number[]) => void;
    deleteFilter: (filters: AppliedFilters[], path: string, sort: string, page: string, window: number, pageNumber: number) => void;
}
interface State {
    filterClicked: string;
    individualAggregate: any;
}

export default class Aggregates extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            individualAggregate: {},
            filterClicked: window.screen.width < 600 ? props.aggregates[0].value : '',
        };
    }
    componentDidMount() {
        let { aggregates } = this.props;
        this.findIndividualAggregate(aggregates, this.state.filterClicked);
    }
    componentWillReceiveProps(nextProps: Props) {
        if (this.props.aggregates !== nextProps.aggregates && nextProps.aggregates.length > 0) {
            this.findIndividualAggregate(nextProps.aggregates, this.state.filterClicked);
        }
    }
    render() {
        let { filterLoader, searchLoader, scrollBottomLoader,  aggregates, searchFilterLoader, countLoader, savedAppliedFilter, savedFilterArray, filterResult, addFilter, deleteFilter, searchFilter, window, sort, page, getAggregates, appliedFilters, expandAggregate, expandList, expanding, isMobile, uniqueFileIds } = this.props;
        if (!scrollBottomLoader && (searchLoader || countLoader || filterLoader)) {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 mt-5" style={{ maxWidth: '95%' }}>
                            <LinesLoader animatedLines={[{ width: 40, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 },
                            { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }
                            ]} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-5" style={{ maxWidth: '95%' }}>
                            <LinesLoader animatedLines={[{ width: 40, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 },
                            { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }, { width: 100, height: 15 }
                            ]} />
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-md-12" style={{ maxWidth: '95%' }}>
                        {aggregates.map((agg, i) =>
                            <div key={i} style={{ marginBottom: '15px' }}>
                                {aggregates[i].children.length > 0 && <Facets savedAppliedFilter={savedAppliedFilter} savedFilterArray={savedFilterArray} page={page} searchFilterLoader={searchFilterLoader} filterResult={filterResult}
                                    searchFilter={searchFilter} uniqueFileIds={uniqueFileIds} deleteFilter={(filters, path) => deleteFilter(filters, path, sort, page, window, 0)}
                                    addFilter={(filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string) => addFilter(filters, path, type, operator, value, alias, sort, page, window, 0, true, true)}
                                    expanding={expanding} expandAggregate={expandAggregate} facet={agg}
                                    getAggregates={(v, l, t, p) => getAggregates(v, l, page, 'count', '', t, appliedFilters, p, uniqueFileIds)}
                                    appliedFilters={appliedFilters} expandList={expandList} isMobile={false} />}
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }

    findIndividualAggregate = (aggregates: AggregateState[], clicked: string) => {
        let clickedAggregate = clicked;
        let aggregateIndex = aggregates.findIndex((el) => { return el.type === clickedAggregate });
        this.setState({ individualAggregate: aggregates[aggregateIndex] });
        return aggregates[aggregateIndex];
    }
}
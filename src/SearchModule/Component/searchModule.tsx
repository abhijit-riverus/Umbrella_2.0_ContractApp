import React, { Component } from 'react';
import SearchResultCard from './searchResultCard';
import SortBar from './sortBar';
import { History } from 'history';
import { SearchResult } from '../../Search/State/SearchState';
import SearchModuleHeader from './searchModuleHeader';
import { defaultPageSize } from '../../Constants/const';
import Aggregates from '../../Aggregates/Container/AggregatesCon';
import { AppliedFilters } from '../../Aggregates/State/AggregatesState';
import ActiveFilters from '../../Aggregates/Container/activeFilterCon';
import { isNullOrUndefined } from 'is-what';
import ErrorMessage from './errorMessage';

interface Props {
    resultFromParent: SearchResult[];
    searchResult: SearchResult[];
    searchTerm: string;
    pageType: string;
    sort: string; selectCase: (result: SearchResult) => void;
    selectedCase: SearchResult;
    sortTypeList: string[];
    count: number;
    filterResult: (filters: AppliedFilters[], sort: string, window: number, isLoader: boolean, setToDefault: boolean) => void;
    search: (sort: string, pageSize: number) => void;
    sortHandle: (sortBy: string) => void;
    history: History;
    fileId: number[];
    visibility: boolean;
    toggleSearchBarVisibility: (visibility: boolean) => void;
    searchCount: (sortBy: string, filters: AppliedFilters[]) => void;
    searchLoader: boolean;
    filterLoader: boolean;
    countLoader: boolean;
    appliedFilters: AppliedFilters[];
    isFilterResultEmpty: boolean;
    scrollBottomLoader: boolean;
}

interface State {
    pageSize: number;
}

export default class SearchModule extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pageSize: defaultPageSize,
        };
        this.sortResult = this.sortResult.bind(this);
    }

    componentDidMount() {
        let { resultFromParent, searchCount, appliedFilters, sort } = this.props;
        if (resultFromParent.length > 0) {
            window.scrollTo(0, 0);
            searchCount(sort, appliedFilters);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        // if (this.props.searchResult !== nextProps.searchResult && this.props.searchResult.length === 0 && this.props.isFilterResultEmpty) {
        //     this.props.toggleSearchBarVisibility(false);
        // }
        if (nextProps.resultFromParent.length > 0 && JSON.stringify(this.props.resultFromParent) !== JSON.stringify(nextProps.resultFromParent)) {
            nextProps.searchCount(nextProps.sort, nextProps.appliedFilters);
        }
    }
    render() {
        let { searchResult, appliedFilters, isFilterResultEmpty, sort, count, searchTerm, scrollBottomLoader, pageType, toggleSearchBarVisibility, searchLoader, countLoader, filterLoader } = this.props;
        if ((searchResult.length === 0 && !searchLoader) || isFilterResultEmpty) {
            return (
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <ErrorMessage toggleSearchBarVisibility={toggleSearchBarVisibility} searchTerm={atob(searchTerm)} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-md-3" style={{ margin: '5% 0%' }}>
                        <Aggregates window={15} pageNumber={1} page={pageType} isMobile={false} />
                    </div>
                    <div className="col-12 col-md-9 mt-3" style={{ borderLeft: 'solid 12px #FBFBFB' }}>
                        {/* {this.props.sortTypeList.length > 0 && <div className="row" id="sorted-one">
                        <SortBar isMobile={false} handleChange={this.sortResult} sortTypeList={this.props.sortTypeList} sortType={sort} />
                    </div>} */}
                        <div style={{ background: '#FBFBFB' }}>
                            <SearchModuleHeader filterLoader={filterLoader} count={count} searchTerm={atob(searchTerm)} countLoader={countLoader} searchLoader={searchLoader} />
                            {appliedFilters.length > 1 && <div className="row" >
                                <div className="col-md-12 .d-xl-none .d-sm-none .d-md-block" style={{ borderBottom: 'solid 2px #f5f5f5' }} >
                                    <ActiveFilters window={15} isMobile={false} count={count} countLoader={countLoader} />
                                </div>
                            </div>}
                        </div>
                        <SearchResultCard scrollBottomLoader = {scrollBottomLoader} countLoader={countLoader} searchMore={this.searchMore} searchResult={searchResult}
                            isMobile={false} searchLoader={searchLoader} filterLoader={filterLoader} />
                    </div>
                </div>
            );
        }
    }

    sortResult(sort: string) {
        let { pageType, sortHandle } = this.props;
        // sort via origin API
        // sortHandle(sort);
    }

    searchMore = () => {
        let { filterResult, filterLoader, appliedFilters, count } = this.props;
        let { pageSize } = this.state;
        if (!filterLoader && count > pageSize) {
            this.setState({ pageSize: pageSize + defaultPageSize });
            filterResult(appliedFilters, 'relevance', pageSize + defaultPageSize, false, false);
        }
    }
}
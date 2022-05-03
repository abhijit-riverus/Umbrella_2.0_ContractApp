import React from 'react';
import { SearchResult } from '../State/SearchState';
import { History } from 'history';
import { isNullOrUndefined } from 'is-what';
import SearchModule from '../../SearchModule/Container/searchModuleCont';
import { defaultPageSize } from '../../Constants/const';
import SideNavbar from '../../UniversalComponents/SideNavbar/Container/sideNavBarCon';
import { AppliedFilters } from '../../Aggregates/State/AggregatesState';

interface Props {
    history: History;
    match: any;
    pageType: string;
    searchResult: SearchResult[];
    searchLoader: boolean;
    pageWatcher: (pageType: string) => void;
    search: (searchTerm: string, sortBy: string, pageSize: number) => void;
    searchMore: (searchTerm: string, sortBy: string, pageSize: number) => void;
    InitFilter: (appliedFilters: AppliedFilters[], sort: string) => void;
}

interface State {
    searchTerm: string;
}

export default class Search extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
    }

    componentWillMount() {
        this.props.pageWatcher('search'); // save the page identifier in store.
    }

    componentDidMount() {
        let { match } = this.props;
        let searchTerm = decodeURIComponent(match.params.query).replace(/~~pct~~/g, '%');
        if (!isNullOrUndefined(match.params.query)) {
            this.search(searchTerm, this.props, 'name', defaultPageSize);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        let { match } = nextProps;
        if (!isNullOrUndefined(match.params.query)) {
            let searchTermFromQuery = decodeURIComponent(match.params.query).replace(/~~pct~~/g, '%');
            if (searchTermFromQuery !== decodeURIComponent(this.props.match.params.query).replace(/~~pct~~/g, '%')) {
                this.search(searchTermFromQuery, nextProps, 'name', defaultPageSize);
            }
        }
    }

    search(searchTerm: string, nextProps: Props, sort: string, pageSize: number) {
        let { InitFilter } = this.props;
        if (!isNullOrUndefined(searchTerm)) {
            this.setState({ searchTerm: searchTerm });
            if (searchTerm.trim() !== '') {
                nextProps.searchMore(searchTerm.trim(), sort, pageSize);
            };
        }
        var searchFilter: AppliedFilters[] = [];
        searchFilter.push({
            i: 'main_search_content',
            o: 'AND',
            v: [{
                i: atob(searchTerm),
                o: 'AND',
                v: [],
                a: atob(searchTerm)
            }],
            a: ''
        });
        InitFilter(searchFilter, sort);
    }

    handleSearch = (sort: string, pageSize: number) => {
        let { searchTerm } = this.state;
        this.search(searchTerm, this.props, sort, pageSize);
    }

    handleSort = (sort: string) => {
        // let { searchTerm } = this.state;
        // this.search(searchTerm, this.props, sort);
    }

    render() {
        let { searchLoader, searchResult, history, match } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 col-12">
                    <div className="row">
                        <div className="col-md-1" style={{ zIndex: 2 }}>
                            <SideNavbar history={history} />
                        </div>
                        <div className="col-md-11" style={{ zIndex: 1 }}>
                            <SearchModule resultFromParent={searchResult} history={history} sortHandle={this.handleSort} searchTerm={this.state.searchTerm}
                                search={(sort: string, pageSize: number) => this.handleSearch(sort, pageSize)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
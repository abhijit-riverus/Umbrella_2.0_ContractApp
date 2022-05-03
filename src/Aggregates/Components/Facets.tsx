import React from 'react';
import { AggregateState, AppliedFilters } from '../State/AggregatesState';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import Filters from './Filters';
import { isNullOrUndefined } from 'is-what';
import SortUtils from '../Utils/sortedDataGenerator';
import SearchFilter from '../Utils/searchFilter';

interface Props {
    facet: AggregateState;
    expandList: string[];
    expanding: boolean;
    isMobile: boolean;
    appliedFilters: AppliedFilters[];
    uniqueFileIds: number[];
    searchFilterLoader: boolean;
    filterResult: AggregateState[];
    page: string;
    savedFilterArray: string[];
    searchFilter: (term: string, sort: string, type: string, filter: AppliedFilters[], fileId: number[], page: string, aggregateType: string) => void;
    getAggregates: (value: string, level: number, type: string, path: string, fileId: number[]) => void;
    expandAggregate: (name: string) => void;
    deleteFilter: (filters: AppliedFilters[], path: string) => void;
    addFilter: (filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string) => void;
    savedAppliedFilter: (savedFilterArray: string[]) => void;
}

interface State {
    sortingOptionList: string[];
    clickedStatus: boolean;
    facet: AggregateState;
    searchFilter: boolean;
    aliasList: string[];
}

export default class Facets extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchFilter: false,
            clickedStatus: false,
            facet: this.props.facet,
            sortingOptionList: [],
            aliasList: []
        }
    }
    render() {
        let { facet, filterResult, savedAppliedFilter, savedFilterArray, searchFilterLoader, page, getAggregates, searchFilter, deleteFilter, addFilter, expandAggregate, appliedFilters, expandList, expanding, isMobile, uniqueFileIds } = this.props;
        let searchFilterList: string[] = ['jurisdiction', 'clauseType'];
        return (
            <div className="row">
                <div className="filter-class col-md-12">
                    <div className="row" style={{ borderBottom: '1px solid #DEDEDE' }}>
                        {!isMobile && <>
                            <div className="col-md-10 individual-facet">
                                {facet.children.length > 0 && facet.label}
                                {/* {this.state.sortingOptionList.indexOf(facet.type) > -1 &&
                                    <i style={{ cursor: 'pointer' }} onClick={() => this.SortingEnable(!this.state.clickedStatus)} className={this.getClassName(facet.label)} />
                                } */}
                            </div>
                            {searchFilterList.indexOf(facet.type) > -1 &&
                                <div className="col-md-2 filter-search-icon">
                                    {searchFilterLoader ? <i className="fas fa-hourglass-start" /> :
                                        <img alt='filter' src="/static_images/filter-search-icn.svg" onClick={() => this.setState({ searchFilter: !this.state.searchFilter })} />}
                                </div>}
                            {this.state.searchFilter && !isMobile &&
                                <SearchFilter search={(term: string) => { searchFilter(term, 'date', page, appliedFilters, uniqueFileIds, page, facet.type) }} type={facet.label} />}
                        </>}
                    </div>
                    {searchFilterList.indexOf(facet.type) > -1 && filterResult.length > 0 && filterResult[0].type === facet.type ?
                        <div className="col-md-12 filter-class">
                            <Scrollable maxHeight={300} >
                                {filterResult.slice(0, 5).map((fr, j) =>
                                    <Filters savedAppliedFilter={savedAppliedFilter} savedFilterArray={savedFilterArray} uniqueFileIds={uniqueFileIds} fromSearch={filterResult.length > 0 ? true : false} expanding={expanding} isAlias={this.state.aliasList.indexOf(facet.type) > -1 ? true : false} expandAggregate={expandAggregate} expandList={expandList}
                                        showChildren={false} deleteFilter={deleteFilter} addFilter={addFilter} getAggregates={getAggregates} key={j}
                                        filter={fr} appliedFilters={appliedFilters} maxValue={getMaxValue(facet.children)} />
                                )}
                            </Scrollable>
                        </div>
                        :
                        <>
                            {!isNullOrUndefined(facet.children) &&
                                <Scrollable maxHeight={300} >
                                    {facet.children.map((childFacet, j) =>
                                        <Filters savedAppliedFilter={savedAppliedFilter} savedFilterArray={savedFilterArray} uniqueFileIds={uniqueFileIds} fromSearch={false} expanding={expanding} isAlias={this.state.aliasList.indexOf(facet.type) > -1 ? true : false} expandAggregate={expandAggregate}
                                            expandList={expandList} showChildren={false} deleteFilter={deleteFilter} addFilter={addFilter}
                                            getAggregates={getAggregates} key={j} filter={childFacet} appliedFilters={appliedFilters}
                                            maxValue={getMaxValue(facet.children)} />)}
                                </Scrollable>
                            }
                        </>}
                </div>
            </div>
        );
    }
    // getClassName(facetName: string) {
    //     var className;
    //     if (facetName === 'Subjects') {
    //         if (this.state.clickedStatus) {
    //             className = 'fas fa-sort-alpha-up';
    //         } else {
    //             className = 'fas fa-sort-alpha-down';
    //         }
    //     } else {
    //         if (this.state.clickedStatus) {
    //             className = 'fas fa-sort-numeric-up';
    //         } else {
    //             className = 'fas fa-sort-numeric-down';
    //         }
    //     }
    //     return className;
    // }
    // SortingEnable(clickStatus: boolean) {
    //     this.setState({ clickedStatus: clickStatus });
    //     this.setState({ facet: SortUtils.SortedDataGenerator({ type: 'alphabetical', clickedStatus: clickStatus, data: this.props.facet }) });
    // }
}
function getMaxValue(facets: AggregateState[]) {
    var count: number[] = [];
    for (var i = 0; i < facets.length; i++) {
        count.push(facets[i].countValue);
    }
    var maxValue = 0;
    maxValue = Math.max(...count);
    return maxValue;
}
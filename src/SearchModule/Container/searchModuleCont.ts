import { connect } from "react-redux";
import SearchModule from "../Component/searchModule";
import SearchModuleGenerator from "../Actions/searchModuleGen";
import { History } from 'history';
import { SearchResult } from "../../Search/State/SearchState";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import SearchBarActionGenerator from "../../UniversalComponents/SearchBar/Action/actionGen";
import { AppliedFilters } from "../../Aggregates/State/AggregatesState";
import SearchActionGen from "../../Search/Actions/SearchGen";
import AggregatesActionGenerator from "../../Aggregates/Actions/AggregatesGen";

interface OwnProps {
    resultFromParent: SearchResult[];
    searchTerm: string;
    search: any;
    history: History;
}
export function mapStateToProps(appState: StoreTree, ownProps: OwnProps) {
    return {
        resultFromParent: ownProps.resultFromParent,
        searchResult: appState.search.searchResult,
        searchTerm: ownProps.searchTerm,
        selectedCase: appState.searchModule.selectedCase,
        count: appState.search.count,
        pageType: appState.app.pageType,
        search: ownProps.search,
        history: ownProps.history,
        fileId: appState.searchModule.fileId,
        visibility: appState.searchBar.visibility,
        searchLoader: appState.search.searchLoader,
        countLoader: appState.search.countLoader,
        filterLoader: appState.aggregates.filterLoader,
        scrollBottomLoader: appState.aggregates.scrollBottomLoader,
        appliedFilters: appState.aggregates.appliedFilters,
        isFilterResultEmpty: appState.aggregates.isFilterResultEmpty,
        sortTypeList: ['name', 'relevance'],
        sort: 'name'
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        toggleSearchBarVisibility: (visibility: boolean) => dispatch(SearchBarActionGenerator.toggleVisibility(visibility)),
        // InitFilter: (appliedFilters: AppliedFilters[], sort: string) => dispatch(AggregatesActionGenerator.InitFilter(appliedFilters, sort)),
        // infuseSearchResult: (searchResult: SearchResult[], searchTerm: string, filters: AppliedFilters[], documentType: string, page: string, sort: string) => dispatch(SearchModuleGenerator.infuseSearchResult(searchResult, searchTerm, filters, documentType, page, sort)),
        selectCase: (result: SearchResult) => dispatch(SearchModuleGenerator.selectCase(result)),
        // addFilter: (filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string, sort: string, page: string, window: number, pageNumber: number) => dispatch(AggregatesActionGenerator.addFilter(filters, path, type, operator, value, alias, sort, page, window, pageNumber, true, true)),
        // getAggregates: (value: string, level: number, page: string, sort: string, label: string, type: string, filters: AppliedFilters[], path: string, fileId: number[]) => dispatch(AggregatesActionGenerator.getAggregates({ value: value, level: level, page: page, sort: sort, label: label, type: type }, filters, path, fileId)),
        filterResult: (filters: AppliedFilters[], sort: string, window: number, isLoader: boolean, setToDefault: boolean) => dispatch(AggregatesActionGenerator.filterResult(filters, sort, window, isLoader, setToDefault)),
        emptyResults: () => dispatch(SearchModuleGenerator.emptyResults()),
        searchCount: (sortBy: string, filters: AppliedFilters[]) => dispatch(SearchActionGen.searchCount(sortBy, filters))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchModule);
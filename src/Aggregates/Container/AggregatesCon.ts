import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import AggregatesActionGenerator from "../Actions/AggregatesGen";
import Aggregates from "../Components/Aggregates";
import { AppliedFilters } from "../State/AggregatesState";

interface AggregatesOwnProps {
    page: string;
    window: number;
    pageNumber: number;
}

export function mapStateToProps(appState: StoreTree, ownProps: AggregatesOwnProps) {
    return {
        page: appState.app.pageType,
        aggregates: appState.aggregates.aggregates,
        appliedFilters: appState.aggregates.appliedFilters,
        expandList: appState.aggregates.expandList,
        expanding: appState.aggregates.expanding,
        sort: appState.aggregates.sort,
        uniqueFileIds: appState.search.uniqueFileIds,
        filterResult: appState.aggregates.filterResult,
        searchLoader: appState.search.searchLoader,
        countLoader: appState.search.countLoader,
        filterLoader: appState.aggregates.filterLoader,
        searchFilterLoader: appState.aggregates.searchFilterLoader,
        scrollBottomLoader: appState.aggregates.scrollBottomLoader,
        savedFilterArray: appState.aggregates.savedFilterArray
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        getAggregates: (value: string, level: number, page: string, sort: string, label: string, type: string, filters: AppliedFilters[], path: string, fileId: number[]) => dispatch(AggregatesActionGenerator.getAggregates({ value: value, level: level, sort: sort, label: label, type: type }, filters, path, fileId)),
        addFilter: (filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string, sort: string, page: string, window: number, pageNumber: number, display: boolean, permission: boolean) => dispatch(AggregatesActionGenerator.addFilter(filters, path, type, operator, value, alias, sort, page, window, pageNumber, display, permission)),
        expandAggregate: (name: string) => dispatch(AggregatesActionGenerator.expandAggregate(name)),
        searchFilter: (term: string, sort: string, type: string, filter: AppliedFilters[], fileId: number[], page: string, aggregateType: string) => dispatch(AggregatesActionGenerator.searchFilter(term, 1, page, sort, type, filter, fileId, aggregateType)),
        deleteFilter: (filters: AppliedFilters[], path: string, sort: string, page: string, window: number, pageNumber: number) => dispatch(AggregatesActionGenerator.deleteFilter(filters, path, sort, page, window, pageNumber)),
        savedAppliedFilter: (savedFilterArray: string[]) => dispatch(AggregatesActionGenerator.saveAppliedFilters(savedFilterArray))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Aggregates)
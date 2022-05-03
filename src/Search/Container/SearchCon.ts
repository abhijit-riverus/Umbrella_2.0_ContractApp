import { connect } from "react-redux";
import Search from "../Components/search";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import SearchActionGen from "../Actions/SearchGen";
import AppActionGenerator from "../../App/Actions/actionGen";
import AggregatesActionGenerator from "../../Aggregates/Actions/AggregatesGen";
import { AppliedFilters } from "../../Aggregates/State/AggregatesState";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        searchResult: appState.search.searchResult,
        searchLoader: appState.search.searchLoader,
        pageType: appState.app.pageType
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        pageWatcher: (pageType: string) => dispatch(AppActionGenerator.pageWatcher(pageType)),
        InitFilter: (appliedFilters: AppliedFilters[], sort: string) => dispatch(AggregatesActionGenerator.InitFilter(appliedFilters, sort)),
        search: (searchTerm: string, sortBy: string, pageSize: number) => dispatch(SearchActionGen.search(searchTerm, sortBy, pageSize)),
        searchMore: (searchTerm: string, sortBy: string, pageSize: number) => dispatch(SearchActionGen.search(searchTerm, sortBy, pageSize))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
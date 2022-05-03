import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import AggregatesActionGenerator from "../Actions/AggregatesGen";
import { AppliedFilters } from "../State/AggregatesState";
import ActiveFilters from "../Components/activeFilters";

interface AggregatesOwnProps {
    count: number;
    window: number;
    countLoader: boolean;
}

export function mapStateToProps(appState: StoreTree, ownProps: AggregatesOwnProps) {
    return {
        page: appState.app.pageType,
        appliedFilters: appState.aggregates.appliedFilters,
        sort: appState.aggregates.sort
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        deleteFilter: (filters: AppliedFilters[], path: string, sort: string, page: string, window: number, pageNumber: number) => dispatch(AggregatesActionGenerator.deleteFilter(filters, path, sort, page, window, pageNumber)),
        savedAppliedFilter: (savedFilterArray: string[]) => dispatch(AggregatesActionGenerator.saveAppliedFilters(savedFilterArray))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActiveFilters);
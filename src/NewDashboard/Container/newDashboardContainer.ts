import { connect } from "react-redux";
import AppActionGenerator from "../../App/Actions/actionGen";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
import NewDashboardActionGenerator from "../Actions/gen";
import NewDashboard from "../Component/newDashboard";
import { NewDashboardFilterStructure } from "../State/newDashboardState";

export function mapStateToProps(appState: StoreTree, ownProps: any){
    return {
        newDashboardLoader: appState.newDashboard.newDashboardLoader,
        newDashboardFileIds: appState.newDashboard.newDashboardFileIds,
        newDashboardData: appState.newDashboard.newDashboardData,
        newDashboardDataLoader: appState.newDashboard.newDashboardDataLoader,
        newDashboardInitialFileIds: appState.newDashboard.newDashboardInitialFileIds,
        newDashboardFilterConfig: appState.newDashboard.newDashboardFilterConfig,
        appliedFilter: appState.newDashboard.appliedFilter,
        tagsAggregate: appState.newDashboard.tagsAggregate,
        typeTagsAggregateValues: appState.newDashboard.typeTagsAggregateValues,
        typeTagsAggregateLoader: appState.newDashboard.typeTagsAggregateLoader,
        partyAggregate: appState.newDashboard.partyAggregate,
        partyAggregateValues: appState.newDashboard.partyAggregateValues,
        partyAggregateLoader: appState.newDashboard.partyAggregateLoader,
        newDashboardSortedBy: appState.newDashboard.newDashboardSortedBy,
        newDashboardSortOrder: appState.newDashboard.newDashboardSortOrder,
        termAggregate: appState.newDashboard.termAggregate,
        endDateAggregateValues: appState.newDashboard.endDateAggregateValues,
        endDateAggregateLoader: appState.newDashboard.endDateAggregateLoader,
        endDateMinValue: appState.newDashboard.endDateMinValue,
        endDateMaxValue: appState.newDashboard.endDateMaxValue,
        endDateLeftThumb: appState.newDashboard.endDateLeftThumb,
        endDateRightThumb: appState.newDashboard.endDateRightThumb
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any){
    return{
        pageWatcher: (page: string) => dispatch(AppActionGenerator.pageWatcher(page)),
        getNewDashboardData: (newDashboardFileIds: number[], sort: string, order: string) => dispatch(NewDashboardActionGenerator.getNewDashboardData(newDashboardFileIds, sort, order)),
        getNewDashboardFileId: () => dispatch(NewDashboardActionGenerator.getNewDashboardFileId()),
        getNewDashboardFilterConfig: () => dispatch(NewDashboardActionGenerator.getNewDashboardFilterConfig()),
        getNewDashboardFilterAggregate: ( value: string, level: number, page: string, sort: string, order: string, filter: NewDashboardFilterStructure[], segment: string, isFilterForwarded: boolean ) => dispatch(NewDashboardActionGenerator.getNewDashboardFilterAggregate(value, level, page, sort, order, filter, segment, isFilterForwarded)),
        applyNewDashboardFilter: ( sort: string, filter: NewDashboardFilterStructure[], newDashboardSortedBy: string, newDashboardSortOrder: string) => dispatch(NewDashboardActionGenerator.applyNewDashboardFilter(sort, filter, newDashboardSortedBy, newDashboardSortOrder)),
        saveNewDashboardSort: (newDashboardSortedBy: string, newDashboardSortOrder: string) => dispatch(NewDashboardActionGenerator.saveNewDashboardSort(newDashboardSortedBy, newDashboardSortOrder)),
        saveNewDashboardFilter: (appliedFilter: NewDashboardFilterStructure[]) => dispatch(NewDashboardActionGenerator.saveNewDashboardFilter(appliedFilter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDashboard);
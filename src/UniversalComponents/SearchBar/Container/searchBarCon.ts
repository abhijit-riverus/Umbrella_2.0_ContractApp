import { connect } from "react-redux";
import SearchBar from "../Component/searchBar";
import { History } from 'history';
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import SearchBarActionGenerator from "../Action/actionGen";

interface SearchBarOwnProps {
    history: History;
    match: any;
}

export function mapStateToProps(appState: StoreTree, ownProps: SearchBarOwnProps) {
    return {
        visibility: appState.searchBar.visibility,
        term: appState.searchBar.term,
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        textChange: (term: string) => dispatch(SearchBarActionGenerator.changeText(term)),
        toggleSearchBarVisibility: (visibility: boolean) => dispatch(SearchBarActionGenerator.toggleVisibility(visibility))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
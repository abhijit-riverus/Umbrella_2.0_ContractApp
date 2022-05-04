import { connect } from "react-redux";
import { StoreTree } from "../../Utils/MainReducer/mainReducer";
// import App from "../Component/App";
// import App from "../Component/KeycloackApp";
import App from "../Component/AppFunctional";
import SearchBarActionGenerator from "../../UniversalComponents/SearchBar/Action/actionGen";
export function mapStateToProps(appState: StoreTree, ownProps: any) {
	return {
		isLoggedIn: appState.heimdall.isLoggedIn,
		refreshPage: appState.heimdall.refreshPage,
		tokenClaims: appState.heimdall.claims,
		visibility: appState.searchBar.visibility,
		logoutLoader: appState.heimdall.logoutLoader,
		platform: appState.heimdall.platform
	};
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
	return {
		toggleSearchBarVisibility: (visibility: boolean) =>
			dispatch(SearchBarActionGenerator.toggleVisibility(visibility)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

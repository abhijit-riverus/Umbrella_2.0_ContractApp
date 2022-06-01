import React from "react";
import ReactDOM from "react-dom";
import "./Design/index";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { Provider } from "react-redux";
import { mainReducer } from "./Utils/MainReducer/mainReducer";
import App from "./App/Container/appCon";
import heimdallWatcher from "./UniversalComponents/HeimdallChild/Saga/heimdallSaga";
// import { logger } from './Utils/Logger/logger';
import uploadWatcher from "./Upload/Saga/uploadSaga";
import DocumentWatcher from "./DocumentView/Saga/documentSaga";
import searchPageWatcher from "./Search/Saga/SearchSaga";
import searchModuleWatcher from "./SearchModule/Saga/searchModuleSaga";
import historyWatcher from "./History/Saga/historySaga";
import analysisWatcher from "./Analysis/Saga/analysisSaga";
import dashboardWatcher from "./Dashboard/Saga/dashboardSaga";
import aggregateWatcher from "./Aggregates/Saga/AggregatesSaga";

import TaskManagementWatcher from "./UniversalComponents/Modals/TaskManagementModal/Saga/taskManagementSaga";

import documentLibraryWatcher from "./DocumentLibrary/Saga/documentLibrarySaga";
import reportsWatcher from "./Reports/Saga/reportsSaga";
import taskManagementPageWatcher from "./TaskManagement/Saga/taskManagementPageSaga";
import clauseLibraryWatcher from "./ClauseLibrary/Saga/clauseLibrarySaga";
import notificationWatcher from "./UniversalComponents/Notification/Saga/notificationSaga";
import newAnalysisWatcher from "./NewAnalysis/Saga/newAnalysisSaga";
import newDashboardWatcher from "./NewDashboard/Saga/newDashboardSaga";
// import logger from "redux-logger";

// import { getLocalStorage } from "./Authentication/Actions/authentication";
// const user_id = getLocalStorage("user_id");
// console.log("User_id", user_id);
// // if (user_id != null) {
// //   console.log("hello");
// // }
// console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

const sagaMiddleWare = createSagaMiddleware();
export const store = createStore(
  mainReducer,
  applyMiddleware(sagaMiddleWare)
);

sagaMiddleWare.run(heimdallWatcher);
sagaMiddleWare.run(uploadWatcher);
sagaMiddleWare.run(DocumentWatcher);
sagaMiddleWare.run(searchPageWatcher);
sagaMiddleWare.run(searchModuleWatcher);
sagaMiddleWare.run(historyWatcher);
sagaMiddleWare.run(analysisWatcher);
sagaMiddleWare.run(dashboardWatcher);
sagaMiddleWare.run(aggregateWatcher);

sagaMiddleWare.run(TaskManagementWatcher);

sagaMiddleWare.run(documentLibraryWatcher);
sagaMiddleWare.run(reportsWatcher);
sagaMiddleWare.run(taskManagementPageWatcher);
sagaMiddleWare.run(clauseLibraryWatcher);
// sagaMiddleWare.run(notificationWatcher);
sagaMiddleWare.run(newAnalysisWatcher);
sagaMiddleWare.run(newDashboardWatcher);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

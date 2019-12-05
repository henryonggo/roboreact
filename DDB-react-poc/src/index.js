import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import Modal from "react-modal";
import ElementQueries from "css-element-queries/src/ElementQueries";

import App from "./App";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import undoable, { combineFilters, excludeAction } from "redux-undo";
import * as actionTypes from "store/actions/actionTypes";

import miscReducer from "store/reducers/misc";
import themeReducer from "store/reducers/theme";
import tabReducer from "store/reducers/tab";
import widgetReducer from "store/reducers/widget";
import generalReducer from "store/reducers/general";

const appRoot = document.getElementById("app-root");

const UNDO_LIMIT = 10;

// Setup element queries plugin
ElementQueries.listen();

// Bind the modal to the app element
Modal.setAppElement("#app-root");

// Setup the root reducer
let rootReducer = combineReducers({
    misc: miscReducer,
    theme: themeReducer,
    tab: tabReducer,
    widget: widgetReducer,
    general: generalReducer,
});

// ------------------------
// --- Setup redux-undo ---
// ------------------------

// Filters
const excludedActions = excludeAction([
    actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS,
    actionTypes.tab.UPDATE_WIDGET_LAYOUT,
    actionTypes.tab.USE_TAB_ID,
    actionTypes.tab.USE_WIDGET_ID
]);
const undoableFilter = (action) => {
    const { $config } = action;
    // If no configuration is provided in the current action then pass the filter
    if (!$config) {
        return true;
    }

    // Return in the action is undoable
    return !!$config.$undoable;
};
// Prevents the initial state from being undo'd to
const initialStateFilter = (action) => {
    if (action.type === "@@INIT" || action.type.includes("@@redux/INIT")) {
        return false;
    }
    return true;
};

// Custom group function
const groupHandler = (action) => {
    const { $config } = action;

    // If no configuration or group is provided then do not provide a group
    if (!$config || !$config.$group) {
        return null;
    }

    // Return the group
    return $config.$group;
};

// Setup in redux-undo
rootReducer = undoable(rootReducer, {
    limit: UNDO_LIMIT,
    groupBy: groupHandler,
    filter: combineFilters(excludedActions, undoableFilter, initialStateFilter),
    ignoreInitialState: true, // Prevent user from undoing to initial state
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Enable redux devtools

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(<Provider store={store}><App/></Provider>, appRoot);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

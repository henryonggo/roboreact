import * as actionTypes from "store/actions/actionTypes";
import * as operations from "store/operations/tab";

const initialState = {
    tabs: {},
    tabOrder: [],
    currTabID: null,
};

const reducer = (state = initialState, action) => {
    const bSaveToServer = (action.$config) ? action.$config.$saveToServer : false;

    switch(action.type) {
        case actionTypes.tab.ADD_TAB:
            return operations.addTab(state, action.payload, action.tabID, bSaveToServer);
        case actionTypes.tab.REMOVE_TAB:
            return operations.removeTab(state, action.deleteIndex, bSaveToServer);
        case actionTypes.tab.EDIT_TAB:
            return operations.editTab(state, action.tabID, action.updatedTabData, bSaveToServer);
        case actionTypes.tab.CHANGE_OPEN_TAB:
            return operations.changeOpenTab(state, action.tabID, bSaveToServer);
        case actionTypes.tab.CHANGE_TAB_ORDER:
            return operations.changeTabOrder(state, action.indexFrom, action.indexTo, bSaveToServer);
        case actionTypes.tab.ADD_WIDGET:
            return operations.addWidget(state, action.presetID, action.presetType, action.widgetLayout, action.widgetID, action.tabID, bSaveToServer);
        case actionTypes.tab.REMOVE_WIDGET:
            return operations.removeWidget(state, action.widgetID, action.tabID, bSaveToServer);
        case actionTypes.tab.UPDATE_WIDGET_LAYOUT:
            return operations.updateWidgetLayout(state, action.tabID, action.breakpointID, action.layout, bSaveToServer);
        case actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS:
            return operations.updateAllWidgetLayouts(state, action.tabID, action.layouts, bSaveToServer);
        case actionTypes.tab.REMOVE_WIDGET_PRESET_REFERENCES:
            return operations.removeWidgetPresetReferences(state, action.widgetPresetID, action.widgetPresetType, bSaveToServer);
        default:
            return state;
    }
};

export default reducer;
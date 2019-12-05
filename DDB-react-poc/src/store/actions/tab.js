import * as actionTypes from "store/actions/actionTypes";
import { WIDGET_ID_PREFIX, TAB_ID_PREFIX } from "constants/app";
import Utilities from "utilities";
import { INIT_CONFIG } from "store/constants";

// ---------------------------
// --- Returning functions ---
// ---------------------------

// Note: this function is not an action function so its setup is entirely different
// Within mapDispatchToProps use this instead:
// generateTabID: () => actionCreators.generateTabID(dispatch)
// Now it can be called with this.props.generateTabID() and will return a new tab ID

export const generateTabID = () => {
    let sTabID = `${TAB_ID_PREFIX}${Utilities.generateUniqueID()}`;
    // Return out the generated tab ID
    return sTabID;
};

export const generateWidgetID = () => {
    let sWidgetID = `${WIDGET_ID_PREFIX}${Utilities.generateUniqueID()}`;
    return sWidgetID;
};

// Returns the ID of the newly created tab
export const addTab = (dispatch, i_oPayload, i_sTabID = null, i_oConfig = {}) => {
    // Make sure a valid tab ID is given/generated
    const sTabID = (i_sTabID) ? i_sTabID : generateTabID();

    dispatch(
        (dispatch, getState) => {
            // Add the new tab in
            dispatch({
                type: actionTypes.tab.ADD_TAB,
                payload: i_oPayload,
                tabID: sTabID,
                $config: { ...INIT_CONFIG, ...i_oConfig }
            });

            // If the tab being added is the first tab then we want to make sure
            // its open by default
            const bIsFirstTab = !getState().present.tab.currTabID;
            if (bIsFirstTab) {
                dispatch(changeOpenTab(sTabID, i_oConfig));
            }

            // Add the widgets in
            const { widgetOrder, widgets } = i_oPayload;
            widgetOrder.forEach(i_sWidgetID => {
                const oCurrWidgetData = widgets[i_sWidgetID];
                const { presetID, presetType, widgetLayout } = oCurrWidgetData;

                addWidget(dispatch, presetID, presetType, widgetLayout, i_sWidgetID, sTabID, i_oConfig);
            });
        }
    );

    return sTabID;
};

export const addWidget = (dispatch, i_sPresetID, i_sPresetType, i_oWidgetLayout = {}, i_sWidgetID = null, i_sTabID = null, i_oConfig = {}) => {
    // Generate widget ID
    let sWidgetID = "";

    dispatch(
        (dispatch, getState) => {
            const oState = getState().present;
            // Use currently open tab ID if no tab ID is specified
            const sTabID = (i_sTabID) ? i_sTabID : oState.tab.currTabID;
            // Get/generate the widget ID
            sWidgetID = (i_sWidgetID) ? i_sWidgetID : generateWidgetID();

            dispatch({
                type: actionTypes.tab.ADD_WIDGET,
                widgetID: sWidgetID,
                tabID: sTabID,
                presetType: i_sPresetType,
                widgetLayout: i_oWidgetLayout,
                presetID: i_sPresetID,
                $config: { ...INIT_CONFIG, ...i_oConfig }
            });
        }
    );

    return sWidgetID;
};



// --------------------
// --- Tabs actions ---
// --------------------

export const removeTab = (i_nDelIndex, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.REMOVE_TAB,
        deleteIndex: i_nDelIndex,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const editTab = (i_sTabID, i_oUpdatedTabData, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.EDIT_TAB,
        tabID: i_sTabID,
        updatedTabData: i_oUpdatedTabData,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const changeOpenTab = (i_sTabID, i_oConfig = INIT_CONFIG) => {
    return {
        type: actionTypes.tab.CHANGE_OPEN_TAB,
        tabID: i_sTabID,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const changeTabOrder = (i_nIdxFrom, i_nIdxTo, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.CHANGE_TAB_ORDER,
        indexFrom: i_nIdxFrom,
        indexTo: i_nIdxTo,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const removeWidget = (i_sWidgetID, i_sTabID = null, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.REMOVE_WIDGET,
        tabID: i_sTabID,
        widgetID: i_sWidgetID,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const updateWidgetLayout = (i_sTabID, i_sBreakpointID, i_aLayout, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.UPDATE_WIDGET_LAYOUT,
        tabID: i_sTabID,
        breakpointID: i_sBreakpointID,
        layout: i_aLayout,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const updateAllWidgetLayouts = (i_sTabID, i_aLayouts, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS,
        tabID: i_sTabID,
        layouts: i_aLayouts,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const removeWidgetPresetReferences = (i_sWidgetPresetID, i_sWidgetType, i_oConfig = {}) => {
    return {
        type: actionTypes.tab.REMOVE_WIDGET_PRESET_REFERENCES,
        widgetPresetID: i_sWidgetPresetID,
        widgetPresetType: i_sWidgetType,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};
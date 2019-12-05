import * as actionCreators from "store/actions";
import * as actionTypes from "store/actions/actionTypes";
import { ActionCreators as ReduxUndoActionsCreators } from "redux-undo";

export const mapDispatchToPropsHelper = (i_fnDispatch, i_oConfig) => {
    return Object.entries(i_oConfig).reduce((i_oAccumulator, [i_sKeyName, i_sActionType]) => {
        return {
            ...i_oAccumulator,
            [i_sKeyName]: _getDispatchFunction(i_fnDispatch, i_sActionType)
        };
    }, {});
};

const _getDispatchFunction = (dispatch, i_sActionType) => {
    switch(i_sActionType) {
        // Misc
        case actionTypes.misc.SET_BASELINE:
            return () => dispatch(actionCreators.misc.setBaseline());
        // Theme
        case actionTypes.theme.ADD_THEME:
            return (i_oThemeTemplate, i_oConfig = {}) => dispatch(actionCreators.theme.addTheme(i_oThemeTemplate, i_oConfig));
        case actionTypes.theme.UPDATE_THEME:
            return (i_sThemeID, i_oUpdatedProperties, i_oConfig = {}) => dispatch(actionCreators.theme.updateTheme(i_sThemeID, i_oUpdatedProperties, i_oConfig));
        case actionTypes.theme.REMOVE_THEME:
            return (i_sThemeID, i_oConfig = {}) => dispatch(actionCreators.theme.removeTheme(i_sThemeID, i_oConfig));
        case actionTypes.theme.CHANGE_THEME:
            return (i_sNamespaceID, i_sThemeID, i_oConfig = {}) => dispatch(actionCreators.theme.changeTheme(i_sNamespaceID, i_sThemeID, i_oConfig));
        case actionTypes.theme.ADD_NAMESPACE:
            return (i_sNamespaceID, i_sThemeID, i_oConfig = {}) => dispatch(actionCreators.theme.addNamespace(i_sNamespaceID, i_sThemeID, i_oConfig));
        case actionTypes.theme.REMOVE_NAMESPACE:
            return (i_sNamespaceID, i_oConfig = {}) => dispatch(actionCreators.theme.removeNamespace(i_sNamespaceID, i_oConfig));
        case actionTypes.theme.SET_DEFAULT_NAMESPACE:
            return (i_sNamespaceID, i_oConfig = {}) => dispatch(actionCreators.theme.setDefaultNamespace(i_sNamespaceID, i_oConfig));
        // Tab
        case actionTypes.tab.ADD_TAB:
            return (i_oPayload, i_sTabID = null, i_oConfig = {}) => actionCreators.tab.addTab(dispatch, i_oPayload, i_sTabID, i_oConfig);
        case actionTypes.tab.REMOVE_TAB:
            return (i_nDelIndex, i_oConfig = {}) => dispatch(actionCreators.tab.removeTab(i_nDelIndex, i_oConfig));
        case actionTypes.tab.EDIT_TAB:
            return (i_sTabID, i_oUpdatedTabData, i_oConfig = {}) => dispatch(actionCreators.tab.editTab(i_sTabID, i_oUpdatedTabData, i_oConfig));
        case actionTypes.tab.CHANGE_OPEN_TAB:
            return (i_sTabID, i_oConfig = {}) => dispatch(actionCreators.tab.changeOpenTab(i_sTabID, i_oConfig));
        case actionTypes.tab.CHANGE_TAB_ORDER:
            return (i_nIdxFrom, i_nIdxTo, i_oConfig = {}) => dispatch(actionCreators.tab.changeTabOrder(i_nIdxFrom, i_nIdxTo, i_oConfig));
        case actionTypes.tab.ADD_WIDGET:
            return (i_sPresetID, i_sPresetType, i_oWidgetLayout = {}, i_sWidgetID = null, i_sTabID = null, i_oConfig = {}) => actionCreators.tab.addWidget(dispatch, i_sPresetID, i_sPresetType, i_oWidgetLayout, i_sWidgetID, i_sTabID, i_oConfig);
        case actionTypes.tab.REMOVE_WIDGET:
            return (i_sWidgetID, i_sTabID = null, i_oConfig = {}) => dispatch(actionCreators.tab.removeWidget(i_sWidgetID, i_sTabID, i_oConfig));
        case actionTypes.tab.UPDATE_WIDGET_LAYOUT:
            return (i_sTabID, i_sBreakpointID, i_aLayout, i_oConfig = {}) => dispatch(actionCreators.tab.updateWidgetLayout(i_sTabID, i_sBreakpointID, i_aLayout, i_oConfig));
        case actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS:
            return (i_sTabID, i_aLayouts, i_oConfig = {}) => dispatch(actionCreators.tab.updateAllWidgetLayouts(i_sTabID, i_aLayouts, i_oConfig));
        case actionTypes.tab.GENERATE_TAB_ID:
            return () => actionCreators.tab.generateTabID();
        case actionTypes.tab.GENERATE_WIDGET_ID:
            return () => actionCreators.tab.generateWidgetID();
        case actionTypes.tab.REMOVE_WIDGET_PRESET_REFERENCES:
            return (i_sWidgetPresetID, i_sWidgetPresetType, i_oConfig = {}) => actionCreators.tab.removeWidgetPresetReferences(i_sWidgetPresetID, i_sWidgetPresetType, i_oConfig);
        // Widget
        case actionTypes.widget.ADD_WIDGET_PRESET:
            return (i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, i_sPresetID = null, i_oConfig = {}) => actionCreators.widget.addWidgetPreset(dispatch, i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, i_sPresetID, i_oConfig);
        case actionTypes.widget.EDIT_WIDGET_PRESET:
            return (i_sPresetID, i_sPresetType, i_oUpdatedPresetData, i_oConfig = {}) => dispatch(actionCreators.widget.editWidgetPreset(i_sPresetID, i_sPresetType, i_oUpdatedPresetData, i_oConfig));
        case actionTypes.widget.REMOVE_WIDGET_PRESET:
            return (i_sPresetID, i_sPresetType, i_oConfig = {}) => actionCreators.widget.removeWidgetPreset(dispatch, i_sPresetID, i_sPresetType, i_oConfig);
        case actionTypes.widget.GENERATE_WIDGET_PRESET_ID:
            return () => actionCreators.widget.generateWidgetPresetID();
        // General
        case actionTypes.general.SET_SYSTEM_INFO:
            return (i_oSystemInfo, i_oConfig = {}) => dispatch(actionCreators.general.setSystemInfo(i_oSystemInfo, i_oConfig));
        case actionTypes.general.SET_HEADER:
            return (i_oHeaderConfig, i_oHeaderWidgetCustomConfig = null, i_oConfig = {}) => actionCreators.general.setHeader(dispatch, i_oHeaderConfig, i_oHeaderWidgetCustomConfig, i_oConfig);
        case actionTypes.general.SET_FOOTER:
            return (i_oFooterConfig, i_oFooterWidgetCustomConfig = null, i_oConfig = {}) => actionCreators.general.setFooter(dispatch, i_oFooterConfig, i_oFooterWidgetCustomConfig, i_oConfig);
        // Redux-undo
        case actionTypes.reduxUndo.UNDO:
            return () => dispatch(ReduxUndoActionsCreators.undo());
        case actionTypes.reduxUndo.REDO:
            return () => dispatch(ReduxUndoActionsCreators.redo());
        case actionTypes.reduxUndo.JUMP:
            return (i_nSteps) => dispatch(ReduxUndoActionsCreators.jump(i_nSteps));
        case actionTypes.reduxUndo.JUMP_TO_PAST:
            return (i_nIndex) => dispatch(ReduxUndoActionsCreators.jumpToPast(i_nIndex));
        case actionTypes.reduxUndo.JUMP_TO_FUTURE:
            return (i_nIndex) => dispatch(ReduxUndoActionsCreators.jumpToFuture(i_nIndex));
        case actionTypes.reduxUndo.CLEAR_HISTORY:
            return () => dispatch(ReduxUndoActionsCreators.clearHistory());
        default:
            throw new Error(`Error: action type '${i_sActionType}' is not found`);
    }
};

export default mapDispatchToPropsHelper;
import * as actionTypes from "store/actions/actionTypes";
import * as operations from "store/operations/widget";
import { widgetBaseTypes } from "constants/widgets";

const _generateInitialPresetState = () => {
    return Object.values(widgetBaseTypes).reduce((acc, baseType) => {
        return {
            ...acc,
            [baseType]: {}
        };
    }, {});
};

const initialState = {
    presets: _generateInitialPresetState()
};

const reducer = (state = initialState, action) => {
    const bSaveToServer = (action.$config) ? action.$config.$saveToServer : false;

    switch(action.type) {
        case actionTypes.widget.ADD_WIDGET_PRESET:
            return operations.addWidgetPreset(state, action.presetName, action.presetType, action.metaData, action.customData, action.presetID, bSaveToServer);
        case actionTypes.widget.EDIT_WIDGET_PRESET:
            return operations.editWidgetPreset(state, action.presetID, action.presetType, action.updatedPresetData, bSaveToServer);
        case actionTypes.widget.REMOVE_WIDGET_PRESET:
            return operations.removeWidgetPreset(state, action.presetID, action.presetType, bSaveToServer);
        default:
            return state;
    }
};

export default reducer;
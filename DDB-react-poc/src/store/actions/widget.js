import * as actionTypes from "store/actions/actionTypes";
import * as tabActions from "store/actions/tab";
import { INIT_CONFIG } from "store/constants";
import Utilities from "utilities";
import * as helpers from "store/helpers/widget";
import { widgetManager } from "managers";

import { WIDGET_PRESET_ID_PREFIX } from "constants/app";

// -----------------------
// --- Check functions ---
// -----------------------
const _presetTypeExists = (i_oState, i_sType) => {
    if (!i_oState.presets[i_sType]) {
        throw new Error(`Error: preset type '${i_sType}' does not exist`);
    }
};

const _widgetPresetDoesNotExist = (i_oState, i_sWidgetID, i_sType) => {
    if (i_oState.presets[i_sType][i_sWidgetID]) {
        throw new Error(`Error: preset '${i_sWidgetID}' already exists.`);
    }
};

const _widgetPresetExists = (i_oState, i_sWidgetID, i_sType) => {
    if (!i_oState.presets[i_sType][i_sWidgetID]) {
        throw new Error(`Error: preset '${i_sWidgetID}' does not exist.`);
    }
};

// ----------------------
// --- Widget actions ---
// ----------------------

export const generateWidgetPresetID = () => {
    let sWidgetID = `${WIDGET_PRESET_ID_PREFIX}${Utilities.generateUniqueID()}`;
    return sWidgetID;
};

export const addWidgetPreset = (dispatch, i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, i_sPresetID = null, i_oConfig = {}) => {
    // Generate widget preset ID
    const widgetPresetID = (i_sPresetID) ? i_sPresetID : generateWidgetPresetID();

    dispatch(
        async (dispatch, getState) => {
            const oConfig = { ...INIT_CONFIG, ...i_oConfig };
            let oWidgetPresetData = helpers.constructWidgetPresetData(i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, widgetPresetID);

            const oState = getState().present.widget;
            _presetTypeExists(oState, oWidgetPresetData.type);
            _widgetPresetDoesNotExist(oState, oWidgetPresetData.name, oWidgetPresetData.type);

            if (oConfig.$runLifecycle) {
                const runWidgetPresetCreateLifecycle = (i_oWidgetPresetData) => {

                    const { type } = i_oWidgetPresetData;
                    const fnOnCreate = widgetManager.getWidgetBaseLifecycleOnCreate(type);
            
                    return fnOnCreate(i_oWidgetPresetData);
                };
    
                // Run the create lifecycle on the widget preset
                oWidgetPresetData = await runWidgetPresetCreateLifecycle(oWidgetPresetData);
            }

            dispatch({
                type: actionTypes.widget.ADD_WIDGET_PRESET,
                presetName: oWidgetPresetData.name,
                presetType: oWidgetPresetData.type,
                metaData: oWidgetPresetData.metaData,
                customData: oWidgetPresetData.customData,
                presetID: oWidgetPresetData.id,
                $config: oConfig
            });
        }
    );

    return widgetPresetID;
};

export const editWidgetPreset = (i_sPresetID, i_sPresetType, i_oUpdatedPresetData, i_oConfig = {}) => {
    return async (dispatch, getState) => {
        const oConfig = { ...INIT_CONFIG, ...i_oConfig };
        const { name, customData, metaData } = i_oUpdatedPresetData;
        let oWidgetPresetData = helpers.constructWidgetPresetData(name, i_sPresetType, metaData, customData, i_sPresetID);

        const oState = getState().present.widget;
        _presetTypeExists(oState, oWidgetPresetData.type);
        _widgetPresetExists(oState, oWidgetPresetData.id, oWidgetPresetData.type);

        const oPrevWidgetPresetData = oState.presets[i_sPresetType][i_sPresetID];

        if (oConfig.$runLifecycle) {
            const runWidgetPresetUpdateLifecycle = (i_oWidgetPresetData, i_oPrevWidgetPresetData) => {
                const { type } = i_oWidgetPresetData;
                const fnOnUpdate = widgetManager.getWidgetBaseLifecycleOnUpdate(type);
        
                return fnOnUpdate(i_oWidgetPresetData, i_oPrevWidgetPresetData);
            };
    
            // Run the update lifecycle on the widget preset
            oWidgetPresetData = await runWidgetPresetUpdateLifecycle(oWidgetPresetData, oPrevWidgetPresetData);
        }

        // Remove the preset ID and type from the updated object so the edit widget preset reducer does not complain
        delete oWidgetPresetData["id"];
        delete oWidgetPresetData["type"];

        dispatch({
            type: actionTypes.widget.EDIT_WIDGET_PRESET,
            presetID: i_sPresetID,
            presetType: i_sPresetType,
            updatedPresetData: oWidgetPresetData,
            $config: oConfig
        });
    }
};

export const removeWidgetPreset = (dispatch, i_sPresetID, i_sPresetType, i_oConfig = {}) => {
    dispatch(
        async (dispatch, getState) => {
            const oConfig = { ...INIT_CONFIG, ...i_oConfig };
            const oState = getState().present.widget;
            const oWidgetPresetData = oState.presets[i_sPresetType][i_sPresetID];

            _presetTypeExists(oState, oWidgetPresetData.type);
            _widgetPresetExists(oState, oWidgetPresetData.id, oWidgetPresetData.type);

            if (oConfig.$runLifecycle) {
                const runWidgetPresetOnRemoveLifecycle = (i_oWidgetPresetData) => {
                    const { type } = i_oWidgetPresetData;
                    const fnOnRemove = widgetManager.getWidgetBaseLifecycleOnRemove(type);
            
                    return fnOnRemove(i_oWidgetPresetData); 
                };

                // Run onRemove lifecycle
                await runWidgetPresetOnRemoveLifecycle(oWidgetPresetData);
            }

            // Remove all references to the widget preset in the tabs
            dispatch(tabActions.removeWidgetPresetReferences(i_sPresetID, i_sPresetType, i_oConfig));

            // Remove widget preset
            dispatch({
                type: actionTypes.widget.REMOVE_WIDGET_PRESET,
                presetID: i_sPresetID,
                presetType: i_sPresetType,
                $config: oConfig
            });
        }
    );
};

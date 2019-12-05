import { metaDataTemplate } from "constants/widgets";
import update from "immutability-helper";
import { dataManager } from "managers";

// -----------------
// --- Operators ---
// -----------------

export const addWidgetPreset = (i_oState, i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, i_sWidgetPresetID, i_bSaveData = false) => {
    const oMergedMetaData = { ...metaDataTemplate, ...i_oMetaData };

    const oWidgetPresetData = {
        id: i_sWidgetPresetID,
        name: i_sPresetName,
        type: i_sPresetType,
        metaData: oMergedMetaData,
        customData: i_oCustomData,
    };

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.addWidgetPreset(oWidgetPresetData, true);
    }

    return update(i_oState, {
        presets: {
            [i_sPresetType]: { [i_sWidgetPresetID]: { $set: oWidgetPresetData } }
        }
    }); 
};

export const editWidgetPreset = (i_oState, i_sPresetID, i_sPresetType, i_oUpdatedPresetData, i_bSaveData = false) => {
    // Stop the user from updating the preset ID
    if (i_oUpdatedPresetData["id"]) {
        throw new Error("Error: updating preset ID is not allowed");
    }

    // Stop the user from updating the preset type
    if (i_oUpdatedPresetData["type"]) {
        throw new Error("Error: updating preset type is not allowed");
    }

    const oUpdatedWidgetPresetData = update(i_oState.presets[i_sPresetType][i_sPresetID], {
        $merge: i_oUpdatedPresetData
    });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveWidgetPreset(oUpdatedWidgetPresetData, true);
    }

    return update(i_oState, {
        presets: {
            [i_sPresetType]: {
                [i_sPresetID]: { $set: oUpdatedWidgetPresetData }
            }
        }
    });
};

export const removeWidgetPreset = (i_oState, i_sPresetID, i_sPresetType, i_bSaveData = false) => {
    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.removeWidgetPreset(i_sPresetID, true);
    }

    return update(i_oState, {
        presets: {
            [i_sPresetType]: { $unset: [i_sPresetID] }
        }
    });
};
import { requestManager } from "managers";
import * as BaseHelpers from "components/widgets/bases/baseHelpers";
import * as LANG_CONST from "constants/language";

export const onCreate = async (i_oWidgetPresetData) => {
    let oUpdatedWidgetPresetData = BaseHelpers.setFilePath(i_oWidgetPresetData);

    if (!requestManager.inCWEnv()) {
        console.warn(LANG_CONST.WIDGET_LIFECYCLE_ON_CREATE_NOT_SUPPORTED_WARNING);
        return oUpdatedWidgetPresetData;
    }

    oUpdatedWidgetPresetData = await BaseHelpers.handleFileSaveUpdates(i_oWidgetPresetData);
    return oUpdatedWidgetPresetData;
};

export const onUpdate = async (i_oCurrWidgetPresetData, i_oPrevWidgetPresetData) => {
    let oUpdatedCurrWidgetPresetData = BaseHelpers.setFilePath(i_oCurrWidgetPresetData);

    if (!requestManager.inCWEnv()) {
        console.warn(LANG_CONST.WIDGET_LIFECYCLE_ON_UPDATE_NOT_SUPPORTED_WARNING);
        return oUpdatedCurrWidgetPresetData;
    }

    oUpdatedCurrWidgetPresetData = await BaseHelpers.handleFileSaveUpdates(i_oCurrWidgetPresetData, i_oPrevWidgetPresetData);
    return oUpdatedCurrWidgetPresetData;
};

export const onRemove = async (i_oWidgetPresetData) => {
    if (!requestManager.inCWEnv()) {
        console.warn(LANG_CONST.WIDGET_LIFECYCLE_ON_REMOVE_NOT_SUPPORTED_WARNING);
        return i_oWidgetPresetData;
    }

    // Cleanup the uploaded file linked to this marginal container
    await BaseHelpers.handleFileRemoveUpdates(i_oWidgetPresetData); 

    return i_oWidgetPresetData;
};

export default {
    onCreate,
    onUpdate,
    onRemove
};
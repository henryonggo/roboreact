import { metaDataTemplate } from "constants/widgets";

export const constructWidgetPresetData = (i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, i_sWidgetPresetID) => {
    const oMergedMetaData = { ...metaDataTemplate, ...i_oMetaData };

    const oWidgetPresetData = {
        id: i_sWidgetPresetID,
        name: i_sPresetName,
        type: i_sPresetType,
        metaData: oMergedMetaData,
        customData: i_oCustomData,
    };

    return oWidgetPresetData;
}
import Utilities from "utilities";
import { getIn, setIn } from "formik";
import { requestManager, notificationManager } from "managers";
import * as LANG_CONST from "constants/language";

export const _getFileLocationNames = (i_oCustomData) => {
    const bRawFileLocationExists = (i_oCustomData.__mappings__ && i_oCustomData.__mappings__.rawFileLocation);
    const bFileLocationExists = (i_oCustomData.__mappings__ && i_oCustomData.__mappings__.fileLocation);

    const sRawFileLocationName = (bRawFileLocationExists) ? i_oCustomData.__mappings__.rawFileLocation : "rawFileLocation";
    const sFileLocationName = (bFileLocationExists) ? i_oCustomData.__mappings__.fileLocation : "fileLocation";

    return {
        rawFileLocationName: sRawFileLocationName,
        fileLocationName: sFileLocationName
    };
};

export const setFilePath = (i_oWidgetPresetData) => {
    const { customData } = i_oWidgetPresetData;
    const { rawFileLocationName, fileLocationName } = _getFileLocationNames(customData);
    const rawFileLocation = getIn(customData, rawFileLocationName);

    const oUpdatedWidgetPresetData = setIn(i_oWidgetPresetData, `customData.${fileLocationName}`, rawFileLocation);

    return oUpdatedWidgetPresetData;
};

export const handleFileSaveUpdates = async (i_oWidgetPresetData, i_oPrevWidgetPresetData = null) => {
    const { customData } = i_oWidgetPresetData;
    const { rawFileLocationName, fileLocationName } = _getFileLocationNames(customData);
    const rawFileLocation = getIn(customData, rawFileLocationName);

    let oUpdatedWidgetPresetData = i_oWidgetPresetData;
    let sFileLocation = rawFileLocation;

    // Only upload if the file 
    if (Utilities.isAbsPath(rawFileLocation)) {
        let bUploadFile = true;

        // Handle the case where there is a previously uploaded file
        if (i_oPrevWidgetPresetData) {
            const { customData: prevCustomData } = i_oPrevWidgetPresetData;
            const { fileLocationName: prevFileLocationName, rawFileLocationName: prevRawFileLocationName } = _getFileLocationNames(prevCustomData);
            const prevRawFileLocation = getIn(prevCustomData, prevRawFileLocationName);
            const prevFileLocation = getIn(prevCustomData, prevFileLocationName);

            if (prevFileLocation) {
                bUploadFile = (prevRawFileLocation !== rawFileLocation);
                const bRemovePrevFile = Utilities.isAbsPath(prevFileLocation);

                if (bUploadFile && bRemovePrevFile) {
                    // Delete the already uploaded file
                    await requestManager.deleteFile(prevFileLocation);
                }
            }
        }

        if (bUploadFile) {
            const oUpload = await requestManager.uploadFile(rawFileLocation);

            if (oUpload.data.success) {
                const sUploadedFilePath = oUpload.data.message;
                sFileLocation = sUploadedFilePath;

            } else {
                notificationManager.showError(LANG_CONST.UPLOAD_FAILED_ERR);
            }
        }
    }

    oUpdatedWidgetPresetData = setIn(i_oWidgetPresetData, `customData.${fileLocationName}`, sFileLocation);

    return oUpdatedWidgetPresetData;
};

export const handleFileRemoveUpdates = async (i_oWidgetPresetData) => {
    const { customData } = i_oWidgetPresetData;
    const { fileLocation } = customData;

    if (Utilities.isAbsPath(fileLocation)) {
        // Delete the uploaded file
        await requestManager.deleteFile(fileLocation);
    }
};
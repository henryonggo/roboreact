import * as helpers from "store/helpers/general";
import update from "immutability-helper";

export const setSystemInfo = (i_oState, i_oSystemInfo) => {
    const { programPath : sProgramPath, layoutPath : sLayoutPath, 
        currentUserId: sCurrentUserID, isMaster: bIsMaster, templateName: sTemplateName } = i_oSystemInfo;
    
    return update(i_oState, {
        systemInfo: {
            programPath: { $set: sProgramPath },
            layoutPath: { $set: sLayoutPath },
            currentUserID: { $set: sCurrentUserID },
            isMaster: { $set: bIsMaster },
            templateName: { $set: sTemplateName }
        }
    });
};

export const setHeader = (i_oState, i_oHeaderConfig, i_bSaveData = false) => {
    return helpers.setMarginal(i_oState, "header", i_oHeaderConfig, i_bSaveData, "saveHeader");
};

export const setFooter = (i_oState, i_oFooterConfig, i_bSaveData = false) => {
    return helpers.setMarginal(i_oState, "footer", i_oFooterConfig, i_bSaveData, "saveFooter");
};
import * as actionTypes from "store/actions/actionTypes";
import * as widgetActions from "store/actions/widget";
import { INIT_CONFIG } from "store/constants";

export const setSystemInfo = (i_oSystemInfo, i_oConfig = {}) => {
    return {
        type: actionTypes.general.SET_SYSTEM_INFO,
        systemInfo: i_oSystemInfo,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

const _generateNewMarginalWidget = (dispatch, i_sMarginalName, i_oCurrConfig, i_oNewConfig, i_oNewWidgetCustomConfig, i_oConfig) => {
    const oMetaData = {
        "description": `The system widget for the ${i_sMarginalName}`,
        "tags": "",
        "hidden": false,
        "system": true
    };

    // Create the new marginal widget preset
    const sID = widgetActions.addWidgetPreset(dispatch, `${i_sMarginalName}Widget`, i_oNewConfig.presetType, oMetaData, i_oNewWidgetCustomConfig);

    // Remove the old linked marginal widget preset
    widgetActions.removeWidgetPreset(dispatch, i_oCurrConfig.presetID, i_oCurrConfig.presetType, { ...INIT_CONFIG, ...i_oConfig });

    return sID;
};

export const setHeader = (dispatch, i_oHeaderConfig, i_oHeaderWidgetCustomConfig = null, i_oConfig = {}) => {
    let sID;
    dispatch(
        (dispatch, getState) => {
            const oCurrHeaderConfig = getState().present.general.header;
    
            const oUpdatedHeaderConfig = { ...i_oHeaderConfig };
            if (i_oHeaderWidgetCustomConfig) {
                sID = _generateNewMarginalWidget(dispatch, "header", oCurrHeaderConfig, i_oHeaderConfig, i_oHeaderWidgetCustomConfig, i_oConfig);
                oUpdatedHeaderConfig.presetID = sID;
            }
    
            dispatch({
                type: actionTypes.general.SET_HEADER,
                headerConfig: oUpdatedHeaderConfig,
                $config: { ...INIT_CONFIG, ...i_oConfig }
            });
        }
    );
    return sID;
};


export const setFooter = (dispatch, i_oFooterConfig, i_oFooterWidgetCustomConfig = null, i_oConfig = {}) => {
    let sID;
    dispatch(
        (dispatch, getState) => {
            const oCurrFooterConfig = getState().present.general.footer;
    
            const oUpdatedFooterConfig = { ...i_oFooterConfig };
            // If we need to make a new footer widget
            if (i_oFooterWidgetCustomConfig) {
                sID = _generateNewMarginalWidget(dispatch, "footer", oCurrFooterConfig, i_oFooterConfig, i_oFooterWidgetCustomConfig, i_oConfig);
                oUpdatedFooterConfig.presetID = sID;
            }
    
            dispatch({
                type: actionTypes.general.SET_FOOTER,
                footerConfig: oUpdatedFooterConfig,
                $config: { ...INIT_CONFIG, ...i_oConfig }
            });
        }
    );
    return sID;
};
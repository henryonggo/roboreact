import { loadingScreenManager } from "managers/LoadingScreenManager";
import { requestManager } from "managers/RequestManager";
import { queueManager } from "managers/QueueManager";
import update from "immutability-helper";
import * as LANG_CONST from "constants/language";

const THEME_GROUP = "DATAMANAGER_THEME_GROUP";
const WIDGET_PRESET_GROUP = "DATAMANAGER_WIDGET_PRESET_GROUP";
const TAB_GROUP = "DATAMANAGER_TAB_GROUP";
const GENERAL_GROUP = "DATAMANAGER_GENERAL_GROUP";

export class DataManager {
    async _wrapLoadingScreen(i_fnRequest, i_bShowLoading = false) {
        if (i_bShowLoading) {
            loadingScreenManager.showLoadingScreen();
        }

        try {
            const oResp = await i_fnRequest();

            if (i_bShowLoading) {
                loadingScreenManager.hideLoadingScreen();
            }

            return oResp;

        } catch(err) {
            if (i_bShowLoading) {
                loadingScreenManager.hideLoadingScreen();
            }

            throw err;
        }
    }


    async initializeAllData(i_oFuncs, i_bShowLoading = true) {
        const fnLoadAllRequest = async () => {
            await this.initializeThemeData(i_oFuncs.addTheme, i_oFuncs.addNamespace, i_oFuncs.setDefaultNamespace);
            await this.initializeWidgetPresetData(i_oFuncs.addWidgetPreset);
            await this.initializeTabData(i_oFuncs.addTab, i_oFuncs.changeOpenTab);
            await this.initializeGeneralData(i_oFuncs.setSystemInfo, i_oFuncs.setHeader, i_oFuncs.setFooter);
        };

        await this._wrapLoadingScreen(fnLoadAllRequest, i_bShowLoading);
    }

    async initializeThemeData(i_fnThemeAdd, i_fnNamespaceAdd, i_fnSetDefaultNamespace, i_bShowLoading = false) {
        const fnLoadAllThemeDataRequest = async () => {
            loadingScreenManager.setLoadingScreenStatus(LANG_CONST.DATA_MANAGER_LOADING_THEME_DATA_MSG);
            const oThemeData = (await requestManager.loadAllThemeData()).data.message;
            return oThemeData;
        };

        const oAllThemeData = await this._wrapLoadingScreen(fnLoadAllThemeDataRequest, i_bShowLoading);
        const { themes: oThemePresets, namespaces: oNamespaces, defaultNamespace: sDefaultNamespace } = oAllThemeData;

        // Add all the themes
        Object.values(oThemePresets).forEach(i_oThemeTemplate => {
            i_fnThemeAdd(i_oThemeTemplate, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        });

        // Add all the namespaces
        Object.entries(oNamespaces).forEach(([i_sNamespaceID, i_sTargetThemeID]) => {
            i_fnNamespaceAdd(i_sNamespaceID, i_sTargetThemeID, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        });

        // Set the default namespace, if applicable
        if (sDefaultNamespace) {
            i_fnSetDefaultNamespace(sDefaultNamespace, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        }
    }

    async initializeWidgetPresetData(i_fnWidgetPresetAdd, i_bShowLoading = false) {
        const fnLoadAllWidgetPresetDataRequest = async () => {
            loadingScreenManager.setLoadingScreenStatus(LANG_CONST.DATA_MANAGER_LOADING_WIDGET_PRESET_DATA_MSG);
            const oWidgetPresetData = (await requestManager.loadAllWidgetPresetData()).data.message;
            return oWidgetPresetData;
        };

        const oWidgetPresets = await this._wrapLoadingScreen(fnLoadAllWidgetPresetDataRequest, i_bShowLoading);

        // Add all the widget presets
        Object.values(oWidgetPresets).forEach(i_oWidgetPreset => {
            const { name, id, type, metaData, customData } = i_oWidgetPreset;
            i_fnWidgetPresetAdd(name, type, metaData, customData, id, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        });
    }

    async initializeTabData(i_fnTabAdd, i_fnChangeOpenTab, i_bShowLoading = false) {
        const fnLoadAllTabsDataRequest = async () => {
            loadingScreenManager.setLoadingScreenStatus(LANG_CONST.DATA_MANAGER_LOADING_TAB_DATA_MSG);
            const oTabData = (await requestManager.loadAllTabData()).data.message;
            return oTabData;
        };

        const oAllTabData = await this._wrapLoadingScreen(fnLoadAllTabsDataRequest, i_bShowLoading);
        const { tabs: oTabs, tabOrder: aTabOrder, currTabID: sCurrTabID } = oAllTabData;

        aTabOrder.forEach(i_sTabSelector => {
            const oTabData = oTabs[i_sTabSelector];

            const sID = (oTabData.id) ? oTabData.id : null;

            // Add the tab
            i_fnTabAdd(oTabData, sID, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        });

        // Set the open tab
        i_fnChangeOpenTab(sCurrTabID);
    }

    async initializeGeneralData(i_fnSetSystemInfo, i_fnSetHeader, i_fnSetFooter, i_bShowLoading = false) {
        const fnLoadGeneralDataRequest = async () => {
            loadingScreenManager.setLoadingScreenStatus(LANG_CONST.DATA_MANAGER_LOADING_GENERAL_DATA_MSG);
            const oGeneralData = (await requestManager.loadGeneralData()).data.message;
            return oGeneralData;
        };

        const fnLoadSystemInfo = async () => {
            loadingScreenManager.setLoadingScreenStatus(LANG_CONST.DATA_MANAGER_LOADING_SYSTEM_INFO_MSG);
            const oSystemInfo = (await requestManager.getSystemInfo()).data.message;
            return oSystemInfo;
        };

        const oGeneralData = await this._wrapLoadingScreen(fnLoadGeneralDataRequest, i_bShowLoading);

        // Add header and footer
        i_fnSetHeader(oGeneralData["header"], null, { $saveToServer: false, $runLifecycle: false });
        i_fnSetFooter(oGeneralData["footer"], null, { $saveToServer: false, $runLifecycle: false });

        const oSystemInfo = await this._wrapLoadingScreen(fnLoadSystemInfo, i_bShowLoading);
        i_fnSetSystemInfo(oSystemInfo);
    }

    _runOperation(i_fnOperation, i_sGroup, i_bBackground = true) {
        if (!requestManager.inCWEnv()) {
            console.warn(LANG_CONST.DATA_MANAGER_OPERATION_UNSUPPORTED_WARNING);
            return;
        }

        if (i_bBackground) {
            return queueManager.add(i_fnOperation, i_sGroup);
        }

        return new Promise(async (resolve, reject) => {
            try {
                await i_fnOperation();
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    saveTheme(i_oThemeData, i_bBackground = true) {
        return this._runOperation(() => requestManager.saveTheme(i_oThemeData), THEME_GROUP, i_bBackground);
    }

    saveNamespace(i_oNamespaceData, i_bBackground = true) {
        return this._runOperation(() => requestManager.saveNamespace(i_oNamespaceData), TAB_GROUP, i_bBackground);
    }

    saveWidgetPreset(i_oWidgetPresetData, i_bBackground = true) {
        return this._runOperation(() => requestManager.saveWidgetPreset(i_oWidgetPresetData), WIDGET_PRESET_GROUP, i_bBackground);
    }

    saveTab(i_oTabData, i_bBackground = true) {
        // Convert the tab's widgetLayout object into widget-centralized layouts

        // Splits the layout object for each widget (like how the tab data widgets are stored)
        const _splitWidgetLayouts = (i_oLayouts) => {
            const oSplitLayouts = {};

            Object.entries(i_oLayouts).forEach(([i_sBreakpointID, i_aBreakpoints]) => {
                i_aBreakpoints.forEach((i_oBreakpoint) => {
                    const sWidgetID = i_oBreakpoint.i;

                    if (!oSplitLayouts[sWidgetID]) {
                        oSplitLayouts[sWidgetID] = {};
                    }

                    if (!oSplitLayouts[sWidgetID][i_sBreakpointID]) {
                        oSplitLayouts[sWidgetID][i_sBreakpointID] = [];
                    }

                    oSplitLayouts[sWidgetID][i_sBreakpointID].push({ ...i_oBreakpoint });
                });
            });

            return oSplitLayouts;
        };

        const oSplitWidgets = _splitWidgetLayouts(i_oTabData.widgetLayouts);

        let oUpdatedTabData = update(i_oTabData, {
            $unset: ["widgetLayouts"]
        });

        // Update the widgets with the updated widget layouts
        Object.entries(oSplitWidgets).forEach(([i_sWidgetID, i_oCurrWidgetLayout]) => {
            if (oUpdatedTabData.widgets[i_sWidgetID]) {
                oUpdatedTabData = update(oUpdatedTabData, {
                    widgets: { [i_sWidgetID]: { widgetLayout: { $set: i_oCurrWidgetLayout } } }
                });
            }
        });

        return this._runOperation(() => requestManager.saveTab(oUpdatedTabData), TAB_GROUP, i_bBackground);
    }

    addTheme(i_oThemeData, i_bBackground = true) {
        return this._runOperation(() => requestManager.addTheme(i_oThemeData), THEME_GROUP, i_bBackground);
    }

    addNamespace(i_oNamespaceData, i_bBackground = true) {
        return this._runOperation(() => requestManager.addNamespace(i_oNamespaceData), TAB_GROUP, i_bBackground);
    }

    addWidgetPreset(i_oWidgetPresetData, i_bBackground = true) {
        return this._runOperation(() => requestManager.addWidgetPreset(i_oWidgetPresetData), WIDGET_PRESET_GROUP, i_bBackground);
    }

    addTab(i_oTabData, i_bBackground = true) {
        return this._runOperation(() => requestManager.addTab(i_oTabData), TAB_GROUP, i_bBackground);
    }

    removeTheme(i_sThemeID, i_bBackground = true) {
        return this._runOperation(() => requestManager.removeTheme(i_sThemeID), THEME_GROUP, i_bBackground);
    }

    removeNamespace(i_sNamespaceID, i_bBackground = true) {
        return this._runOperation(() => requestManager.removeNamespace(i_sNamespaceID), TAB_GROUP, i_bBackground);
    }

    removeWidgetPreset(i_sWidgetPresetID, i_bBackground = true) {
        return this._runOperation(() => requestManager.removeWidgetPreset(i_sWidgetPresetID), WIDGET_PRESET_GROUP, i_bBackground);
    }

    removeTab(i_sTabID, i_bBackground = true) {
        return this._runOperation(() => requestManager.removeTab(i_sTabID), TAB_GROUP, i_bBackground);
    }

    setTabOrder(i_aTabOrder, i_bBackground = true) {
        return this._runOperation(() => requestManager.setTabOrder(i_aTabOrder), TAB_GROUP, i_bBackground);
    }

    setCurrentTab(i_sCurrTabID, i_bBackground = true) {
        return this._runOperation(() => requestManager.setCurrentTab(i_sCurrTabID), TAB_GROUP, i_bBackground);
    }

    setDefaultNamespace(i_sNamespaceID, i_bBackground = true) {
        return this._runOperation(() => requestManager.setDefaultNamespace(i_sNamespaceID), TAB_GROUP, i_bBackground);
    }

    saveHeader(i_oHeaderConfig, i_bBackground = true) {
        return this._runOperation(() => requestManager.saveHeader(i_oHeaderConfig), GENERAL_GROUP, i_bBackground);
    }

    saveFooter(i_oFooterConfig, i_bBackground = true) {
        return this._runOperation(() => requestManager.saveFooter(i_oFooterConfig), GENERAL_GROUP, i_bBackground);
    }
}

export let dataManager = new DataManager();

export default { dataManager };
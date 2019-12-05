import axios from "axios";
import { cspEndpointNames } from "constants/server/csp";
import serverUtilities from "utilities/serverUtilities";
import * as LANG_CONST from "constants/language";

export class RequestManager {
    request(i_sURL, i_oRequestConfig = {}) {
        return axios(i_sURL, i_oRequestConfig);
    }

    get(i_sURL, i_oRequestConfig = {}) {
        return this.request(i_sURL, { ...i_oRequestConfig, method: "get" });
    }

    post(i_sURL, i_oRequestConfig = {}) {
        return this.request(i_sURL, { ...i_oRequestConfig, method: "post" });
    }

    put(i_sURL, i_oRequestConfig = {}) {
        return this.request(i_sURL, { ...i_oRequestConfig, method: "put" });
    }

    delete(i_sURL, i_oRequestConfig = {}) {
        return this.request(i_sURL, { ...i_oRequestConfig, method: "delete" });
    }

    async cspRequest(i_sEndpointName, i_oParams = {}, i_oRequestConfig = {}) {
        const oEndpointData = serverUtilities.getCSPEndpointData(i_sEndpointName);

        if (!oEndpointData) {
            throw new Error(`${LANG_CONST.REQUEST_MANAGER_INVALID_CSP_ENDPOINT_ERR}: "${i_sEndpointName}"`);
        }

        const oConfig = {
            params: {
                func: oEndpointData.func,
                ...i_oParams,
            },
            ...i_oRequestConfig
        };

        const oRet = await this.get(oEndpointData.url, oConfig);
        
        // Throw an error if the csp request does not succeed
        if (!oRet.data.success) {
            throw new Error(`${LANG_CONST.REQUEST_MANAGER_CSP_REQUEST_FAILED_ERR}: ${oRet.data.error}`);
        }

        return oRet;
    }

    inCWEnv() {
        return navigator.userAgent.indexOf("CaseWare") >= 0;
    }

    //------------------------------
    //--------- Endpoints ----------
    //------------------------------
    openCaseWareDocument(i_sDocNum) {
        return this.get(i_sDocNum);
    }

    //---------------------------------
    //--------- CSP Endpoints ---------
    //---------------------------------
    uploadFile(i_sFilePath) {
        return this.cspRequest(cspEndpointNames.UPLOAD_FILE, {
            param1: i_sFilePath,
        });
    }

    getProgramPath() {
        return this.cspRequest(cspEndpointNames.GET_PROGRAM_PATH);
    }

    getLayoutPath() {
        return this.cspRequest(cspEndpointNames.GET_LAYOUT_PATH);
    }

    getRoles() {
        return this.cspRequest(cspEndpointNames.GET_ROLES);
    }

    getDocumentManagerJSON() {
        return this.cspRequest(cspEndpointNames.GET_DOCUMENT_MANAGER_JSON);
    }

    getCaseWareDocument(i_sDocGuid, i_sDocNum) {
        return this.cspRequest(cspEndpointNames.GET_CASEWARE_DOCUMENT,
            {
                param1: i_sDocGuid,
                param2: i_sDocNum
            }
        );
    }

    getAllCaseWareDocuments() {
        return this.cspRequest(cspEndpointNames.GET_ALL_CASEWARE_DOCUMENTS);
    }

    getFolderDocuments(i_sFolderGuid, i_sFolderName) {
        return this.cspRequest(cspEndpointNames.GET_FOLDER_DOCUMENTS,
            {
                param1: i_sFolderGuid,
                param2: i_sFolderName
            }
        );
    }

    getIsMasterTemplate() {
        return this.cspRequest(cspEndpointNames.GET_IS_MASTER_TEMPLATE);
    }

    getCurrentUser() {
        return this.cspRequest(cspEndpointNames.GET_CURRENT_USER);
    }

    getSystemInfo() {
        return this.cspRequest(cspEndpointNames.GET_SYSTEM_INFO);
    }

    openFileDialog(i_sInitialFilePath, i_sPrompt, i_sFilter) {
        return this.cspRequest(cspEndpointNames.OPEN_FILE_DIALOG,
            {
                param1: i_sInitialFilePath,
                param2: i_sPrompt,
                param3: i_sFilter
            }
        );
    }

    fileExists(i_sFilePath) {
        return this.cspRequest(cspEndpointNames.FILE_EXISTS,
            {
                param1: i_sFilePath
            }
        );
    }

    folderExists(i_sFolderPath) {
        return this.cspRequest(cspEndpointNames.FOLDER_EXISTS,
            {
                param1: i_sFolderPath
            }
        );
    }

    createFolder(i_sFolderPath) {
        return this.cspRequest(cspEndpointNames.CREATE_FOLDER,
            {
                param1: i_sFolderPath
            }
        );
    }

    copyFolder(i_sSourceFolderPath, i_sTargetFolderPath) {
        return this.cspRequest(cspEndpointNames.CREATE_FOLDER,
            {
                param1: i_sSourceFolderPath,
                param2: i_sTargetFolderPath
            }
        );
    }

    deleteFolder(i_sFolderPath) {
        return this.cspRequest(cspEndpointNames.DELETE_FOLDER,
            {
                param1: i_sFolderPath
            }
        );
    }

    deleteFile(i_sFilePath) {
        return this.cspRequest(cspEndpointNames.DELETE_FILE,
            {
                param1: i_sFilePath
            }
        );
    }

    copyFile(i_sFromPath, i_sToPath) {
        return this.cspRequest(cspEndpointNames.COPY_FILE,
            {
                param1: i_sFromPath,
                param2: i_sToPath
            }
        );
    }

    getFile(i_sFilePath) {
        return this.cspRequest(cspEndpointNames.GET_FILE,
            {
                param1: i_sFilePath
            }
        );
    }

    saveFile(i_sFilePath, i_sContents) {
        return this.cspRequest(cspEndpointNames.SAVE_FILE,
            {
                param1: i_sFilePath,
                body: i_sContents
            }
        );
    }

    listFiles(i_sFolderPath) {
        return this.cspRequest(cspEndpointNames.LIST_FILES,
            {
                param1: i_sFolderPath
            }
        );
    }

    listFilesWithExtension(i_sFolderPath, i_sExtension) {
        return this.cspRequest(cspEndpointNames.LIST_FILES_WITH_EXTENSION,
            {
                param1: i_sFolderPath,
                param2: i_sExtension
            }
        );
    }

    loadAllData() {
        return this.cspRequest(cspEndpointNames.LOAD_ALL_DATA, {});
    }

    loadGeneralData() {
        return this.cspRequest(cspEndpointNames.LOAD_GENERAL_DATA, {});
    }

    loadAllThemeData() {
        return this.cspRequest(cspEndpointNames.LOAD_ALL_THEME_DATA, {});
    }

    loadAllWidgetPresetData() {
        return this.cspRequest(cspEndpointNames.LOAD_ALL_WIDGET_PRESET_DATA, {});
    }

    loadAllTabData() {
        return this.cspRequest(cspEndpointNames.LOAD_ALL_TAB_DATA, {});
    }

    loadThemeData(i_sThemeID) {
        return this.cspRequest(cspEndpointNames.LOAD_THEME_DATA, {
            param1: i_sThemeID
        });
    }

    loadWidgetPresetData(i_sWidgetPresetID) {
        return this.cspRequest(cspEndpointNames.LOAD_WIDGET_PRESET_DATA, {
            param1: i_sWidgetPresetID
        });
    }

    loadTabData(i_sTabID) {
        return this.cspRequest(cspEndpointNames.LOAD_TAB_DATA, {
            param1: i_sTabID
        });
    }

    saveTheme(i_oThemeData) {
        return this.cspRequest(cspEndpointNames.SAVE_THEME, {
            param1: i_oThemeData
        });
    }

    saveNamespace(i_oNamespaceData) {
        return this.cspRequest(cspEndpointNames.SAVE_NAMESPACE, {
            param1: i_oNamespaceData
        });
    }

    saveWidgetPreset(i_oWidgetPresetData) {
        return this.cspRequest(cspEndpointNames.SAVE_WIDGET_PRESET, {
            param1: i_oWidgetPresetData
        });
    }
    
    saveTab(i_oTabData) {
        return this.cspRequest(cspEndpointNames.SAVE_TAB, {
            param1: i_oTabData
        });
    }

    addTheme(i_oThemeData) {
        return this.cspRequest(cspEndpointNames.ADD_THEME, {
            param1: i_oThemeData
        });
    }

    addNamespace(i_oNamespaceData) {
        return this.cspRequest(cspEndpointNames.ADD_NAMESPACE, {
            param1: i_oNamespaceData
        });
    }

    addWidgetPreset(i_oWidgetPresetData) {
        return this.cspRequest(cspEndpointNames.ADD_WIDGET_PRESET, {
            param1: i_oWidgetPresetData
        });
    }
    
    addTab(i_oTabData) {
        return this.cspRequest(cspEndpointNames.ADD_TAB, {
            param1: i_oTabData
        });
    }

    removeTheme(i_sThemeID) {
        return this.cspRequest(cspEndpointNames.REMOVE_THEME, {
            param1: i_sThemeID
        });
    }

    removeNamespace(i_sNamespaceID) {
        return this.cspRequest(cspEndpointNames.REMOVE_NAMESPACE, {
            param1: i_sNamespaceID
        });
    }

    removeWidgetPreset(i_sWidgetPresetID) {
        return this.cspRequest(cspEndpointNames.REMOVE_WIDGET_PRESET, {
            param1: i_sWidgetPresetID
        });
    }
    
    removeTab(i_sTabID) {
        return this.cspRequest(cspEndpointNames.REMOVE_TAB, {
            param1: i_sTabID
        });
    }

    setTabOrder(i_aTabOrder) {
        return this.cspRequest(cspEndpointNames.SET_TAB_ORDER, {
            param1: JSON.stringify(i_aTabOrder) // CSP server doesn't like arrays, gotta parse here
        });
    }

    setCurrentTab(i_sCurrTabID) {
        return this.cspRequest(cspEndpointNames.SET_CURRENT_TAB, {
            param1: i_sCurrTabID
        });
    }

    setDefaultNamespace(i_sNamespaceID) {
        return this.cspRequest(cspEndpointNames.SET_DEFAULT_NAMESPACE, {
            param1: i_sNamespaceID
        });
    }

    saveHeader(i_oHeaderConfig) {
        return this.cspRequest(cspEndpointNames.SAVE_HEADER, {
            param1: i_oHeaderConfig
        });
    }

    saveFooter(i_oFooterConfig) {
        return this.cspRequest(cspEndpointNames.SAVE_FOOTER, {
            param1: i_oFooterConfig
        });
    }
}

export let requestManager = new RequestManager();

export default {
    requestManager
};
import endpointNames from "constants/server/csp/cspEndpointNames";

export const cwEndpoints = {
    [endpointNames.GET_PROGRAM_PATH]: "progPath",
    [endpointNames.GET_LAYOUT_PATH]: "layoutPath",
    [endpointNames.GET_ROLES]: "roles",
    [endpointNames.GET_DOCUMENT_MANAGER_JSON]: "docMgrJSON",
    [endpointNames.GET_CASEWARE_DOCUMENT]: "getCWDoc",
    [endpointNames.GET_ALL_CASEWARE_DOCUMENTS]: "getCWDocs",
    [endpointNames.GET_FOLDER_DOCUMENTS]: "getFolderDocs",
    [endpointNames.GET_IS_MASTER_TEMPLATE]: "isMaster",
    [endpointNames.GET_CURRENT_USER]: "curUser",
    [endpointNames.GET_SYSTEM_INFO]: "sysInfo",
};
// TODO: Figure out the eval functions? Some of them are calling the same function for some reason. Might not even need them.

export const fsEndpoints = {
    [endpointNames.OPEN_FILE_DIALOG]: "openFileDialog",
    [endpointNames.UPLOAD_FILE]: "uploadFile",
    [endpointNames.FILE_EXISTS]: "fileExists",
    [endpointNames.FOLDER_EXISTS]: "folderExists",
    [endpointNames.CREATE_FOLDER]: "createFolder",
    [endpointNames.COPY_FOLDER]: "copyFolder",
    [endpointNames.DELETE_FOLDER]: "deleteFolder",
    [endpointNames.DELETE_FILE]: "delFile",
    [endpointNames.COPY_FILE]: "copyFile",
    [endpointNames.GET_FILE]: "fileConts",
    [endpointNames.SAVE_FILE]: "saveFile",
    [endpointNames.LIST_FILES]: "fileList",
    [endpointNames.LIST_FILES_WITH_EXTENSION]: "filtFileList",
};

export const reactDDBEndpoints = {
    [endpointNames.LOAD_ALL_DATA]: "loadAllData",
    [endpointNames.LOAD_GENERAL_DATA]: "loadGeneralData",
    [endpointNames.LOAD_ALL_THEME_DATA]: "loadAllThemeData",
    [endpointNames.LOAD_ALL_WIDGET_PRESET_DATA]: "loadAllWidgetPresetData",
    [endpointNames.LOAD_ALL_TAB_DATA]: "loadAllTabData",
    [endpointNames.LOAD_THEME_DATA]: "loadThemeData",
    [endpointNames.LOAD_WIDGET_PRESET_DATA]: "loadWidgetPresetData",
    [endpointNames.LOAD_TAB_DATA]: "loadTabData",
    [endpointNames.SAVE_THEME]: "saveTheme",
    [endpointNames.SAVE_WIDGET_PRESET]: "saveWidgetPreset",
    [endpointNames.SAVE_TAB]: "saveTab",
    [endpointNames.ADD_THEME]: "addTheme",
    [endpointNames.ADD_WIDGET_PRESET]: "addWidgetPreset",
    [endpointNames.ADD_TAB]: "addTab",
    [endpointNames.REMOVE_THEME]: "removeTheme",
    [endpointNames.REMOVE_WIDGET_PRESET]: "removeWidgetPreset",
    [endpointNames.REMOVE_TAB]: "removeTab",
    [endpointNames.SET_TAB_ORDER]: "setTabOrder",
    [endpointNames.SET_CURRENT_TAB]: "setCurrentTab",
    [endpointNames.SAVE_NAMESPACE]: "saveNamespace",
    [endpointNames.ADD_NAMESPACE]: "addNamespace",
    [endpointNames.REMOVE_NAMESPACE]: "removeNamespace",
    [endpointNames.SET_DEFAULT_NAMESPACE]: "setDefaultNamespace",
    [endpointNames.SAVE_HEADER]: "saveHeader",
    [endpointNames.SAVE_FOOTER]: "saveFooter",
};

export default {
    ...cwEndpoints,
    ...fsEndpoints,
    ...reactDDBEndpoints,
};
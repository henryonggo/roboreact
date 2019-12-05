import * as actionTypes from "store/actions/actionTypes";
import { INIT_CONFIG } from "store/constants";

// ---------------------
// --- Theme actions ---
// ---------------------

export const addTheme = (i_oThemeTemplate, i_oConfig = {}) => {
    return {
        type: actionTypes.theme.ADD_THEME,
        themeTemplate: i_oThemeTemplate,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const updateTheme = (i_sThemeID, i_oUpdatedProperties, i_oConfig = {}) => {
    return {
        type: actionTypes.theme.UPDATE_THEME,
        themeID: i_sThemeID,
        updatedProperties: i_oUpdatedProperties,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const removeTheme = (i_sThemeID, i_oConfig = {}) => {
    return {
        type: actionTypes.theme.REMOVE_THEME,
        themeID: i_sThemeID,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const changeTheme = (i_sNamespaceID, i_sThemeID, i_oConfig = {}) => {
    return {
        type: actionTypes.theme.CHANGE_THEME,
        namespaceID: i_sNamespaceID,
        themeID: i_sThemeID,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

// Note: if no default namespace is set then this namespace will be used
export const addNamespace = (i_sNamespaceID, i_sThemeID, i_oConfig = {}) => {
    return (dispatch, getState) => {
        // Add the namespace
        dispatch({
            type: actionTypes.theme.ADD_NAMESPACE,
            namespaceID: i_sNamespaceID,
            themeID: i_sThemeID,
            $config: { ...INIT_CONFIG, ...i_oConfig }
        });

        // If no default namespace is set then set this one as it
        const sDefaultNamespace = getState().present.theme.defaultNamespace;
        if (!sDefaultNamespace) {
            dispatch(
                setDefaultNamespace(i_sNamespaceID, i_oConfig)
            );
        }
    };
};

export const removeNamespace = (i_sNamespaceID, i_oConfig = {}) => {
    return {
        type: actionTypes.theme.REMOVE_NAMESPACE,
        namespaceID: i_sNamespaceID,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};

export const setDefaultNamespace = (i_sNamespaceID, i_oConfig = {}) => {
    return {
        type: actionTypes.theme.SET_DEFAULT_NAMESPACE,
        namespaceID: i_sNamespaceID,
        $config: { ...INIT_CONFIG, ...i_oConfig }
    };
};
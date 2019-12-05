import * as actionTypes from "store/actions/actionTypes";
import * as operations from "store/operations/theme";

const initalState =  {
    defaultNamespace: null, // Not set by default

    namespaces: {
        // Is populated by App
    },

    themes: {
        // Is populated by App
    }
};

const reducer = (state = initalState, action) => {
    const bSaveToServer = (action.$config) ? action.$config.$saveToServer : false;

    switch(action.type) {
        case actionTypes.theme.ADD_THEME:
            return operations.addTheme(state, action.themeTemplate, bSaveToServer);
        case actionTypes.theme.UPDATE_THEME:
            return operations.updateTheme(state, action.themeID, action.updatedProperties, bSaveToServer);
        case actionTypes.theme.REMOVE_THEME:
            // WARNING: removing themes can cause ThemeProvider components to crash
            return operations.removeTheme(state, action.themeID, bSaveToServer);
        case actionTypes.theme.CHANGE_THEME:
            return operations.changeTheme(state, action.namespaceID, action.themeID, bSaveToServer);
        case actionTypes.theme.ADD_NAMESPACE:
            return operations.addNamespace(state, action.namespaceID, action.themeID, bSaveToServer);
        case actionTypes.theme.REMOVE_NAMESPACE:
            // WARNING: removing namespaces can cause ThemeProvider components to crash
            return operations.removeNamespace(state, action.namespaceID, bSaveToServer);
        case actionTypes.theme.SET_DEFAULT_NAMESPACE:
            return operations.setDefaultNamespace(state, action.namespaceID, bSaveToServer);
        default:
            return state;
    }
};

export default reducer;
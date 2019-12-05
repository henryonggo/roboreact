// This is where all the action constants for the store are stored

// -------------------------
// --- Misc action types ---
// -------------------------
export const misc = {
    SET_BASELINE: "MISC__SET_BASELINE",
};
// export const SET_BASELINE = "SET_BASELINE";

// --------------------------
// --- Theme action types ---
// --------------------------
export const theme = {
    ADD_THEME: "THEME__ADD_THEME",
    UPDATE_THEME: "THEME__UPDATE_THEME",
    REMOVE_THEME: "THEME__REMOVE_THEME",
    CHANGE_THEME: "THEME__CHANGE_THEME",
    ADD_NAMESPACE: "THEME__ADD_NAMESPACE",
    REMOVE_NAMESPACE: "THEME__REMOVE_NAMESPACE",
    SET_DEFAULT_NAMESPACE: "THEME__SET_DEFAULT_NAMESPACE",
};

// ------------------------
// --- Tab action types ---
// ------------------------
export const tab = {
    ADD_TAB: "TAB__ADD_TAB",
    REMOVE_TAB: "TAB__REMOVE_TAB",
    EDIT_TAB: "TAB__EDIT_TAB",
    CHANGE_OPEN_TAB: "TAB__OPEN_TAB",
    CHANGE_TAB_ORDER: "TAB__CHANGE_TAB_ORDER",
    ADD_WIDGET: "TAB__ADD_WIDGET",
    REMOVE_WIDGET: "TAB__REMOVE_WIDGET",
    UPDATE_WIDGET_LAYOUT: "TAB__UPDATE_WIDGET_LAYOUT",
    UPDATE_ALL_WIDGET_LAYOUTS: "TAB__UPDATE_ALL_WIDGET_LAYOUTS",
    GENERATE_TAB_ID: "TAB__GENERATE_TAB_ID",
    GENERATE_WIDGET_ID: "TAB__GENERATE_WIDGET_ID",
    REMOVE_WIDGET_PRESET_REFERENCES: "REMOVE_WIDGET_PRESET_REFERENCES",
};

// ---------------------------
// --- Widget action types ---
// ---------------------------
export const widget = {
    ADD_WIDGET_PRESET: "WIDGET__ADD_WIDGET_PRESET",
    EDIT_WIDGET_PRESET: "WIDGET__EDIT_WIDGET_PRESET",
    REMOVE_WIDGET_PRESET: "WIDGET__REMOVE_WIDGET_PRESET",
    GENERATE_WIDGET_PRESET_ID: "GENERATE_WIDGET_PRESET_ID",
};


// ----------------------------
// --- General action types ---
// ----------------------------
export const general = {
    SET_SYSTEM_INFO: "GENERAL__SET_SYSTEM_INFO",
    SET_HEADER: "GENERAL__SET_HEADER",
    SET_FOOTER: "GENERAL__SET_FOOTER",
};


// -------------------------------
// --- Redux-undo action types ---
// -------------------------------
export const reduxUndo = {
    UNDO: "REDUX-UNDO_UNDO",
    REDO: "REDUX-UNDO_REDO",
    JUMP: "REDUX-UNDO_JUMP",
    JUMP_TO_PAST: "REDUX-UNDO_JUMP_TO_PAST",
    JUMP_TO_FUTURE: "REDUX-UNDO_JUMP_TO_FUTURE",
    CLEAR_HISTORY: "REDUX-UNDO_CLEAR_HISTORY",
};
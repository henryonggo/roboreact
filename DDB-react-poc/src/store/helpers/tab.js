import { BREAKPOINT_PREFIX } from "constants/app";

// ------------------------
// --- Helper functions ---
// ------------------------

export const generateInitialWidgetLayout = (i_oWidgets, i_nNumCols) => {
    const oInitWidgetLayouts = {};

    // Only set the widget locations for the largest breakpoint
    const sBreakpointID = `${BREAKPOINT_PREFIX}${i_nNumCols}`;
    const aBreakpointLayout = [];

    // For each widget
    Object.keys(i_oWidgets).forEach((sWidgetID, nIndex) => {
        // Generate its layout data
        const oLayoutData = {
            i: sWidgetID,
            x: nIndex % i_nNumCols, // Place it next to the previous widget
            y: Infinity, // Places it on the bottom
            w: 1,
            h: 1,
            moved: false,
            static: false
        };
        aBreakpointLayout.push(oLayoutData);
    });

    oInitWidgetLayouts[sBreakpointID] = aBreakpointLayout;

    return oInitWidgetLayouts;
};

export const findWidgetByPresetName = (i_oState, i_sPresetType, i_sPresetName) => {
    return Object.values(i_oState.widget.presets[i_sPresetType]).find(oCurrPreset => oCurrPreset.name === i_sPresetName);
};
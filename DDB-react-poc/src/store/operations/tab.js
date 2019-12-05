import { TAB_REMOVABLE_BY_DEFAULT, TAB_EDITABLE_BY_DEFAULT } from "constants/app";
import update from "immutability-helper";
import Utilities from "utilities";
import { dataManager } from "managers";
import _ from "lodash";

// ---------------------------
// --- Operation functions ---
// ---------------------------

export const addTab = (i_oState, i_oPayload, i_sTabID, i_bSaveData = false) => {
    const { name, tooltip, numCols, editable, removable } = i_oPayload;

    if (!name) {
        throw new Error("Error: tab name must be provided");
    }

    const nSerializedNumCols = (numCols) ? numCols : 1;

    // If no widget layout is given then generate an initial layout

    const oTabData = {
        id: i_sTabID,
        name,
        tooltip: (tooltip) ? tooltip : "",
        widgets: {},
        widgetOrder: [],
        widgetLayouts: {},
        removable: (removable) ? removable : TAB_REMOVABLE_BY_DEFAULT,
        editable: (editable) ? editable : TAB_EDITABLE_BY_DEFAULT,
        numCols: nSerializedNumCols
    };

    const aUpdatedTabOrder = update(i_oState.tabOrder, { $push: [i_sTabID] });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.addTab(oTabData, true);
        dataManager.setTabOrder(aUpdatedTabOrder, true);
    }

    return update(i_oState, {
        tabs: { [i_sTabID]: { $set: oTabData } },
        tabOrder: { $set: aUpdatedTabOrder }
    });
};

export const removeTab = (i_oState, i_nDelIndex, i_bSaveData = false) => {
    const aTabOrder = i_oState.tabOrder;
    const sDelTabId = aTabOrder[i_nDelIndex];
    let sNewCurrTabID = i_oState.currTabID;

    // If the tab being removed is the currently opened tab
    if (sDelTabId === sNewCurrTabID) {
        const bOnlyTab = (aTabOrder.length - 1) <= 0;
        const bLastTab = i_nDelIndex === aTabOrder.length - 1;

        if (bOnlyTab) {
            sNewCurrTabID = "";
        } else if (bLastTab) {
            sNewCurrTabID = aTabOrder[i_nDelIndex - 1];
        } else {
            sNewCurrTabID = aTabOrder[(i_nDelIndex + 1) % aTabOrder.length];
        }
    }

    // Remove tab from tab order
    const aUpdatedTabOrder = update(i_oState.tabOrder, { $splice: [[i_nDelIndex, 1]] });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.removeTab(sDelTabId, true);
        dataManager.setCurrentTab(sNewCurrTabID, true);
        dataManager.setTabOrder(aUpdatedTabOrder, true);
    }

    return update(i_oState, {
        tabOrder: { $set: aUpdatedTabOrder },
        currTabID: { $set: sNewCurrTabID }, // Update the currenty open tab
        tabs: { $unset: [sDelTabId] } // Remove the tab from the tab object
    });
};

export const editTab = (i_oState, i_sTabID, i_oUpdatedTabData, i_bSaveData = false) => {
    // Check if tab with ID exists
    if (!i_oState.tabs[i_sTabID]) {
        throw new Error(`Error: tab with ID ${i_sTabID} does not exist`);
    }

    // Stop the user from updating the tab ID
    if (i_oUpdatedTabData["id"]) {
        throw new Error("Error: updating tab ID is not allowed");
    }

    const oUpdatedTabData = update(i_oState.tabs[i_sTabID], { $merge: i_oUpdatedTabData });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveTab(oUpdatedTabData, true);
    }

    const oUpdatedTabDataComplete = {
        id: i_sTabID,
        ...i_oUpdatedTabData
    };

    return update(i_oState, {
        tabs: { [i_sTabID]: { $set: oUpdatedTabDataComplete } }
    });
};

export const changeOpenTab = (i_oState, i_sTabID, i_bSaveData = false) => {
    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.setCurrentTab(i_sTabID, true);
    }

    // Update the current open tab
    return update(i_oState, {
        currTabID: { $set: i_sTabID },
    });
};

export const changeTabOrder = (i_oState, i_nIdxFrom, i_nIdxTo, i_bSaveData = false) => {
    // Stop execution if no change to the tab locations is being made
    if (i_nIdxFrom === i_nIdxTo) {
        return i_oState;
    }

    const asTabOrderUpdated = [...i_oState.tabOrder];
    const sTabID = asTabOrderUpdated.splice(i_nIdxFrom, 1)[0];
    asTabOrderUpdated.splice(i_nIdxTo, 0, sTabID);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.setTabOrder(asTabOrderUpdated, true);
    }

    return update(i_oState, {
        tabOrder: { $set: asTabOrderUpdated }
    });
};

export const addWidget = (i_oState, i_sPresetID, i_sPresetType, i_oWidgetLayout, i_sWidgetID, i_sTabID = null, i_bSaveData = false) => {
    const sTabID = (i_sTabID) ? i_sTabID : i_oState.currTabID;

    const oWidgetLayout = (i_oWidgetLayout) ? { ...i_oWidgetLayout }: {};

    // Construct widget data
    const oWidgetData = {
        id: i_sWidgetID,
        presetID: i_sPresetID,
        presetType: i_sPresetType,
    };

    // Merge in any widget layouts provided
    const oUpdatedWidgetLayouts = Utilities.deepMerge(oWidgetLayout, i_oState.tabs[sTabID].widgetLayouts, true);

    const oUpdatedTabData = update(i_oState.tabs[sTabID], {
        widgets: { [i_sWidgetID]: { $set: oWidgetData } },
        widgetLayouts: { $set: oUpdatedWidgetLayouts },
        widgetOrder: { $unshift: [oWidgetData.id] }
    });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveTab(oUpdatedTabData, true);
    }

    return update(i_oState, {
        tabs: { [sTabID]: { $set: oUpdatedTabData } }
    });
};

export const removeWidget = (i_oState, i_sWidgetID, i_sTabID = null, i_bSaveData = false) => {
    function removeWidgetFromLayouts(i_oLayouts) {
        for (const sLayoutKey in i_oLayouts) {
            i_oLayouts[sLayoutKey].filter(i_oWidget => i_oWidget.i !== i_sWidgetID);
        }
        return i_oLayouts;
    }

    // If no tab ID is given then just use the currently open tab
    const sUpdateTabID = (i_sTabID) ? i_sTabID : i_oState.currTabID;

    const nWidgetsOrderIdx = i_oState.tabs[sUpdateTabID].widgetOrder.indexOf(i_sWidgetID);

    const oUpdatedTabData = update(i_oState.tabs[sUpdateTabID], {
        widgets: { $unset: [i_sWidgetID] },
        widgetOrder: { $splice: [[nWidgetsOrderIdx, 1]] },
        widgetLayouts: { $apply: removeWidgetFromLayouts }
    });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveTab(oUpdatedTabData, true);
    }

    return update(i_oState, {
        tabs: { [sUpdateTabID]: { $set: oUpdatedTabData } }
    });
};

export const updateWidgetLayout = (i_oState, i_sTabID, i_sBreakpointID, i_aLayout, i_bSaveData = false) => {
    let aCurrLayout = (i_oState.tabs[i_sTabID].widgetLayouts) ? i_oState.tabs[i_sTabID].widgetLayouts[i_sBreakpointID] : [];
    aCurrLayout = (aCurrLayout) ? aCurrLayout : []; // Ensure that it's an array
    const bLayoutUpdated = _.isEqual(aCurrLayout, i_aLayout);
    if (!bLayoutUpdated) {
        return i_oState;
    }

    const oUpdatedWidgetLayouts = update(i_oState.tabs[i_sTabID].widgetLayouts, {
        [i_sBreakpointID]: { $set: i_aLayout }
    });

    const oUpdatedTabData = update(i_oState.tabs[i_sTabID], {
        widgetLayouts: { $set: oUpdatedWidgetLayouts }
    });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveTab(oUpdatedTabData, true);
    }

    return update(i_oState, {
        tabs: { [i_sTabID]: { $set: oUpdatedTabData } }
    });
};

export const updateAllWidgetLayouts = (i_oState, i_sTabID, i_oLayouts, i_bSaveData = false) => {
    const _layoutsEqual = (i_oLayout1, i_oLayout2) => {
        const bBreakpointsEqual = _.isEqual(Object.keys(i_oLayout1), Object.keys(i_oLayout2));
        if (!bBreakpointsEqual) {
            return false;
        }
    
        let bRet = true;
    
        Object.entries(i_oLayout1).forEach(([i_sBreakpointID, i_aLayout]) => {
            if (!bRet) {
                return;
            }
    
            i_aLayout.forEach((i_oPos) => {
                if (!bRet) {
                    return;
                }
    
                const sID = i_oPos.i;
                const oPosOther = i_oLayout2[i_sBreakpointID].find(i_oCurrPos => i_oCurrPos.i === sID);
                const bPosEqual = _.isEqual(i_oPos, oPosOther);
    
                if (!bPosEqual) {
                    bRet = false;
                }
            });
        });
    
        return bRet;
    };

    const oCurrLayouts = (i_oState.tabs[i_sTabID].widgetLayouts) ? i_oState.tabs[i_sTabID].widgetLayouts : {};
    const bLayoutsEqual = _layoutsEqual(oCurrLayouts, i_oLayouts);
    if (bLayoutsEqual) {
        return i_oState;
    }

    const oUpdatedTabData = update(i_oState.tabs[i_sTabID], {
        widgetLayouts: { $set: i_oLayouts }
    });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveTab(oUpdatedTabData, true);
    }

    return update(i_oState, {
        tabs: { [i_sTabID]: { $set: oUpdatedTabData } }
    });
};

export const removeWidgetPresetReferences = (i_oState, i_sWidgetPresetID, i_sWidgetPresetType, i_bSaveData = false) => {
    const getWidgetIDsToRemove = (i_oWidgets, i_sWidgetPresetID, i_sWidgetPresetType) => {
        // Iterate through each widget and compile a list of all widget IDs to remove
        return Object.values(i_oWidgets).reduce((acc, i_oWidgetData) => {
            const { id, presetID, presetType } = i_oWidgetData;
            const bRemoveWidget = presetID === i_sWidgetPresetID && presetType === i_sWidgetPresetType;
            const oAccMerge = (bRemoveWidget) ? [id] : [];

            return [
                ...acc,
                ...oAccMerge
            ];
        }, []);
    };

    const getWidgetOrderIndexesToRemove = (i_aWidgetIDsToRemove, i_aWidgetOrder) => {
        // Get indexes to remove
        const aWidgetRemoveIndexes = i_aWidgetIDsToRemove.map(i_sWidgetID => {
            return i_aWidgetOrder.indexOf(i_sWidgetID);
        });

        // Sort them in descending order (so update will remove them propertly)
        aWidgetRemoveIndexes.sort((a, b) => b - a);

        return aWidgetRemoveIndexes;
    };

    // Construct the remove settings for update
    const oRemoveWidgetMap = Object.values(i_oState.tabs).reduce((acc, i_oTabData) => {
        const { id, widgets } = i_oTabData;
        const aWidgetIDsToRemove = getWidgetIDsToRemove(widgets, i_sWidgetPresetID, i_sWidgetPresetType);

        const aWidgetOrderIndexesToRemove = getWidgetOrderIndexesToRemove(aWidgetIDsToRemove, i_oTabData.widgetOrder);
        // Setup immutabily-friendly splice array
        const aWidgetOrderSplice = aWidgetOrderIndexesToRemove.map(i_nRemoveIdx => {
            return [i_nRemoveIdx, 1];
        });


        const oUpdatedTabData = (aWidgetIDsToRemove.length > 0) ? 
            update(i_oTabData, {
                widgets: { $unset: aWidgetIDsToRemove },
                widgetOrder: { $splice: aWidgetOrderSplice }
            }) : i_oTabData;

        if (i_bSaveData) {
            // Update the server's data in the background
            dataManager.saveTab(oUpdatedTabData, true);
        }

        return {
            ...acc,
            [id]: { $set: oUpdatedTabData }
        };
    }, {});

    return update(i_oState, {
        tabs: {
            ...oRemoveWidgetMap
        }
    });
};
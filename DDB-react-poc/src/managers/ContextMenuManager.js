import EventManager from "managers/EventManager";
import { contextMenuEvents } from "managers/eventTypes";
import Utilities from "utilities";

export class ContextMenuManager {
    openContextMenu(i_oConfig) {
        const sContextMenuID = Utilities.generateUniqueID();

        for (const oContextOption of i_oConfig.items) {
            oContextOption.onClick = _fnOnClickOptionHijack(oContextOption.onClick, sContextMenuID);
        }

        return EventManager.emit(contextMenuEvents.SHOW_CONTEXT_MENU, {
            ...i_oConfig,
            contextMenuID: sContextMenuID
        });
    }

    closeContextMenu(i_sContextMenuID) {
        return EventManager.emit(contextMenuEvents.HIDE_CONTEXT_MENU, i_sContextMenuID);
    }
}

function _fnOnClickOptionHijack(i_fnOnClick, i_sContextMenuID) {
    return () => {
        Utilities.runFunctions(
            i_fnOnClick,
            () => contextMenuManager.closeContextMenu(i_sContextMenuID));
    };
}

export let contextMenuManager = new ContextMenuManager();

export default { contextMenuManager };

import EventManager from "managers/EventManager";
import { modalEvents } from "managers/eventTypes";
import { modalTypes } from "constants/modals";
import Utilities from "utilities";

export class ModalManager {
    openModal(i_sType, i_oConfig = {}) {
        const sModalID = getModalID(i_oConfig);

        return EventManager.emit(modalEvents.OPEN_MODAL, {
            ...i_oConfig,
            type: i_sType || "default",
            onRequestClose: _onRequestCloseHijack(i_oConfig.onRequestClose, sModalID),
            modalID: sModalID
        });
    }

    openErrorAssertionModal(i_oConfig) {
        return this.openModal(modalTypes.ERROR_ASSERTION, i_oConfig);
    }

    openInfoAssertionModal(i_oConfig) {
        return this.openModal(modalTypes.INFO_ASSERTION, i_oConfig);
    }

    openWarningAssertionModal(i_oConfig) {
        return this.openModal(modalTypes.WARNING_ASSERTION, i_oConfig);
    }

    openAssertionBaseModal(i_oConfig) {
        return this.openModal(modalTypes.ASSERTION_BASE, i_oConfig);
    }

    openConfirmModal(i_oConfig) {
        return this.openModal(modalTypes.CONFIRM, i_oConfig);
    }

    closeModal(i_sModalID) {
        return EventManager.emit(modalEvents.CLOSE_MODAL, i_sModalID);
    }
}

// Utils.
function generateModalID() {
    return Utilities.generateUniqueID();
}

function getModalID(i_oConfig) {
    if (
        i_oConfig &&
        (typeof i_oConfig.id === "string" ||
            (typeof i_oConfig.id === "number" && !isNaN(i_oConfig.id))
        )
    ) {
        return i_oConfig.id;
    }

    return generateModalID();
}

// Hijacks the request close call and adds the close modal function onto it
const _onRequestCloseHijack = (i_fnOnRequestClose, i_sModalID) => {
    return () => Utilities.runFunctions(
        i_fnOnRequestClose,
        () => modalManager.closeModal(i_sModalID)
    );
};

export let modalManager = new ModalManager();

export default { modalManager };

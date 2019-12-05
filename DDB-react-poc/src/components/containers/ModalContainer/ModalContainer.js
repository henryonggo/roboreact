import React, { Component } from "react";
// import "./ModalContainer.scss";
// import PropTypes from "prop-types";

import update from "immutability-helper";
import { Transition } from "react-spring/renderprops";

import EventManager from "managers/EventManager";
import { modalEvents } from "managers/eventTypes";

import * as modalTypes from "constants/modals/modalTypes";
import { getDefaultModalConfig } from "constants/modals/modalDefaultConfigs";

// ---------------------
// --- Modal Imports ---
// ---------------------
// Note: this import block was originally moved out to a separate file but there were some problems
// with the export function exporting before all the imports were finished which made some of the items undefined
import ErrorAssertionModal from "components/modals/assertions/ErrorAssertionModal/ErrorAssertionModal";
import InfoAssertionModal from "components/modals/assertions/InfoAssertionModal/InfoAssertionModal";
import WarningAssertionModal from "components/modals/assertions/WarningAssertionModal/WarningAssertionModal";
import AssertionBaseModal from "components/modals/assertions/AssertionBaseModal";
import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";
import ModalWrapper from "components/modals/ModalWrapper";

// Tab modals
import TabManagerModal from "components/TabController/modals/TabManagerModal/TabManagerModal";
import DashboardSettingsModal from "components/TabController/modals/DashboardSettingsModal/DashboardSettingsModal";
import TabConfigurationBaseModal from "components/TabController/modals/TabConfigurationBaseModal/TabConfigurationBaseModal";
import TabAddModal from "components/TabController/modals/TabConfigurationBaseModal/TabAddModal/TabAddModal";
import TabEditModal from "components/TabController/modals/TabConfigurationBaseModal/TabEditModal/TabEditModal";

// Widget modals 
import WidgetPresetManagerModal from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetManagerModal";
import WidgetPresetAddSelectorModal from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetAddSelectorModal/WidgetPresetAddSelectorModal";
import WidgetPresetConfigurationBaseModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetConfigurationBaseModal";
import WidgetPresetAddModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetAddModal/WidgetPresetAddModal";
import WidgetPresetEditModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetEditModal/WidgetPresetEditModal";
import TagAddModal from "components/widgets/modals/TagAddModal/TagAddModal";
import WorkflowButtonConfigurationBaseModal from "components/widgets/bases/WorkflowWidget/modals/WorkflowButtonConfigurationBaseModal";
import WorkflowButtonAddModal from "components/widgets/bases/WorkflowWidget/modals/WorkflowButtonAddModal";
import WorkflowButtonEditModal from "components/widgets/bases/WorkflowWidget/modals/WorkflowButtonEditModal";
import WorkflowLaunchMappingModal from "components/widgets/bases/WorkflowWidget/modals/WorkflowLaunchMappingModal";

// Header/footer modals
import MarginalsConfigurationBaseModal from "components/TabController/modals/MarginalsConfigurationBaseModal/MarginalsConfigurationBaseModal";
import HeaderConfigurationModal from "components/TabController/modals/MarginalsConfigurationBaseModal/HeaderConfigurationModal/HeaderConfigurationModal";
import FooterConfigurationModal from "components/TabController/modals/MarginalsConfigurationBaseModal/FooterConfigurationModal/FooterConfigurationModal";


// Construct modal library object
const modalLibrary = {
    default: ModalWrapper,
    [modalTypes.ERROR_ASSERTION]: ErrorAssertionModal,
    [modalTypes.INFO_ASSERTION]: InfoAssertionModal,
    [modalTypes.WARNING_ASSERTION]: WarningAssertionModal,
    [modalTypes.ASSERTION_BASE]: AssertionBaseModal,
    [modalTypes.CONFIRM]: ConfirmModal,
    // Tab
    [modalTypes.TAB_MANAGER]: TabManagerModal,
    [modalTypes.DASHBOARD_SETTINGS]: DashboardSettingsModal,
    [modalTypes.TAB_CONFIGURATION_BASE]: TabConfigurationBaseModal,
    [modalTypes.TAB_ADD]: TabAddModal,
    [modalTypes.TAB_EDIT]: TabEditModal,
    // Widget
    [modalTypes.WIDGET_PRESET_MANAGER]: WidgetPresetManagerModal,
    [modalTypes.WIDGET_PRESET_ADD_SELECTOR]: WidgetPresetAddSelectorModal,
    [modalTypes.WIDGET_PRESET_CONFIGURATION_BASE]: WidgetPresetConfigurationBaseModal,
    [modalTypes.WIDGET_PRESET_ADD]: WidgetPresetAddModal,
    [modalTypes.WIDGET_PRESET_EDIT]: WidgetPresetEditModal,
    [modalTypes.TAG_ADD]: TagAddModal,
    [modalTypes.WORKFLOW_BUTTON_CONFIGURATION_BASE]: WorkflowButtonConfigurationBaseModal,
    [modalTypes.WORKFLOW_BUTTON_ADD]: WorkflowButtonAddModal,
    [modalTypes.WORKFLOW_BUTTON_EDIT]: WorkflowButtonEditModal,
    [modalTypes.WORKFLOW_LAUNCH_MAPPING]: WorkflowLaunchMappingModal,

    // Header/footer
    [modalTypes.MARGINALS_CONFIGURATION_BASE]: MarginalsConfigurationBaseModal,
    [modalTypes.HEADER_CONFIGURATION]: HeaderConfigurationModal,
    [modalTypes.FOOTER_CONFIGURATION]: FooterConfigurationModal,
};

class ModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modals: [],
            modalCollection: {},
            overlayAlpha: 0
        };
    }

    componentDidMount() {
        EventManager
            .on(modalEvents.OPEN_MODAL, (i_oConfig) => this.fnOnOpenModal(i_oConfig))
            .on(modalEvents.CLOSE_MODAL, (i_sModalId) => this.fnOnCloseModal(i_sModalId))
            .emit(modalEvents.DID_CONTAINER_MOUNT);
    }

    componentWillUnmount() {
        EventManager
            .off(modalEvents.OPEN_MODAL)
            .off(modalEvents.CLOSE_MODAL)
            .emit(modalEvents.WILL_CONTAINER_UNMOUNT);
    }

    fnOnOpenModal(i_oConfig) {
        this.setState((prevState) => {
            return update(prevState, {
                modals: { $push: [i_oConfig.modalID] },
                modalCollection: { $merge: { [i_oConfig.modalID]: i_oConfig || {} } },
                overlayAlpha: { $set: this.fnGetNewOverlayOpacity(prevState.modals.length + 1) }
            });
        });
    }

    fnOnCloseModal(i_sModalID) {
        this.setState((prevState) => {
            const nModalIndex = prevState.modals.indexOf(i_sModalID);

            if (nModalIndex < 0) {
                return prevState;
            }

            return update(prevState, {
                modals: { $splice: [[nModalIndex, 1]] },
                overlayAlpha: { $set: this.fnGetNewOverlayOpacity(prevState.modals.length - 1) }
            });
        });

        // Wait for animation to complete to delete modal config.
        setTimeout(() => {
            this.setState((prevState) => {
                return update(prevState, {
                    modalCollection: { $unset: [i_sModalID] }
                });
            });
        }, 10000);
    }

    /**
     * Returns the new modal opacity based on the number of modals open.
     * We want the effective opacity of all the modal overlays combined to always be 0.5. 
     * @param {Number} i_nModalCount The number of modals open.
     * @return {Number} The new overlay opacity for all modals.
     */
    fnGetNewOverlayOpacity(i_nModalCount) {
        switch (i_nModalCount) { // Polynomial solutions for opacity.
            case 0: return 0;
            case 1: return 0.5;
            case 2: return 0.293;
            case 3: return 0.206;
            case 4: return 0.159;
            case 5: return 0.129;
            default: return 0.08;
        }
    }

    fnGetModalConfig(i_sModalID) {
        return this.state.modalCollection[i_sModalID];
    }

    fnRenderModal(i_oModalConfig, i_oStyleProps) {
        const Modal = modalLibrary[i_oModalConfig.type] || modalLibrary.default;
        const defaultConfig = getDefaultModalConfig(i_oModalConfig.type);
        return (
            <Modal
                {...defaultConfig}
                {...i_oModalConfig}
                styleProps={{
                    ...i_oStyleProps,
                    overlayColor: `rgba(0, 0, 0, ${this.state.overlayAlpha})`
                }}
            >
                {i_oModalConfig.children}
            </Modal>
        );
    }

    render() {
        return (
            <Transition
                items={this.state.modals}
                keys={modal => modal}
                from={{ opacity: 0, transform: "scale(0.85)" }}
                enter={{ opacity: 1, transform: "scale(1)" }}
                leave={{ opacity: 0, transform: "scale(0.85)", pointerEvents: "none" }}
                config={{ tension: 500, friction: 30, clamp: true }}
            >
                {modalID => modalID && (styleProps =>
                    this.fnRenderModal(this.fnGetModalConfig(modalID), styleProps)
                )}
            </Transition>
        );
    }
}

export default ModalContainer;


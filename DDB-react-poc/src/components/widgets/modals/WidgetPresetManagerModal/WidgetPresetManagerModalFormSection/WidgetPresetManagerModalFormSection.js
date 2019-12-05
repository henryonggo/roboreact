import React from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { modalManager, requestManager } from "managers";
import { modalTypes } from "constants/modals";
import widgetBaseTypeNames from "constants/widgets/widgetBaseTypesNames";
import availableOperations from "components/widgets/modals/WidgetPresetManagerModal/availableOperations";
import { connect as connectFormik, getIn } from "formik";
import * as operations from "store/operations/widget";
import { connect as connectRedux } from "react-redux";
import * as LANG_CONST from "constants/language";

import IconButton from "components/ui/button/IconButton/IconButton";
import FormSection from "components/forms/FormSection/FormSection";
import MultiSectionCheckboxList from "components/forms/MultiSectionCheckboxList/MultiSectionCheckboxList";
import { Add, Settings } from "@material-ui/icons";

const SELECT_PRESET_ON_ADD = false;
const DISABLE_PRESET_ON_ADD = false;

const SAVE_TO_SERVER = false;

const WidgetPresetManagerModalFormSection = (props) => {
    const { formik, pushNewOperation, generateWidgetPresetID, presetsDataName, 
        selectedPresetsName, disabled, systemInfo, ...rest } = props;

    const bClientFile = requestManager.inCWEnv() && !systemInfo.isMaster;

    const addWidgetPresetOpenHandler = () => {
        modalManager.openModal(modalTypes.WIDGET_PRESET_ADD, {
            onConfirm: addWidgetPresetSubmitHandler,
        });
    };

    const addWidgetPresetSubmitHandler = (i_oWidgetPresetData) => {
        const { name, type, metaData, customData } = i_oWidgetPresetData;

        // Generate a widget preset ID
        const sWidgetPresetID = generateWidgetPresetID();

        const oPresets = getIn(formik.values, presetsDataName);
        const aSelectedPresets = getIn(formik.values, selectedPresetsName);

        // Add widget preset locally
        const oUpdatedState = operations.addWidgetPreset({ presets: oPresets }, name, type, metaData, customData, sWidgetPresetID, SAVE_TO_SERVER);
        formik.setFieldValue(presetsDataName, oUpdatedState.presets);

        // Find the index location of the type of the preset that is being added
        const nTypeIdx = aSelectedPresets.indexOf(aSelectedPresets.find(i_oSection => i_oSection.name === type));

        // Update the presetsSelected to include the new widget
        const aUpdatedSelectedPresetsState = update(aSelectedPresets, {
            [nTypeIdx]: {
                items: {
                    $push: [{
                        id: sWidgetPresetID,
                        selected: SELECT_PRESET_ON_ADD, 
                        disabled: DISABLE_PRESET_ON_ADD,
                    }]
                }
            }
        });
        formik.setFieldValue(selectedPresetsName, aUpdatedSelectedPresetsState);

        // Push the new operation in
        pushNewOperation(availableOperations.ADD_WIDGET_PRESET, name, type, metaData, customData, sWidgetPresetID);
    };

    const editWidgetPresetOpenHandler = (i_nSectionIdx, i_sPresetID, i_nPresetIdx) => {
        const oPresets = getIn(formik.values, presetsDataName);
        const aSelectedPresets = getIn(formik.values, selectedPresetsName);

        const sSectionName = aSelectedPresets[i_nSectionIdx].name;
        const oCurrPresetData = oPresets[sSectionName][i_sPresetID];

        const oInitWidgetData = {
            ...oCurrPresetData,
        };

        modalManager.openModal(modalTypes.WIDGET_PRESET_EDIT, {
            initWidgetData: oInitWidgetData,
            onConfirm: (i_oWidgetPresetData) => editWidgetPresetSubmitHandler(i_oWidgetPresetData, i_sPresetID),
        });
    };

    const editWidgetPresetSubmitHandler = (i_oWidgetPresetData, i_sID) => {
        const { name, type, metaData, customData } = i_oWidgetPresetData;

        const oPresets = getIn(formik.values, presetsDataName);

        const oUpdatedPresetData = {
            name,
            metaData, 
            customData
        };

        // Add widget preset locally
        const oUpdatedPresetsState = operations.editWidgetPreset({ presets: oPresets }, i_sID, type, oUpdatedPresetData, SAVE_TO_SERVER);
        formik.setFieldValue(presetsDataName, oUpdatedPresetsState.presets);

        // Push the new operation in
        pushNewOperation(availableOperations.EDIT_WIDGET_PRESET, i_sID, type, oUpdatedPresetData);
    };

    const removeWidgetPresetHandler = (i_nSectionIdx, i_sPresetID, i_nPresetIdx) => {
        const oPresets = getIn(formik.values, presetsDataName);
        const aSelectedPresets = getIn(formik.values, selectedPresetsName);

        const sSectionName = aSelectedPresets[i_nSectionIdx].name;

        // Remove the widget preset from the form state
        const oUpdatedPresets = update(oPresets, {
            [sSectionName]: { $unset: [i_sPresetID] }
        });
        formik.setFieldValue(presetsDataName, oUpdatedPresets);

        // Remove the widget preset from the selected form state
        const aUpdatedSelectedPresets = update(aSelectedPresets, {
            [i_nSectionIdx]: {
                items: { $splice: [[i_nPresetIdx, 1]] }
            }
        });
        formik.setFieldValue(selectedPresetsName, aUpdatedSelectedPresets);

        // Push the new operation in
        pushNewOperation(availableOperations.REMOVE_WIDGET_PRESET, i_sPresetID, sSectionName);
    };

    const renderWidgetItem = ({ sectionName, sectionIndex }, { item, itemIndex }) => {
        const oPresets = formik.values.presets;
        const oPreset = oPresets[sectionName][item.id];
        const sPresetName = (oPreset) ? oPreset.name : "";

        return sPresetName; 
    };

    const renderSectionTitle = (i_sSectionName) => {
        return (widgetBaseTypeNames[i_sSectionName]) ? widgetBaseTypeNames[i_sSectionName] : i_sSectionName;
    };

    return (
        <FormSection
            title={LANG_CONST.WIDGET_MANAGE_WIDGETS_TITLE}
            shrinkable={true}
            scrollable={true}
            displayBackground={false}

            { ...rest }

            disableExtensionItem={bClientFile}
            extensionItem={<IconButton><Add /></IconButton>}
            extensionItemOnClick={addWidgetPresetOpenHandler}
        >
            <MultiSectionCheckboxList
                name={selectedPresetsName}

                disableItemRemoval={bClientFile} 
                onItemRemove={removeWidgetPresetHandler}

                disableExtensionItems={bClientFile}
                extensionItem={<IconButton><Settings /></IconButton>}
                extensionItemOnClick={editWidgetPresetOpenHandler} 

                disabledAll={disabled}
                renderItem={renderWidgetItem}
                renderSectionTitle={renderSectionTitle}
            />
        </FormSection>
    );
};

WidgetPresetManagerModalFormSection.propTypes = {
    formik: PropTypes.object.isRequired,

    // Formik form state
    presetsDataName: PropTypes.string.isRequired,
    selectedPresetsName: PropTypes.string.isRequired,

    pushNewOperation: PropTypes.func.isRequired,
    generateWidgetPresetID: PropTypes.func.isRequired,

    disabled: PropTypes.bool,

    // Redux mappings
    systemInfo: PropTypes.object.isRequired,
};

WidgetPresetManagerModalFormSection.defaultProps = {
    disabled: false,
};

const mapStateToProps = (state) => ({
    systemInfo: state.present.general.systemInfo,
});

const mapDispatchToProps = (dispatch) => ({}); // Do nothing

export default connectRedux(mapStateToProps, mapDispatchToProps)(connectFormik(WidgetPresetManagerModalFormSection));

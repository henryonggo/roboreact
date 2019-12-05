import React, { Component } from "react";
import "./MarginalsConfigurationBaseModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { widgetBaseTypes, marginalWidgetBaseTypes } from "constants/widgets";
import widgetBaseTypeNames from "constants/widgets/widgetBaseTypesNames";
import { connect as connectRedux } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";
import { connect as connectFormik, getIn } from "formik";
import * as LANG_CONST from "constants/language";

import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";
import RenderWidgetCustomConfiguration from "components/widgets/RenderWidgetCustomConfiguration/RenderWidgetCustomConfiguration";
import ToggleSwitchField from "components/forms/ToggleSwitchField/ToggleSwitchField";

import FormSection from "components/forms/FormSection/FormSection";
import SelectField from "components/forms/SelectField/SelectField";

class MarginalsConfigurationBaseModal extends Component {
    constructor(props) {
        super(props);

        const { marginalType, widgetPresets, generalData } = props;
        
        const oMarginalData = generalData[marginalType];
        const oWidgetPresetData = widgetPresets[oMarginalData.presetType][oMarginalData.presetID];

        this.state = {
            initMarginalsData: {
                marginalConfig: {
                    enabled: oMarginalData.enabled, 
                    presetType: oMarginalData.presetType,
                },
    
                customData: {
                    ...(oWidgetPresetData.customData) ? oWidgetPresetData.customData : {}
                }
            }
        };
    }

    onConfirmHandler = async (values) => {
        const { marginalConfig, customData } = values;

        this.props.setMarginal(marginalConfig, customData);

        await Utilities.runAsyncFunctionsWithParams([marginalConfig, customData], this.props.onConfirm);
    };

    renderWidgetTypeDropdownItem = (i_sSectionName) => {
        return (widgetBaseTypeNames[i_sSectionName]) ? widgetBaseTypeNames[i_sSectionName] : i_sSectionName;
    };

    MarginalsConfigurationBaseModalFormSection = connectFormik((localProps) => {
        const { formik } = localProps;
    
        const asWidgetTypeOptions = Object.keys(widgetBaseTypes).filter(i_sBaseType => (
            marginalWidgetBaseTypes.indexOf(i_sBaseType) >= 0
        ));

        const bMarginalEnabled = getIn(formik.values, "marginalConfig.enabled");
    
        return (
            <>
                <FormSection
                    title={LANG_CONST.MARGINALS_CONFIG_BASE_CONFIG_TITLE}
                    autoSpace={true}
                    extensionItem={
                        <ToggleSwitchField 
                            name="marginalConfig.enabled" 
                        />
                    }
                >
                    <SelectField
                        title={LANG_CONST.MARGINALS_CONFIG_BASE_TYPE_TITLE}
                        name="marginalConfig.presetType"
                        options={asWidgetTypeOptions}
                        disabled={!bMarginalEnabled}
                        renderItem={this.renderWidgetTypeDropdownItem}
                    />
                </FormSection>

                {/* Render widget custom configuration component */}
                <RenderWidgetCustomConfiguration 
                    typeName="marginalConfig.presetType"
                    configName="customData"
                    initConfig={
                        !Utilities.isEmptyObject(this.state.initMarginalsData.customData) ?
                            this.state.initMarginalsData.customData :
                            undefined
                    }
                    disabled={!bMarginalEnabled}
                />
            </>
        );
    });
    
    render() {
        const { ...rest } = this.props;

        return (
            <ConfirmModal
                { ...rest }
                initialValues={this.state.initMarginalsData}
    
                confirmText={LANG_CONST.SAVE_BTN_TEXT}
                onConfirm={this.onConfirmHandler}
                useFlexbox={true}
            >
                <this.MarginalsConfigurationBaseModalFormSection />
            </ConfirmModal>
        );
    }
}

MarginalsConfigurationBaseModal.propTypes = {
    marginalType: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,

    // Passed redux maps
    setMarginal: PropTypes.func.isRequired,

    // Mapped redux state
    generalData: PropTypes.object.isRequired,
    widgetPresets: PropTypes.object.isRequired,
    addWidgetPreset: PropTypes.func.isRequired,
    editWidgetPreset: PropTypes.func.isRequired,
    removeWidgetPreset: PropTypes.func.isRequired,
};

MarginalsConfigurationBaseModal.defaultProps = {

};

const mapStateToProps = (state) => ({
    generalData: state.present.general,
    widgetPresets: state.present.widget.presets
});

const mapDispatchToProps = (dispatch) => ({
    ...Utilities.mapDispatchToPropsHelper(dispatch, {
        addWidgetPreset: actionTypes.widget.ADD_WIDGET_PRESET,
        editWidgetPreset: actionTypes.widget.EDIT_WIDGET_PRESET,
        removeWidgetPreset: actionTypes.widget.REMOVE_WIDGET_PRESET
    })
});

export default connectRedux(mapStateToProps, mapDispatchToProps)(MarginalsConfigurationBaseModal);
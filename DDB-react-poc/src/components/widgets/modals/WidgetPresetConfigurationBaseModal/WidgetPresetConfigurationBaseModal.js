import React, { Component } from "react";
import "./WidgetPresetConfigurationBaseModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { widgetBaseTypes, systemWidgetBaseTypes } from "constants/widgets";
import widgetBaseTypeNames from "constants/widgets/widgetBaseTypesNames";
import * as Yup from "yup";
import * as LANG_CONST from "constants/language";

import RenderWidgetCustomConfiguration from "components/widgets/RenderWidgetCustomConfiguration/RenderWidgetCustomConfiguration";

import FormSection from "components/forms/FormSection/FormSection";
import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";
import TagListFormSection from "components/forms/TagListFormSection/TagListFormSection";

import TextField from "components/forms/InputField/TextField/TextField";
import SelectField from "components/forms/SelectField/SelectField";
import CheckboxField from "components/forms/CheckboxField/CheckboxField";


const INIT_WIDGET_DATA = {
    name: "",
    type: widgetBaseTypes.HTML_CONTAINER_WIDGET,
    metaData: {
        description: "",
        hidden: false,
        tags: "",
    },
    customData: {},
};

const WidgetConfigSchema = Yup.object().shape({
    name: Yup.string().required(LANG_CONST.WIDGET_NAME_MISSING_ERR),
    type: Yup.string(),
    metaData: Yup.object({
        description: Yup.string(),
        hidden: Yup.bool(),
        tags: Yup.string(),
    }),
    customData: Yup.object(),
});

export class WidgetPresetConfigurationBaseModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initWidgetData: {
                ...INIT_WIDGET_DATA,
                ...props.initWidgetData
            },
        };
    }

    onConfirmHandler = async (values, actions) => {
        const oWidgetPresetData = {
            ...values,
        };

        await Utilities.runAsyncFunctionsWithParams([oWidgetPresetData], this.props.onConfirm);
    };

    renderWidgetTypeDropdownItem = (i_sSectionName) => {
        return (widgetBaseTypeNames[i_sSectionName]) ? widgetBaseTypeNames[i_sSectionName] : i_sSectionName;
    };

    render() {
        const { className, lockWidgetType, ...rest } = this.props;

        // Filter out any system widget base types
        const asWidgetTypeOptions = Object.keys(widgetBaseTypes).filter(i_sBaseType => (
            systemWidgetBaseTypes.indexOf(i_sBaseType) < 0
        ));

        return (
            <ConfirmModal
                {...rest}

                // Formik props
                initialValues={this.state.initWidgetData}
                validationSchema={WidgetConfigSchema}

                className={Utilities.injectClassNames(className, "WidgetPresetConfigurationBaseModal")}
                useFlexbox={true}

                onConfirm={this.onConfirmHandler}
            >

                <FormSection
                    title={LANG_CONST.WIDGET_CONFIG_INFO_TITLE}
                    autoSpace={true}
                >
                    <TextField title={LANG_CONST.WIDGET_CONFIG_NAME_TITLE} name="name" />
                    <TextField title={LANG_CONST.WIDGET_CONFIG_DESCRIPTION_TITLE} name="metaData.description" />
                    <CheckboxField
                        title={LANG_CONST.WIDGET_CONFIG_HIDDEN_TITLE}
                        name="metaData.hidden"
                        description={LANG_CONST.WIDGET_CONFIG_HIDDEN_DESCRIPTION}
                    />

                    <TagListFormSection
                        name="metaData.tags"
                        className="WidgetPresetConfigurationBaseModal__tags-section"
                    />

                    <SelectField
                        title={LANG_CONST.WIDGET_CONFIG_WIDGET_TYPE_TITLE}
                        name="type"
                        options={asWidgetTypeOptions}
                        disabled={lockWidgetType}
                        renderItem={this.renderWidgetTypeDropdownItem}
                    />

                </FormSection>


                {/* Render widget custom configuration component */}
                <RenderWidgetCustomConfiguration 
                    typeName="type"
                    configName="customData"
                    initConfig={
                        !Utilities.isEmptyObject(this.state.initWidgetData.customData) ?
                            this.state.initWidgetData.customData :
                            undefined
                    }
                />

            </ConfirmModal>
        );
    }
}

WidgetPresetConfigurationBaseModal.propTypes = {
    initWidgetData: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        metaData: PropTypes.shape({
            description: PropTypes.string,
            hidden: PropTypes.bool,
            tags: PropTypes.string,
        }),
        customData: PropTypes.object,
    }),
    onConfirm: PropTypes.func,
    lockWidgetType: PropTypes.bool,
};

WidgetPresetConfigurationBaseModal.defaultProps = {
    lockWidgetType: false,
};

export default WidgetPresetConfigurationBaseModal;
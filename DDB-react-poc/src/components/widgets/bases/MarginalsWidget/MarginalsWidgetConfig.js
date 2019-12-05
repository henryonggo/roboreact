import React from "react";
import "./MarginalsWidgetConfig.scss";
import PropTypes from "prop-types";
import { connect as connectFormik, getIn } from "formik";
import * as LANG_CONST from "constants/language";

import FormSection from "components/forms/FormSection/FormSection";
import TextField from "components/forms/InputField/TextField/TextField";
import YearNumberField from "components/forms/InputField/YearNumberField/YearNumberField";
import FileField from "components/forms/InputField/FileField/FileField";
import CheckboxField from "components/forms/CheckboxField/CheckboxField";
import BaseWidgetConfig from "components/widgets/bases/BaseWidgetConfig";

const DEFAULT_CONFIG = {
    __mappings__: {
        rawFileLocation: "logo.rawFileLocation",
        fileLocation: "logo.fileLocation"
    },
    title: LANG_CONST.MARGINALS_WIDGET_TITLE_DEFAULT,
    displayTemplateName: true, 
    displayCurrentDate: true,
    copyrightOwner: LANG_CONST.MARGINALS_WIDGET_COMPANY_NAME_DEFAULT,
    copyrightUseCurrentYear: true,
    copyrightYear: null,
    logo: {
        rawFileLocation: "",
        fileLocation: "",
    }
};

const MarginalsWidgetConfig = (props) => {
    const { formik, name, initConfig, disabled, ...rest } = props;

    const oInitConfig = (initConfig) ? { ...DEFAULT_CONFIG, ...initConfig } : DEFAULT_CONFIG;
    const bUseCurrentYear = getIn(formik.values, `${name}.copyrightUseCurrentYear`);

    return (
        <BaseWidgetConfig
            { ...rest }
            name={name}
            initConfig={oInitConfig}
        >
            <FormSection 
                title={LANG_CONST.MARGINALS_WIDGET_GENERAL_TITLE}
                className="MarginalsWidgetConfig__general-section"
                autoSpace={true}
            >
                <TextField 
                    title={LANG_CONST.MARGINALS_WIDGET_TITLE_TITLE}
                    name={`${name}.title`}
                    disabled={disabled}
                />
                <CheckboxField
                    title={LANG_CONST.MARGINALS_WIDGET_TEMPLATE_NAME_TITLE}
                    name={`${name}.displayTemplateName`}
                    description={LANG_CONST.MARGINALS_WIDGET_TEMPLATE_NAME_DESCRIPTION}
                    disabled={disabled}
                />
                <CheckboxField
                    title={LANG_CONST.MARGINALS_WIDGET_CURR_DATE_TITLE}
                    name={`${name}.displayCurrentDate`}
                    description={LANG_CONST.MARGINALS_WIDGET_CURR_DATE_DESCRIPTION}
                    disabled={disabled}
                />
            </FormSection>

            <FormSection 
                title={LANG_CONST.MARGINALS_WIDGET_COPYRIGHT_TITLE}
                className="MarginalsWidgetConfig__copyright-section"
                autoSpace={true}
            >
                <TextField 
                    title={LANG_CONST.MARGINALS_WIDGT_COPYRIGHT_OWNER_TITLE}
                    name={`${name}.copyrightOwner`}
                    disabled={disabled}
                />
                <CheckboxField
                    title={LANG_CONST.MARGINALS_WIDGET_CURR_YEAR_TITLE}
                    name={`${name}.copyrightUseCurrentYear`}
                    description={LANG_CONST.MARGINALS_WIDGET_CURR_YEAR_DESCRIPTION}
                    disabled={disabled}
                />
                <YearNumberField 
                    title={LANG_CONST.MARGINALS_WIDGET_COPYRIGHT_YEAR_TITLE}
                    name={`${name}.copyrightYear`}
                    titleWidth="30%"
                    defaultToCurrentYear={true}
                    disabled={disabled || bUseCurrentYear}
                />
            </FormSection>

            <FormSection 
                title={LANG_CONST.MARGINALS_WIDGET_LOGO_TITLE}
                className="MarginalsWidgetConfig__logo-section"
                autoSpace={true}
            >
                <FileField 
                    title={LANG_CONST.MARGINALS_WIDGET_IMAGE_TITLE}
                    name={`${name}.logo.rawFileLocation`}
                    filter={`${LANG_CONST.IMAGE_FILES_TEXT}|*.png;*.jpg;*.jpeg`}
                    disabled={disabled}
                />
            </FormSection>
        </BaseWidgetConfig>
    );
};

MarginalsWidgetConfig.propTypes = {
    formik: PropTypes.object.isRequired,

    // Formik props
    name: PropTypes.string.isRequired, // Points to the custom config object
    initConfig: PropTypes.object,
    disabled: PropTypes.bool,
};

MarginalsWidgetConfig.defaultProps = {
    disabled: false
};

export default connectFormik(MarginalsWidgetConfig);
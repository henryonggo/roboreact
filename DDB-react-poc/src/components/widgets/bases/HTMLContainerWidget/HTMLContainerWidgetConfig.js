import React from "react";
import "./HTMLContainerWidgetConfig.scss";
import PropTypes from "prop-types";
import * as LANG_CONST from "constants/language";

import FormSection from "components/forms/FormSection/FormSection";
import FileField from "components/forms/InputField/FileField/FileField";
import BaseWidgetConfig from "components/widgets/bases/BaseWidgetConfig";

const DEFAULT_CONFIG = {
    __mappings__: {
        rawFileLocation: "rawFileLocation",
        fileLocation: "fileLocation"
    },
    rawFileLocation: null,
    fileLocation: null,
};

const HTMLContainerWidgetConfig = (props) => {
    const { name, initConfig, disabled, ...rest } = props;

    const oInitConfig = (initConfig) ? initConfig : DEFAULT_CONFIG;

    return (
        <BaseWidgetConfig
            { ...rest } 
            name={name}
            initConfig={oInitConfig}
        >
            <FormSection
                title={LANG_CONST.HTML_CONTAINER_WIDGET_CONFIG_TITLE}
                className="HTMLContainerWidgetConfig"
            >
                <FileField 
                    title={LANG_CONST.FILE_PATH_TEXT}
                    name={`${name}.rawFileLocation`}
                    filter={`${LANG_CONST.WEBPAGE_FILES_TEXT}|*.html;*.csp`}
                    disabled={disabled}
                />
            </FormSection>
        </BaseWidgetConfig>
    );
};

HTMLContainerWidgetConfig.propTypes = {
    // Formik props
    name: PropTypes.string.isRequired, // Points to the custom config object
    initConfig: PropTypes.object,
    disabled: PropTypes.bool
};

HTMLContainerWidgetConfig.defaultProps = {
    disabled: false
};

export default HTMLContainerWidgetConfig;

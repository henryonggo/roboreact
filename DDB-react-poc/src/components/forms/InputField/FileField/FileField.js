import React from "react";
import "./FileField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { requestManager } from "managers";
import * as LANG_CONST from "constants/language";

import { connect as connectFormik } from "formik";

import TextField from "components/forms/InputField/TextField/TextField";

import { Folder } from "@material-ui/icons";

const FileField = (props) => {
    const { formik, disabled, filter, className, name, ...rest } = props;
    const sClasses = Utilities.injectClassNames("FileField", className);

    const openFilePicker = async () => {
        if (!requestManager.inCWEnv()) {
            console.warn(LANG_CONST.ENV_FEATURE_UNSUPPORTED_WARNING);
            return;
        }

        try {
            const ret = await requestManager.openFileDialog("", LANG_CONST.SELECT_FILE_MSG, filter);

            const sFilePath = ret.data.message;

            if (sFilePath) {
                updateFileLocation(sFilePath);
            }

        } catch(err) { // User cancels
            // Do nothing
        } 
    };

    const updateFileLocation = (i_sFilePath) => {
        // Update form state
        formik.setFieldValue(name, i_sFilePath);
    };

    const renderFileSelect = () => {
        const sDisabledClass = (disabled) ? "disabled" : null;
        const sFileSelectClasses = Utilities.injectClassNames("FileField__file-select-button", sDisabledClass);

        return (
            <button 
                type="button"
                className={sFileSelectClasses}
                onClick={openFilePicker}
            >
                <Folder />
            </button>
        );
    };

    return (
        <TextField 
            { ...rest }

            className={sClasses}
            type="text"
            name={name}
            disabled={disabled}

            suffixRender={renderFileSelect}
            suffixClassName="FileField__file-select"
            suffixWidth="3rem"
        />
    );
};

FileField.propTypes = {
    formik: PropTypes.object.isRequired,

    // Formik form state
    name: PropTypes.string.isRequired, // Points to file path string

    className: PropTypes.string,
    filter: PropTypes.string,
    disabled: PropTypes.bool,
};

FileField.defaultProps = {
    filter: `${LANG_CONST.ALL_FILES_MSG} (*.*)|*.*`,
    disabled: false,
};

export default connectFormik(FileField);

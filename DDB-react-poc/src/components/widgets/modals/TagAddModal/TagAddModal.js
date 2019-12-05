import React from "react";
import "./TagAddModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import * as LANG_CONST from "constants/language";

import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";

import TextField from "components/forms/InputField/TextField/TextField";
import * as Yup from "yup";

const TagSchema = Yup.object().shape({
    tagName: Yup.string()
        .required(LANG_CONST.TAG_NAME_REQUIRED_ERR)
        .matches(/^[a-z0-9]+$/i, LANG_CONST.TAG_NAME_ALPHANUMERIC_ERR)
});

const TagAddModal = (props) => {
    const { onConfirm, initTagName, ...rest} = props;

    const onSubmitHandler = (values, actions) => {
        Utilities.runFunctionsWithParams([values, actions], onConfirm);
    };

    const initTagData = {
        tagName: initTagName
    };

    return (
        <ConfirmModal
            {...rest}

            // Formik props
            initialValues={initTagData}
            validationSchema={TagSchema}

            title={LANG_CONST.TAG_ADD_TITLE}
            confirmText={LANG_CONST.ADD_BTN_TEXT}
            cancelText={LANG_CONST.CANCEL_BTN_TEXT}
            onConfirm={onSubmitHandler}
        >
            <TextField title={LANG_CONST.TAG_ADD_TAG_NAME_TITLE} name="tagName"/>
        </ConfirmModal>
    );
};

TagAddModal.propTypes = {
    initTagName: PropTypes.string,
    onConfirm: PropTypes.func,
};

TagAddModal.defaultProps = {
    initTagName: ""
};

export default TagAddModal;
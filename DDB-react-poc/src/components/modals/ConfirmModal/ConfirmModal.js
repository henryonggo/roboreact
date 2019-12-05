import React from "react";
import "./ConfirmModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import * as LANG_CONST from "constants/language";

import FormBaseModal from "components/modals/FormBaseModal/FormBaseModal";
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import PrimaryLoaderButton from "components/ui/button/PrimaryLoaderButton/PrimaryLoaderButton";

// class ConfirmModal extends Component {
const ConfirmModal = (props) => {
    const { className, confirmText, cancelText, onCancel, children, ...rest } = props;
    const sClasses = Utilities.injectClassNames(className, "ConfirmModal");

    const renderConfirmButton = (subProps) => {
        const { isSubmitting } = subProps;
        
        return (
            <PrimaryLoaderButton
                className="ConfirmModal__button"
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
            >
                { confirmText }
            </PrimaryLoaderButton>
        );
    };

    const renderCancelButton = (subProps) => {
        const { isSubmitting } = subProps;

        return (
            <PrimaryButton
                className="ConfirmModal__button"
                onClick={(e) => {
                    e.preventDefault();
                    Utilities.runFunctions(onCancel, rest.onRequestClose);
                }}
                disabled={isSubmitting}
            >
                { cancelText }
            </PrimaryButton>
        );
    };

    return (
        <FormBaseModal
            { ...rest }
            className={sClasses}
            actionComponents={[renderConfirmButton, renderCancelButton]}
            onCancel={onCancel}
        >
            { children }
        </FormBaseModal>
    );
};

ConfirmModal.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
};

ConfirmModal.defaultProps = {
    confirmText: `${LANG_CONST.CONFIRMATION_BTN_TEXT}`,
    cancelText: `${LANG_CONST.CANCEL_BTN_TEXT}`,
};

export default ConfirmModal;
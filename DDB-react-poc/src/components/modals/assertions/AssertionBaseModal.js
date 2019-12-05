import React from "react";
import "./AssertionBaseModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import * as LANG_CONST from "constants/language";

import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import FormBaseModal from "components/modals/FormBaseModal/FormBaseModal";

const AssertionBaseModal = (props) => {
    const { children, title, confirmText, icon, className, ...rest} = props;
    const sClasses = Utilities.injectClassNames(className, "AssertionBaseModal");

    const titleFormated = (
        <div className="AssertionBaseModal__title">
            {icon}
            <div className="AssertionBaseModal__title-text">{title}</div>
        </div>
    );

    const renderConfirmButton = (subProps) => {
        const { isSubmitting } = subProps;

        return (
            <PrimaryButton 
                className="AssertionBaseModal__button" 
                type="submit" 
                disabled={isSubmitting}
            >
                { confirmText }
            </PrimaryButton>
        );
    };

    return (
        <FormBaseModal
            { ...rest }
            title={titleFormated}
            className={sClasses}
            actionComponents={[renderConfirmButton]}
        >
            { children }
        </FormBaseModal>
    );
};

AssertionBaseModal.propTypes = {
    icon: PropTypes.node,
    confirmText: PropTypes.node,
    onConfirm: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

AssertionBaseModal.defaultProps = {
    icon: null,
    confirmText: `${LANG_CONST.CONFIRMATION_BTN_TEXT}`,
};

export default AssertionBaseModal;
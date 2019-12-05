import React from "react";
import "./CloseButton.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { Close } from "@material-ui/icons";

const CloseButton = (props) => {
    const { className, disabled, onClick, ...rest } = props;
    const sModifierClasses = (disabled) ? "disabled" : null;
    const sClasses = Utilities.injectClassNames("CloseButton", className, sModifierClasses);

    return (
        <Close 
            { ...rest }
            className={sClasses} 
            onClick={onClick}
        />
    );
};

CloseButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

CloseButton.defaultProps = {
    disabled: false
};

export default CloseButton;

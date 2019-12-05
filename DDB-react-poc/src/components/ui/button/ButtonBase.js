import React from "react";
import "./ButtonBase.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

const ButtonBase = (props) => {
    const { className, disabled, onClick, ...rest } = props;

    const sDisabledModifier = (disabled) ? "disabled" : "";
    const sClassname = Utilities.injectClassNames(className, "ButtonBase", sDisabledModifier);

    return (
        <button 
            { ...rest }
            onClick={onClick} 
            className={sClassname}
        >
            {props.children}
        </button>
    );
};

ButtonBase.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};


ButtonBase.defaultProps = {
    disabled: false,
};

export default ButtonBase;
import React from "react";
import "./PrimaryButton.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import ButtonBase from "components/ui/button/ButtonBase";

const PrimaryButton = (props) => {
    const { className,  ...rest } = props;

    const sClasses = Utilities.injectClassNames(className, "PrimaryButton");

    return (
        <ButtonBase 
            {...rest}
            className={sClasses}
        >
            { props.children }
        </ButtonBase>
    );
};

PrimaryButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default PrimaryButton;

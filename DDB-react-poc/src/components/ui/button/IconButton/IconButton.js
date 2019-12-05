import React from "react";
import "./IconButton.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

const IconButton = (props) => {
    const { className, tag, disabled, children, ...rest } = props;
    const sDisabledClass = (disabled) ? "disabled" : null;
    const sClasses = Utilities.injectClassNames("IconButton", className, sDisabledClass);

    const ContainerElement = tag;

    return (
        <ContainerElement 
            { ...rest }
            className={sClasses}
        >
            { children }
        </ContainerElement>
    );
};

IconButton.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tag: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

IconButton.defaultProps = {
    disabled: false,
    tag: "div"
};

export default IconButton;

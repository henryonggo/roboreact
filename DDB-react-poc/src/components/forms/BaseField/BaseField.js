import React from "react";
import "./BaseField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { ErrorMessage } from "formik";

const BaseField = (props) => {
    const { className, containerClassName, errorClassName, errorTag, name, children } = props;
    const sClasses = Utilities.injectClassNames("BaseField", className);
    const sContainerClasses = Utilities.injectClassNames("BaseField__container", containerClassName);
    const sErrorClasses = Utilities.injectClassNames("BaseField__error-message", errorClassName);

    return (
        <div className={sClasses}>
            <ErrorMessage 
                className={sErrorClasses}
                component={errorTag}
                name={name}
            />
            <div className={sContainerClasses}>
                { children }
            </div>
        </div>
    );
};

BaseField.propTypes = {
    // Formik form state
    name: PropTypes.string.isRequired,

    className: PropTypes.string,
    containerClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    errorTag: PropTypes.string,

    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

BaseField.defaultProps = {
    errorTag: "div"
};

export default BaseField;

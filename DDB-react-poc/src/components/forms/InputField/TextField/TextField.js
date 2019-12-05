import React from "react";
import "./TextField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import InputField from "components/forms/InputField/InputField";

const TextField = (props) => {
    const { className, name, type, ...rest } = props;
    const sClasses = Utilities.injectClassNames("TextField", className);

    return (
        <InputField 
            { ...rest }

            className={sClasses}
            name={name}
            type={type}
        />
    );
};

TextField.propTypes = {
    // Formik form state
    name: PropTypes.string.isRequired,

    className: PropTypes.string,
    type: PropTypes.oneOf(["text", "password", "email"]),
};

TextField.defaultProps = {
    type: "text"
};

export default TextField;

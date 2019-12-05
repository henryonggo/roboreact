import React, { Component } from "react";
import "./ToggleSwitchField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { connect as connectFormik, getIn } from "formik";

import { Field } from "formik";

class ToggleSwitchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: Utilities.generateUniqueID("ToggleSwitchField")
        };
    }

    render() {
        const { id } = this.state;
        const { formik, className, name, disabled, ...rest } = this.props;

        const sDisabledClass = (disabled) ? "disabled": null;
        const sClasses = Utilities.injectClassNames("ToggleSwitchField", sDisabledClass, className);

        const bSelected = getIn(formik.values, name);

        return (
            <>
                <Field 
                    { ...rest }
                    id={id}
                    className="ToggleSwitchField__checkbox"
                    name={name}
                    type="checkbox"
                    checked={bSelected} // Note: this is needed to bind the initial selected value
                    disabled={disabled}
                />
                <label
                    className={sClasses}
                    htmlFor={id}
                >
                    <label 
                        className="ToggleSwitchField__handle"
                        htmlFor={id}
                    >
                    </label>
                </label>
            </>
        );
    }
}

ToggleSwitchField.propTypes = {
    // Formik props
    name: PropTypes.string.isRequired, // Points to boolean value
    className: PropTypes.string,
    disabled: PropTypes.bool,

    formik: PropTypes.object.isRequired,
};

ToggleSwitchField.defaultProps = {
    disabled: false,
};

export default connectFormik(ToggleSwitchField);

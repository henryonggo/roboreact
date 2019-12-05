import React, { Component } from "react";
import "./CheckboxField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import CustomValidators from "utilities/customValidators";
import { connect as connectFormik, getIn } from "formik";

import { Field } from "formik";

class CheckboxField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: Utilities.generateUniqueID("CheckboxField")
        };
    }

    render() {
        const { id } = this.state;
        const { formik, className, name, disabled, description, title, titleWidth, ...rest } = this.props;

        const sDisabledClass = (disabled) ? "disabled": null;
        const sClasses = Utilities.injectClassNames("CheckboxField", sDisabledClass, className);

        const oTitleContainerStyles = {
            width: titleWidth
        };

        const bChecked = getIn(formik.values, name);

        return (
            <>
                <Field 
                    { ...rest }
                    id={id}
                    className="CheckboxField__checkbox"
                    name={name}
                    type="checkbox"
                    checked={bChecked} // Note: this is needed to bind the initial checkbox value
                    disabled={disabled}
                />
                <label htmlFor={id} className={sClasses}>
                    <label
                        className={"CheckboxField__title-container"}
                        style={oTitleContainerStyles}
                        htmlFor={id}
                    >
                        <label 
                            className={"CheckboxField__custom-checkbox"} 
                            htmlFor={id}
                        />
                        <label htmlFor={id} className="CheckboxField__title">
                            { title }
                        </label>
                    </label>
                    <label
                        className="Checkbox__description"
                        htmlFor={id}
                    >
                        { description }
                    </label>
                </label>
            </>
        );
    }
}

CheckboxField.propTypes = {
    // Formik props
    name: PropTypes.string.isRequired, // Points to boolean value

    description: PropTypes.string,
    disabled: PropTypes.bool,

    className: PropTypes.string,
    title: PropTypes.string,
    titleWidth: CustomValidators.CSSLength,

    formik: PropTypes.object.isRequired,
};

CheckboxField.defaultProps = {
    title: "",
    description: "",
    titleWidth: "30%",
    disabled: false,
};

export default connectFormik(CheckboxField);

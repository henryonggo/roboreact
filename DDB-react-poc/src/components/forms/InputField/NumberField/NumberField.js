import React, { Component } from "react";
import "./NumberField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import CustomValidators from "utilities/customValidators";

import InputField from "components/forms/InputField/InputField";

export class NumberField extends Component {
    render() {
        const { className, minValue, maxValue, ...rest } = this.props;

        const sClasses = Utilities.injectClassNames(className, "NumberField");

        return (
            <InputField 
                { ...rest }
                className={sClasses}
                type="number"
                min={minValue}
                max={maxValue}
            />
        );
    }
}

NumberField.propTypes = {
    className: PropTypes.string,
    titleWidth: CustomValidators.CSSLength,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
};

NumberField.defaultProps = {
    titleWidth: "65%",
    minValue: null,
    maxValue: null,
};

export default NumberField;

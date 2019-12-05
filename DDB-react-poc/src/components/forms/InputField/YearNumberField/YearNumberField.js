import React, { Component } from "react";
import PropTypes from "prop-types";
import NumberField from "components/forms/InputField/NumberField/NumberField";
import { connect as connectFormik, getIn } from "formik";

export class YearNumberField extends Component {
    componentDidMount() {
        const { formik, name, defaultToCurrentYear } = this.props;
        const nameVal = getIn(formik.values, name);
        const sCurrYear = (new Date()).getFullYear();
        
        if (defaultToCurrentYear && !nameVal) {
            formik.setFieldValue(name, sCurrYear);
        }
    }

    render() {
        const { defaultToCurrentYear, ...rest } = this.props;

        return (
            <NumberField 
                { ...rest }
            /> 
        );
    }
}

YearNumberField.propTypes = {
    // Fomik provided props
    formik: PropTypes.object.isRequired,

    // Formik form state
    name: PropTypes.string.isRequired, // Points to a number/string

    defaultToCurrentYear: PropTypes.bool,
};

YearNumberField.defaultProps = {
    defaultToCurrentYear: false
};

export default connectFormik(YearNumberField);

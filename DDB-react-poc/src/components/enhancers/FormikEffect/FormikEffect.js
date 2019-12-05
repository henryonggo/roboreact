import { Component } from "react";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { connect as connectFormik } from "formik";

/**
 * Listens to changes in the formik state when used in a Formik form component.
 */
class FormikEffect extends Component {
    componentDidUpdate(prevProps) {
        const { values, touched, errors, isSubmitting } = this.props.formik;
        const {
            values: prevValues,
            touched: prevTouched,
            errors: prevErrors,
            isSubmitting: prevIsSubmitting,
        } = prevProps.formik;

        const bChanged = Utilities.symmetricDifference(
            Object.values(prevProps.formik),
            Object.values(this.props.formik)).length > 0;

        if (bChanged) {
            this.props.onChange(
                {
                    values: prevValues,
                    touched: prevTouched,
                    errors: prevErrors,
                    isSubmitting: prevIsSubmitting,
                },
                {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                }
            );
        }
    }

    render() {
        return null;
    }
}

FormikEffect.propTypes = {
    onChange: PropTypes.func.isRequired,
    formik: PropTypes.object.isRequired,
};

export default connectFormik(FormikEffect);
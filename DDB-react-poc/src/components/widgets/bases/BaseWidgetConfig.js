import { Component } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";

import { connect as connectFormik, getIn } from "formik";

class BaseWidgetConfig extends Component {
    constructor(props) {
        super(props);
        this.initCustomData(props);
    }

    initCustomData(props) {

        const { formik, name, initConfig } = props;

        const oCustomData = getIn(formik.values, name);

        const oUpdatedCustomData = update(oCustomData, {
            $set: { ...initConfig }
        });

        formik.setFieldValue(name, oUpdatedCustomData);
    }

    render() {
        return this.props.children;
    }
}

BaseWidgetConfig.propTypes = {
    // Formik props
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired, // Points to the custom config object

    initConfig: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

BaseWidgetConfig.defaultProps = {
    initConfig: {}
};

export default connectFormik(BaseWidgetConfig);

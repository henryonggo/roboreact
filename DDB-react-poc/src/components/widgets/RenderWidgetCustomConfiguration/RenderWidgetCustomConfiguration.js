import { Component } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { connect as connectFormik, getIn } from "formik";
import { widgetManager } from "managers";

class RenderWidgetCustomConfiguration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderComponent: false
        };
    }

    componentDidUpdate() {
        // Render custom config once all children have been rendered
        // This is so formik has time to setup its context 
        if (!this.state.renderComponent) {
            this.setState(prevState => (
                update(prevState, {
                    renderComponent: { $set: true }
                })
            ));
        }
    }

    render() {
        if (!this.state.renderComponent) {
            return null;
        }

        const { formik, initConfig, typeName, configName, ...rest } = this.props;
        const sType = getIn(formik.values, typeName);

        return (
            widgetManager.getWidgetBaseConfigurationComponent(sType, { name: configName, initConfig, ...rest })
        );
    }
}

RenderWidgetCustomConfiguration.propTypes = {
    initConfig: PropTypes.object,
    typeName: PropTypes.string,
    configName: PropTypes.string, // Points to custom data config object

    // Mapped fomik props
    formik: PropTypes.object.isRequired,
};

RenderWidgetCustomConfiguration.defaultProps = {
    typeName: "type",
    configName: "customData"
};

export default connectFormik(RenderWidgetCustomConfiguration);
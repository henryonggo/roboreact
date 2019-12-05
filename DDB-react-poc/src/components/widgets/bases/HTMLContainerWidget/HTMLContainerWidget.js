import React, { Component } from "react";
import "./HTMLContainerWidget.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { connect } from "react-redux";
import { HTML_CONTAINER_WIDGET } from "constants/widgets/widgetBaseTypes";

const IFRAME_TITLE_PREFIX = "HTML_CONTAINER-";

export class HTMLContainerWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Generate a unique title for the iFrame
            title: `${IFRAME_TITLE_PREFIX}${Utilities.generateUniqueID()}`
        };
    }

    render() {
        const { widgetPresets, widgetPresetID } = this.props;
        const { title } = this.state;

        const widgetPreset = widgetPresets[widgetPresetID];

        // In case that the widget preset is removed
        // (this accounts for some lingering render cycles)
        if (!widgetPreset) {
            return null;
        }

        const { fileLocation } = widgetPreset.customData;
        return (
            <div className="HTMLContainerWidget">
                <iframe className="HTMLContainerWidget" width="100%" height="100%" title={title} src={fileLocation}></iframe>
            </div>
        );
    }
}

HTMLContainerWidget.propTypes = {
    widgetPresetID: PropTypes.string.isRequired,

    // Mapped store state
    widgetPresets: PropTypes.object.isRequired,
};

HTMLContainerWidget.defaultProps = {
    
};

const mapStateToProps = (state) => {
    return {
        widgetPresets: state.present.widget.presets[HTML_CONTAINER_WIDGET],
    };
};

const mapDispatchToProps = () => { // Do nothing
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HTMLContainerWidget);

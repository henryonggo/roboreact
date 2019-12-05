import React from "react";
import "./MarginalRenderer.scss";
import PropTypes from "prop-types";
import { widgetManager } from "managers";
import Utilities from "utilities";
import CustomValidators from "utilities/customValidators";
import { marginalRenderStyles } from "constants/marginals";

const MarginalsRenderer = (props) => {
    const { className, data, maxHeight } = props;
    const sClasses = Utilities.injectClassNames(className, "MarginalRenderer");

    const DEFAULT_STYLES = {
        maxHeight: maxHeight, 
        height: "100%"
    }

    const renderMarginal = () => {
        // Do not render until header data is added in
        if (!data) {
            return null; 
        }

        const oCustomStyles = marginalRenderStyles[data.presetType]; 
        // Apply any custom styles that the current widget may have, if not use the default
        const oStyles = oCustomStyles ? { ...DEFAULT_STYLES, ...oCustomStyles } : { ...DEFAULT_STYLES };
        
        const MarginalsComponent = widgetManager.getWidgetBaseComponent(data.presetType);

        return (
            <div 
                className={sClasses}
                style={oStyles}
            >
                <MarginalsComponent widgetPresetID={data.presetID} />
            </div>            
        );
    };

    return renderMarginal();
};

MarginalsRenderer.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
    maxHeight: CustomValidators.CSSLength,
};

MarginalsRenderer.defaultProps = {
    maxHeight: "5rem"
};

export default MarginalsRenderer;

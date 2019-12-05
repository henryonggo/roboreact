import React, { Component } from "react";
import "./MarginalsWidget.scss";
import PropTypes from "prop-types";
import { connect as connectRedux } from "react-redux";
import { MARGINALS_WIDGET } from "constants/widgets/widgetBaseTypes";
import * as LANG_CONST from "constants/language";
import { requestManager } from "managers";

import defaultLogo from "assets/images/Audit.png";

class MarginalsWidget extends Component {
    constructor(props) {
        super(props);

        this.oToday = new Date();
        this.oDateOptions =  { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        this.sCurrDate = this.oToday.toLocaleDateString("en-US", this.oDateOptions);
    }

    render() {
        const { widgetPresets, widgetPresetID, systemInfo } = this.props;
        const widgetPreset = widgetPresets[widgetPresetID];

        // In case that the widget preset is removed
        // (this accounts for some lingering render cycles)
        if (!widgetPreset) {
            return null;
        }

        const { title, displayTemplateName, displayCurrentDate, copyrightOwner, 
            copyrightUseCurrentYear, copyrightYear, logo } = widgetPreset.customData;

        const bInCVEnv = requestManager.inCWEnv();
        const sTemplateNameString = (systemInfo && systemInfo.templateName) ? systemInfo.templateName : (!bInCVEnv) ? LANG_CONST.MARGINALS_WIDGET_BROWSER_DEMO_TEXT : null;
    
        const slogoPath = (logo.fileLocation) ? logo.fileLocation : defaultLogo;
        const sTemplateName = (displayTemplateName) ? sTemplateNameString : null;
        const sCopyRightYear = (copyrightUseCurrentYear) ? (new Date().getFullYear()) : copyrightYear;
        const sDateDisplay = (displayCurrentDate) ? this.sCurrDate : null;

        return (
            <div className="MarginalsWidget">
                <div className="MarginalsWidget__main">
                    <img className="MarginalsWidget__logo" src={slogoPath} alt=""/>
                    <div className="MarginalsWidget__title">{title}</div>
                    <div className="MarginalsWidget__template-type">&nbsp; {sTemplateName} </div>
                    <div className="MarginalsWidget__copyright">&copy; {sCopyRightYear}&nbsp;{copyrightOwner}</div> 
                </div>
                <div className="MarginalsWidget__date">
                    {sDateDisplay}
                </div>
            </div>
        );
    }
}

MarginalsWidget.propTypes = {
    widgetPresetID: PropTypes.string.isRequired,

    // Mapped store state
    widgetPresets: PropTypes.object.isRequired,
    systemInfo: PropTypes.object.isRequired,
};

MarginalsWidget.defaultProps = {

};

const mapStateToProps = (state) => ({
    widgetPresets: state.present.widget.presets[MARGINALS_WIDGET],
    systemInfo: state.present.general.systemInfo,
});

const mapDispatchToProps = () => ({}); // Do nothing

export default connectRedux(mapStateToProps, mapDispatchToProps)(MarginalsWidget);

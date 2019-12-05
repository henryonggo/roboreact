import React from "react";
import "./DashboardThemePicker.scss";
import PropTypes from "prop-types";

import ColorPicker from "components/ui/ColorPicker/ColorPicker";

const DashboardThemePicker = (props) => {
    const { themes, selectedTheme, onThemeClick } = props;
    return (
        <div className="DashboardThemePicker">
            <ColorPicker
                colors={themes}
                selectedColor={selectedTheme}
                onColorClick={onThemeClick}
            />
        </div>
    );
};

DashboardThemePicker.propTypes = {
    themes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        })
    ).isRequired,
    selectedTheme: PropTypes.string.isRequired,
    onThemeClick: PropTypes.func.isRequired
};

export default DashboardThemePicker;
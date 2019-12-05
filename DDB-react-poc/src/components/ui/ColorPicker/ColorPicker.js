import React from "react";
import "./ColorPicker.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

const ColorPicker = (props) => {
    const { selectedColor, onColorClick } = props;

    return (
        <div className="ColorPicker">
            {props.colors.map((i_oColor, i_nIndex) => {
                /** 
                * Note: Not using ThemeProvider for styling here because we would need one ThemeProvider 
                * per theme, which is overkill to render only one theme color.
                */
                const identifier = i_oColor.name || i_oColor.color;
                const selected = identifier === selectedColor;

                const sClasses = Utilities.injectClassNames("ColorPicker__color", (selected) ? "selected" : null);

                return (
                    <div
                        key={i_nIndex}
                        className={sClasses}
                        onClick={() => onColorClick(identifier)}
                        title={identifier}
                        style={{
                            boxShadow:
                                // Selected outline.
                                `${i_oColor.color} 0 0 0 ${selected ? ".2rem" : "1.5rem"} inset` +
                                // Selected glow.
                                `${selected ? `, ${i_oColor.color} 0 0 5px` : ""}`
                        }}
                    />
                );
            })}
        </div>
    );
};

ColorPicker.propTypes = {
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        })
    ).isRequired,
    selectedColor: PropTypes.string,
    onColorClick: PropTypes.func.isRequired
};

export default ColorPicker;
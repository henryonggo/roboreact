import React from "react";
import "./TextColor.scss";
import PropTypes from "prop-types";

import ToolbarOption from "../components/ToolbarOption";
import ColorPicker from "components/ui/ColorPicker/ColorPicker";

import { Transition } from "react-spring/renderprops";
import { FormatColorText } from "@material-ui/icons";

import { RICH_TEXT_WIDGET } from "constants/language";

export const TextColor = (props) => {
    const { expanded, config, currentState, onChange, onExpandEvent, } = props;

    const renderColorPicker = (styleProps) => {
        return (
            <div className="ColorPickerWrapper" style={styleProps} onClick={(e) => e.stopPropagation()}>
                <ColorPicker
                    colors={config.colors.map(c => ({ color: c }))}
                    selectedColor={currentState.color}
                    onColorClick={(color) => onChange("color", color)}
                />
            </div>
        );
    };

    return (
        <div className="TextColorOption">
            <ToolbarOption
                active={expanded}
                title={RICH_TEXT_WIDGET.TEXT_COLOR_OPTION.TITLE}
                onClick={onExpandEvent}
            >
                <FormatColorText />
            </ToolbarOption>
            <Transition
                items={expanded}
                keys={picker => picker}
                from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                config={{ tension: 500, friction: 30, clamp: true }}
            >
                {show => show && (styleProps => (
                    renderColorPicker(styleProps)
                ))}
            </Transition>
        </div>
    );
};

TextColor.propTypes = {
    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func.isRequired
};

TextColor.defaultProps = {
    expanded: false
};

export default TextColor;
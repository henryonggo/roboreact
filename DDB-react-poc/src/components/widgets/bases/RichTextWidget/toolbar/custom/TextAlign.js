import React from "react";
import "./TextAlign.scss";
import PropTypes from "prop-types";

import ToolbarOption from "../components/ToolbarOption";

import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify } from "@material-ui/icons";
import { RICH_TEXT_WIDGET } from "constants/language";

const alignIcons = {
    "left": <FormatAlignLeft />,
    "center": <FormatAlignCenter />,
    "right": <FormatAlignRight />,
    "justify": <FormatAlignJustify />
};

export const TextAlign = (props) => {
    const { config, currentState, onChange } = props;

    return (
        <div className="TextAlignOption">
            {
                config.options.map((alignment, index) => {
                    return (
                        <ToolbarOption
                            key={index}
                            value={alignment}
                            active={currentState.textAlignment === alignment}
                            title={RICH_TEXT_WIDGET.TEXT_ALIGN_OPTIONS[alignment]}
                            onClick={onChange}
                        >
                            {alignIcons[alignment]}
                        </ToolbarOption>
                    );
                })
            }
        </div>
    );
};

TextAlign.propTypes = {
    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

export default TextAlign;
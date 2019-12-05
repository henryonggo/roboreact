import React from "react";
import "./InlineStyle.scss";
import PropTypes from "prop-types";

import ToolbarOption from "../components/ToolbarOption";

import { FormatBold, FormatItalic, FormatUnderlined, FormatStrikethrough } from "@material-ui/icons";
import { FormatSubscript, FormatSuperscript, FormatMonospace } from "assets/svg";

import { RICH_TEXT_WIDGET } from "constants/language";

const styleIcons = {
    "bold": <FormatBold />,
    "italic": <FormatItalic />,
    "underline": <FormatUnderlined />,
    "subscript": <FormatSubscript />,
    "superscript": <FormatSuperscript />,
    "strikethrough": <FormatStrikethrough />,
    "monospace": <FormatMonospace />
};

export const InlineStyle = (props) => {
    const { config, currentState, onChange } = props;

    return (
        <div className="InlineStyleOption">
            {
                config.options.map((style, index) => {
                    return (
                        <ToolbarOption
                            key={index}
                            value={style}
                            active={currentState[style] === true}
                            title={RICH_TEXT_WIDGET.INLINE_STYLE_OPTION[style]}
                            onClick={onChange}
                        >
                            {styleIcons[style]}
                        </ToolbarOption>
                    );
                })
            }
        </div>
    );
};

InlineStyle.propTypes = {
    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

export default InlineStyle;
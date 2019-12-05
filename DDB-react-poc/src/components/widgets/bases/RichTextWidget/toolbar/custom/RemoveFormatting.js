import React from "react";
import "./RemoveFormatting.scss";
import PropTypes from "prop-types";

import ToolbarOption from "../components/ToolbarOption";

import { FormatClear } from "@material-ui/icons";

import { RICH_TEXT_WIDGET } from "constants/language";

export const RemoveFormatting = (props) => {
    const { onChange } = props;
    return (
        <div className="RemoveFormattingOption">
            <ToolbarOption
                title={RICH_TEXT_WIDGET.REMOVE_FORMATTING_OPTION.TITLE}
                active={false}
                onClick={onChange}
            >
                <FormatClear />
            </ToolbarOption>
        </div>
    );
};

RemoveFormatting.propTypes = {
    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

export default RemoveFormatting;
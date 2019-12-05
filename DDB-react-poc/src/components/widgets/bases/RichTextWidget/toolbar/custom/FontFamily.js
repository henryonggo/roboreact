import React, { Component } from "react";
import "./FontFamily.scss";
import PropTypes from "prop-types";

import ToolbarDropdown from "../components/ToolbarDropdown";

import { RICH_TEXT_WIDGET } from "constants/language";

export class FontFamily extends Component {
    constructor(props) {
        super(props);

        // Set default font family.
        this.defaultFont = "Arial";
        props.onChange(this.defaultFont);
    }
    render() {
        const { currentState, onChange, config, ...rest } = this.props;

        const oDropdownItems = config.options.map((i_oOption) =>
            ({
                optionName: i_oOption.toString(),
                onClick: () => onChange(i_oOption)
            })
        );

        return (
            <div className="FontFamilyOption">
                <ToolbarDropdown
                    dropdownTitle={RICH_TEXT_WIDGET.FONT_FAMILY_OPTION.TITLE}
                    dropdownLabel={currentState.fontFamily || this.defaultFont}
                    dropdownItems={oDropdownItems}
                    {...rest}
                />
            </div >
        );
    }
}

FontFamily.propTypes = {
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    currentState: PropTypes.object
};

export default FontFamily;
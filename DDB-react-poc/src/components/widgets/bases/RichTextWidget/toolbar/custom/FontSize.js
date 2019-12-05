import React, { Component } from "react";
import "./FontSize.scss";
import PropTypes from "prop-types";

import ToolbarDropdown from "../components/ToolbarDropdown";

import { RICH_TEXT_WIDGET } from "constants/language";

export class FontSize extends Component {
    constructor(props) {
        super(props);

        // Set default font size.
        this.defaultSize = window.getComputedStyle(document.documentElement)["font-size"].slice(0, -2);
        props.onChange(this.defaultSize);
    }
    render() {
        const { currentState, config, onChange, ...rest } = this.props;

        const oDropdownItems = config.options.map((i_oOption) =>
            ({
                optionName: i_oOption.toString(),
                onClick: () => onChange(i_oOption)
            })
        );

        return (
            <div className="FontSizeOption">
                <ToolbarDropdown
                    dropdownTitle={RICH_TEXT_WIDGET.FONT_SIZE_OPTION.TITLE}
                    dropdownLabel={(currentState.fontSize || this.defaultSize).toString()}
                    dropdownItems={oDropdownItems}
                    {...rest}
                />
            </div >
        );
    }
}

FontSize.propTypes = {
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    currentState: PropTypes.object.isRequired
};

export default FontSize;
import React, { Component } from "react";
import "./BlockType.scss";
import PropTypes from "prop-types";

import ToolbarDropdown from "../components/ToolbarDropdown";

import { RICH_TEXT_WIDGET } from "constants/language";
const { BLOCK_TYPE_OPTION } = RICH_TEXT_WIDGET;

export class BlockType extends Component {
    render() {
        const { currentState, config, onChange, ...rest } = this.props;

        const oDropdownItems = config.options.map((i_oOption) =>
            ({
                optionName: BLOCK_TYPE_OPTION[i_oOption],
                onClick: () => onChange(i_oOption)
            })
        );

        return (
            <div className="BlockTypeOption">
                <ToolbarDropdown
                    dropdownTitle={BLOCK_TYPE_OPTION.TITLE}
                    dropdownLabel={
                        BLOCK_TYPE_OPTION[currentState.blockType] ||
                        BLOCK_TYPE_OPTION
                    }
                    dropdownItems={oDropdownItems}
                    {...rest}
                />
            </div >
        );
    }
}

BlockType.propTypes = {
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    currentState: PropTypes.object
};

export default BlockType;
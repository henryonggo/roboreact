import React from "react";
import "./ListType.scss";
import PropTypes from "prop-types";

import ToolbarOption from "../components/ToolbarOption";

import { FormatListBulleted, FormatListNumbered, FormatIndentIncrease, FormatIndentDecrease } from "@material-ui/icons";
import { RICH_TEXT_WIDGET } from "constants/language";

const typeIcons = {
    "unordered": <FormatListBulleted />,
    "ordered": <FormatListNumbered />,
    "indent": <FormatIndentIncrease />,
    "outdent": <FormatIndentDecrease />
};

export const ListType = (props) => {
    const { config, currentState, onChange } = props;

    return (
        <div className="ListTypeOption">
            {
                config.options.map((type, index) => {
                    return (
                        <ToolbarOption
                            key={index}
                            value={type}
                            active={currentState[type] === true}
                            disabled={false}
                            title={RICH_TEXT_WIDGET.LIST_TYPE_OPTIONS[type]}
                            onClick={onChange}
                        >
                            {typeIcons[type]}
                        </ToolbarOption>
                    );
                })
            }
        </div>
    );
};

ListType.propTypes = {
    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

export default ListType;
import React, { Component } from "react";
import "./ToolbarDropdown.scss";
import PropTypes from "prop-types";

import ToolbarOption from "./ToolbarOption";
import Dropdown from "components/ui/Dropdown/Dropdown";
import { Transition } from "react-spring/renderprops";

export class ToolbarDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };

        this.dropdownButtonRef = React.createRef();
    }

    setDropdownButtonRef = (node) => {
        this.dropdownButtonRef = node;
    }

    toggleOpen = () => {
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    }

    render() {
        const { dropdownTitle, dropdownLabel, dropdownItems, expanded, onExpandEvent } = this.props;
        return (
            <div className="ToolbarDropdown">
                <ToolbarOption
                    active={false}
                    title={dropdownTitle}
                    onClick={onExpandEvent}
                >
                    <div className="ToolbarOption__label">
                        {dropdownLabel}
                    </div>
                    <div className={expanded ?
                        "ToolbarOption__caret--open" :
                        "ToolbarOption__caret--closed"}>
                    </div>
                </ToolbarOption>
                <Transition
                    items={expanded}
                    keys={item => item}
                    from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                    leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    config={{ tension: 500, friction: 30, clamp: true }}
                >
                    {show => show && (styleProps =>
                        <Dropdown dropdownItems={dropdownItems} styleProps={styleProps} />
                    )}
                </Transition>
            </div>
        );
    }
}

ToolbarDropdown.propTypes = {
    dropdownTitle: PropTypes.string,
    dropdownLabel: PropTypes.string,
    dropdownItems: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.func,
            optionName: PropTypes.string.isRequired,
            onClick: PropTypes.func
        })
    ).isRequired,
    expanded: PropTypes.bool.isRequired,
    onExpandEvent: PropTypes.func.isRequired
};

ToolbarDropdown.defaultProps = {
    dropdownTitle: null,
    dropdownLabel: null,
    expanded: false
};

export default ToolbarDropdown;
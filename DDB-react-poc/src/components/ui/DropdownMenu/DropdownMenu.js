import React, { Component } from "react";
import "./DropdownMenu.scss";
import PropTypes from "prop-types";

import { Transition } from "react-spring/renderprops";
import OutsideClickMonitor from "components/enhancers/OutsideClickMonitor/OutsideClickMonitor";
import Dropdown from "../Dropdown/Dropdown";

class DropdownMenu extends Component {
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
        const { dropdownLabel, dropdownItems, dropdownClass } = this.props;

        return (
            <div className="DropdownMenu">
                <div
                    className="DropdownButton"
                    onClick={this.toggleOpen}
                    ref={this.setDropdownButtonRef}
                >
                    <div className="DropdownButton__label">{dropdownLabel}</div>
                    <div className={this.state.dropdownOpen ? "DropdownButton__caret--open" : "DropdownButton__caret--closed"} />
                </div>
                <Transition
                    items={this.state.dropdownOpen}
                    keys={dropdown => dropdown}
                    from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                    leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    config={{ tension: 350, friction: 30, clamp: true }}
                >
                    {show => show && (styleProps =>
                        <>
                            <OutsideClickMonitor
                                onOutsideClick={this.toggleOpen}
                                nodes={[this.dropdownButtonRef]}
                                clicks={1}
                            />
                            <Dropdown
                                dropdownClass={dropdownClass}
                                dropdownItems={dropdownItems}
                                styleProps={styleProps}
                            />
                        </>
                    )}
                </Transition>
            </div >
        );
    }
}

DropdownMenu.propTypes = {
    dropdownItems: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.func,
            optionName: PropTypes.string.isRequired,
            onClick: PropTypes.func
        })
    ).isRequired,
    dropdownClass: PropTypes.string,
    dropdownLabel: PropTypes.node
};

DropdownMenu.defaultProps = {
    dropdownClass: "",
    dropdownLabel: ""
};

export default DropdownMenu;
import React, { Component } from "react";
import "./HamburgerMenu.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import OutsideClickMonitor from "components/enhancers/OutsideClickMonitor/OutsideClickMonitor";
import Dropdown from "components/ui/Dropdown/Dropdown";
import { Menu } from "@material-ui/icons";
import { Transition } from "react-spring/renderprops";

class HamburgerMenu extends Component {
    constructor(props) {
        super(props);

        this.menuButtonRef = React.createRef();
    }

    setMenuButtonRef = (node) => {
        this.menuButtonRef = node;
    }

    render() {
        return (
            <div className={Utilities.injectClassNames(this.props.menuClass, "HamburgerMenu")} >
                <div
                    className={`HamburgerMenu__button ${this.props.isOpen ? "open" : ""}`}
                    onClick={this.props.toggleOpen}
                    ref={this.setMenuButtonRef}
                >
                    <Menu />
                </div>

                <Transition
                    items={this.props.isOpen}
                    from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                    leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                    config={{ tension: 350, friction: 30, clamp: true }}
                >
                    {show => show && (styleProps =>
                        <>
                            <OutsideClickMonitor
                                onOutsideClick={this.props.toggleOpen}
                                nodes={[this.menuButtonRef]}
                                clicks={1}
                            />
                            <Dropdown
                                dropdownItems={this.props.menuItems}
                                styleProps={styleProps}
                            />
                        </>
                    )}
                </Transition>
            </div>
        );
    }
}

HamburgerMenu.propTypes = {
    isOpen: PropTypes.bool,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.func,
            optionName: PropTypes.string.isRequired,
            onClick: PropTypes.func
        })
    ).isRequired,
    toggleOpen: PropTypes.func.isRequired,
    menuClass: PropTypes.string.isRequired
};

HamburgerMenu.defaultProps = {
    isOpen: false
};

export default HamburgerMenu;
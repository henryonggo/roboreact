import React from "react";
import "./Dropdown.scss";
import Utilities from "utilities";
import PropTypes from "prop-types";

export const Dropdown = (props) => {
    return (
        <ul
            style={props.styleProps}
            className={Utilities.injectClassNames(props.dropdownClass, "Dropdown")}
        >
            {
                props.dropdownItems.map((menuItem, menuIndex) => {
                    const sDisabledClass = (menuItem.disabled) ? "disabled" : null;
                    const sClasses = Utilities.injectClassNames("Dropdown__item", sDisabledClass, menuItem.className);

                    return (
                        <li
                            key={menuIndex}
                            className={sClasses}
                            onClick={menuItem.onClick}
                        >
                            {
                                menuItem.icon ?
                                    <div className="Dropdown__item-icon">
                                        <menuItem.icon />
                                    </div> :
                                    null
                            }
                            <div className="Dropdown__item-name">
                                {menuItem.optionName}
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
};

Dropdown.propTypes = {
    dropdownItems: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.func,
            optionName: PropTypes.string.isRequired,
            onClick: PropTypes.func,
        })
    ).isRequired,
    styleProps: PropTypes.object,
    dropdownClass: PropTypes.string
};

Dropdown.defaultProps = {
    styleProps: {},
    dropdownClass: ""
};

export default Dropdown;
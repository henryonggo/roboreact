import React from "react";
import PropTypes from "prop-types";
import "./ToolbarOption.scss";
import Utilities from "utilities";

class ToolbarOption extends React.Component {
    onClick = () => {
        const { disabled, onClick, value } = this.props;
        if (!disabled) {
            onClick(value);
        }
    };

    render() {
        const { children, active, disabled, title } = this.props;
        return (
            <div
                className={Utilities.injectClassNames("ToolbarOption", active && "ToolbarOption--active", disabled && "ToolbarOption--disabled")}
                onClick={this.onClick}
                aria-selected={active}
                title={title}
            >
                {children}
            </div>
        );
    }
}

ToolbarOption.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
};

ToolbarOption.defaultProps = {
    disabled: false,
    value: ""
};


export default ToolbarOption;
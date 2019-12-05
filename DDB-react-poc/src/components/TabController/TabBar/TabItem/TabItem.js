import React, { Component } from "react";
import "./TabItem.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { Close } from "@material-ui/icons";

class TabItem extends Component {
    renderCloseButton() {
        const sClasses = Utilities.injectClassNames("TabItem__close-icon", (this.props.selected) ? "TabItem__close-icon--selected" : undefined);

        return this.props.removable ?
            // Note: e.stopPropagation() is needed in order to stop onTabClick from triggering as well
            <Close 
                className={sClasses} 
                onClick={(e) => { e.stopPropagation(); this.props.onCloseClick(); }}
            />
            :
            null;
    }

    render() {
        const { selected, className, tooltip } = this.props;

        const sClasses = Utilities.injectClassNames(className, "TabItem", (selected) ? "TabItem--selected": undefined);

        return (
            <div className={sClasses} onClick={this.props.onTabClick} title={tooltip}>
                <div className="TabItem__container">
                    <div className="TabItem__input">
                        {this.props.children}
                    </div> 
                    {this.renderCloseButton()}
                </div>
            </div>
        );
    }
}

TabItem.propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool,
    removable: PropTypes.bool,
    onTabClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    tooltip: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

TabItem.defaultProps = {
    selected: false,
    tooltip: ""
};


export default TabItem;
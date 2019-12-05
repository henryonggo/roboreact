import React, { Component } from "react";
import "./WidgetWrapper.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { widgetManager, modalManager } from "managers";
import * as LANG_CONST from "constants/language";

import { Close } from "@material-ui/icons";

class WidgetWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true // Used to fade on unmount.
        };
    }

    onCloseClick = () => {
        const { widgetPresetData } = this.props;

        modalManager.openConfirmModal({
            onConfirm: this.onCloseClickConfirm,
            children: LANG_CONST.CONFIRM_WIDGET_REMOVE_TEXT,
            title: widgetPresetData.name
        });
    }

    onCloseClickConfirm = () => {
        this.setState(() => ({ visible: false }));
        setTimeout(this.props.onRemoveWidget, 200);
    };

    renderWidgetPreset = (i_oPresetData) => {
        const { id, type } = i_oPresetData;

        const WidgetPreset = widgetManager.getWidgetBaseComponent(type);

        return (
            <WidgetPreset widgetPresetID={id} />
        );
    }

    render() {
        // Pull the widget specific props off before passing the RGL props off
        const { /* eslint-disable no-unused-vars */
            name,
            description,
            className,
            handleClassName,
            onRemoveWidget,
            widgetPresetData,
            ...rest
        } = this.props;

        const sClassName = Utilities.injectClassNames(className, "WidgetWrapper");
        const sHandleClassName = Utilities.injectClassNames(handleClassName, "WidgetWrapper__handle");

        return (
            <div {...rest} className={sClassName}>
                <div className={Utilities.injectClassNames("WidgetWrapper__container", !this.state.visible && "WidgetWrapper--invisible")}>
                    <div className={sHandleClassName} title={description}>
                        {name}
                        <Close className="WidgetWrapper__close-btn" onClick={this.onCloseClick} />
                    </div>
                    <div className="WidgetWrapper__content">
                        {/* This overlay stops the content in the widget from interacting with the mouse while resizing the widget */}
                        <div className="WidgetWrapper__content-overlay" />
                        {this.renderWidgetPreset(widgetPresetData)}
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

WidgetWrapper.propTypes = {
    className: PropTypes.string,
    handleClassName: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    onRemoveWidget: PropTypes.func.isRequired
};

WidgetWrapper.defaultProps = {
    description: ""
};

export default WidgetWrapper;
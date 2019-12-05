import React from "react";
import "./ModalBase.scss";
import ThemeProvider from "components/theme/ThemeProvider/ThemeProvider";
import Utilities from "utilities";
import Modal from "react-modal";
import PropTypes from "prop-types";
import * as APP_CONST from "constants/app";

const ModalBase = (props) => {
    const { overlayClassName, className, isOpen, styleProps, ...rest } = props;
    const sOverlayClass = "ModalBase__overlay", sContentClass = "ModalBase__content";

    // Append the ModalBase's css class overwrites to the list of classes to add to the modal
    const sOverlayClassName = (overlayClassName) ? Utilities.injectClasses(sOverlayClass, props.overlayClassName, isOpen ? `${sOverlayClass}` : "") : sOverlayClass;
    const sClassName = (className) ? Utilities.injectClasses(sContentClass, props.className) : sContentClass;

    return (
        <Modal
            overlayClassName={sOverlayClassName}
            className={sClassName}
            isOpen={true}
            style={{
                overlay: {
                    opacity: styleProps.opacity,
                    backgroundColor: styleProps.overlayColor
                },
                content: {
                    ...styleProps
                }
            }}
            {...rest}
        >
            <ThemeProvider currNamespaceID={props.themeNamespace || APP_CONST.DEFAULT_NAMESPACE_NAME}>
                <div className={sClassName} style={styleProps}>{props.children}</div>
            </ThemeProvider>
        </Modal>
    );
};

ModalBase.propTypes = {
    themeNamespace: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

ModalBase.defaultProps = {
    themeNamespace: APP_CONST.DEFAULT_NAMESPACE_NAME,
};

export default ModalBase;
import React from "react";
import "./FormSection.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import CustomValidators from "utilities/customValidators";

const FormSection = (props) => {
    const { children, title, className, classNameHeader, classNameContent, indentLevel, indentAmount, shrinkable, 
        scrollable, extensionItem, extensionItemOnClick, autoSpace, displayBackground, disableExtensionItem, minHeight } = props;
    const oShrinkStyles = (shrinkable) ? { minHeight: minHeight } : {};
    const oScrollStyles = (scrollable) ? { overflow: "auto" } : {};
    const oStyles = { ...oShrinkStyles, ...oScrollStyles};

    const sIndentAmount = `calc(${indentLevel} * ${indentAmount})`;

    const sAutoSpaceClass = (autoSpace) ? "auto-space" : null;
    const sDisplayBackgroundClass = (displayBackground) ? "display-background" : null;
    const sShrinkableClass = (shrinkable) ? "shrinkable" : null;
    const sScrollableClass = (scrollable) ? "scrollable" : null;
    const sClasses = Utilities.injectClassNames(className, "FormSection", sAutoSpaceClass, sDisplayBackgroundClass, sShrinkableClass, sScrollableClass);
    const sHeaderClasses = Utilities.injectClassNames(classNameHeader, "FormSection__header");
    const sContentClasses = Utilities.injectClassNames(classNameContent, "FormSection__content");

    const renderTitle = () => {
        return (
            (title) ?
                <div className="FormSection__title" style={{marginLeft: sIndentAmount}}>{ title }</div>
                : null
        );
    };

    const renderExtensionItem = () => {
        return (
            (extensionItem) ?
                <div
                    className="FormSection__extension-item"
                    onClick={(!disableExtensionItem) ? extensionItemOnClick : null}
                >
                    { React.cloneElement(extensionItem, { disabled: disableExtensionItem }) }
                </div>
                : null
        );
    };

    return (
        <div className={sClasses} style={oStyles}>
            <div className={sHeaderClasses}>
                { renderTitle() }
                { renderExtensionItem() }
            </div>
            <div className={sContentClasses} style={{marginLeft: sIndentAmount}}>
                { children }
            </div>
        </div>
    );
};

FormSection.propTypes = {
    className: PropTypes.string,
    classNameHeader: PropTypes.string,
    classNameContent: PropTypes.string,
    title: PropTypes.node,
    indentLevel: PropTypes.number,
    indentAmount: CustomValidators.CSSLength,
    minHeight: CustomValidators.CSSLength,

    disableExtensionItem: PropTypes.bool,
    extensionItem: PropTypes.node,
    extensionItemOnClick: PropTypes.func,
    shrinkable: PropTypes.bool,
    scrollable: PropTypes.bool,
    autoSpace: PropTypes.bool, 
    displayBackground: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

FormSection.defaultProps = {
    title: null,
    indentLevel: 0,
    indentAmount: "1rem",
    disableExtensionItem: false,
    extensionItem: null,
    shrinkable: false,
    scrollable: false,
    autoSpace: false,
    displayBackground: true,
    minHeight: "0"
};

export default FormSection;
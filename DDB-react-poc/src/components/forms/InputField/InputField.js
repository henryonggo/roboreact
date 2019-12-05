import React, { Component } from "react";
import "./InputField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";
import CustomValidators from "utilities/customValidators";
import ReactResizeDetector from 'react-resize-detector';

import BaseField from "components/forms/BaseField/BaseField";
import { Field, connect as fomikConnect } from "formik";

class InputField extends Component {
    constructor(props) {
        super(props);

        const sID = `InputField-${Utilities.generateUniqueID()}`;

        this.state = {
            id: sID,
            titleHeight: -1,
        };
        
        this.titleEl = null;
    }

    _getTitleEl = () => this.titleEl;

    onTitleResize = (() => {
        this.setState(prevState => update(prevState, {
            titleHeight: { $set: Utilities.getAbsoluteHeight(this._getTitleEl()) }
        }));
    });

    render() {
        const { formik, type, name, title, titleWidth, className, 
            containerClassName, inputClassName, titleClassName, disabled, 
            suffixRender, suffixClassName, suffixWidth, ...rest } = this.props;
        const { id, titleHeight } = this.state;

        const sDisabledClass = (disabled) ? "disabled" : null;
        const sClasses = Utilities.injectClassNames("InputField", sDisabledClass, className);
        const sContainerClasses = Utilities.injectClassNames("InputField__container", containerClassName);
        const sInputClasses = Utilities.injectClassNames("InputField__input", inputClassName);
        const sTitleClasses = Utilities.injectClassNames("InputField__title", titleClassName);
        const sSuffixClasses = Utilities.injectClassNames("InputField__suffix", suffixClassName);

        const sInputHeight = (titleHeight >= 0) ? `${titleHeight}px` : "auto";

        const oInputStyle = { 
            paddingLeft: `calc(${titleWidth} + 0.7rem)`,
            paddingRight: `calc(${suffixWidth} + 0.7rem)`,
            height: sInputHeight
        };
        const oTitleStyle = { width: titleWidth };
        const oSuffixStyle = { width: suffixWidth };

        return (
            <BaseField
                className={sClasses}
                containerClassName={sContainerClasses}
                name={name}
            >
                {
                    <Field 
                        { ...rest }
                        className={sInputClasses}
                        style={oInputStyle}
                        name={name}
                        type={type}
                        id={id}
                        disabled={disabled}
                        autoComplete="off"
                    />
                }
                <label
                    ref={el => this.titleEl = el}
                    className={sTitleClasses}
                    style={oTitleStyle}
                    htmlFor={id} 
                >
                    <ReactResizeDetector
                        handleHeight 
                        onResize={this.onTitleResize} 
                    />
                    { title }
                </label>

                <label
                    className={sSuffixClasses}
                    style={oSuffixStyle}
                    htmlFor={id}
                >
                    <ReactResizeDetector
                        handleHeight 
                        onResize={this.onSuffixResize} 
                    />
                    { suffixRender() }
                </label>
            </BaseField>
        );
    }
}

InputField.propTypes = {
    // Fomik provided props
    formik: PropTypes.object.isRequired,

    // Formik form state
    name: PropTypes.string.isRequired,

    className: PropTypes.string,
    containerClassName: PropTypes.string,
    inputClassName: PropTypes.string,

    disabled: PropTypes.bool,

    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
    titleClassName: PropTypes.string,
    titleWidth: CustomValidators.CSSLength,

    suffixRender: PropTypes.func,
    suffixClassName: PropTypes.string,
    suffixWidth: CustomValidators.CSSLength,

    type: PropTypes.string,
};

InputField.defaultProps = {
    disabled: false,

    titleWidth: "30%",

    suffixRender: () => null, // Render nothing
    suffixWidth: "0rem",

    type: "text",
};

export default fomikConnect(InputField);

import React, { Component } from "react";
import "./SelectField.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";
import CustomValidators from "utilities/customValidators";
import ReactResizeDetector from 'react-resize-detector';

import BaseField from "components/forms/BaseField/BaseField";
import { Field } from "formik";

class SelectField extends Component {
    constructor(props) {
        super(props);

        const sID = `SelectField-${Utilities.generateUniqueID()}`;

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

    renderOptions() {
        const { options, renderItem } = this.props;

        return options.map((i_sOptionValue, i_nIdx) => (
            <option
                key={i_nIdx}
                value={i_sOptionValue}
            >
                { renderItem(i_sOptionValue, i_nIdx) }
            </option>
        ));
    }

    render() {
        const { id, titleHeight } = this.state;
        const { className, options, renderItem, title, titleWidth, disabled, name, ...rest } = this.props;

        const sDisabledClass = (disabled) ? "disabled" : null;
        const sClasses = Utilities.injectClassNames("SelectField", sDisabledClass, className);

        const oTitleStyles = {
            width: titleWidth
        };

        const sSelectHeight = (titleHeight >= 0) ? `${titleHeight}px` : "auto";

        const oSelectStyles =  {
            // width: `calc(100% - ${titleWidthAmount} - 10px)` // 2 * margin-right in scss
            paddingLeft: `calc(${titleWidth} + 0.7rem`,
            height: sSelectHeight
        };

        return (
            <BaseField
                { ...rest }
                className={sClasses}
                containerClassName="SelectField__select-container"
                name={name}
            >
                <label
                    ref={el => this.titleEl = el}
                    className="SelectField__title"
                    style={oTitleStyles}
                    htmlFor={id}
                >
                    <ReactResizeDetector
                        handleHeight 
                        onResize={this.onTitleResize} 
                    />
                    { title }
                </label>

                <Field 
                    { ...rest }

                    id={id}
                    className="SelectField__select"
                    style={oSelectStyles}

                    component="select" 
                    name={name}
                    disabled={disabled}
                >
                    { this.renderOptions() }
                </Field>
            </BaseField>
        );
    }
}

SelectField.propTypes = {
    // Formik state names
    name: PropTypes.string.isRequired,

    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    titleWidth: CustomValidators.CSSLength,

    renderItem: PropTypes.func, // Params: option value (String), index (Number)
};

SelectField.defaultProps = {
    title: "",
    titleWidth: "30%",
    items: [],
    disabled: false,

    renderItem: (i_sItemID) => i_sItemID,
};

export default SelectField;

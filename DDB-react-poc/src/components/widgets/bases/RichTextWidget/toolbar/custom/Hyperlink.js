import React from "react";
import "./Hyperlink.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import ToolbarOption from "../components/ToolbarOption";

import { Transition } from "react-spring/renderprops";
import { InsertLink } from "@material-ui/icons";

import TextField from "components/forms/InputField/TextField/TextField";
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import { connect as connectFormik, getIn } from "formik";

import { RICH_TEXT_WIDGET, ADD_BTN_TEXT, CANCEL_BTN_TEXT } from "constants/language";
const { HYPERLINK_OPTION } = RICH_TEXT_WIDGET;

export const Hyperlink = (props) => {
    const { name, currentState, onChange, expanded, onExpandEvent, formik, doCollapse } = props;
    const renderForm = (i_oStyleProps) => {
        return (
            <div
                className="FormWrapper"
                style={i_oStyleProps}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="FormWrapper__fields">
                    <TextField
                        className="FormWrapper__field"
                        name={`${name}.linkTitle`}
                        title={HYPERLINK_OPTION.LINK_TITLE_FIELD}
                    />
                    <TextField
                        className="FormWrapper__field"
                        name={`${name}.linkTarget`}
                        title={HYPERLINK_OPTION.LINK_TARGET_FIELD}
                    />
                </div>
                <div className="FormWrapper__buttons">
                    <PrimaryButton
                        className="FormWrapper__button"
                        onClick={Utilities.onClickPreventDefault(submitForm)}
                        disabled={
                            getIn(formik.values, `${name}.linkTitle`) === "" ||
                            !Utilities.isURLPath(getIn(formik.values, `${name}.linkTarget`))
                        }
                    >
                        {ADD_BTN_TEXT}
                    </PrimaryButton>
                    <PrimaryButton
                        className="FormWrapper__button"
                        onClick={Utilities.onClickPreventDefault(doCollapse)}
                    >
                        {CANCEL_BTN_TEXT}
                    </PrimaryButton>
                </div>
            </div>
        );
    };

    const submitForm = () => {
        const linkTitle = getIn(formik.values, `${name}.linkTitle`);
        const linkTarget = getIn(formik.values, `${name}.linkTarget`);

        if (linkTarget) {
            onChange("link", linkTitle, linkTarget);
        } else {
            onChange("unlink", linkTitle);
        }
        doCollapse();
    };

    return (
        <div className="HyperlinkOption">
            <ToolbarOption
                active={expanded}
                title={HYPERLINK_OPTION.TITLE}
                onClick={() => Utilities.runFunctions(onExpandEvent, () => {
                    formik.setFieldValue(`${name}.linkTitle`, currentState.selectionText);
                    formik.setFieldValue(`${name}.linkTarget`, (currentState.link && currentState.link.target) || "");
                })}
            >
                <InsertLink />
            </ToolbarOption>
            <Transition
                items={expanded}
                keys={picker => picker}
                from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                config={{ tension: 500, friction: 30, clamp: true }}
            >
                {show => show && (styleProps => renderForm(styleProps))}
            </Transition>
        </div>
    );
};

Hyperlink.propTypes = {
    // Formik object and customData config namespace.
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onExpandEvent: PropTypes.func.isRequired,
    doCollapse: PropTypes.func.isRequired,
    expanded: PropTypes.bool
};

Hyperlink.defaultProps = {
    expanded: false
};

export default connectFormik(Hyperlink);
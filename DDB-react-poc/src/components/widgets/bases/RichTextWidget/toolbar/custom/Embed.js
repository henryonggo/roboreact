import React from "react";
import "./Embed.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import ToolbarOption from "../components/ToolbarOption";

import { Transition } from "react-spring/renderprops";
import { Code } from "@material-ui/icons";

import TextField from "components/forms/InputField/TextField/TextField";
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import { connect as connectFormik, getIn } from "formik";

import { RICH_TEXT_WIDGET, ADD_BTN_TEXT, CANCEL_BTN_TEXT } from "constants/language";
const { EMBED_OPTION } = RICH_TEXT_WIDGET;

export const Embed = (props) => {
    const { name, onChange, expanded, onExpandEvent, formik, doCollapse } = props;
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
                        name={`${name}.embedLink`}
                        title={EMBED_OPTION.EMBED_LINK_FIELD}
                    />
                    <TextField
                        className="FormWrapper__field"
                        name={`${name}.embedHeight`}
                        title={EMBED_OPTION.HEIGHT_FIELD}
                    />
                    <TextField
                        className="FormWrapper__field"
                        name={`${name}.embedWidth`}
                        title={EMBED_OPTION.WIDTH_FIELD}
                    />
                </div>
                <div className="FormWrapper__buttons">
                    <PrimaryButton className="FormWrapper__button"
                        onClick={Utilities.onClickPreventDefault(submitForm)}
                        disabled={!Utilities.isHTTPURLPath(getIn(formik.values, `${name}.embedLink`))}
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
        const sEmbedLink = getIn(formik.values, `${name}.embedLink`);
        const nHeight = getIn(formik.values, `${name}.embedHeight`);
        const nWidth = getIn(formik.values, `${name}.embedWidth`);
        onChange(sEmbedLink, nHeight, nWidth);
        doCollapse();
    };

    return (
        <div className="EmbedOption">
            <ToolbarOption
                active={expanded}
                title={EMBED_OPTION.TITLE}
                onClick={() => Utilities.runFunctions(onExpandEvent, () => {
                    formik.setFieldValue(`${name}.embedLink`, "");
                    formik.setFieldValue(`${name}.embedHeight`, EMBED_OPTION.AUTO_TEXT);
                    formik.setFieldValue(`${name}.embedWidth`, EMBED_OPTION.AUTO_TEXT);
                })}
            >
                <Code />
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

Embed.propTypes = {
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

Embed.defaultProps = {
    expanded: false
};

export default connectFormik(Embed);
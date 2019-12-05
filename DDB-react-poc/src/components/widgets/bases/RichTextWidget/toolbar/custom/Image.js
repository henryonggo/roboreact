import React from "react";
import "./Image.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { requestManager, notificationManager } from "managers";

import ToolbarOption from "../components/ToolbarOption";
import { Transition } from "react-spring/renderprops";
import { InsertPhoto } from "@material-ui/icons";

import TextField from "components/forms/InputField/TextField/TextField";
import NumberField from "components/forms/InputField/NumberField/NumberField";
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import { connect as connectFormik, getIn } from "formik";

import {
    RICH_TEXT_WIDGET,
    ADD_BTN_TEXT,
    CANCEL_BTN_TEXT,
    BROWSE_BTN_TEXT
} from "constants/language";
const { IMAGE_OPTION } = RICH_TEXT_WIDGET;

export const Image = (props) => {
    const { name, onChange, expanded, onExpandEvent, formik, doCollapse } = props;

    const renderForm = (i_oStyleProps) => {
        return (
            <div
                className="FormWrapper"
                style={i_oStyleProps}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={onKeyDown}
            >
                <div className="FormWrapper__fields">
                    <div className="FormWrapper__pathField">
                        <TextField
                            className="FormWrapper__field"
                            name={`${name}.imagePath`}
                            title={IMAGE_OPTION.IMAGE_PATH_FIELD}
                        />
                        <PrimaryButton
                            className="FormWrapper__button"
                            onClick={Utilities.onClickPreventDefault(openImagePicker)}
                        >
                            {BROWSE_BTN_TEXT}
                        </PrimaryButton>
                    </div>
                    <div className="FormWrapper__dimensionFields">
                        <NumberField
                            className="FormWrapper__field"
                            name={`${name}.imageHeight`}
                            title={IMAGE_OPTION.HEIGHT_FIELD}
                            titleWidth="40%"
                        />
                        <NumberField
                            className="FormWrapper__field"
                            name={`${name}.imageWidth`}
                            title={IMAGE_OPTION.WIDTH_FIELD}
                            titleWidth="40%"
                        />
                    </div>
                </div>
                <div className="FormWrapper__buttons">
                    <PrimaryButton className="FormWrapper__button"
                        onClick={Utilities.onClickPreventDefault(submitForm)}

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

    const onKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 13) {
            submitForm(e);
            e.preventDefault();
        }
    };

    const openImagePicker = async () => {
        const oResp = await requestManager.openFileDialog("C:\\", "Choose an image", "(*.*)");
        const sImagePath = oResp.data.message;
        formik.setFieldValue(`${name}.imagePath`, sImagePath);
    };

    const submitForm = async () => {
        const sImagePath = getIn(formik.values, `${name}.imagePath`);
        const nHeight = getIn(formik.values, `${name}.imageHeight`);
        const nWidth = getIn(formik.values, `${name}.imageWidth`);

        if (Utilities.isHTTPURLPath(sImagePath)) {
            onChange(sImagePath, nHeight, nWidth);
        } else {
            // Copy file to dashboard folder.
            const oUploadResp = await requestManager.uploadFile(sImagePath);
            if (oUploadResp.data.success) {
                const sUploadedFilePath = oUploadResp.data.message;
                onChange(sUploadedFilePath, nHeight, nWidth);
                doCollapse();
            } else {
                notificationManager.showError("Upload failed");
            }
        }
    };

    return (
        <div className="ImageOption">
            <ToolbarOption
                active={expanded}
                title={IMAGE_OPTION.TITLE}
                onClick={() => Utilities.runFunctions(onExpandEvent, () => {
                    formik.setFieldValue(`${name}.imagePath`, "");
                })}
            >
                <InsertPhoto />
            </ToolbarOption>
            <Transition
                items={expanded}
                keys={picker => picker}
                from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                config={{ tension: 500, friction: 30, clamp: true }}
            >
                {show => show && (styleProps => (
                    renderForm(styleProps)
                ))}
            </Transition>
        </div>
    );
};

Image.propTypes = {
    // Formik object and customData config namespace.
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func.isRequired,
    doCollapse: PropTypes.func.isRequired
};

Image.defaultProps = {
    expanded: false
};

export default connectFormik(Image);
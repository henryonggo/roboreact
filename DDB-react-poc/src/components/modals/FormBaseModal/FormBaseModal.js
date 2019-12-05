import React from "react";
import "./FormBaseModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { Formik, Form } from "formik";
import { notificationManager } from "managers";

import ModalWrapper from "components/modals/ModalWrapper";

const FormBaseModal = (props) => {
    const { className, onConfirm, scrollable, useFlexbox, useAsync, actionComponents, ...rest } = props;

    const renderForm = (formikProps) => {
        const sResizableModifierClass = (rest.resizable) ? "resizable" : null;
        const sFlexboxModifierClass = (useFlexbox) ? "flexbox" : null;

        return (
            <Form
                className={Utilities.injectClassNames(className, "FormBaseModal", sResizableModifierClass, sFlexboxModifierClass)}
            >
                <div className="FormBaseModal__content" style={{ overflow: scrollable ? "auto" : "" }}>
                    {props.children}
                </div>

                <div className="FormBaseModal__actions-container">
                    {
                        // Render all the action components out
                        Utilities.renderNodeList(actionComponents, { ...formikProps })
                    }
                </div>
            </Form>
        );
    };

    const onConfirmHandler = async (values, actions) => {
        try {
            if (useAsync) {
                // Run the onConfirm prop async and wait for the callback chain to complete
                await Utilities.runAsyncFunctionsWithParams([values, actions], onConfirm);
                props.onRequestClose(values, actions); // Close the modal
            } else {
                // Run chain non-async
                await Utilities.runFunctionsWithParams([values, actions], onConfirm, props.onRequestClose);
            }

        } catch (err) {
            // Cancel submission
            actions.setSubmitting(false);

            // Display the error that was thrown
            notificationManager.showError(err.toString().replace("Error:", ""));
            notificationManager.showError(err.stack);
        }
    };

    return (
        <ModalWrapper
            {...rest}
        >
            <Formik
                {...rest}
                onSubmit={onConfirmHandler}
                render={renderForm}
            />
        </ModalWrapper>
    );
};

FormBaseModal.propTypes = {
    className: PropTypes.string,
    scrollable: PropTypes.bool,
    useFlexbox: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    actionComponents: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.func),
        PropTypes.func,
    ]),
    onConfirm: PropTypes.func,
    useAsync: PropTypes.bool,
};

FormBaseModal.defaultProps = {
    scrollable: false,
    useFlexbox: false,
    useAsync: true,
};

export default FormBaseModal;

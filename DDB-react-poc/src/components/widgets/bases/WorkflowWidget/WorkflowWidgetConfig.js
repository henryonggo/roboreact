import React, { Component } from "react";
import "./WorkflowWidgetConfig.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import FormSection from "components/forms/FormSection/FormSection";
import BaseWidgetConfig from "components/widgets/bases/BaseWidgetConfig";
import workflowButtonLibrary from "./buttons";

import { modalManager, contextMenuManager } from "managers";
import { modalTypes } from "constants/modals";

import GridLayout from "react-grid-layout";
import { withSize } from "react-sizeme";
import { connect as connectFormik } from "formik";
import update from "immutability-helper";

import IconButton from "components/ui/button/IconButton/IconButton";
import { Edit, Delete, Add } from "@material-ui/icons";

import { WORKFLOW_WIDGET } from "constants/language";

const DEFAULT_CONFIG = {
    "cols": 5,
    "layout": [],
    "buttons": {}
};

const SizedGridLayout = withSize()((props) => {
    return (
        <GridLayout width={props.size.width} {...props}>
            {props.children}
        </GridLayout>
    );
});

class WorkflowWidgetConfig extends Component {
    constructor(props) {
        super(props);

        this.initConfig = (props.initConfig) ? props.initConfig : DEFAULT_CONFIG;

        this.state = {
            ...this.initConfig,
            selectedButton: null
        };
    }

    fnOnGridChange = (i_aLayout) => {
        this.props.formik.setFieldValue(`${this.props.name}.layout`, i_aLayout || this.state.layout);
        this.props.formik.setFieldValue(`${this.props.name}.buttons`, this.state.buttons);
    };

    fnAddWorkflowButton = () => {
        modalManager.openModal(modalTypes.WORKFLOW_BUTTON_ADD,
            {
                onConfirm: ({ buttonLabel, buttonType, docTree, selectedDocs }) => {
                    // Sort docs in selectedDocs order.
                    const aDocs = selectedDocs.map((i_sFieldName) => docTree[i_sFieldName]);

                    this.setState((prevState) => {
                        const sNewButtonId = Utilities.generateUniqueID("wb-");
                        const oButton = {
                            type: buttonType,
                            text: buttonLabel,
                            documents: aDocs
                        };
                        return update(prevState, {
                            buttons: { $merge: { [sNewButtonId]: oButton } }
                        });
                    });
                },
            });
    };

    fnEditWorkflowButton = (i_oButtonProps) => {
        const { id, type, text, documents } = i_oButtonProps;

        modalManager.openModal(modalTypes.WORKFLOW_BUTTON_EDIT,
            {
                launchDocuments: documents,
                initWorkflowData: {
                    buttonLabel: text,
                    buttonType: type,
                },
                onConfirm: ({ buttonLabel, buttonType, docTree, selectedDocs }) => {
                    // Sort docs in selectedDocs order.
                    const aDocs = selectedDocs.map((i_sFieldName) => docTree[i_sFieldName]);

                    this.setState((prevState) => {
                        const oButton = {
                            type: buttonType,
                            text: buttonLabel,
                            documents: aDocs
                        };

                        return update(prevState, {
                            buttons: { $merge: { [id]: oButton } }
                        });
                    }, this.fnOnGridChange);
                },
            }
        );
    }

    fnDeleteWorkflowButton = (i_oButtonProps) => {
        const { id } = i_oButtonProps;

        const oConfirmationText =
            (
                <div>
                    Are you sure you want to delete the workflow button <b>{i_oButtonProps.text}</b>?
                </div>
            );

        modalManager.openConfirmModal({
            title: "Delete Workflow Button",
            confirmText: "Delete",
            children: oConfirmationText,
            onConfirm: () => {
                this.setState((prevState) => {
                    return update(prevState, {
                        buttons: { $unset: [id] }
                    });
                }, this.fnOnGridChange);
            }
        });
    }

    fnOpenButtonContextMenu = (i_oButtonProps, e) => {
        e.preventDefault();

        const nPosX = e.clientX;
        const nPosY = e.clientY;

        const oEditOption = {
            icon: Edit,
            optionName: WORKFLOW_WIDGET.CONTEXT_MENU_EDIT,
            className: "EditOption",
            onClick: () => {
                this.fnEditWorkflowButton(i_oButtonProps);
            }
        };

        const oDeleteOption = {
            icon: Delete,
            optionName:  WORKFLOW_WIDGET.CONTEXT_MENU_DELETE,
            className: "DeleteOption",
            onClick: () => {
                this.fnDeleteWorkflowButton(i_oButtonProps);
            }
        };

        this.fnSetSelectedButton(i_oButtonProps.id);

        contextMenuManager.openContextMenu({
            className: "WorkflowButtonContextMenu",
            items: [
                oEditOption,
                oDeleteOption
            ],
            position: {
                x: nPosX,
                y: nPosY
            },
            onClose: () => this.fnClearSelectedButton(i_oButtonProps.id)
        });
    }

    fnSetSelectedButton = (i_sButtonID) => {
        this.setState((prevState) => {
            return update(prevState, {
                selectedButton: { $set: i_sButtonID }
            });
        });
    }

    fnClearSelectedButton = (i_sButtonID) => {
        this.setState((prevState) => {
            if (i_sButtonID !== prevState.selectedButton) {
                // Selected button has already changed.
                return prevState;
            }

            // Button to clear is still selected button.
            return update(prevState, {
                selectedButton: { $set: null }
            });
        });
    }

    render() {
        const { name, disabled, ...rest } = this.props;

        return (
            <BaseWidgetConfig
                {...rest}
                name={name}
                initConfig={this.initConfig}
            >
                <FormSection
                    title={WORKFLOW_WIDGET.CONFIG_TITLE}
                    className={Utilities.injectClassNames(
                        "WorkflowWidgetConfig",
                        disabled && "disabled"
                    )}
                    extensionItem={
                        <IconButton title={WORKFLOW_WIDGET.ADD_BUTTON_TEXT}>
                            <Add />
                        </IconButton>
                    }
                    extensionItemOnClick={this.fnAddWorkflowButton}
                    disableExtensionItem={disabled}
                >
                    <SizedGridLayout
                        className={Utilities.injectClassNames(
                            "WorkflowWidget__layout-config",
                            "layout"
                        )}
                        layout={this.state.layout}
                        rowHeight={50}
                        cols={this.state.cols}

                        onLayoutChange={this.fnOnGridChange}

                        isDraggable={!disabled}
                        isResizable={!disabled}
                    >
                        {
                            Object.entries(this.state.buttons).map(([i_oButtonID, i_oButtonData]) => {
                                const WorkflowButton = workflowButtonLibrary[i_oButtonData.type];
                                const bSelected = this.state.selectedButton === i_oButtonID;

                                return (
                                    <div
                                        className={Utilities.injectClassNames(
                                            "WorkflowWidget__button-wrapper",
                                            bSelected && "WorkflowWidget__button-wrapper-selected")
                                        }
                                        key={i_oButtonID}
                                    >
                                        <WorkflowButton
                                            {...i_oButtonData}
                                            openContextMenu={(e) =>
                                                !disabled && this.fnOpenButtonContextMenu({ id: i_oButtonID, ...i_oButtonData }, e)
                                            }
                                            disabled
                                        />
                                    </div>
                                );
                            })
                        }
                    </SizedGridLayout>
                    <div className="WorkflowWidgetConfigTooltip">
                        {WORKFLOW_WIDGET.MODIFY_PROMPT}
                    </div>
                </FormSection>
            </BaseWidgetConfig>
        );
    }
}

WorkflowWidgetConfig.propTypes = {
    // Formik props
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired, // Points to the custom config object

    initConfig: PropTypes.object,
};

export default connectFormik(WorkflowWidgetConfig);
import React from "react";

import WorkflowButtonConfigurationBaseModal from "./WorkflowButtonConfigurationBaseModal";

import Utilities from "utilities";
import buttonTypes from "constants/widgets/workflowButtonTypes";

import {WORKFLOW_BUTTON_CONFIG, ADD_BTN_TEXT} from "constants/language";

const oInitWorkflowData = {
    buttonLabel: "",
    buttonType: buttonTypes.RECTANGLE_BUTTON,
    docTree: {},
    selectedDocs: []
};

export const WorkflowButtonAddModal = (props) => {
    return (
        <WorkflowButtonConfigurationBaseModal
            {...props}
            title={WORKFLOW_BUTTON_CONFIG.ADD_TITLE}
            confirmText={ADD_BTN_TEXT}
            initWorkflowData={Utilities.deepClone(oInitWorkflowData)}
        />
    );
};

export default WorkflowButtonAddModal;
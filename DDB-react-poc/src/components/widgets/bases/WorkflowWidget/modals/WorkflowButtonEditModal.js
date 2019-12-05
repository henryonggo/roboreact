import React from "react";
import WorkflowButtonConfigurationBaseModal from "./WorkflowButtonConfigurationBaseModal";
import Utilities from "utilities";

import {WORKFLOW_BUTTON_CONFIG, EDIT_BTN_TEXT} from "constants/language";

const oInitWorkflowData = {
    docTree: {},
    selectedDocs: []
};

export const WorkflowButtonEditModal = (props) => {
    return (
        <WorkflowButtonConfigurationBaseModal
            {...props}
            title={WORKFLOW_BUTTON_CONFIG.EDIT_TITLE}
            confirmText={EDIT_BTN_TEXT}
            initWorkflowData={Utilities.deepClone({ ...oInitWorkflowData, ...props.initWorkflowData })}
        />
    );
};

export default WorkflowButtonEditModal;
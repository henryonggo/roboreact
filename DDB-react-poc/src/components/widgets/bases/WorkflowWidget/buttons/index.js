import buttonTypes from "constants/widgets/workflowButtonTypes";

import WorkflowRectangleButtonImport from "./WorkflowRectangleButton";

export const WorkflowRectangleButton = WorkflowRectangleButtonImport;

export default {
    [buttonTypes.RECTANGLE_BUTTON]: WorkflowRectangleButton
};
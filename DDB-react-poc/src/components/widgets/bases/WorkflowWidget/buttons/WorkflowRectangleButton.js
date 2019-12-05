import React from "react";
import PropTypes from "prop-types";
import "./WorkflowRectangleButton.scss";
import Rectangle from "assets/svg/Rectangle";

import WorkflowButtonBase from "./WorkflowButtonBase";

export const WorkflowRectangleButton = (props) => {
    const { text, ...rest } = props;
    return (
        <WorkflowButtonBase {...rest} className="WorkflowRectangleButton">
            <Rectangle />
            <div
                className="WorkflowRectangleButton__text"
                title={text}
            >
                {text}
            </div>
        </WorkflowButtonBase>
    );
};



WorkflowRectangleButton.propTypes = {
    text: PropTypes.string,
};

WorkflowRectangleButton.defaultProps = {
    text: "",
};

export default WorkflowRectangleButton;
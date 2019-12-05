import React from "react";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { requestManager, modalManager } from "managers";
import { modalTypes } from "constants/modals";


export const WorkflowButtonBase = (props) => {
    const { className, children, documents, disabled, openContextMenu, } = props;

    const fnOnClick = () => {
        if (!disabled) {
            if (documents.length === 1) {
                requestManager.openCaseWareDocument(props.documents[0].number).catch(() => { });
            } else if (documents.length > 1) {
                modalManager.openModal(modalTypes.WORKFLOW_LAUNCH_MAPPING, {
                    mappings: documents
                });
            }
        }
    };

    return (
        <div
            className={Utilities.injectClassNames("WorkflowButton", className)}
            onClick={fnOnClick}
            onContextMenu={openContextMenu}
        >
            {children}
        </div>
    );
};

WorkflowButtonBase.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    type: PropTypes.string,
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.string,
            name: PropTypes.string
        })
    ),
    disabled: PropTypes.bool,

    // Config mode.
    openContextMenu: PropTypes.func
};

WorkflowButtonBase.defaultProps = {
    documents: [],
    disabled: false,
    openContextMenu: () => { }
};

export default WorkflowButtonBase;
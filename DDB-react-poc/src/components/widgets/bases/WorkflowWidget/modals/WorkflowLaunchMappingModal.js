
import React from "react";
import "./WorkflowLaunchMappingModal.scss";
import PropTypes from "prop-types";
import { requestManager } from "managers";
import AssertionBaseModal from "components/modals/assertions/AssertionBaseModal";
import FormSection from "components/forms/FormSection/FormSection";

import { InsertDriveFile as File } from "@material-ui/icons";

export const WorkflowLaunchMappingModal = (props) => {
    const { mappings, onRequestClose } = props;

    // eslint-disable-next-line react/prop-types
    const fnRenderMapping = ({ name, number }) => {
        const onClick = () => {
            requestManager.openCaseWareDocument(number);
            onRequestClose();
        };

        return (
            <div
                className="Mapping"
                key={number}
                onClick={onClick}
            >
                <div className="Mapping__icon">
                    <File />
                </div>
                <div className="Mapping__label">
                    <div className="Mapping__label--number">{number}</div>
                    <div className="Mapping__label--name" title={name}>{name}</div>
                </div>
            </div>
        );
    };

    return (
        <AssertionBaseModal
            {...props}
            title="Launch Mapping"
            confirmText="Close"
            className="WorkflowLaunchMappingModal"
        >
            <FormSection
                className="MappingLauncher"
                title="Click on a mapping to launch it:"
                scrollable={true}
                autoSpace={false}
            >
                {mappings.map((i_oMapping) => fnRenderMapping(i_oMapping))}
            </FormSection>
        </AssertionBaseModal>
    );
};

WorkflowLaunchMappingModal.propTypes = {
    documents: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRequestClose: PropTypes.func.isRequired
};

export default WorkflowLaunchMappingModal;
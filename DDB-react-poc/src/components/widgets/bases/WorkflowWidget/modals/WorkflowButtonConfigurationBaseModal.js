
import React, { Component } from "react";
import "./WorkflowButtonConfigurationBaseModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";
import FormSection from "components/forms/FormSection/FormSection";
import TextField from "components/forms/InputField/TextField/TextField";
import SelectField from "components/forms/SelectField/SelectField";
import DocumentTree from "components/ui/DocumentTree/DocumentTree";
import FormikEffect from "components/enhancers/FormikEffect/FormikEffect";
import SelectedDocumentsDraggableList from "./SelectedDocumentsDraggableList/SelectedDocumentsDraggableList";
import DocumentManagerLoader from "./DocumentManagerLoader/DocumentManagerLoader";

import buttonTypes from "constants/widgets/workflowButtonTypes";

// TODO: remove the hack
import DraggableListInModalFix from "hacks/DraggableListInModalFix";

import { WORKFLOW_BUTTON_CONFIG } from "constants/language";


import update from "immutability-helper";
import * as Yup from "yup";
import { Search } from "@material-ui/icons";

const oInitTree = {
    name: WORKFLOW_BUTTON_CONFIG.DOCUMENT_MANAGER_FOLDER_NAME,
    loading: true,
    toggled: true,
    id: "DOCMANROOT",
    children: []
};

const oValidationSchema = Yup.object().shape({
    buttonLabel: Yup.string().required(WORKFLOW_BUTTON_CONFIG.BUTTON_LABEL_WARNING),
    buttonType: Yup.string(),
    search: Yup.string(),
    docTree: Yup.object(),
});


export class WorkflowButtonConfigurationBaseModal extends Component {
    constructor(props) {
        super(props);

        this.fullTreeData = { ...oInitTree };
        this.buttonTypes = Object.values(buttonTypes).map(
            (i_sType) => WORKFLOW_BUTTON_CONFIG[i_sType]
        );
        this.docTreeName = "docTree";
        this.selectedDocsName = "selectedDocs";

        this.state = {
            treeData: { ...oInitTree }
        };
    }

    fnLoadDocumentManager = (i_oTreebeardData) => {
        this.fullTreeData = i_oTreebeardData;
        this.setState((prevState) => {
            return update(prevState, {
                treeData: { $set: i_oTreebeardData }
            });
        });
    }

    fnFilterTreeBySearch = (i_sSearch) => {
        const sSearch = i_sSearch.trim().toLowerCase();
        if (sSearch === "") {
            this.setState((prevState) => {
                return update(prevState, {
                    treeData: { $set: this.fullTreeData }
                });
            });
        } else {
            let oTreeData = Utilities.deepClone(this.fullTreeData);
            fnFilterTree(oTreeData);

            this.setState((prevState) => {
                return update(prevState, {
                    treeData: { $set: oTreeData }
                });
            });
        }

        /**
         * Mutates given tree data to filter by search term.
         */
        function fnFilterTree(i_oTreeData) {
            let bChildMatch = false;

            const bFileMatch = i_oTreeData.name.toLowerCase().indexOf(sSearch) > -1 ||
                (i_oTreeData.number && i_oTreeData.number.toLowerCase().indexOf(sSearch) > -1);

            // Only filter folder if the folder hasn't matched and it has children.
            if (i_oTreeData.children !== undefined && !bFileMatch) {
                for (const oChild of i_oTreeData.children) {
                    fnFilterTree(oChild);
                }

                // Filter out children that are marked for deletion.
                i_oTreeData.children = i_oTreeData.children.filter((i_oChild) => !i_oChild.delete);

                // Atleast one child hasn't been filtered out.
                if (i_oTreeData.children.length > 0) {
                    bChildMatch = true;
                }
            }

            if (!(bFileMatch || bChildMatch)) {
                // The file itself isn't matched, and no children have been matched so filter this file out.
                i_oTreeData.delete = true;
            }

            if (bChildMatch) {
                // Toggle folder open if it has a child that's matched.
                i_oTreeData.toggled = true;
            }
        }
    }

    filterTreeBySearchDebounced = Utilities.debounce(this.fnFilterTreeBySearch, 150);

    fnOnFormikStateChange = (i_oCurrentFormikState, i_oNextFormikState) => {
        const sLastData = i_oCurrentFormikState.values;
        const sNextData = i_oNextFormikState.values;

        // Update filtered document tree.
        if (sLastData && sNextData &&
            sLastData.search !== undefined && sNextData.search !== undefined &&
            !Utilities.equalsIgnoreCase(sLastData.search, sNextData.search)) {
            this.filterTreeBySearchDebounced(sNextData.search);
        }
    };

    fnOnConfirmHandler = async (values) => {
        const oWorkflowButtonData = {
            ...values
        };

        await Utilities.runAsyncFunctionsWithParams([oWorkflowButtonData], this.props.onConfirm);
    };

    hackFuncs = DraggableListInModalFix(".WorkflowButtonConfigPortal", ".dragging-hack");

    render() {
        return (
            <ConfirmModal
                {...this.props}
                className="WorkflowButtonConfigurationBaseModal"
                onConfirm={this.fnOnConfirmHandler}

                // Formik props.
                initialValues={this.props.initWorkflowData}
                validationSchema={oValidationSchema}

                // TODO: remove the hack
                portalClassName="WorkflowButtonConfigPortal"
                onAfterOpen={this.hackFuncs.fnOnAfterOpenHandler}
                onStart={this.hackFuncs.fnOnDragHandler}
                onDrag={this.hackFuncs.fnOnDragHandler}
            >
                {/* Util components. */}
                <FormikEffect onChange={this.fnOnFormikStateChange} />
                <DocumentManagerLoader
                    docTreeName={this.docTreeName}
                    selectedDocsName={this.selectedDocsName}
                    launchDocuments={this.props.launchDocuments}
                    loadDocumentManager={this.fnLoadDocumentManager}
                />

                <FormSection
                    className="ConfigurationSection"
                    title={WORKFLOW_BUTTON_CONFIG.CONFIG_SECTION}
                    autoSpace={true}
                >
                    <TextField
                        name="buttonLabel"
                        title={WORKFLOW_BUTTON_CONFIG.BUTTON_LABEL_FIELD}
                        validate={this.validateButtonLabel}
                    />
                    <SelectField
                        name="buttonType"
                        title={WORKFLOW_BUTTON_CONFIG.BUTTON_TYPE_FIELD}
                        options={this.buttonTypes}
                    />
                </FormSection>
                <FormSection
                    className="MappingsSection"
                    title={WORKFLOW_BUTTON_CONFIG.SELECT_MAPPINGS_SECTION}
                    autoSpace={true}
                    shrinkable={true}
                    minHeight="10rem"
                >
                    <TextField
                        className="SearchField"
                        name="search"
                        title={<Search />}
                        titleWidth="10%"
                        placeholder={WORKFLOW_BUTTON_CONFIG.FILE_SEARCH_PROMPT}
                    />
                    <DocumentTree data={this.state.treeData} name={this.docTreeName} />
                </FormSection>
                <FormSection
                    className="SelectedMappings"
                    title={WORKFLOW_BUTTON_CONFIG.SELECTED_MAPPINGS_SECTION}
                    shrinkable={true}
                    minHeight="5rem"
                >
                    <SelectedDocumentsDraggableList
                        selectedDocsName={this.selectedDocsName}
                        docTreeName={this.docTreeName}

                        // TODO: remove the hack
                        helperClass="dragging-hack"
                        onSortStart={this.hackFuncs.fnSortStartHandler}
                        onSortMove={this.hackFuncs.fnSortMoveHandler}
                    />
                </FormSection>
            </ConfirmModal>
        );
    }
}

WorkflowButtonConfigurationBaseModal.propTypes = {
    initWorkflowData: PropTypes.object.isRequired,
    launchDocuments: PropTypes.arrayOf(PropTypes.object)
};

WorkflowButtonConfigurationBaseModal.defaultProps = {
    launchDocuments: []
};

export default WorkflowButtonConfigurationBaseModal;
import React from "react";
import "./ManageTabsFormSection.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { modalManager } from "managers";
import { modalTypes } from "constants/modals";
import * as actionTypes from "store/actions/actionTypes";
import availableOperations from "components/TabController/modals/TabManagerModal/availableOperations";
import * as operations from "store/operations/tab";

import { connect as connectFormik } from "formik";
import { connect as connectRedux } from "react-redux";

import IconButton from "components/ui/button/IconButton/IconButton";
import { Add } from "@material-ui/icons";
import * as LANG_CONST from "constants/language";
import FormSection from "components/forms/FormSection/FormSection";
import TabsDraggableList from "components/TabController/modals/TabManagerModal/ManageTabsFormSection/TabsDraggableList/TabsDraggableList";

const CONFIG = { $saveToServer: false };

const ManageTabsFormSection = (props) => {
    const { formik, pushNewOperation, tabsOrderName, tabsDataName, generateTabID, ...rest } = props;

    const addTabOpenHandler = () => {
        modalManager.openModal(modalTypes.TAB_ADD, {
            onConfirm: addTabSubmitHandler
        });
    };

    const addTabSubmitHandler = (i_oTabData) => {
        // Generate a tab ID
        const sTabID = generateTabID();

        // Locally add the tab
        const oUpdatedState = operations.addTab(formik.values, i_oTabData, sTabID, { ...CONFIG });

        // Update the form state
        formik.setFieldValue(tabsOrderName, oUpdatedState.tabOrder);
        formik.setFieldValue(tabsDataName, oUpdatedState.tabs);

        // Push the new operation into the operation list
        pushNewOperation(availableOperations.ADD_TAB, i_oTabData, sTabID);
    };

    return (
        <FormSection
            // Overwritable props
            title={LANG_CONST.MANGE_TABS_SECTION_TITLE}

            { ...rest }

            extensionItem={<IconButton><Add /></IconButton>}
            extensionItemOnClick={addTabOpenHandler}
            shrinkable={true}
            minHeight="5rem"
        >
            <TabsDraggableList 
                { ...rest }
                tabsOrderName={tabsOrderName}
                tabsDataName={tabsDataName}
                pushNewOperation={pushNewOperation}
            />
        </FormSection>
    );
};

ManageTabsFormSection.propTypes = {
    // Formik state names
    tabsOrderName: PropTypes.string.isRequired, // points to: array of strings
    tabsDataName: PropTypes.string.isRequired, // points to: points to: object of tab data

    pushNewOperation: PropTypes.func.isRequired,

    // Mapped dispatch funcs
    generateTabID: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({}); // Do nothing

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            generateTabID: actionTypes.tab.GENERATE_TAB_ID
        })
    };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(connectFormik(ManageTabsFormSection));

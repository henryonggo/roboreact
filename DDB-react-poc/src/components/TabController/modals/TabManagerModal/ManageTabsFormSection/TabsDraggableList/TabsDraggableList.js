import React from "react";
import "./TabsDraggableList.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { modalManager } from "managers";
import { modalTypes } from "constants/modals";
import * as operations from "store/operations/tab";
import availableOperations from "components/TabController/modals/TabManagerModal/availableOperations";
import { connect as connectFormik, getIn } from "formik";

import DataPairedDraggableList from "components/forms/DataPairedDraggableList/DataPairedDraggableList";
import IconButton from "components/ui/button/IconButton/IconButton";
import { Settings } from "@material-ui/icons";

const CONFIG = { $saveToServer: false };

const TabsDraggableList = (props) => {
    const { className, formik, tabsOrderName, tabsDataName, pushNewOperation, ...rest } = props;

    const editTabOpenHandler = (i_nIndex) => {
        const asTabIDs = getIn(formik.values, tabsOrderName);
        const oTabsData = getIn(formik.values, tabsDataName);

        const sCurrEditTabID = asTabIDs[i_nIndex];
        const oCurrEditTabData = oTabsData[sCurrEditTabID];

        // If no tab exists to edit then just set this to an empty object
        const oInitTabData = (oCurrEditTabData) ? {
            ...oCurrEditTabData,
        } : {};

        // Open edit tab modal
        modalManager.openModal(modalTypes.TAB_EDIT, {
            tabName: `${(oCurrEditTabData) ? oCurrEditTabData.name : ""}`,
            onConfirm: editTabSubmitHandler,
            initTabData: oInitTabData,
        });
    };

    const editTabSubmitHandler = (i_oTabData, i_sTabID) => {
        // Update the form state locally
        const oUpdatedState = operations.editTab(formik.values, i_sTabID, i_oTabData, { ...CONFIG });

        // Update form state
        formik.setFieldValue(tabsDataName, oUpdatedState.tabs);

        // Push the new operation into the operation list
        pushNewOperation(availableOperations.EDIT_TAB, i_sTabID, i_oTabData);
    };

    const removeTabHandler = (i_nIndex) => {
        const aTabOrder = getIn(formik.values, tabsOrderName);
        const oTabsData = getIn(formik.values, tabsDataName);

        const sTabID = aTabOrder[i_nIndex];
        const oRemTabData = oTabsData[sTabID];

        // Note: since DataPairedDraggableList is handling the removing of the tab data
        // we only need to push the operation into the operation list 
        pushNewOperation(availableOperations.REMOVE_TAB, i_nIndex, { ...CONFIG });
    };

    const renderTabItem = (i_sTabID) => {
        const oTabData = formik.values.tabs[i_sTabID];

        if (!oTabData) {
            return null;
        }

        const { name } = oTabData;

        return (
            <span>{name}</span>
        );
    };

    const sClasses = Utilities.injectClassNames("TabsDraggableList", className);

    return (
        <DataPairedDraggableList
            // Overwritable props
            axis="y"
            lockAxis="y"
            distance={5}
            // TODO: remove the hack
            helperClass="dragging-hack"
            useDragHandle={true}
            lockToContainerEdges={true}

            { ...rest }

            className={sClasses}
            name={tabsOrderName}
            dataName={tabsDataName}
            onItemRemove={removeTabHandler}
            renderItem={renderTabItem}
            extensionItem={<IconButton><Settings /></IconButton>}
            extensionItemOnClick={editTabOpenHandler}
        />
    );
};

TabsDraggableList.propTypes = {
    formik: PropTypes.object.isRequired,

    // Formik state names
    tabsOrderName: PropTypes.string.isRequired, // points to: array of strings
    tabsDataName: PropTypes.string.isRequired, // points to: object of tab data

    pushNewOperation: PropTypes.func.isRequired,
};

export default connectFormik(TabsDraggableList);

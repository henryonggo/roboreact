import React from "react";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";

import { connect as connectFormik, getIn } from "formik";

import DraggableList from "components/forms/DraggableList/DraggableList";

const DataPairedDraggableList = (props) => {
    const { className, formik, name, dataName, ...rest } = props;

    const onItemRemoveHandler = (i_nIndex) => {
        const asNames = getIn(formik.values, name);
        const oNamesData = getIn(formik.values, dataName);

        // Get the ID of the item to remove
        const sRemoveNameID = asNames[i_nIndex];

        // Remove name data
        const oRemovedNameData = update(oNamesData, {
            $unset: [sRemoveNameID]
        });

        // Update form state
        formik.setFieldValue(dataName, oRemovedNameData);

        // Note: the removal of the name list is handled by DraggableList
    };

    const sClasses = Utilities.injectClassNames("DataPairedDraggableList", className);
    const onItemremoveMerged = (i_nIndex) => Utilities.runFunctionsWithParams([i_nIndex], onItemRemoveHandler, rest.onItemRemove);

    return (
        <DraggableList
            { ...rest }

            className={sClasses}
            name={name}
            onItemRemove={onItemremoveMerged}
        />
    );
};

DataPairedDraggableList.propTypes = {
    // Formik state names
    name: PropTypes.string.isRequired, // points to: array of strings 
    dataName: PropTypes.string.isRequired, // points to: object of data
};

export default connectFormik(DataPairedDraggableList);

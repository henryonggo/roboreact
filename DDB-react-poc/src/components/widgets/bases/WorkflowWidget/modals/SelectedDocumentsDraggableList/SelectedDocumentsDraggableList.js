import React from "react";
import "./SelectedDocumentsDraggableList.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import DraggableList from "components/forms/DraggableList/DraggableList";
import { connect as connectFormik, getIn } from "formik";


export const SelectedDocumentsDraggableList = (props) => {
    const { formik, selectedDocsName, docTreeName, ...rest } = props;

    const fnRenderDocument = (i_sFormikName) => {
        const oDocumentField = getIn(formik.values, `${docTreeName}.${i_sFormikName}`);

        return (
            <div className="SelectedDocument">
                <div className="SelectedDocument__number">
                    {oDocumentField.number}
                </div>
                <div className="SelectedDocument__name" title={oDocumentField.name}>
                    {oDocumentField.name}
                </div>
            </div>
        );
    };

    const fnRemoveSelectedDocument = (i_nIndex, i_sName) => {
        const sFieldName = `${docTreeName}.${i_sName}`;
        // Uncheck document in doc tree.
        formik.setFieldValue(sFieldName, { ...getIn(formik.values, sFieldName), checked: false });
    };

    return (
        <DraggableList
            {...rest}
            name={selectedDocsName}
            className={Utilities.injectClassNames(props.className, "SelectedDocumentsDraggableList")}
            useDragHandle={true}
            onItemRemove={fnRemoveSelectedDocument}
            renderItem={fnRenderDocument}
        />
    );
};

SelectedDocumentsDraggableList.propTypes = {
    // Formik props.
    formik: PropTypes.object.isRequired,
    docTreeName: PropTypes.string.isRequired
};

export default connectFormik(SelectedDocumentsDraggableList);
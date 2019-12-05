import React, { Component } from "react";
import PropTypes from "prop-types";
import Utilities from "utilities";

import { Folder, InsertDriveFile as File } from "@material-ui/icons";
import { connect as connectFormik, getIn } from "formik";

import Checkbox from "components/forms/Checkbox/Checkbox";

export class CheckableHeader extends Component {
    /**
     * Note: formik.setFieldValue causes race conditions in certain cases, 
     * so we're setting the field values directly on the object.
     * 
     * We use setFieldValue to trigger rerenders when needed, since when modifying the
     * objects directly, React won't know if it needs to rerender.
     **/
    constructor(props) {
        super(props);

        const { node, name } = this.props;

        this.fieldName = `dcItem${node.id}`;
        this.fullFieldName = `${name}.dcItem${node.id}`;
    }

    toggleSelf = () => {
        const { node, formik } = this.props;
        const oTreeValue = getIn(formik.values, this.fullFieldName);

        if (oTreeValue.checked) {
            this.uncheckCheckbox(node);
        } else {
            this.checkCheckbox(node);
        }

        // Set all child nodes to same status if folder.
        if (node.children) {
            this.setChildren(node.children, !oTreeValue.checked);
        }
    };

    checkCheckbox = (node) => {
        const { formik, name } = this.props;

        const sFieldName = `dcItem${node.id}`;
        const oDocTreeField = getIn(formik.values, name);
        oDocTreeField[sFieldName] = { ...oDocTreeField[sFieldName], checked: true };

        if (!node.children) {
            let aSelectedDocs = getIn(formik.values, "selectedDocs");
            aSelectedDocs.push(sFieldName);
        }

        // Force rerender workaround.
        formik.setFieldValue();
    };

    uncheckCheckbox = (node) => {
        const { formik, name } = this.props;

        const sFieldName = `dcItem${node.id}`;
        const oDocTreeField = getIn(formik.values, name);
        oDocTreeField[sFieldName] = { ...oDocTreeField[sFieldName], checked: false };

        if (!node.children) {
            let aSelectedDocs = getIn(formik.values, "selectedDocs");
            aSelectedDocs.splice(aSelectedDocs.indexOf(sFieldName), 1);
        }

        // Force rerender workaround.
        formik.setFieldValue();
    };

    setChildren = (i_aChildren, i_bCheck) => {
        const setChild = i_bCheck ? this.checkCheckbox : this.uncheckCheckbox;

        for (const oChild of i_aChildren) {
            setChild(oChild);
            if (oChild.children) {
                this.setChildren(oChild.children, i_bCheck);
            }
        }
    };

    render() {
        const { node, style, formik } = this.props;

        const oFormikValue = getIn(formik.values, this.fullFieldName);
        const bNodeChecked = oFormikValue ? oFormikValue.checked : false;

        return (
            <span
                className={
                    Utilities.injectClassNames(
                        "DocumentTree__header",
                        node.children === undefined && "DocumentTree__header-file"
                    )
                }
                style={{ ...style.title }}
            >
                <span className="DocumentTree__documentItem">
                    <Checkbox
                        selected={bNodeChecked}
                        onClick={() => this.toggleSelf()}
                    />
                    {node.children === undefined ? <File /> : <Folder />}
                    {node.number && <span className="DocumentTree__documentNumber">{node.number}</span>}
                    <span className="DocumentTree__documentName" title={node.name}>{node.name}</span>
                </span>
            </span>
        );
    }

};

CheckableHeader.propTypes = {
    // Formik props.
    formik: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired, // Points to the custom config object

    node: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    style: PropTypes.object
};

CheckableHeader.defaultProps = {
    checked: false,
    style: {}
};

export default connectFormik(CheckableHeader);
import { Component } from "react";
import PropTypes from "prop-types";
import { requestManager } from "managers";

import { connect as connectFormik, getIn } from "formik";

export class DocumentManagerLoader extends Component {
    async componentDidMount() {
        const {
            formik,
            docTreeName,
            selectedDocsName,
            launchDocuments,
            loadDocumentManager
        } = this.props;

        /**
         * Converts the provided document manager data into react-treebeard format.
         * Also initializes the formik field values for each checkbox.
         */
        const fnProcessDocumentManager = (i_oTreeData) => {
            let oRoot = {
                name: "Document Manager",
                id: "DOCMANROOT",
                toggled: true,
                children: fnProcessDocuments(i_oTreeData.documents)
            };

            return oRoot;
        };

        const fnProcessDocuments = (i_aTreeData) => {
            let aConvertedTree = [];

            let oDocTreeField = getIn(formik.values, docTreeName);
            let aSelectedDocsField = getIn(formik.values, selectedDocsName);

            // Convert documents in the given array.
            for (const oNode of i_aTreeData) {
                const oConvertedNode = {
                    number: oNode.number,
                    name: oNode.name,
                    id: oNode.guid,
                };

                // Convert children if folder.
                if (oNode.documents) {
                    oConvertedNode.children = fnProcessDocuments(oNode.documents);
                } else {
                    // Check if file is a launch doc (selected from before).
                    const nLaunchDocIndex = launchDocuments
                        .findIndex((i_oLaunchDoc) => i_oLaunchDoc.number === oConvertedNode.number);
                    const bLaunchDoc = nLaunchDocIndex > -1;

                    // Initialize all formik fields.
                    const sFieldName = `dcItem${oConvertedNode.id}`;
                    oDocTreeField[sFieldName] = {
                        number: oConvertedNode.number,
                        name: oConvertedNode.name,
                        checked: bLaunchDoc
                    };

                    if (bLaunchDoc) {
                        aSelectedDocsField[nLaunchDocIndex] = sFieldName;
                    }
                }

                aConvertedTree.push(oConvertedNode);
            }

            // Filter out in case there are any empty array slots. (Doc was removed/renamed so it's index isn't filled in, etc.)
            formik.setFieldValue(selectedDocsName, aSelectedDocsField.filter((i_oDoc) => !!i_oDoc));

            return aConvertedTree;
        };

        // Grab document manager tree data from WP.
        if (requestManager.inCWEnv()) {
            const oResp = await requestManager.getDocumentManagerJSON();
            // Convert into react-treebeard format.
            const oTreebeardData = fnProcessDocumentManager(oResp.data.message.root);
            loadDocumentManager(oTreebeardData);
        }
    }

    render() {
        return null;
    }
}

DocumentManagerLoader.propTypes = {
    // Formik props.
    formik: PropTypes.object.isRequired,
    docTreeName: PropTypes.string.isRequired,
    selectedDocsName: PropTypes.string.isRequired,

    launchDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadDocumentManager: PropTypes.func.isRequired
};

export default connectFormik(DocumentManagerLoader);
import React from "react";
import "./ManageWidgetsFormSection.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import update from "immutability-helper";
import * as LANG_CONST from "constants/language";

import { connect as connectFormik, getIn } from "formik";

import { connect as connectRedux } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";

import { modalManager } from "managers";
import { modalTypes } from "constants/modals";

import IconButton from "components/ui/button/IconButton/IconButton";
import { Add } from "@material-ui/icons";
import FormSection from "components/forms/FormSection/FormSection";
import WidgetsDraggableList from "components/TabController/modals/TabConfigurationBaseModal/ManageWidgetsFormSection/WidgetsDraggableList/WidgetsDraggableList";


const ManageWidgetsFormSection = (props) => {
    const { className, formik, widgetsOrderName, widgetsDataName, generateWidgetID, ...rest } = props;

    const addWidgetsOpenHandler = () => {
        modalManager.openModal(modalTypes.WIDGET_PRESET_ADD_SELECTOR, {
            onConfirm: addWidgetsSubmitHandler,
        });
    };

    const addWidgetsSubmitHandler = (i_aSelectedWidgetPresets) => {
        // Get form state
        const asWidgetsIDs = getIn(formik.values, widgetsOrderName);
        const oWidgetsData = getIn(formik.values, widgetsDataName);

        // Initialize updated state
        let asUpdatedWidgetsID = asWidgetsIDs;
        let oUpdatedWidgetsData = oWidgetsData;

        i_aSelectedWidgetPresets.forEach((i_oWidgetPresetInfo) => {
            // Add the new widget to the form
            const { asNewWidgetsIDs, oNewWidgetsData } = addWidget(i_oWidgetPresetInfo, asUpdatedWidgetsID, oUpdatedWidgetsData);

            // Update updated state
            asUpdatedWidgetsID = asNewWidgetsIDs;
            oUpdatedWidgetsData = oNewWidgetsData;
        });

        formik.setFieldValue(widgetsOrderName, asUpdatedWidgetsID);
        formik.setFieldValue(widgetsDataName, oUpdatedWidgetsData);
    };

    const addWidget = (i_oWidgetPresetInfo, i_asUpdatedWidgetsID, i_oUpdatedWidgetsData) => {
        const sWidgetID = generateWidgetID();

        const { id, type } = i_oWidgetPresetInfo;

        // Construct widget data
        const oWidgetData = {
            id: sWidgetID,
            presetID: id,
            presetType: type,
        };

        // Add the widget ID to the widget ID list
        const asUpdatedWidgetsIDs = update(i_asUpdatedWidgetsID, {
            $push: [sWidgetID]
        });

        // Add the widget data to the widget data list
        const oUpdatedWidgetsData = update(i_oUpdatedWidgetsData, {
            [sWidgetID]: { $set: oWidgetData }
        });

        // Return the new updated state
        return {
            asNewWidgetsIDs: asUpdatedWidgetsIDs,
            oNewWidgetsData: oUpdatedWidgetsData
        };
    };

    const sClasses = Utilities.injectClassNames(className, "ManageWidgetsFormSection");

    return (
        <FormSection
            title={LANG_CONST.MANGE_WIDGETS_TITLE}

            { ...rest }

            className={sClasses}
            extensionItem={<IconButton><Add /></IconButton>}
            extensionItemOnClick={addWidgetsOpenHandler}

            shrinkable={true}
            minHeight="5rem"
        >
            <WidgetsDraggableList
                { ...rest }

                widgetsOrderName={widgetsOrderName}
                widgetsDataName={widgetsDataName}
            />
        </FormSection>
    );
};

ManageWidgetsFormSection.propTypes = {
    className: PropTypes.string,
    widgetsOrderName: PropTypes.string.isRequired,
    widgetsDataName: PropTypes.string.isRequired,

    // Mapped store actions
    generateWidgetID: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({}); // Do nothing

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            generateWidgetID: actionTypes.tab.GENERATE_WIDGET_ID
        })
    };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(connectFormik(ManageWidgetsFormSection));

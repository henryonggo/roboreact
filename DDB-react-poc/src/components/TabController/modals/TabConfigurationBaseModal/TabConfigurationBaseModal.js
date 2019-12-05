import React, { Component } from "react";
import "./TabConfigurationBaseModal.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";

import TextField from "components/forms/InputField/TextField/TextField";
import NumberField from "components/forms/InputField/NumberField/NumberField";
import * as Yup from "yup";
import * as LANG_CONST from "constants/language";

import FormSection from "components/forms/FormSection/FormSection";
import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";

import { MIN_COL_NUM, MAX_COL_NUM } from "constants/app";

import ManageWidgetsFormSection from "components/TabController/modals/TabConfigurationBaseModal/ManageWidgetsFormSection/ManageWidgetsFormSection";

// TODO: remove the hack
import DraggableListInModalFix from "hacks/DraggableListInModalFix";

const INIT_TAB_DATA = {
    name: "",
    tooltip: "",
    numCols: 1,
    widgets: {},
    widgetOrder: []
};
const TabConfigShema = Yup.object().shape({
    name: Yup.string()
        .required(LANG_CONST.NAME_NOT_PROVIDED_ERR),
    tooltip: Yup.string(),
    numCols: Yup.number()
        .min(MIN_COL_NUM, LANG_CONST.INVALID_COLUMN_AMOUNT_ERR)
        .max(MAX_COL_NUM, LANG_CONST.INVALID_COLUMN_AMOUNT_ERR),
    widgets: Yup.object(),
    widgetOrder: Yup.array()
});

class TabConfigurationBaseModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initTabData: { 
                ...INIT_TAB_DATA, 
                ...props.initTabData 
            }
        };
    }

    // ----------------
    // --- Handlers ---
    // ----------------

    fnOnConfirmHandler = async (values, actions) => {
        const oTabData = { 
            ...values,
        };

        // NOTE: this will be undefined if the tab is added (i.e. it never had an ID in the first place)
        const sOldTabID = oTabData.id;

        delete oTabData.id; // Remove the id entry

        // Pass-through the payload to the onConfirm callback
        await Utilities.runFunctionsWithParams([oTabData, sOldTabID], this.props.onConfirm);
    }
    
    hackFuncs = DraggableListInModalFix(".TabConfigPortal", ".dragging-hack");

    render() {
        // Grab the modal names
        const { className, ...rest } = this.props;

        return (
            // Tab Config Modal
            <ConfirmModal
                { ...rest }

                // Formik props
                initialValues={this.state.initTabData}
                validationSchema={TabConfigShema}

                useFlexbox={true}
                className={Utilities.injectClassNames(className, "TabConfigModal")}
                onConfirm={this.fnOnConfirmHandler}

                // TODO: remove the hack
                portalClassName="TabConfigPortal"
                onAfterOpen={this.hackFuncs.fnOnAfterOpenHandler}
                onStart={this.hackFuncs.fnOnDragHandler}
                onDrag={this.hackFuncs.fnOnDragHandler}
            >
                <FormSection title={LANG_CONST.TAB_CONFIG_GENERAL_TITLE} autoSpace={true}>
                    <TextField title={LANG_CONST.TAB_CONFIG_NAME_TITLE} name="name" />
                    <TextField title={LANG_CONST.TAB_CONFIG_TOOLTIP_TITLE} name="tooltip" />
                </FormSection>

                <FormSection title={LANG_CONST.TAB_CONFIG_LAYOUT_TITLE} autoSpace={true}>
                    <NumberField 
                        title={LANG_CONST.TAB_CONFIG_NUM_COLS_TITLE}
                        name="numCols"
                        minValue={MIN_COL_NUM}
                        maxValue={MAX_COL_NUM}
                    />
                </FormSection>

                <ManageWidgetsFormSection 
                    widgetsOrderName="widgetOrder"
                    widgetsDataName="widgets"

                    // TODO: remove the hack
                    helperClass="dragging-hack"
                    onSortStart={this.hackFuncs.fnSortStartHandler}
                    onSortMove={this.hackFuncs.fnSortMoveHandler}
                />
            </ConfirmModal>
        );
    }
}

TabConfigurationBaseModal.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,

    // Note, onConfirm is redefined here because the callback is modified to pass through a payload
    onConfirm: PropTypes.func, 

    // NOTE: this must match the tab object layout
    initTabData: PropTypes.shape({
        name: PropTypes.string,
        tooltip: PropTypes.string,
        numCols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        widgets: PropTypes.objectOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })),
        widgetOrder: PropTypes.arrayOf(PropTypes.string)
    }),
};

TabConfigurationBaseModal.defaultProps = {
    initTabData: {
        ...INIT_TAB_DATA,
    },
};

export default TabConfigurationBaseModal;
import React, { Component } from "react";
import "./WidgetPresetManagerModal.scss";
import PropTypes from "prop-types";
import update from "immutability-helper";
import Utilities from "utilities";
import availableOperations from "components/widgets/modals/WidgetPresetManagerModal/availableOperations";
import { requestManager, notificationManager } from "managers";
import * as LANG_CONST from "constants/language";

import * as actionTypes from "store/actions/actionTypes";
import { connect as connectRedux } from "react-redux";

import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";
import WidgetPresetManagerModalFormSection from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetManagerModalFormSection/WidgetPresetManagerModalFormSection";

const DEFAULT_SELECTION_VALUE = false;
const DEFAULT_DISABLED_VALUE = false;

const FORMIK_PRESETS_DATA = "presets";
const FORMIK_SELECTED_PRESETS = "presetsSelected";

// Maps the available operations to the mapped dispatch functions from the Redux store
const OPERATIONS_MAP = {
    [availableOperations.ADD_WIDGET_PRESET]: "addWidgetPreset",
    [availableOperations.EDIT_WIDGET_PRESET]: "editWidgetPreset",
    [availableOperations.REMOVE_WIDGET_PRESET]: "removeWidgetPreset",
};

// Generates the default state for the selection indicators
const _fnGenerateInitialPresetSelections = (i_oPresets, i_bClientFile) => {
    const initializeWidgetPresetSelections = (i_oWidgetsPresets) => {
        return Object.entries(i_oWidgetsPresets).reduce((acc, [i_sWidgetID, i_oWidgetData]) => {
            const bHidden = i_bClientFile && i_oWidgetData.metaData.hidden; 
            const bSystem = i_oWidgetData.metaData.system;

            // Filter the hidden or system widget presets
            if (bHidden || bSystem) {
                return [ ...acc ];
            }

            return [
                ...acc,
                ...[ { 
                    id: i_oWidgetData.id, 
                    selected: DEFAULT_SELECTION_VALUE, 
                    disabled: DEFAULT_DISABLED_VALUE,
                }]
            ];
        }, []);
    };

    return Object.entries(i_oPresets).reduce((acc, [widgetType, widgetPresets]) => {
        return [
            ...acc,
            ...[{ name: widgetType, items: initializeWidgetPresetSelections(widgetPresets) }]
        ];
    }, []);
};

export class WidgetPresetManagerModal extends Component {
    constructor(props) {
        super(props);

        const bClientFile = requestManager.inCWEnv() && !props.systemInfo.isMaster;

        this.state = {
            initFormData: {
                presets: { ...props.presets },
                presetsSelected: _fnGenerateInitialPresetSelections(props.presets, bClientFile)
            },

            operationList: [],
            groupID: Utilities.generateUniqueID(),
        };
    }

    onConfirmHandler = async (values, actions) => {
        const aOperations = [...this.state.operationList];

        // Run all cached operations 
        aOperations.forEach((fnOperation) => fnOperation());

        // Filter the selected presets
        const aSelectedPresetData = this._filterSelectedPresets(values.presetsSelected);

        if (aOperations.length > 0) {
            notificationManager.showInfo(LANG_CONST.MANAGE_WIDGET_PRESETS_UPDATED_SUCCESS_MESSAGE);
        }

        await Utilities.runAsyncFunctionsWithParams([aSelectedPresetData], this.props.onConfirm);
    }

    _filterSelectedPresets = (i_aSelectedPresets) => {
        const bClientFile = requestManager.inCWEnv() && !this.props.systemInfo.isMaster;

        return i_aSelectedPresets.reduce((acc, i_oSectionData) => {
            return [
                ...acc,
                ...this._fnFilterSectionData(i_oSectionData, bClientFile)
            ];
        }, []);
    }

    _fnFilterSectionData = (i_oSectionData, i_bClientFile) => {
        const { items, name } = i_oSectionData;

        return items.reduce((acc, i_oWidgetPresetInfo) => {
            const { disabled, selected, id } = i_oWidgetPresetInfo;
            const bSelectCurrItem = !disabled && selected;

            const oRetData = (bSelectCurrItem) ? [{
                type: name,
                id: id
            }] : [];

            return [
                ...acc,
                ...oRetData
            ];
        }, []);
    }

    pushNewOperationHandler = (i_sOperationName, ...params) => {
        // Get the name of the operation as stored in the props
        const sOperationPropName = OPERATIONS_MAP[i_sOperationName];

        // Get the operation function
        const fnOperationFunc = this.props[sOperationPropName];

        // Construct the parameters to run the operation function with
        const aOperationParams = [...params, { $group: this.state.groupID }];

        // Construct the function to be pushed into the operation cache
        const fnExecutionFunc = () => Utilities.runFunctionsWithParams(aOperationParams, fnOperationFunc);

        // Push the constructed operation to the cache
        this.setState(prevState => (
            update(prevState, {
                operationList: { $push: [fnExecutionFunc]}
            })
        ));
    }

    render() {
        const { className, confirmText, title, disabled, ...rest } = this.props;
        const sClassNames = Utilities.injectClassNames(className, "WidgetPresetManagerModal");

        return (
            <ConfirmModal
                {...rest}

                // Formik props
                initialValues={this.state.initFormData}

                useFlexbox={true}
                className={sClassNames}
                title={title}
                confirmText={confirmText}
                onConfirm={this.onConfirmHandler}
            >
                <WidgetPresetManagerModalFormSection 
                    presetsDataName={FORMIK_PRESETS_DATA}
                    selectedPresetsName={FORMIK_SELECTED_PRESETS}

                    pushNewOperation={this.pushNewOperationHandler}
                    generateWidgetPresetID={this.props.generateWidgetPresetID}
                    disabled={disabled}
                />
            </ConfirmModal>
        );
    }
}

WidgetPresetManagerModal.propTypes = {
    disabled: PropTypes.bool,
    confirmText: PropTypes.string,
    title: PropTypes.string,
    onConfirm: PropTypes.func, // Param: (selected presets data)

    // Mapped store state
    presets: PropTypes.object.isRequired,
    systemInfo: PropTypes.object.isRequired,

    // Mapped dispatch funcs
    addWidgetPreset: PropTypes.func.isRequired,
    editWidgetPreset: PropTypes.func.isRequired,
    removeWidgetPreset: PropTypes.func.isRequired,
    generateWidgetPresetID: PropTypes.func.isRequired,
};

WidgetPresetManagerModal.defaultProps = {
    disabled: true,
    confirmText: LANG_CONST.SUBMIT_BTN_TEXT,
    title: LANG_CONST.MANGE_WIDGETS_TITLE,
};

const mapStateToProps = (state) => {
    return {
        presets: state.present.widget.presets,
        systemInfo: state.present.general.systemInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            addWidgetPreset: actionTypes.widget.ADD_WIDGET_PRESET,
            editWidgetPreset: actionTypes.widget.EDIT_WIDGET_PRESET,
            removeWidgetPreset: actionTypes.widget.REMOVE_WIDGET_PRESET,
            generateWidgetPresetID: actionTypes.widget.GENERATE_WIDGET_PRESET_ID,
        })
    };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(WidgetPresetManagerModal);
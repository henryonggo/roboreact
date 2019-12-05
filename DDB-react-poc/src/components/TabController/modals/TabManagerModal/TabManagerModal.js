import React, { Component } from "react";
import "./TabManagerModal.scss";
import PropTypes from "prop-types";
import update from "immutability-helper";
import Utilities from "utilities";
import * as actionTypes from "store/actions/actionTypes";
import * as LANG_CONST from "constants/language";
import { notificationManager } from "managers";

import availableOperations from "components/TabController/modals/TabManagerModal/availableOperations";
import { connect } from "react-redux";

import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";

// TODO: remove the hack
import DraggableListInModalFix from "hacks/DraggableListInModalFix";

import ManageTabsFormSection from "components/TabController/modals/TabManagerModal/ManageTabsFormSection/ManageTabsFormSection";

// Maps the available operations to the mapped dispatch functions from the Redux store
const OPERATIONS_MAP = {
    [availableOperations.ADD_TAB]: "addTab",
    [availableOperations.EDIT_TAB]: "editTab",
    [availableOperations.REMOVE_TAB]: "removeTab",
    [availableOperations.CHANGE_TAB_ORDER]: "changeTabOrder",
};
class TabManagerModal extends Component {
    constructor(props) {
        super(props);
		
        this.state = {
            tabsData: {
                tabs: { ...props.tabs },
                tabOrder: [ ...props.tabOrder ],
            },
            operationList: [],
            groupID: Utilities.generateUniqueID(),
        };
    }

    // TODO: remove the hack
    hackFuncs = DraggableListInModalFix(".TabManagerPortal", ".dragging-hack");

    fnOnSubmitHandler = async () => {
        const aOperations = [ ...this.state.operationList ];

        // Run all cached operations 
        aOperations.forEach((fnOperation) => fnOperation());

        if (aOperations.length > 0) {
            notificationManager.showInfo(LANG_CONST.MANAGE_TABS_UPDATED_SUCCESS_MESSAGE);
        }

        await Utilities.runAsyncFunctions(this.props.onConfirm);
    }

    fnPushNewOperationHandler = (i_sOperationName, ...params) => {
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
                operationList: { $push: [fnExecutionFunc] }
            })
        ));
    }

    render() {
        const { className, ...rest } = this.props;

        const sClasses = Utilities.injectClassNames("TabManagerModal", className);

        return (
            <ConfirmModal
                { ...rest }

                // Formik props
                initialValues={this.state.tabsData}

                className={sClasses}
                title={LANG_CONST.MANAGE_TABS_TITLE}

                onConfirm={this.fnOnSubmitHandler}
                useFlexbox={true}

                // TODO: remove the hack
                portalClassName="TabManagerPortal"
                onAfterOpen={this.hackFuncs.fnOnAfterOpenHandler}
                onStart={this.hackFuncs.fnOnDragHandler}
                onDrag={this.hackFuncs.fnOnDragHandler}
            >
                <ManageTabsFormSection 
                    tabsOrderName="tabOrder"
                    tabsDataName="tabs"

                    pushNewOperation={this.fnPushNewOperationHandler}

                    // TODO: remove the hack
                    onSortStart={this.hackFuncs.fnSortStartHandler}
                    onSortMove={this.hackFuncs.fnSortMoveHandler}
                />
            </ConfirmModal>
        );
    }
}

TabManagerModal.propTypes = {
    className: PropTypes.string,

    tabs: PropTypes.object.isRequired,
    tabOrder: PropTypes.arrayOf(PropTypes.string).isRequired,

    // Mapped dispatch funcs
    addTab: PropTypes.func.isRequired,
    removeTab: PropTypes.func.isRequired,
    editTab: PropTypes.func.isRequired,
    changeTabOrder: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({}); // Do nothing

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            addTab: actionTypes.tab.ADD_TAB,
            removeTab: actionTypes.tab.REMOVE_TAB,
            editTab: actionTypes.tab.EDIT_TAB,
            changeTabOrder: actionTypes.tab.CHANGE_TAB_ORDER,
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabManagerModal);
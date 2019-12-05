import React, { Component } from "react";
import "./TabAdd.scss";
import update from "immutability-helper";
import Utilities from "utilities";
import PropTypes from "prop-types";
import { modalManager } from "managers";
import { modalTypes } from "constants/modals";
import { connect } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";
import { notificationManager } from "managers";
import * as LANG_CONST from "constants/language";

import TabItem from "components/TabController/TabBar/TabItem/TabItem";
import { Add } from "@material-ui/icons";

class TabAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        };
    }

    _fnSetSelected = (i_bSelected) => {
        this.setState(prevState => {
            const oUpdatedState = update(prevState, {
                isSelected: { $set: i_bSelected }
            });
            return oUpdatedState;
        });
    }

    // ----------------
    // --- Handlers ---
    // ----------------

    fnOnTabAddHandler = (i_oData) => {
        const { generateTabID, addTab, openTab, focusOnTabAdd } = this.props;

        const sGroupID = `group-${Utilities.generateUniqueID()}`;
        const sTabID = generateTabID();

        // Create the new tab
        const sTabId = addTab(i_oData, sTabID, { $group: sGroupID });

        if (focusOnTabAdd) {
            // Focus the newly created tab
            openTab(sTabId, { $group: sGroupID });   
        }

        // Show message indicating the tab as added
        notificationManager.showInfo(Utilities.constructStringTemplate(LANG_CONST.ADD_TAB_TEMPLATE_MESSAGE, i_oData.name));
    }

    fnOnConfigCloseHandler = () => {
        // Set deselect state
        this._fnSetSelected(false);
    }

    fnOpenTabHandler = () => {
        // Set select state
        this._fnSetSelected(true);

        // Open the tab add modal
        modalManager.openModal(modalTypes.TAB_ADD, {
            onRequestClose: this.fnOnConfigCloseHandler,
            onConfirm: this.fnOnTabAddHandler,
        });
    }

    render() {
        return (
            <div className="TabAdd">
                <TabItem
                    onTabClick={this.fnOpenTabHandler}
                    selected={this.state.isSelected}
                    removable={false}
                >
                    <Add className="TabAdd__add-icon" />
                </TabItem>
            </div>
        );
    }
}

TabAdd.propTypes = {
    focusOnTabAdd: PropTypes.bool,

    // Mapped store state to props
    widgetPresets: PropTypes.object.isRequired,

    // Mapped store actions to props
    generateTabID: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired,
    openTab: PropTypes.func.isRequired,
};

TabAdd.defaultProps = {
    focusOnTabAdd: true
};

const mapStateToProps = (state) => ({
    widgetPresets: state.present.widget.presets,
}); 

const mapDispatchToProps = (dispatch) => ({
    ...Utilities.mapDispatchToPropsHelper(dispatch, {
        generateTabID: actionTypes.tab.GENERATE_TAB_ID,
        addTab: actionTypes.tab.ADD_TAB,
        openTab: actionTypes.tab.CHANGE_OPEN_TAB,
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(TabAdd);
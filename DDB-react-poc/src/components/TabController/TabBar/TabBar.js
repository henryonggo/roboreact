import React, { Component } from "react";
import "./TabBar.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { connect } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";
import { modalManager } from "managers";
import * as LANG_CONST from "constants/language";

import TabItem from "components/TabController/TabBar/TabItem/TabItem";
import TabAdd from "components/TabController/TabBar/TabItem/TabAdd/TabAdd";
import TabBarMenuManager from "components/TabController/TabBar/TabBarMenuManager/TabBarMenuManager";

const SortableTabItem = sortableElement((props) => {
    return (
        <TabItem {...props}>
            {/* <div className="Title">{props.children}</div> */}
            {props.children}
        </TabItem>
    );
});

const SortableTabContainer = sortableContainer(({ children }) => {
    return (
        <div className="TabBar__tab-items-list">
            {children}
        </div>
    );
});


class TabBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO: remove the hack
            tabItemClearAnims: ""
        };

        // A reference to the root tab bar element
        this.tabBarEl = null;
    }

    // Returns the tab bar element reference
    // Note: this is needed because the ref callback does not set the reference right away
    _fnGetTabBarElement = () => this.tabBarEl;

    tabSortEndHandler = () => {
        // TODO: remove the hack
        this._tabClearAnimsHack();
    }

    fnOnSortEndHandler = ({ oldIndex, newIndex }) => {
        this.props.changeTabOrder(oldIndex, newIndex);
    };

    // TODO: remove the hack
    _tabClearAnimsHack = () => {
        this.setState({ tabItemClearAnims: "TabItem--clear-anims"} );

        setTimeout(() => {
            this.setState({ tabItemClearAnims: ""});
        }, 0);
    }

    removeTabHandler = (i_nIdx, i_sTabName) => {
        modalManager.openConfirmModal({
            onConfirm: () => this.props.removeTab(i_nIdx),
            children: LANG_CONST.CONFIRM_TAB_REMOVE_TEXT,
            title: i_sTabName,
        });
    };

    changeOpenTabHandler = (i_sTabID) => {
        this.props.changeOpenTab(i_sTabID);
    };


    render() {
        const { tabs, tabOrder, currTabID } = this.props;

        return (
            <div className="TabBar" ref={(el) => this.tabBarEl = el}>
                <div className="TabBar__tab-container">
                    <div className="TabBar__spoof-margin"></div>

                    <SortableTabContainer
                        onSortEnd={ (data, e) => Utilities.runFunctionsWithParams([data, e], this.tabSortEndHandler, this.fnOnSortEndHandler) }
                        axis="x"
                        lockAxis="x"
                        distance={5}
                        helperClass="TabItem--dragging"
                        helperContainer={this._fnGetTabBarElement}
                    >

                        {
                            // Generate tab items
                            tabOrder.map((sTabID, nIndex) => {
                                const oCurrTab = tabs[sTabID];
                                const sTabName = oCurrTab.name;
                                const bRemovable = oCurrTab.removable;

                                return (
                                    <SortableTabItem
                                        key={nIndex}
                                        index={nIndex}

                                        // TODO: remove the hack
                                        className={this.state.tabItemClearAnims}

                                        onTabClick={() => this.changeOpenTabHandler(sTabID)}
                                        onCloseClick={() => this.removeTabHandler(nIndex, sTabName)}
                                        selected={(currTabID === sTabID)}
                                        removable={bRemovable}

                                        tooltip={oCurrTab.tooltip}
                                    >
                                        {sTabName}
                                    </SortableTabItem>
                                );
                            })
                        }
                    </SortableTabContainer>
                    <TabAdd/>
                </div>

                <TabBarMenuManager
                    tabs={tabs}
                    tabOrder={tabOrder}
                />
            </div>
        );
    }
}

TabBar.propTypes = {
    // Mapped store state
    tabs: PropTypes.object.isRequired,
    tabOrder: PropTypes.array.isRequired,
    currTabID: PropTypes.string,

    // Mapped dispatch funcs
    removeTab: PropTypes.func.isRequired,
    changeOpenTab: PropTypes.func.isRequired,
    changeTabOrder: PropTypes.func.isRequired,
    updateWidgetLayout: PropTypes.func.isRequired,
    updateAllWidgetLayouts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        tabs: state.present.tab.tabs,
        tabOrder: state.present.tab.tabOrder,
        currTabID: state.present.tab.currTabID
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            removeTab: actionTypes.tab.REMOVE_TAB,
            changeOpenTab: actionTypes.tab.CHANGE_OPEN_TAB,
            changeTabOrder: actionTypes.tab.CHANGE_TAB_ORDER,
            updateWidgetLayout: actionTypes.tab.UPDATE_WIDGET_LAYOUT,
            updateAllWidgetLayouts: actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
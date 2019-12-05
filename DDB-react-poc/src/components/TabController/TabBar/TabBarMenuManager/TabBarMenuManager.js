import React, { Component } from "react";
import "./TabBarMenuManager.scss";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { modalManager, requestManager } from "managers";
import { modalTypes } from "constants/modals";
import { connect as connectRedux } from "react-redux";
import * as LANG_CONST from "constants/language";

import HamburgerMenu from "components/ui/HamburgerMenu/HamburgerMenu";

import { Tab, Widgets, Settings } from "@material-ui/icons";

const MODAL_NAMES = {
    TAB_MANAGE: "TAB_MANAGE",
    WIDGET_MANAGE: "WIDGET_MANAGE",
    GENERAL_SETTINGS: "GENERAL_SETTINGS"
};

class TabBarMenuManager extends Component {
    constructor(props) {
        super(props);

        const { TAB_MANAGE, WIDGET_MANAGE, GENERAL_SETTINGS } = MODAL_NAMES;
        const { systemInfo } = props;

        const bClientFile = requestManager.inCWEnv() && !systemInfo.isMaster;

        this.menuItems = [
            {
                optionName: LANG_CONST.TAB_BAR_MENU_MANAGE_TABS_OPTION,
                icon: Tab,
                onClick: () => this.modalAreas[TAB_MANAGE].fnOnOpenHandler(),
                disabled: false,
            },
            {
                optionName: LANG_CONST.TAB_BAR_MENU_MANAGE_WIDGETS_OPTION,
                icon: Widgets,
                onClick: () => this.modalAreas[WIDGET_MANAGE].fnOnOpenHandler(),
                disabled: bClientFile,
            },
            {
                optionName: LANG_CONST.TAB_BAR_MENU_GENERAL_SETTINGS_OPTION,
                icon: Settings,
                onClick: () => this.modalAreas[GENERAL_SETTINGS].fnOnOpenHandler(),
                disabled: false,
            }
        ];

        this.state = {
            isOpen: false,

            modals: {
                [MODAL_NAMES.TAB_MANAGE]: {
                    
                }
            }
        };
    }

    toggleMenuOpen = () => {
        this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
    }

    _fnSetModalOpenState = (i_sModalName, i_bState) => {
        this.setState(prevState => {
            const oUpdatedState = update(prevState, {
                modals: { [i_sModalName]: { isOpen: { $set: i_bState } } }
            });
            return oUpdatedState;
        });
    }

    modalAreas = {
        [MODAL_NAMES.TAB_MANAGE]: {
            fnOnOpenHandler: () => {
                const { tabs, tabOrder } = this.props;
                const oTabManagerProps = { tabs, tabOrder };

                modalManager.openModal(modalTypes.TAB_MANAGER, {
                    onRequestClose: this.modalAreas[MODAL_NAMES.TAB_MANAGE].fnOnCloseHandler,
                    ...oTabManagerProps
                });
            },
            fnOnCloseHandler: () => {
                // Do nothing
            }
        },
        [MODAL_NAMES.WIDGET_MANAGE]: {
            fnOnOpenHandler: () => {
                modalManager.openModal(modalTypes.WIDGET_PRESET_MANAGER);
            },
            fnOnCloseHandler: () => {
                // Do nothing
            }
        },
        [MODAL_NAMES.GENERAL_SETTINGS]: {
            fnOnOpenHandler: () => {
                modalManager.openModal(modalTypes.DASHBOARD_SETTINGS);
            },
            fnOnCloseHandler: () => {
                // Do nothing
            }
        },
    }

    render() {
        return (
            <HamburgerMenu
                menuClass="TabBarMenuManager"
                isOpen={this.state.menuOpen}
                menuItems={this.menuItems}
                toggleOpen={this.toggleMenuOpen}
            />
        );
    }
}

TabBarMenuManager.propTypes = {
    tabs: PropTypes.object.isRequired,
    tabOrder: PropTypes.arrayOf(PropTypes.string).isRequired,

    // Redux mappings
    systemInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    systemInfo: state.present.general.systemInfo,
});

const mapDispatchToProps = (dispatch) => ({}); // Do nothing

export default connectRedux(mapStateToProps, mapDispatchToProps)(TabBarMenuManager);
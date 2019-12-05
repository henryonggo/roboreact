import React, { Component } from "react";
import "./App.scss";
import PropTypes from "prop-types";
import Utilities from "utilities";
import ThemeProvider from "components/theme/ThemeProvider/ThemeProvider";
import * as actionTypes from "store/actions/actionTypes";
import { connect } from "react-redux";
import * as LANG_CONST from "constants/language";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import TabController from "components/TabController/TabController";

// Customized styles for React Grid Layout
import "styles/custom/custom-react-grid-layout.scss";
import "styles/custom/custom-react-resizable.scss";

// Notification system imports
import { ToastContainer } from "react-toastify";
import "styles/custom/custom-react-toastify.scss";
import "animate.css/animate.css"; // For animations

// Manager imports
import { notificationManager, dataManager, requestManager } from "managers";

// Constants
import * as APP_CONST from "constants/app";

// Modal imports.
import ModalContainer from "components/containers/ModalContainer/ModalContainer";

// Content imports
import initTabData from "_tempData/initData/tabs";
import initThemeData from "_tempData/initData/themes";
import initWidgetPresetData from "_tempData/initData/widgetPresets";
import initGeneralData from "_tempData/initData/general";

// Loading screen
import LoadingScreenContainer from "components/containers/LoadingScreenContainer/LoadingScreenContainer";

// Context menu.
import ContextMenuContainer from "components/containers/ContextMenuContainer/ContextMenuContainer";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            namespace: null,
        };

        this.notificationDOMRef = React.createRef();
    }

    // ----------------------
    // --- Lifecyle Hooks ---
    // ----------------------

    async componentDidMount() {
        if (requestManager.inCWEnv()) {
            // TODO: remove the hack
            // Apply a class to the body indicating that the app is in the CW environment
            document.body.classList.add("InCWEnv");

            try {
                const { setSystemInfo, setHeader, setFooter, addTheme, addNamespace,
                    setDefaultNamespace, addWidgetPreset, addTab, changeOpenTab } = this.props;

                const oFuncs = {
                    setSystemInfo,
                    setHeader,
                    setFooter,
                    addTheme,
                    addNamespace,
                    setDefaultNamespace,
                    addWidgetPreset,
                    addTab,
                    changeOpenTab,
                };

                await dataManager.initializeAllData(oFuncs, true);

                this.setState({
                    namespace: "default",
                });

            } catch (err) {
                notificationManager.showError(`${LANG_CONST.DATA_LOAD_FAIL_ERR}:\n ${err}`);
            }
        } else {
            console.warn(LANG_CONST.SPOOF_DATA_WARNING);
            await this._fnPopulateWithSpoofData();
        }

        // Once data initialization is done, set the baseline
        this.props.setBaseline();
    }

    // -----------------------
    // -- Internal Methods ---
    // -----------------------

    _fnInitializeDefaultTheme = () => {
        this.props.addNamespace(APP_CONST.DEFAULT_NAMESPACE_NAME, APP_CONST.DEFAULT_THEME_NAME, { $undoable: false, $saveToServer: false, $runLifecycle: false });

        this.setState({
            namespace: APP_CONST.DEFAULT_NAMESPACE_NAME,
        });
    }

    // For the browser demo version only
    _fnPopulateWithSpoofData = async () => {
        const _fnLoadThemes = () => {
            Object.values(initThemeData.themes).forEach(i_oThemeTemplate => {
                this.props.addTheme(i_oThemeTemplate, { $undoable: false, $saveToServer: false, $runLifecycle: false });
            });
        };

        const _fnLoadWidgetPresets = () => {
            Object.values(initWidgetPresetData).forEach(i_oWidgetPreset => {
                const { name, id, type, metaData, customData } = i_oWidgetPreset;
                this.props.addWidgetPreset(name, type, metaData, customData, id, { $undoable: false, $saveToServer: false, $runLifecycle: false });
            });
        };

        const _fnLoadTabs = () => {
            initTabData.tabOrder.forEach(i_sTabSelector => {
                const oTabData = initTabData.tabs[i_sTabSelector];

                const sID = (oTabData.id) ? oTabData.id : null;

                // Add the tab
                this.props.addTab(oTabData, sID, { $undoable: false, $saveToServer: false, $runLifecycle: false });
            });

            // Set open tab
            this.props.changeOpenTab(initTabData.currTabID, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        };

        const _fnLoadGeneralData = () => {
            this.props.setHeader(initGeneralData["header"], null, { $undoable: false, $saveToServer: false, $runLifecycle: false });
            this.props.setFooter(initGeneralData["footer"], null, { $undoable: false, $saveToServer: false, $runLifecycle: false });
        };

        // Load data
        _fnLoadThemes();
        _fnLoadWidgetPresets();
        _fnLoadTabs();
        _fnLoadGeneralData();


        // Initialize
        this._fnInitializeDefaultTheme();
    }

    render() {
        return (
            <ThemeProvider currNamespaceID={this.state.namespace}>
                {/* APP */}
                <div className="App">
                    <Header />
                    <TabController />
                    <Footer />
                </div>

                {/* CONTAINERS */}
                <ToastContainer newestOnTop />
                <ModalContainer />
                <LoadingScreenContainer />
                <ContextMenuContainer />
            </ThemeProvider>
        );
    }
}

App.propTypes = {
    // Mapped props
    setBaseline: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired,
    addTheme: PropTypes.func.isRequired,
    addNamespace: PropTypes.func.isRequired,
    addWidgetPreset: PropTypes.func.isRequired,
    changeOpenTab: PropTypes.func.isRequired,
    setSystemInfo: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    setFooter: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    present: state.present
}); // Do nothing

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            setBaseline: actionTypes.misc.SET_BASELINE,
            addTab: actionTypes.tab.ADD_TAB,
            addTheme: actionTypes.theme.ADD_THEME,
            addNamespace: actionTypes.theme.ADD_NAMESPACE,
            changeTheme: actionTypes.theme.CHANGE_THEME,
            setDefaultNamespace: actionTypes.theme.SET_DEFAULT_NAMESPACE,
            addWidgetPreset: actionTypes.widget.ADD_WIDGET_PRESET,
            changeOpenTab: actionTypes.tab.CHANGE_OPEN_TAB,
            setSystemInfo: actionTypes.general.SET_SYSTEM_INFO,
            setHeader: actionTypes.general.SET_HEADER,
            setFooter: actionTypes.general.SET_FOOTER,
            // Redux-undo mappings
            undo: actionTypes.reduxUndo.UNDO,
            redo: actionTypes.reduxUndo.REDO
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
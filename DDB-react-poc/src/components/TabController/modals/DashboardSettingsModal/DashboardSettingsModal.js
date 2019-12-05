import React, { Component } from "react";
import "./DashboardSettingsModal.scss";
import update from "immutability-helper";
import PropTypes from "prop-types";
import Utilities from "utilities";
import { modalManager, notificationManager } from "managers";
import { modalTypes } from "constants/modals";
import * as LANG_CONST from "constants/language";

import * as actionTypes from "store/actions/actionTypes";
import { connect as connectRedux } from "react-redux";

import DashboardThemePicker from "components/TabController/modals/DashboardSettingsModal/DashboardThemePicker";
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";
import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";
import FormSection from "components/forms/FormSection/FormSection";

class DashboardSettingsModal extends Component {
    constructor(props) {
        super(props);

        this.initialTheme = this.props.currentTheme;
        this.state = {
            selectedTheme: this.props.currentTheme,
        };

        this.availableThemes = Object.entries(this.props.availableThemes)
            .map(([i_oThemeID, i_oTheme]) =>
                ({
                    name: i_oThemeID,
                    color: i_oTheme["display-color"],
                })
            );
    }

    // Set selected theme in the modal.
    onThemeChangeHandler = (i_sThemeID) => {
        this.setState((prevState) => (
            update(prevState, {
                selectedTheme: { $set: i_sThemeID }
            })
        ), () => this.props.changeTheme(this.props.currentNamespace, this.state.selectedTheme));
    }

    headerConfigOpenHandler = (e) => {
        e.preventDefault();

        modalManager.openModal(modalTypes.HEADER_CONFIGURATION, {});
    }

    footerConfigOpenHandler = (e) => {
        e.preventDefault();
        
        modalManager.openModal(modalTypes.FOOTER_CONFIGURATION, {});
    }

    onConfirmHandler = async (values, actions) => {
        // Show message indicating the general settings are updated successfully
        notificationManager.showInfo(LANG_CONST.GENERAL_SETTINGS_UPDATE_MESSAGE);
    }

    onCancelHandler = () => {
        // Revert theme back to initial theme.
        this.props.changeTheme(this.props.currentNamespace, this.initialTheme);
    }

    render() {
        return (
            <ConfirmModal
                className="DashboardSettingsModal"
                title={LANG_CONST.GENERAL_SETTINGS_TITLE}
                draggable={true}
                resizable={false}
                onConfirm={this.onConfirmHandler}
                onCancel={this.onCancelHandler}
                useFlexbox={true}
                {...this.props}
            >
                <FormSection
                    title={LANG_CONST.GENERAL_SETTINGS_MARGINALS_TITLE}
                    classNameContent="DashboardSettingsModal__marginals-content"
                >
                    <PrimaryButton
                        className="DashboardSettingsModal__manage-header"
                        onClick={this.headerConfigOpenHandler}
                    >
                        { LANG_CONST.CONFIG_HEADER_TEXT }
                    </PrimaryButton>
                    <PrimaryButton
                        className="DashboardSettingsModal__manage-footer"
                        onClick={this.footerConfigOpenHandler}
                    >
                        { LANG_CONST.CONFIG_FOOTER_TEXT }
                    </PrimaryButton>
                </FormSection>

                <FormSection
                    title={LANG_CONST.GENERAL_SETTINGS_THEME_TITLE}
                >
                    <DashboardThemePicker
                        themes={this.availableThemes}
                        selectedTheme={this.state.selectedTheme}
                        onThemeClick={this.onThemeChangeHandler}
                    />
                </FormSection>
            </ConfirmModal>
        );
    }
}


DashboardSettingsModal.propTypes = {
    // Mapped store state
    currentNamespace: PropTypes.string.isRequired,
    currentTheme: PropTypes.string.isRequired,
    availableThemes: PropTypes.object.isRequired,

    // Mapped dispatch funcs
    changeTheme: PropTypes.func.isRequired,
    editWidgetPreset: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    setFooter: PropTypes.func.isRequired,
};

DashboardSettingsModal.defaultProps = {

};

const mapStateToProps = (state) => {
    return {
        currentNamespace: state.present.theme.defaultNamespace,
        currentTheme: state.present.theme.namespaces[state.present.theme.defaultNamespace],
        availableThemes: state.present.theme.themes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...Utilities.mapDispatchToPropsHelper(dispatch, {
            changeTheme: actionTypes.theme.CHANGE_THEME,
            editWidgetPreset: actionTypes.widget.EDIT_WIDGET_PRESET,
            setHeader: actionTypes.general.SET_HEADER,
            setFooter: actionTypes.general.SET_FOOTER,
        })
    };
};

export default connectRedux(mapStateToProps, mapDispatchToProps)(DashboardSettingsModal);
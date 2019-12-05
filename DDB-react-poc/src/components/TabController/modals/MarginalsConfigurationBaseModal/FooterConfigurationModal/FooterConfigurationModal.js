import React from "react";
import Utilities from "utilities";
import PropTypes from "prop-types";
import MarginalsConfigurationBaseModal from "components/TabController/modals/MarginalsConfigurationBaseModal/MarginalsConfigurationBaseModal";
import { connect as connectRedux } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";
import * as LANG_CONST from "constants/language";
import { notificationManager } from "managers";

const FooterConfigurationModal = (props) => {
    const { setFooter, ...rest } = props;

    const onConfirmHandler = async (values, actions) => {
        await Utilities.runAsyncFunctionsWithParams([values, actions], props.onConfirm);

        // Show message indicating the footer settings are updated successfully
        notificationManager.showInfo(LANG_CONST.FOOTER_UPDATE_MESSAGE);
    };

    return (
        <MarginalsConfigurationBaseModal 
            { ...rest }
            title={LANG_CONST.CONFIG_FOOTER_TEXT}
            marginalType="footer"
            setMarginal={setFooter}
            onConfirm={onConfirmHandler}
        />
    );
};

FooterConfigurationModal.propTypes = {
    // Mapped redux
    setFooter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    ...Utilities.mapDispatchToPropsHelper(dispatch, {
        setFooter: actionTypes.general.SET_FOOTER,
    })
});

export default connectRedux(mapStateToProps, mapDispatchToProps)(FooterConfigurationModal);

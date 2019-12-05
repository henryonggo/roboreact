import React from "react";
import Utilities from "utilities";
import PropTypes from "prop-types";
import MarginalsConfigurationBaseModal from "components/TabController/modals/MarginalsConfigurationBaseModal/MarginalsConfigurationBaseModal";
import { connect as connectRedux } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";
import * as LANG_CONST from "constants/language";
import { notificationManager } from "managers";

const HeaderConfigurationModal = (props) => {
    const { setHeader, ...rest } = props;

    const onConfirmHandler = async (values, actions) => {
        await Utilities.runAsyncFunctionsWithParams([values, actions], props.onConfirm);

        // Show message indicating the header settings are updated successfully
        notificationManager.showInfo(LANG_CONST.HEADER_UPDATE_MESSAGE);
    };

    return (
        <MarginalsConfigurationBaseModal 
            { ...rest }
            title={LANG_CONST.CONFIG_HEADER_TEXT}
            marginalType="header"
            setMarginal={setHeader}
            onConfirm={onConfirmHandler}
        />
    );
};

HeaderConfigurationModal.propTypes = {
    // Mapped redux
    setHeader: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    ...Utilities.mapDispatchToPropsHelper(dispatch, {
        setHeader: actionTypes.general.SET_HEADER,
    })
});

export default connectRedux(mapStateToProps, mapDispatchToProps)(HeaderConfigurationModal);

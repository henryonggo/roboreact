import React from "react";
import PropTypes from "prop-types";
import Utilities from "utilities";
import * as LANG_CONST from "constants/language";

import WidgetPresetConfigurationBaseModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetConfigurationBaseModal";

const WidgetPresetEditModal = (props) => {
    const { initWidgetData, onConfirm, ...rest } = props;

    const onConfirmHandler = async (i_oWidgetPresetData) => {
        await Utilities.runAsyncFunctionsWithParams([i_oWidgetPresetData], onConfirm);
    };

    return (
        <WidgetPresetConfigurationBaseModal
            { ...rest }
            title={LANG_CONST.EDIT_WIDGET_TEXT}
            confirmText={LANG_CONST.EDIT_BTN_TEXT}
            lockWidgetType={true}
            onConfirm={onConfirmHandler}
            initWidgetData={initWidgetData}
        />
    );
};

WidgetPresetEditModal.propTypes = {
    initWidgetData: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        metaData: PropTypes.shape({
            description: PropTypes.string,
            hidden: PropTypes.bool,
            tags: PropTypes.string,
        }),
        customData: PropTypes.object,
    }),
};

export default WidgetPresetEditModal;

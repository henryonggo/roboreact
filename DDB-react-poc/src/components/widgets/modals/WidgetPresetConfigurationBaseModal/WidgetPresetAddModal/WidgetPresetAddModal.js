import React from "react";
import Utilities from "utilities";
import * as LANG_CONST from "constants/language";

import WidgetPresetConfigurationBaseModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetConfigurationBaseModal";

const WidgetPresetAddModal = (props) => {
    const { onConfirm, ...rest } = props;

    const onConfirmHandler = async (i_oWidgetPresetData) => {
        await Utilities.runAsyncFunctionsWithParams([i_oWidgetPresetData], onConfirm);
    };

    return (
        <WidgetPresetConfigurationBaseModal
            { ...rest }
            title={LANG_CONST.ADD_WIDGET_TEXT}
            confirmText={LANG_CONST.ADD_BTN_TEXT}
            onConfirm={onConfirmHandler}
        />
    );
};

export default WidgetPresetAddModal;

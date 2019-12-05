import React from "react";
import * as LANG_CONST from "constants/language";

import TabConfigurationBaseModal from "components/TabController/modals/TabConfigurationBaseModal/TabConfigurationBaseModal";

const TabAddModal = (props) => {
    const { ...rest } = props;

    return (
        <TabConfigurationBaseModal
            { ...rest }

            title={LANG_CONST.ADD_TAB_TITLE}
            confirmText={LANG_CONST.ADD_BTN_TEXT}
        />
    );
};

export default TabAddModal;
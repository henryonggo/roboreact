import React from "react";
import PropTypes from "prop-types";
import * as LANG_CONST from "constants/language";

import TabConfigurationBaseModal from "components/TabController/modals/TabConfigurationBaseModal/TabConfigurationBaseModal";

const TabEditModal = (props) => {
    const { tabName, ...rest } = props;

    return (
        <TabConfigurationBaseModal
            { ...rest }

            title={`${LANG_CONST.EDIT_TAB_TITLE}: ${tabName}`}
            confirmText={LANG_CONST.EDIT_BTN_TEXT}
        />
    );
};

TabEditModal.propTypes = {
    tabName: PropTypes.string.isRequired,
};

export default TabEditModal;
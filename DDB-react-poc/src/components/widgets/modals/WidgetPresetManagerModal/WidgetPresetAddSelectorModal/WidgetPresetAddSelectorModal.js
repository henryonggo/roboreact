import React, { Component } from "react";
import "./WidgetPresetAddSelectorModal.scss";
import * as LANG_CONST from "constants/language";

import WidgetPresetManagerModal from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetManagerModal";

export class WidgetPresetAddSelectorModal extends Component {
    render() {
        const { ...rest } = this.props;

        return (
            <WidgetPresetManagerModal
                { ...rest }
                className="WidgetPresetAddSelectorModal"
                title={LANG_CONST.WIDGET_CONFIG_ADD_WIDGETS_TITLE}
                confirmText={LANG_CONST.ADD_BTN_TEXT}
                disabled={false}
            />
        );
    }
}

export default WidgetPresetAddSelectorModal;

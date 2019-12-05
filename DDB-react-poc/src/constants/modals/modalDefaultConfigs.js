import modalTypes from "constants/modals/modalTypes";

const DEFAULT_CONFIG = "DEFAULT_CONFIG";

const BASE_CONFIG = {
    draggable: true,
    resizable: true,
    shouldCloseOnOverlayClick: false,
    useFlexbox: true,
};

const default_config = {
    // Config for modals that do not have any config objects
    draggable: true,
    resizable: false,
};

const tab_configuration_modal_config = {
    minConstraints: [350, 400],
    maxConstraints: [500, 600],
    initDimensions: {
        width: 400,
        height: 500
    }
};

const tab_manager_modal_config = {
    minConstraints: [350, 250],
    maxConstraints: [500, 600],
    initDimensions: {
        width: 400,
        height: 300
    }
};

const assertion_config = {
    minConstraints: [300, 150],
    maxConstraints: [400, 250]
};

const modal_preset_manager_modal_config = {
    minConstraints: [350, 400],
    maxConstraints: [500, 600],
    initDimensions: {
        width: 400,
        height: 500
    }
};

const modal_preset_manager_configuration_base_config = {
    minConstraints: [400, 300],
    maxConstraints: [800, 1000],
    initDimensions: {
        width: 500,
        height: 600
    }
};

const tag_add_modal_config = {
    minConstraints: [300, 150],
    maxConstraints: [450, 250],
    initDimensions: {
        width: 400,
        height: 150
    }
};

const general_settings_modal_config = {
    minConstraints: [300, 250],
    maxConstraints: [500, 400],
    initDimensions: {
        width: 400,
        height: 300
    }
};

const marginals_configuration_base_config = {
    minConstraints: [400, 500],
    maxConstraints: [700, 800],
    initDimensions: {
        width: 500,
        height: 600
    }
};

const confirm_options_config = {
    minConstraints: [400, 130],
    maxConstraints: [500, 200],
};

const workflow_button_configuration_base_modal_config = {
    scrollable: true,
    minConstraints: [400, 500],
    maxConstraints: [700, 900],
    initDimensions: {
        width: 500,
        height: 700
    }
};

const workflow_launch_mapping_modal_config = {
    minConstraints: [250, 250],
    maxConstraints: [400, 500],
    initDimensions: {
        width: 300,
        height: 300
    }
};

const widget_options_config = {
    draggable: true,
    resizable: true,
};


const configMappings = {
    [modalTypes.TAB_CONFIGURATION_BASE]: {
        ...BASE_CONFIG,
        ...tab_configuration_modal_config
    },
    [modalTypes.TAB_ADD]: {
        ...BASE_CONFIG,
        ...tab_configuration_modal_config
    },
    [modalTypes.TAB_EDIT]: {
        ...BASE_CONFIG,
        ...tab_configuration_modal_config
    },
    [modalTypes.TAB_MANAGER]: {
        ...BASE_CONFIG,
        ...tab_manager_modal_config
    },
    [modalTypes.ASSERTION_BASE]: {
        ...BASE_CONFIG,
        ...assertion_config
    },
    [modalTypes.ERROR_ASSERTION]: {
        ...BASE_CONFIG,
        ...assertion_config
    },
    [modalTypes.WARNING_ASSERTION]: {
        ...BASE_CONFIG,
        ...assertion_config
    },
    [modalTypes.INFO_ASSERTION]: {
        ...BASE_CONFIG,
        ...assertion_config
    },
    [modalTypes.COLOR_PICKER]: {
        ...BASE_CONFIG,
        ...assertion_config
    },
    [modalTypes.CONFIRM]: {
        ...BASE_CONFIG,
        ...confirm_options_config
    },
    [modalTypes.DASHBOARD_SETTINGS]: {
        ...BASE_CONFIG,
        ...general_settings_modal_config
    },
    [modalTypes.WIDGET_OPTIONS]: {
        ...BASE_CONFIG,
        ...widget_options_config
    },
    [modalTypes.WIDGET_PRESET_MANAGER]: {
        ...BASE_CONFIG,
        ...modal_preset_manager_modal_config,
    },
    [modalTypes.WIDGET_PRESET_ADD_SELECTOR]: {
        ...BASE_CONFIG,
        ...modal_preset_manager_configuration_base_config,
    },
    [modalTypes.WIDGET_PRESET_CONFIGURATION_BASE]: {
        ...BASE_CONFIG,
        ...modal_preset_manager_configuration_base_config
    },
    [modalTypes.WIDGET_PRESET_ADD]: {
        ...BASE_CONFIG,
        ...modal_preset_manager_configuration_base_config
    },
    [modalTypes.WIDGET_PRESET_EDIT]: {
        ...BASE_CONFIG,
        ...modal_preset_manager_configuration_base_config
    },
    [modalTypes.TAG_ADD]: {
        ...BASE_CONFIG,
        ...tag_add_modal_config
    },
    [modalTypes.MARGINALS_CONFIGURATION_BASE]: {
        ...BASE_CONFIG,
        ...marginals_configuration_base_config
    },
    [modalTypes.HEADER_CONFIGURATION]: {
        ...BASE_CONFIG,
        ...marginals_configuration_base_config
    },
    [modalTypes.FOOTER_CONFIGURATION]: {
        ...BASE_CONFIG,
        ...marginals_configuration_base_config
    },
    [modalTypes.WORKFLOW_BUTTON_CONFIGURATION_BASE]: {
        ...BASE_CONFIG,
        ...workflow_button_configuration_base_modal_config
    },
    [modalTypes.WORKFLOW_BUTTON_ADD]: {
        ...BASE_CONFIG,
        ...workflow_button_configuration_base_modal_config
    },
    [modalTypes.WORKFLOW_BUTTON_EDIT]: {
        ...BASE_CONFIG,
        ...workflow_button_configuration_base_modal_config
    },
    [modalTypes.WORKFLOW_LAUNCH_MAPPING]: {
        ...BASE_CONFIG,
        ...workflow_launch_mapping_modal_config
    },
    // Default config mapping
    [DEFAULT_CONFIG]: {
        ...default_config
    }
};

export const getDefaultModalConfig = (i_sModalType) => {
    return (configMappings[i_sModalType]) ? configMappings[i_sModalType] : configMappings[DEFAULT_CONFIG];
};

export default {
    getDefaultModalConfig
};
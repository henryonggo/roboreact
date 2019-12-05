import workflowButtonTypes from "constants/widgets/workflowButtonTypes";

// All constants relating to displayed text to the user
export const REQUIRED_FIELD_ERR = "This field is required";
export const INVALID_COL_NUM_ERR = "Invalid number of columns";
export const DATA_LOAD_FAIL_ERR = "Data load failed";
export const NAME_NOT_PROVIDED_ERR = "Name must be provided";
export const INVALID_COLUMN_AMOUNT_ERR = "Invalid column amount";
export const UPLOAD_FAILED_ERR = "Upload failed";

export const SPOOF_DATA_WARNING = "Warning: current DDB instance is not in CW environment, loading spoof data";
export const ENV_FEATURE_UNSUPPORTED_WARNING = "Warning: This feature is not supported in the current environment";

export const SELECT_FILE_MSG = "Select File";
export const ALL_FILES_MSG = "All Files";

export const ERROR_TITLE = "Error";
export const INFO_TITLE = "Info";
export const WARNING_TITLE = "Warning";

export const CONFIRMATION_BTN_TEXT = "Okay";
export const CANCEL_BTN_TEXT = "Cancel";
export const SAVE_BTN_TEXT = "Save";
export const ADD_BTN_TEXT = "Add";
export const EDIT_BTN_TEXT = "Edit";
export const SUBMIT_BTN_TEXT = "Submit";
export const RETRY_BTN_TEXT = "Retry";
export const BROWSE_BTN_TEXT = "Browse";

export const FILE_PATH_TEXT = "File Path";
export const WEBPAGE_FILES_TEXT = "Webpage Files";
export const IMAGE_FILES_TEXT = "Image Files";

export const GENERAL_SETTINGS_TITLE = "General Settings";
export const GENERAL_SETTINGS_MARGINALS_TITLE = "Marginals";
export const GENERAL_SETTINGS_THEME_TITLE = "Theme";
export const CONFIG_HEADER_TEXT = "Configure Header";
export const CONFIG_FOOTER_TEXT = "Configure Footer";

export const MARGINALS_CONFIG_BASE_CONFIG_TITLE = "Base Configuration";
export const MARGINALS_CONFIG_BASE_TYPE_TITLE = "Base Type";

export const MANGE_WIDGETS_TITLE = "Manage Widgets";

export const ADD_TAB_TITLE = "Add new tab";
export const EDIT_TAB_TITLE = "Edit tab";

export const TAB_CONFIG_GENERAL_TITLE = "General";
export const TAB_CONFIG_NAME_TITLE = "Name";
export const TAB_CONFIG_TOOLTIP_TITLE = "Tooltip";
export const TAB_CONFIG_LAYOUT_TITLE = "Layout";
export const TAB_CONFIG_NUM_COLS_TITLE = "Number of Columns";

export const MANGE_TABS_SECTION_TITLE = "Tabs";
export const MANAGE_TABS_TITLE = "Manage Tabs";

export const TAB_BAR_MENU_MANAGE_TABS_OPTION = "Manage Tabs";
export const TAB_BAR_MENU_MANAGE_WIDGETS_OPTION = "Manage Widgets";
export const TAB_BAR_MENU_GENERAL_SETTINGS_OPTION = "General Settings";

export const WIDGET_LIFECYCLE_ON_CREATE_NOT_SUPPORTED_WARNING = "Warning: handling onCreate is not supported in the current enviornment";
export const WIDGET_LIFECYCLE_ON_UPDATE_NOT_SUPPORTED_WARNING = "Warning: handling onUpdate is not supported in the current enviornment";
export const WIDGET_LIFECYCLE_ON_REMOVE_NOT_SUPPORTED_WARNING = "Warning: handling onRemove is not supported in the current enviornment";

export const HTML_CONTAINER_WIDGET_CONFIG_TITLE = "HTML/CSP Container Configuration";

export const MARGINALS_WIDGET_BROWSER_DEMO_TEXT = "Browser Demo";
export const MARGINALS_WIDGET_TITLE_DEFAULT = "Title";
export const MARGINALS_WIDGET_COMPANY_NAME_DEFAULT = "Company Name";
export const MARGINALS_WIDGET_GENERAL_TITLE = "General";
export const MARGINALS_WIDGET_TITLE_TITLE = "Title";
export const MARGINALS_WIDGET_TEMPLATE_NAME_TITLE = "Template Name";
export const MARGINALS_WIDGET_TEMPLATE_NAME_DESCRIPTION = "Display the template name.";
export const MARGINALS_WIDGET_CURR_DATE_TITLE = "Current Date";
export const MARGINALS_WIDGET_CURR_DATE_DESCRIPTION = "Display the current date.";
export const MARGINALS_WIDGET_COPYRIGHT_TITLE = "Copyright";
export const MARGINALS_WIDGT_COPYRIGHT_OWNER_TITLE = "Copyright Owner";
export const MARGINALS_WIDGET_CURR_YEAR_TITLE = "Current Year";
export const MARGINALS_WIDGET_CURR_YEAR_DESCRIPTION = "Use current year as copyright year.";
export const MARGINALS_WIDGET_COPYRIGHT_YEAR_TITLE = "Copyright Year";
export const MARGINALS_WIDGET_LOGO_TITLE = "Logo";
export const MARGINALS_WIDGET_IMAGE_TITLE = "Image";

export const TAG_NAME_REQUIRED_ERR = "Tag name is required";
export const TAG_NAME_ALPHANUMERIC_ERR = "Tag name must be alphanumeric";

export const TAG_ADD_TITLE = "Add Tag";
export const TAG_ADD_TAG_NAME_TITLE = "Tag Name";

export const ADD_WIDGET_TEXT = "Add Widget";
export const EDIT_WIDGET_TEXT = "Edit Widget";

export const WIDGET_NAME_MISSING_ERR = "Widget name must be provided";

export const WIDGET_CONFIG_INFO_TITLE = "Widget Information";
export const WIDGET_CONFIG_NAME_TITLE = "Name";
export const WIDGET_CONFIG_DESCRIPTION_TITLE = "Description";
export const WIDGET_CONFIG_HIDDEN_TITLE = "Hidden";
export const WIDGET_CONFIG_HIDDEN_DESCRIPTION = "Prevent client file users from adding this widget to tabs.";
export const WIDGET_CONFIG_WIDGET_TYPE_TITLE = "Widget Type";
export const WIDGET_CONFIG_ADD_WIDGETS_TITLE = "Add Widgets";

export const CONFIRM_TAB_REMOVE_TEXT = "Are you sure that you want to remove this tab?";
export const CONFIRM_WIDGET_REMOVE_TEXT = "Are you sure that you want to remove this widget?";

export const WIDGET_MANAGE_WIDGETS_TITLE = "Widgets";

export const HTML_CONTAINER_WIDGET_DISPLAY_NAME = "HTML/CSP Container Widget";
export const RICH_TEXT_WIDGET_DISPLAY_NAME = "Rich Text Widget";
export const WORKFLOW_WIDGET_DISPLAY_NAME = "Workflow Widget";
export const MARGINALS_WIDGET_DISPLAY_NAME = "Marginal Widget";

export const LOADER_ERROR_ERR = "Unable to load component, an error occurred";
export const LOADER_TIMEDOUT_ERR = "Unable to load component, loader timed-out";

export const DATA_MANAGER_LOADING_THEME_DATA_MSG = "Loading theme data...";
export const DATA_MANAGER_LOADING_WIDGET_PRESET_DATA_MSG = "Loading widget preset data...";
export const DATA_MANAGER_LOADING_TAB_DATA_MSG = "Loading tab data...";
export const DATA_MANAGER_LOADING_GENERAL_DATA_MSG = "Loading general data...";
export const DATA_MANAGER_LOADING_SYSTEM_INFO_MSG = "Loading system information...";
export const DATA_MANAGER_OPERATION_UNSUPPORTED_WARNING = "Warning: Data manager operation not supported in this environment";

export const REQUEST_MANAGER_INVALID_CSP_ENDPOINT_ERR = "Invalid CSP endpoint";
export const REQUEST_MANAGER_CSP_REQUEST_FAILED_ERR = "CSP request failed";

export const ADD_TAB_TEMPLATE_MESSAGE = "Tab '%s' added successfully!";

export const MANAGE_TABS_UPDATED_SUCCESS_MESSAGE = "Tabs updated successfully!";

export const MANAGE_WIDGET_PRESETS_UPDATED_SUCCESS_MESSAGE = "Widgets updated successfully!";

export const HEADER_UPDATE_MESSAGE = "Header updated successfully!";
export const FOOTER_UPDATE_MESSAGE = "Footer updated successfully!";

export const GENERAL_SETTINGS_UPDATE_MESSAGE = "General settings updated successfully!";

// Rich Text Widget Config
export const RICH_TEXT_WIDGET = {
    CONFIG_TITLE: "Rich Text Configuration",
    INLINE_STYLE_OPTION: {
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        strikethrough: "Strikethrough",
        monospace: "Monospace",
        superscript: "Superscript",
        subscript: "Subscript"
    },
    BLOCK_TYPE_OPTION: {
        TITLE: "Block Type",
        Normal: "Normal",
        H1: "H1",
        H2: "H2",
        H3: "H3",
        H4: "H4",
        H5: "H5",
        H6: "H6",
        Blockquote: "Blockquote",
        Code: "Code"
    },
    FONT_SIZE_OPTION: {
        TITLE: "Font Size"
    },
    FONT_FAMILY_OPTION: {
        TITLE: "Font Family"
    },
    LIST_TYPE_OPTIONS: {
        ordered: "Ordered",
        unordered: "Unordered",
        indent: "Indent",
        outdent: "Outdent"
    },
    TEXT_ALIGN_OPTIONS: {
        left: "Left",
        center: "Center",
        right: "Right",
        justify: "Justify"
    },
    TEXT_COLOR_OPTION: {
        TITLE: "Color"
    },
    HYPERLINK_OPTION: {
        TITLE: "Hyperlink",
        LINK_TITLE_FIELD: "Link Title",
        LINK_TARGET_FIELD: "Link Target",
    },
    EMBED_OPTION: {
        TITLE: "Embed",
        EMBED_LINK_FIELD: "Embed Link",
        HEIGHT_FIELD: "Height",
        WIDTH_FIELD: "Width",
        AUTO_TEXT: "auto"
    },
    EMOJI_OPTION: {
        TITLE: "Emoji"
    },
    IMAGE_OPTION: {
        TITLE: "Image",
        IMAGE_PATH_FIELD: "Image Path",
        HEIGHT_FIELD: "Height",
        WIDTH_FIELD: "Width"
    },
    REMOVE_FORMATTING_OPTION: {
        TITLE: "Remove Formatting"
    }
};

// Workflow Widget Config
export const WORKFLOW_WIDGET = {
    CONFIG_TITLE: "Workflow Configuration",
    ADD_BUTTON_TEXT: "Add Workflow Button",
    MODIFY_PROMPT: "Right click a workflow button to modify it.",
    CONTEXT_MENU_EDIT: "Edit",
    CONTEXT_MENU_DELETE: "Delete"
};

export const WORKFLOW_BUTTON_CONFIG = {
    ADD_TITLE: "Add Workflow Button",
    EDIT_TITLE: "Edit Workflow Button",
    CONFIG_SECTION: "Configuration",
    SELECT_MAPPINGS_SECTION: "Select Mappings",
    FILE_SEARCH_PROMPT: "Search files",
    DOCUMENT_MANAGER_FOLDER_NAME: "Document Manager",
    SELECTED_MAPPINGS_SECTION: "Selected Mappings",
    BUTTON_LABEL_FIELD: "Button Label",
    BUTTON_LABEL_WARNING: "Button label must be provided",
    BUTTON_TYPE_FIELD: "Button Type",
    [workflowButtonTypes.RECTANGLE_BUTTON]: "Rectangle"
};

export const DOCUMENT_TREE_LOADING = "loading...";
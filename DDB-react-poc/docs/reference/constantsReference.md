# Constants

## App

| Constant                 | Description                                   |
|--------------------------|-----------------------------------------------|
| BREAKPOINT_PREFIX        | Prefix for breakpoint identifiers in TabView. |
| TAB_ID_PREFIX            | Prefix for tab ids.                           |
| WIDGET_ID_PREFIX         | Prefix for widget ids.                        |
| WIDGET_PRESET_ID_PREFIX  | Prefix for widget preset ids.                 |
|                          |                                               |
| MIN_COL_NUM              | Minimum number of columns in TabView.         |
| MAX_COL_NUM              | Maximum number of columns in TabView.         |
|                          |                                               |
| TAB_REMOVABLE_BY_DEFAULT | Whether tabs are removable by default or not. |
| TAB_EDITABLE_BY_DEFAULT  | Whether tabs are editable by default or not.  |

## Language

### `constants/language`

Contains constants for all language-related strings.


## Modals
### `constants/modals`
#### /modalTypes 
Constants used to identify modals.
```js 
modalTypes = {
    MODAL_WRAPPER,
    ASSERTION_BASE,
    ERROR_ASSERTION,
    INFO_ASSERTION,
    WARNING_ASSERTION,
    COLOR_PICKER,
    CONFIRM,
    TAB_CONFIGURATION_BASE,
    DASHBOARD_SETTINGS,
    TAB_MANAGER,
    TAB_ADD,
    TAB_EDIT,
    WIDGET_OPTIONS,
    WIDGET_PRESET_MANAGER,
    WIDGET_PRESET_ADD_SELECTOR,
    WIDGET_PRESET_CONFIGURATION_BASE,
    WIDGET_PRESET_ADD,
    WIDGET_PRESET_EDIT,
    TAG_ADD
}
```

#### /modalDefaultConfig
Default [ModalWrapper](/components/modalComponents.html#modalwrapper) configurations for every modal type.




## Server
### `constants/server/csp`
#### /cspEndpointNames
Constants used to identify endpoints in our `.csp` files.
```js
cspEndpointNames = {
    GET_PROGRAM_PATH,
    GET_LAYOUT_PATH,
    GET_ROLES,
    GET_DOCUMENT_MANAGER_JSON,
    GET_CASEWARE_DOCUMENT,
    GET_ALL_CASEWARE_DOCUMENTS,
    GET_FOLDER_DOCUMENTS,
    GET_IS_MASTER_TEMPLATE,
    GET_CURRENT_USER,
    GET_SYSTEM_INFO,
    OPEN_FILE_DIALOG,
    FILE_EXISTS,
    FOLDER_EXISTS,
    CREATE_FOLDER,
    COPY_FOLDER,
    DELETE_FOLDER,
    DELETE_FILE,
    COPY_FILE,
    SAVE_FILE,
    LIST_FILES,
    LIST_FILES_WITH_EXTENSION,
    LOAD_ALL_DATA,
    LOAD_GENERAL_DATA,
    LOAD_ALL_THEME_DATA,
    LOAD_ALL_WIDGET_PRESET_DATA,
    LOAD_ALL_TAB_DATA,
    LOAD_THEME_DATA,
    LOAD_WIDGET_PRESET_DATA,
    LOAD_TAB_DATA,
    SAVE_THEME,
    SAVE_NAMESPACE,
    SAVE_WIDGET_PRESET,
    SAVE_TAB,
    ADD_THEME,
    ADD_NAMESPACE,
    ADD_WIDGET_PRESET,
    ADD_TAB,
    REMOVE_THEME,
    REMOVE_NAMESPACE,
    REMOVE_WIDGET_PRESET,
    REMOVE_TAB,
    SET_TAB_ORDER,
    SET_CURRENT_TAB,
    SET_DEFAULT_NAMESPACE,
    SAVE_HEADER,
    SAVE_FOOTER
}
```

#### /cspEndpoints
Constants that represent the actual names of the functions to be called in a CSP request for every cspEndpointName. These are separated by the `.csp` file that they're contained in (`cwEndpoints` and `fsEndpoints` respectively).



## Widgets
### `constants/widgets`
Widget-specific constants. Mainly used in [registering new widgets](/guide/creatingWidgets.html).

#### /workflowButtonTypes

Identifies workflow button types. Used in [registering new workflow button types](/guide/extendingWidgets.html#adding-more-workflow-button-types).

```js
workflowButtonTypes = {
    RECTANGLE_BUTTON
}
```
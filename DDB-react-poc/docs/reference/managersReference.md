# Managers

Documentation on the global singleton managers of the project. These are functional utilities that any component can import and use.




## ContextMenuManager

This manager handles the display of context menus in the app. The most likely usage of this manager would be overriding the browser's context menu with your own using the `onContextMenu` event.

### .openContextMenu(config)
Opens a context menu with the given config. Context menus are displayed using the [Dropdown](/components/uiComponents.html#dropdown) component, so reference that if context menu specific styling is required.

| Config Property | Type                                                                | Optional |   Default   | Description                                                                                                            |
|-----------------|---------------------------------------------------------------------|:--------:|:-----------:|------------------------------------------------------------------------------------------------------------------------|
| className       | String                                                              |    ✔️     |    `""`     | The class to give to the context menu wrapper. This can be used to style individual options.                           |
| items           | Array of [DropdownItem](/components/uiComponents.html#dropdownitem) |    ❌     |             | The items to put into the context menu.                                                                                |
| position        | Object `{x,y}`                                                      |    ❌     |             | The position of the context menu. Can be retrieved using the `onContextMenu` event's `clientX` and `clientY` property. |
| onClose         | Function                                                            |    ✔️     | `undefined` | Callback function to run on closing of the context menu.                                                               |

### .closeContextMenu(id) 
Closes the context menu with the given id. This is only meant to be called by [ContextMenuContainer](/components/containerComponents.html#ContextMenuContainer).


## DataManager

This manager handles all data between the CSP server and client. It interfaces closely with [RequestManager](#requestmanager) and [QueueManager](#queuemanager) to make sure all saving operations are ran sequentially to avoid race conditions during file writing.

### .initializeAllData(initializationFunctions)
Initializes all DDB data.
| Parameter               | Type                    | Description                                                       |
|-------------------------|-------------------------|-------------------------------------------------------------------|
| initializationFunctions | InitializationFunctions | An object containing all the needed functions for initialization. |
#### Object Definitions
```jsx
InitializationFunctions = {
    addTheme: Function,
    addNamespace: Function,
    setDefaultNamespace: Function, 
    addWidgetPreset: Function,
    addAdd: Function,
    addWidget: Function,
    changeOpenTab: Function,
    setSystemInfo: Function,
    setHeader: Function,
    setFooter: Function
}
```
**Note:** these functions a usually just the dispatch functions from Redux.
**Returns:** nothing

### .initializeGeneralData(setSystemInfo, setHeader, setFooter)
Initializes all general DDB data.
| Parameter     | Type     | Description                                    |
|---------------|----------|------------------------------------------------|
| setSystemInfo | Function | A function that sets the system info.          |
| setHeader     | Function | A function that sets the header configuration. |
| setFooter     | Function | A function that sets the footer configuration. |
**Note:** these functions a usually just the dispatch functions from Redux.
**Returns:** nothing

### .initializeAllThemeData(addTheme, addNamespace, setDefaultNamespace)
Initializes all theme and namespace DDB data.
| Parameter           | Type     | Description                         |
|---------------------|----------|-------------------------------------|
| addTheme            | Function | Running adds a theme.               |
| addNamespace        | Fuction  | Running adds a namespace.           |
| setDefaultNamespace | Function | Running sets the default namespace. |
**Note:** these functions a usually just the dispatch functions from Redux.
**Returns:** nothing

### .initializeAllWidgetPresetData(addWidgetPreset)
Initializes all widget preset DDB data.
| Parameter       | Type     | Description                   |
|-----------------|----------|-------------------------------|
| addWidgetPreset | Function | Running adds a widget preset. |
**Note:** these functions a usually just the dispatch functions from Redux.
**Returns:** nothing

### .initializeAllTabData(addTab)
Initializes all tab DDB data.
| Parameter | Type     | Description         |
|-----------|----------|---------------------|
| addTab    | Function | Running adds a tab. |
**Note:** these functions a usually just the dispatch functions from Redux.
**Returns:** nothing


### .saveTheme(themeData, background = true)
Updates an existing theme with the given data.
| Parameter  | Type    | Description                                                               |
|------------|---------|---------------------------------------------------------------------------|
| themeData  | Object  | The data to update the theme with. Must include the id attribute as well. |
| background | Boolean | Indicates if the task should be run in the background.                    |
**Returns:** Promise\<Boolean\>

### .saveNamespace(namespaceData, background = true)
Updates an existing namespace with the given data.
| Parameter     | Type    | Description                                                                   |
|---------------|---------|-------------------------------------------------------------------------------|
| namespaceData | Object  | The data to update the namespace with. Must include the id attribute as well. |
| background    | Boolean | Indicates if the task should be run in the background.                        |
**Returns:** Promise\<Boolean\>


### .saveWidgetPreset(widgetPresetData, background = true)
Updates an existing widget preset with the given data.
| Parameter    | Type    | Description                                                                       |
|--------------|---------|-----------------------------------------------------------------------------------|
| widgetPreset | Object  | The data to update the widget preset with. Must include the id attribute as well. |
| background   | Boolean | Indicates if the task should be run in the background.                            |
**Returns:** Promise\<Boolean\>


### .saveTab(tabData, background = true)
Updates an existing tab with the given data.
| Parameter  | Type    | Description                                                             |
|------------|---------|-------------------------------------------------------------------------|
| tabData    | Object  | The data to update the tab with. Must include the id attribute as well. |
| background | Boolean | Indicates if the task should be run in the background.                  |
**Returns:** Promise\<Boolean\>


### .addTheme(themeData, background = true)
Adds a new theme.
| Parameter  | Type    | Description                                                            |
|------------|---------|------------------------------------------------------------------------|
| themeData  | Object  | The data to add the theme with. Must include the id attribute as well. |
| background | Boolean | Indicates if the task should be run in the background.                 |
**Returns:** Promise\<Boolean\>


### .addNamespace(namespaceData, background = true)
Adds a new namespace.
| Parameter     | Type    | Description                                                                |
|---------------|---------|----------------------------------------------------------------------------|
| namespaceData | Object  | The data to add the namespace with. Must include the id attribute as well. |
| background    | Boolean | Indicates if the task should be run in the background.                     |
**Returns:** Promise\<Boolean\>


### .addWidgetPreset(widgetPresetData, background = true)
Adds a new widget preset.
| Parameter    | Type    | Description                                                                    |
|--------------|---------|--------------------------------------------------------------------------------|
| widgetPreset | Object  | The data to add the widget preset with. Must include the id attribute as well. |
| background   | Boolean | Indicates if the task should be run in the background.                         |
**Returns:** Promise\<Boolean\>


### .addTab(tabData, background = true)
Adds a new tab.
| Parameter  | Type    | Description                                                          |
|------------|---------|----------------------------------------------------------------------|
| tabData    | Object  | The data to add the tab with. Must include the id attribute as well. |
| background | Boolean | Indicates if the task should be run in the background.               |
**Returns:** Promise\<Boolean\>


### .removeTheme(themeID, background = true)
Removes a specific theme.
| Parameter  | Type    | Description                                            |
|------------|---------|--------------------------------------------------------|
| themeID    | String  | The ID of the theme.                                   |
| background | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>

### .removeNamespace(namespaceID, background = true)
Removes a specific namespace.
| Parameter   | Type    | Description                                            |
|-------------|---------|--------------------------------------------------------|
| namespaceID | String  | The ID of the namespace.                               |
| background  | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>


### .removeWidgetPreset(widgetPresetID, background = true)
Removes a specific widget preset.
| Parameter      | Type    | Description                                            |
|----------------|---------|--------------------------------------------------------|
| widgetPresetID | String  | The ID of the widget preset.                           |
| background     | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>

### .removeTab(themeID, background = true)
Removes a specific tab.
| Parameter  | Type    | Description                                            |
|------------|---------|--------------------------------------------------------|
| tabID      | String  | The ID of the tab.                                     |
| background | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>


### .setTabOrder(tabOrder, background = true)
Sets the currently saved tab order.
| Parameter  | Type    | Description                                            |
|------------|---------|--------------------------------------------------------|
| tabOrder   | Array   | An array of tab IDs indicating the tab order.          |
| background | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>


### .setCurrentTab(tabID, background = true)
Sets the saved currently opened tab.
| Parameter  | Type    | Description                                            |
|------------|---------|--------------------------------------------------------|
| tabID      | String  | The ID of the currently opened tab.                    |
| background | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>


### .setDefaultNamespace(namespaceID, background = true)
Sets the stored default namespace.
| Parameter   | Type    | Description                                            |
|-------------|---------|--------------------------------------------------------|
| namespaceID | String  | The ID of the default namespace.                       |
| background  | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>


### .saveHeader(headerConfig, background = true) `SAVE_HEADER`
Saves the header with the given information.
| Parameter    | Type    | Description                                            |
|--------------|---------|--------------------------------------------------------|
| headerConfig | Object  | The configuration for the header.                      |
| background   | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>

### .saveFooter(footerConfig, background = true) `SAVE_FOOTER`
Saves the footer with the given information.
| Parameter    | Type    | Description                                            |
|--------------|---------|--------------------------------------------------------|
| footerConfig | Object  | The configuration for the footer.                      |
| background   | Boolean | Indicates if the task should be run in the background. |
**Returns:** Promise\<Boolean\>



## EventManager

A global event manager used to subscribe to and emit events.

### Usage

```jsx
import EventManager from "managers/EventManager";
```

### Functions

#### .on(event, callback)

Subscribes to an event with a callback to execute when the event is emitted.

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| event     | String   | The name of the event. |
| callback  | Function | The callback.          |

#### .off(event)

Removes an event from the event manager.

| Parameter | Type   | Description            |
|-----------|--------|------------------------|
| event     | String | The name of the event. |

#### .emit(event, ...args)

Emits an event with any extra args to pass to all subscribed callbacks.

| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| event     | String | The name of the event.                |
| ...args   | Any    | Extra arguments to pass to callbacks. |

### Events

```jsx
import eventTypes from "managers/eventTypes";

// Available events.
eventTypes.modalEvents = {
    OPEN_MODAL,
    CLOSE_MODAL,
    DID_CONTAINER_MOUNT,
    WILL_CONTAINER_UNMOUNT
}
```




## LoadingScreenManager

Handles display the global loading screen. Import into any component for usage.

### Usage
```jsx
import { loadingScreenManager } from "managers";
```

### Functions

#### .showLoadingScreen()

Displays the loading screen.

#### .setLoadingScreenStatus(statusText)

Sets the status text of the loading screen.

| Parameter  | Type   | Optional | Description              |
|------------|--------|:--------:|--------------------------|
| statusText | String |    ❌     | The current status text. |

#### .hideLoadingScreen()

Hides the loading screen.




## ModalManager

A global manager for displaying modals. Import into any component for usage.

### Usage

```jsx
import { modalManager } from "managers";
```

### Functions

#### .openModal(type, config)

Opens a modal with the given type and config.

| Parameter | Type                          | Optional | Description                |
|-----------|-------------------------------|:--------:|----------------------------|
| type      | [ModalTypes](#modaltypes)     |    ❌     | The type of modal to open. |
| config    | [ModalOptions](#modaloptions) |    ✔️     | Any modal options.         |

#### Shorthand Functions

The following functions open a modal with a predefined type.

**.openErrorAssertionModal(config)**\
**.openInfoAssertionModal(config)**\
**.openWarningAssertionModal(config)**\
**.openAssertionBaseModal(config)**\
**.openConfirmModal(config)**

| Parameter | Type                          | Optional | Description        |
|-----------|-------------------------------|:--------:|--------------------|
| config    | [ModalOptions](#modaloptions) |    ✔️     | Any modal options. |

#### .closeModal(modalId)

Closes the modal with the given id.

| Parameter | Type             | Description                   |
|-----------|------------------|-------------------------------|
| modalId   | String or Number | The id of the modal to close. |

**Note:** You most likely won't need to use this function manually, as closing modals are done from inside the modals themselves. Simply call `props.onRequestClose` from within the modal, which will automatically call this function with the correct id.

### ModalTypes

```jsx
import { modalTypes } from "constants/modals";

// Available types.
modalTypes = {
    ASSERTION_BASE,             // The base assertion modal.
    COLOR_PICKER,               // A color picker modal.
    CONFIRM,                    // The base confirm modal.
    DASHBOARD_SETTINGS,         // The dashboard settings modal.
    ERROR_ASSERTION,            // An assertion modal with an error icon.
    INFO_ASSERTION,             // An assertion modal with an info icon.
    MODAL_WRAPPER,              // The base modal.
    TAB_ADD,                    // The tab add modal.
    TAB_CONFIGURATION_BASE,     // The tab configuration base modal.
    TAB_EDIT,                   // The tab edit modal.
    TAB_MANAGER,                // The tab manager modal.
    WARNING_ASSERTION,          // An assertion modal with a warning icon.
    WIDGET_OPTIONS              // The widget options modal.
}
```

### ModalOptions

| Parameter     | Type             | Optional | Description                                                         |
|---------------|------------------|:--------:|---------------------------------------------------------------------|
| modalId       | String or Number |    ✔️     | The id for the modal. If not given, one will be randomly generated. |
| ...modalProps | Any              |    ✔️     | Any modal props.                                                    |




## NotificationManager

A global manager for displaying notifications. Import into any component for usage.

**Note:** See [React-Toastify](https://github.com/fkhadra/react-toastify) for configuration options.

### Usage
```jsx
import { notificationManager } from "managers";
```

### Functions

#### .showCustomNotification(message, config)

Shows a notification.

| Parameter | Type                                                            | Description                   |
|-----------|-----------------------------------------------------------------|-------------------------------|
| message   | String                                                          | The notification message.     |
| config    | [ToastOptions](https://github.com/fkhadra/react-toastify#toast) | React-Toastify toast options. |

#### .showBaseNotification(message, type, duration)

Shows a notification with the given type.

| Parameter | Type   | Optional | Default | Description                                                                                      |
|-----------|--------|:--------:|:-------:|--------------------------------------------------------------------------------------------------|
| message   | String |    ❌     |         | The notification message.                                                                        |
| type      | String |    ❌     |         | The type of notification to show. One of: `"default"` `"success"` `"info"` `"warning"` `"error"` |
| duration  | Number |    ✔️     |  `300`  | The duration of the notification in milliseconds (ms).                                           |

#### Shorthand Functions

The following functions open a notification with a predefined type.

**.showDefault(message, duration)**\
**.showSuccess(message, duration)**\
**.showInfo(message, duration)**\
**.showWarning(message, duration)**\
**.showError(message, duration)**

| Parameter | Type   | Optional | Default | Description                                            |
|-----------|--------|:--------:|:-------:|--------------------------------------------------------|
| message   | String |    ❌     |         | The notification message.                              |
| duration  | Number |    ✔️     |  `300`  | The duration of the notification in milliseconds (ms). |




## QueueManager

Queues async operations and runs them one by one. Multiple simultaneous execution groups can be used.

### Usage
```jsx
import { queueManager } from "managers";
```

### Functions

**add(operation, groupID)**

| Parameter | Type     | Optional |  Default   | Description                                                                     |
|-----------|----------|:--------:|:----------:|---------------------------------------------------------------------------------|
| operation | Function |    ❌     |            | The async operation to execute. Note: it must be executable without parameters. |
| groupID   | String   |    ✔️     | `"master"` | The group that the operation is queued in.                                      |


## RequestManager

A global utility for making server requests.

### Usage
```jsx
import { requestManager } from "managers";
```

### Functions

The following functions make a request to the given URL. \
**.request(url, config)** \
**.get(url, config)** \
**.post(url, config)** \
**.put(url, config)** \
**.delete(url, config)** 
| Parameter | Type   | Optional | Default | Description                                                               |
|-----------|--------|:--------:|:-------:|---------------------------------------------------------------------------|
| url       | String |    ❌     |         | The URL.                                                                  |
| config    | Object |    ✔️     |  `{}`   | Any [axios](https://github.com/axios/axios#request-config) config options |

#### .cspRequest(endpointName, parameters, config)
Makes a `GET` request to the given endpoint. Expects and parses a JSON response by default, unless overridden by axios configs. 

| Parameter    | Type   | Optional | Default | Description                                                                |
|--------------|--------|:--------:|:-------:|----------------------------------------------------------------------------|
| endpointName | String |    ❌     |         | The name of the endpoint. `constants/server/endpointNames.js`              |
| parameters   | Object |    ✔️     |  `{}`   | Any query params for the endpoint.                                         |
| config       | Object |    ✔️     |  `{}`   | Any [axios](https://github.com/axios/axios#request-config) config options. |
**Returns:** Promise

### Endpoint Functions

* [get](managersReference.html#get)
* [cspRequest](managersReference.html#csprequest)
* [cspXMLRequest](managersReference.html#cspxmlrequest)




#### *get*
-----------------
#### .openCaseWareDocument(docNum) `OPEN_CASEWARE_DOCUMENT`
Opens the specified CaseWare document.

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| docNum    | String | The document number of the document to open. |


#### *cspRequest*
-----------------

#### .getProgramPath() `GET_PROGRAM_PATH`
Gets the CaseWare application program path. \
**Returns:** Promise\<String\>

#### .getLayoutPath() `GET_LAYOUT_PATH`
Gets the layout folder path. \
**Returns:** Promise\<String\>

#### .getIsMasterTemplate() `GET_IS_MASTER_TEMPLATE`
Gets whether or not the current file is a master template. \
**Returns:** Promise\<Boolean\>

#### .getCurrentUser() `GET_CURRENT_USER`
Gets the initials of the current user. \
**Returns:** Promise\<String\>

#### .getSystemInfo() `GET_SYSTEM_INFO`
Gets system info for the current template. \
**Returns:** Promise\<Object\>
```java
{
    currentuserId: String,
    isMaster: Boolean,
    layoutPath: String,
    programPath: String
}
```

#### .openFileDialog(initialPath, prompt, filter) `OPEN_FILE_DIALOG`
Opens a file selector dialog. After exiting the dialog, returns the path of the selected file or an empty string if the dialog was cancelled.

| Parameter   | Type   | Description                                     |
|-------------|--------|-------------------------------------------------|
| initialPath | String | The path to open the dialog at.                 |
| prompt      | String | A prompt for the user.                          |
| filter      | String | The file type filter. `Ex: All Files (*.*)|*.*` |
**Returns:** Promise\<String\>

#### .fileExists(filePath) `FILE_EXISTS`
Returns if the file exists.

| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| filePath  | String | The path to the file. |
**Returns:** Promise\<Boolean\>

#### .folderExists(folderPath) `FOLDER_EXISTS`
Returns if the folder exists.

| Parameter  | Type   | Description             |
|------------|--------|-------------------------|
| folderPath | String | The path to the folder. |
**Returns:** Promise\<Boolean\>

#### .createFolder(folderPath) `CREATE_FOLDER`
Creates the given folder.

| Parameter  | Type   | Description             |
|------------|--------|-------------------------|
| folderPath | String | The path to the folder. |
**Returns:** Promise\<Boolean\>

#### .copyFolder(sourceFolderPath, targetFolderPath) `COPY_FOLDER`
Copies a folder and its contents. Overwrites the target folder if it exists already.

| Parameter        | Type   | Description                    |
|------------------|--------|--------------------------------|
| sourceFolderPath | String | The path of the source folder. |
| targetFolderPath | String | The path to the target folder. |
**Returns:** Promise\<Boolean\>

#### .deleteFolder(folderPath) `DELETE_FOLDER`
Deletes the given folder.

| Parameter  | Type   | Description             |
|------------|--------|-------------------------|
| folderPath | String | The path to the folder. |
**Returns:** Promise\<Boolean\>

#### .getFile(filePath) `GET_FILE`
Gets the contents of the file at `filePath` as text.

| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| filePath  | String | The path to the file. |
**Returns:** Promise\<String\>

#### .copyFile(fromPath, toPath) `COPY_FILE`
Copies a file from `fromPath` to `toPath`. Returns `true` if successful.

| Parameter | Type   | Description                                                  |
|-----------|--------|--------------------------------------------------------------|
| fromPath  | String | The path to the file.                                        |
| toPath    | String | The desired location, including the name of the copied file. |
**Returns:** Promise\<Boolean\>
 
#### .saveFile(filePath, contents) `SAVE_FILE`
Saves `contents` to `filePath`. Returns `true` if successful.

| Parameter | Type   | Description                                                    |
|-----------|--------|----------------------------------------------------------------|
| filePath  | String | The location to save to, including the name of the saved file. |
| contents  | String | The contents of the file.                                      |
**Returns:** Promise\<Boolean\>

#### .deleteFile(filePath) `DELETE_FILE`
Deletes the file at `filePath`. Returns `true` if successful.
| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| filePath  | String | The path to the file. |
**Returns:** Promise\<Boolean\>

#### .listFiles(folderPath) `LIST_FILES`
Returns a list of files in `folderPath`.

| Parameter  | Type   | Description             |
|------------|--------|-------------------------|
| folderPath | String | The path to the folder. |
**Returns:** Promise\<Array\<String\>\>

#### .listFilesWithExtension(folderPath, extension) `LIST_FILES_WITH_EXTENSION`
Returns a list of files with the given extension in `folderPath`.
| Parameter  | Type   | Description                  |
|------------|--------|------------------------------|
| folderPath | String | The path to the folder.      |
| extension  | String | The extension to filter for. |
**Returns:** Promise\<Array\<String\>\>

#### .getRoles() `GET_ROLES`
Gets all roles in Working Papers. \
**Returns:** Promise\<Object\>
```java
{   
    roleSets: [
        {
            description: String,
            roles: [
                {
                    name: String
                },
                ...
            ]
        },
        ...
    ]
}
```

#### .getDocumentManagerJSON() `GET_DOCUMENT_MANAGER_JSON`
Returns a JSON representation of the document manager. \
**Returns:** Promise\<Object\>
```java
/**
 * Recursive structure with each element level containing a "documents" property if the
 * element is a folder (type === 0).
 */
{
    root: {
        documents: [
            {
                depth: Number,
                type: Number,
                number: Number,
                name: String,
                guid: String,
                signoff: Array<String>,
                roleSetCount: Number,
                [documents]: Array<Object> 
            },
            ...
        ]
    }
}
```

#### .getCaseWareDocument(guid, num) `GET_CASEWARE_DOCUMENT`
Gets info on a CaseWare document. 

| Parameter | Type   | Description               |
|-----------|--------|---------------------------|
| guid      | String | The GUID of the document. |
| num       | String | The document number.      |
**Returns:** Promise\<Object\>
```java
{
    document: {
        guid: String,
        number: String,
        name: String,
        type: String,
        index: Number,
        signoffs: String
    }
}
```

#### .getAllCaseWareDocuments() `GET_ALL_CASEWARE_DOCUMENTS`
Gets info on every document in the current file. \
**Returns:** Promise\<Object\>

#### .getFolderDocuments(guid, name) `GET_FOLDER_DOCUMENTS`
Gets info on every document in the specified document manager folder.

| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| guid      | String | The GUID of the folder. |
| name      | String | The name of the folder. |
**Returns:** Promise\<Object\>

### .loadAllData() `LOAD_ALL_DATA`
Gets all DDB data.
**Returns:** Promise\<Object\>

### .loadAllGeneralData() `LOAD_GENERAL_DATA`
Loads all DDB general data.
**Returns:** Promise\<Object\>

### .loadAllThemeData() `LOAD_ALL_THEME_DATA`
Loads all DDB theme data.
**Returns:** Promise\<Object\>

### .loadAllWidgetPresetData() `LOAD_ALL_WIDGET_PRESET_DATA`
Loads all DDB widget preset data.
**Returns:** Promise\<Object\>

### .loadAllTabData() `LOAD_ALL_TAB_DATA`
Loads all DDB tab data.
**Returns:** Promise\<Object\>

### .loadThemeData(themeID) `LOAD_THEME_DATA`
Loads data on a specific DDB theme.
| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| themeID   | String | The ID of the theme. |
**Returns:** Promise\<Object\>

### .loadWidgetPresetData(widgetPresetID) `LOAD_WIDGET_PRESET_DATA`
Loads data on a specific DDB widget preset.
| Parameter      | Type   | Description                  |
|----------------|--------|------------------------------|
| widgetPresetID | String | The ID of the widget preset. |
**Returns:** Promise\<Object\>

### .loadTabData(tabID) `LOAD_TAB_DATA`
Loads data on a specific DDB tab.
| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| tabID     | String | The ID of the tab. |
**Returns:** Promise\<Object\>


### .saveTheme(themeData) `SAVE_THEME`
Updates an existing theme with the given data.
| Parameter | Type   | Description                                                               |
|-----------|--------|---------------------------------------------------------------------------|
| themeData | Object | The data to update the theme with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>

### .saveNamespace(namespaceData) `SAVE_NAMESPACE`
Updates an existing namespace with the given data.
| Parameter     | Type   | Description                                                                   |
|---------------|--------|-------------------------------------------------------------------------------|
| namespaceData | Object | The data to update the namespace with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .saveWidgetPreset(widgetPresetData) `SAVE_WIDGET_PRESET`
Updates an existing widget preset with the given data.
| Parameter    | Type   | Description                                                                       |
|--------------|--------|-----------------------------------------------------------------------------------|
| widgetPreset | Object | The data to update the widget preset with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .saveTab(tabData) `SAVE_TAB`
Updates an existing tab with the given data.
| Parameter | Type   | Description                                                             |
|-----------|--------|-------------------------------------------------------------------------|
| tabData   | Object | The data to update the tab with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .addTheme(themeData) `ADD_THEME`
Adds a new theme.
| Parameter | Type   | Description                                                            |
|-----------|--------|------------------------------------------------------------------------|
| themeData | Object | The data to add the theme with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .addNamespace(namespaceData) `ADD_NAMESPACE`
Adds a new namespace.
| Parameter     | Type   | Description                                                                |
|---------------|--------|----------------------------------------------------------------------------|
| namespaceData | Object | The data to add the namespace with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .addWidgetPreset(widgetPresetData) `ADD_WIDGET_PRESET`
Adds a new widget preset.
| Parameter    | Type   | Description                                                                    |
|--------------|--------|--------------------------------------------------------------------------------|
| widgetPreset | Object | The data to add the widget preset with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .addTab(tabData) `ADD_TAB`
Adds a new tab.
| Parameter | Type   | Description                                                          |
|-----------|--------|----------------------------------------------------------------------|
| tabData   | Object | The data to add the tab with. Must include the id attribute as well. |
**Returns:** Promise\<Boolean\>


### .removeTheme(themeID) `REMOVE_THEME`
Removes a specific theme.
| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| themeID   | String | The ID of the theme. |
**Returns:** Promise\<Boolean\>

### .removeNamespace(namespaceID) `REMOVE_NAMESPACE`
Removes a specific namespace.
| Parameter   | Type   | Description              |
|-------------|--------|--------------------------|
| namespaceID | String | The ID of the namespace. |
**Returns:** Promise\<Boolean\>


### .removeWidgetPreset(widgetPresetID) `REMOVE_WIDGET_PRESET`
Removes a specific widget preset.
| Parameter      | Type   | Description                  |
|----------------|--------|------------------------------|
| widgetPresetID | String | The ID of the widget preset. |
**Returns:** Promise\<Boolean\>

### .removeTab(themeID) `REMOVE_TAB`
Removes a specific tab.
| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| tabID     | String | The ID of the tab. |
**Returns:** Promise\<Boolean\>


### .setTabOrder(tabOrder) `SET_TAB_ORDER`
Sets the currently saved tab order.
| Parameter | Type  | Description                                   |
|-----------|-------|-----------------------------------------------|
| tabOrder  | Array | An array of tab IDs indicating the tab order. |
**Returns:** Promise\<Boolean\>


### .setCurrentTab(tabID) `SET_CURRENT_TAB`
Sets the saved currently opened tab.
| Parameter | Type   | Description                         |
|-----------|--------|-------------------------------------|
| tabID     | String | The ID of the currently opened tab. |
**Returns:** Promise\<Boolean\>


### .setDefaultNamespace(namespaceID) `SET_DEFAULT_NAMESPACE`
Sets the stored default namespace.
| Parameter   | Type   | Description                      |
|-------------|--------|----------------------------------|
| namespaceID | String | The ID of the default namespace. |
**Returns:** Promise\<Boolean\>

### .saveHeader(headerConfig) `SAVE_HEADER`
Saves the header with the given information.
| Parameter    | Type   | Description                       |
|--------------|--------|-----------------------------------|
| headerConfig | Object | The configuration for the header. |
**Returns:** Promise\<Boolean\>

### .saveFooter(footerConfig) `SAVE_FOOTER`
Saves the footer with the given information.
| Parameter    | Type   | Description                       |
|--------------|--------|-----------------------------------|
| footerConfig | Object | The configuration for the footer. |
**Returns:** Promise\<Boolean\>



## WidgetManager

Manages core components of the widgets. Allows to easily get items such as the base/config components as well as the lifecycle functions of all the registered widgets.

### .getWidgetBaseComponent(type)
Gets the base component for the given widget.
| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| type      | String | The type of the widget. |
**Returns:** React Component

### .getWidgetBaseConfigurationComponent(type, props)
Gets the base configuration component for the given component.
| Parameter | Type   | Description                        |
|-----------|--------|------------------------------------|
| type      | String | The type of the widget.            |
| props     | Object | Any props to pass into the object. |
**Returns:** React Component

### .getWidgetBaseLifecycle(type)
Gets the base component for the given widget.
| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| type      | String | The type of the widget. |
**Returns:** Object

### .getWidgetBaseLifecycleFunction(type, functionName)
Gets a specific lifecycle function for the given widget.
| Parameter    | Type   | Description               |
|--------------|--------|---------------------------|
| type         | String | The type of the widget.   |
| functionName | String | The name of the function. |
**Returns:** Function

### .getWidgetBaseLifecycleOnCreate(type)
Gets the onCreate lifecycle function for the given widget.
| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| type      | String | The type of the widget. |
**Returns:** Function

### .getWidgetBaseLifecycleOnUpdate(type)
Gets the onUpdate lifecycle function for the given widget.
| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| type      | String | The type of the widget. |
**Returns:** Function

### .getWidgetBaseLifecycleOnRemove(type)
Gets the onRemove lifecycle function for the given widget.
| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| type      | String | The type of the widget. |
**Returns:** Function
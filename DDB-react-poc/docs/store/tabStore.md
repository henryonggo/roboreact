# Tab Store

The store sub-section for tab related items.

## ADD_TAB

Adds a new tab to the store.

**ActionTypes Mapping**: `actionTypes.tab.ADD_TAB`

**Params**: `i_oPayload, i_sTabID = null[, i_oConfig]`

```js
i_oPayload: {
    // The name of the tab
    name: String,
    // The tooltip that is displayed when the tab is hovered over
    tooltip: String,
    // The number of columns that the tab has when at the max breakpoint
    numCols: Number,
    // Indicates if the tab is editable
    editable: Boolean,
    // Indicates if the tab is removable
    removable: Boolean
},
// A unique ID for the tab, if null a tab ID will be generated automatically
i_sTabID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: `The tab ID string of the added tab`




## REMOVE_TAB

Removes a given tab from the store.

**ActionTypes Mapping**: `actionTypes.tab.REMOVE_TAB`

**Params**: `i_nDelIndex[, i_oConfig]`

```js
// The index of the tab in the current tab order
i_nDelIndex: Number,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## EDIT_TAB

Edits the given tab. 

**ActionTypes Mapping**: `actionTypes.tab.EDIT_TAB`

**Params**: `i_sTabID, i_oUpdatedTabData[, i_oConfig]`

```js
// The id the of the tab
i_sTabID: String, 
// The data to update in the tab
// NOTE: only include the fields that are needed to be updated
i_oUpdatedTabData: {
    // The name of the tab
    name: String,
    // The tooltip that is displayed when the tab is hovered over
    tooltip: String,
    // The number of columns that the tab has when at the max breakpoint
    numCols: Number,
    // The data for the widgets in the tab
    widgets: Object of Widget Configs,
    // The order of the widgets (used in tab configuration modals)
    widgetOrder: Array of Widget IDs,
    // The layout of the widgets. This is mostly handled by React-Grid-Layout
    // The only reason it is here is so that the layout state can be presisted
    widgetLayouts: Object
    // Indicates if the tab is editable
    editable: Boolean,
    // Indicates if the tab is removable
    removable: Boolean
}
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None





## CHANGE_OPEN_TAB

Changes the currently opened tab.

**ActionTypes Mapping**: `actionTypes.tab.CHANGE_OPEN_TAB`

**Params**: `i_sTabID[, i_oConfig]`

```js
// The ID of the tab
i_sTabID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## CHANGE_TAB_ORDER

Moves the tab at the `from` index to the `to` index.

**ActionTypes Mapping**: `actionTypes.tab.CHANGE_TAB_ORDER`

**Params**: `i_nIdxFrom, i_nIdxTo[, i_oConfig]`

```js
// The index of the tab to be moved
i_nIdxFrom: Number,
// The index that the tab will be moved to
i_nIdxTo: Number,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## ADD_WIDGET

Adds a new widget to the given tab.

**ActionTypes Mapping**: `actionTypes.tab.ADD_WIDGET`

**Params**: `i_sPresetID, i_sPresetType, i_oWidgetLayout = {}, i_sWidgetID = null, i_sTabID = null[, i_oConfig]`

```js
// The id of the widget preset
i_sPresetID: String,
// The type of the widget preset
i_sPresetType: String,
// A unqiue ID for the widget, if null an ID will be automatically generated.
i_sWidgetID: String,
// The ID of the tab to add the widget into, if null the current open tab will be used
i_sTabID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: `The widget ID string of the added widget`




## REMOVE_WIDGET

Removes a given tab from the store.

**ActionTypes Mapping**: `actionTypes.tab.REMOVE_WIDGET`

**Params**: `i_sWidgetID, i_sTabID = null[, i_oConfig]`

```js
// The ID of the widget
i_sWidgetID: Number,
// The ID of the tab to remove the widget from, if null the current open tab will be used
i_sTabID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## REMOVE_WIDGET_PRESET_REFERENCES

Removes all widgets in all active tabs that reference the given widget preset.

**ActionTypes Mapping**: `actionTypes.tab.REMOVE_WIDGET_PRESET_REFERENCES`

**Params**: `i_sWidgetPresetID, i_sWidgetType[, i_oConfig]`

```js
// The ID of the widget preset
i_sWidgetPresetID: String,
// The type of the widget preset
i_sWidgetType: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## UPDATE_WIDGET_LAYOUT

Updates the widget layout for a specific breakpoint.

**ActionTypes Mapping**: `actionTypes.tab.UPDATE_WIDGET_LAYOUT`

**Params**: `i_sTabID, i_sBreakpointID, i_aLayout[, i_oConfig]`

```js
// The ID of the tab
i_sTabID: String,
// The ID of the breakpoint to update
i_sBreakpointID: String,
// The new layout to update to
i_aLayout: Array,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## UPDATE_ALL_WIDGET_LAYOUTS

Updates all widget layouts.

**ActionTypes Mapping**: `actionTypes.tab.UPDATE_ALL_WIDGET_LAYOUTS`

**Params**: `i_sTabID, i_aLayouts [, i_oConfig]`

```js
// The ID of the tab
i_sTabID: String,
// The new layouts to update to
i_aLayouts: Array,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: None




## GENERATE_TAB_ID

Generates a unique tab ID.

**ActionTypes Mapping**: `actionTypes.tab.GENERATE_TAB_ID`

**Params**: `none`

**Returns**: `The generated tab ID`




## GENERATE_WIDGET_ID

Generates a unique widget ID.

**ActionTypes Mapping**: `actionTypes.tab.GENERATE_WIDGET_ID`

**Params**: `none`

**Returns**: `The generated widget ID`
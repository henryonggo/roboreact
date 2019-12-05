# Widget Preset Store

The store sub-section for widget preset related items.

## ADD_WIDGET_PRESET

Adds a new widget preset to the store.

**ActionTypes Mapping**: `actionTypes.widget.ADD_WIDGET_PRESET`

**Params**: `i_sPresetName, i_sPresetType, i_oMetaData, i_oCustomData, i_sPresetID = null[, i_oConfig]`

```js
// The name of the widget preset
i_sPresetName: String,
// The type of the widget preset
i_sPresetType: String,
// Widget preset meta data
i_oMetaData: {
    description: String,
    tags: String,
    hidden: Boolean,
},
i_oCustomData: {
    // ...type-specific configuration
},
// The ID of the widget preset. If null, then an ID will be generated automatically.
i_sPresetID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: `The ID of the widget preset`




## EDIT_WIDGET_PRESET

Edits the data of a widget preset.

**ActionTypes Mapping**: `actionTypes.widget.EDIT_WIDGET_PRESET`

**Params**: `i_sPresetID, i_sPresetType, i_oUpdatedPresetData[, i_oConfig]`

```js
// The ID of the widget preset
i_sPresetID: String,
// The type of the widget preset
i_sPresetType: String,
// The updated data. Note: all keys are optional
i_oUpdatedPresetData: {
    name: String,
    metaData: {
        description: String,
        tags: String,
        hidden: Boolean
    },
    customData: {
        // ...type-specific configuration
    }
},
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## REMOVE_WIDGET_PRESET

Removes a widget preset and all references to it.

**ActionTypes Mapping**: `actionTypes.widget.REMOVE_WIDGET_PRESET`

**Params**: `i_sPresetID, i_sPresetType[, i_oConfig]`

```js
// The ID of the widget preset
i_sPresetID: String,
// The type of the widget preset
i_sPresetType: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none
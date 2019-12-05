# General Store

The store sub-section for general related items.

## SET_HEADER

Sets the header config.

**ActionTypes Mapping**: `actionTypes.general.SET_HEADER`

**Params**: `i_oHeaderConfig, i_oHeaderWidgetCustomConfig = null[, i_oConfig]`

```js
i_oHeaderConfig: {
    enabled: Boolean, // Indicates if the header is to be displayed
    presetID: String, // The preset ID of the current header
    presetType: String // The preset type of the current header
},
i_oHeaderWidgetCustomConfig: {
    // Custom config related to the current header preset
},
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: `The widget ID that the header is currently mapped to`





## SET_FOOTER

Sets the footer config.

**ActionTypes Mapping**: `actionTypes.general.SET_FOOTER`

**Params**: `i_oFooterConfig, i_oFooterWidgetCustomConfig = null[, i_oConfig]`

```js
i_oFooterConfig: {
    enabled: Boolean, // Indicates if the footer is to be displayed
    presetID: String, // The preset ID of the current footer
    presetType: String // The preset type of the current footer
},
i_oFooterWidgetCustomConfig: {
    // Custom config related to the current footer preset
},
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: `The widget ID that the footer is currently mapped to`
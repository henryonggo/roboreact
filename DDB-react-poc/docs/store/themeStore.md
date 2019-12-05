# Theme Store

The store sub-section for theme related items.

## ADD_THEME

Adds a new theme.

**ActionTypes Mapping**: `actionTypes.theme.ADD_THEME`

**Params**: `i_oThemeTemplate[, i_oConfig]`

```js
// The template of the theme
i_oThemeTemplate: Object (see theming guide)
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## UPDATE_THEME

Updates a theme

**ActionTypes Mapping**: `actionTypes.theme.UPDATE_THEME`

**Params**: `i_sThemeID, i_oUpdatedProperties[, i_oConfig]`

```js
// The ID of the theme
i_sThemeID: String,
// The theme properties that are being updated
i_oUpdateProperties: Object,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## REMOVE_THEME

Removes a theme.

NOTE: removing a theme that is referenced somewhere in the app will cause errors.

**ActionTypes Mapping**: `actionTypes.theme.REMOVE_THEME`

**Params**: `i_sThemeID[, i_oConfig]`

```js
// The ID of the theme
i_sThemeID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## CHANGE_THEME

Changes the mapped theme of the given namespace.

**ActionTypes Mapping**: `actionTypes.theme.CHANGE_THEME`

**Params**: `i_sNamespaceID, i_sThemeID[, i_oConfig]`

```js
// The namespace ID
i_sNamespace: String,
// The ID of the theme
i_sThemeID: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## ADD_NAMESPACE

Adds a new namespace.

**ActionTypes Mapping**: `actionTypes.theme.ADD_NAMESPACE`

**Params**: `i_sNamespaceID, i_sThemeID[, i_oConfig]`

```js
// The namespace ID
i_sNamespace: String,
// The ID of the theme that the namespace is mapped to
i_sThemeID: String,
// The configuration for the action
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## REMOVE_NAMESPACE

Removes the given namespace.

NOTE: removing a namespace that is referenced somewhere in the app will cause errors.

**ActionTypes Mapping**: `actionTypes.theme.REMOVE_NAMESPACE`

**Params**: `i_sNamespaceID, i_sThemeID[, i_oConfig]`

```js
// The namespace ID
i_sNamespace: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none




## SET_DEFAULT_NAMESPACE

Sets the given namespace as the default namespace.

**ActionTypes Mapping**: `actionTypes.theme.SET_DEFAULT_NAMESPACE`

**Params**: `i_sNamespaceID[, i_oConfig]`

```js
// The namespace ID
i_sNamespace: String,
// The configuration for the action
i_oConfig: {
    $undoable: true,
    $group: null,
    $saveToServer: true,
    $runLifecycle: true
}
```

**Returns**: none
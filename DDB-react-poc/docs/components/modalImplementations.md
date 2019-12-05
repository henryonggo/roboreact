# Modal Implementations

This page documents all the components used while implementing the different modals throughout the application.


## DashboardSettingsModal

The modal for configuring general dashboard settings.

### Usage:
```jsx 
import DashboardSettingsModal from "components/TabController/modals/DashboardSettingsModal/DashboardSettingsModal";

<DashboardSettingsModal />
```




## DashboardThemePicker

A component used by `DashboardSettingsModal` for selecting the application theme.

### Usage:
```jsx
import DashboardSettingsModal from "components/TabController/modals/DashboardSettingsModal/DashboardThemePicker";

<DashboardThemePicker />
```

### Props:
| Prop          | Type           | Optional | Default | Description                             |
|---------------|----------------|:--------:|---------|-----------------------------------------|
| themes        | Array of Theme |    ❌     |         | The available themes to change to.      |
| selectedTheme | String         |    ❌     |         | The currently selected theme.           |
| onThemeClick  | Function       |    ❌     |         | Called when a theme item is clicked on. |

### Object Definitions:
```js
Theme = {
    name: String,
    color: String,
}
```





## TabConfigurationBaseModal

A modal used for configuring tab settings. It is used in [TabAddModal](#tabaddmodal) and [TabEditModal](#tabeditmodal).

### Usage:

```jsx
import TabConfigurationBaseModal from "components/TabController/modals/TabConfigurationBaseModal/TabConfigurationBaseModal";

<TabConfigurationBaseModal />
```

### Props:

| Prop                                              | Type     | Optional | Default     | Description                                                                                                |
|---------------------------------------------------|----------|:--------:|-------------|------------------------------------------------------------------------------------------------------------|
| className                                         | String   |    ✔️     | `""`        | The class name of the component.                                                                           |
| title                                             | String   |    ❌     |             | The display title of the modal.                                                                            |
| confirmText                                       | String   |    ❌     |             | The text shown on the confirmation button.                                                                 |
| onConfirm(tab data: TabData, prev tab ID: String) | Function |    ✔️     | `undefined` | A callback to call on confirm click                                                                        |
| initTabData                                       | TabData  |    ✔️     | -           | The any tab data to initialize thw configuration modal with. By default it is populated with empty values. |


### Object definitions:

```jsx
TabData = {
    name: String,
    tooltip: String,
    numCols: Number,
    widgets: {
        id: String,
        name: String,
    },
    widgetsOrder: Array of widget IDs
}
```

**Note:** TabConfigurationBaseModal uses [ConfirmModal](/components/modalComponents.html#confirmmodal) and passes all its props through.




## TabAddModal

A modified version of `TabConfigurationBaseModal` that configures the following props:

| Configured Prop | Type   | Value           |
|-----------------|--------|-----------------|
| title           | String | `"Add new tab"` |
| confirmText     | String | `"Add"`         |

### Usage:

```jsx
import TabAddModal from "components/TabController/modals/TabConfigurationBaseModal/TabAddModal/TabAddModal";

<TabAddModal />
```




## TabEditModal

A modified version of `TabConfigurationBaseModal` that configures the following props:

| Configured Prop | Type   | Value                  |
|-----------------|--------|------------------------|
| title           | String | `"Edit tab {tabName}"` |
| confirmText     | String | `"Edit"`               |

### Usage:

```jsx
import TabEditModal from "components/TabController/modals/TabConfigurationBaseModal/TabEditModal/TabEditModal";

<TabEditModal />
```

### Props:

| Prop    | Type   | Description                       |
|---------|--------|-----------------------------------|
| tabName | String | The name of the tab being edited. |




## ManageWidgetsFormSection

The widgets draggable list form section in `TabConfigurationBase`.

**Note:** This component should only be used interally by [TabConfigurationBase](#tabconfigurationbase)

### Usage: 
```jsx
import ManageWidgetsFormSection from "components/TabController/modals/TabConfigurationBaseModal/ManageWidgetsFormSection/ManageWidgetsFormSection";

<ManageWidgetsFormSection />
```

### Props:
| Prop             | Type               | Optional | Default | Description                                               |
|------------------|--------------------|:--------:|---------|-----------------------------------------------------------|
| className        | String             |    ✔️     | `""`    | Class names to apply to this component.                   |
| widgetsOrderName | Formik Path String |    ❌     |         | Must point to the widgets order field in the Formik data. |
| widgetsDataName  | Formik Path String |    ❌     |         | Must point to the widgets data field in the Formik data.  |



## WidgetsDraggableList

The widgets draggable in `ManageWidgetsFormSection`.

**Note:** This component should only be used interally by [ManageWidgetsFormSection](#managewidgetsformsection)

### Usage: 
```jsx
import WidgetsDraggableList from "components/TabController/modals/TabConfigurationBaseModal/ManageWidgetsFormSection/WidgetsDraggableList/WidgetsDraggableList";

<WidgetsDraggableList />
```

### Props:
| Prop             | Type               | Optional | Default | Description                                               |
|------------------|--------------------|:--------:|---------|-----------------------------------------------------------|
| className        | String             |    ✔️     | `""`    | Class names to apply to this component.                   |
| widgetsOrderName | Formik Path String |    ❌     |         | Must point to the widgets order field in the Formik data. |
| widgetsDataName  | Formik Path String |    ❌     |         | Must point to the widgets data field in the Formik data.  |







## TabManagerModal

A modal used to manage tabs. Used in the "_Manage Tabs_" option of **TabBar**'s **HamburgerMenu**

### Usage:

```jsx
import TabManagerModal from "components/TabController/modals/TabManagerModal/TabManagerModal";

<TabManagerModal />
```

### Props:

| Prop      | Type            | Optional | Default | Description                      |
|-----------|-----------------|:--------:|:-------:|----------------------------------|
| className | String          |    ✔️     |  `""`   | The class name of the component. |
| tabs      | Object          |    ❌     |         | Initial tab data.                |
| tabOrder  | Array\<String\> |    ❌     |         | Initial tab order.               |

**Note:** TabManagerModal uses [ConfirmModal](/components/modalComponents.html#confirmmodal) internally and passes all its props through.




## ManageTabsFormSection

The tabs draggable list form section in `TabManagerModal`.

**Note:** This component should only be used interally by [TabManagerModal](#tabmanagermodal)

### Usage: 
```jsx
import ManageTabsFormSection from "components/TabController/modals/TabManagerModal/ManageTabsFormSection/ManageTabsFormSection";

<ManageTabsFormSection />
```

### Props:
| Prop              | Type               | Optional | Default | Description                                                                                          |
|-------------------|--------------------|:--------:|---------|------------------------------------------------------------------------------------------------------|
| className         | String             |    ✔️     | `""`    | Class names to apply to this component.                                                              |
| tabsOrderName     | Formik Path String |    ❌     |         | Must point to the tabs order field in the Formik data.                                               |
| tabsDataName      | Formik Path String |    ❌     |         | Must point to the tabs data field in the Formik data.                                                |
| pushNewOperations | Function           |    ❌     |         | A function provided by `TabManagerModal` allowing the component to push new operations to the cache. |




## TabsDraggableList

The tabs draggable list in `ManageTabsFormSection`.

**Note:** This component should only be used interally by [ManageTabsFormSection](#managetabsformsection)

### Usage: 
```jsx
import TabsDraggableList from "components/TabController/modals/TabManagerModal/ManageTabsFormSection/TabsDraggableList/TabsDraggableList";

<TabsDraggableList />
```

### Props:
| Prop              | Type               | Optional | Default | Description                                                                                          |
|-------------------|--------------------|:--------:|---------|------------------------------------------------------------------------------------------------------|
| tabsOrderName     | Formik Path String |    ❌     |         | Must point to the tabs order field in the Formik data.                                               |
| tabsDataName      | Formik Path String |    ❌     |         | Must point to the tabs data field in the Formik data.                                                |
| pushNewOperations | Function           |    ❌     |         | A function provided by `TabManagerModal` allowing the component to push new operations to the cache. |






## WidgetPresetConfigurationBaseModal

A modal used for configuring widget preset settings. It is used in [WidgetPresetAddModal](#widgetpresetaddmodal) and [WidgetPresetEditModal](#widgetpreseteditmodal).

### Usage:

```jsx
import WidgetPresetConfigurationBaseModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetConfigurationBaseModal";

<WidgetPresetConfigurationBaseModal />
```

### Props:

| Prop                              | Type             | Optional | Default                                   | Description                                                                                                          |
|-----------------------------------|------------------|:--------:|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| onConfirm(data: WidgetPresetData) | Function         |    ✔️     | `undefined`                               | A callback to call on confirm click                                                                                  |
| initWidgetData                    | WidgetPresetData |    ✔️     | -                                         | The any widget preset data to initialize thw configuration modal with. By default it is populated with empty values. |
| lockWidgetType                    | Boolean          | `false`  | Locks the widget type from being changed. |                                                                                                                      |

### Object definitions:

```jsx
WidgetPresetData = {
    name: String,
    type: String,
    metaData: {
        description: String,
        hidden: Boolean,
        tags: Semicolon delimited String
    }
    customConfig: {
        ...custom widget config
    }
}
```

**Note:** WidgetPresetConfigurationBaseModal uses [ConfirmModal](/components/modalComponents.html#confirmmodal) and passes all its props through.



## WidgetPresetAddModal

A modified version of `WidgetPresetConfigurationBaseModal` that configures the following props:

| Configured Prop | Type   | Value          |
|-----------------|--------|----------------|
| title           | String | `"Add Widget"` |
| confirmText     | String | `"Add"`        |

### Usage:

```jsx
import TabAddModal from "components/widget/modals/WidgetPresetConfigurationBaseModal/WidgetPresetAddModal/WidgetPresetAddModal";

<WidgetPresetAddModal />
```



## WidgetPresetEditModal

A modified version of `WidgetPresetConfigurationBaseModal` that configures the following props:

| Configured Prop | Type    | Value           |
|-----------------|---------|-----------------|
| title           | String  | `"Edit widget"` |
| confirmText     | String  | `"Edit"`        |
| lockWidgetType  | Boolean | `true`          |

### Usage:

```jsx
import WidgetPresetEditModal from "components/widgets/modals/WidgetPresetConfigurationBaseModal/WidgetPresetEditModal/WidgetPresetEditModal";

<WidgetPresetEditModal />
```






## WidgetPresetManagerModal

A modal used to manage widget presets.

### Usage:
```jsx
import WidgetPresetManagerModal from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetManagerModal";

<WidgetPresetManagerModal />
```

### Props:

| Prop                                         | Type     | Optional |      Default       | Description                        |
|----------------------------------------------|----------|:--------:|:------------------:|------------------------------------|
| disabled                                     | String   |    ✔️     |       `true`       | Disables selecting in the modal.   |
| confirmText                                  | String   |    ✔️     |     `"Submit"`     | The confirm button text.           |
| title                                        | String   |    ✔️     | `"Manage Widgets"` | The title of the modal.            |
| onConfirm(selected presets: SelectedPresets) | Function |    ✔️     |    `undefined`     | Called when the form in submitted. |

### Object definitions:
```js
SelectedPresets = Array of SelectedPresetSection

SelectedPresetSection = {
    name: String, // Widget type
    items: Array of SelectedPresetItem
}

SelectedPresetItem = {
    selected: Boolean,
    disabled: Boolean,
    id: String,
}
```




## WidgetPresetAddSelectorModal

A modified version of `WidgetPresetManagerModal` that enables widget preset selecting.

### Usage:
```jsx
import WidgetPresetAddSelectorModal from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetAddSelectorModal";

<WidgetPresetAddSelectorModal />
```


## WidgetPresetPresetManagerModalFormSection

The widgets presets list form section in `WidgetPresetManagerModal`.

**Note:** This component should only be used interally by [WidgetPresetManagerModal](#widgetpresetmanagermodal)

### Usage: 
```jsx
import WidgetPresetAddSelectorModal from "components/widgets/modals/WidgetPresetManagerModal/WidgetPresetManagerModal";

<WidgetPresetManagerModal />
```

### Props:
| Prop                      | Type               | Optional | Default                                                                                | Description                                                                                                   |
|---------------------------|--------------------|:--------:|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| presetDataName            | Formik Path String |    ❌     |                                                                                        | Must point to the presets data                                                                                |
| field in the Formik data. |                    |          |                                                                                        |                                                                                                               |
| selectedPresetsName       | Formik Path String |    ❌     |                                                                                        | Must point to the selected presets field in the Formik data.                                                  |
| pushNewOperations         | Function           |    ❌     |                                                                                        | A function provided by `WidgetPresetManagerModal` allowing the component to push new operations to the cache. |
| generateWidgetPresetID    | Function ❌         |          | A function passed in by `WidgetPresetManagerModal` to generate a new widget preset ID. |                                                                                                               |
| disabled                  | Boolean            |    ✔️     | `false`                                                                                | Disables all the widget preset checkboxes.                                                                    |






## TagAddModal 

A modal for adding a new tag item.

### Usage: 
```jsx
import TagAdd from "componets/widgets/modals/TagAddModal/TagAddModal";

<TagAddModal />
```


### Props:
| Prop                                         | Type     | Optional | Default     | Description                              |
|----------------------------------------------|----------|:--------:|-------------|------------------------------------------|
| initTagName                                  | String   |    ✔️     | `""`        | Initial semi-colon delimited tag string. |
| onConfirm(tags: Semi-color Delimited String) | Function |    ✔️     | `undefined` | onConfirm as called by Formik.           |





## MarginalsConfigurationBaseModal 

The base modal for configuring the marginals (header and footer).

### Usage: 
```jsx
import MarginalsConfigurationBaseModal from "componets/TabController/modal/MarginalsConfigurationBaseModal/MarginalsConfigurationBaseModal";

<MarginalsConfigurationBaseModal />
```


### Props:
| Prop         | Type     | Optional | Default     | Description                                                                                            |
|--------------|----------|:--------:|-------------|--------------------------------------------------------------------------------------------------------|
| marginalType | String   |    ❌     |             | The string indicating the type of the modal. Must match the name of the marginal in the general store. |
| onConfirm    | Function |    ✔️     | `undefined` | Called when the modal is closed.                                                                       |
| setMarginal  | Function |    ❌     |             | The function used to set the data of the marginal.                                                     |





## HeaderConfigurationModal 

Sets the prop data of [MarginalsConfigurationBaseModal](#marginalsconfigurationbasemodal) tailored for configuring the header.

### Usage: 
```jsx
import HeaderConfigurationModal from "componets/TabController/modal/MarginalsConfigurationBaseModal/HeaderConfigurationModal/HeaderConfigurationModal";

<HeaderConfigurationModal />
```





## FooterConfigurationModal 

Sets the prop data of [MarginalsConfigurationBaseModal](#marginalsconfigurationbasemodal) tailored for configuring the header.

### Usage: 
```jsx
import FooterConfigurationModal from "componets/TabController/modal/MarginalsConfigurationBaseModal/FooterConfigurationModal/FooterConfigurationModal";

<FooterConfigurationModal />
```
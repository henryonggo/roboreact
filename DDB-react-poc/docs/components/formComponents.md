# Form Components

**Note:** Most of these components interface with Formik so they must be placed within a Formik form.


## BaseField

The base for all fields. Handles rendering out the error message.

### Usage: 
```jsx
import BaseField from "component/forms/BaseField/BaseField";

<BaseField />
```

### Props:
| Prop               | Type               | Optional | Default | Description                              |
|--------------------|--------------------|:--------:|---------|------------------------------------------|
| className          | String             |    ✔️     | `""`    | Class names to apply to this component.  |
| containerClassName | String             |    ✔️     | `""`    | Class names to apply to container div.   |
| errorClassName     | String             |    ✔️     | `""`    | Class names to apply to error component. |
| errorTag           | `HTML Tag`         |    ✔️     | `div`   | The component type of the error tag.     |
| name               | Formik Path String |    ❌     |         | Points to form value.                    |





## Checkbox

A simple styled checkbox. Is usually used to build larger components like [CheckboxList](#checkboxlist)

### Usage:
```jsx
import Checkbox from "components/forms/Checkbox/Checkbox";

<Checkbox />
```

### Props:
| Prop      | Type    | Optional | Default     | Description                                                                          |
|-----------|---------|:--------:|-------------|--------------------------------------------------------------------------------------|
| className | String  |    ✔️     | `""`        | Class names to apply to this component.                                              |
| id        | String  |    ✔️     | `undefined` | THe id attribute attached to the checkbot input element.                             |
| onClick   | Func    |    ✔️     | `undefined` | Called when the checkbox is clicked.                                                 |
| onChange  | Func    |    ✔️     | `undefined` | Called when the checkbox is changed.                                                 |
| selected  | Boolean |    ✔️     | `false`     | Indicates if the checkbox is selected.                                               |
| disabled  | Boolean |    ✔️     | `false`     | Indicates if the checkbox is disabled. Note: this stops `onClick` from being called. |





## CheckboxField

A single boolean switch field.

### Usage:
```jsx
import CheckboxField from "components/forms/CheckboxField/CheckboxField";

<CheckboxField />
```


### Props:
| Prop       | Type               | Optional | Default | Description                               |
|------------|--------------------|:--------:|---------|-------------------------------------------|
| className  | String             |    ✔️     | `""`    | Class names to apply to this component.   |
| name       | Formik Path String |    ❌     |         | The Formik data path string of the field. |
| disabled   | Boolean            |    ✔️     | `false` | Disables the checkbox field.              |
| title      | String             |    ✔️     | `""`    | The display title of the field.           |
| titleWidth | CSS Length         |    ✔️     | `30%`   | The amount of space the title takes up.   |





## CheckboxList

A list of checkboxes. Used for selected multiple options at once.

### Usage:
```jsx
import CheckboxList from "components/forms/CheckboxList/CheckboxList";

<CheckboxList />
```

### Props:
| Prop                                            | Type               | Optional | Default     | Description                                                                      |
|-------------------------------------------------|--------------------|:--------:|-------------|----------------------------------------------------------------------------------|
| className                                       | String             |    ✔️     | `""`        | Class names to apply to this component.                                          |
| name                                            | Formik Path String |    ❌     |             | Must point to a data source of **Array of `ItemsObject`**                        |
| disabledAll                                     | Boolean            |    ✔️     | `false`     | Disables all checkboxes.                                                         |
| disableItemRemoval                              | Boolean            |    ✔️     | `false`     | Disables all item remove buttons.                                                |
| onItemRemove(id: String, index: Number)         | Function           |    ✔️     | `undefined` | Called when an item is removed.                                                  |
| onItemToggle(id: String, index: Number)         | Function           |    ✔️     | `undefined` | Called when an item is toggled.                                                  |
| disableExtensionItems                           | Boolean            |    ✔️     | `false`     | Disables all extension items.                                                    |
| extensionItem                                   | Node or Function   |    ✔️     | `undefined` | An extension item that is added to each checkbox item.                           |
| extensionItemOnClick(id: String, index: Number) | Function           |    ✔️     | `undefined` | Called when an extension item is clicked.                                        |
| renderItem(item: ItemObject, index: Number)     | Function           |    ✔️     | -           | Allows for a custom display name to be rendered. By default the id is displayed. |


### Object Definitions: 
```js
ItemsObject: {
    display: String
    id: String,
    selected: Boolean
}

```




## DataPairedDraggableList 

An extension onto DraggableList where a configuration object can be paired with the `name` list.

### Usage:
```jsx
import DataPairedDraggableList from "components/forms/DataPairedDraggableList/DataPairedDraggableList";

<DataPairedDraggableList />
```

### Props:
| Prop      | Type               | Optional | Default | Description                                                                               |
|-----------|--------------------|:--------:|---------|-------------------------------------------------------------------------------------------|
| className | String             |    ✔️     | `""`    | Class names to apply to this component.                                                   |
| name      | Formik Path String |    ❌     |         | Must point to a data source of **Array of Strings**                                       |
| dataNames | Formik Path String |    ❌     |         | Must point to a data source of Object where each key corresponding to each item in `name` |

**Note:** This component uses [DraggableList](#draggablelist) internally so its props are forwarded to it.




## DraggableList

A component that renders out a styled draggable list.

It is used in configuration modals such as [TabConfigurationBaseModal](/components/tabComponents.html#tabconfigurationbasemodal) and [TabManagerModal](/components/tabComponents.html#tabmanagermodal).

<span style="color: red">
  <strong>Important:</strong>
</span>

Do **not** pass in an extension item containing a `<button>` or `<input>` tag, this will cause a bug where unwanted focussing and submissions will occur to the container that the DraggableList is in.

### Usage:

```jsx
import DraggableList from "components/forms/DraggableList/DraggableList";

<DraggableList/>
```

### Props:

| Prop                                              | Type               | Optional | Default     | Description                                                                                                                   |
|---------------------------------------------------|--------------------|:--------:|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| name                                              | Formik Path String |    ❌     |             | Must point to a data source of **Array of Strings**                                                                           |
| className                                         | String             |    ✔️     | `undefined` | Class names to apply to this component.                                                                                       |
| classNameHeader                                   | String             |    ✔️     | `undefined` | Class names to apply to the header class.                                                                                     |
| classNameContent                                  | String             |    ✔️     | `undefined` | Class names to apply to the content class.                                                                                    |
| disableItemRemoval                                | Boolean            |    ✔️     | `false`     | Disables all item remove buttons.                                                                                             |
| onItemRemove(index:Number, value:String)          | Function           |    ❌     |             | Callback when an item is being removed from the list. Takes the index of the item being removed and the value being removed.  |
| useDragHandle                                     | Boolean            |    ✔️     | `false`     | Enables dragging with a drag handle instead of the whole list item.                                                           |
| disableExtensionItems                             | Boolean            |    ✔️     | `false`     | Disables the extension item.                                                                                                  |
| extensionItem                                     | Node               |    ✔️     | `null`      | An extra item (usually another button, like a settings cog) that is displayed directly next to the close button.              |
| extensionItemOnClick(index: Number, value:String) | Function           |    ✔️     | `undefined` | Callback to call on click of the extension item. Takes the index of the item that it's attached to and the value of the item. |
| renderItem(value: String, index: Number)          | Function           |    ✔️     | -           | Custom item title render function. By default the id of the item is rendered.                                                 |

**Note:** This component uses [React Sortable HOC](https://github.com/clauderic/react-sortable-hoc) internally an passes the [SortableContainer HOC](https://github.com/clauderic/react-sortable-hoc#sortablecontainer-hoc) props through.





## FormSection

A container used for sectioning different parts of a form from each other.

### Usage:
```jsx
import FormSection from "components/forms/FormSectionFormSection";

<FormSection>
    {content}
</FormSection>
```

### Props:
| Prop                 | Type       | Optional | Default     | Description                                                                                                                                                                              |
|----------------------|------------|:--------:|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| className            | String     |    ✔️     | `""`        | Class names to apply to the form section.                                                                                                                                                |
| title                | String     |    ✔️     | `null`      | The title of the form section.                                                                                                                                                           |
| disableExtensionItem | Boolean    |    ✔️     | `false`     | Disables the extension item.                                                                                                                                                             |
| extensionItem        | Node       |    ✔️     | `null`      | An item displayed on the right side of the title section. Useful for adding a section specific operation button. **e.g;** Adding a widget like what the widget section in `TabAdd` does. |
| extensionItemOnClick | Function   |    ✔️     | `undefined` | Callback to call on click of the extension item.                                                                                                                                         |
| shrinkable           | Boolean    |    ✔️     | `false`     | Indicates if the form section is shrinkable. **Note:** the parent container must be using flexbox for this to work.                                                                      |
| scrollable           | Boolean    |    ✔️     | `0`         | The minimum size the form section can shrink to, if shrinkable.                                                                                                                          |
| minHeight            | CSS Length |    ✔️     | `false`     | Indicates if the form section should scroll if it overflows.                                                                                                                             |
| autoSpace            | Boolean    |    ✔️     | `false`     | Indicates if the first-level child components should have margin spacing applied to them automatically. Useful for "uncramping" a form section.                                          |
| displayBackground    | Boolean    |    ✔️     | `true`      | Indicates if the background color will be displayed.                                                                                                                                     |
| indentLevel          | Number     |    ✔️     | `0`         | The indent level of the form section.                                                                                                                                                    |
| indentAmount         | CSS Length |    ✔️     | `1rem`      | The offset of each indent level. **Note:** it is recommended to keep this as `"rem"` as to adhere to responsive design principals.                                                       |




## InputField

The base input field. Usually used for text or password fields.

### Usage:
```jsx
import InputField from "components/forms/InputField/InputField";

<InputField />
```

### Props:
| Prop               | Type                                                                          | Optional | Default  | Description                                      |
|--------------------|-------------------------------------------------------------------------------|:--------:|----------|--------------------------------------------------|
| className          | String                                                                        |    ✔️     | `""`     | Class names to apply to the field.               |
| containerClassName | String                                                                        |    ✔️     | `""`     | Class names to apply to the container component. |
| inputClassName     | String                                                                        |    ✔️     | `""`     | Class names to apply to the input component.     |
| titleClassName     | String                                                                        |    ✔️     | `""`     | Class names to apply to the title component.     |
| name               | Formik Path String                                                            |    ❌     |          | Must point to a String.                          |
| type               | [Input Type String](https://www.w3schools.com/html/html_form_input_types.asp) |    ✔️     | `"text"` | The type of the internal input tag.              |
| disabled           | Boolean                                                                       |    ✔️     | `false`  | Disables the input field.                        |
| title              | String                                                                        |    ❌     |          | The display title of field.                      |
| titleWidth         | CSS Length                                                                    |    ✔️     | `30%`    | The amount of space the title takes up.          |

**Note:** InputField uses Formiks `Field` internally and passes through all its props.





## MultiSectionCheckboxList

A checkbox list utilizing multiple sections which are separated by [FormSection](#formsection) components.

### Usage:
```jsx
import MultiSectionCheckboxList from "components/forms/MultiSectionCheckboxList/MultiSectionCheckboxList";

<MultiSectionCheckboxList />
```

### Props:
| Prop                                                                        | Type               | Optional | Default                           | Description                                                               |
|-----------------------------------------------------------------------------|--------------------|:--------:|-----------------------------------|---------------------------------------------------------------------------|
| name                                                                        | Formik Path String |    ❌     |                                   | Must point to a data object of **Array of `SectionObject`**               |
| indentLevel                                                                 | Number             |    ✔️     | `1`                               | The indent level of the internal form sections.                           |
| disabledSections                                                            | Array of Strings   |    ✔️     | `[]`                              | An array of strings pointing to the names of any disabled sections.       |
| disabledAll                                                                 | Boolean            |    ✔️     | `fase`                            | Disabled all checkbox items in all sections.                              |
| disableItemRemoval                                                          | Boolean            | `false`  | Disables all item remove buttons. |                                                                           |
| onItemRemove(section index: Number, id: String, item index: Number)         | Function           |    ✔️     | `undefined`                       | Called when an item is removed.                                           |
| onItemToggle(section index: Number, id: String, item index: Number)         | Function           |    ✔️     | `undefined`                       | Called when an item is toggled.                                           |
| disableExtensionItems                                                       | Boolean            | `false`  | Disables all extension items.     |                                                                           |
| extensionItem                                                               | Node or Function   |    ✔️     | `undefined`                       | An extension item that is added to each checkbox item.                    |
| extensionItemOnClick(section index: Number, id: String, item index: Number) | Function           |    ✔️     | `undefined`                       | Called when an extension item is clicked.                                 |
| renderSectionTitle(sectio name: String)                                     | Function           |    ✔️     | -                                 | Renders a custom section title. By default the section name is rendered.  |
| renderItem(SectionParamObj, ItemParamObj)                                   | Function           |    ✔️     | -                                 | Renders a custom checkbox item title. By default the item ID is rendered. |

### Object Definitions: 
```js
SectionsObject: {
    name: String,
    items: Array of ItemsObject
}

ItemsObject: {
    display: String
    id: String,
    selected: Boolean
}

SectionParamObj: {
    sectionIndex: Number,
    sectionName: String
}

ItemParamObj: {
    itemIndex: Number,
    item: ItemsObject
}

```




## NumberField

A customized version of [InputField](#inputfield) optimizing for the `"number"` input type.

### Usage:
```jsx
import NumberField from "components/forms/InputField/NumberField/NumberField";

<NumberField />
```

### Props:
| Prop       | Type               | Optional | Default | Description                                                   |
|------------|--------------------|:--------:|---------|---------------------------------------------------------------|
| className  | String             |    ✔️     | `""`    | Class names to apply to the field.                            |
| name       | Formik Path String |    ❌     |         | Must point to a String.                                       |
| title      | String             |    ❌     |         | The display title of field.                                   |
| titleWidth | CSS Length         |    ✔️     | `65%`   | The amount of space the title takes up.                       |
| minValue   | Number             |    ✔️     | `null`  | The minimum cap on the number field. Set `null` to disable.   |
| maxValue   | Number             |    ✔️     | `null`  | The maximum cap on the number field. Set `null` to disable.|` |




## SelectField

A styled select component.

### Usage:
```jsx
import SelectField from "components/forms/SelectField/SelectField";

<SelectField />
```

### Props:
| Prop       | Type                                 | Optional | Default | Description                                                                                |
|------------|--------------------------------------|:--------:|---------|--------------------------------------------------------------------------------------------|
| className  | String                               |    ✔️     | `""`    | Class names to apply to the field.                                                         |
| name       | Formik Path String                   |    ❌     |         | Must point to a String.                                                                    |
| disabled   | Boolean                              |    ✔️     | `false` | Disables the select field.                                                                 |
| title      | String                               |    ✔️     | `""`    | The title of the field.                                                                    |
| titleWidth | CSS Length                           |    ✔️     | `30%`   | The amount of space the title takes up.                                                    |
| options    | Array of Strings                     |    ✔️     | `[]`    | The options of the select field.                                                           |
| renderItem | Function(val: String, index: Number) |    ✔️     | -       | Custom title render function for each option. The option value is rendered out by default. |

**Note:** SelectField uses Formiks `Field` internally and passes through all its props.




## TextField

A customized version of [InputField](#inputfield) optimizing for the input types `"text"`, `"password"`, and `"email"` input types.

### Usage:
```jsx
import TextField from "components/forms/InputField/TextField/TextField";

<TextField />
```

### Props:
| Prop      | Type                              | Optional | Default  | Description                        |
|-----------|-----------------------------------|:--------:|----------|------------------------------------|
| className | String                            |    ✔️     | `""`     | Class names to apply to the field. |
| name      | Formik Path String                |    ❌     |          | Must point to a String.            |
| type      | `"text"`, `"password"`, `"email"` |    ✔️     | `"text"` | The type of the input field.       |

**Note:** TextField extends `InputField` and passes through its props.




## YearNumberField

A customized version of [NumberField](#numberfield) used for inputting a year type.

### Usage:
```jsx
import YearNumberField from "components/forms/InputField/YearNumberField/YearNumberField";

<YearNumberField />
```

### Props:
| Prop                 | Type               | Optional | Default | Description                                                                                                 |
|----------------------|--------------------|:--------:|---------|-------------------------------------------------------------------------------------------------------------|
| name                 | Formik Path String |    ❌     |         | Must point to a String/Number.                                                                              |
| defaultToCurrentYear | Boolean            |    ✔️     | `false` | If the `name` prop points to a null/empty string it will automatically be overridden with the current year. |


**Note:** This component uses [NumberField](#numberfield) internally and all its props are passed along.
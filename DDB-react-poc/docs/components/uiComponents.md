# UI Components

These are base components that can be reused anywhere in the app.




## ButtonBase

The base button that is used by all buttons.

### Usage:

```jsx
import ButtonBase from "components/ui/button/ButtonBase";

<ButtonBase>
    {content}
</ButtonBase>
```

### Props:

| Prop      | Type     | Optional | Default     | Description                             |
|-----------|----------|:--------:|-------------|-----------------------------------------|
| onClick   | Function |    ✔️     | `undefined` | The callback to call on button click.   |
| className | String   |    ✔️     | `""`        | Any class names to apply to the button. |
| disabled  | Boolean  |    ✔️     | `false`     | Disabled the button.                    |


## Dropdown

A component for displaying a list of items in a dropdown format.

| Prop          | Type                                   | Optional | Default | Description                                                                                  |
|---------------|----------------------------------------|:--------:|:-------:|----------------------------------------------------------------------------------------------|
| dropdownClass | Object                                 |    ✔️     |  `""`   | Class names to apply to the dropdown.                                                              |
| dropdownItems | Array of [DropdownItem](#dropdownitem) |    ❌     |         | An array of items to display in the dropdown.                                                |
| styleProps    | Object                                 |    ✔️     |  `{}`   | Any styles to apply to the dropdown. Mostly used with React Spring's transition style props. |

#### DropdownItem:
```js
{
    icon: Node || Function,
    optionName: String.isRequired,
    onClick: Function
}
```


## DropdownMenu

A styled select menu. This component uses [Dropdown](#dropdown) internally to display it's dropdown, and passes it's props through to that. 

| Prop                           | Type   | Optional | Default | Description                                                       |
|--------------------------------|--------|:--------:|:-------:|-------------------------------------------------------------------|
| ...[Dropdown](#dropdown) props | Any    |          |         | Any props to pass down to the Dropdown component.                 |
| dropdownLabel                  | String |    ✔️     |  `""`   | The text to display as the selected option for the dropdown menu. |


## HamburgerMenu

A hamburger menu component. Includes a button to open the menu and the menu itself.

### Usage:

```jsx
import HamburgerMenu from "components/ui/HamburgerMenu/HamburgerMenu";

<HamburgerMenu/>
```

### Props:
<table>
    <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Optional</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>isOpen</td>
        <td>Boolean</td>
        <td align="center"> ❌ </td>
        <td></td>
        <td>Whether the menu is open or not.</td>
    </tr>
    <tr>
        <td>menuItems</td>
        <td>Array&lt;Object&gt;</td>
        <td align="center"> ❌ </td>
        <td></td>
        <td>
            The menu's options. 
            <strong>Object format:</strong>
<pre><code>{
    icon: Node
    optionName: String
    onClick: Function
}</code></pre>
        </td>
    </tr>
    <tr>
        <td>toggleOpen</td>
        <td>Function</td>
        <td align="center"> ❌ </td>
        <td></td>
        <td>A function that toggles the menu's open status.</td>
    </tr>
    <tr>
        <td>menuClass</td>
        <td>String</td>
        <td align="center"> ✔️ </td>
        <td><code>""</code></td>
        <td>Class names to apply to the menu.</td>
    </tr>
</table>




## IconButton

A wrapper component for material icons that gives them the standard button stylings.

### Usage:
```jsx
import IconButton from "components/ui/button/IconButton/IconButton";

<IconButton>
    ...material icon component ehre
</IconButton>

// Example:
import { Close } from "@material-ui/icons";

<IconButton>
    <Close />
</IconButton>
```

### Props:
| Prop      | Type                   | Optional | Default      | Description                                    |
|-----------|------------------------|:--------:|--------------|------------------------------------------------|
| className | String                 |    ✔️     | `undefined`  | Class names to be applied to the root element. |
| tag       | String                 |    ✔️     | `"div"`      | The element type of the root element.          |
| children  | Node or Array of Nodes |    ✔️     | `undefinied` | The icon to be rendered.                       |
| disabled  | Boolean                |    ✔️     | `false`      | Indicates if the icon should be disabled.      |




## ListItem

A list component used internally by components such as [DraggableList](#draggablelist).


### Usage: 
```jsx
import ListItem from "components/ui/ListItem/ListItem";

<ListItem>
    ...children here
</ListItem>

```

### Props:
| Prop        | Type                   | Optional | Default      | Description                                    |
|-------------|------------------------|:--------:|--------------|------------------------------------------------|
| className   | String                 |    ✔️     | `undefined`  | Class names to be applied to the root element. |
| tag         | String                 |    ✔️     | `"div"`      | The element type of the root element.          |
| prefixItems | Node or Array of Nodes |    ✔️     | `null`       | The components rendered in the prefix section  |
| suffixItems | Node or Array of Nodes |    ✔️     | `null`       | The components rendered in the suffix section  |
| onClick     | Function               |    ✔️     | `undefined`  | Called when the list item is clicked           |
| children    | Node or Array of Nodes |    ✔️     | `undefinied` | The components rendered in the main section    |





## PrimaryButton

The default styled button used in the application.

### Usage:

```jsx
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";

<PrimaryButton>
    {content}
</PrimaryButton>
```

### Props:

| Prop      | Type     | Optional | Default     | Description                                     |
|-----------|----------|:--------:|-------------|-------------------------------------------------|
| onClick   | Function |    ✔️     | `undefined` | The callback to call on button click.           |
| className | String   |    ✔️     | `""`        | Class names to apply the root button component. |
| disabled  | Boolean  |    ✔️     | `false`     | Disable the button.                             |

**Note:** PrimaryButton uses [ButtonBase](#buttonbase) internally and all its props are passed through.




## PrimaryLoaderButton

### Usage:

```jsx
import PrimaryLoaderButton from "components/ui/button/PrimaryLoaderButton/PrimaryLoaderButton";

<PrimaryLoaderButton>
    {content}
</PrimaryLoaderButton>
```

### Props:

| Prop      | Type    | Optional | Default | Description                                           |
|-----------|---------|:--------:|---------|-------------------------------------------------------|
| className | String  |    ✔️     | `""`    | Class names to apply the root button component.       |
| loading   | Boolean |    ✔️     | `false` | Displays the loading spinner and disables the button. |

**Note:** PrimaryLoaderButton uses [PrimaryButton](#primarybutton) internally and all its props are passed through.




## SpinnerLoader

A pure CSS loader animation component.

### Usage:

```jsx
import SpinnerLoader from "components/ui/loaders/SpinnerLoader";

<SpinnerLoader />
```

### Props:

| Prop      | Type       | Optional | Default     | Description                                     |
|-----------|------------|:--------:|-------------|-------------------------------------------------|
| className | String     |    ✔️     | `undefined` | Class names to apply the root button component. |
| size      | CSS Length |    ✔️     | `"2rem"`    | The size of the spinner.                        |
| thickness | CSS Length |    ✔️     | `"0.2rem"`  | The thickness of the spinner rings.             |





## TagItem

An item used to represent a tag.

### Usage:

```jsx
import TagItem from "components/ui/TagItem/TagItem"

<TagItem>
    ...content
</TagItem>
```

### Props: 
| Prop      | Type                   | Optional | Default     | Description                                          |
|-----------|------------------------|:--------:|-------------|------------------------------------------------------|
| removable | Boolean                |    ✔️     | `false`     | Indicates if the remove icon is displayed.           |
| onRemove  | Function               |    ✔️     | `undefined` | Called when the remove icon is clicked.              |
| onClick   | Function               |    ✔️     | `undefined` | Called when the tag item is clicked.                 |
| className | String                 |    ✔️     | `undefined` | Class names to apply to the root tag item component. |
| children  | Node or Array of Nodes |    ✔️     | `undefined` | Displayed as the content of the tag item.            |


## CloseButton

The default close button used in the application.

### Usage:

```jsx
import CloseButton from "components/ui/button/CloseButton/CloseButton";

<CloseButton />
```

### Props:

| Prop      | Type     | Optional | Default     | Description                                     |
|-----------|----------|:--------:|-------------|-------------------------------------------------|
| className | String   |    ✔️     | `undefined` | Class names to apply the root button component. |
| onClick   | Function |    ✔️     | `undefined` | The callback to call on button click.           |
| disabled  | Boolean  |    ✔️     | `false`     | Disable the button.                             |

**Note:** PrimaryButton uses [ButtonBase](#buttonbase) internally and all its props are passed through.
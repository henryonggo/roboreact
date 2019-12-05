# Tab Components

All components concerned with the tab functionality of the app.




## TabController

As the name suggests, this component manages everything to do with tabs.

### Responsibilities:

- Rendering out and managing `TabBar`
- Rendering out and managing `TabView`

### Usage:
```jsx 
import TabController from "components/TabController/TabController";

<TabController />
```




## TabBar

This component manages the tab bar of the app.

### Responsibilities:

- Managing and providing interactivity to the list of tabs
- Managing the `TabBarMenuManager`

### Usage:
```jsx 
import TabBar from "components/TabController/TabBar/TabBar";

<TabBar />
```




## TabView

This component manages the view of the currently open tab.

### Responsibilities:

- Display the grid layout and widgets of the currently opened tab
- Responsively handle screen resizes to the grid

### Usage:
```jsx 
import TabView from "components/TabController/TabView/TabView";

<TabView />
```




## TabBarMenuManager

This component manages the settings menu at the right end of `TabBar`.

### Responsibilities:

- Handle displaying the hamburger menu containing tab, widget and general settings.
- Handle opening the corresponding hamburger menu modals.

### Usage:
```jsx 
import TabBarMenuManager from "components/TabController/TabBar/TabBarMenuManager/TabBarMenuManager";

<TabBarMenuManager />
```




## TabItem

The tab items displayed in `TabBar`.

### Responsibilities:

- Represent a single tab page
- Handle the tab click event
- Handle the remove button click event

### Usage:
```jsx 
import TabItem from "components/TabController/TabBar/TabItem/TabItem";

<TabItem>
    ...content
</TabItem>
```




## TabAdd

A modified `TabItem` that is responsible for opening the `TabAddModal`.

### Usage:
```jsx 
import TabAdd from "components/TabController/TabBar/TabItem/TabAdd/TabAdd";

<TabAdd />
```

### Props:
| Prop          | Type    | Optional | Default | Description                                                     |
|---------------|---------|:--------:|---------|-----------------------------------------------------------------|
| focusOnTabAdd | Boolean |    ✔️     | `true`  | Forces the added tab to be automatically focussed when created. |


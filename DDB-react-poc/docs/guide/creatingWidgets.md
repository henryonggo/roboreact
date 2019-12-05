# Creating Widgets

## Overview

Widget systems are comprised of 3 parts: 

1. The widget component
2. The widget configuration component
3. The widget lifecycle file

## Component Setups

### Create widget base type

In `components/widgets/bases` create a new directory `NewWidget` to store all widget files in. Our standard is that the main widget component is named `NewWidget.js`, the configuration component is `WidgetNameConfig.js` and the lifecycle file is `WidgetNameLifecycle.js`.

#### `NewWidget.js` 

This is the base component that gets rendered the widget. The `widgetPresetID` prop is automatically injected in by the widget wrapper which allows the widget to connect to the Redux store and pull configuration if needed.

**Sample widget component:**

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect as connectRedux } from "react-redux";
import { NEW_WIDGET } from "constants/widgets/widgetBaseTypes";

class NewWidget extends Component {
    render() {
        const { widgetPresets, widgetPresetID } = this.props;

        // This points to the specific configuration object for this widget instance.
        const widgetPreset = widgetPresets[widgetPresetID];

        // In case that the widget preset is removed
        // (this accounts for some lingering render cycles)
        if (!widgetPreset) {
            return null;
        }

        return (
            // Render widget component here
        );
    }
}

NewWidget.propTypes = {
    // Injected by the widget wrapper
    widgetPresetID: PropTypes.string.isRequired,
    // Mapped store state
    widgetPresets: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    // Gets all the widget presets of the widget base type
    widgetPresets: state.present.widget.presets[NEW_WIDGET]
});

const mapDispatchToProps = (dispatch) => ({}); // Map any needed dispatches

export default connectRedux(mapStateToProps, mapDispatchToProps)(NewWidget);
```

#### `NewWidgetConfig.js` 

This is the component that gets rendered to customly configure the widget. When this component is rendered out it will always be wrapped in a Formik instance so formik methods can be used internally for complex form state management. It is also mandatory to wrap the entire component in the `BaseWidgetConfig` component which will handle initializing the configuration data with formik. 

::: tip
Since all widget configuration components are wrapped by Formik, all the included form objects in the project can be used.
:::

**Sample widget configuration component:**

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect as connectFormik } from "formik";

class NewWidgetConfig extends Component {

    render() {
        const { formik, name, initConfig, ...rest } = this.props;

        render() {
            <BaseWidgetConfig
                { ...rest }
                name={name}
                initConfig={initConfig}
            >
                {/* Render configuration component here */} 
            </BaseWidgetConfig>
        }
    }
}

NewWidgetConfig.propTypes = {
    // Injected by formik
    formik: PropTypes.object.isRequired,

    name: PropTypes.string.isRequired, // Points to the custom config object for this widget
    initConfig: PropTypes.object // Initial config for the custom config object
};

export default connectFormik(NewWidgetConfig);
```

#### `NewWidgetLifecycle.js`

This file allows for custom handling of the lifecycle for the widget. This file gives control over the widget preset data, allowing it to be mutated before the reducer is executed and the widget is added/edited/removed.

**Lifecycle Types:**
* onCreate
* onUpdate
* onRemove

::: tip
Asynchronous lifecycle hooks using async/await are also allowed.
:::

**Sample lifecycle file:**

```js
export const onCreate = (i_oWidgetPresetData) => {
    let oUpdatedWidgetPresetData = i_oWidgetPresetData;
    // Do some changes to the widget preset data
    return oUpdatedWidgetPresetData
};

export const onUpdate = (i_oWidgetPresetData) => {
    let oUpdatedWidgetPresetData = i_oWidgetPresetData;
    // Do some changes to the widget preset data
    return oUpdatedWidgetPresetData
};

export const onRemove = (i_oWidgetPresetData) => {
    let oUpdatedWidgetPresetData = i_oWidgetPresetData;
    // Do some changes to the widget preset data
    return oUpdatedWidgetPresetData
};
```

::: warning
Do not forget to use immutability-helper when updating the widget preset data in order to avoid mutating the object.
:::


## Registering Widgets

### Register a widget base type

Add a new widget base type entry in `constants/widgets/widgetBaseTypes.js` like so:

```js
// ...other widget base types
export const NEW_WIDGET = "NEW_WIDGET";

export default {
    // ...other widget base types
    NEW_WIDGET,
};
```

### Add to WidgetManager

Add mapping references to the new widget in the `WidgetManager` located at `managers/WidgetManager.js` like so:

```js
import { widgetBaseTypes } from "constants/widgets"; // Should be imported already

// Import widget components
import NewWidget from "path/to/newWidget";
import NewWidgetConfig from "path/to/newWidgetConfig";
import NewWidgetLifecycle from "path/to/newWidgetLifecycle";

// Setup mapping
const BASE_WIDGET_MAPPINGS = {
    // ...other base widget mappings
    [widgetBaseTypes.NEW_WIDGET]: NewWidget
};

const BASE_WIDGET_CONFIG_MAPPINGS = {
    // ...other base widget config mappings
    [widgetBaseTypes.NEW_WIDGET]: NewWidgetConfig
};

const BASE_WIDGET_LIFECYCLE_MAPPINGS = {
    // ...other base widget lifecycle mappings
    [widgetBaseTypes.NEW_WIDGET]: NewWidgetLifecycle
};

// ...rest of the file
```

### *(Optional)* Register a widget base type name

This registers a more human readable name that the widget will be displayed as. If no entry is given then the base type constant for the widget in `constants/widgets/widgetBaseTypes.js` will be used.

To add a base type name add the following in `constants/widgets/widgetBaseTypesNames.js` like so:

```js
// ...other widget base type names
export const NEW_WIDGET = "New Widget Name";

export default {
    // ...other widget base type names
    NEW_WIDGET,
};
```

### *(Optional)* Register a widget as marginal-compatible

To register a widget as marginal compatible (i.e. can be used as a header/footer) add the following to `constants/widgets/marginalWidgetBaseTypes.js`:

```js
import widgetBaseTypes from "constants/widgets/widgetBaseTypes";

export default [
    // ...other marginal-compatible widget base types
    widgetBaseTypes.NEW_WIDGET,
];
```

### *(Optional)* Register a system widget base type

To register a system widget (i.e. the user cannot see or configure new instances of it) add the following to `constants/widgets/systemWidgetBaseTypes.js`

```js
import widgetBaseTypes from "constants/widgets/widgetBaseTypes";

export default [
    widgetBaseTypes.NEW_WIDGET
];
```
# Redux Store

DDB 2.0 uses Redux for global state management called ***stores***.

There are 3 separate sub-stores:
* [Misc Store](./miscStore.html): For miscellaneous, uncategorized state items.
* [Tab Store](./tabStore.html): For tab related state.
* [Theme Store](./themeStore.html): For theme related state.

## Actions
```jsx
// Action creators
import * as actionCreators from "store/actions";

// Action types
import * as actionTypes from "store/actions/actionTypes";
```

## Action Configuration
* `$undoable: true`
    * Indicates if the action should be considered undoable.
* `$group: null`
    * Indicates what action group this action should be under. This allows for the ability to undo multiple actions at one.
    * `null` indicates that the action is ungrouped.
* `$saveToServer: false`
    * Indicates if the action should be saved to the server, if applicable since some actions do not have any server saving functionality.
* `$runLifecycle: true`
    * Indicates if the action should trigger the lifecycle methods for the widget, if applicable.
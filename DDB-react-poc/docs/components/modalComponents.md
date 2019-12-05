# Modal Components

Most of these modals are managed directly by [`ModalManager`](/reference/managersReference.html#modalmanager) so there is no need to use them directly in your components.

**Note:** all modals wrap an instance of the `<Form>` element from [Formik](https://jaredpalmer.com/formik/) in order to deal with form state management.




## ModalBase

The base component that all modals are built on.

**Note 1:** This component really should only be used by `ModalWrapper` since it handles all the appropriate stylings that are needed.

**Note 2:** ModalBase uses [react-modal](http://reactcommunity.org/react-modal/#usage) internally so all its props are passed through except `isOpen` if the modal is being managed by `ModalManager`.

### Usage:

```jsx
import ModalBase from "components/modals/ModalBase";
```

### Props:

| Prop                 | Type   | Optional | Default     | Description                                                                               |
|----------------------|--------|:--------:|-------------|-------------------------------------------------------------------------------------------|
| themeNamespace       | String |    ✔️     | `"default"` | The namespace of the theme that will be locally applied to the modal.                     |
| ...react-modal props | Any    |    ❌     |             | Any [react-modal](http://reactcommunity.org/react-modal/#usage) props to be passed along. |




## ModalWrapper

Used as the base component for all modals in the app. `ModalWrapper` provides a styled wrapper where content can be injected into.

### Usage:

```jsx
import ModalWrapper from "components/modals/ModalWrapper";

<ModalWrapper>
    {content}
</ModalWrapper>
```

### Props:

| Prop                | Type                  | Optional | Default       | Description                                                                                                                     |
|---------------------|-----------------------|:--------:|---------------|---------------------------------------------------------------------------------------------------------------------------------|
| className           | String                |    ❌     |               | The class name for the modal.                                                                                                   |
| title               | Node or String        |    ✔️     | `null`        | The text/content displayed on the modal handle.                                                                                 |
| onCancel            | Function              |    ✔️     | `undefined`   | Called when the close (X) button is clicked.                                                                                    |
| closable            | Boolean               |    ✔️     | `true`        | Indicates if the modal is closable.                                                                                             |
| draggable           | Boolean               |    ✔️     | `false`       | Whether the modal can be dragged by the handle or not.                                                                          |
| resizable           | Boolean               |    ✔️     | `false`       | Whether the modal can be resized or not.                                                                                        |
| initDimensions      | {width, height}       |    ✔️     | -             | The initial dimensions of the modal. **Note:** This is only used when the modal is resizable.                                   |
| initPosition        | {x, y}                |    ✔️     | Window center | The initial position of the modal.                                                                                              |
| minConstraints      | [minWidth, minHeight] |    ✔️     | `[500,70]`    | The minimum size of the modal.                                                                                                  |
| maxConstraints      | [maxWidth, maxHeight] |    ✔️     | `[700,300]`   | The maximum size of the modal.                                                                                                  |
| initToMinDimensions | Boolean               |    ✔️     | `true`        | Indicates if the initial dimensions should be to the min/max initital dimensions, given that `initDimensions` has not been set. |

**Note:** ModalWrapper uses [ModalBase](#modalbase) internally so all of its props are passed through.




## FormBaseModal

Sets up the Formik form for the modal.

| Prop             | Type                                         | Optional | Default     | Description                                                                                                                                                              |
|------------------|----------------------------------------------|:--------:|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| className        | String                                       |    ✔️     | `undefined` | The class name.                                                                                                                                                          |
| useFlexbox       | Boolean                                      |    ✔️     | `false`     | Indicates if the content of the modal should use flexbox.                                                                                                                |
| useAsync         | Boolean                                      |    ✔️     | `true`      | Runs the onConfirm chain asyncly and waits for it to finish before closing the modal.                                                                                    |
| actionComponents | `React Element` or Array of `React Elements` |    ✔️     | `undefined` | The action types that get rendered under the content container (usually used for rendering modal control buttons). Passes the formik props through (i.e; `isSubmitting`) |
| onConfirm        | Function                                     |    ✔️     | `undefined` | Called when the form submits. Passes in the values and actions as given in Formik. Runs asyncly                                                                          |
| scrollable       | Boolean                                      |    ✔️     | `false`     | Indicates if the form content should be scrollable on overflow.                                                                                                          |


**Note:** FormBaseModal uses [ModalWrapper](#modalwrapper) and [Formik \<Form\>](https://jaredpalmer.com/formik/docs/api/form) internally and passes those props down.




## AssertionBaseModal

The base component for building assertion modals (modals with a confirm button).

### Usage:

```jsx
import AssertionBaseModal from "components/modals/assertions/AssertionBaseModal";

<AssertionBaseModal>
    {content}
</AssertionBaseModal>
```

### Props:

| Prop                 | Type           | Optional | Default  | Description                                               |
|----------------------|----------------|:--------:|----------|-----------------------------------------------------------|
| title                | Node or String |    ✔️     | `""`     | The title of the assertion.                               |
| icon                 | Node           |    ✔️     | `null`   | The icon of the assertion.                                |
| confirmButtonContent | Node or String |    ✔️     | `"Okay"` | The content displayed in the confirm button.              |
| onConfirm            | Function       |    ❌     |          | Callback function to call on clicking the confirm button. |

**Note:** AssertionBaseModal uses [FormBaseModal](#formbasemodal) internally and passes those props down.




## InfoAssertionModal

An assertion that can be used to display general information to the user.

### Usage:

```jsx
import InfoAssertionModal from "components/modals/assertions/InfoAssertionModal/InfoAssertionModal";

<InfoAssertionModal>
    {content}
</InfoAssertionModal>
```

### Props:

| Prop  | Type           | Optional | Default  | Description                      |
|-------|----------------|:--------:|----------|----------------------------------|
| title | Node or String |    ✔️     | `"Info"` | The title of the info assertion. |

**Note:** InfoAssertionModal uses [AssertionBaseModal](#assertionbasemodal) internally so all its props are passed through except `icon` which is provided automatically by InfoAssertionModal.




## WarningAssertionModal

An assertion that can be used to display warning information to the user.

### Usage:

```jsx
import WarningAssertionModal from "components/modals/assertions/WarningAssertionModal/WarningAssertionModal";

<WarningAssertionModal>
    {content}
</WarningAssertionModal>
```

### Props:

| Prop  | Type           | Optional | Default     | Description                         |
|-------|----------------|:--------:|-------------|-------------------------------------|
| title | Node or String |    ✔️     | `"Warning"` | The title of the warning assertion. |

**Note:** WarningAssertionModal uses [AssertionBaseModal](#assertionbasemodal) internally so all its props are passed through except `icon` which is provided automatically by WarningAssertionModal.




## ErrorAssertionModal

An assertion that can be used to display error information to the user.

### Usage:

```jsx
import ErrorAssertionModal from "components/modals/assertions/ErrorAssertionModal/ErrorAssertionModal";

<ErrorAssertionModal>
    {content}
</ErrorAssertionModal>
```

### Props:

| Prop  | Type           | Optional | Default   | Description                       |
|-------|----------------|:--------:|-----------|-----------------------------------|
| title | Node or String |    ✔️     | `"Error"` | The title of the error assertion. |

**Note:** ErrorAssertionModal uses [AssertionBaseModal](#assertionbasemodal) internally so all its props are passed through except `icon` which is provided automatically by ErrorAssertionModal.




## ConfirmModal

The base component for building confirmation modals (modals with confirm and cancel buttons).

### Usage:

```jsx
import ConfirmModal from "components/modals/ConfirmModal/ConfirmModal";

<ConfirmModal>
    {content}
</ConfirmModal>
```

### Props:

| Prop        | Type     | Optional | Default     | Description                                                                                                                                                                                                |
|-------------|----------|:--------:|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| className   | String   |    ✔️     | `""`        | Custom class name for the confirm modal.                                                                                                                                                                   |
| confirmText | String   |    ✔️     | `"Okay"`    | The text content of the confirm button.                                                                                                                                                                    |
| cancelText  | String   |    ✔️     | `"Cancel"`  | The text content of the cancel button.                                                                                                                                                                     |
| onConfirm   | Function |    ❌     |             | Callback function to call on click of the confirm button.                                                                                                                                                  |
| onCancel    | Function |    ✔️     | `undefined` | Callback function to call on click of the cancel button. **Note:** This only includes the click of the cancel button. Use [onRequestClose](#modalbase) to deal with all cases involving exiting the modal. |

**Note:** ConfirmModal uses [FormBaseModal](#formbasemodal) internally and passes those props down.
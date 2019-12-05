# Creating Modals

## Background
Creating modals are done by composing an existing base modal inside of a new modal component that contains the desired functionality. A list of all available base modals can be found in the [Modals](/components/modalComponents.html) component documentation.

## Using Modals
After creating a modal, adding it to the Dashboard involves integration with [`ModalManager`](/reference/managersReference.html#modalmanager) and it's infrastructure. Below are the steps needed to do this integration. We'll be using a modal called `NewModal` for example's sake.

### Integration
Register the modal type in `constants/modals/modalTypes.js`:
```jsx
/**
 * Add a new constant type for the modal, and export it. 
 * Make sure to add the new constant to the default export object as well.
 */
export const NEW_MODAL = "NEW_MODAL_CONSTANT";

export default {
    ...,
    NEW_MODAL
};
```

Register the modal component in `components/containers/ModalContainer/ModalContainer.js`:
```jsx
// Import the modal in the same place as the existing modal imports.
import NewModal from "path/to/the/NewModal/NewModal";

// Add the modal to the modalLibrary object indexed by the modal type constant
// added earlier.
const modalLibrary = {
    ...,
    [modalTypes.NEW_MODAL]: NewModal
}
```

### Usage

Now that integration is done, to open the new modal from any component, simply import `modalManager` and `modalTypes` if they haven't been already, and use according to the [ModalManager reference](/reference/managersReference.html#modalmanager).

```jsx
// AnyComponent.js
import { modalManager } from "managers";
import { modalTypes } from "constants/modals";

// In some click event or something:
modalManager.openModal(modalTypes.NEW_MODAL, {
    // ...props to pass to the modal
});
```






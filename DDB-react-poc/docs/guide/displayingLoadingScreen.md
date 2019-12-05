# Displaying Loading Screen

Displaying the global loading screen has been made easy with the [`LoadingScreenManager`](/reference/managersReference.html#loadingscreenmanager).

## Usage

```jsx
// AnyComponent.js
import { loadingScreenManager } from "managers";

// Display the loading screen
loadingScreenManager.showLoadingScreen();

// Set the status text
loadingScreenManager.setLoadingScreenStatus("Some status");

// Do some loading here...

// Change the status text
loadingScreenManager.setLoadingScreenStatus("Another status");

// Do some more loading here...

// Close the loading screen when loading is complete
loadingScreenManager.hideLoadingScreen();
```
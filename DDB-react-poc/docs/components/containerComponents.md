# Container Components


## ContextMenuContainer

The container object that works with [ContextMenuManager](/reference/managersReference.html#contextmenumanager) for the context menu system.

`ContextMenuContainer` is placed inside `App` and is used as a gateway into the DOM for rendering context menus as needed by `ContextMenuManager`.

`ContextMenuContainer` uses [EventManager](/reference/managersReference.html#eventmanager) for the following events:

**Event Types Definition:**
```jsx 
import { contextMenuEvents } from "managers/eventTypes";
```

**Listens to:**
* `contextMenuEvents.SHOW_CONTEXT_MENU`
* `contextMenuEvents.HIDE_CONTEXT_MENU`

**Emits:**
* `contextMenuEvents.DID_CONTAINER_MOUNT`
* `contextMenuEvents.WILL_CONTAINER_UNMOUNT`


## LoadingScreenContainer

The container object that works with [LoadingScreenManager](/reference/managersReference.html#loadingscreenmanager) for the loading screen system.

`LoadingScreenContainer` is placed inside `App` and is used as a gateway into the DOM for rendering the loading screen as needed by `LoadingScreenManager`.

`LoadingScreenContainer` uses [EventManager](/reference/managersReference.html#eventmanager) for the following events:

**Event Types Definition:**
```jsx
import { loadingScreenEvents } from "managers/eventTypes";
```

**Listens to:**
* `loadingScreenEvents.SHOW_LOADING`
* `loadingScreenEvents.HIDE_LOADING`
* `loadingScreenEvents.SET_STATUS`

**Emits:**
* `loadingScreenEvents.DID_CONTAINER_MOUNT`
* `loadingScreenEvents.WILL_CONTAINER_UNMOUNT`




## ModalContainer

A container object that works tightly with [ModalManager](/reference/managersReference.html#modalmanager) for modal management.

`ModalContainer` is placed inside `App` and is used as a gateway into the DOM for rendering modals as needed by `ModalManager`.

It is also responsible for the in/out transition animations of the modals.

`ModalContainer` uses [EventManager](/reference/managersReference.html#eventmanager) for the following events:

**Event Types Definition:**
```jsx
import { modalEvents } from "managers/eventTypes";
```

**Listens to:**
* `modalEvents.OPEN_MODAL`
* `modalEvents.CLOSE_MODAL`

**Emits:**
* `modalEvents.DID_CONTAINER_MOUNT`
* `modalEvents.WILL_CONTAINER_UNMOUNT`

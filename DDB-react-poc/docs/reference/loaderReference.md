# Loader Reference

## Loader

`Loader` is an encapsulation of [react-loadable](https://github.com/jamiebuilds/react-loadable) which allows for components to be loaded on the fly.

`Loader` handles displaying the load status of the component by using [LoaderDisplay](/components/loaderComponents.html#loaderdisplay) internally.

**Signature**
```jsx
loader(importFunction[, customDisplayComponent]);
```


**Usage**
```jsx
import loader from "loader";

const LoadedComponent = loader(() => import("./path/to/component"));

// Render loaded component
return (
    <LoadedComponent />
);
```
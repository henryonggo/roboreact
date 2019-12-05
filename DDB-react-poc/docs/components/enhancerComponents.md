# Enhancer Components

## OutsideClickMonitor

A component that can be used as a HOC that detects if you click outside of it, as a standalone component that detects if you click outside of a list of supplied nodes, or both in combination. An outside click is any click that is outside the component’s children **and** all of the supplied nodes.

### Usage:
```jsx
import OutsideClickMonitor from "components/enhancers/OutsideClickMonitor/OutsideClickMonitor";

<OutsideClickMonitor>
    {children}
</OutsideClickMonitor>

or

<OutsideClickMonitor/>
```

### Props:
| Prop           | Type              | Optional | Default    | Description                                                                                                            |
|----------------|-------------------|:--------:|------------|------------------------------------------------------------------------------------------------------------------------|
| onOutsideClick | Function(event)   |    ❌     |            | Callback function to call when the component detects an outside click.                                                 |
| nodes          | Array\<ReactRef\> |    ✔️     | `[]`       | A list of React refs to detect clicks outside of.                                                                      |
| clicks         | Number            |    ✔️     | `Infinity` | The number of outside clicks to monitor. If not given, the component will detect an infinite amount of outside clicks. |
| onMouseDown    | Boolean           |    ✔️     | `false`    | Whether to detect outside clicks on mouse down (true) or on mouse up (false).                                          |



## FormikEffect

A component used to detect changes in Formik state for the Formik `Form` it's used in. When state changes are detected it will call the provided callback function with the old and new state.

Based off the library [formik-effect](https://github.com/jaredpalmer/formik-effect), which is incompatible with React 16.

### Usage:
```jsx
import FormikEffect from "components/enhancers/FormikEffect/FormikEffect";

<Form>
    <FormikEffect/>
    ...
<Form>
```

### Props:

| Prop     | Type                           | Description                                                     |
|----------|--------------------------------|-----------------------------------------------------------------|
| onChange | Function(prevState, nextState) | A callback function to call on detecting a Formik state change. |

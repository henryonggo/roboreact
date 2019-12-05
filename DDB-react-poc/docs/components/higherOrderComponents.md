# Higher Order Components

## Functional

#### .linkCustomData(component, name) 

Links a component with the given name parameter, passing it under the `name` property. This is used to link imported components to a Formik namespace dynamically.

```js
import { linkCustomData } from "components/hoc";
```

| Parameter | Type             | Description                        |
|-----------|------------------|------------------------------------|
| component | Node or Function | A React component.                 |
| name      | String           | The name to link to the component. |


## Component
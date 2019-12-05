# Creating Forms

Forms in this project are handled by [Formik](https://jaredpalmer.com/formik/). Most forms are used in modals. All base modal types like [EventManager](/components/modalComponents.html#confirmmodal) and [AssertionBaseModal](/components/modalComponents.html#assertionbasemodal) use FormBaseModal internally to setup the formik instance of the modal.

```jsx
import React from "react";
import FormBaseModal from "components/modals/FormBaseModal/FormBaseModal";

const MyFormComponent = (props) => {
    return (
        <FormBaseModal>
            {/* Form stuff here */}
        </FormBaseModal>
    );
};

export default MyFormComponent;
```

## Creating Custom Form Components

Since all modal bases stem from a Formik instance the formik object can be accessed using Formik's connect HOC. This allows for direct form state manipulation using utility methods like *getIn* and *formik.setFieldValue*.

```jsx
import React from "react";
import { connect as connectFormik, getIn } from "formik";

// This component assumes that a formik instance is always available
// It is recommended to provide this clarification in the component documentation.
const MyCustomFormComponent = (props) => { 
    const { formik } = props;

    const myObjValue = getIn(formik.values, "path.to.the.object");
    const myNewObjValue = { ...myObjValue, someNewField: "hello there" };

    formik.setFeild("path.to.the.object", myNewObjValue);

    return (
        // Some rendering stuff here
    );
};

export default connectFormik(MyCustomFormComponent);
```

## Using Existing Form Components

For this project we have developed a few custom form components to make development of modals much easier. Full documentation of all the components can be found [here](components/formComponents.html). As a general rule of thumb most of the components will take a name prop that maps to the formik state location where the component should update. Although sometimes most complex components will have different ways of handling the data linking.

Ex:
```jsx
import React from "react";
import TextField from "components/forms/InputField/TextField/TextField";

const MyCustomModal = (props) => {
    return (
        <TextField 
            name="data.location.to.text.string"
        />
    );
};
```
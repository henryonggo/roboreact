# Theme Components

## ThemeProvider

Injects CSS variables related to the currently provided theme.

**Usage:**

```jsx
import ThemeProvider from "components/theme/ThemeProvider/ThemeProvider";

<ThemeProvider>
    {/* Component stuff here */}
</ThemeProvider>
```


**Props:**

| Prop            | Type   | Optional | Default | Description                                                               |
|-----------------|--------|:--------:|---------|---------------------------------------------------------------------------|
| currNamespaceID | String |    ✔️     | `null`  | The namespace to use. If not provided then the default namespace is used. |
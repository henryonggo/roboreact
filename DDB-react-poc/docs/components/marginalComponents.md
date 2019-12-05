# Marginal Components

## MarginalRenderer

Handles rendering the marginals (i.e the header/footer)

### Usage:
```jsx
import MarginalRenderer from "components/MarginalRenderer/MarginalRenderer";

<MarginalRenderer />
```

### Props:

| Prop      | Type           | Optional | Default     | Description                         |
|-----------|----------------|:--------:|-------------|-------------------------------------|
| className | String         |    ✔️     | `undefined` | The class name for the component.   |
| data      | `marginalData` |    ✔️     | `undefined` | The data for the marginal.          |
| maxHeight | CSS Length     |    ✔️     | `5rem`      | The maximum height of the marginal. |

### Object Definitions:
```javascript
marginalData = {
    presetID: String,
    presetType: String
}
```

## Header

Renders the header.

### Usage: 
```jsx
import Header from "components/Header/Header";

<Header />
```


## Footer

Renders the footer.

### Usage: 
```jsx
import Footer from "components/Footer/Footer";

<Footer />
```
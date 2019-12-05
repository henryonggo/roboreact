# Widget Components

## WidgetWrapper

Used as the base component for all widgets in the app. `WidgetWrapper` provides a styled wrapper where widget content can be injected into.

### Usage:
```jsx
import WidgetWrapper from "components/widgets/WidgetWrapper";

<WidgetWrapper>
    {content}
</WidgetWrapper>
```

### Props:
| Prop            | Type     | Optional | Default | Description                                    |
|-----------------|----------|:--------:|:-------:|------------------------------------------------|
| className       | String   |    ✔️     |  `""`   | Class names to apply to the widget.            |
| handleClassName | String   |    ✔️     |  `""`   | Class names to apply to the widget handle.     |
| name            | Object   |    ❌     |         | The name of the widget.                        |
| description     | Object   |    ✔️     |  `""`   | The description of the widget.                 |
| onRemoveWidget  | Function |    ❌     |         | Callback to call on click of the close button. |


## RenderWidgetCustomConfiguration

Renders the custom configuration of the current Formik context.

### Usage:
```jsx
import RenderWidgetCustomConfiguration from "components/widgets/RenderWidgetCustomConfiguration/RenderWidgetCustomConfiguration";

<RenderWidgetCustomConfiguration />
```

### Props:
| Prop       | Type   | Optional |   Default   | Description                              |
|------------|--------|:--------:|:-----------:|------------------------------------------|
| initCofnig | Object |    ✔️     | `undefined` | The initial configuration of the widget. |



## Widgets List


|      Widget Name      |   Main Component    |                     Config Components                      |     Lifecycle Component     | Description                                                                   |
|:---------------------:|:-------------------:|:----------------------------------------------------------:|:---------------------------:|-------------------------------------------------------------------------------|
| HTML Container Widget | HTMLContainerWidget |                 HTMLContainerWidgetConfig                  | HTMLContainerWigetLifecycle | Used for displaying local or internet-based resources via iframes in the app. |
|   Marginals Widget    |   MarginalsWidget   |                   MarginalsWidgetConfig                    |  MarginalsWidgetLifecycle   | A system widget for displaying the default header/footer.                     |
|   Rich Text Widget    |   RichTextWidget    |                    RichTextWidgetConfig                    |   RichTextWidgetLifecycle   | A flexible widget for displaying rich text.                                   |
|    Workflow Widget    |   WorkflowWidget    | WorkflowWidgetConfig, WorkflowButtonConfigurationBaseModal |   WorkflowWidgetLifecycle   | The new implementation for the worflow widget in the original DDB project.    |
# Extending Widgets

## Rich Text Widget
### Changing toolbar options
Customize the toolbar options that show up in the editor by including/excluding them from the `options` property of the custom toolbar config object in `RichTextWidgetConfig.js`. Toolbar option can also be configured individually when applicable. 
### Adding new toolbar options
Refer to the [React Draft Wysiwyg docs](https://jpuri.github.io/react-draft-wysiwyg/#/docs) under "Adding new option to the toolbar", and the [Draft.js docs](https://draftjs.org/docs/getting-started) on how to work with editor state.

## Workflow Widget

### Adding more workflow button types
1. Create your new workflow button type by composing it with `WorkflowButtonBase`. Use `WorkflowRectangleButton` as an example.
2. Register your new workflow button type under `workflowButtonTypes.js`.
3. Add a string constant for it in `constants/language` in the `WORKFLOW_BUTTON_CONFIG` object.
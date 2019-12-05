# Developer Notes

## Common TODO Statements
* `TODO: remove`
    * Placeholder code that should be removed in the future
* `TODO: theme`
    * CSS coloring that needs to be linked to the theme system (using the `ThemeLink` sass function)
* `TODO: remove the hack`
    * There is a bug with *react-sortable-hoc* where the transform property of any parent elements are not taken into effect when computing the drag ghost position. As a result, it is offset by an insane amount. To counter this a nasty hack has been made. To allow for easy removal, every code block that is part of the hack is marked with this todo statement.
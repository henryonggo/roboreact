# Styles Reference

## Constants

Some styling variable constants. 


## Custom

Contains files for custom library stylesheet overrides.


## Functions

Common SCSS functions.

**Theme-link:** used for linking color properties to the current theme.
* *Usage:* `some-attribute: theme-link(section, property, variation, opacity = 1);`



## Mixins

Global SCSS mixins.

### index.scss

* **HV_Align:** horizontal and vertical center align.
    * *Usage:* `@include HV_Align(position-type);`

* **H_Align:** horizontal only center align.
    * *Usage:* `@include H_Align(position-type);`

* **V_Align:** vertical only center alignment.
    * *Usage:* `@include V_Align(position-type);`

* **ThemeResizeHandle:** applies the css property theme to the resize handle
    * *Usage:* `@include ThemeResizeHandle(base = "BASE");`

* **ClearUIStyles:** clears all potential browser default styles.
    * *Usage:* `@include ClearUIStyles();`

* **ClearButtonStyles:** clears all browser default button styles.
    * *Usage:* `@include ClearButtonStyles();`

* **ClearInputStyles:** clears all browser default input styles.
    * *Usage:* `@include ClearInputStyles();`

* **StandardInputStyles:** applies the standard styles to an input element.
    * *Usage:* `@include StandardInputStyles(base = "input");`

* **StandardIconButtonStyles:** applies styles for icons that use the standard icon colorings.
    * *Usage:* `@include StandardIconButtonStyles(base = "BASE", icon-size: 0.8rem, disabled-class: "disabled");`

* **StandardCheckboxStylesOverride:** applies override styles for checkboxes.
    * *Usage:* `@include StandardCheckboxStylesOverride(override-selector = "label", size = 0.9rem, base = "BASE");`
    * *Note:* Make sure to place this in the checkbox selector and make sure an override element is adjacent to it and referenced

* **StandardModalScrollBar:** standard styles for the scrollbar inside modals.
    * *Usage:* `@include StandardModalScrollBar(base = "BASE");`

* **SetIconSize:** a utility mixin used for setting icon sizes.
    * *Usage:* `@include SetIconSize(length)`

### Element Query Manager

* **Respond Element**: sets up an element query breakpoint.
    * *Usage:* 
        ```scss
            @include respond-element(breakpoint) { 
                // Breakpoint styles 
            }
        ````
    * *Breakpoints:* xxs, xs, sm, md, lg, xl, xxl
    * *Note:* this feature uses a library to fake element queries and should be used with caution since it is not standard CSS spec yet.

### Media Query Manager

* **Respond**: setups up a media query breakpoint.
    * *Usage:*
        ```scss
            @include respond(breakpoint) { 
                // Breakpoint styles 
            }
        ````
    * *Breakpoints:* phone, tab-port, tab-land, big-desktop, normal
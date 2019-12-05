# Responsive Design

Responsive design is very important in building modern web apps today as it allows for apps to be build that are suitable for all screensizes.

Even though `DDB 2.0` will only be run on a desktop in the foreseeable future, it is built responsively. This allows for it to look great even when a user is using split screen to view this app.

Below are some general guidelines that should be used when designing new GUI components in `DDB 2.0`.




## Sizing

When sizing components, use `rem` as the sizing unit **NOT** `px`.

`rem` stands for **root em** which essentially means it is based off the `font-size` defined in the `:root` element (i.e. `<html>`).

- So `1rem` is equivalent to the font-size at root, `2rem` is twice the font-size and so on.

DDB 2.0's root font-size is a percentage of the default font-size provided by the browser (which in most cases is `16px`).

The benefits of using `rem` for sizing is that if the user configures the browser to use a larger font size, then DDB 2.0 will automatically respond to the change without any styles breaking.

::: tip 
The only time `px` really should be used is for styling effects like `box-shadow`, `border-radius`, etc where responsiveness is not required. 
:::




## Media Queries

If needed, [media queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) can be used allow our CSS to dynamically respond to changes in the viewport size.

For consistency's sake, we have included an SCSS mixin file called `mediaQueryManager`. This file defines common breakpoints that can be used, eliminating the need for writing media queries repeatedly, and making sure the breakpoint numbers are consistent throughout the app.

**Available Breakpoints and Ranges**

- `phone`: 0 - 600px
- `tab-port`: 600 - 900px
- `tab-land`: 900 - 1200px
- `normal`: 1200 - 1800px (default)
- `big-desktop`: 1800px +

**Note:** the normal breakpoint does not need to be specified since it is the default.

**Usage**

```scss
@import "styles/mixins/mediaQueryManager.scss";
// or
@import "styles/mixins/index.scss";

someSelector {
    @include respond(breakpoint) {
        // Breakpoint-specific styling here...
    }
}
```




## Element Queries

One thing you might have noticed is that media queries only respond to the width or height of the `viewport`. Now what happens if you would like something to respond to the width/height of an element? This is where the concept of `element queries` comes in. Unfortunately, at the time of writing element queries are not part of the official CSS spec, although there has been talk about adding [them](https://tomhodgins.github.io/element-queries-spec/element-queries.html).

For now the functionality of element queries can only be accomplished through JavaScript. DDB 2.0 uses [this](https://github.com/marcj/css-element-queries) library to accomplish them.

To make our lives easier, like mediaQueryManager, an `elementQueryManager` SCSS mixin has been made to standardize some common element breakpoints and to provide better readability when implementing element queries.

**Available Breakpoints and Ranges**

- `xxs`: 0 - 5rem
- `xs`: 5 - 10rem
- `sm`: 10 - 20rem
- `md`: 20 - 30rem
- `lg`: 30 - 40rem
- `xl`: 40 - 50rem
- `xxl`: 50rem +

**Usage**

```scss
@import "styles/mixins/elementQueryManager.scss";
// or
@import "styles/mixins/index.scss";

someSelector {
    @include respond-element(breakpoint) {
        // Breakpoint-specific styling here...
    }
}
```

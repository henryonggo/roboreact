# Utilities Reference
Utilities found in `src/utilities`.




## Array Utilities
#### .arrayFillRange(start, end) 
Returns an array filled with sequential numbers from `start` to `end`.
| Parameter | Type   | Description                         |
|-----------|--------|-------------------------------------|
| start     | Number | The number to start at. (inclusive) |
| end       | Number | The number to end at. (inclusive)   |
**Returns:** Array\<Number\>

#### .intersection(array1, array2)
Returns an array containing the set intersection of the two arrays.\
*i.e; An array containing every element that is in both arrays.*
| Parameter | Type         | Description       |
|-----------|--------------|-------------------|
| array1    | Array\<Any\> | The first array.  |
| array2    | Array\<Any\> | The second array. |
**Returns:** Array\<Any\>

#### .difference(array1, array2)
Returns an array containing the set difference between the first array and the second array.\
*i.e; An array containing every element that is in the first array but not the second.*
| Parameter | Type         | Description       |
|-----------|--------------|-------------------|
| array1    | Array\<Any\> | The first array.  |
| array2    | Array\<Any\> | The second array. |
**Returns:** Array\<Any\>

#### .symmetricDifference(array1, array2)
Returns an array containing the symmetric difference of the two arrays.\
*i.e; An array containing every element that is not in both arrays.*
| Parameter | Type         | Description       |
|-----------|--------------|-------------------|
| array1    | Array\<Any\> | The first array.  |
| array2    | Array\<Any\> | The second array. |
**Returns:** Array\<Any\>




## Number Utilities
#### .constrain(number, min, max) 
Constrains a number between two bounds, and returns it.
| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| number    | Number | The number to constrain. |
| min       | Number | The lower bound.         |
| max       | Number | The upper bound.         |
**Returns:** Number




## Object Utilities
#### .isEmptyObject(object) 
Returns if the given object is empty.
| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| object    | Object | The object to check. |
**Returns:** Boolean

#### .deepClone(object) 
Deep clones an object.
**Note:** Only works for objects that don't contain functions.
| Parameter | Type   | Description               |
|-----------|--------|---------------------------|
| object    | Object | The object to deep clone. |
**Returns:** Object

#### .isObject(item)
Object check.
| Parameter | Type | Description        |
|-----------|------|--------------------|
| item      | Any  | The item to check. |
**Returns:** Boolean

#### .deepMerge(target, source, immutable)
Deep merges the source object into the target object.
| Parameter | Type    | Optional | Default | Description                                                            |
|-----------|---------|:--------:|:-------:|------------------------------------------------------------------------|
| target    | Object  |    ❌     |         | The target object.                                                     |
| source    | Object  |    ❌     |         | The source object.                                                     |
| immutable | Boolean |    ✔️     | `false` | Indicates if a deep clone should be made of the target before merging. |

## String Utilities
#### .removePrefix(prefix, string) 
Removes the prefix, if it exists, from the input string and returns the new string
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| prefix    | String | The prefix to remove.                 |
| string    | String | The string to remove the prefix from. |
**Returns:** String

#### .equalsIgnoreCase(string1, string2)
Returns if the two input strings are equal ignoring case.
| Parameter | Type   | Description |
|-----------|--------|-------------|
| string1   | String |             |
| string2   | String |             |
**Returns:** Boolean

#### .isURLPath(path) 
Returns if the given path is a URL path.
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| path      | String | The path to test. |
**Returns:** Boolean

#### .isHTTPURLPath(path)
Returns if the given path is an HTTP URL path.
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| path      | String | The path to test. |
**Returns:** Boolean

#### .isCWPath(path)
Returns if the given path is a Working Papers `cw:` path.
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| path      | String | The path to test. |
**Returns:** Boolean

#### .isAbsPath(path)
Returns if the given path is an absolute file system path. This accounts for both Linux and Windows.
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| path      | String | The path to test. |
**Returns:** Boolean

#### .constructStringTemplate(baseString, ...args) 
Replaces all instances of `%s` in the base string with the provided arguments.
| Parameter  | Type   | Description                            |
|------------|--------|----------------------------------------|
| baseString | String | The string to fill in.                 |
| ...args    | String | The arguments to fill the string with. |


## CSS Utilities
#### .saveCSSProperty(name, value, elementSelector)
Saves a value to a CSS property.
| Parameter       | Type   | Optional | Default                    | Description                                                                                        |
|-----------------|--------|:--------:|----------------------------|----------------------------------------------------------------------------------------------------|
| name            | String |    ❌     |                            | The name of the CSS property to set.                                                               |
| value           | string |    ❌     |                            | The value to set the property to.                                                                  |
| elementSelector | String |    ✔️     | `document.documentElement` | The selector of the element to save the property to. Selects the document root element by default. |

#### .removeCSSProperty(name, value, elementSelector) 
Removes a CSS property.
| Parameter       | Type   | Optional | Default                    | Description                                                                                            |
|-----------------|--------|:--------:|----------------------------|--------------------------------------------------------------------------------------------------------|
| name            | String |    ❌     |                            | The name of the CSS property to remove.                                                                |
| elementSelector | String |    ✔️     | `document.documentElement` | The selector of the element to remove the property from. Selects the document root element by default. |

#### .getCSSProperty(name, elementSelector) 
Gets the value of a CSS property.
| Parameter       | Type   | Optional | Default                    | Description                                                |
|-----------------|--------|:--------:|----------------------------|------------------------------------------------------------|
| name            | String |    ❌     |                            | The name of the CSS property to get.                       |
| elementSelector | String |    ✔️     | `document.documentElement` | The selector for the element to get the property value of. |
**Returns:** String

#### .injectClassNames(...classNames) 
Joins all class names together into a valid class name string. This function filters out any invalid/falsy class names.
| Parameter  | Type            | Description              |
|------------|-----------------|--------------------------|
| classNames | Array\<String\> | The class names to join. |
**Returns:** String

### Color Utilities
The following utilities check if a given color is in the respective format.

**.isRGB(color)**\
**.isHex(color)**\
**.isHSL(color)**
| Parameter | Type   | Description         |
|-----------|--------|---------------------|
| color     | String | The color to check. |
**Returns:** Boolean

#### .rgbStringToObject(color)
Returns an object with the red, green, and blue values of the passed color.
| Parameter | Type   | Description                                     |
|-----------|--------|-------------------------------------------------|
| color     | String | The color. **Format:** `rgb(r,g,b)` or `r,g,b`. |
**Returns:** Object `{r: redValue, g: greenValue, b: blueValue}`




## Misc. Utilities
#### .runFunctions(...functions) 
Runs the input functions in order.
| Parameter | Type              | Description           |
|-----------|-------------------|-----------------------|
| functions | Array\<Function\> | The functions to run. |

#### .runFunctionsWithParams(parameters, ...functions) 
Runs the input functions with the given parameters passed to each function.
| Parameter  | Type              | Description                              |
|------------|-------------------|------------------------------------------|
| parameters | Array\<Any\>      | The parameters to pass to each function. |
| functions  | Array\<Function\> | The functions to run.                    |

#### .generateUniqueID(prefix)
Generates a unique ID.
| Parameter | Type   | Optional | Default | Description                 |
|-----------|--------|:--------:|:-------:|-----------------------------|
| prefix    | String |    ✔️     |  `""`   | A prefix for the unique ID. |
**Returns:** String

#### .debounce(func, wait, immediate) 
Returns a debounced function that invokes the supplied function `wait`ms after the last call to the debounced function.
| Parameter | Type     | Optional | Default | Description                                                                             |
|-----------|----------|:--------:|:-------:|-----------------------------------------------------------------------------------------|
| func      | Function |    ❌     |         | The function to debounce.                                                               |
| wait      | Number   |    ❌     |         | The wait time between debounced function calls in milliseconds(ms).                     |
| immediate | Boolean  |    ✔️     | `false` | Whether to call the function immediately on the first invocation before waiting or not. |
**Returns:** Function

#### .onClickPreventDefault(func) 
Returns a function that automatically calls `event.preventDefault` along with the supplied function.
| Parameter | Type     | Description          |
|-----------|----------|----------------------|
| func      | Function | The function to run. |








import mapDispatchToPropsHelper from "utilities/mapDispatchToPropsHelper";
import serverUtilities from "utilities/serverUtilities";
import customValidatorsImport from "utilities/customValidators";
import _ from "lodash";
import React from "react";

// Custom validators export
export const CustomValidators = customValidatorsImport;

/**
 * Saves a value to a css property.
 * 
 * @param {String} i_sPropertyName The name of the property.
 * @param {String} i_sPropertyValue The value to set the property to.
 * @param {String} [i_sElementSelector] (Optional) The selector for the element.
 */
export function saveCSSProperty(i_sPropertyName, i_sPropertyValue, i_sElementSelector) {
    // If no element selector is given then just select root
    let el = (i_sElementSelector) ? document.querySelector(i_sElementSelector) : document.documentElement;
    // Set the custom property
    el.style.setProperty(i_sPropertyName, i_sPropertyValue);
}

/**
 * Removes a css property.
 * 
 * @param {String} i_sPropertyName The name of the property.
 * @param {String} [i_sElementSelector] (Optional) The selector for the element.
 */
export function removeCSSProperty(i_sPropertyName, i_sElementSelector = null) {
    // If no element selector is given then just select root
    let el = (i_sElementSelector) ? document.querySelector(i_sElementSelector) : document.documentElement;
    // Remove the custom property
    el.style.removeProperty(i_sPropertyName);
}

/**
 * Gets the value of a css property.
 * 
 * @param {String} i_sPropertyName The name of the property.
 * @param {String} [i_sElementSelector] (Optional) The selector for the element.
 */
export function getCSSProperty(i_sPropertyName, i_sElementSelector) {
    // If no element selector is given then just select root
    let el = (i_sElementSelector) ? document.querySelector(i_sElementSelector) : document.documentElement;
    // Set the custom property
    return el.style.getPropertyValue(i_sPropertyName);
}


/**
 * Removes the prefix, if any, from the given input string and returns the new string.
 * 
 * @param {String} i_sPrefix The prefix.
 * @param {String} i_sString The input string.
 */
export function removePrefix(i_sPrefix, i_sString) {
    return i_sString.replace(new RegExp(`^${i_sPrefix}`, "g"), "");
}


/**
 * Constrains a number between two bounds.
 * 
 * @param {Number} i_nNum The number.
 * @param {Number} i_nMin The lower bound.
 * @param {Number} i_nMax The upper bound.
 */
export function constrain(i_nNum, i_nMin, i_nMax) {
    return (i_nNum > i_nMax) ? i_nMax : (i_nNum < i_nMin) ? i_nMin : i_nNum;
}

/**
 * Runs the given functions, if they are defined.
 * 
 * @param {...Function} i_aFnFuncs All the functions.
 */
export function runFunctions(...i_aFnFuncs) {
    i_aFnFuncs.forEach(fnFunc => {
        if (fnFunc) {
            fnFunc();
        }
    });
}

/**
 * Runs the given functions asyncly, waiting for each to finish before starting the next.
 * 
 * @param  {...Function} i_aFnFuncs The async functions.
 */
export async function runAsyncFunctions(...i_aFnFuncs) {
    for (let i = 0; i < i_aFnFuncs.length; i++) {
        const fnFunc = i_aFnFuncs[i];
        if (fnFunc) {
            await fnFunc();
        }
    }
}

/**
 * Runs the given functions, if they are defined with the given parameters inputted to each.
 * 
 * @param {Array} i_aParams The parameters.
 * @param  {...Function} i_aFnFuncs The functions.
 */
export function runFunctionsWithParams(i_aParams, ...i_aFnFuncs) {
    i_aFnFuncs.forEach(fnFunc => {
        if (fnFunc) {
            fnFunc(...i_aParams);
        }
    });
}

/**
 * Runs the given functions asyncly with the given parameters, waiting for each to finish before starting the next.
 * 
 * @param {Array} i_aParams The parameters.
 * @param  {...any} i_aFnFuncs The async functions.
 */
export async function runAsyncFunctionsWithParams(i_aParams, ...i_aFnFuncs) {
    for (let i = 0; i < i_aFnFuncs.length; i++) {
        const fnFunc = i_aFnFuncs[i];
        if (fnFunc) {
            await fnFunc(...i_aParams);
        }
    }
}

/**
 * Joins all the classnames together into a valid classnames string and filters out any undefined values.
 * This is used for the common classname injection passthrough pattern that is used in many components.
 * 
 * @param  {...any} i_aClassnames The classnames to join.
 */
export function injectClassNames(...i_aClassnames) {
    // Remove any undefined indicies
    const i_aSerialized = i_aClassnames.filter(i_sClassname => !!i_sClassname);

    return i_aSerialized.join(" ");
}

/**
 * Fills and returns an array with sequential numbers from the given start to end values.
 * 
 * @param {Number} i_nStart The start number (inclusive).
 * @param {Number} i_nEnd The end number (inclusive).
 */
export const arrayFillRange = (i_nStart, i_nEnd) => {
    return Array(i_nEnd - i_nStart + 1).fill().map((item, nIndex) => i_nStart + nIndex);
};

/**
 * Returns if the given object is empty.
 * 
 * @param {Object} i_oObject The object
 */
export const isEmptyObject = (i_oObject) => {
    return Object.entries(i_oObject).length === 0 && i_oObject.constructor === Object;
};

// -------------------------------
// --- Color value type checks ---
// -------------------------------

/**
 * Returns true if the color is of RGB form.
 * E.g. rgb(255, 109, 70)
 * 
 * @param {String} i_sColor The color.
 */
export const isRGB = (i_sColor) => {
    const rRGB = /^rgb\(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)$/;
    return rRGB.test(i_sColor);
};

/**
 * Returns true if the color is of hex form.
 * E.g. #001150
 * 
 * @param {String} i_sColor The color.
 */
export const isHex = (i_sColor) => {
    const rHex = /^#([0-9]|[A-F]){6}/;
    return rHex.test(i_sColor);
};

/**
 * Returns true if the color is of HSL form.
 * E.g. hsl(200, 100%, 20%)
 * 
 * @param {String} i_sColor The color.
 */
export const isHSL = (i_sColor) => {
    const rHSL = /^hsl\(([0-9]|[1-8][0-9]|9[0-9]|[12][0-9]{2}|3[0-5][0-9]|360),\s?(100|[1-9]?[0-9])%,\s?(100|[1-9]?[0-9])%\)$/;
    return rHSL.test(i_sColor);
};

// -----------------------------
// --- Color value utilities ---
// -----------------------------

/**
 * Returns an object with the r, g, and b values of the passed color.
 * @param {String} i_sColor The color. "rgb(r, g, b)"" or "r, g, b" 
 * @return {Object} {r: redValue, g: greenValue, b: blueValue}
 */
export const rgbStringToObject = (i_sColor) => {
    const sColor = i_sColor.indexOf("rgb") > -1 ?
        i_sColor.slice(4, i_sColor.length - 1) :
        i_sColor;
    const aColor = sColor.split(",").map(i_sValue => i_sValue.trim());

    return {
        r: aColor[0],
        g: aColor[1],
        b: aColor[2]
    };
};

// ---------------------
// --- Array methods ---
// ---------------------

/**
 * Returns an array containing the intersecting elements of the two arrays.
 * Ex. [5, 7, 10] and [3, 5, 10] returns [5, 10]
 * 
 * @param {Array} i_aArr1 The first array.
 * @param {Array} i_aArr2 The second array.
 */
export const intersection = (i_aArr1, i_aArr2) => {
    return i_aArr1.filter(x => i_aArr2.includes(x));
};

/**
 * Returns the difference elements of the first aray compared to the second array.
 * Ex. [5, 7, 10] and [3, 5, 10] returns [7]
 * 
 * @param {Array} i_aArr1 The first array.
 * @param {Array} i_aArr2 The second array.
 */
export const difference = (i_aArr1, i_aArr2) => {
    return i_aArr1.filter(x => !i_aArr2.includes(x));
};

/**
 * Returns the difference of elements from both arrays.
 * Ex. [5, 7, 10] and [3, 5, 10] returns [7, 3]
 * 
 * @param {Array} i_aArr1 The first array.
 * @param {Array} i_aArr2 The second array.
 */
export const symmetricDifference = (i_aArr1, i_aArr2) => {
    return i_aArr1.filter(x => !i_aArr2.includes(x)).concat(i_aArr2.filter(x => !i_aArr1.includes(x)));
};


/**
 * Generates a unique ID.
 * 
 * @param {String} [i_sPrefix] (Optional) A prefix attached to the unique ID.
 */
export const generateUniqueID = (i_sPrefix = null) => {
    const sPrefixCleaned = (i_sPrefix) ? `${i_sPrefix}-` : "";
    return `${sPrefixCleaned}${(Math.random().toString(36) + Date.now().toString(36)).substr(2, 10)}`;
};

// Taken from: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Trims the given character out of a string and returns it.
 * 
 * @param {*} i_sString The string.
 * @param {*} i_cTrimChar The character to trim.
 */
function trim(i_sString, i_cTrimChar) {
    if (i_cTrimChar === "]") i_cTrimChar = "\\]";
    if (i_cTrimChar === "\\") i_cTrimChar = "\\\\";

    return i_sString.replace(
        new RegExp("^[" + i_cTrimChar + "]+|[" + i_cTrimChar + "]+$", "g"), "");
}

/**
 * Returns if the two input strings are equal, ignoring case.
 * @param {String} i_sString1 
 * @param {String} i_sString2 
 */
export function equalsIgnoreCase(i_sString1, i_sString2) {
    return i_sString1.toLowerCase() === i_sString2.toLowerCase();
}

/**
 * Deep clones an object.
 * Note: the object must NOT contain functions
 * 
 * @param {Object} i_oObj The object
 */
export function deepClone(i_oObj) {
    return JSON.parse(JSON.stringify(i_oObj));
}

/**
 * Simple object check.
 * @param item The item.
 * @returns {boolean}
 */
export function isObject(i_item) {
    return (i_item && typeof item === "object" && !Array.isArray(i_item));
}

// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
// https://lodash.com/docs/4.17.11#mergeWith
/**
 * Deep merges the source object into the target object.
 * 
 * @param {Object} target The target object.
 * @param {Object} source The source.
 * @param {Boolean} immutable Indicates if a deep clone should be made of target.
 */
export function deepMerge(target, source, immutable = false) {
    if (immutable) {
        target = deepClone(target);
    }

    function arrayMergeCustomizer(objValue, srcValue) {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    }

    return _.mergeWith(target, source, arrayMergeCustomizer);
}

/**
 * Returns if the given path is a valid URL path.
 * 
 * @param {String} i_sPath The path.
 */
export function isURLPath(i_sPath) {
    const rURLRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    return rURLRegex.test(i_sPath);
}

/**
 * Returns if the given path is a valid HTTP URL path.
 * 
 * @param {String} i_sPath The path.
 */
export function isHTTPURLPath(i_sPath) {
    // Regex taken from https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    const rURLRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return rURLRegex.test(i_sPath);
}

/**
 * Returns if the given path is a valid CW path.
 * Ie: cw:something.html
 * 
 * @param {String} i_sPath The path.
 */
export function isCWPath(i_sPath) {
    const rCWRegex = /^(cw:([^\\/]*[\\/])*)([^\\/]+)$/gi;
    return rCWRegex.test(i_sPath);
}

/**
 * Returns if the given path is a valid absolute path. Note: it checks for both linux and windows styled paths.
 * 
 * @param {String} i_sPath The path.
 */
export function isAbsPath(i_sPath) {
    const rWindowsAbsPathRegex = /^[a-zA-Z]:\\(((?![<>:"/\\|?*]).)+((?<![ .])\\)?)*$/gi;
    const rLinuxAbsPathRegex = /^([a-zA-Z]:)?(\/[a-zA-Z0-9_-]+)+\/?$/gi;

    return rWindowsAbsPathRegex.test(i_sPath) || rLinuxAbsPathRegex.test(i_sPath);
}

/**
 * Returns if the given string is a valid CSS length.
 * Ex: '5rem', '20%', '15px, etc
 * 
 * @param {String} i_sLength The CSS length.
 */
export function isCSSLength(i_sLength) {
    const rCSSLengthRegex = /^(\d*?.?\d+)(rem|em|px|cm|mm|in|pt|pc|ch|vw|vh|vmin|vmax|%)$/g;
    return rCSSLengthRegex.test(i_sLength);
}

/**
 * Returns if the given string is a valid CSS rotation.
 * Ex: '45deg', '3.14rad', '400grad', '1turn', etc
 * 
 * @param {String} i_sRotation The CSS rotation.
 */
export function isCSSRotation(i_sRotation) {
    const rCSSRotationRegex = /^(\d*?.?\d+)(deg|rad|grad|turn)$/g;
    return rCSSRotationRegex.test(i_sRotation);
}

/**
 * Renders a single/array of functional components.
 * 
 * @param {Node or Array of Nodes} i_nodeList The functional components.
 * @param {Object} i_oProps The props injected into each node.
 */
export const renderNodeList = (i_nodeList, i_oProps = {}) => {
    if (!i_nodeList) {
        return i_nodeList;
    }

    // If the node list is just a single node clone and render it
    if (!Array.isArray(i_nodeList)) {
        if (typeof i_nodeList === "function") {
            return i_nodeList({ ...i_oProps });
        }

        return React.cloneElement(i_nodeList, { ...i_oProps });
    }

    // Introduce a key element to each node
    return i_nodeList.map((i_node, i_nIdx) => {
        if (!i_node) {
            return i_node;
        }

        if (typeof i_node === "function") {
            const Node = i_node;
            return <Node {...i_oProps} key={i_nIdx} />;
            // return i_node({ ...i_oProps, key: i_nIdx });
        }

        return React.cloneElement(i_node, { ...i_oProps, key: i_nIdx });
    });
};

/**
 * Returns a promise that resolves after a given amount of time, hence acting like a timeout function in async/await blocks.
 * 
 * @param {Number} ms The delay in milliseconds before the promise is resolved.
 */
export function timeout(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

/**
 * Returns a function that will prevent default on the event and then call the provided callback.
 * @param {Function} i_sFunc The callback function.
 * @return {Function} 
 */
export function onClickPreventDefault(i_sFunc) {
    return function (e) {
        e.preventDefault();
        i_sFunc(e);
    };
}

/**
 * Replaces all instances of '%s' with the provided arguments.
 * 
 * @param {String} i_sBaseString The base string.
 * @param  {...String} i_aArgs The provided arguments.
 */
export function constructStringTemplate(i_sBaseString, ...i_aArgs) {
    let sRet = i_sBaseString;

    i_aArgs.forEach(i_sCurrArg => {
        sRet = sRet.replace("%s", i_sCurrArg);
    });

    return sRet;
}

// Soruce: https://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin (second answer)
/**
 * Gets the absolute height of an element, including the margins.
 * 
 * @param {HTMLElement | String} el The element of query for the element.
 */
export function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el; 
  
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
                 parseFloat(styles['marginBottom']);
  
    return Math.ceil(el.offsetHeight + margin);
}


// Public API export
export default {
    ...serverUtilities,
    CustomValidators: customValidatorsImport,
    saveCSSProperty,
    removeCSSProperty,
    getCSSProperty,
    removePrefix,
    constrain,
    runFunctions,
    runAsyncFunctions,
    runFunctionsWithParams,
    runAsyncFunctionsWithParams,
    injectClassNames,
    arrayFillRange,
    isEmptyObject,
    isRGB,
    isHex,
    isHSL,
    rgbStringToObject,
    intersection,
    difference,
    symmetricDifference,
    generateUniqueID,
    mapDispatchToPropsHelper,
    debounce,
    trim,
    equalsIgnoreCase,
    deepClone,
    isObject,
    deepMerge,
    isURLPath,
    isHTTPURLPath,
    isCWPath,
    isAbsPath,
    isCSSLength,
    isCSSRotation,
    renderNodeList,
    timeout,
    onClickPreventDefault,
    constructStringTemplate,
    getAbsoluteHeight,
};
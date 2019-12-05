import Utilities from "utilities";

/**
 * Custom PropTypes validator for validating CSS length strings.
 * Ex: "50rem", "20%", "120px", etc
 * 
 * @param {Object} i_oProps All props.
 * @param {String} i_sPropName The name of the current prop.
 * @param {String} i_sComponentName The name of the component.
 * @param {String} i_sLocation The location.
 * @param {String} i_sPropFullName The full name of the prop.
 */
export function CSSLength(i_oProps, i_sPropName, i_sComponentName, i_location, i_sPropFullName) {
    const bIsValid = Utilities.isCSSLength(i_oProps[i_sPropName]);
    
    if (!bIsValid) {
        return new Error(`Invalid prop ${i_sPropFullName} supplied to ${i_sComponentName}. Validation failed`);
    }
}

export default {
    CSSLength
};
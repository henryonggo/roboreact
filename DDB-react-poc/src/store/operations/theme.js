import update from "immutability-helper";
import Color from "color";
import Utilities from "utilities";
import { dataManager } from "managers";

// Template definitions
import { subSections, propertyVariations, baseProperties, customBaseProperties, fallbackColor } from "themes/definitions";

// -----------------------
// --- Check functions ---
// -----------------------

const _themeMustExist = (i_oState, i_sThemeID) => {
    // Check if theme does not exist
    if (!i_oState.themes[i_sThemeID]) {
        throw new Error(`Error: theme '${i_sThemeID}' does not exist.`);
    }
};

const _themeMustNotExist = (i_oState, i_sThemeID) => {
    // Check if the theme already exists
    if (i_oState.themes[i_sThemeID]) {
        throw new Error(`Error: theme '${i_sThemeID}' already exists.`);
    }
};

const _namespaceMustExist = (i_oState, i_sNamespaceID) => {
    // Check if the namespace does not exist
    if (!i_oState.namespaces[i_sNamespaceID]) {
        throw new Error(`Error: namespace '${i_sNamespaceID}' does not exist.`);
    }
};

const _namespaceMustNotExist = (i_oState, i_sNamespaceID) => {
    // Check if namespace already exists
    if (i_oState.namespaces[i_sNamespaceID]) {
        throw new Error(`Error: namespace '${i_sNamespaceID}' already exists.`);
    }
};

const _validateTemplate = (i_oTemplate) => {
    // Checks
    if (!i_oTemplate.id) {
        throw new Error("Error: template must have an id");
    }
    if (!i_oTemplate["display-color"]) {
        throw new Error(`Error: template '${i_oTemplate.id}' must have a display color`);
    }
    if (!i_oTemplate.BASE) {
        throw new Error(`Error: template '${i_oTemplate.id}' must contain BASE`);
    }

    // Make sure all base properties are provided in the template
    const aBaseDiff = Utilities.difference(baseProperties, Object.keys(i_oTemplate.BASE));
    if (aBaseDiff.length > 0) {
        const sMissingBaseStr = aBaseDiff.join(" ");
        throw new Error(`Error: template '${i_oTemplate.id}' is missing base properties: ${sMissingBaseStr}`);
    }

    Object.entries(i_oTemplate.BASE).forEach(([i_sPropName, i_oVariations]) => {
        const aBasePropDiff = Utilities.difference(propertyVariations, Object.keys(i_oVariations));

        if (aBasePropDiff.length > 0) {
            const sMissingBasePropsStr = aBasePropDiff.join(" ");
            throw new Error(`Error: template '${i_oTemplate.id}' base property '${i_sPropName}' is missing variations: ${sMissingBasePropsStr}`);
        }
    });

    // Make sure any custom base properties found in the template are defined in the definition file. 
    Object.entries(i_oTemplate.subSections).forEach(([i_sSubsectionName, i_oBaseProps]) => {
        const aUndefinedCustomBaseProps = Object.keys(i_oBaseProps).filter(
            (i_oBaseProp) => {
                const bRegularBaseProp = baseProperties.indexOf(i_oBaseProp) > -1;
                const bCustomBasePropDefined = customBaseProperties[i_sSubsectionName] && customBaseProperties[i_sSubsectionName].indexOf(i_oBaseProp) > -1;
                return !bRegularBaseProp && !bCustomBasePropDefined;
            }
        );
        if (aUndefinedCustomBaseProps.length > 0) {
            const sUndefinedCustomBaseProps = aUndefinedCustomBaseProps.join(" ");
            throw new Error(`Error: template '${i_oTemplate.id}' subsection '${i_sSubsectionName}' contains one or more undefined custom base properties: ${sUndefinedCustomBaseProps}`);
        }
    });
};


// ------------------------
// --- Helper functions ---
// ------------------------

const _generateThemeFromTemplate = (i_oTemplate) => {
    // Make sure the template is valid
    _validateTemplate(i_oTemplate);

    // Compute the base 
    let oBaseProperties = _generatePropertyObject("BASE", i_oTemplate.BASE);

    // Populate base properties
    let oProperties = { ...oBaseProperties };

    const oSubsections = (i_oTemplate.subSections) ? i_oTemplate.subSections : {};
    const oSubsectionsEntries = Object.entries(oSubsections);
    // Populate subsection properties, if there are any
    oProperties = oSubsectionsEntries.reduce(
        (i_oPropsAccumulator, [i_sSectionName, i_sSectionProps]) => {
            return {
                ...i_oPropsAccumulator,
                ..._generatePropertyObject(i_sSectionName, i_oTemplate.BASE), // Apply the base properties for the section
                ..._generatePropertyObject(i_sSectionName, i_sSectionProps) // Apply the custom overrides/additions for the secion
            };
        }, oProperties
    );

    // Populate the remaining sub sections that the theme missed
    const aSubSectionsDiff = Utilities.difference(subSections, Object.keys(oSubsections));
    oProperties = aSubSectionsDiff.reduce(
        (i_oPropsAccumulator, i_sSubSection) => {
            return {
                ...i_oPropsAccumulator,
                ..._generatePropertyObject(i_sSubSection, i_oTemplate.BASE)
            };
        }, oProperties
    );

    // Populate the custom base properties for each section that the theme missed with the fallback color.
    Object.entries(customBaseProperties).forEach(
        ([i_sSubsection, i_aCustomBaseProperties]) => {
            // Get the missing custom base prop names if any.
            const oSubsectionEntry = oSubsectionsEntries.find((([i_sSubsectionEntryName]) => i_sSubsection === i_sSubsectionEntryName));
            const aSubsectionPropNames = oSubsectionEntry ? Object.keys(oSubsectionEntry[1]) : [];
            const aCustomBasePropsDiff = Utilities.difference(i_aCustomBaseProperties, aSubsectionPropNames);

            oProperties = aCustomBasePropsDiff.reduce(
                (i_oPropsAccumulator, i_sCustomBaseProp) => {
                    return {
                        ...i_oPropsAccumulator,
                        ..._generatePropertyObject(i_sSubsection, { [i_sCustomBaseProp]: { "primary": fallbackColor, "secondary": fallbackColor } })
                    };
                }, oProperties
            );
        }
    );

    // Construct theme object
    let oTheme = {
        id: i_oTemplate.id,
        "display-color": i_oTemplate["display-color"],
        properties: { ...oProperties }
    };

    return oTheme;
};

const _generatePropertyObject = (i_sSectionName, i_oTemplateSection) => {
    // Add in the new styles
    let oProperties = Object.entries(i_oTemplateSection).reduce(
        (i_oPropsAccumulator, [i_sPropName, i_oPropVariations]) => {
            // Expand out the property variations
            const oExpandedPropertyVariations = _expandPropVariations(i_sSectionName, i_sPropName, i_oPropVariations);

            return {
                ...i_oPropsAccumulator,
                ...oExpandedPropertyVariations
            };
        },
        {}
    );

    return oProperties;
};

const _expandPropVariations = (i_sSectionName, i_sPropName, i_oPropVariations) => {
    const oExpanded = Object.entries(i_oPropVariations).reduce(
        (i_oAccumulator, [i_sVariationName, i_sVariationValue]) => {
            // Generate the entry item
            const sPropertyKey = `--${i_sSectionName}___${i_sPropName}--${i_sVariationName}`;
            const sPropertyVal = _convertColorToStringForm(i_sVariationValue);

            return {
                ...i_oAccumulator,
                [sPropertyKey]: sPropertyVal
            };
        },
        {}
    );

    return oExpanded;
};

const _convertColorToStringForm = (i_sColor) => {
    const aColorRgb = Color(i_sColor).rgb().array();
    const sColorString = aColorRgb.join(", ");

    return sColorString;
};


// -----------------
// --- Operators ---
// -----------------

/**
 * Adds a new theme.
 * 
 * @param {Object} i_oState The current state.
 * @param {String} i_oTemplate The template for the theme.
 * 
 * @return Returns the updated state.
 */
export const addTheme = (i_oState, i_oTemplate, i_bSaveData = false) => {
    const sThemeID = i_oTemplate.id;
    _themeMustNotExist(i_oState, sThemeID);

    // Generate the theme object
    const oTheme = _generateThemeFromTemplate(i_oTemplate);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.addTheme(oTheme, true);
    }

    // Update the state to include the new theme
    return update(i_oState, {
        themes: { [sThemeID]: { $set: oTheme } }
    });
};

/**
 * Updates the properties of a given theme.
 * 
 * @param {Object} i_oState The current state.
 * @param {String} i_sThemeID The ID of the theme.
 * @param {String} i_oUpdatedTemplate The updated template of the theme.
 */
export const updateTheme = (i_oState, i_sThemeID, i_oUpdatedTemplate, i_bSaveData = false) => {
    _themeMustExist(i_oState, i_sThemeID);

    // Generate the updated theme object
    const oUpdatedThemeProperties = _generateThemeFromTemplate(i_oUpdatedTemplate);

    const oUpdatedTheme = update(i_oState.themes[i_sThemeID], {
        properties: { $merge: oUpdatedThemeProperties.properties }
    });

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveTheme(oUpdatedTheme, true);
    }

    // Update the state to include the updated theme
    return update(i_oState, {
        themes: { [i_sThemeID]: { $set: oUpdatedTheme } }
    });
};

/**
 * Removes a specified theme.
 * 
 * @param {Object} i_oState The current state.
 * @param {String} i_sThemeID The theme to be removed.
 */
export const removeTheme = (i_oState, i_sThemeID, i_bSaveData = false) => {
    _themeMustExist(i_oState, i_sThemeID);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.removeTheme(i_sThemeID, true);
    }

    // Remove the theme form the state
    return update(i_oState, {
        themes: { $unset: [i_sThemeID] }
    });
};

/**
 * Changes the given namespace to use the new theme.
 * 
 * @param {Object} i_oState The current state.
 * @param {String} i_sNamespaceID The namespace.
 * @param {String} i_sThemeID The theme that the namespace will use.
 */
export const changeTheme = (i_oState, i_sNamespaceID, i_sThemeID, i_bSaveData = false) => {
    _namespaceMustExist(i_oState, i_sNamespaceID);
    _themeMustExist(i_oState, i_sThemeID);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.saveNamespace({ id: i_sNamespaceID, theme: i_sThemeID }, true);
    }

    // Update the namespace to use the given theme
    return update(i_oState, {
        namespaces: { [i_sNamespaceID]: { $set: i_sThemeID } }
    });
};

/**
 * Adds a new namespace.
 * 
 * @param {Object} i_oState The current state.
 * @param {String} i_sNamespaceID The ID of the new namespace.
 * @param {string} i_sThemeID The initial theme applied to the namespace.
 */
export const addNamespace = (i_oState, i_sNamespaceID, i_sThemeID, i_bSaveData = false) => {
    _namespaceMustNotExist(i_oState, i_sNamespaceID);
    _themeMustExist(i_oState, i_sThemeID);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.addNamespace({ id: i_sNamespaceID, theme: i_sThemeID }, true);
    }

    // Update the state to include the new namespace
    return update(i_oState, {
        namespaces: { $merge: { [i_sNamespaceID]: i_sThemeID } }
    });
};

/**
 * Removes the given namespace.
 * 
 * @param {Object} i_oState The current state.
 * @param {String} i_sNamespaceID The ID of the namespace to be removed.
 */
export const removeNamespace = (i_oState, i_sNamespaceID, i_bSaveData = false) => {
    _namespaceMustExist(i_oState, i_sNamespaceID);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.removeNamespace(i_sNamespaceID, true);
    }

    // Remove the namespace from the state
    return update(i_oState, {
        namespaces: { $unset: [i_sNamespaceID] }
    });
};

/**
 * Sets the default namespace.
 * 
 * @param {String} i_sNamespaceID The namespace ID.
 */
export const setDefaultNamespace = (i_oState, i_sNamespaceID, i_bSaveData = false) => {
    _namespaceMustExist(i_oState, i_sNamespaceID);

    if (i_bSaveData) {
        // Update the server's data in the background
        dataManager.setDefaultNamespace(i_sNamespaceID, true);
    }

    // Set the default theme
    return update(i_oState, {
        defaultNamespace: { $set: i_sNamespaceID }
    });
};
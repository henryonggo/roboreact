const fs = require("fs");
const path = require("path");

const THEME_PRESETS_ROOT = "../themePresets";
const DEFAULT_NAMESPACE = "default";
const INITIAL_NAMESPACES = {
    "default": "Ocean"
};

const INIT_DATA_FILES_PROD_PATH = "../initDataFiles/themes.json";
const INIT_DATA_FILES_DEV_PATH = "../src/_tempData/initData/themes.js";

const oThemeData = {
    "themes": {},
    "defaultNamespace": DEFAULT_NAMESPACE,
    "namespaces": {
        ...INITIAL_NAMESPACES
    }
};

const sDirPath = path.join(__dirname, THEME_PRESETS_ROOT);
const aThemes = fs.readdirSync(sDirPath);

console.log("Found themes:", aThemes.join(", "));

// Load each theme and add it to the theme data accumulator
aThemes.forEach(sThemeFileName => {
    const sThemeFilePath = `${THEME_PRESETS_ROOT}/${sThemeFileName}`;

    console.log(`Parsing '${sThemeFileName}' located at '${sThemeFilePath}'`);

    const oThemeContent = require(sThemeFilePath);

    console.log(`Loaded and added '${oThemeContent.id}' theme`);

    // Add loaded theme to theme data
    oThemeData.themes[oThemeContent.id] = oThemeContent;
});

const sStringifiedThemeData = JSON.stringify(oThemeData);


// Write to prod location
console.log("Writing to production JSON file");
const sProdPath = path.join(__dirname, INIT_DATA_FILES_PROD_PATH);
fs.writeFileSync(sProdPath, sStringifiedThemeData);

// Write to dev location
console.log("Writing to dev JS file");
const sDevPath = path.join(__dirname, INIT_DATA_FILES_DEV_PATH);
fs.writeFileSync(sDevPath, `export default ${sStringifiedThemeData} `);

console.log("Complete!");

process.exit(0);
import {
  capitalize
} from "./chunk-AHJQGFMT.js";

// node_modules/@mui/material/utils/capitalize.js
var capitalize_default = capitalize;

// node_modules/@mui/material/utils/createSimplePaletteValueFilter.js
function hasCorrectMainProperty(obj) {
  return typeof obj.main === "string";
}
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") {
      return false;
    }
  }
  return true;
}
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
  return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}

export {
  capitalize_default,
  createSimplePaletteValueFilter
};
//# sourceMappingURL=chunk-SEJPFKP4.js.map

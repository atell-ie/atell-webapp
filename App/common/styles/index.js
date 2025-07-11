// Legacy Export Hub - Maintains backward compatibility for existing imports
// Material-UI v7 Compatible

// Main theme (now located in theme folder)
export { default as theme } from "../theme/theme";
export { default } from "../theme/theme";

// Design system (imported from theme folder)
export { default as designSystem } from "../theme/designSystem";

// Variables (scaling, dimensions, layout constants)
export { default as variables } from "./variables";

// Legacy color exports (if any existing code depends on them)
export { default as colors } from "./colors";

// Re-export with descriptive names for clarity
import theme from "../theme/theme";
import designSystem from "../theme/designSystem";
import variables from "./variables";
import colors from "./colors";

export {
    theme as medicalTheme,
    designSystem as medicalDesignSystem,
    variables as styleVariables,
    colors as styleColors
};

// Ensure all existing import patterns continue to work:
// import theme from '../common/styles';           ✅ Works
// import { theme } from '../common/styles';       ✅ Works
// import { designSystem } from '../common/styles'; ✅ Works
// import { variables } from '../common/styles';   ✅ Works
// import { colors } from '../common/styles';      ✅ Works
// import { medicalTheme } from '../common/styles'; ✅ Works

// Professional Medical Theme & Design System - Material-UI v7 Compatible
// Centralized exports for theme and design system components

// Main theme configuration (now in theme folder)
export { default as theme } from "./theme";

// Design system patterns and utilities
export { default as designSystem } from "./designSystem";

// Re-export both as named exports for convenience
import theme from "./theme";
import designSystem from "./designSystem";

export { theme as medicalTheme, designSystem as medicalDesignSystem };

// Default export for backward compatibility
export default {
    theme,
    designSystem
};

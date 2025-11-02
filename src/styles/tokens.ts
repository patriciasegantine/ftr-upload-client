/**
 * Design Tokens
 * 
 * Centralized design values for consistency across the application.
 * These are visual styles, not accessibility requirements.
 */

/**
 * Color tokens for text based on background
 * WCAG 1.4.3 - Ensures minimum 4.5:1 contrast ratio
 */
export const textColors = {
    onDark: "text-zinc-300", // Light text on dark background
    onLight: "text-zinc-700", // Dark text on light background
    muted: "text-zinc-400", // Muted text (use sparingly)
} as const;

/**
 * Transition tokens for smooth animations
 */
export const transitions = {
    default: ["transition-all", "duration-200"],
    fast: ["transition-all", "duration-100"],
    slow: ["transition-all", "duration-300"],
} as const;

/**
 * Interactive state colors
 * Note: Uses violet-500 to match focus ring color for consistency
 */
export const interactionColors = {
    primary: "violet-500",
    primaryLight: "violet-400",
    primaryBg: "bg-violet-500/10",
    primaryBorder: "border-violet-500",
    primaryText: "text-violet-500",
} as const;

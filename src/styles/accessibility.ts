/**
 * WCAG 2.1 AA Compliant Accessibility Classes
 *
 * These classes ensure consistent accessibility patterns across components.
 * All focus states follow WCAG 2.1 Level AA guidelines for focus indicators.
 */

/**
 * Focus ring for interactive elements (buttons, links, inputs)
 * WCAG 2.4.7 - Focus Visible (Level AA)
 *
 * Provides a 1px ring with offset for smaller elements
 */
export const focusRing = [
    "focus:outline-none",
    "focus:ring-1",
    "focus:ring-violet-500",
    "focus:ring-offset-1",
    "focus:ring-offset-zinc-950",
] as const;

/**
 * Focus ring for container elements (dropzones, cards)
 * WCAG 2.4.7 - Focus Visible (Level AA)
 *
 * Provides a 2px ring with larger offset for better visibility on containers
 */
export const focusRingLarge = [
    "focus-within:outline-none",
    "focus-within:ring-2",
    "focus-within:ring-violet-500",
    "focus-within:ring-offset-2",
    "focus-within:ring-offset-zinc-900",
] as const;

/**
 * Disabled state for interactive elements
 * WCAG 1.4.3 - Contrast (Level AA)
 */
export const disabledState = [
    "disabled:opacity-50",
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
] as const;

/**
 * Screen reader only content
 * WCAG 1.3.1 - Info and Relationships (Level A)
 */
export const srOnly = [
    "sr-only",
    "absolute",
    "w-px",
    "h-px",
    "p-0",
    "m-[-1px]",
    "overflow-hidden",
    "whitespace-nowrap",
    "border-0",
] as const;

/**
 * Keyboard navigation indicator
 * WCAG 2.4.7 - Focus Visible (Level AA)
 */
export const keyboardFocus = [
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-violet-500",
    "focus-visible:ring-offset-2",
] as const;
import {tv} from "tailwind-variants";
import {focusRingLarge} from "../../../styles/accessibility";
import {interactionColors, textColors, transitions} from "../../../styles/tokens";

export const dropzoneVariants = tv({
    slots: {
        container: "px-3 flex flex-col gap-3",
        dropzone: [
            // Layout & Display
            "flex flex-col items-center justify-center",
            "h-32 p-5",
            "rounded-lg",

            // Border & Background
            "border border-dashed border-zinc-700",
            "bg-black/20",

            // Gap & Spacing
            "gap-1",

            // Cursor
            "cursor-pointer",

            // Transitions
            ...transitions.default,

            // Hover States
            "hover:border-zinc-600",

            // Focus States (WCAG 2.1 AA)
            ...focusRingLarge,
        ],
        text: [
            "text-sm",
            textColors.onDark,
        ],
        textLink: [
            "text-sm",
            textColors.onDark,
            "underline",
            "font-medium",
        ],
        instructions: [
            "text-[0.750rem]",
            textColors.onDark,
        ],
    },
    variants: {
        isDragActive: {
            true: {
                dropzone: [
                    interactionColors.primaryBg,
                    interactionColors.primaryBorder,
                ],
                text: `text-sm font-medium ${interactionColors.primaryText}`,
            },
        },
    },
});

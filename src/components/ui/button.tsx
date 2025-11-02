import type {ComponentProps} from "react";
import {tv, type VariantProps} from "tailwind-variants";
import {disabledState, focusRing} from "../../styles/accessibility";
import {transitions} from "../../styles/tokens";

const buttonVariants = tv({
    base: [
        // Layout & Display
        "inline-flex items-center justify-center",
        "rounded-lg",

        // Colors & States
        "text-zinc-400",

        // Typography
        "font-medium text-sm",

        // Cursor
        "hover:cursor-pointer",
        "hover:text-zinc-100",
        "hover:bg-zinc-800",

        // Transitions
        ...transitions.default,

        // Focus States (WCAG 2.1 AA)
        ...focusRing,

        // Disabled States
        ...disabledState,
    ],

    variants: {
        size: {
            default: "px-3 py-2",
            icon: "p-2",
        },
    },

    defaultVariants: {
        size: "default",
    },
});

export type ButtonProps = ComponentProps<"button"> &
    VariantProps<typeof buttonVariants>;

export function Button({
                           size,
                           className,
                           type = "button",
                           ...props
                       }: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonVariants({size, className})}
            {...props}
        />
    );
}
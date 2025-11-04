import {tv} from "tailwind-variants";

export const uploadWidgetStyles = tv({
    slots: {
        container: [
            "bg-zinc-900",
            "overflow-hidden",
            "w-[360px]",
            "rounded-xl",
            "border",
            "border-transparent",
        ],
    },
    variants: {
        state: {
            open: {
                container: "shadow-shape",
            },
            closed: {
                container: "rounded-3xl shadow-shape",
            },
        },
        hasProgress: {
            true: {},
            false: {},
        },
    },
    compoundVariants: [
        {
            state: "closed",
            hasProgress: true,
            class: {
                container: "animate-[border_2s_linear_infinite] upload-widget-animated-border",
            },
        },
    ],
});

export const uploadWidgetAnimationVariants = {
    open: {
        width: 460,
        transition: {
            duration: 0.3,
            ease: "easeInOut" as const,
        },
    },
    closed: {
        width: "max-content" as const,
        transition: {
            duration: 0.3,
            ease: "easeInOut" as const,
        },
    },
};

export const getUploadWidgetHeight = (contentHeight: number, isOpen: boolean) => ({
    height: isOpen ? contentHeight + 60 : 60,
});
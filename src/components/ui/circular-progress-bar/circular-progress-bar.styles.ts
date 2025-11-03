import {tv} from "tailwind-variants";
import {interactionColors, textColors} from "../../../styles/tokens.ts";

export const circularProgressBarVariants = tv({
    slots: {
        container: "relative flex items-center justify-center",
        svg: "w-full h-full -rotate-90",
        circle: "stroke-current",
        backgroundCircle: "text-zinc-800",
        progressCircle: [
            interactionColors.primaryText,
            "transition-all duration-500 ease-in-out",
        ],
        labelContainer: "absolute inset-0 flex items-center justify-center",
        value: [
            "text-xs font-medium",
            textColors.onDark,
        ],
        unit: [
            "text-[0.625rem]",
            "text-zinc-400",
        ],
    },
});

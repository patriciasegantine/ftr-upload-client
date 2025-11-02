import {tv} from "tailwind-variants";
import {textColors} from "../../../styles/tokens";

export const uploadItemVariantsStyles = tv({
    slots: {
        container: [
            "p-3 rounded-lg",
            "flex flex-col gap-3",
            "shadow-shape-content",
            "bg-white/2",
            "relative overflow-hidden",
        ],
        header: "flex flex-col gap-1",
        titleWrapper: "text-xs font-medium flex items-center gap-1",
        icon: ["size-3", textColors.onDark],
        filename: textColors.onDark,
        metadata: "text-[0.750rem] text-zinc-400 flex gap-1.5 items-center",
        separator: "size-1 rounded-full bg-zinc-700",
        lineThrough: "line-through",
        highlight: "text-green-400 ml-1",
        progressRoot: "bg-zinc-800 rounded-full h-1 overflow-hidden",
        progressIndicator: "bg-violet-500 h-1 transition-all duration-300",
        actions: "absolute top-2.5 right-2.5 flex items-center gap-1",
    },
});
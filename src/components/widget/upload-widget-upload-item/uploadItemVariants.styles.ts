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
        name: [textColors.onDark, "truncate", "max-w-[25ch]"],
        metadata: "text-[0.750rem] text-zinc-400 flex gap-1.5 items-center",
        separator: "size-1 rounded-full bg-zinc-700",
        lineThrough: "line-through",
        highlight: "text-green-400 ml-1",
        progressRoot: "group bg-zinc-800 rounded-full h-1 overflow-hidden group",
        progressIndicator: [
            "bg-indigo-500 h-1",
            "group-data-[status=success]:bg-green-400",
            "group-data-[status=error]:bg-red-400",
            "group-data-[status=canceled]:bg-amber-400",
            "transition-all duration-500 ease-in-out",
        ],
        actions: "absolute top-2.5 right-2.5 flex items-center gap-1",
    },
});
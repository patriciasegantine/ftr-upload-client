import {Maximize2, Minimize2} from "lucide-react";
import {Button} from "../ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";

export function UploadWidgetHeader() {
    return (
        <header
            className="w-full p-4 bg-white/3 border-zinc-800 border-b flex items-center justify-between"
            role="banner"
        >
            <h1 className="text-sm font-medium text-white">
                Upload files
            </h1>

            <Collapsible.Trigger asChild>
                <Button
                    size="icon"
                    aria-label="Toggle upload widget"
                    className="group"
                >
                    <Minimize2
                        strokeWidth={1.5}
                        className="size-4 group-data-[state=open]:block group-data-[state=closed]:hidden"
                        aria-hidden="true"
                    />
                    <Maximize2
                        strokeWidth={1.5}
                        className="size-4 group-data-[state=open]:hidden group-data-[state=closed]:block"
                        aria-hidden="true"
                    />
                </Button>
            </Collapsible.Trigger>
        </header>
    );
}
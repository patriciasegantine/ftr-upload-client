import {Minimize2} from "lucide-react";
import {Button} from "../ui/button";

export function UploadWidgetHeader() {
    const handleMinimize = () => {
        console.log("Minimize widget");
    };

    return (
        <header
            className="w-full p-4 bg-white/3 border-zinc-800 border-b flex items-center justify-between"
            role="banner"
        >
            <h1 className="text-sm font-medium text-white">
                Upload files
            </h1>

            <Button
                size="icon"
                onClick={handleMinimize}
                aria-label="Minimize upload widget"
            >
                <Minimize2
                    strokeWidth={1.5}
                    className="size-4"
                    aria-hidden="true"
                />
            </Button>
        </header>
    );
}
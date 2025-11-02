import {Minimize2} from "lucide-react";

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
            <button
                onClick={handleMinimize}
                className="text-zinc-400 hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded p-1"
                aria-label="Minimize upload widget"
                type="button"
            >
                <Minimize2
                    strokeWidth={1.5}
                    className="size-4"
                    aria-hidden="true"
                />
            </button>
        </header>
    );
}
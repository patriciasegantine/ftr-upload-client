import {UploadCloud} from "lucide-react";

export const UploadWidgetTile = ()=> {
    return (
        <div className="flex items-center gap-1.5 text-sm font-medium">
            <UploadCloud
                className="size-4 text-zinc-300"
                strokeWidth={1.5}
                aria-hidden="true"
            />
            <h1 className="text-sm font-medium text-white">
                Upload files
            </h1>
        </div>
    );
}
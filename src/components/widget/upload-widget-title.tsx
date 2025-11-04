import {UploadCloud} from "lucide-react";

export const UploadWidgetTitle = () => {
    const isThereAnyPendedUpload = true;
    const uploadGlobalPercentage = 66;

    return (
        <div className="flex items-center gap-1.5 text-sm font-medium">
            <UploadCloud
                className="size-4 text-zinc-300"
                strokeWidth={1.5}
                aria-hidden="true"
            />
            {
                isThereAnyPendedUpload ? (
                    <h1 className="text-sm font-medium text-white flex items-center gap-1.5">
                        Uploading{" "}
                        <span className="text-xs text-zinc-400 tabular-nums">
                            {uploadGlobalPercentage}%
                        </span>
                    </h1>
                ) : (
                    <h1 className="text-sm font-medium text-white">
                        Upload files
                    </h1>
                )}

        </div>
    );
}
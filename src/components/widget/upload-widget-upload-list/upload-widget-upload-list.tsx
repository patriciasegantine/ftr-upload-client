import {UploadWidgetUploadItem} from "../upload-widget-upload-item/upload-widget-upload-item.tsx";
import type {UploadItems} from "../../../@types/updload-items.ts";

export function UploadWidgetUploadList() {
    const uploads: UploadItems[] = [
        {
            filename: "screenshot.png",
            originalSize: "3MB",
            compressedSize: "300KB",
            compressionRate: 94,
            progress: 45,
            status: "uploading"
        },
        {
            filename: "screenshot2.png",
            originalSize: "2MB",
            compressedSize: "200KB",
            compressionRate: 95,
            progress: 100,
            status: "completed"
        },
        {
            filename: "screenshot3.png",
            originalSize: "2MB",
            compressedSize: "200KB",
            compressionRate: 95,
            progress: 10,
            status: "error"
        },
    ]
    const isUploadListEmpty = false
    const totalUploads = !isUploadListEmpty ? uploads.length : 0;

    return (
        <div className="px-3 flex flex-col gap-3">
          <span className="text-xs font-medium">
            Uploaded files <span className="text-zinc-400">({totalUploads})</span>
          </span>

            {
                isUploadListEmpty ? (
                    <span className="text-xs text-zinc-400">No uploads added</span>
                ) : (
                    <div className="flex flex-col gap-2">
                        {
                            uploads.map(({
                                             filename,
                                             status,
                                             progress,
                                             compressedSize,
                                             originalSize,
                                             compressionRate
                                         }) => (
                                <UploadWidgetUploadItem
                                    key={filename}
                                    filename={filename}
                                    compressedSize={compressedSize}
                                    compressionRate={compressionRate}
                                    originalSize={originalSize}
                                    status={status}
                                    progress={progress}
                                />
                            ))
                        }
                    </div>
                )
            }


        </div>
    );
}
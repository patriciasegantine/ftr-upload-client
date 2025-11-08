import * as Progress from "@radix-ui/react-progress";
import {Download, ImageUp, Link2, RefreshCcw, X} from "lucide-react";
import {Button} from "../../ui/button.tsx";
import {uploadItemVariantsStyles} from "./uploadItemVariants.styles.ts";
import {motion} from "motion/react";
import {UploadStatus} from "../../../@types/upload-status.ts";
import {formatBytes} from "../../../utils/format-bytes.ts";
import {type Upload, useUploads} from "../../../store/uploads.ts";
import * as React from "react";

interface UploadWidgetUploadItemProps {
    upload: Upload;
    uploadId: string;
}

interface StatusInfo {
    label: string;
    display: React.ReactNode;
    busy?: boolean;
}

export function UploadWidgetUploadItem({upload, uploadId}: UploadWidgetUploadItemProps) {
    const styles = uploadItemVariantsStyles();
    const cancelUpload = useUploads((store) => store.cancelUpload);

    const {name, file, compressedSize, compressionRate, status} = upload;
    const uploadProgress = 10;

    const statusMap: Record<string, StatusInfo> = {
        [UploadStatus.PROGRESS]: {
            label: `${uploadProgress}% uploaded`,
            display: <span>{uploadProgress}%</span>,
            busy: true,
        },
        [UploadStatus.SUCCESS]: {
            label: "Upload completed successfully",
            display: <span className="text-green-400 ml-1">100%</span>,
        },
        [UploadStatus.ERROR]: {
            label: "Upload failed",
            display: <span role="alert" className="text-red-400 ml-1">Error</span>,
        },
        [UploadStatus.CANCELED]: {
            label: "Upload canceled",
            display: <span role="alert" className="text-amber-400 ml-1">Canceled</span>,
        },
        default: {
            label: "Ready",
            display: null,
        },
    };

    const currentStatus = status && status in statusMap
        ? statusMap[status]
        : statusMap.default;

    return (
        <motion.article
            className={styles.container()}
            role="region"
            aria-label={`Upload item: ${name}`}
            aria-busy={!!currentStatus.busy}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        >
            <div className={styles.header()}>
                <div className={styles.titleWrapper()}>
                    <ImageUp className={styles.icon()} strokeWidth={1.5} aria-hidden="true"/>
                    <span className={styles.name()} title={name}>{name}</span>
                </div>

                <div
                    className={styles.metadata()}
                    aria-label={`File size: original ${formatBytes(file.size)}, compressed to ${compressedSize}, ${compressionRate}% reduction, ${currentStatus.label}`}
                >
                    <span className={styles.lineThrough()} aria-label={`Original size: ${formatBytes(file.size)}`}>
                        {formatBytes(file.size)}
                    </span>

                    <div className={styles.separator()} aria-hidden="true"/>
                    <span aria-label={`Compressed size: ${compressedSize}`}>
                        {compressedSize}
                        <span className={styles.highlight()}
                              aria-label={`${compressionRate}% reduction`}> -{compressionRate}%
                        </span>
                    </span>

                    <div className={styles.separator()} aria-hidden="true"/>

                    <span aria-label={`Upload status: ${currentStatus.label}`}>
                        {currentStatus.display}
                    </span>
                </div>
            </div>

            <Progress.Root
                className="bg-zinc-800 rounded-full h-1 overflow-hidden group"
                value={uploadProgress}
                max={100}
                aria-label={`Upload progress for ${upload?.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={uploadProgress}
                aria-valuetext={`${uploadProgress}% uploaded`}
                data-status={upload.status}
            >
                <Progress.Indicator
                    className={styles.progressIndicator({
                        status: upload.status
                    })}
                    data-status={upload.status}
                    style={{
                        width: `${upload.status !== UploadStatus.PROGRESS ? `${uploadProgress}%` : 100}%`
                    }}
                />
            </Progress.Root>

            <div className={styles.actions()} role="group" aria-label="File actions">
                <Button
                    size="icon"
                    disabled={status !== UploadStatus.SUCCESS}
                    aria-label={`Download compressed ${name}`}
                    title="Download compressed image"
                >
                    <Download className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    disabled={status !== UploadStatus.SUCCESS}
                    aria-label={`Copy URL for ${name}`}
                    title="Copy remote URL"
                >
                    <Link2 className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    disabled={!([UploadStatus.ERROR, UploadStatus.CANCELED] as UploadStatus[]).includes(upload.status!)}
                    aria-label={`Retry upload for ${name}`}
                    title="Retry upload"
                >
                    <RefreshCcw className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    aria-label={`Cancel upload for ${name}`}
                    title="Cancel upload"
                    onClick={() => cancelUpload(uploadId)}
                    aria-disabled={status !== UploadStatus.PROGRESS}
                    disabled={status !== UploadStatus.PROGRESS}
                >
                    <X
                        className="size-4"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </Button>
            </div>
        </motion.article>
    );
}

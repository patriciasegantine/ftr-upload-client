import * as Progress from "@radix-ui/react-progress";
import {Download, ImageUp, Link2, RefreshCcw, X} from "lucide-react";
import {Button} from "../../ui/button.tsx";
import {uploadItemVariantsStyles} from "./uploadItemVariants.styles.ts";
import type {UploadStatus} from "../../../@types/updload-items.ts";

interface UploadWidgetUploadItemProps {
    filename?: string;
    originalSize?: string;
    compressedSize?: string;
    compressionRate?: number;
    progress?: number;
    status?: UploadStatus
}

export function UploadWidgetUploadItem({
                                           filename,
                                           originalSize,
                                           compressedSize,
                                           compressionRate,
                                           progress,
                                           status,
                                       }: UploadWidgetUploadItemProps) {
    const styles = uploadItemVariantsStyles();

    const isUploading = status === "uploading";
    const isCompleted = status === "completed";
    // const hasError = status === "error";

    return (
        <article
            className={styles.container()}
            role="region"
            aria-label={`Upload item: ${filename}`}
            aria-busy={isUploading}
        >
            <div className={styles.header()}>
                <div className={styles.titleWrapper()}>
                    <ImageUp
                        className={styles.icon()}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    <span className={styles.filename()}>
                        {filename}
                    </span>
                </div>

                <div
                    className={styles.metadata()}
                    aria-label={`File size: original ${originalSize}, compressed to ${compressedSize}, ${compressionRate}% reduction, ${progress}% uploaded`}
                >
                    <span className={styles.lineThrough()} aria-label={`Original size: ${originalSize}`}>
                        {originalSize}
                    </span>
                    <div className={styles.separator()} aria-hidden="true"/>
                    <span aria-label={`Compressed size: ${compressedSize}`}>
                        {compressedSize}
                        <span className={styles.highlight()} aria-label={`${compressionRate}% reduction`}>
                            -{compressionRate}%
                        </span>
                    </span>
                    <div className={styles.separator()} aria-hidden="true"/>
                    <span aria-label={`Upload progress: ${progress}%`}>
                        {progress}%
                    </span>
                </div>
            </div>

            <Progress.Root
                className={styles.progressRoot()}
                value={progress}
                max={100}
                aria-label={`Upload progress for ${filename}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-valuetext={`${progress}% uploaded`}
            >
                <Progress.Indicator
                    className={styles.progressIndicator()}
                    style={{width: `${progress}%`}}
                />
            </Progress.Root>

            <div
                className={styles.actions()}
                role="group"
                aria-label="File actions"
            >
                <Button
                    size="icon"
                    disabled={!isCompleted}
                    aria-label={`Download compressed ${filename}`}
                    title="Download compressed image"
                >
                    <Download className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    disabled={!isCompleted}
                    aria-label={`Copy URL for ${filename}`}
                    title="Copy remote URL"
                >
                    <Link2 className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    disabled={isUploading}
                    aria-label={`Retry upload for ${filename}`}
                    title="Retry upload"
                >
                    <RefreshCcw className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    aria-label={`Cancel upload for ${filename}`}
                    title="Cancel upload"
                >
                    <X className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>
            </div>
        </article>
    );
}
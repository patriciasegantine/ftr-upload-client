import * as Progress from "@radix-ui/react-progress";
import {Download, ImageUp, Link2, RefreshCcw, X} from "lucide-react";
import {Button} from "../../ui/button.tsx";
import {uploadItemVariantsStyles} from "./uploadItemVariants.styles.ts";
import {motion} from "motion/react";
import type {Upload} from "../../../@types/updload-items.ts";

interface UploadWidgetUploadItemProps {
    upload: Upload;
}

export function UploadWidgetUploadItem({upload}: UploadWidgetUploadItemProps) {
    const styles = uploadItemVariantsStyles();

    const isUploading = upload?.status === "uploading";
    const isCompleted = upload?.status === "completed";
    // const hasError = upload?.status === "error";

    return (
        <motion.article
            className={styles.container()}
            role="region"
            aria-label={`Upload item: ${upload?.name}`}
            aria-busy={isUploading}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        >
            <div className={styles.header()}>
                <div className={styles.titleWrapper()}>
                    <ImageUp
                        className={styles.icon()}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    <span className={styles.name()} title={upload?.name}>
                        {upload?.name}
                    </span>
                </div>

                <div
                    className={styles.metadata()}
                    aria-label={`File size: original ${upload?.file.size}, compressed to ${upload?.compressedSize}, ${upload?.compressionRate}% reduction, ${upload?.progress}% uploaded`}
                >
                    <span className={styles.lineThrough()} aria-label={`Original size: ${upload?.file.size}`}>
                        {upload?.file.size}
                    </span>
                    <div className={styles.separator()} aria-hidden="true"/>
                    <span aria-label={`Compressed size: ${upload?.compressedSize}`}>
                        {upload?.compressedSize}
                        <span className={styles.highlight()} aria-label={`${upload?.compressionRate}% reduction`}>
                            -{upload?.compressionRate}%
                        </span>
                    </span>
                    <div className={styles.separator()} aria-hidden="true"/>
                    <span aria-label={`Upload progress: ${upload?.progress}%`}>
                        {upload?.progress}%
                    </span>
                </div>
            </div>

            <Progress.Root
                className={styles.progressRoot()}
                value={upload?.progress}
                max={100}
                aria-label={`Upload progress for ${upload?.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={upload?.progress}
                aria-valuetext={`${upload?.progress}% uploaded`}
            >
                <Progress.Indicator
                    className={styles.progressIndicator()}
                    style={{width: `${upload?.progress}%`}}
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
                    aria-label={`Download compressed ${upload?.name}`}
                    title="Download compressed image"
                >
                    <Download className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    disabled={!isCompleted}
                    aria-label={`Copy URL for ${upload?.name}`}
                    title="Copy remote URL"
                >
                    <Link2 className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    disabled={isUploading}
                    aria-label={`Retry upload for ${upload?.name}`}
                    title="Retry upload"
                >
                    <RefreshCcw className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>

                <Button
                    size="icon"
                    aria-label={`Cancel upload for ${upload?.name}`}
                    title="Cancel upload"
                >
                    <X className="size-4" strokeWidth={1.5} aria-hidden="true"/>
                </Button>
            </div>
        </motion.article>
    );
}
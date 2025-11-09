import {useDropzone} from "react-dropzone";
import {dropzoneVariants} from "./upload-widget-dropzone.styles";
import {CircularProgressBar} from "../../ui/circular-progress-bar/circular-progress-bar.tsx";
import {motion} from "motion/react";
import {usePendingUploads, useUploads} from "../../../store/uploads.ts";

export function UploadWidgetDropzone() {
    const amountOfUploads = useUploads(store => store.uploads.size);
    const addUploads = useUploads(store => store.addUploads);

    const {isThereAnyPendingUploads, uploadGlobalPercentage} = usePendingUploads()
    const amountOfUploadsLabel = amountOfUploads === 1 ? 'file' : 'files';

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        multiple: true,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        onDrop(acceptedFiles) {
            addUploads(acceptedFiles);
        },
    });

    const styles = dropzoneVariants({isDragActive});

    return (
        <motion.div
            className={styles.container()}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        >
            <div
                className={styles.dropzone()}
                role="button"
                tabIndex={0}
                aria-label="Upload area for image files. Drop files here or click to select files from your device"
                aria-describedby="upload-instructions"
                aria-live="polite"
                aria-atomic="true"
                {...getRootProps()}
            >
                <input
                    type="file"
                    aria-label="File upload input for PNG and JPG images"
                    {...getInputProps()}
                />
                {
                    isThereAnyPendingUploads ? (
                        <div className="flex flex-col gap-2.5 items-center">
                            <CircularProgressBar
                                progress={uploadGlobalPercentage}
                                size={56}
                                strokeWidth={4}
                            />
                            <span className="text-xs">{`Uploading ${amountOfUploads} ${amountOfUploadsLabel}...`}</span>
                        </div>
                    ) : (
                        <>
                            <span className={styles.text()}>Drop your files here or</span>
                            <span className={styles.textLink()}>click to open picker</span>
                        </>
                    )}

                {isDragActive ? (
                    <span className={styles.text()}>
                        Release to upload files
                    </span>
                ) : (
                    <>

                    </>
                )}
            </div>

            <span
                id="upload-instructions"
                className={styles.instructions()}
                role="status"
            >
                Only PNG and JPG files are supported.
            </span>
        </motion.div>
    );
}
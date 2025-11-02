import {useDropzone} from "react-dropzone";
import {dropzoneVariants} from "./upload-widget-dropzone.styles";

export function UploadWidgetDropzone() {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        multiple: true,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        onDrop(acceptedFiles) {
            console.log(acceptedFiles);
        },
    });

    const styles = dropzoneVariants({isDragActive});

    return (
        <div className={styles.container()}>
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

                {isDragActive ? (
                    <span className={styles.text()}>
                        Release to upload files
                    </span>
                ) : (
                    <>
                        <span className={styles.text()}>Drop your files here or</span>
                        <span className={styles.textLink()}>click to open picker</span>
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
        </div>
    );
}
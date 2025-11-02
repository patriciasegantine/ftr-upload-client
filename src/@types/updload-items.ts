export type UploadStatus = "uploading" | "completed" | "error";

export interface UploadItems {
    filename?: string;
    originalSize?: string;
    compressedSize?: string;
    compressionRate?: number;
    progress?: number;
    status?: UploadStatus;
}
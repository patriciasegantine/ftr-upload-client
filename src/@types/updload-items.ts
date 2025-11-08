export type UploadStatus = "uploading" | "completed" | "error";

export interface Upload {
    name: string;
    file: File;
    compressedSize?: string;
    compressionRate?: number;
    progress?: number;
    status?: UploadStatus;
}
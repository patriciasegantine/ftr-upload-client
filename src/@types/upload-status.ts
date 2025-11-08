export const UploadStatus = {
    PROGRESS: "progress",
    SUCCESS: "success",
    ERROR: "error",
    CANCELED: "canceled"
} as const;

export type UploadStatus = typeof UploadStatus[keyof typeof UploadStatus];


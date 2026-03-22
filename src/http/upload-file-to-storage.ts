import axios, { AxiosError } from "axios";

interface UploadFileToStorageParams {
  file: File;
  onProgress: (sizeInBytes: number) => void;
}

interface UploadFileToStorageOpts {
  signal?: AbortSignal;
}

interface UploadResponse {
  url: string;
}

const UPLOAD_SERVER_URL = import.meta.env.VITE_BASE_URL;

function validateUploadServerUrl(): void {
  if (!UPLOAD_SERVER_URL) {
    throw new Error(
      "API Base URL is not configured. Please set VITE_BASE_URL in your environment variables."
    );
  }
}

export async function uploadFileToStorage(
  {file, onProgress}: UploadFileToStorageParams,
  opts?: UploadFileToStorageOpts
): Promise<UploadResponse> {
  validateUploadServerUrl();
  
  const data = new FormData();
  data.append("file", file);
  
  try {
    const response = await axios.post<UploadResponse>(
      `${UPLOAD_SERVER_URL}/uploads`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: opts?.signal,
        onUploadProgress(progressEvent) {
          onProgress(progressEvent.loaded);
        },
      }
    );
    
    return {url: response.data.url};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to upload file";
      throw new Error(`Upload failed: ${errorMessage}`);
    }
    throw error;
  }
}

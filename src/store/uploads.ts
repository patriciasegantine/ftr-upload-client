import {create} from "zustand";
import type {Upload} from "../@types/updload-items.ts";
import {enableMapSet} from "immer";
import {immer} from "zustand/middleware/immer";
import {uploadFileToStorage} from "../http/upload-file-to-storage.ts";

type UploadState = {
    uploads: Map<string, Upload>;
    addUploads: (files: File[]) => void;
};

enableMapSet();

export const useUploads = create<UploadState, [["zustand/immer", never]]>(
    immer((set, get) => {
        async function processUpload(uploadId: string) {
            const upload = get().uploads.get(uploadId);

            if (!upload) {
                return;
            }

            await uploadFileToStorage({file: upload.file});
        }

        function addUploads(files: File[]) {
            for (const file of files) {
                const uploadId = crypto.randomUUID();

                const upload: Upload = {
                    name: file.name,
                    status: "uploading",
                    progress: 0,
                    compressionRate: 0,
                    compressedSize: "0",
                    file,
                };

                set((state) => {
                    state.uploads.set(uploadId, upload);
                });

                processUpload(uploadId);
            }
        }

        return {
            uploads: new Map(),
            addUploads,
        };
    })
);


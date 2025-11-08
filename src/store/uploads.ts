import {create} from "zustand";
import type {Upload} from "../@types/updload-items.ts";
import {enableMapSet} from "immer";
import {immer} from "zustand/middleware/immer";

type UploadState = {
    uploads: Map<string, Upload>;
    addUploads: (files: File[]) => void;
};

enableMapSet();

export const useUploads = create<UploadState, [["zustand/immer", never]]>(
    immer((set) => {
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
            }
        }

        return {
            uploads: new Map(),
            addUploads,
        };
    })
);
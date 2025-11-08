import {create} from "zustand";
import type {Upload} from "../@types/updload-items.ts";

type UploadState = {
    uploads: Map<string, Upload>;
    addUploads: (files: File[]) => void;
};

export const useUploads = create<UploadState>((set, get) => {
    function addUploads(files: File[]) {

        console.log(files)

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
                return {
                    uploads: state.uploads.set(uploadId, upload),
                };
            });
        }
    }

    return {
        uploads: new Map(),
        addUploads,
    };
});
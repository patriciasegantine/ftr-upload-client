// <reference types="vitest" />

import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {UploadWidgetDropzone} from "./upload-widget-dropzone";
import type {DropzoneInputProps, DropzoneRootProps, DropzoneState} from "react-dropzone";
import {useDropzone} from "react-dropzone";
import type {Upload} from "../../../store/uploads.ts";

vi.mock("react-dropzone", () => ({
    useDropzone: vi.fn(),
}));

vi.mock("../../../store/uploads.ts", () => ({
    useUploads: vi.fn(),
}));

type MockUploadsStore = {
    addUploads: ReturnType<typeof vi.fn>;
    uploads?: Map<string, Upload>;
    cancelUpload?: ReturnType<typeof vi.fn>;
};

const createMockDropzoneState = (overrides?: Partial<DropzoneState>): DropzoneState =>
    ({
        getRootProps: vi.fn(<T extends DropzoneRootProps>(props?: T) => (props ?? ({} as T))),
        getInputProps: vi.fn(<T extends DropzoneInputProps>(props?: T) => (props ?? ({} as T))),
        isDragActive: false,
        ...overrides,
    } as DropzoneState);

describe("UploadWidgetDropzone", () => {
    beforeEach(async () => {
        vi.clearAllMocks();

        const {useUploads} = await import("../../../store/uploads.ts");
        vi.mocked(useUploads).mockReturnValue({
            addUploads: vi.fn(),
        } as MockUploadsStore);
    });

    it("should render the dropzone", () => {
        const mockState = createMockDropzoneState();

        vi.mocked(useDropzone).mockReturnValue(mockState);

        render(<UploadWidgetDropzone/>);

        const button = screen.getByRole("button", {name: /upload area for image files/i});

        expect(button).toBeInTheDocument();
    });

    it("should show drag active state", () => {
        const mockState = createMockDropzoneState({isDragActive: true});

        vi.mocked(useDropzone).mockReturnValue(mockState);

        render(<UploadWidgetDropzone/>);

        const dragText = screen.getByText(/release to upload files/i);

        expect(dragText).toBeInTheDocument();
    });

    it("should show default state with instructions when not uploading", () => {
        const mockState = createMockDropzoneState();

        vi.mocked(useDropzone).mockReturnValue(mockState);

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/drop your files here or/i)).toBeInTheDocument();
        expect(screen.getByText(/click to open picker/i)).toBeInTheDocument();
        expect(screen.getByText(/only png and jpg files are supported/i)).toBeInTheDocument();
    });
});
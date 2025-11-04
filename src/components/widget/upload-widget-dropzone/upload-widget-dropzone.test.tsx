// <reference types="vitest" />

import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {UploadWidgetDropzone} from "./upload-widget-dropzone";
import type {DropzoneInputProps, DropzoneRootProps, DropzoneState} from "react-dropzone";
import {useDropzone} from "react-dropzone";

vi.mock("react-dropzone", () => ({
    useDropzone: vi.fn(),
}));

const createMockDropzoneState = (overrides?: Partial<DropzoneState>): DropzoneState =>
    ({
        getRootProps: vi.fn(<T extends DropzoneRootProps>(props?: T) => (props ?? ({} as T))),
        getInputProps: vi.fn(<T extends DropzoneInputProps>(props?: T) => (props ?? ({} as T))),
        isDragActive: false,
        ...overrides,
    } as DropzoneState);

describe("UploadWidgetDropzone", () => {
    beforeEach(() => {
        vi.clearAllMocks();
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

    it("should show uploading state with progress", () => {
        const mockState = createMockDropzoneState();

        vi.mocked(useDropzone).mockReturnValue(mockState);

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/uploading \d+ files?\.\.\./i)).toBeInTheDocument();
        expect(screen.getByText(/only png and jpg files are supported/i)).toBeInTheDocument();
    });
});
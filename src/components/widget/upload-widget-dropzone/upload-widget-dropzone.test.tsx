import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {UploadWidgetDropzone} from './upload-widget-dropzone';
import type {DropzoneOptions, DropzoneState} from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
import {usePendingUploads, useUploads} from '../../../store/uploads';

vi.mock('../../../store/uploads.ts', () => ({
    useUploads: vi.fn(() => ({
        uploads: new Map(),
        addUploads: vi.fn(),
    })),
    usePendingUploads: vi.fn(() => ({
        isThereAnyPendingUploads: false,
        uploadGlobalPercentage: 0,
    })),
}));

vi.mock('react-dropzone', () => ({
    useDropzone: vi.fn(() => ({
        getRootProps: vi.fn(() => ({})),
        getInputProps: vi.fn(() => ({})),
        isDragActive: false,
    })),
}));

const createMockDropzoneState = (overrides?: Partial<DropzoneState>): DropzoneState => ({
    getRootProps: vi.fn(() => ({})),
    getInputProps: vi.fn(() => ({})),
    isDragActive: false,
    open: vi.fn(),
    acceptedFiles: [],
    fileRejections: [],
    draggedFiles: [],
    ...overrides,
} as DropzoneState);


describe('UploadWidgetDropzone', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the dropzone', () => {
        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/click to open picker/i)).toBeInTheDocument();
    });

    it('should show drag active state', () => {
        vi.mocked(useDropzone).mockReturnValue(
            createMockDropzoneState({isDragActive: true})
        );

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/release to upload files/i)).toBeInTheDocument();
    });

    it('should show default state with instructions when not uploading', () => {
        vi.mocked(useDropzone).mockReturnValue(
            createMockDropzoneState()
        );

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/only png and jpg files are supported/i)).toBeInTheDocument();
    });

    it('should show uploading state with progress when there are pending uploads', () => {
        vi.mocked(useUploads).mockImplementation((selector: any) => {
            const mockStore = {
                uploads: new Map([
                    ['1', {name: 'file1.png'}],
                    ['2', {name: 'file2.png'}],
                ]),
                addUploads: vi.fn(),
            };
            return selector(mockStore);
        });

        vi.mocked(usePendingUploads).mockReturnValue({
            isThereAnyPendingUploads: true,
            uploadGlobalPercentage: 45,
        });

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/uploading 2 files\.\.\./i)).toBeInTheDocument();
    });

    it('should display correct file label for single file upload', () => {
        vi.mocked(useUploads).mockImplementation((selector: any) => {
            const mockStore = {
                uploads: new Map([
                    ['1', {name: 'file1.png'}],
                ]),
                addUploads: vi.fn(),
            };
            return selector(mockStore);
        });

        vi.mocked(usePendingUploads).mockReturnValue({
            isThereAnyPendingUploads: true,
            uploadGlobalPercentage: 30,
        });

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/uploading 1 file\.\.\./i)).toBeInTheDocument();
    });

    it('should call addUploads when files are dropped', () => {
        const mockAddUploads = vi.fn();
        const mockFiles = [
            new File(['content'], 'image1.png', {type: 'image/png'}),
            new File(['content'], 'image2.jpg', {type: 'image/jpeg'}),
        ];

        vi.mocked(useUploads).mockImplementation((selector: any) => {
            const mockStore = {
                uploads: new Map(),
                addUploads: mockAddUploads,
            };
            return selector(mockStore);
        });

        let capturedOnDrop: ((files: File[]) => void) | undefined;

        vi.mocked(useDropzone).mockImplementation((config?: DropzoneOptions) => {
            if (config?.onDrop) {
                capturedOnDrop = (files: File[]) => {
                    config.onDrop!(files, [], []);
                };
            }
            return createMockDropzoneState();
        });

        render(<UploadWidgetDropzone/>);

        if (capturedOnDrop) {
            capturedOnDrop(mockFiles);
        }

        expect(mockAddUploads).toHaveBeenCalledWith(mockFiles);
        expect(mockAddUploads).toHaveBeenCalledTimes(1);
    });

    it('should configure dropzone to accept only PNG and JPG files', () => {
        let capturedConfig: Parameters<typeof useDropzone>[0];

        vi.mocked(useDropzone).mockImplementation((config) => {
            capturedConfig = config;
            return {
                getRootProps: vi.fn(() => ({})),
                getInputProps: vi.fn(() => ({})),
                isDragActive: false,
            } as any;
        });

        render(<UploadWidgetDropzone/>);

        expect(capturedConfig?.accept).toEqual({
            "image/jpeg": [],
            "image/png": [],
        });
        expect(capturedConfig?.multiple).toBe(true);
    });

    it('should have proper ARIA attributes for accessibility', () => {
        render(<UploadWidgetDropzone/>);

        const dropzone = screen.getByRole("button");

        expect(dropzone).toHaveAttribute("aria-label", "Upload area for image files. Drop files here or click to select files from your device");
        expect(dropzone).toHaveAttribute("aria-describedby", "upload-instructions");
        expect(dropzone).toHaveAttribute("aria-live", "polite");
        expect(dropzone).toHaveAttribute("aria-atomic", "true");
        expect(dropzone).toHaveAttribute("tabIndex", "0");

        const instructions = screen.getByText(/only png and jpg files are supported/i);
        expect(instructions).toHaveAttribute("role", "status");
        expect(instructions).toHaveAttribute("id", "upload-instructions");
    });
});
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {UploadWidgetDropzone} from './upload-widget-dropzone';
import type {
    DropzoneInputProps,
    DropzoneOptions,
    DropzoneRootProps,
    DropzoneState,
    FileRejection
} from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
import {type Upload, type UploadState, usePendingUploads, useUploads} from '../../../store/uploads';
import * as React from 'react';
import {createRef} from 'react';

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

export const createMockDropzoneState = (overrides?: Partial<DropzoneState>): DropzoneState => ({
    isFocused: false,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    isFileDialogActive: false,
    acceptedFiles: [],
    fileRejections: [] as FileRejection[],
    rootRef: createRef<HTMLElement>() as React.RefObject<HTMLElement>,
    inputRef: createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>, // ✅ cast aqui
    getRootProps: vi.fn(<T extends DropzoneRootProps>(props?: T) => ({
        ...props,
    })) as unknown as <T extends DropzoneRootProps>(props?: T) => T,
    getInputProps: vi.fn(<T extends DropzoneInputProps>(props?: T) => ({
        ...props,
    })) as unknown as <T extends DropzoneInputProps>(props?: T) => T,
    open: vi.fn(),
    ...overrides,
});

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
        vi.mocked(useDropzone).mockReturnValue(createMockDropzoneState());

        render(<UploadWidgetDropzone/>);

        expect(screen.getByText(/only png and jpg files are supported/i)).toBeInTheDocument();
    });

    it('should show uploading state with progress when there are pending uploads', () => {
        vi.mocked(useUploads).mockImplementation((selector: (store: UploadState) => unknown) => {
            const mockStore: UploadState = {
                uploads: new Map<string, Upload>([
                    ['1', {
                        name: 'file1.png',
                        file: new File(['content'], 'file1.png', {type: 'image/png'}),
                        abortController: new AbortController(),
                        status: 'progress',
                        originalSizeInBytes: 1234,
                        uploadSizeInBytes: 1234,
                    }],
                    ['2', {
                        name: 'file2.png',
                        file: new File(['content'], 'file2.png', {type: 'image/png'}),
                        abortController: new AbortController(),
                        status: 'progress',
                        originalSizeInBytes: 5678,
                        uploadSizeInBytes: 5678,
                    }],
                ]),
                addUploads: vi.fn(),
                cancelUpload: vi.fn(),
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
        vi.mocked(useUploads).mockImplementation((selector: (state: UploadState) => unknown) => {
            const mockStore: UploadState = {
                uploads: new Map<string, Upload>([
                    ['1', {
                        name: 'file1.png',
                        file: new File(['content'], 'file1.png', {type: 'image/png'}),
                        abortController: new AbortController(),
                        status: 'progress',
                        originalSizeInBytes: 1234,
                        uploadSizeInBytes: 1234,
                    }],
                ]),
                addUploads: vi.fn(),
                cancelUpload: vi.fn(),
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

        vi.mocked(useUploads).mockImplementation((selector: (store: UploadState) => unknown) => {
            const mockStore: UploadState = {
                uploads: new Map<string, Upload>(),
                addUploads: mockAddUploads,
                cancelUpload: vi.fn(),
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
        let capturedConfig: DropzoneOptions | undefined;

        vi.mocked(useDropzone).mockImplementation((config) => {
            capturedConfig = config;
            return createMockDropzoneState();
        });

        render(<UploadWidgetDropzone/>);

        expect(capturedConfig?.accept).toEqual({
            'image/jpeg': [],
            'image/png': [],
        });
        expect(capturedConfig?.multiple).toBe(true);
    });

    it('should have proper ARIA attributes for accessibility', () => {
        render(<UploadWidgetDropzone/>);

        const dropzone = screen.getByRole('button');

        expect(dropzone).toHaveAttribute(
            'aria-label',
            'Upload area for image files. Drop files here or click to select files from your device'
        );
        expect(dropzone).toHaveAttribute('aria-describedby', 'upload-instructions');
        expect(dropzone).toHaveAttribute('aria-live', 'polite');
        expect(dropzone).toHaveAttribute('aria-atomic', 'true');
        expect(dropzone).toHaveAttribute('tabIndex', '0');

        const instructions = screen.getByText(/only png and jpg files are supported/i);
        expect(instructions).toHaveAttribute('role', 'status');
        expect(instructions).toHaveAttribute('id', 'upload-instructions');
    });
});
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {UploadWidgetDropzone} from './upload-widget-dropzone';
import type {DropzoneState} from 'react-dropzone';
import {useDropzone} from 'react-dropzone';

vi.mock('../../../store/uploads.ts', () => ({
    useUploads: vi.fn(() => ({
        uploads: new Map(),
        addUploads: vi.fn(),
    })),
    usePendingUploads: vi.fn(() => ({
        isThereAnyPendingUploads: false,
        globalPercentage: 0,
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
});
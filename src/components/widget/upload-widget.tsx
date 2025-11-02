import {UploadWidgetDropzone} from "./upload-widget-dropzone.tsx";
import {UploadWidgetHeader} from "./upload-widget-header.tsx";
import {UploadWidgetUploadList} from "./upload-widget-upload-list.tsx";
import {Divider} from "../ui/divider.tsx";

export function UploadWidget() {
    return (
        <div className="bg-zinc-900 w-full overflow-hidden max-w-[360px] rounded-xl shadow-shape">
            <UploadWidgetHeader />

            <div className="flex flex-col gap-4 py-3">
                <UploadWidgetDropzone />
                <Divider/>
                <UploadWidgetUploadList />
            </div>
        </div>
    );
}
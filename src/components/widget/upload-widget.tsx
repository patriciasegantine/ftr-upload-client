import {UploadWidgetHeader} from "./upload-widget-header.tsx";

export function UploadWidget() {
    return (
        <div className="bg-zinc-900 w-full overflow-hidden max-w-[360px] rounded-xl shadow-shape">
            <UploadWidgetHeader />
        </div>
    );
}
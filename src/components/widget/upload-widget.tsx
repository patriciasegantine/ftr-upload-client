import {UploadWidgetHeader} from "./upload-widget-header/upload-widget-header.tsx";
import {UploadWidgetUploadList} from "./upload-widget-upload-list/upload-widget-upload-list.tsx";
import {Divider} from "../ui/divider.tsx";
import * as Collapsible from "@radix-ui/react-collapsible";
import {useState} from "react";
import {UploadWidgetDropzone} from "./upload-widget-dropzone/upload-widget-dropzone.tsx";

export function UploadWidget() {
    const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(true);

    return (
        <Collapsible.Root
            open={isWidgetOpen}
            onOpenChange={setIsWidgetOpen}
        >
            <div
                className="bg-zinc-900 overflow-hidden w-[460px] rounded-xl shadow-shape"
                role="region"
                aria-label="File upload widget"
            >
                <UploadWidgetHeader/>

                <Collapsible.Content
                    className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="flex flex-col gap-4 py-3">
                        <UploadWidgetDropzone/>
                        <Divider/>
                        <UploadWidgetUploadList/>
                    </div>
                </Collapsible.Content>
            </div>
        </Collapsible.Root>
    );
}
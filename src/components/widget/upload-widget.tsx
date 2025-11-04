import {UploadWidgetHeader} from "./upload-widget-header/upload-widget-header.tsx";
import {UploadWidgetUploadList} from "./upload-widget-upload-list/upload-widget-upload-list.tsx";
import {Divider} from "../ui/divider.tsx";
import * as Collapsible from "@radix-ui/react-collapsible";
import {UploadWidgetDropzone} from "./upload-widget-dropzone/upload-widget-dropzone.tsx";
import {motion, useCycle} from "motion/react";
import {useEffect, useRef, useState} from "react";

export function UploadWidget() {
    const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isWidgetOpen]);

    return (
        <Collapsible.Root onOpenChange={() => toggleWidgetOpen()}
        >
            <motion.div
                className="bg-zinc-900 overflow-hidden w-[460px] rounded-xl shadow-shape"
                role="region"
                aria-label="File upload widget"
                animate={isWidgetOpen ? "open" : "closed"}
                variants={{
                    open: {
                        width: 460,
                        height: contentHeight + 60,
                        transition: {
                            duration: 0.3,
                            ease: "easeInOut",
                        },
                    },
                    closed: {
                        width: "max-content",
                        height: 60,
                        transition: {
                            duration: 0.3,
                            ease: "easeInOut",
                        },
                    },
                }}
            >
                <UploadWidgetHeader/>

                <Collapsible.Content
                    ref={contentRef}
                    className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="flex flex-col gap-4 py-3">
                        <UploadWidgetDropzone/>
                        <Divider/>
                        <UploadWidgetUploadList/>
                    </div>
                </Collapsible.Content>
            </motion.div>
        </Collapsible.Root>
    );
}
import {UploadWidgetHeader} from "../upload-widget-header/upload-widget-header.tsx";
import {UploadWidgetUploadList} from "../upload-widget-upload-list/upload-widget-upload-list.tsx";
import {Divider} from "../../ui/divider.tsx";
import * as Collapsible from "@radix-ui/react-collapsible";
import {UploadWidgetDropzone} from "../upload-widget-dropzone/upload-widget-dropzone.tsx";
import {motion, useCycle} from "motion/react";
import {useEffect, useRef, useState} from "react";
import {getUploadWidgetHeight, uploadWidgetAnimationVariants, uploadWidgetStyles} from "./upload-widget.styles.ts";

export function UploadWidget() {
    const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    const isThereAnyPendedUpload = true;

    const styles = uploadWidgetStyles({
        state: isWidgetOpen ? "open" : "closed",
        hasProgress: isThereAnyPendedUpload,
    });


    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isWidgetOpen]);

    return (
        <Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
            <motion.div
                className={styles.container()}
                role="region"
                aria-label="File upload widget"
                data-progress={isThereAnyPendedUpload}
                animate={isWidgetOpen ? "open" : "closed"}
                variants={{
                    open: {
                        ...uploadWidgetAnimationVariants.open,
                        ...getUploadWidgetHeight(contentHeight, true),
                    },
                    closed: {
                        ...uploadWidgetAnimationVariants.closed,
                        ...getUploadWidgetHeight(contentHeight, false),
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
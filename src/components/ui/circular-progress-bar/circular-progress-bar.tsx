import * as React from "react";
import {circularProgressBarVariants} from "./circular-progress-bar.styles.ts";

interface CircularProgressBarProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
    ariaLabel?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
                                                                            progress,
                                                                            size = 120,
                                                                            strokeWidth = 8,
                                                                            label,
                                                                            ariaLabel,
                                                                        }) => {
    const styles = circularProgressBarVariants();

    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (progress / 100) * circumference;

    const normalizedProgress = Math.min(Math.max(progress, 0), 100);

    const defaultLabel = label || "Progress";
    const progressLabel = ariaLabel || `${defaultLabel}: ${normalizedProgress}% complete`;

    return (
        <div
            className={styles.container()}
            style={{width: size, height: size}}
            role="progressbar"
            aria-valuenow={normalizedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={progressLabel}
            aria-live="polite"
            aria-atomic="true"
        >
            <svg
                className={styles.svg()}
                viewBox={`0 0 ${size} ${size}`}
                aria-hidden="true"
            >
                <circle
                    className={`${styles.circle()} ${styles.backgroundCircle()}`}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                />

                <circle
                    className={`${styles.circle()} ${styles.progressCircle()}`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: progressOffset,
                    }}
                />
            </svg>

            <div
                className={styles.labelContainer()}
                aria-hidden="true"
            >
                <span className={styles.value()}>
                    {normalizedProgress}
                </span>
                <span className={styles.unit()}>
                    %
                </span>
            </div>
        </div>
    );
};
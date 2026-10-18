import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: string | number;
    duration?: number;
    className?: string;
}

/**
 * AnimatedCounter parses values like "47", "32+", "800+", "95%", "14"
 * and animates the numeric count smoothly from 0 up to the target number when in view.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    duration = 1200,
    className = '',
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-20px' });
    const stringVal = String(value ?? '').trim();

    // Match leading prefix (if any), number (integer/decimal), and suffix (like +, %, k+)
    const match = stringVal.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    const prefix = match ? match[1] : '';
    const numericTarget = match ? parseFloat(match[2]) : NaN;
    const suffix = match ? match[3] : '';
    const isDecimal = match ? match[2].includes('.') : false;

    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
        if (!isInView || isNaN(numericTarget)) {
            return;
        }

        let animationFrameId: number;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve
            const eased = 1 - Math.pow(1 - progress, 3);
            const nextVal = eased * numericTarget;

            setCurrentCount(nextVal);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(tick);
            } else {
                setCurrentCount(numericTarget);
            }
        };

        animationFrameId = requestAnimationFrame(tick);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, numericTarget, duration]);

    if (isNaN(numericTarget)) {
        return <span className={className}>{stringVal}</span>;
    }

    const displayFormatted = isDecimal
        ? currentCount.toFixed(1)
        : Math.round(currentCount).toString();

    return (
        <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {prefix}
            {displayFormatted}
            {suffix}
        </span>
    );
};

export default AnimatedCounter;

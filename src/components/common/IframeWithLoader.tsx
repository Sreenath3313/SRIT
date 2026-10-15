import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

type IframeWithLoaderProps = React.IframeHTMLAttributes<HTMLIFrameElement>;

const IframeWithLoader: React.FC<IframeWithLoaderProps> = ({ className, style, title, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const sourceHeight = style?.height ?? style?.minHeight ?? '800px';
    const sourceHeightPixels = typeof sourceHeight === 'number'
        ? sourceHeight
        : /^\s*\d+(?:\.\d+)?px\s*$/.test(sourceHeight)
            ? Number.parseFloat(sourceHeight)
            : Number.NaN;
    const responsiveHeight = Number.isFinite(sourceHeightPixels)
        ? `min(${sourceHeightPixels}px, 75vh)`
        : sourceHeight === '100%'
            ? '75vh'
            : sourceHeight;
    const responsiveFrameStyle: React.CSSProperties = {
        ...style,
        border: '1px solid #E5E7EB',
        height: responsiveHeight,
        maxWidth: '100%',
        minHeight: 0,
        position: 'relative',
    };

    return (
        <div className={`relative w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-neutral-200 bg-white ${className || ''}`} style={responsiveFrameStyle}>
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white" role="status" aria-label="Loading embedded content">
                    <Loader2 className="h-8 w-8 animate-spin text-[#FF5422]" />
                </div>
            )}
            <iframe
                onLoad={() => setIsLoading(false)}
                title={title || 'Embedded content'}
                className="relative z-0 block h-full w-full min-w-0 max-w-full border-0 bg-white"
                style={{ border: 'none', display: 'block', width: '100%', height: '100%', maxWidth: '100%' }}
                {...props}
            />
        </div>
    );
};

export default IframeWithLoader;

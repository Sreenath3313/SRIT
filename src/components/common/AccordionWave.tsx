import React from 'react';

interface AccordionWaveProps {
    className?: string;
}

const AccordionWave: React.FC<AccordionWaveProps> = ({ className = '' }) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 600 100"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute ${className}`}
    >
        <path
            d="M0 0H600V55C510 92 440 28 350 53C260 78 190 94 105 60C62 43 31 38 0 50V0Z"
            fill="#ff9b62"
            fillOpacity=".18"
        />
        <path
            d="M0 0H600V27C518 57 457 4 361 34C266 64 196 77 114 43C68 24 35 20 0 31V0Z"
            fill="#ffc59f"
            fillOpacity=".28"
        />
    </svg>
);

export default AccordionWave;

// Wide horizontal brush stroke — broad belly, tapered ends, visible bristle splits
export default function BrushStroke({ color, className, opacity = 0.5 }: { color: string; className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 420 160" className={className} aria-hidden="true">
      <defs>
        <filter id={`brush-f-${color}`} x="-8%" y="-20%" width="116%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025 0.06" numOctaves="4" seed="12" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="11" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="2.5" />
        </filter>
      </defs>
      <g filter={`url(#brush-f-${color})`} opacity={opacity} fill={color}>
        {/* Main broad stroke body */}
        <path d="M8,80 C22,52 60,28 120,22 C180,16 260,16 320,24 C360,30 392,50 410,72 C400,96 370,116 325,122 C265,130 180,132 118,126 C60,120 22,106 8,80 Z" />
        {/* Secondary layer — slightly offset for paint depth */}
        <path d="M18,78 C40,58 85,42 145,38 C205,34 270,36 320,46 C355,54 385,68 402,82 C388,96 360,108 320,112 C268,118 200,118 145,112 C88,106 42,92 18,78 Z" opacity="0.4" />
        {/* Bristle streak lines — give that dry-brush texture */}
        <path d="M15,68 C70,55 150,48 230,47 C305,46 370,52 405,64" strokeWidth="3.5" stroke={color} fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M12,82 C65,92 150,100 240,99 C315,98 375,88 408,76" strokeWidth="2.5" stroke={color} fill="none" strokeLinecap="round" opacity="0.45" />
        <path d="M20,58 C80,44 170,36 255,37 C330,38 385,50 408,66" strokeWidth="2" stroke={color} fill="none" strokeLinecap="round" opacity="0.3" />
        <path d="M22,94 C75,106 160,114 250,112 C325,110 382,98 406,84" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" opacity="0.25" />
        {/* Bristle splits near trailing edge */}
        <path d="M340,40 C360,36 385,38 408,52" strokeWidth="4" stroke={color} fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M345,110 C368,118 392,114 410,100" strokeWidth="3.5" stroke={color} fill="none" strokeLinecap="round" opacity="0.3" />
      </g>
    </svg>
  );
}
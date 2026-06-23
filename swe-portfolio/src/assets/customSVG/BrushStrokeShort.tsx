// Angled brush stroke — short and gestural
export default function BrushStrokeShort({ color, className, opacity = 0.5 }: { color: string; className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden="true">
      <defs>
        <filter id={`sbrush-f-${color}`} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.03" numOctaves="4" seed="7" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="9" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="2.5" />
        </filter>
      </defs>
      <g filter={`url(#sbrush-f-${color})`} opacity={opacity} fill={color} transform="rotate(-22, 100, 90)">
        <path d="M55,50 C65,38 90,32 120,30 C150,28 165,32 170,42 C168,60 155,78 130,88 C105,98 75,100 58,90 C42,80 45,62 55,50 Z" />
        {/* Bristle details */}
        <path d="M60,55 C90,44 130,40 165,46" strokeWidth="2" stroke={color} fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M58,68 C88,76 128,78 162,72" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  );
}
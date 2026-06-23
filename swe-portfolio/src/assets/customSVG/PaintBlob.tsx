// Main organic blob with satellite blobs clustered around it
export default function PaintBlob({ color, className, opacity = 0.55 }: { color: string; className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <defs>
        <filter id={`blob-f-${color}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter={`url(#blob-f-${color})`} opacity={opacity} fill={color}>
        {/* Main blob */}
        <path d="M120,48 C152,44 180,62 192,88 C206,118 200,152 182,172 C162,194 130,202 102,194 C74,186 52,164 46,138 C38,108 52,74 74,58 C90,46 104,50 120,48Z" />
        {/* Satellite blobs — varied sizes and positions */}
        <circle cx="194" cy="76"  r="14" />
        <circle cx="210" cy="130" r="9"  />
        <circle cx="188" cy="186" r="17" />
        <circle cx="136" cy="210" r="11" />
        <circle cx="74"  cy="198" r="8"  />
        <circle cx="42"  cy="152" r="13" />
        <circle cx="38"  cy="96"  r="7"  />
        <circle cx="72"  cy="44"  r="10" />
        <circle cx="140" cy="30"  r="12" />
        <circle cx="172" cy="52"  r="6"  />
        <circle cx="222" cy="106" r="5"  />
        <circle cx="56"  cy="122" r="6"  />
        <circle cx="100" cy="220" r="7"  />
        <circle cx="162" cy="216" r="5"  />
        <circle cx="30"  cy="68"  r="5"  />
      </g>
    </svg>
  );
}
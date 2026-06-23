// Paint flicked from a brush — long thin streaks at random angles with tail dots
function Flecks({ color, className, opacity = 0.5 }: { color: string; className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 340 280" className={className} aria-hidden="true">
      <defs>
        <filter id={`fleck-f-${color}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.02" numOctaves="2" seed="3" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="4" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <g filter={`url(#fleck-f-${color})`} opacity={opacity} fill={color}>
        {/* Long flicks — thin ellipses at steep angles */}
        <ellipse cx="60"  cy="60"  rx="38" ry="3.5" transform="rotate(-68,60,60)"  />
        <ellipse cx="140" cy="30"  rx="52" ry="2.5" transform="rotate(-80,140,30)" />
        <ellipse cx="230" cy="50"  rx="44" ry="3"   transform="rotate(-55,230,50)" />
        <ellipse cx="290" cy="90"  rx="30" ry="2"   transform="rotate(-40,290,90)" />
        <ellipse cx="40"  cy="140" rx="46" ry="4"   transform="rotate(-75,40,140)" />
        <ellipse cx="170" cy="110" rx="58" ry="3"   transform="rotate(-62,170,110)"/>
        <ellipse cx="270" cy="150" rx="36" ry="2.5" transform="rotate(-50,270,150)"/>
        <ellipse cx="100" cy="200" rx="42" ry="3.5" transform="rotate(-70,100,200)"/>
        <ellipse cx="210" cy="220" rx="50" ry="2.5" transform="rotate(-58,210,220)"/>
        <ellipse cx="310" cy="200" rx="28" ry="2"   transform="rotate(-45,310,200)"/>
        <ellipse cx="60"  cy="240" rx="34" ry="3"   transform="rotate(-78,60,240)" />
        <ellipse cx="300" cy="48"  rx="22" ry="2"   transform="rotate(-35,300,48)" />

        {/* Shorter mid flicks */}
        <ellipse cx="110" cy="80"  rx="22" ry="2.5" transform="rotate(-60,110,80)"  />
        <ellipse cx="200" cy="170" rx="26" ry="2"   transform="rotate(-72,200,170)" />
        <ellipse cx="150" cy="250" rx="18" ry="2.5" transform="rotate(-48,150,250)" />
        <ellipse cx="320" cy="140" rx="20" ry="1.8" transform="rotate(-38,320,140)" />
        <ellipse cx="22"  cy="190" rx="24" ry="2.2" transform="rotate(-80,22,190)"  />

        {/* Tail dots at the end of select flicks */}
        <circle cx="38"  cy="18"  r="3.5" />
        <circle cx="108" cy="8"   r="2.5" />
        <circle cx="210" cy="18"  r="3"   />
        <circle cx="14"  cy="108" r="2.5" />
        <circle cx="82"  cy="168" r="3"   />
        <circle cx="178" cy="62"  r="2"   />
        <circle cx="176" cy="280" r="2.5" />
        <circle cx="284" cy="24"  r="2"   />
        <circle cx="330" cy="110" r="2"   />
      </g>
    </svg>
  );
}
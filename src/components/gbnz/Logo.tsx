export function GbnzLogo({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) {
  const letterColor = inverted ? "#0D0D0D" : "#FFFFFF";
  const nzColor = inverted ? "#0D0D0D" : "#FFFFFF";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 120 60" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 30 Q5 8 30 8 L70 8 Q90 8 90 30 Q90 52 70 52 L30 52 Q5 52 5 30 Z" fill="#F5C400" />
        <text x="20" y="42" fontFamily="Bebas Neue, sans-serif" fontSize="34" fontWeight="900" fill={letterColor}>gb</text>
        <text x="60" y="42" fontFamily="Bebas Neue, sans-serif" fontSize="34" fontWeight="900" fill={nzColor}>nz</text>
      </svg>
      <span className="font-display text-xl tracking-wider" style={{ color: inverted ? "#0D0D0D" : "#FFFFFF" }}>
        Design
      </span>
    </div>
  );
}

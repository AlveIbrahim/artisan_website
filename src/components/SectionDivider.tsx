interface SectionDividerProps {
  variant?: 'wave1' | 'wave2' | 'curve1' | 'curve2';
  flip?: boolean;
  color?: 'sage' | 'terracotta' | 'soft-gray' | 'warm-white' | 'charcoal' | 'white';
}

export function SectionDivider({ 
  variant = 'wave1', 
  flip = false, 
  color = 'warm-white' 
}: SectionDividerProps) {
  const colorMap = {
    'sage': '#9ca986',
    'terracotta': '#d4a574',
    'soft-gray': '#f5f5f5',
    'warm-white': '#fefefe',
    'charcoal': '#3a3a3a',
    'white': '#ffffff',
  };

  const curves = {
    wave1: "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    wave2: "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    curve1: "M0,96L1440,32L1440,0L0,0Z",
    curve2: "M0,32L1440,96L1440,0L0,0Z",
  };

  return (
    <div className={`relative ${flip ? 'transform rotate-180' : ''}`}>
      <svg
        className="w-full h-16 md:h-20"
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d={curves[variant]}
          fill={colorMap[color]}
        />
      </svg>
    </div>
  );
}

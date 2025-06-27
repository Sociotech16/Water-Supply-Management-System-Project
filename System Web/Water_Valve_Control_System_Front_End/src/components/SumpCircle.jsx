import React from 'react';

export default function SumpCircle({ label, level, isOn, onToggle }) {
  const radius = 150;
  const stroke = 32;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="sump-circle">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={isOn ? "#00cc66" : "#0077ff"}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="18"
          fill="#333"
          fontWeight="bold"
        >
          {level}%
        </text>
      </svg>

      <div className="sump-label">{label}</div>

      
    </div>
  );
}

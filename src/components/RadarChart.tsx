import React, { useState } from 'react';
import type { RadarStat } from '../types';

interface RadarChartProps {
  stats: RadarStat[];
  size?: number;
  interactive?: boolean;
  onStatChange?: (index: number, newValue: number) => void;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  stats,
  size = 320,
  interactive = false,
  onStatChange
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const center = size / 2;
  const radius = (size / 2) - 40;
  const totalSides = stats.length;

  const getCoordinates = (value: number, index: number, maxRadius: number) => {
    const angle = (Math.PI * 2 / totalSides) * index - Math.PI / 2;
    const distance = (value / 100) * maxRadius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Data polygon points
  const pointsString = stats
    .map((s, i) => {
      const { x, y } = getCoordinates(s.value, i, radius);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div 
      className="radar-chart-container" 
      style={{ 
        width: '100%', 
        maxWidth: `${size}px`, 
        aspectRatio: '1 / 1', 
        position: 'relative',
        margin: '0 auto'
      }}
    >
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="radar-svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="radarCleanFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF206E" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#FBFF12" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        {/* Concentric Polygons */}
        {levels.map((lvl, lvlIdx) => {
          const ringPoints = stats
            .map((_, i) => {
              const { x, y } = getCoordinates(lvl * 100, i, radius);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={lvlIdx}
              points={ringPoints}
              fill={lvlIdx === levels.length - 1 ? 'rgba(255, 32, 110, 0.03)' : 'none'}
              stroke="rgba(255, 32, 110, 0.16)"
              strokeWidth={lvlIdx === levels.length - 1 ? 1.2 : 1}
              strokeDasharray={lvlIdx < levels.length - 1 ? '2 2' : undefined}
            />
          );
        })}

        {/* Axis Spokes from center to edge */}
        {stats.map((_, i) => {
          const { x, y } = getCoordinates(100, i, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 32, 110, 0.14)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon with fill */}
        <polygon
          points={pointsString}
          fill="url(#radarCleanFill)"
          stroke="#FF206E"
          strokeWidth="2.4"
          className="radar-data-polygon"
        />

        {/* Vertex Dots */}
        {stats.map((s, i) => {
          const { x, y } = getCoordinates(s.value, i, radius);
          const isHovered = hoveredIdx === i;
          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setHoveredIdx(i)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 6 : 4.5}
                fill={isHovered ? '#FF206E' : '#FBFF12'}
                stroke="#0C0F0A"
                strokeWidth={1.8}
                className="radar-vertex"
              />
            </g>
          );
        })}

        {/* Labels at extremities */}
        {stats.map((s, i) => {
          const { x, y } = getCoordinates(116, i, radius);
          const isHovered = hoveredIdx === i;
          return (
            <text
              key={i}
              x={x}
              y={y + 4}
              textAnchor="middle"
              className={`radar-label ${isHovered ? 'radar-label-active' : ''}`}
              fill={isHovered ? '#FBFF12' : '#94A398'}
              fontSize="10"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              {s.label.split(' ')[0]} ({s.value})
            </text>
          );
        })}
      </svg>

      {/* Floating tooltip when vertex hovered */}
      {hoveredIdx !== null && (
        <div className="radar-tooltip">
          <span className="tooltip-name">{stats[hoveredIdx].label}</span>
          <span className="tooltip-val">{stats[hoveredIdx].value}/100</span>
          {interactive && (
            <div className="tooltip-slider-row">
              <input
                type="range"
                min="50"
                max="100"
                value={stats[hoveredIdx].value}
                onChange={(e) => onStatChange?.(hoveredIdx, Number(e.target.value))}
                className="stat-slider"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

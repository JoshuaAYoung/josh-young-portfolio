import React from 'react';

interface CircularTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  x: number;
  y: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  fontSize = 12,
  color = 'currentColor',
  x,
  y,
}) => {
  const radius = 63;

  return (
    <svg
      width="126"
      height="126"
      viewBox="0 0 126 126"
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
    >
      <defs>
        <path
          id="circlePath"
          d={`M 63, 120 A ${radius}, ${radius} 0 0, 1 63, 3`}
        />
      </defs>

      <text fill={color} fontSize={fontSize} textAnchor="middle">
        <textPath
          href="#circlePath"
          startOffset="50%"
          dominantBaseline="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CircularText;

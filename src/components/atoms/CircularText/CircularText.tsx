import './CircularText.scss';

interface CircularTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  radius?: number;
  x: number;
  y: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  fontSize = 18,
  fontWeight = '900',
  color = 'currentColor',
  radius = 63,
  x,
  y,
}) => {
  const diameter = radius * 2;
  return (
    <svg
      width={diameter}
      height={radius}
      viewBox={`0 0 ${diameter} ${radius}`}
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
    >
      <defs>
        <path
          id="circlePath"
          d={`M 0, 0 A ${radius}, ${radius} 0 0,0 ${diameter}, 0`}
          fill="none"
        />
      </defs>

      <text
        fill={color}
        fontSize={fontSize}
        className="circular-text-copy"
        fontWeight={fontWeight}
      >
        <textPath
          href="#circlePath"
          startOffset="50%"
          dominantBaseline="auto"
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CircularText;

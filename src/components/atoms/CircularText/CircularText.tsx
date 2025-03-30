import './CircularText.scss';

interface CircularTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  radius?: number;
  x: number;
  y: number;
  iconIndex: number;
  letterSpacing?: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  fontSize = 18,
  fontWeight = '900',
  color = 'currentColor',
  radius = 63,
  x,
  y,
  iconIndex,
  letterSpacing = 2.5,
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
      overflow="visible"
    >
      <defs>
        <path
          id={`circlePath${iconIndex}`}
          d={`M 0, 0 A ${radius}, ${radius} 0 0,0 ${diameter}, 0`}
          fill="none"
        />
      </defs>

      <text
        fill={color}
        fontSize={fontSize}
        className="circular-text-copy"
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
      >
        <textPath
          href={`#circlePath${iconIndex}`}
          startOffset="50%"
          dominantBaseline="auto"
          textAnchor="middle"
          stroke="none"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CircularText;

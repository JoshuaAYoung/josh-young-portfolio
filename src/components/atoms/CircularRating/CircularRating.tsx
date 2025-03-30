import HeartFull from '../../../assets/icons/tech/heart-full.svg?react';
import HeartEmpty from '../../../assets/icons/tech/heart-empty.svg?react';

interface CircularRatingProps {
  radius: number;
  x: number;
  y: number;
  stars: number;
}

const CircularRating: React.FC<CircularRatingProps> = ({
  radius,
  x,
  y,
  stars,
}) => {
  const diameter = radius * 2;
  const angleIncrement = -30;
  // start of first star, centers middle on circle
  const startAngle = 90 + angleIncrement * -2;
  const starsArray = Array.from({ length: 5 }, (_, index) => ({
    filled: index + 1 <= stars,
  }));

  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      overflow="visible"
    >
      {starsArray.map((star, index) => {
        const angle = ((startAngle + index * angleIncrement) * Math.PI) / 180;
        const starX = radius + radius * Math.cos(angle);
        const starY = radius - radius * Math.sin(angle);
        return (
          <g key={index} transform={`translate(${starX}, ${starY})`}>
            {star.filled ? (
              <HeartFull
                width={20}
                height={18}
                x={-10}
                y={-9}
                color="var(--primary-color"
              />
            ) : (
              <HeartEmpty
                width={20}
                height={18}
                x={-10}
                y={-9}
                color="var(--primary-color"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default CircularRating;

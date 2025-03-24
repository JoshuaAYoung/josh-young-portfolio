import { forwardRef, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import './Skills.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  // SVG ICONS
  const icon1 = <circle cx="0" cy="0" r="10" fill="blue" />;
  const icon2 = <rect x="-7.5" y="-7.5" width="15" height="15" fill="green" />;
  const icon3 = <polygon points="0,-10 8,5 -8,5" fill="orange" />;

  const iconsData = useMemo(
    () => [
      { icon: icon1, orbitRadius: 150, angle: 0 },
      { icon: icon1, orbitRadius: 150, angle: 45 },
      { icon: icon1, orbitRadius: 150, angle: 90 },
      { icon: icon2, orbitRadius: 250, angle: 30 },
      { icon: icon2, orbitRadius: 250, angle: 75 },
      { icon: icon2, orbitRadius: 250, angle: 150 },
      { icon: icon3, orbitRadius: 350, angle: 20 },
      { icon: icon3, orbitRadius: 350, angle: 100 },
      { icon: icon3, orbitRadius: 450, angle: 0 },
    ],
    [],
  );

  const size = 1000; // ViewBox size
  const center = size / 2;

  // Precompute positions for performance
  const computedPositions = useMemo(
    () =>
      iconsData.map(({ orbitRadius, angle }) => {
        const radians = (angle * Math.PI) / 180;
        return {
          x: center + orbitRadius * Math.cos(radians),
          y: center + orbitRadius * Math.sin(radians),
          orbitRadius,
        };
      }),
    [iconsData],
  );

  return (
    <InViewSection
      sectionName="Skills"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Skills', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Skills"
    >
      <div className="container">
        <svg
          className="orbit-container"
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Center reference point */}
          <motion.circle
            cx={center}
            cy={center}
            r="10"
            fill="white"
            stroke="black"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Lines and Icons */}
          {computedPositions.map(({ x, y, orbitRadius }, index) => {
            // Find the next orbit to connect to (if applicable)
            const nextPosition = computedPositions.find(
              (pos) => pos.orbitRadius > orbitRadius,
            );

            return (
              <>
                {/* Animated Line */}
                {nextPosition && (
                  <motion.line
                    x1={x}
                    y1={y}
                    x2={nextPosition.x}
                    y2={nextPosition.y}
                    stroke="white"
                    strokeWidth={2}
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 1,
                      ease: 'easeOut',
                    }}
                  />
                )}

                {/* Animated Icon */}
                <motion.g
                  cx={x}
                  cy={y}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    transformOrigin: '500px 500px', // Ensures transformations happen from the center
                  }}
                  transition={{
                    delay: index * 0.3,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                >
                  {iconsData[index].icon}
                </motion.g>
              </>
            );
          })}
        </svg>
      </div>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;

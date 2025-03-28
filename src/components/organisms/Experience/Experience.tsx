import { forwardRef, useRef, useState } from 'react';
import './Experience.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import ExperienceItem from '../../atoms/ExperienceItem/ExperienceItem';
import { experienceData } from '../../../data/experiences';
import { type Experience } from '../../../types/experience.types';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const REVEAL_DURATION = 0.3;

const Experience = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const titleRef = useRef<HTMLDivElement>(null);
  const minXlWidth = useMediaQuery(`(min-width: ${breakpoints['min-xLarge']})`);

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

  return (
    <InViewSection
      sectionName="Experience"
      onSectionInViewActiveCallback={(isInView) =>
        // when experience and about are side by side, skips setting experience active in nav menus
        !minXlWidth ? onSectionInViewActive('Experience', isInView) : null
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Experience"
      titleRef={titleRef}
    >
      {experienceData.map((experience, index) => (
        <ExperienceItem
          key={index}
          experience={experience as Experience}
          hasLine={index !== experienceData.length - 1}
          index={index}
          revealDuration={REVEAL_DURATION}
          isInViewReveal={isInViewReveal}
        />
      ))}
    </InViewSection>
  );
});

Experience.displayName = 'Experience';

export default Experience;

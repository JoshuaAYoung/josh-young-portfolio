import { forwardRef, useState } from 'react';
import './Experience.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import ExperienceItem from '../../molecules/ExperienceItem/ExperienceItem';
import experiences from '../../../data/experiences.json';
import { type Experience } from '../../../types/experience.types';

const Experience = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Experience is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  // TODO where does the reveal wrapper go on this one?
  return (
    <InViewSection
      sectionName="Experience"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Experience', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Experience"
    >
      {experiences.map((experience, index) => (
        <ExperienceItem key={index} experience={experience as Experience} />
      ))}
    </InViewSection>
  );
});

Experience.displayName = 'Experience';

export default Experience;

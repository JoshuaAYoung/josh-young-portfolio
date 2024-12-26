import { forwardRef, useMemo, useRef, useState } from 'react';
import './Experience.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import ExperienceItem from '../../molecules/ExperienceItem/ExperienceItem';
import experiences from '../../../data/experiences.json';
import { type Experience } from '../../../types/experience.types';

const REVEAL_DURATION = 0.3;
// these all need to be coordinated with the respective elements
// TODO padding will most likely change along with breakpoints, modify accordingly
const SECTION_VERTICAL_PADDING = 130;
const SECTION_TITLE_BOTTOM_MARGIN = 30;
const PARAGRAPH_ITEM_BOTTOM_MARGIN = 20;

const Experience = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [heights, setHeights] = useState<{ [key: number]: number }>({});
  const titleRef = useRef<HTMLDivElement>(null);

  if (isInViewReveal) {
    console.log('Experience is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleHeightCalculated = (index: number, height: number) => {
    setHeights((prevHeights) => {
      if (!(index in prevHeights)) {
        return { ...prevHeights, [index]: height };
      }
      return prevHeights;
    });
  };

  const itemsTotalHeight = useMemo(
    () => Object.values(heights).reduce((acc, height) => acc + height, 0),
    [heights],
  );

  const titleHeight = titleRef?.current?.scrollHeight || 0;

  const totalHeight =
    itemsTotalHeight +
    SECTION_VERTICAL_PADDING * 2 +
    SECTION_TITLE_BOTTOM_MARGIN +
    titleHeight +
    PARAGRAPH_ITEM_BOTTOM_MARGIN * experiences.length;

  return (
    <InViewSection
      sectionName="Experience"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Experience', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Experience"
      containerStyle={{ height: totalHeight }}
      titleRef={titleRef}
    >
      {isInViewReveal &&
        experiences.map((experience, index) => (
          <ExperienceItem
            key={index}
            experience={experience as Experience}
            hasLine={index !== experiences.length - 1}
            index={index}
            revealDuration={REVEAL_DURATION}
            onHeightCalculated={(height) =>
              handleHeightCalculated(index, height)
            }
          />
        ))}
    </InViewSection>
  );
});

Experience.displayName = 'Experience';

export default Experience;

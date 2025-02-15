import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './Experience.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import ExperienceItem from '../../molecules/ExperienceItem/ExperienceItem';
import { experienceData } from '../../../data/experiences';
import { type Experience } from '../../../types/experience.types';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const REVEAL_DURATION = 0.3;
const SECTION_TITLE_BOTTOM_MARGIN = 30;
const PARAGRAPH_ITEM_BOTTOM_MARGIN = 20;
const SECTION_PADDING_XL = 150;
const SECTION_PADDING_LG = 110;

const Experience = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const titleRef = useRef<HTMLDivElement>(null);
  const minXlWidth = useMediaQuery(`(min-width: ${breakpoints['min-xLarge']})`);
  const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  // these all need to be coordinated with the respective elements
  const [sectionVerticalPadding, setSectionVerticalPadding] =
    useState(SECTION_PADDING_XL);
  const [heights, setHeights] = useState<{ [key: number]: number }>({});

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

  // COMPUTED VAR(S)
  const itemsTotalHeight = useMemo(
    () => Object.values(heights).reduce((acc, height) => acc + height, 0),
    [heights],
  );

  const titleHeight = titleRef?.current?.scrollHeight || 0;

  const totalHeight =
    itemsTotalHeight +
    sectionVerticalPadding +
    SECTION_TITLE_BOTTOM_MARGIN +
    titleHeight +
    PARAGRAPH_ITEM_BOTTOM_MARGIN * experienceData.length;

  // EFFECT(S)
  useEffect(() => {
    if (minXlWidth && sectionVerticalPadding !== SECTION_PADDING_XL) {
      setSectionVerticalPadding(SECTION_PADDING_XL);
    } else if (maxLgWidth && sectionVerticalPadding !== SECTION_PADDING_LG) {
      setSectionVerticalPadding(SECTION_PADDING_LG);
    }
  }, [maxLgWidth, minXlWidth]);

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
      containerStyle={{ height: totalHeight }}
      titleRef={titleRef}
    >
      {isInViewReveal &&
        experienceData.map((experience, index) => (
          <ExperienceItem
            key={index}
            experience={experience as Experience}
            hasLine={index !== experienceData.length - 1}
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

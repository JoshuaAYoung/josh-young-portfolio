import { forwardRef, useState } from 'react';
import './Portfolio.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const Portfolio = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const minXlWidth = useMediaQuery(`(min-width: ${breakpoints['min-xLarge']})`);
  const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

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
      sectionName="Portfolio"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Portfolio', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
    >
      <div className="portfolio-container">
        <h2 className="section-title">
          Portfolio
          <span className="big-period">.</span>
        </h2>
        <div className="portfolio-grid-container">
          <div className="portfolio-grid-item">Item 1</div>
          <div className="portfolio-grid-item">Item 2</div>
          <div className="portfolio-grid-item">Item 3</div>
          <div className="portfolio-grid-item">Item 4</div>
          <div className="portfolio-grid-item">Item 5</div>
          <div className="portfolio-grid-item">Item 6</div>
        </div>
      </div>
    </InViewSection>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;

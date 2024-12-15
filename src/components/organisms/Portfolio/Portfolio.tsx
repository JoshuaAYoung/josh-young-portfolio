import { forwardRef, useState } from 'react';
import './Portfolio.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';

const Portfolio = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Portfolio is revealed!');
  }

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
      title="Portfolio"
    >
      <RevealWrapper isInView={isInViewReveal}>
        <h2 style={{ fontSize: 50, color: 'black' }}>Portfolio</h2>
      </RevealWrapper>
    </InViewSection>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;

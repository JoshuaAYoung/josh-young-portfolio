import { forwardRef, useState } from 'react';
import './Contact.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Contact is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="Contact"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Contact', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
    >
      <RevealWrapper isInView={isInViewReveal}>
        <h2 style={{ fontSize: 50, color: 'black' }}>Contact</h2>
      </RevealWrapper>
    </InViewSection>
  );
});

Contact.displayName = 'Contact';

export default Contact;

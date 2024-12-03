import { forwardRef, useState } from 'react';
import './Contact.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewScroll = useJYStore(
    (state) => state.onSectionInViewScroll,
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
      onSectionInViewScroll={(isInView) =>
        onSectionInViewScroll('Contact', isInView)
      }
      onSectionInViewReveal={onSectionInViewReveal}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Contact</h2>
    </InViewSection>
  );
});

Contact.displayName = 'Contact';

export default Contact;

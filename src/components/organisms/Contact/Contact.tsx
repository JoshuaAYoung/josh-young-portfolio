import { forwardRef } from 'react';
import './Contact.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const handleScrollSection = useJYStore((state) => state.handleScrollSection);

  return (
    <InViewSection
      sectionKey="Contact"
      onInViewChange={(isInView) => handleScrollSection('Contact', isInView)}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Contact</h2>
    </InViewSection>
  );
});

Contact.displayName = 'Contact';

export default Contact;

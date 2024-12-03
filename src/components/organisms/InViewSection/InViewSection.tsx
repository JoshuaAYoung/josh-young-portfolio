import { forwardRef, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface InViewSectionProps {
  children: React.ReactNode;
  sectionName: string;
  /**
   * Callback function that is triggered when the section is in view of the center point of the viewport.
   * @param isInViewOfCenterpoint - Boolean indicating whether the section is in view of the center point.
   */
  onSectionInViewScroll: (isInViewOfCenterpoint: boolean) => void;
  /**
   * Callback function that is triggered when any part of the section is partially on screen.
   * @param isPartiallyOnScreen - Boolean indicating whether any part of the section is partially on screen.
   */
  onSectionInViewReveal: (isPartiallyOnScreen: boolean) => void;
}

const InViewSection = forwardRef<HTMLElement, InViewSectionProps>(
  (
    { children, sectionName, onSectionInViewScroll, onSectionInViewReveal },
    scrollRef,
  ) => {
    // HOOK(S)
    const inViewRef = useRef(null);
    // Margin looks to see if any part of the element is in the centerpoint of the viewport.
    // Adjust as necessary if contact section is not going active for screens with narrow aspect ratios.
    const isInViewOfCenterpoint = useInView(inViewRef, {
      margin: '-50% 0% -50% 0%',
    });
    const isPartiallyOnScreen = useInView(inViewRef, {
      once: true,
      amount: 0.1,
    });

    // EFFECT(S)
    useEffect(() => {
      onSectionInViewScroll(isInViewOfCenterpoint);
    }, [isInViewOfCenterpoint, onSectionInViewScroll]);

    useEffect(() => {
      onSectionInViewReveal(isPartiallyOnScreen);
    }, [isPartiallyOnScreen, onSectionInViewReveal]);

    return (
      <section
        ref={inViewRef}
        data-section={sectionName}
        className={`page-section ${sectionName.toLowerCase()}`}
      >
        <div ref={scrollRef as React.RefObject<HTMLDivElement>}>{children}</div>
      </section>
    );
  },
);

InViewSection.displayName = 'InViewSection';

export default InViewSection;

import { forwardRef, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import './InViewSection.scss';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';

interface InViewSectionProps {
  children: React.ReactNode;
  sectionName: string;
  /**
   * Callback function that is triggered when the section is in view of the center point of the viewport.
   * Used for settinge the active menu items currently, fires whenever section is scrolled to.
   */
  onSectionInViewActiveCallback: (isInViewOfCenterpoint: boolean) => void;
  /**
   * Callback function that is triggered when any part of the section 10% "on screen".
   * Used for reveal animations currently, and only fires once per session.
   */
  onSectionInViewRevealCallback: (isPartiallyOnScreen: boolean) => void;
  /**
   * The amount of the section that should be on screen before the `onSectionInViewReveal` callback is triggered.
   * Default is 0.1 (10%).
   */
  amountOnScreen?: number;
  containerClassName?: string;
  title?: string;
}

const InViewSection = forwardRef<HTMLElement, InViewSectionProps>(
  (
    {
      children,
      sectionName,
      onSectionInViewActiveCallback,
      onSectionInViewRevealCallback,
      amountOnScreen = 0.1,
      containerClassName,
      title,
    },
    scrollRef,
  ) => {
    // HOOK(S)
    const inViewRef = useRef(null);
    // Margin looks to see if any part of the element is in the centerpoint of the viewport.
    // Adjust as necessary if contact section is not going active for landscape view on narrow aspect ratio devices.
    const isInViewOfCenterpoint = useInView(inViewRef, {
      margin: '-50% 0% -50% 0%',
    });
    const isPartiallyOnScreen = useInView(inViewRef, {
      once: true,
      amount: amountOnScreen,
    });

    // EFFECT(S)
    useEffect(() => {
      if (isInViewOfCenterpoint) {
        // Upstream set's global active state to use for menu button styling
        onSectionInViewActiveCallback(isInViewOfCenterpoint);
      }
    }, [isInViewOfCenterpoint, onSectionInViewActiveCallback]);

    useEffect(() => {
      // Set's local "in view" state to use for reveal animations
      if (isPartiallyOnScreen) {
        onSectionInViewRevealCallback(isPartiallyOnScreen);
      }
    }, [isPartiallyOnScreen, onSectionInViewRevealCallback]);

    return (
      <section
        ref={scrollRef}
        data-section={sectionName}
        className={`page-section ${sectionName.toLowerCase()} ${containerClassName}`}
      >
        <div ref={inViewRef as React.RefObject<HTMLDivElement>}>
          {title && (
            <RevealWrapper
              isInView={isPartiallyOnScreen}
              containerClassName="section-reveal-wrapper"
            >
              <h2 className="section-title">
                {title}
                <span className="big-period">.</span>
              </h2>
            </RevealWrapper>
          )}
          {children}
        </div>
      </section>
    );
  },
);

InViewSection.displayName = 'InViewSection';

export default InViewSection;

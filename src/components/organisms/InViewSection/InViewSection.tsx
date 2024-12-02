import { forwardRef, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface InViewSectionProps {
  children: React.ReactNode;
  sectionKey: string;
  onInViewChange: (isInView: boolean) => void;
}

const InViewSection = forwardRef<HTMLElement, InViewSectionProps>(
  ({ children, sectionKey, onInViewChange }, scrollRef) => {
    // HOOK(S)
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, {
      amount: 0.75,
    });

    // EFFECT(S)
    useEffect(() => {
      onInViewChange(isInView);
    }, [isInView, onInViewChange]);

    return (
      <section
        ref={inViewRef}
        data-section={sectionKey}
        className={`page-section ${sectionKey.toLowerCase()}`}
      >
        <div ref={scrollRef as React.RefObject<HTMLDivElement>}>{children}</div>
      </section>
    );
  },
);

InViewSection.displayName = 'InViewSection';

export default InViewSection;

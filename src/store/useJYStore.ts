import { createRef } from 'react';
import { create } from 'zustand';
import { PAGE_SECTIONS } from '../constants/navigation';

type NavLink = (typeof PAGE_SECTIONS)[number];

// Maintains SSOT for PAGE_SECTIONS
type SectionRefs = {
  [key in NavLink]: React.RefObject<HTMLElement>;
};

interface JYState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSectionInViewScroll: (sectionKey: string, isInView: boolean) => void;
  isScrolling: boolean;
  setIsScrolling: (scrolling: boolean) => void;
  sectionRefs: SectionRefs;
}

const useJYStore = create<JYState>((set, get) => ({
  activeSection: 'Home',
  setActiveSection: (section) => {
    set({ activeSection: section });
  },
  onSectionInViewScroll: (sectionKey: string, isInView: boolean) => {
    if (isInView && !get().isScrolling) {
      get().setActiveSection(sectionKey);
    }
  },
  isScrolling: false,
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),
  // Maintains SSOT for PAGE_SECTIONS
  sectionRefs: PAGE_SECTIONS.reduce((acc, link) => {
    acc[link] = createRef<HTMLElement>();
    return acc;
  }, {} as SectionRefs),
}));

export default useJYStore;

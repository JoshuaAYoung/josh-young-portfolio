import { createRef } from 'react';
import { create } from 'zustand';
import { PAGE_SECTIONS } from '../constants/navigation';

type PageSection = (typeof PAGE_SECTIONS)[number];

// Maintains SSOT for PAGE_SECTIONS
type SectionRefs = {
  [key in PageSection]: React.RefObject<HTMLElement>;
};

interface JYState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSectionInViewActive: (sectionKey: string, isInView: boolean) => void;
  isScrolling: boolean;
  setIsScrolling: (scrolling: boolean) => void;
  sectionRefs: SectionRefs;
  isDarkMode: boolean;
  toggleDarkMode: (value: boolean) => void;
  isEasterEgg: boolean;
  toggleEasterEgg: (value: boolean) => void;
}

const useJYStore = create<JYState>((set, get) => ({
  activeSection: 'Home',
  setActiveSection: (section) => {
    set({ activeSection: section });
  },
  onSectionInViewActive: (sectionKey: string, isInView: boolean) => {
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
  isDarkMode: true,
  toggleDarkMode: (value) => {
    document.documentElement.setAttribute(
      'data-theme',
      value ? 'dark' : 'light',
    );
    set({ isDarkMode: value });
  },
  isEasterEgg: false,
  toggleEasterEgg: (value) => {
    set({ isEasterEgg: value });
  },
}));

export default useJYStore;

import { createRef } from 'react';
import { create } from 'zustand';

interface SectionRefs {
  homeRef: React.RefObject<HTMLElement>;
  aboutRef: React.RefObject<HTMLElement>;
  experienceRef: React.RefObject<HTMLElement>;
  projectsRef: React.RefObject<HTMLElement>;
  skillsRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
}

interface JYState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleScrollSection: (sectionKey: string, isInView: boolean) => void;
  isScrolling: boolean;
  setIsScrolling: (scrolling: boolean) => void;
  sectionRefs: SectionRefs;
  scrollYProgress: number;
  setScrollYProgress: (scrollYProgress: number) => void;
}

const useJYStore = create<JYState>((set, get) => ({
  activeSection: 'Home',
  setActiveSection: (section) => {
    set({ activeSection: section });
  },
  handleScrollSection: (sectionKey: string, isInView: boolean) => {
    if (isInView && !get().isScrolling) {
      get().setActiveSection(sectionKey);
    }
  },
  isScrolling: false,
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),
  sectionRefs: {
    homeRef: createRef<HTMLElement>(),
    aboutRef: createRef<HTMLElement>(),
    experienceRef: createRef<HTMLElement>(),
    projectsRef: createRef<HTMLElement>(),
    skillsRef: createRef<HTMLElement>(),
    contactRef: createRef<HTMLElement>(),
  },
  scrollYProgress: 0,
  setScrollYProgress: (scrollYProgress) => set({ scrollYProgress }),
}));

export default useJYStore;

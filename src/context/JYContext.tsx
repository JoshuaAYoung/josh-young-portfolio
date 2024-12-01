import React, { useContext, useMemo, useRef, useState } from 'react';

interface JYContextType {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  isScrolling: boolean;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
  sectionRefs: {
    homeRef: React.RefObject<HTMLElement>;
    aboutRef: React.RefObject<HTMLElement>;
    experienceRef: React.RefObject<HTMLElement>;
    projectsRef: React.RefObject<HTMLElement>;
    skillsRef: React.RefObject<HTMLElement>;
    contactRef: React.RefObject<HTMLElement>;
  };
}

interface JYContextProviderProps {
  children: React.ReactNode;
}

const JYContext = React.createContext<JYContextType | null>(null);

export function JYContextProvider({ children }: JYContextProviderProps) {
  const [activeSection, setActiveSection] = useState<string>('Home');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const sectionRefs = {
    homeRef: useRef<HTMLElement>(null),
    aboutRef: useRef<HTMLElement>(null),
    experienceRef: useRef<HTMLElement>(null),
    projectsRef: useRef<HTMLElement>(null),
    skillsRef: useRef<HTMLElement>(null),
    contactRef: useRef<HTMLElement>(null),
  };

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      isScrolling,
      setIsScrolling,
      sectionRefs,
    }),
    [activeSection, setActiveSection, sectionRefs],
  );

  return <JYContext.Provider value={value}> {children} </JYContext.Provider>;
}

export const useJYContext = (): JYContextType => {
  const context = useContext(JYContext);
  if (!context) {
    throw new Error('useJYContext must be used within a JYContextProvider');
  }
  return context;
};

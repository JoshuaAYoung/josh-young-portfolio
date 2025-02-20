import {
  ProjectCategory,
  ProjectItemType,
  TechStack,
} from '../types/projects.types';
import fireGraphScreenshot from '../assets/images/project-fire-graph.png';
import npmmScreenshot from '../assets/images/project-npmm.png';
import portfolioScreenshot from '../assets/images/project-portfolio.png';
import cloverScreenshot from '../assets/images/project-clover.png';
import teamUSAScreenshot from '../assets/images/project-team-usa.png';
import nutrienHubScreenshot from '../assets/images/project-nutrien-hub.png';

export const projectData: ProjectItemType[] = [
  {
    backgroundUrl: nutrienHubScreenshot,
    title: 'Nutrien Hub',
    description:
      'My personal portfolio website built with Next.js, TypeScript, and SCSS. It showcases my projects, skills, and experiences.',
    techStack: [TechStack.CSS, TechStack.EXPRESS, TechStack.REACT],
    githubLink: '',
    demoLink: '',
    categories: [
      ProjectCategory.NATIVE,
      ProjectCategory.NATIVE,
      ProjectCategory.PROFESSIONAL,
    ],
  },
  {
    backgroundUrl: fireGraphScreenshot,
    title: 'Fire Graph',
    description:
      'My personal portfolio website built with Next.js, TypeScript, and SCSS. It showcases my projects, skills, and experiences.',
    techStack: [TechStack.CSS, TechStack.EXPRESS, TechStack.REACT],
    githubLink: '',
    demoLink: '',
    categories: [ProjectCategory.WEB, ProjectCategory.PERSONAL],
  },
  {
    backgroundUrl: cloverScreenshot,
    title: 'Clover',
    description:
      'My personal portfolio website built with Next.js, TypeScript, and SCSS. It showcases my projects, skills, and experiences.',
    techStack: [TechStack.CSS, TechStack.EXPRESS, TechStack.REACT],
    githubLink: '',
    demoLink: '',
    categories: [ProjectCategory.WEB, ProjectCategory.PROFESSIONAL],
  },
  {
    backgroundUrl: npmmScreenshot,
    title: 'NPMM',
    description:
      'My personal portfolio website built with Next.js, TypeScript, and SCSS. It showcases my projects, skills, and experiences.',
    techStack: [TechStack.CSS, TechStack.EXPRESS, TechStack.REACT],
    githubLink: '',
    demoLink: '',
    categories: [ProjectCategory.WEB, ProjectCategory.PERSONAL],
  },
  {
    backgroundUrl: portfolioScreenshot,
    title: 'Portfolio',
    description:
      'My personal portfolio website built with Next.js, TypeScript, and SCSS. It showcases my projects, skills, and experiences.',
    techStack: [TechStack.CSS, TechStack.EXPRESS, TechStack.REACT],
    githubLink: '',
    demoLink: '',
    categories: [ProjectCategory.WEB, ProjectCategory.PERSONAL],
  },
  {
    backgroundUrl: teamUSAScreenshot,
    title: 'Team USA App',
    description:
      'My personal portfolio website built with Next.js, TypeScript, and SCSS. It showcases my projects, skills, and experiences.',
    techStack: [TechStack.CSS, TechStack.EXPRESS, TechStack.REACT],
    githubLink: '',
    demoLink: '',
    categories: [ProjectCategory.NATIVE, ProjectCategory.PROFESSIONAL],
  },
];

export const projectCategoryData = Object.values(ProjectCategory);

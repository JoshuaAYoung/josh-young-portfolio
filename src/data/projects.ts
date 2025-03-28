import { ProjectCategory, ProjectItemType } from '../types/projects.types';
import fireGraphScreenshot from '../assets/images/project-fire-graph.png';
import npmmScreenshot from '../assets/images/project-npmm.png';
import portfolioScreenshot from '../assets/images/project-portfolio.png';
import cloverScreenshot from '../assets/images/project-clover.png';
import teamUSAScreenshot from '../assets/images/project-team-usa.png';
import nutrienHubScreenshot from '../assets/images/project-nutrien-hub.png';
import ReactIcon from '../assets/icons/tech/react.svg?react';
import PostgresIcon from '../assets/icons/tech/postgresql.svg?react';
import TypescriptIcon from '../assets/icons/tech/typescript.svg?react';
import JavascriptIcon from '../assets/icons/tech/javascript.svg?react';
import GraphqlIcon from '../assets/icons/tech/gql.svg?react';
import NodeIcon from '../assets/icons/tech/node.svg?react';
import ReduxIcon from '../assets/icons/tech/redux.svg?react';
import MotionIcon from '../assets/icons/tech/framer-motion.svg?react';

export const projectData: ProjectItemType[] = [
  {
    backgroundUrl: nutrienHubScreenshot,
    title: 'Nutrien Hub',
    description:
      'Contributed to frontend and backend development of the Nutrien Ag Solutions HUB, a cross-platform app that helps farmers track weather, manage farms, and handle finances, integrating real-time data and secure account management.',
    techStack: [ReactIcon, TypescriptIcon, GraphqlIcon, NodeIcon, PostgresIcon],
    demoLink: 'https://nutrienagsolutions.com/digital-hub',
    categories: [
      ProjectCategory.NATIVE,
      ProjectCategory.WEB,
      ProjectCategory.PROFESSIONAL,
    ],
  },
  {
    backgroundUrl: fireGraphScreenshot,
    title: 'Fire Graph',
    description:
      'A simple-to-use React web utility that parses and heavily analyzes raw CSV output from kiln controllers to help the global pottery community visualize their firing data (via Recharts graph) and troubleshoot kiln issues.',
    techStack: [ReactIcon, TypescriptIcon],
    githubLink: 'https://github.com/JoshuaAYoung/firegraph-by-jay',
    demoLink: 'https://fire-graph.com',
    categories: [ProjectCategory.WEB, ProjectCategory.PERSONAL],
  },
  {
    backgroundUrl: cloverScreenshot,
    title: 'Clover',
    description:
      "Frontend development on Clover's React website, a leading point-of-sale platform. Enhanced user experience with seamless navigation, responsive design, and robust features for business management.",
    techStack: [ReactIcon, JavascriptIcon, NodeIcon, PostgresIcon],
    demoLink: 'https://clover.com',
    categories: [ProjectCategory.WEB, ProjectCategory.PROFESSIONAL],
  },
  {
    backgroundUrl: npmmScreenshot,
    title: 'NPMM',
    description:
      'Designed and developed NPMM, a React app allowing developers to browse and save npm packages, with seamless installation via a custom CLI. Contributed as a full-stack developer and sole designer in a team of 4.',
    techStack: [ReactIcon, JavascriptIcon, NodeIcon, PostgresIcon], // JS, React, Redux, Postgres
    githubLink: 'https://github.com/dannydi12/npmm-client',
    demoLink: 'https://npmm.dev',
    categories: [ProjectCategory.WEB, ProjectCategory.PERSONAL],
  },
  {
    backgroundUrl: portfolioScreenshot,
    title: 'Portfolio',
    description:
      'Yes, this website. Meta, I know. While I gathered inspiration from all over the internet, the design and every line in the codebase was built from scratch, including all of the animations.',
    techStack: [ReactIcon, TypescriptIcon, MotionIcon],
    githubLink: 'https://github.com/JoshuaAYoung/josh-young-portfolio',
    categories: [ProjectCategory.WEB, ProjectCategory.PERSONAL],
  },
  {
    backgroundUrl: teamUSAScreenshot,
    title: 'Team USA App',
    description:
      'Contributed to frontend development of the React Native Team USA mobile app, a central platform for delivering news, events, and exclusive Olympic & Paralympic content. Features include athlete bios, results tracking, live streaming, and a customizable experience.',
    techStack: [TypescriptIcon, ReactIcon, ReduxIcon],
    demoLink:
      'https://download.cnet.com/team-usa-app/3000-2117_4-76457756.html',
    categories: [ProjectCategory.NATIVE, ProjectCategory.PROFESSIONAL],
  },
];

export const projectCategoryData = Object.values(ProjectCategory);

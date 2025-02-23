import { FunctionComponent, SVGProps } from 'react';

export type SVGIconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type ProjectItemType = {
  backgroundUrl: string;
  title: string;
  techStack: SVGIconComponent[];
  description: string;
  githubLink?: string;
  demoLink?: string;
  categories: ProjectCategory[];
};

export enum ProjectCategory {
  ALL = 'All',
  PROFESSIONAL = 'Professional',
  PERSONAL = 'Personal',
  NATIVE = 'Native',
  WEB = 'Web',
}

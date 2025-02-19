export enum TechStack {
  JAVASCRIPT = 'JavaScript',
  CSS = 'CSS',
  JQUERY = 'jQuery',
  REACT = 'React',
  REACTNATIVE = 'React Native',
  TYPESCRIPT = 'TypeScript',
  EXPRESS = 'Express',
  GRAPHQL = 'GraphQL',
  NODE = 'Node.js',
  POSTGRESQL = 'PostgreSQL',
  REDUX = 'Redux',
  SEQUELIZE = 'Sequelize',
}

export type ProjectItemType = {
  backgroundUrl: string;
  title: string;
  techStack: TechStack[];
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

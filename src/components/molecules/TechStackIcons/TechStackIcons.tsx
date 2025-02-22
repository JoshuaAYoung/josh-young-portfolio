import { TechStack } from '../../../types/projects.types';

function TechStackIcons({ techStack }: { techStack: TechStack[] }) {
  return (
    <div>
      {techStack.map((stack) => (
        <img
          key={stack}
          src={`/images/tech-stack-icons/${stack}.svg`}
          alt={stack}
          className="projects-grid-tech-stack-icon"
        />
      ))}
    </div>
  );
}

export default TechStackIcons;

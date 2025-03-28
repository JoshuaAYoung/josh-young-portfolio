import { SVGIconComponent } from '../../../types/projects.types';
import './TechStackIcons.scss';

function TechStackIcons({
  techStack,
  projectKey,
}: {
  techStack: SVGIconComponent[];
  projectKey: string;
}) {
  return (
    <div className={`project-tech-stack-container icons-${techStack.length}`}>
      {techStack.map((IconComponent, index) => (
        <IconComponent
          key={`${projectKey}-${index}`}
          className="project-tech-stack-icon"
        />
      ))}
    </div>
  );
}

export default TechStackIcons;

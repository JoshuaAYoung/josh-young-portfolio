import { forwardRef } from 'react';
import './Projects.scss';

const Projects = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="page-section projects">
    <h2 style={{ fontSize: 50, color: 'black' }}>Projects</h2>
  </section>
));

Projects.displayName = 'Projects';

export default Projects;

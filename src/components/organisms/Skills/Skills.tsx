import { forwardRef } from 'react';
import './Skills.scss';

const Skills = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="page-section skills">
    <h2 style={{ fontSize: 50, color: 'black' }}>Skills</h2>
  </section>
));

Skills.displayName = 'Skills';

export default Skills;

import './Experience.scss';
import { forwardRef } from 'react';

const Experience = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="page-section experience">
    <h2 style={{ fontSize: 50, color: 'black' }}>Experience</h2>
  </section>
));

Experience.displayName = 'Experience';

export default Experience;

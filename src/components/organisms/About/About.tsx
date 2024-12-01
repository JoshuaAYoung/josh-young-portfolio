import { forwardRef } from 'react';
import './About.scss';

const About = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="page-section about">
    <h2 style={{ fontSize: 50, color: 'black' }}>About</h2>
  </section>
));

About.displayName = 'About';

export default About;

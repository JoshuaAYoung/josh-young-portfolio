import { forwardRef } from 'react';
import './Contact.scss';

const Contact = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="page-section contact">
    <h2 style={{ fontSize: 50, color: 'black' }}>Contact</h2>
  </section>
));

Contact.displayName = 'Contact';

export default Contact;

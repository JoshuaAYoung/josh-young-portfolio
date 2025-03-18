import { forwardRef, useState } from 'react';
import './Contact.scss';
import { motion } from 'motion/react';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import EmailIcon from '../../../assets/icons/email.svg?react';
import PhoneIcon from '../../../assets/icons/phone.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import missoulaMapDark from '../../../assets/images/missoula-map-dark.png';
import missoulaMapLight from '../../../assets/images/missoula-map-light.png';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';
import { getContactRevealVariants } from './contactAnimations';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const minLgWidth = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const isDarkMode = useJYStore((state) => state.isDarkMode);
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // TODO Handle form submission and validation logic here
  };

  return (
    <InViewSection
      sectionName="Contact"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Contact', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Get In Touch"
    >
      <div className="contact-container">
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial="hidden"
          variants={getContactRevealVariants(0)}
          animate={isInViewReveal ? 'reveal' : undefined}
        >
          <div className="contact-form-name-email">
            <label htmlFor="name" className="contact-sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="* Name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-labelledby="name"
            />
            <label htmlFor="email" className="contact-sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="* Email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-labelledby="email"
            />
          </div>

          <label htmlFor="subject" className="contact-sr-only">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="* Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            aria-labelledby="subject"
          />
          <label htmlFor="message" className="contact-sr-only">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="* Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            aria-labelledby="message"
          />
          <SwipeButton
            variant="solid-secondary"
            onClick={handleSubmit}
            extraWide
            containerClassName="contact-submit-button"
            size={maxMdWidth ? 'small' : 'medium'}
          >
            SEND MESSAGE
          </SwipeButton>
        </motion.form>
        <div className="contact-info-container">
          <motion.div
            className="contact-info"
            initial="hidden"
            variants={getContactRevealVariants(minLgWidth ? 1 : 2)}
            animate={isInViewReveal ? 'reveal' : undefined}
          >
            <a
              href="tel:+13039136955"
              className="contact-info-item"
              aria-label="Call Me"
            >
              <PhoneIcon className="contact-info-icon" width="3rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">Phone</h3>
                <p className="contact-info-text">(303) 913-6955</p>
              </div>
            </a>
            <a
              href="mailto:joshua@young.net"
              className="contact-info-item"
              aria-label="Email Me"
            >
              <EmailIcon className="contact-info-icon" width="3.6rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">Email</h3>
                <p className="contact-info-text">joshua@young.net</p>
              </div>
            </a>
            <a
              href="https://maps.app.goo.gl/r8YG1kfwabzJ5CFt7"
              className="contact-info-item location"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps Location"
            >
              <LocationIcon className="contact-info-icon" width="2.8rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">Location</h3>
                <p className="contact-info-text">
                  341 North Ave East
                  <span className="contact-info-break">,</span>
                  <br className="contact-info-break" /> Missoula, MT 59801
                </p>
              </div>
            </a>
          </motion.div>
          <motion.div
            className="contact-map-container"
            initial="hidden"
            variants={getContactRevealVariants(minLgWidth ? 2 : 1)}
            animate={isInViewReveal ? 'reveal' : undefined}
          >
            <picture>
              {isDarkMode ? (
                <source srcSet={missoulaMapDark} />
              ) : (
                <source srcSet={missoulaMapLight} />
              )}
              <img
                src={isDarkMode ? missoulaMapDark : missoulaMapLight}
                alt="josh young portrait"
              />
            </picture>
          </motion.div>
        </div>
      </div>
    </InViewSection>
  );
});

Contact.displayName = 'Contact';

export default Contact;

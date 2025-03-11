import { forwardRef, useState } from 'react';
import './Contact.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import EmailIcon from '../../../assets/icons/email.svg?react';
import PhoneIcon from '../../../assets/icons/phone.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import LinkedInIcon from '../../../assets/icons/linkedin.svg?react';
import missoulaMapDark from '../../../assets/images/missoula-map-dark.png';
import missoulaMapLight from '../../../assets/images/missoula-map-light.png';

const Contact = forwardRef<HTMLElement>((props, ref) => {
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-name-email">
            <label htmlFor="name" className="contact-sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
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
              placeholder="Email"
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
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            aria-labelledby="subject"
          />
          <label htmlFor="message" className="contact-sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows={4}
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
          >
            SEND MESSAGE
          </SwipeButton>
        </form>
        <div className="contact-info-container">
          <div className="contact-info">
            <a href="tel:+13039136955" className="contact-info-item">
              <PhoneIcon className="contact-info-icon" width="3rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">Phone</h3>
                <p className="contact-info-text">(303) 913-6955</p>
              </div>
            </a>
            <a href="mailto:joshua@young.net" className="contact-info-item">
              <EmailIcon className="contact-info-icon" width="3.6rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">Email</h3>
                <p className="contact-info-text">joshua@young.net</p>
              </div>
            </a>
            <div className="contact-info-item location">
              <LocationIcon className="contact-info-icon" width="2.8rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">Location</h3>
                <p className="contact-info-text">
                  341 North Ave East
                  <span className="contact-info-break">,</span>
                  <br className="contact-info-break" /> Missoula, MT 59801
                </p>
              </div>
            </div>
            {/* <a
              href="https://www.linkedin.com/in/joshayoung/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <LinkedInIcon className="contact-info-icon" width="3.2rem" />
              <div className="contact-info-text-container">
                <h3 className="contact-info-title">LinkedIn</h3>
                <p className="contact-info-text">joshayoung</p>
              </div>
            </a> */}
          </div>
          <div className="contact-map-container">
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
          </div>
        </div>
      </div>
    </InViewSection>
  );
});

Contact.displayName = 'Contact';

export default Contact;

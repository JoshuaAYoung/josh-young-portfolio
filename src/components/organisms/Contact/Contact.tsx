import { forwardRef, useEffect, useState } from 'react';
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [passedRecaptcha, setPassedRecaptcha] = useState(false);
  const [infoData, setInfoData] = useState({
    phone: 'KDMwMykgOTEzLTY5NTU=',
    address: 'MzQxIE5vcnRoIEF2ZSBFYXN0',
    cityStateZip: 'TWlzc291bGEsIE1UIDU5ODAx',
  });
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
    setSubmitError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setSubmitLoading(true);
    setSubmitError(false);

    if (!window.grecaptcha) {
      console.error('reCAPTCHA not yet loaded');
      setSubmitLoading(false);
      setSubmitError(true);
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        '6LdCigorAAAAADeS2z6QgarsScvc7iM_txku2Tum',
        {
          action: 'submit',
        },
      );

      if (!token) {
        throw new Error('No token received from reCAPTCHA');
      }

      const formDataToSend = {
        ...formData,
        'g-recaptcha-response': token,
        access_key: 'your-access-key-here',
      };

      // Fetch request with better error handling
      const res = await fetch('https://formcarry.com/s/eSqR9o7Q8wM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setSubmitLoading(false);
      } else {
        setSubmitLoading(false);
        setSubmitError(true);
        console.error('Form submission failed:', data);
      }
    } catch (err) {
      setSubmitLoading(false);
      setSubmitError(true);
      // Enhanced error logging
      console.error('Error submitting form:', err);
      if (err instanceof Error) {
        console.error('Error message:', err.message);
      }
    }
  };

  // EFFECT(S)
  useEffect(() => {
    // Check recaptchaV3 score and decode info if passes
    const runRecaptcha = async () => {
      if (!window.grecaptcha) return;
      const token = await window.grecaptcha.execute(
        '6LcpkgorAAAAAJ5nZVExcf5VlHB23ldzleJDDcTm',
        {
          action: 'contact_info',
        },
      );

      const scoreRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await scoreRes.json();
      if (data.success && data.score > 0.5) {
        const decodedInfoData = Object.fromEntries(
          Object.entries(infoData).map(([key, value]) => [key, atob(value)]),
        ) as { phone: string; address: string; cityStateZip: string };
        setPassedRecaptcha(true);
        setInfoData(decodedInfoData);
      }
    };
    if (isInViewReveal) {
      runRecaptcha();
    }
  }, [isInViewReveal]);

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
            extraWide
            isSubmit
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
                <p className="contact-info-text">
                  {passedRecaptcha ? infoData.phone : '(###) ###-#####'}
                </p>
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
                  {passedRecaptcha ? infoData.address : '123 You Failed'}
                  <span className="contact-info-break">,</span>
                  <br className="contact-info-break" />{' '}
                  {passedRecaptcha
                    ? infoData.cityStateZip
                    : 'The, ReCaptcha 12345'}
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

import './SocialNavLinks.scss';
import EmailIcon from '../../../assets/icons/email.svg?react';
import LinkedInIcon from '../../../assets/icons/linkedin.svg?react';
import GitHubIcon from '../../../assets/icons/github.svg?react';

function SocialNavLinks({
  containerClassName,
}: {
  containerClassName?: string;
}) {
  return (
    <div className={`social-nav-links-container ${containerClassName}`}>
      <a
        href="mailto:joshua@young.net"
        aria-label="Email"
        className="social-nav-links-anchor"
      >
        <EmailIcon className="social-nav-links-image" />
      </a>
      <a
        href="https://www.linkedin.com/in/joshayoung/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="social-nav-links-anchor"
      >
        <LinkedInIcon className="social-nav-links-image" />
      </a>
      <a
        href="https://github.com/joshuaayoung"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="social-nav-links-anchor"
      >
        <GitHubIcon className="social-nav-links-image" />
      </a>
    </div>
  );
}

export default SocialNavLinks;

import './Footer.scss';
import EmailIconCircle from '../../../assets/icons/email-circle.svg?react';
import LinkedInIconCircle from '../../../assets/icons/linkedin-circle.svg?react';
import GithubIcon from '../../../assets/icons/github.svg?react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightInitial = `© ${currentYear} `;

  return (
    <div className="footer-container">
      <div className="footer-links-container">
        <a
          href="https://www.linkedin.com/in/joshayoung/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="footer-link-button"
        >
          <LinkedInIconCircle className="footer-link-button-image" />
        </a>
        <a
          href="https://github.com/joshuaayoung"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="footer-link-button"
        >
          <GithubIcon className="footer-link-button-image" />
        </a>
        <a
          href="mailto:joshua@young.net"
          aria-label="Email"
          className="footer-link-button"
        >
          <EmailIconCircle className="footer-link-button-image" />
        </a>
      </div>
      {/* TODO add JY logo instead of a slash */}
      <div className="footer-slash" />
      <p className="footer-copyright">
        {copyrightInitial}
        <span className="footer-copyright-name">Josh Young</span>
      </p>
    </div>
  );
}

export default Footer;

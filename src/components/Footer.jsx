import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import NewsletterForm from './forms/NewsletterForm.jsx';
import { business } from '../data/business.js';
import { services } from '../data/services.js';

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Request Consultation', to: '/request-consultation' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <img
              className="foot-logo"
              src={business.logo}
              alt={`${business.legalName} logo`}
              width="200"
              height="44"
            />
            <p className="slogan">{business.slogan}</p>
            <p>
              Non-medical in-home care. Planned service area:{' '}
              {business.areaServed.join(' and ')}.
            </p>
          </div>

          <div>
            <h3>Company</h3>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Services</h3>
            <ul className="foot-svc">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.href}>{s.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="foot-contact">
              <li>
                <Icon name="phone" size={18} />
                <a href={business.phoneHref}>{business.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={business.emailHref}>{business.email}</a>
              </li>
              <li>
                <Icon name="pin" size={18} />
                <span>{business.addressText}</span>
              </li>
              <li>
                <Icon name="clock" size={18} />
                <span>{business.hours}</span>
              </li>
            </ul>
            <NewsletterForm />
          </div>
        </div>

        <div className="foot-bottom">
          <p>
            © {year} {business.legalName}. All rights reserved.
          </p>
          <p className="foot-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          </p>
          <p className="foot-disc">
            Non-medical home care. Website content is general information, not
            medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { business } from '../data/business.js';
import { services } from '../data/services.js';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { pathname } = useLocation();
  const navId = 'primary-nav';
  const megaRef = useRef(null);

  // Close menus on route change.
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="site-header ad">
      <div className="wrap nav-wrap">
        <Link className="brand" to="/" aria-label={`${business.name} home`}>
          <img
            src={business.logo}
            alt={`${business.legalName} logo`}
            width="245"
            height="54"
          />
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={navId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={28} />
        </button>

        <nav
          id={navId}
          className={`nav ${open ? 'open' : ''}`.trim()}
          aria-label="Main"
        >
          <div
            ref={megaRef}
            className={`has-mega ${megaOpen ? 'open' : ''}`.trim()}
          >
            <button
              type="button"
              className="mega-trigger"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
            >
              Services <Icon name="chevronDown" size={16} />
            </button>
            <div className="mega" role="menu">
              <div className="mega-grid">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    className="mega-item"
                    to={s.href}
                    role="menuitem"
                  >
                    <Icon name={s.iconKey} size={22} />
                    <span>
                      <strong>{s.shortTitle}</strong>
                      <small>{s.blurb}</small>
                    </span>
                  </Link>
                ))}
              </div>
              <Link className="mega-all" to="/services">
                View all services <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'current' : '')}
            >
              {l.label}
            </NavLink>
          ))}

          <a className="nav-phone" href={business.phoneHref}>
            <Icon name="phone" size={18} /> {business.phone}
          </a>
          <Link className="nav-cta btn btn-primary" to="/request-consultation">
            Request Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}

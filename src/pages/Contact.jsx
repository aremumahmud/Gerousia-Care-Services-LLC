import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { Container, Kicker } from '../components/ui/Section.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';
import { contactContent } from '../data/contact.js';
import { business } from '../data/business.js';
import {
  organizationSchema,
  breadcrumbSchema,
} from '../utils/structuredData.js';

const s = (type) => contactContent.sections.find((sec) => sec.type === type);

const rowIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('call') || l.includes('phone')) return 'phone';
  if (l.includes('email')) return 'mail';
  if (l.includes('hour')) return 'clock';
  return 'pin';
};

export default function Contact() {
  const hero = s('hero');
  const details = s('contact_details');
  const rows = details.rows.filter((r) => !/^\[.*\]$/.test(r.value));

  return (
    <div className="page active">
      <Seo
        title="Contact Us"
        description={contactContent.meta.description}
        keywords="contact Gerousia Care Services, home care Austin phone, home care San Antonio, request care"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <section className="contact2">
        <Container className="contact2-grid">
          <div className="contact2-l">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact' }]} />
            <Kicker>{hero.kicker}</Kicker>
            <h1>{hero.heading}</h1>
            <p className="lead">{hero.lead}</p>

            <div className="c-rows card">
              {rows.map((row) => (
                <div className="c-row" key={row.label}>
                  <span className="circ" aria-hidden="true">
                    <Icon name={rowIcon(row.label)} size={26} />
                  </span>
                  <div>
                    <small>{row.label}</small>
                    <p>
                      {row.href ? (
                        <a href={row.href}>{row.value}</a>
                      ) : row.label.toLowerCase().includes('email') ? (
                        <a href={business.emailHref}>{row.value}</a>
                      ) : (
                        row.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact2-r">
            <ContactForm dark />
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="sec white">
        <Container>
          <div className="map-ph" role="img" aria-label={`Map of our planned service area: ${business.areaServed.join(' and ')}`}>
            <Icon name="pin" size={34} />
            <p>
              <strong>Serving {business.areaServed.join(' & ')}</strong>
            </p>
            <p className="map-note">
              {business.serviceAreaNote} An interactive map will appear here once
              our office location is published.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

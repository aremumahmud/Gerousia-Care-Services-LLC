import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { Container, Kicker } from '../components/ui/Section.jsx';
import ConsultationForm from '../components/forms/ConsultationForm.jsx';
import { business } from '../data/business.js';
import { breadcrumbSchema } from '../utils/structuredData.js';

const steps = [
  'We listen first — your routines, preferences and what matters most.',
  'We answer your questions about non-medical home care.',
  'Together we outline a personalized service plan.',
];

export default function RequestConsultation() {
  return (
    <div className="page active">
      <Seo
        title="Request a Consultation"
        description={`Request a free, no-obligation home care consultation with ${business.name}. Serving ${business.areaServed.join(' and ')}.`}
        keywords="request home care consultation Austin, San Antonio home care consultation, free care assessment"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Request Consultation', path: '/request-consultation' },
        ])}
      />

      <section className="contact2">
        <Container className="contact2-grid">
          <div className="contact2-l">
            <Breadcrumbs
              items={[{ name: 'Home', path: '/' }, { name: 'Request Consultation' }]}
            />
            <Kicker>Request a consultation</Kicker>
            <h1>Let’s talk about the care you need</h1>
            <p className="lead">
              Tell us a little about your situation and we’ll follow up to arrange
              a time that works for you. Consultations are free and there’s no
              obligation.
            </p>

            <ul className="check-list consult-steps">
              {steps.map((step) => (
                <li key={step}>
                  <Icon name="check" size={18} /> <span>{step}</span>
                </li>
              ))}
            </ul>

            <p className="area-status">
              <Icon name="pin" size={18} /> Planned service area:{' '}
              {business.areaServed.join(' and ')}.
            </p>
            <p>
              Prefer to talk now? Call{' '}
              <a href={business.phoneHref}>{business.phone}</a>.
            </p>
          </div>

          <div className="contact2-r">
            <ConsultationForm />
          </div>
        </Container>
      </section>
    </div>
  );
}

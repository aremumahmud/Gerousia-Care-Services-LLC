import { useParams, Navigate, Link } from 'react-router-dom';
import Seo from '../../components/Seo.jsx';
import Icon from '../../components/Icon.jsx';
import Button from '../../components/ui/Button.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import { Container, Kicker } from '../../components/ui/Section.jsx';
import CtaBand from '../../components/sections/CtaBand.jsx';
import { services, getService } from '../../data/services.js';
import { business } from '../../data/business.js';
import {
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from '../../utils/structuredData.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/services" replace />;

  const faqsSection = service.sections.find((s) => s.faqs);
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.shortTitle, path: service.href },
    ]),
    serviceSchema(service),
  ];
  if (faqsSection) jsonLd.push(faqSchema(faqsSection.faqs));

  return (
    <div className="page active">
      <Seo
        title={service.title}
        description={service.metaDescription}
        keywords={`${service.shortTitle}, home care Austin, home care San Antonio, non-medical home care`}
        jsonLd={jsonLd}
        type="article"
      />

      <section className="page-hero">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.shortTitle },
            ]}
          />
          <Kicker>{service.kicker}</Kicker>
          <h1>{service.title}</h1>
          {service.heroBody?.[0] && <p className="lead">{service.heroBody[0]}</p>}
        </Container>
      </section>

      <section className="sec white">
        <Container className="with-side">
          <div className="content prose">
            <img
              className="svc-hero-img"
              src={`/images/${service.image}`}
              alt={service.shortTitle}
              width="760"
              height="420"
            />
            {service.heroBody?.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}

            {service.sections.map((sec, i) => (
              <div key={i} className="svc-section">
                {sec.heading && <h2>{sec.heading}</h2>}
                {sec.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {sec.list && (
                  <ul className="check-list cols">
                    {sec.list.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={18} /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.faqs && (
                  <div className="faqs">
                    {sec.faqs.map((faq) => (
                      <details key={faq.question}>
                        <summary>
                          {faq.question}
                          <Icon name="chevronDown" size={18} />
                        </summary>
                        <p>{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="post-cta">
              <p>
                <strong>Not sure which service fits?</strong> Call{' '}
                <a href={business.phoneHref}>{business.phone}</a> and we’ll help
                you figure it out, or{' '}
                <Link to="/request-consultation">request a consultation</Link>.
              </p>
            </div>
          </div>

          <aside className="side">
            <div className="side-card call-card">
              <h3>Talk with us about care</h3>
              <p>We’ll listen first and answer your questions.</p>
              <Button href={business.phoneHref} variant="gold" icon="phone">
                {business.phone}
              </Button>
              <Button href="/request-consultation" variant="outline">
                Request Consultation
              </Button>
            </div>

            <div className="side-card">
              <h3>Other services</h3>
              <ul className="side-list">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link to={s.href}>
                        <Icon name={s.iconKey} size={18} /> {s.shortTitle}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}

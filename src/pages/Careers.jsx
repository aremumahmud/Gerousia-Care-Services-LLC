import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { Container, Kicker, SectionHead } from '../components/ui/Section.jsx';
import CareersForm from '../components/forms/CareersForm.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import { careersContent } from '../data/careers.js';
import { business } from '../data/business.js';
import { breadcrumbSchema } from '../utils/structuredData.js';

const s = (type) => careersContent.sections.find((sec) => sec.type === type);

export default function Careers() {
  const hero = s('hero');
  const intro = s('intro');
  const positions = s('open_positions');
  const requirements = s('requirements');
  const applyCta = s('application_cta');
  const sidebar = s('sidebar');

  return (
    <div className="page active">
      <Seo
        title="Caregiver Jobs in Austin & San Antonio, TX"
        description={careersContent.meta.description}
        keywords="caregiver jobs Austin, caregiver jobs San Antonio, companion jobs, homemaker jobs, personal care attendant, home care careers Texas"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ])}
      />

      <section className="page-hero">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Careers' }]} />
          <Kicker>{hero.kicker}</Kicker>
          <h1>{hero.heading}</h1>
          <p className="lead">{hero.lead}</p>
        </Container>
      </section>

      {/* Intro / culture */}
      <section className="sec white">
        <Container className="narrow center">
          {intro.body.map((p) => (
            <p key={p} className="lead">
              {p}
            </p>
          ))}
        </Container>
      </section>

      {/* Open positions */}
      <section className="sec tint">
        <Container>
          <SectionHead kicker="Open roles" heading="Positions we’re hiring for" />
          {positions.positions.map((pos) => (
            <div className="job" key={pos.title}>
              <div className="job-head">
                <span className="circ" aria-hidden="true">
                  <Icon name="users" size={26} />
                </span>
                <div>
                  <h2>{pos.title}</h2>
                  <p className="meta">{pos.meta}</p>
                </div>
              </div>
              <h3 className="about-h3">{pos.whatYouWillDoHeading}</h3>
              <ul className="check-list cols">
                {pos.whatYouWillDo.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>

      {/* What we look for + Why join */}
      <section className="sec white">
        <Container className="split">
          <div>
            <Kicker>What we look for</Kicker>
            <h2>{requirements.heading}</h2>
            <ul className="check-list">
              {requirements.items.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="side-card">
            {sidebar.cards.map((card) => (
              <div key={card.heading} className="why-card">
                <h3>{card.heading}</h3>
                {card.body && <p>{card.body}</p>}
                {card.items && (
                  <ul className="check-list">
                    {card.items.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={18} /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {card.cta && (
                  <Button href={card.cta.href} variant="outline" icon="phone">
                    {card.cta.label}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section className="sec tint" id="apply">
        <Container className="narrow">
          <SectionHead kicker="Apply" heading={applyCta.heading}>
            <p>
              Tell us a little about yourself. We’ll be in touch as we prepare to
              begin services across {business.areaServed.join(' and ')}.
            </p>
          </SectionHead>
          <CareersForm />
        </Container>
      </section>

      <CtaBand
        heading="Have questions about joining our team?"
        body="Call our office to ask about open roles and what it’s like to care with Gerousia."
        ctas={[
          { label: `Call ${business.phone}`, href: business.phoneHref, variant: 'gold' },
          { label: 'Apply now', href: '#apply', variant: 'ghost' },
        ]}
      />
    </div>
  );
}

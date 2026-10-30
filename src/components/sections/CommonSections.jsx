import Icon from '../Icon.jsx';
import Button from '../ui/Button.jsx';
import ServiceCard from '../ui/ServiceCard.jsx';
import Breadcrumbs from '../ui/Breadcrumbs.jsx';
import { Container, Kicker, SectionHead } from '../ui/Section.jsx';
import { services } from '../../data/services.js';
import { business } from '../../data/business.js';

export function PageHero({ breadcrumbItems, kicker, heading, lead }) {
  return (
    <section className="page-hero">
      <Container>
        {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
        {kicker && <Kicker>{kicker}</Kicker>}
        <h1>{heading}</h1>
        {lead && <p className="lead">{lead}</p>}
      </Container>
    </section>
  );
}

const valueIcons = ['heart', 'shield', 'roofHeart', 'users'];

export function ValuesGrid({ kicker, heading, items, tone = 'tint' }) {
  return (
    <section className={`sec ${tone}`.trim()}>
      <Container>
        <SectionHead kicker={kicker} heading={heading} />
        <div className="guide-grid">
          {items.map((item, i) => (
            <div className="guide" key={item.title}>
              <span className="circ lg" aria-hidden="true">
                <Icon name={valueIcons[i % valueIcons.length]} size={34} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function MissionVision({ kicker, heading, cards }) {
  return (
    <section className="mv">
      <Container>
        <SectionHead kicker={kicker} heading={heading} />
        <div className="mv-grid">
          {cards.map((card, i) => (
            <div className="mv-card" key={card.label}>
              <span className={`mv-ic ${i === 1 ? 'g' : ''}`.trim()} aria-hidden="true">
                <Icon name={i === 0 ? 'heart' : 'leaf'} size={26} />
              </span>
              <p className="mv-l">{card.label}</p>
              <p className="mv-p">{card.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Founder({ kicker, quote, attribution, image, tone = 'white' }) {
  return (
    <section className={`sec ${tone}`.trim()}>
      <Container className="founder">
        <div className="founder-art">
          <img
            className="ph ph-founder"
            src={`/images/${image.file}`}
            alt={`${business.founder.name}, ${business.founder.role}`}
            loading="lazy"
            width="600"
            height="667"
          />
        </div>
        <div className="founder-copy">
          <Kicker>{kicker}</Kicker>
          <span className="q-mark" aria-hidden="true">“</span>
          <blockquote className="founder-q">{quote}</blockquote>
          <p className="founder-by">{attribution}</p>
        </div>
      </Container>
    </section>
  );
}

export function ServicesGrid({ kicker, heading, body, intro, areaStatus, cta, tone = 'white' }) {
  return (
    <section className={`sec ${tone}`.trim()}>
      <Container>
        {(kicker || heading) && <SectionHead kicker={kicker} heading={heading}>{body && <p>{body}</p>}</SectionHead>}
        {intro && <p className="lead center narrow">{intro}</p>}
        {areaStatus && (
          <p className="area-status c">
            <Icon name="pin" size={18} /> {areaStatus}
          </p>
        )}
        <div className="svc-boxes">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        {cta && (
          <p className="sec-cta center">
            <Button href={cta.href} variant="outline" withArrow>
              {cta.label}
            </Button>
          </p>
        )}
      </Container>
    </section>
  );
}

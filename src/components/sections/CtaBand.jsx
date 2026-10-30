import Icon from '../Icon.jsx';
import Button from '../ui/Button.jsx';
import { Container } from '../ui/Section.jsx';
import { business } from '../../data/business.js';

export default function CtaBand({
  heading = 'Let’s Talk About Care',
  body = 'Whether you’re exploring support for yourself or someone you love, we welcome the opportunity to learn what matters to you. Contact us about upcoming services.',
  areaStatus = `Planned service area: ${business.areaServed.join(' and ')}.`,
  ctas = [
    { label: 'Talk With Us About Care', href: '/contact', variant: 'gold' },
    { label: `Call ${business.phone}`, href: business.phoneHref, variant: 'ghost' },
  ],
}) {
  return (
    <section className="cta-band">
      <Container className="cta-inner">
        <Icon name="roofHeart" className="cta-roof" size={64} />
        <div>
          <h2>{heading}</h2>
          {body && <p>{body}</p>}
          {areaStatus && (
            <p className="cta-area">
              <Icon name="pin" size={18} /> {areaStatus}
            </p>
          )}
        </div>
        <div className="cta-btns">
          {ctas.map((c) => (
            <Button key={c.label} href={c.href} variant={c.variant || 'gold'}>
              {c.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
}

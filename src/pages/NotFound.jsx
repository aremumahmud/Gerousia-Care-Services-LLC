import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Button from '../components/ui/Button.jsx';
import { Container, Kicker } from '../components/ui/Section.jsx';
import { services } from '../data/services.js';

export default function NotFound() {
  return (
    <div className="page active">
      <Seo title="Page Not Found" description="The page you’re looking for can’t be found." noindex />

      <section className="page-hero">
        <Container className="center narrow">
          <Kicker centered>404</Kicker>
          <h1>We couldn’t find that page</h1>
          <p className="lead">
            The page you’re looking for may have moved or no longer exists. Let’s
            get you back to where you need to be.
          </p>
          <div className="hero-btns center-btns">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <Button href="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </Container>
      </section>

      <section className="sec white">
        <Container className="center narrow">
          <h2>Explore our services</h2>
          <ul className="nf-links">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={s.href}>{s.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}

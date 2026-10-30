import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import PostCard from '../components/ui/PostCard.jsx';
import { Container, SectionHead, Kicker } from '../components/ui/Section.jsx';
import {
  ValuesGrid,
  MissionVision,
  Founder,
  ServicesGrid,
} from '../components/sections/CommonSections.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import { homePage } from '../data/pages.js';
import { business } from '../data/business.js';
import { posts } from '../data/posts.js';
import {
  organizationSchema,
  websiteSchema,
} from '../utils/structuredData.js';

const s = (type) => homePage.sections.find((sec) => sec.type === type);

export default function Home() {
  const hero = s('hero');
  const intro = s('intro');
  const values = s('values-grid');
  const servicesGrid = s('services-grid');
  const founder = s('founder');
  const mv = s('mission-vision');
  const process = s('process-steps');
  const gallery = s('gallery');
  const contact = s('contact');
  const blogPreview = s('blog-preview');
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="page active">
      <Seo
        title="Home Care in Austin & San Antonio, TX"
        description={homePage.description}
        keywords="home care Austin, home care San Antonio, non-medical home care, senior care Texas, caregiver, companion care, respite care, dementia care"
        jsonLd={[organizationSchema(), websiteSchema()]}
      />

      {/* Hero */}
      <section className="hero4">
        <Container className="hero4-grid">
          <div className="hero4-copy">
            <Kicker>{hero.kicker}</Kicker>
            <p className="hero-tag">{hero.tagline}</p>
            <h1>{hero.heading}</h1>
            <p className="lead">{hero.body}</p>
            <div className="hero-btns">
              {hero.ctas.map((c, i) => (
                <Button key={c.label} href={c.href} variant={i === 0 ? 'primary' : 'outline'}>
                  {c.label}
                </Button>
              ))}
            </div>
            <ul className="hero-checks">
              {hero.checks.map((c) => (
                <li key={c}>
                  <Icon name="check" size={20} /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero4-art">
            <img
              className="ph-hero4"
              src={`/images/${hero.image.file}`}
              alt="A Gerousia caregiver and an older adult smiling together at home"
              width="560"
              height="620"
              fetchPriority="high"
            />
          </div>
        </Container>
      </section>

      {/* Intro / meaning of the name */}
      <section className="sec tint">
        <Container className="means">
          <div className="means-art">
            <img
              className="ph-means"
              src={`/images/${intro.image.file}`}
              alt="A caregiver and senior laughing together in a bright living room"
              loading="lazy"
              width="560"
              height="420"
            />
            {intro.image.overlayCard && (
              <div className="means-card">
                <strong>{intro.image.overlayCard.name}</strong>
                <span>
                  <Icon name="pin" size={16} /> {intro.image.overlayCard.location}
                </span>
              </div>
            )}
          </div>
          <div className="means-copy">
            <Kicker>{intro.kicker}</Kicker>
            <h2>{intro.heading}</h2>
            {intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <ValuesGrid kicker={values.kicker} heading={values.heading} items={values.items} tone="white" />

      <ServicesGrid
        kicker={servicesGrid.kicker}
        heading={servicesGrid.heading}
        body={servicesGrid.body}
        cta={servicesGrid.cta}
        tone="tint"
      />

      <Founder {...founder} tone="white" />

      <MissionVision kicker={mv.kicker} heading={mv.heading} cards={mv.cards} />

      {/* Process */}
      <section className="sec tint">
        <Container>
          <SectionHead kicker={process.kicker} heading={process.heading}>
            <p>{process.body}</p>
          </SectionHead>
          <ol className="steps3">
            {process.steps.map((step) => (
              <li key={step.number}>
                <span className="s3-n">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="sec-cta center">
            <Button href={process.cta.href} variant="primary" withArrow>
              {process.cta.label}
            </Button>
          </p>
        </Container>
      </section>

      {/* Gallery */}
      <section className="sec white">
        <Container>
          <SectionHead kicker={gallery.kicker} heading={gallery.heading} />
          <div className="look-grid">
            {gallery.images.map((img) => (
              <img
                key={img.file}
                className="ph-look"
                src={`/images/${img.file}`}
                alt={img.subject}
                loading="lazy"
                width="300"
                height="300"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Contact block */}
      <section className="sec tint">
        <Container className="area2-in">
          <div>
            <Kicker>{contact.kicker}</Kicker>
            <h2>{contact.heading}</h2>
            <p>{contact.body}</p>
            <p className="area-status">
              <Icon name="pin" size={18} /> {contact.areaStatus}
            </p>
            <Button href={contact.cta.href} variant="primary" icon="phone">
              {contact.cta.label}
            </Button>
          </div>
          <div className="c-rows card">
            {contact.contactRows
              .filter((r) => !/^\[.*\]$/.test(r.value))
              .map((row) => (
                <div className="c-row" key={row.label}>
                  <span className="circ" aria-hidden="true">
                    <Icon
                      name={
                        row.label === 'Phone'
                          ? 'phone'
                          : row.label === 'Email'
                          ? 'mail'
                          : row.label === 'Office hours'
                          ? 'clock'
                          : 'pin'
                      }
                      size={26}
                    />
                  </span>
                  <div>
                    <small>{row.label}</small>
                    <p>
                      {row.label === 'Email' ? (
                        <a href={business.emailHref}>{row.value}</a>
                      ) : row.href ? (
                        <a href={row.href}>{row.value}</a>
                      ) : (
                        row.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Container>
      </section>

      {/* Blog preview */}
      <section className="sec white">
        <Container>
          <SectionHead kicker={blogPreview.kicker} heading={blogPreview.heading} />
          <div className="post-grid">
            {latestPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <p className="sec-cta center">
            <Button href="/blog" variant="outline" withArrow>
              View all articles
            </Button>
          </p>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}

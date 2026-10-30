import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import { Container, Kicker } from '../components/ui/Section.jsx';
import {
  PageHero,
  ValuesGrid,
  MissionVision,
  Founder,
} from '../components/sections/CommonSections.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import { aboutPage } from '../data/pages.js';
import {
  organizationSchema,
  breadcrumbSchema,
} from '../utils/structuredData.js';

const s = (type) => aboutPage.sections.find((sec) => sec.type === type);

export default function About() {
  const hero = s('page-hero');
  const who = s('who-we-are');
  const mv = s('mission-vision');
  const founder = s('founder');
  const values = s('values-grid');
  const serve = s('who-we-serve');

  return (
    <div className="page active">
      <Seo
        title="About Us"
        description={aboutPage.description}
        keywords="about Gerousia Care Services, veteran owned home care, Austin San Antonio senior care, non-medical home care mission"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ]),
        ]}
      />

      <PageHero
        breadcrumbItems={[{ name: 'Home', path: '/' }, { name: 'About Us' }]}
        kicker={hero.kicker}
        heading={hero.heading}
        lead={hero.lead}
      />

      {/* Who we are */}
      <section className="sec white">
        <Container className="means">
          <div className="means-art">
            <img
              className="ph-means"
              src={`/images/${who.image.file}`}
              alt="The Gerousia Care Services approach to home care"
              loading="lazy"
              width="560"
              height="420"
            />
          </div>
          <div className="means-copy">
            <Kicker>{who.kicker}</Kicker>
            <h2>{who.heading}</h2>
            {who.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h3 className="about-h3">{who.subheading}</h3>
            {who.subBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <MissionVision kicker={mv.kicker} heading={mv.heading} cards={mv.cards} />

      <Founder {...founder} tone="white" />

      <ValuesGrid kicker={values.kicker} heading={values.heading} items={values.items} tone="tint" />

      {/* Who we serve */}
      <section className="sec white">
        <Container className="split">
          {serve.columns.map((col, i) => (
            <div key={i}>
              {col.kicker && <Kicker>{col.kicker}</Kicker>}
              {col.heading && <h2>{col.heading}</h2>}
              {col.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {col.areaStatus && (
                <p className="area-status">
                  <Icon name="pin" size={18} /> {col.areaStatus}
                </p>
              )}
            </div>
          ))}
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}

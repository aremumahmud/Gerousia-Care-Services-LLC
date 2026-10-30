import Seo from '../components/Seo.jsx';
import { PageHero, ServicesGrid } from '../components/sections/CommonSections.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import { servicesPage } from '../data/pages.js';
import { services } from '../data/services.js';
import {
  breadcrumbSchema,
  serviceSchema,
} from '../utils/structuredData.js';

const s = (type) => servicesPage.sections.find((sec) => sec.type === type);

export default function Services() {
  const hero = s('page-hero');
  const grid = s('services-grid');

  return (
    <div className="page active">
      <Seo
        title="Home Care Services in Austin & San Antonio, TX"
        description={servicesPage.description}
        keywords="home care services Austin, personal care, companionship, homemaking, respite care, dementia care, everyday assistance, San Antonio"
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          ...services.map((svc) => serviceSchema(svc)),
        ]}
      />

      <PageHero
        breadcrumbItems={[{ name: 'Home', path: '/' }, { name: 'Services' }]}
        kicker={hero.kicker}
        heading={hero.heading}
        lead={hero.lead}
      />

      <ServicesGrid intro={grid.intro} areaStatus={grid.areaStatus} tone="white" />

      <CtaBand />
    </div>
  );
}

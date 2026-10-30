import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { Container, Kicker } from '../components/ui/Section.jsx';
import { business } from '../data/business.js';
import { breadcrumbSchema } from '../utils/structuredData.js';

const EFFECTIVE = 'October 30, 2026';

export default function Terms() {
  return (
    <div className="page active">
      <Seo
        title="Terms & Conditions"
        description={`The terms and conditions governing your use of the ${business.name} website.`}
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms-and-conditions' },
        ])}
        noindex
      />

      <section className="page-hero">
        <Container>
          <Breadcrumbs
            items={[{ name: 'Home', path: '/' }, { name: 'Terms & Conditions' }]}
          />
          <Kicker>Legal</Kicker>
          <h1>Terms &amp; Conditions</h1>
          <p className="lead">Effective date: {EFFECTIVE}</p>
        </Container>
      </section>

      <section className="sec white">
        <Container className="legal prose narrow">
          <p>
            These Terms &amp; Conditions (“Terms”) govern your use of the website
            of {business.legalName} (“{business.name},” “we,” “us,” or “our”). By
            accessing or using this website, you agree to be bound by these Terms.
            If you do not agree, please do not use the website.
          </p>

          <h2>About Our Services</h2>
          <p>
            {business.name} provides non-medical, in-home care intended to support
            older adults, veterans, and adults living with disabilities in the{' '}
            {business.areaServed.join(' and ')} areas. We do not provide nursing,
            medical treatment, or emergency services. Information on this website
            is general in nature and is not medical advice. Always consult a
            qualified healthcare professional regarding medical concerns, and call
            911 in an emergency.
          </p>

          <h2>Use of the Website</h2>
          <p>You agree to use this website only for lawful purposes and not to:</p>
          <ul>
            <li>Submit false, misleading, or fraudulent information</li>
            <li>Interfere with or disrupt the website or its security</li>
            <li>
              Attempt to gain unauthorized access to any part of the website or
              related systems
            </li>
            <li>Use the website in a way that violates applicable law</li>
          </ul>

          <h2>Forms and Submissions</h2>
          <p>
            When you submit a contact, consultation, or careers form, you confirm
            that the information you provide is accurate. Submitting a form does
            not create a care, employment, or contractual relationship. Any
            services are subject to a separate written agreement and availability.
            Please do not include detailed medical or sensitive health information
            in website forms.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, and
            images — is the property of {business.legalName} or its licensors and
            is protected by applicable intellectual property laws. You may not
            reproduce, distribute, or create derivative works without our prior
            written permission.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the content, policies, or practices of those sites and
            provide such links for convenience only.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The website is provided “as is” and “as available” without warranties
            of any kind, whether express or implied. We do not warrant that the
            website will be uninterrupted, error-free, or free of harmful
            components.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {business.legalName} will not
            be liable for any indirect, incidental, consequential, or punitive
            damages arising from your use of, or inability to use, this website.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may revise these Terms from time to time. The “Effective date”
            above indicates when they were last updated. Your continued use of the
            website after changes are posted constitutes acceptance of the revised
            Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, without
            regard to its conflict-of-laws principles.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about these Terms? Contact us at:
          </p>
          <p>
            {business.legalName}
            <br />
            {business.addressText}
            <br />
            Phone: <a href={business.phoneHref}>{business.phone}</a>
            <br />
            Email: <a href={business.emailHref}>{business.email}</a>
          </p>
        </Container>
      </section>
    </div>
  );
}

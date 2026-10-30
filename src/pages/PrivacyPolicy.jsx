import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import { Container, Kicker } from '../components/ui/Section.jsx';
import { business } from '../data/business.js';
import { breadcrumbSchema } from '../utils/structuredData.js';

const EFFECTIVE = 'October 30, 2026';

export default function PrivacyPolicy() {
  return (
    <div className="page active">
      <Seo
        title="Privacy Policy"
        description={`How ${business.name} collects, uses and protects the information you share with us.`}
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ])}
        noindex
      />

      <section className="page-hero">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy' }]} />
          <Kicker>Legal</Kicker>
          <h1>Privacy Policy</h1>
          <p className="lead">Effective date: {EFFECTIVE}</p>
        </Container>
      </section>

      <section className="sec white">
        <Container className="legal prose narrow">
          <p>
            {business.legalName} (“{business.name},” “we,” “us,” or “our”)
            respects your privacy. This Privacy Policy explains what information
            we collect through our website, how we use it, and the choices you
            have. By using our website or contacting us, you agree to the
            practices described here.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, including when you:</p>
          <ul>
            <li>Submit a contact, consultation, or careers form</li>
            <li>Subscribe to our newsletter or updates</li>
            <li>Call, email, or otherwise communicate with us</li>
          </ul>
          <p>
            This may include your name, phone number, email address, the service
            you are interested in, your preferred appointment date and time, and
            any details you choose to share in a message. Please do not submit
            detailed medical or sensitive health information through our website
            forms.
          </p>
          <p>
            We may also automatically collect limited technical information such
            as your browser type, device, and general usage data to help us
            operate and improve the site.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and requests for care</li>
            <li>To schedule and follow up on consultations</li>
            <li>To review and respond to employment applications</li>
            <li>To send updates you have requested, such as our newsletter</li>
            <li>To operate, maintain, and improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>How We Share Your Information</h2>
          <p>
            We do not sell your personal information. We may share information
            with trusted service providers who help us operate our website and
            communicate with you (for example, our email delivery provider),
            and only to the extent necessary for them to perform those services.
            We may also disclose information when required by law or to protect
            our rights, safety, or property.
          </p>

          <h2>Data Retention</h2>
          <p>
            We keep your information only for as long as needed to fulfill the
            purposes described in this policy, unless a longer retention period
            is required or permitted by law.
          </p>

          <h2>Your Choices</h2>
          <ul>
            <li>
              You may opt out of marketing emails at any time by using the
              unsubscribe link or by contacting us.
            </li>
            <li>
              You may request access to, correction of, or deletion of the
              personal information we hold about you, subject to applicable law.
            </li>
          </ul>

          <h2>Security</h2>
          <p>
            We use reasonable administrative, technical, and physical safeguards
            designed to protect the information you share with us. However, no
            method of transmission over the internet is completely secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>Children’s Privacy</h2>
          <p>
            Our website is not directed to children under 13, and we do not
            knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Effective
            date” above indicates when it was last revised. Your continued use of
            the website after changes are posted constitutes acceptance of the
            updated policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy
            practices, contact us at:
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

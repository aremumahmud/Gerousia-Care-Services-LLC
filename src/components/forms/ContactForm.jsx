import { useForm } from '../../hooks/useForm.js';
import { isValidEmail, isValidPhone, isRequired } from '../../utils/validation.js';
import Field from './Field.jsx';
import { Honeypot, FormStatus } from './FormParts.jsx';
import { services } from '../../data/services.js';

const serviceOptions = [
  { value: '', label: 'Select a service…' },
  ...services.map((s) => ({ value: s.shortTitle, label: s.shortTitle })),
  { value: 'Not sure yet', label: 'Not sure yet' },
];

const rules = {
  name: (v) => (!isRequired(v) ? 'Please enter your name' : ''),
  phone: (v) => (!isRequired(v) ? 'Please enter your phone number' : !isValidPhone(v) ? 'Enter a valid phone number' : ''),
  email: (v) => (v && !isValidEmail(v) ? 'Enter a valid email' : ''),
};

export default function ContactForm({ dark = true }) {
  const f = useForm(
    { name: '', phone: '', email: '', service: '', message: '' },
    rules,
    '/api/contact'
  );

  return (
    <form
      className={`form ${dark ? 'c-form' : 'card'}`.trim()}
      onSubmit={f.handleSubmit}
      noValidate
    >
      <h2>Talk With Us About Care</h2>
      <p>Tell us what matters to you and we’ll follow up to talk it through.</p>

      <Field label="Your name" name="name" value={f.values.name} onChange={f.handleChange}
        onBlur={f.handleBlur} error={f.touched.name && f.errors.name} required
        autoComplete="name" placeholder="First and last name" />

      <div className="row">
        <Field label="Phone" name="phone" type="tel" value={f.values.phone} onChange={f.handleChange}
          onBlur={f.handleBlur} error={f.touched.phone && f.errors.phone} required
          autoComplete="tel" placeholder="(000) 000-0000" />
        <Field label="Email" name="email" type="email" value={f.values.email} onChange={f.handleChange}
          onBlur={f.handleBlur} error={f.touched.email && f.errors.email}
          autoComplete="email" placeholder="you@email.com" />
      </div>

      <Field label="Care needed" name="service" type="select" value={f.values.service}
        onChange={f.handleChange} options={serviceOptions} />

      <Field label="How can we help?" name="message" type="textarea" rows={4}
        value={f.values.message} onChange={f.handleChange}
        placeholder="Please do not include detailed medical information in this form." />

      <Honeypot value={f.values._gotcha} onChange={f.handleChange} />

      <button className="btn btn-gold" type="submit" disabled={f.status === 'submitting'}>
        {f.status === 'submitting' ? 'Sending…' : 'Send Request'}
      </button>
      <FormStatus status={f.status} message={f.serverMessage} />
    </form>
  );
}

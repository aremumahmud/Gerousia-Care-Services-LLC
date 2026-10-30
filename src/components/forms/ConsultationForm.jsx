import { useForm } from '../../hooks/useForm.js';
import {
  isValidEmail,
  isValidPhone,
  isRequired,
  isTodayOrFuture,
  todayISO,
} from '../../utils/validation.js';
import Field from './Field.jsx';
import { Honeypot, FormStatus } from './FormParts.jsx';
import { services } from '../../data/services.js';

const serviceOptions = [
  { value: '', label: 'Select a service…' },
  ...services.map((s) => ({ value: s.shortTitle, label: s.shortTitle })),
  { value: 'Not sure yet', label: 'Not sure yet' },
];

const timeOptions = [
  { value: '', label: 'Preferred time…' },
  { value: 'Morning (8am–12pm)', label: 'Morning (8am–12pm)' },
  { value: 'Afternoon (12pm–4pm)', label: 'Afternoon (12pm–4pm)' },
  { value: 'Evening (4pm–7pm)', label: 'Evening (4pm–7pm)' },
];

const rules = {
  name: (v) => (!isRequired(v) ? 'Please enter your name' : ''),
  email: (v) => (!isRequired(v) ? 'Please enter your email' : !isValidEmail(v) ? 'Enter a valid email' : ''),
  phone: (v) => (!isRequired(v) ? 'Please enter your phone number' : !isValidPhone(v) ? 'Enter a valid phone number' : ''),
  service: (v) => (!isRequired(v) ? 'Please choose a service' : ''),
  date: (v) => (!isRequired(v) ? 'Please choose a preferred date' : !isTodayOrFuture(v) ? 'Choose today or a future date' : ''),
};

export default function ConsultationForm() {
  const f = useForm(
    { name: '', email: '', phone: '', service: '', date: '', time: '', message: '' },
    rules,
    '/api/consultation'
  );

  return (
    <form className="form c-form" onSubmit={f.handleSubmit} noValidate>
      <h2>Request a Consultation</h2>
      <p>Share a few details and we’ll reach out to arrange a time that works for you.</p>

      <div className="row">
        <Field label="Full name" name="name" value={f.values.name} onChange={f.handleChange}
          onBlur={f.handleBlur} error={f.touched.name && f.errors.name} required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" value={f.values.phone} onChange={f.handleChange}
          onBlur={f.handleBlur} error={f.touched.phone && f.errors.phone} required autoComplete="tel" />
      </div>

      <Field label="Email" name="email" type="email" value={f.values.email} onChange={f.handleChange}
        onBlur={f.handleBlur} error={f.touched.email && f.errors.email} required autoComplete="email" />

      <Field label="Service of interest" name="service" type="select" value={f.values.service}
        onChange={f.handleChange} onBlur={f.handleBlur} error={f.touched.service && f.errors.service}
        required options={serviceOptions} />

      <div className="row">
        <Field label="Preferred date" name="date" type="date" value={f.values.date}
          onChange={f.handleChange} onBlur={f.handleBlur} error={f.touched.date && f.errors.date}
          required min={todayISO()} />
        <Field label="Preferred time" name="time" type="select" value={f.values.time}
          onChange={f.handleChange} options={timeOptions} />
      </div>

      <Field label="Anything else we should know?" name="message" type="textarea" rows={4}
        value={f.values.message} onChange={f.handleChange}
        placeholder="Please do not include detailed medical information in this form." />

      <Honeypot value={f.values._gotcha} onChange={f.handleChange} />

      <button className="btn btn-gold" type="submit" disabled={f.status === 'submitting'}>
        {f.status === 'submitting' ? 'Sending…' : 'Request Consultation'}
      </button>
      <FormStatus status={f.status} message={f.serverMessage} />
    </form>
  );
}
